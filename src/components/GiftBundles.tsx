import React from 'react';
import { motion } from 'motion/react';
import { Gift, ChevronRight, Sparkles, Package, Heart } from 'lucide-react';

const bundles = [
  {
    id: 1,
    name: "Karnataka Heritage Pack",
    description: "A curated collection of Mysore's finest silk and traditional sweets.",
    price: 5200,
    items: ["Mysore Silk Stole", "Mysore Pak (500g)", "Sandalwood Incense"],
    image: "https://picsum.photos/seed/karnataka-gift/800/600",
    tag: "Regional Special"
  },
  {
    id: 2,
    name: "Diwali Celebration Box",
    description: "Everything you need for a traditional and auspicious Diwali.",
    price: 3800,
    items: ["Terracotta Diya Set", "Rajasthani Ghevar", "Brass Puja Thali"],
    image: "https://picsum.photos/seed/diwali-box/800/600",
    tag: "Festival Exclusive"
  },
  {
    id: 3,
    name: "Artisan's Choice Bundle",
    description: "A premium selection of hand-painted pottery and organic spices.",
    price: 4500,
    items: ["Blue Pottery Vase", "Lakadong Turmeric", "Hand-woven Basket"],
    image: "https://picsum.photos/seed/artisan-bundle/800/600",
    tag: "Curated"
  }
];

export const GiftBundles = ({ onNavigate }: any) => {
  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.02] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-accent/30" />
              <span className="text-accent font-bold text-[10px] uppercase tracking-widest">Curated Experiences</span>
            </div>
            <h2 className="text-primary mb-4">Cultural Gift Bundles</h2>
            <p className="text-text-soft text-lg">
              Thoughtfully curated collections that bring together the best of Indian crafts and flavors in a premium gift experience.
            </p>
          </div>
          <button className="btn-secondary !py-3 !px-8 text-xs uppercase tracking-widest flex items-center gap-2">
            View All Bundles <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {bundles.map((bundle) => (
            <motion.div
              key={bundle.id}
              whileHover={{ y: -10 }}
              className="group bg-cream/30 rounded-[48px] overflow-hidden border border-highlight/10 shadow-sm hover:shadow-premium transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={bundle.image} 
                  alt={bundle.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold text-primary uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-accent" /> {bundle.tag}
                  </span>
                </div>

                <button className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:text-rose-500 transition-colors shadow-sm">
                  <Heart className="w-4 h-4" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">Gift Experience</p>
                  <h3 className="text-2xl font-display font-bold text-white leading-tight">{bundle.name}</h3>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-text-soft text-sm leading-relaxed">
                  {bundle.description}
                </p>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                    <Package className="w-3 h-3 text-accent" /> What's Inside:
                  </p>
                  <ul className="grid grid-cols-1 gap-2">
                    {bundle.items.map((item, idx) => (
                      <li key={idx} className="text-xs text-text-soft flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-accent/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-highlight/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-text-soft uppercase tracking-widest font-bold mb-1">Bundle Price</p>
                    <p className="text-2xl font-display font-bold text-primary">₹{bundle.price.toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => onNavigate('product')}
                    className="btn-primary !py-3 !px-6 text-[10px] uppercase tracking-widest flex items-center gap-2"
                  >
                    View Bundle <Gift className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Bundle CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 bg-primary rounded-[48px] p-12 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-48 -mt-48" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-white text-3xl md:text-4xl mb-4">Create Your Own Heritage Box</h3>
              <p className="text-cream/70 text-lg">
                Mix and match your favorite crafts and flavors to create a personalized gift that tells a unique story.
              </p>
            </div>
            <button className="btn-accent !px-12 !py-5 whitespace-nowrap shadow-2xl shadow-accent/20">
              Start Customizing
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
