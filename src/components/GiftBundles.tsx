import React from 'react';
import { motion } from 'motion/react';
import { Gift, ChevronRight, Sparkles, Package, Heart, User } from 'lucide-react';
import { HandwrittenNote } from './HandwrittenNote';

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
          <button
            onClick={() => onNavigate('marketplace')}
            className="btn-secondary !py-3 !px-8 text-xs uppercase tracking-widest flex items-center gap-2"
          >
            View All Bundles <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
          {bundles.map((bundle) => (
            <motion.div
              key={bundle.id}
              whileHover={{ y: -10 }}
              className="group bg-cream/30 rounded-[24px] md:rounded-[48px] overflow-hidden border border-highlight/10 shadow-sm hover:shadow-premium transition-all duration-500 relative"
            >
              {bundle.id === 2 && (
                <div className="absolute -top-4 -right-4 z-20">
                  <HandwrittenNote rotation={5} className="!bg-accent !text-white !border-none !text-sm !py-1 !px-3">
                    "Most Loved"
                  </HandwrittenNote>
                </div>
              )}
              <div className="relative h-40 md:h-64 overflow-hidden">
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

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="text-[8px] font-bold uppercase tracking-widest mb-0.5 opacity-80">Gift Experience</p>
                  <h3 className="text-sm md:text-2xl font-display font-bold text-white leading-tight truncate">{bundle.name}</h3>
                </div>
              </div>

              <div className="p-4 md:p-8 space-y-4 md:space-y-6">
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

                <div className="pt-4 md:pt-6 border-t border-highlight/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-[8px] text-text-soft uppercase tracking-widest font-bold mb-0.5">Bundle Price</p>
                    <p className="text-lg md:text-2xl font-display font-bold text-primary">₹{bundle.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => onNavigate('product')}
                    className="w-full sm:w-auto btn-primary !py-2 !px-4 md:!py-3 md:!px-6 text-[8px] md:text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    View Bundle <Gift className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Bundle CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-32 items-center">
          <div className="lg:col-span-4">
            <div className="bg-white/40 backdrop-blur-md p-8 rounded-[32px] border border-white/60 shadow-premium relative">
              <div className="absolute -top-6 -left-6">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white shadow-lg">
                  <User className="w-6 h-6" />
                </div>
              </div>
              <h4 className="text-lg font-display font-bold text-primary mb-4">Curator's Note</h4>
              <p className="font-handwriting text-xl text-primary leading-tight">
                "I personally visited the weavers in Mysore to select the silk for our Heritage Pack. It's truly one-of-a-kind."
              </p>
              <p className="text-[10px] text-accent font-bold uppercase tracking-widest mt-4">— Meera, Gift Curator</p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-primary rounded-[48px] p-12 text-white relative overflow-hidden"
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
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="btn-accent !px-12 !py-5 whitespace-nowrap shadow-2xl shadow-accent/20"
                >
                  Start Customizing
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
