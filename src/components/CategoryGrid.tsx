import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Scissors, Hammer, Gem, Palette } from 'lucide-react';

const categories = [
  { name: 'Pottery', icon: Hammer, image: 'https://picsum.photos/seed/indian-pottery/400/400' },
  { name: 'Handloom', icon: Palette, image: 'https://picsum.photos/seed/indian-textile/400/400' },
  { name: 'Woodwork', icon: Hammer, image: 'https://picsum.photos/seed/indian-woodcraft/400/400' },
  { name: 'Jewelry', icon: Palette, image: 'https://picsum.photos/seed/indian-jewelry/400/400' },
  { name: 'Paintings', icon: Palette, image: 'https://picsum.photos/seed/indian-painting/400/400' },
];

export const CategoryGrid = ({ onNavigate }: any) => {
  return (
    <section className="section-spacing bg-cream relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-accent/30" />
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px]">The Collections</span>
            <div className="h-[1px] w-8 bg-accent/30" />
          </div>
          <h2 className="text-5xl font-display font-bold text-primary mb-6">Discover by Craft</h2>
          <p className="text-text-soft text-lg font-light leading-relaxed">
            Explore our curated collections, each representing a unique chapter of India's vast cultural tapestry and artistic heritage.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -12 }}
              onClick={() => onNavigate('marketplace')}
              className="group flex flex-col items-center gap-8 cursor-pointer"
            >
              <div className="relative w-full aspect-square rounded-[48px] overflow-hidden bg-white border border-highlight/10 flex items-center justify-center transition-all duration-700 group-hover:shadow-premium group-hover:border-accent/30">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 mandala-bg opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700" />
                
                <div className="relative z-10 p-8 rounded-[32px] bg-cream/50 backdrop-blur-sm shadow-sm group-hover:scale-110 group-hover:bg-white transition-all duration-700">
                  <cat.icon className="w-10 h-10 text-primary group-hover:text-accent transition-colors duration-500" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-display font-bold text-2xl text-primary group-hover:text-accent transition-colors duration-500 mb-2">{cat.name}</h3>
                <div className="flex flex-col items-center">
                  <div className="h-[2px] w-0 bg-accent group-hover:w-12 transition-all duration-500 mb-3" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">Explore Collection</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

  );
};
