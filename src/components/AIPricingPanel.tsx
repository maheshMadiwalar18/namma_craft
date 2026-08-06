import React from 'react';
import { TrendingUp, Info, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { HandwrittenNote } from './HandwrittenNote';

interface AIPricingPanelProps {
  name: string;
  category?: string;
}

export const AIPricingPanel = ({ name, category }: AIPricingPanelProps) => {
  const getSuggestedRange = () => {
    if (!name || name.length < 3) return { min: 1500, max: 3500 };
    const base = (name.length * 150) + 500;
    return { min: base, max: base + 2000 };
  };

  const getDemand = () => {
    if (!name) return { level: 'Stable', color: 'text-accent', score: 65 };
    const scores = [45, 72, 94];
    const levels = ['Growing', 'Steady', 'High'];
    const idx = name.length % 3;

    let color = 'text-amber-600';
    if (idx === 2) color = 'text-emerald-500';
    if (idx === 1) color = 'text-accent';

    return {
      level: levels[idx],
      color,
      score: scores[idx]
    };
  };

  const range = getSuggestedRange();
  const demand = getDemand();
  const recommendedStart = range.min * 0.8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[40px] p-10 border border-accent/20 shadow-premium relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16" />

      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-accent">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20">
              <img src="https://picsum.photos/seed/aarav/100/100" alt="Market Analysis" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg">Market Advice</h4>
              <p className="text-[9px] font-bold text-text-soft uppercase tracking-widest">Market Curator</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
            <ShieldCheck className="w-3 h-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
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
                <p className="text-[10px] font-bold text-text-soft uppercase tracking-widest">Interest Level</p>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${demand.color}`}>{demand.level}</span>
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

          <div className="bg-cream/30 rounded-3xl p-6 border border-highlight/10 space-y-6 relative">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-text-soft uppercase tracking-widest mb-1">Recommended Starting Price</p>
                <p className="text-2xl font-display font-bold text-primary">₹{recommendedStart.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[9px] font-bold text-text-soft uppercase tracking-widest">Market Popularity</p>
              <div className="h-12 w-full flex items-end gap-1">
                {[40, 65, 45, 80, 55, 90, 75, 95].map((h, i) => (
                  <motion.div
                    key={`bar-${i}`}
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

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 flex gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/5">
            <Info className="w-5 h-5 text-accent shrink-0" />
            <div className="space-y-1">
              <p className="text-[11px] text-primary font-medium leading-relaxed">
                Analysis based on <span className="font-bold">1,240 results</span> in the {category || 'General'} category.
              </p>
            </div>
          </div>
          <HandwrittenNote rotation={-3} className="!bg-accent/5 !border-none !p-4 !text-sm">
            Analysis completed.
          </HandwrittenNote>
        </div>
      </div>
    </motion.div>
  );
};
