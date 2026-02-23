import React from 'react';
import { motion } from 'motion/react';
import { Play, MapPin, Quote, ChevronRight, User, Palette } from 'lucide-react';

export const ArtisanStory = ({ onNavigate }: any) => {
  return (
    <section className="section-spacing bg-cream relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Video Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-video rounded-[48px] overflow-hidden shadow-premium group cursor-pointer">
              <img 
                src="https://picsum.photos/seed/artisan-video-bg/1200/800" 
                alt="Artisan at work" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-accent shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
              </div>

              {/* Video Info Tag */}
              <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 shadow-lg">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Watch: The Maker's Journey</span>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          </motion.div>

          {/* Story Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-10"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-accent" />
                <span className="text-accent font-bold text-[10px] uppercase tracking-widest">Meet the Artisan</span>
              </div>
              
              <div className="flex items-center gap-6 mb-8">
                <img 
                  src="https://picsum.photos/seed/artisan-ananya-profile/200/200" 
                  alt="Ananya Sharma" 
                  className="w-24 h-24 rounded-3xl object-cover shadow-xl border-4 border-white"
                />
                <div>
                  <h2 className="text-4xl font-display font-bold text-primary mb-2">Ananya Sharma</h2>
                  <div className="flex items-center gap-2 text-text-soft">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Jaipur, Rajasthan</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-accent/10 -z-10" />
                <p className="text-2xl font-serif italic text-primary leading-relaxed mb-8">
                  "Every piece of pottery I shape carries the whispers of my ancestors. It's not just clay; it's a living legacy that I'm honored to pass on to your hands."
                </p>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-soft uppercase tracking-widest">Specialty</p>
                    <p className="text-sm font-bold text-primary">Blue Pottery & Floral Motifs</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-soft uppercase tracking-widest">Experience</p>
                    <p className="text-sm font-bold text-primary">3rd Generation Master Artisan</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('artisan')}
                className="btn-primary !px-10 !py-5 group flex items-center gap-3 shadow-xl shadow-primary/20"
              >
                View Full Profile
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
