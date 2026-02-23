import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export const ArtisanSpotlight = ({ onNavigate }: any) => {
  return (
    <section className="section-spacing bg-cream">
      <div className="container-custom">
        <div className="bg-primary rounded-[60px] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-premium">
          <div className="w-full lg:w-1/2 relative min-h-[500px]">
            <img 
              src="https://picsum.photos/seed/artisan-india/1000/1200" 
              alt="Artisan at work" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
          </div>
          <div className="w-full lg:w-1/2 p-12 lg:p-24 text-cream relative flex flex-col justify-center">
            <Quote className="absolute top-12 right-12 w-32 h-32 text-cream/5" />
            
            <div className="inline-flex items-center gap-3 bg-white/10 text-saffron px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-10 border border-white/10 w-fit">
              <span className="w-2 h-2 bg-saffron rounded-full" />
              Master Craftsman
            </div>

            <h2 className="text-cream text-[48px] lg:text-[64px] font-display font-bold mb-8 leading-[1.1]">
              The Magic of <br />
              <span className="italic font-normal text-saffron">Blue Pottery</span>
            </h2>
            
            <p className="text-xl text-cream/80 leading-relaxed mb-12 font-light italic">
              "In Jaipur, we don't just make pots; we breathe life into clay. Each stroke of cobalt blue is a prayer for the preservation of our ancestors' legacy."
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-saffron font-bold font-display text-xl">01</span>
                </div>
                <div>
                  <h4 className="text-cream font-bold mb-2">Natural Pigments</h4>
                  <p className="text-cream/60 text-sm">Sourced from the earth, our colors are vibrant yet sustainable.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-saffron font-bold font-display text-xl">02</span>
                </div>
                <div>
                  <h4 className="text-cream font-bold mb-2">Hand-Painted</h4>
                  <p className="text-cream/60 text-sm">Every intricate pattern is painted by hand, making each piece unique.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('artisan')}
              className="btn-accent w-fit !bg-saffron hover:!bg-saffron/90"
            >
              Read Ananya's Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
