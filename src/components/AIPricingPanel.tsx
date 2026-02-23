import React from 'react';
import { Sparkles, TrendingUp, Info, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface AIPricingPanelProps {
  name: string;
  category?: string;
}

export const AIPricingPanel = ({ name, category }: AIPricingPanelProps) => {
  // Mock AI logic for demonstration
  const getSuggestedRange = () => {
    if (!name || name.length < 3) return { min: 1500, max: 3500 };
    const base = (name.length * 150) + 500;
    return { min: base, max: base + 2000 };
  };

  const getDemand = () => {
    if (!name) return { level: 'Medium', color: 'text-accent', score: 65 };
    const scores = [45, 72, 94];
    const levels = ['Low', 'Medium', 'High'];
    const idx = name.length % 3;
    return { 
      level: levels[idx], 
      color: idx === 2 ? 'text-emerald-500' : idx === 1 ? 'text-accent' : 'text-rose-500',
      score: scores[idx]
    };
  };

  const range = getSuggestedRange();
  const demand = getDemand();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[40px] p-10 border border-accent/20 shadow-premium relative overflow-hidden"
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16" />
      
      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-accent">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg">AI Pricing Intelligence</h4>
              <p className="text-[9px] font-bold text-text-soft uppercase tracking-widest">Real-time Market Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
            <ShieldCheck className="w-3 h-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Verified Suggestion</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-text-soft uppercase tracking-widest mb-3">Suggested Price Range</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-bold text-primary">₹{range.min.toLocaleString()}</span>
                <span className="text-xl font-display font-bold text-text-soft/40">—</span>
                <span className="text-4xl font-display font-bold text-accent">₹{range.max.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-bold text-text-soft uppercase tracking-widest">Market Demand</p>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${demand.color}`}>{demand.level} Demand</span>
              </div>
              <div className="h-2 w-full bg-cream rounded-full overflow-hidden border border-highlight/20">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${demand.score}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${demand.level === 'High' ? 'bg-emerald-500' : 'bg-accent'}`}
                />
              </div>
            </div>
          </div>

          <div className="bg-cream/30 rounded-3xl p-6 border border-highlight/10 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-text-soft uppercase tracking-widest mb-1">Recommended Start</p>
                <p className="text-2xl font-display font-bold text-primary">₹{(range.min * 0.8).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent">
                <Zap className="w-6 h-6 fill-current" />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[9px] font-bold text-text-soft uppercase tracking-widest">Price Trend (Last 30 Days)</p>
              <div className="h-12 w-full flex items-end gap-1">
                {[40, 65, 45, 80, 55, 90, 75, 95].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05 }}
                    className="flex-1 bg-accent/20 rounded-t-sm hover:bg-accent transition-colors cursor-help"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/5">
          <Info className="w-5 h-5 text-accent shrink-0" />
          <div className="space-y-1">
            <p className="text-[11px] text-primary font-medium leading-relaxed">
              Our AI analyzed <span className="font-bold">1,240 similar listings</span> in the {category || 'Heritage'} category.
            </p>
            <p className="text-[10px] text-text-soft leading-relaxed">
              Suggestions are based on historical auction performance, current artisan trends, and regional demand patterns.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
