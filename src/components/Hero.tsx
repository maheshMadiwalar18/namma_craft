import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { HandwrittenNote } from './HandwrittenNote';

export const Hero = ({ onNavigate }: any) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream selection:bg-accent/20">
      <div className="absolute inset-0 mandala-bg opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[150vw] md:w-[600px] h-[150vw] md:h-[600px] bg-accent/15 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[100vw] md:w-[400px] h-[100vw] md:h-[400px] bg-primary/15 rounded-full blur-[60px] md:blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container-custom relative z-10 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-4 bg-white/50 backdrop-blur-md px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-10 border border-accent/10 shadow-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Heritage in every stitch
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] font-display font-bold leading-[1.1] mb-8 text-primary tracking-tight drop-shadow-sm text-balance">
              Discover the <br />
              <span className="italic font-normal text-accent relative">
                Soul
                <svg className="absolute -bottom-4 left-0 w-full h-4 text-accent/20" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span> of <br />
              Handmade Culture.
            </h1>

            <p className="text-xl leading-relaxed text-text-soft mb-12 text-readable mx-auto lg:mx-0 font-light">
              A curated treasury of India's timeless artistry, where every piece carries the legacy of generations and the warmth of human touch.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-8">
              <button
                onClick={() => onNavigate('discovery')}
                className="btn-primary !px-10 !py-4 text-base shadow-2xl shadow-primary/30 group flex items-center gap-4 hover:shadow-primary/40"
              >
                Cultural Discovery
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('marketplace')}
                className="btn-secondary !px-10 !py-4 text-base group flex items-center gap-3"
              >
                Marketplace
              </button>
              <button
                onClick={() => onNavigate('sell-product')}
                className="w-full sm:w-auto flex items-center justify-center gap-3 text-accent hover:text-primary transition-all font-bold text-sm uppercase tracking-widest border-b-2 border-accent/20 hover:border-accent pb-2 mt-4 lg:mt-0"
              >
                Sell Your Craft
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-2/5 relative h-[400px] sm:h-[500px] md:h-[600px] mt-12 lg:mt-0"
          >
            <div className="relative w-full h-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-accent/10 to-accent/5 organic-blob -rotate-12 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-gradient-to-bl from-primary/10 to-primary/5 organic-blob rotate-45 pointer-events-none" />

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute top-0 right-0 w-4/5 aspect-[4/5] rounded-[40px] organic-blob overflow-hidden shadow-premium z-10"
              >
                <img
                  src="https://picsum.photos/seed/indian-pottery/800/1000"
                  alt="Indian Pottery"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ x: 20, y: 20 }}
                animate={{ x: 0, y: 0 }}
                whileHover={{ scale: 1.05, zIndex: 20 }}
                className="absolute bottom-10 left-0 w-1/2 aspect-square rounded-[32px] organic-blob overflow-hidden shadow-premium z-20 border-4 border-cream"
              >
                <img
                  src="https://picsum.photos/seed/indian-textile/600/600"
                  alt="Indian Textile"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <HandwrittenNote
                className="absolute -bottom-4 sm:-bottom-12 left-0 sm:-left-8 z-30"
                rotation={-8}
                delay={1}
              >
                "Hand-spun with care"
              </HandwrittenNote>

              <motion.div
                initial={{ x: -20, y: -20 }}
                animate={{ x: 0, y: 0 }}
                whileHover={{ scale: 1.05, zIndex: 20 }}
                className="absolute top-20 -left-10 w-2/5 aspect-square rounded-[24px] organic-blob overflow-hidden shadow-premium z-0 border-4 border-cream"
              >
                <img
                  src="https://picsum.photos/seed/indian-woodcraft/400/400"
                  alt="Indian Woodcraft"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <HandwrittenNote
                className="absolute top-0 sm:-top-8 right-0 sm:-right-4 z-30"
                rotation={12}
                delay={1.2}
              >
                "Tradition preserved"
              </HandwrittenNote>

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
