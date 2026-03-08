import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Heart, Utensils } from 'lucide-react';

const foods = [
  {
    id: 1,
    name: 'Mysore Pak',
    region: 'Karnataka Specialty',
    tag: 'Homemade',
    image: '/images/food/mysore-pak.png',
    desc: 'A rich, buttery sweet made from gram flour, ghee, and sugar.'
  },
  {
    id: 2,
    name: 'Rajasthani Ghevar',
    region: 'Rajasthan Specialty',
    tag: 'Festival Special',
    image: '/images/food/ghevar.png',
    desc: 'A disc-shaped honeycomb sweet made from all-purpose flour and soaked in sugar syrup.'
  },
  {
    id: 3,
    name: 'Malabar Parotta',
    region: 'Kerala Specialty',
    tag: 'Homemade',
    image: '/images/food/parotta.png',
    desc: 'Layered flatbread made from maida flour, popular in Southern India.'
  },
  {
    id: 4,
    name: 'Hyderabadi Biryani',
    region: 'Telangana Specialty',
    tag: 'Festival Special',
    image: '/images/food/biryani.png',
    desc: 'A world-famous aromatic rice dish cooked with exotic spices and tender meat.'
  }
];

export const TraditionalFoods = ({ onNavigate }: any) => {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-accent/30" />
              <span className="text-accent font-bold text-xs tracking-widest uppercase">Culinary Heritage</span>
            </div>
            <h2 className="text-5xl font-display font-bold text-primary mb-4">Taste India’s Traditional Foods</h2>
            <p className="text-text-soft text-lg max-w-xl">Homemade specialties from local communities, crafted with recipes passed down through generations.</p>
          </motion.div>

          <motion.button
            onClick={() => onNavigate('marketplace')}
            whileHover={{ gap: '1.5rem' }}
            className="flex items-center gap-4 text-accent font-bold uppercase tracking-widest text-xs group"
          >
            Explore All Flavors <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {foods.map((food, idx) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[32px] overflow-hidden border border-highlight/10 shadow-sm hover:shadow-premium transition-all"
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] md:text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
                    {food.tag}
                  </span>
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:text-rose-500 transition-colors shadow-sm">
                  <Heart className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>

              <div className="p-4 md:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="w-3 h-3 text-accent" />
                  <span className="text-[8px] md:text-[10px] font-bold text-accent uppercase tracking-widest">{food.region}</span>
                </div>
                <h3 className="text-sm md:text-xl font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors truncate">{food.name}</h3>
                <p className="hidden md:block text-text-soft text-sm line-clamp-2 mb-6 leading-relaxed italic">"{food.desc}"</p>

                <button
                  onClick={() => onNavigate('food-detail')}
                  className="w-full py-3 md:py-4 bg-cream/50 rounded-xl md:rounded-2xl text-primary font-bold text-[8px] md:text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
