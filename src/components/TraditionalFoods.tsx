import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Heart, Utensils } from 'lucide-react';

const foods = [
  {
    id: 1,
    name: 'Mysore Pak',
    region: 'Karnataka Specialty',
    tag: 'Homemade',
    image: 'https://picsum.photos/seed/mysorepak/600/400',
    desc: 'A rich, buttery sweet made from gram flour, ghee, and sugar.'
  },
  {
    id: 2,
    name: 'Rajasthani Ghevar',
    region: 'Rajasthan Specialty',
    tag: 'Festival Special',
    image: 'https://picsum.photos/seed/ghevar/600/400',
    desc: 'A disc-shaped honeycomb sweet made from all-purpose flour and soaked in sugar syrup.'
  },
  {
    id: 3,
    name: 'Malabar Parotta',
    region: 'Kerala Specialty',
    tag: 'Homemade',
    image: 'https://picsum.photos/seed/parotta/600/400',
    desc: 'Layered flatbread made from maida flour, popular in Southern India.'
  },
  {
    id: 4,
    name: 'Hyderabadi Biryani',
    region: 'Telangana Specialty',
    tag: 'Festival Special',
    image: 'https://picsum.photos/seed/biryani/600/400',
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
            whileHover={{ gap: '1.5rem' }}
            className="flex items-center gap-4 text-accent font-bold uppercase tracking-widest text-xs group"
          >
            Explore All Flavors <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
                    {food.tag}
                  </span>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:text-rose-500 transition-colors shadow-sm">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="w-3 h-3 text-accent" />
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{food.region}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-primary mb-3 group-hover:text-accent transition-colors">{food.name}</h3>
                <p className="text-text-soft text-sm line-clamp-2 mb-6 leading-relaxed italic">"{food.desc}"</p>
                
                <button 
                  onClick={() => onNavigate('food-detail')}
                  className="w-full py-4 bg-cream/50 rounded-2xl text-primary font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
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
