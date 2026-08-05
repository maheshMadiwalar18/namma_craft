import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Info, X, Camera, Users, User } from 'lucide-react';
import { HandwrittenNote } from './HandwrittenNote';

const HOTSPOTS = [
  { id: 1, x: '25%', y: '40%', title: 'Hand-carved Teak', description: 'Sourced from sustainable forests in Karnataka, this wood is known for its durability and rich grain.' },
  { id: 2, x: '60%', y: '35%', title: 'Natural Pigments', description: 'Artisans use crushed stones and vegetable extracts to create these vibrant, eco-friendly colors.' },
  { id: 3, x: '45%', y: '70%', title: 'Traditional Chisel', description: 'A tool passed down through three generations, perfectly balanced for intricate detailing.' },
];

export function LiveStudio() {
  const [activeHotspot, setActiveHotspot] = useState<typeof HOTSPOTS[0] | null>(null);
  const [isLive, setIsLive] = useState(true);

  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Live from the Studio
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl md:text-6xl font-display font-bold text-primary mb-6 leading-tight">
              Peek into the <span className="italic font-serif font-light">Soul</span> of Craft
            </h2>
            <p className="text-xl text-text-soft font-serif italic">
              "Every stroke tells a story, every carve carries a legacy. Watch our master artisans bring heritage to life."
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Video Feed */}
          <div className="lg:col-span-8 relative group">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
              <HandwrittenNote rotation={-2} className="!bg-accent !text-white !border-none !text-sm !py-1 !px-4">
                "Live from Jaipur"
              </HandwrittenNote>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              {/* Simulated Video Feed */}
              <img 
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=2000" 
                alt="Artisan Studio"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

              {/* Live Overlay */}
              <div className="absolute top-6 left-6 flex items-center gap-4">
                <div className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-2 shadow-lg">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>
                <div className="bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2">
                  <Users className="w-3 h-3" />
                  124 watching
                </div>
              </div>

              {/* Hotspots */}
              {HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot)}
                  style={{ left: spot.x, top: spot.y }}
                  className="absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center group/spot"
                >
                  <span className="absolute inset-0 bg-accent rounded-full animate-ping opacity-40" />
                  <span className="relative w-4 h-4 bg-accent rounded-full border-2 border-white shadow-lg group-hover/spot:scale-125 transition-transform" />
                </button>
              ))}

              {/* Controls */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform text-primary">
                  <Play className="w-6 h-6 fill-current" />
                </button>
              </div>
            </motion.div>

            {/* Handwritten Annotation */}
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: -2 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 bg-white p-4 shadow-xl rounded-lg border border-primary/5 max-w-[200px] hidden md:block"
            >
              <p className="font-handwriting text-primary text-lg leading-tight">
                Master Ramesh working on a custom order for a temple in Hampi.
              </p>
            </motion.div>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-4 space-y-8">
            <AnimatePresence mode="wait">
              {activeHotspot ? (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5 relative"
                >
                  <button 
                    onClick={() => setActiveHotspot(null)}
                    className="absolute top-4 right-4 text-text-soft hover:text-primary"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <Info className="w-8 h-8 text-accent mb-6" />
                  <h3 className="text-2xl font-display font-bold text-primary mb-4">{activeHotspot.title}</h3>
                  <p className="text-text-soft leading-relaxed">
                    {activeHotspot.description}
                  </p>
                  <button className="mt-8 text-accent font-bold text-sm uppercase tracking-widest flex items-center gap-2 group">
                    Learn more about this technique
                    <span className="w-8 h-[1px] bg-accent group-hover:w-12 transition-all" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-primary/5">
                    <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center">
                      <Camera className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">Multi-angle View</h4>
                      <p className="text-xs text-text-soft">Switch between 4 studio cameras</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-primary/5">
                    <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">Artisan Q&A</h4>
                      <p className="text-xs text-text-soft">Next session starts in 20 mins</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-soft italic leading-relaxed">
                    "Our Live Studio bridges the gap between the creator and the collector. Witness the patience and precision that goes into every NammaCraft piece."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
    </section>
  );
}
