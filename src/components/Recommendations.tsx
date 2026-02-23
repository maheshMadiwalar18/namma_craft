import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { ProductCard } from './FeaturedProducts';

export const Recommendations = ({ onNavigate }: any) => {
  const recommended = [
    { id: 101, name: 'Hand-Block Printed Cushion', artisan: 'Suresh Meena', price: 850, image: 'https://picsum.photos/seed/indian-block-print/600/800' },
    { id: 102, name: 'Terracotta Diya Set', artisan: 'Kavita Devi', price: 450, image: 'https://picsum.photos/seed/indian-terracotta/600/800' },
    { id: 103, name: 'Hand-Woven Jute Basket', artisan: 'Arjun Das', price: 1200, image: 'https://picsum.photos/seed/indian-jute/600/800' },
    { id: 104, name: 'Dhokra Art Figurine', artisan: 'Sunita Murmu', price: 2100, image: 'https://picsum.photos/seed/indian-dhokra/600/800' },
  ];

  return (
    <section className="section-spacing bg-cream relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-accent/30" />
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px]">Curated Selection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary leading-tight">Recommended for Your Collection</h2>
            <p className="text-text-soft mt-4 text-lg font-light">Handpicked treasures from across India, tailored to your appreciation for authentic craftsmanship.</p>
          </div>
          <button 
            onClick={() => onNavigate('marketplace')}
            className="group flex items-center gap-3 text-accent font-bold uppercase tracking-widest text-sm hover:tracking-[0.2em] transition-all"
          >
            View All Recommendations
            <div className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        <div className="relative group">
          <div className="flex overflow-x-auto pb-12 gap-10 no-scrollbar scroll-smooth -mx-4 px-4">
            {recommended.map((product, idx) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="min-w-[300px] md:min-w-[380px]"
              >
                <ProductCard {...product} onNavigate={onNavigate} />
              </motion.div>
            ))}
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>

  );
};
