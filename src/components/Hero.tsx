import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';

export const Hero = ({ onNavigate }: any) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream selection:bg-accent/20">
      {/* Background Elements */}
      <div className="absolute inset-0 mandala-bg opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container-custom relative z-10 py-32">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-3/5 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-4 bg-white/50 backdrop-blur-md px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-10 border border-accent/10 shadow-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Heritage in every stitch
            </div>
            
            <h1 className="text-[72px] md:text-[100px] font-display font-bold leading-[0.85] mb-10 text-primary tracking-tight">
              Discover the <br />
              <span className="italic font-normal text-accent relative">
                Soul
                <svg className="absolute -bottom-4 left-0 w-full h-4 text-accent/20" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span> of <br />
              Handmade Culture.
            </h1>
            
            <p className="text-2xl leading-relaxed text-text-soft mb-14 max-w-xl mx-auto lg:mx-0 font-light">
              A curated treasury of India's timeless artistry, where every piece carries the legacy of generations and the warmth of human touch.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-8">
              <button 
                onClick={() => onNavigate('discovery')}
                className="btn-primary !px-12 !py-6 text-lg shadow-2xl shadow-primary/20 group flex items-center gap-4"
              >
                Cultural Discovery
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('marketplace')}
                className="btn-secondary !px-12 !py-6 text-lg group flex items-center gap-3"
              >
                Marketplace
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-2/5 relative h-[600px]"
          >
            {/* Collage Layout */}
            <div className="relative w-full h-full">
              {/* Main Image */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="absolute top-0 right-0 w-4/5 aspect-[4/5] rounded-[40px] overflow-hidden shadow-premium z-10"
              >
                <img 
                  src="https://picsum.photos/seed/indian-pottery/800/1000" 
                  alt="Indian Pottery" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </motion.div>

              {/* Secondary Image 1 */}
              <motion.div 
                initial={{ x: 20, y: 20 }}
                animate={{ x: 0, y: 0 }}
                whileHover={{ scale: 1.05, zIndex: 20 }}
                className="absolute bottom-10 left-0 w-1/2 aspect-square rounded-[32px] overflow-hidden shadow-premium z-20 border-4 border-cream"
              >
                <img 
                  src="https://picsum.photos/seed/indian-textile/600/600" 
                  alt="Indian Textile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Secondary Image 2 */}
              <motion.div 
                initial={{ x: -20, y: -20 }}
                animate={{ x: 0, y: 0 }}
                whileHover={{ scale: 1.05, zIndex: 20 }}
                className="absolute top-20 -left-10 w-2/5 aspect-square rounded-[24px] overflow-hidden shadow-premium z-0 border-4 border-cream"
              >
                <img 
                  src="https://picsum.photos/seed/indian-woodcraft/400/400" 
                  alt="Indian Woodcraft" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 right-10 glass-premium px-6 py-3 rounded-full border border-white/50 shadow-xl z-30"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Authentic Heritage</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

  );
};
