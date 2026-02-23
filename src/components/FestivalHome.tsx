import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ChevronRight, 
  Heart, 
  ShoppingBag, 
  Gift, 
  Star, 
  Palette, 
  Utensils,
  ArrowLeft
} from 'lucide-react';

const festivalData = {
  name: 'Diwali',
  tagline: 'The Festival of Lights Collection',
  description: 'Brighten your home with authentic handcrafted decor and traditional flavors curated for the season of joy.',
  accentColor: '#F27D26', // Saffron
};

const decorCrafts = [
  { id: 1, name: 'Hand-Painted Terracotta Diyas', artisan: 'Kavita Devi', price: 450, image: 'https://picsum.photos/seed/diya-fest/600/800' },
  { id: 2, name: 'Brass Hanging Lantern', artisan: 'Rajesh Lohar', price: 1850, image: 'https://picsum.photos/seed/lantern-fest/600/800' },
  { id: 3, name: 'Marigold Floral Toran', artisan: 'Sita Ram', price: 320, image: 'https://picsum.photos/seed/toran-fest/600/800' },
];

const festivalFoods = [
  { id: 1, name: 'Assorted Diwali Mithai Box', creator: 'Lakshmi Devi', price: 850, tag: 'Festival Special', image: 'https://picsum.photos/seed/mithai-fest/600/800' },
  { id: 2, name: 'Dry Fruit Gujiya', creator: 'Shanti Devi', price: 550, tag: 'Homemade', image: 'https://picsum.photos/seed/gujiya-fest/600/800' },
];

const giftBundles = [
  { id: 1, name: 'The Prosperity Hamper', items: 'Diya Set + Mithai + Silver Coin', price: 2499, image: 'https://picsum.photos/seed/hamper1/600/800' },
  { id: 2, name: 'Artisan Decor Bundle', items: 'Lantern + Toran + Incense', price: 1999, image: 'https://picsum.photos/seed/hamper2/600/800' },
];

export const FestivalHome = ({ onNavigate }: any) => {
  return (
    <div className="min-h-screen bg-cream pb-20 relative overflow-hidden">
      {/* Subtle Festive Patterns */}
      <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
      
      {/* Hero Banner */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/diwali-hero/1920/1080?blur=2" 
            alt="Diwali Banner" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <button 
              onClick={() => onNavigate('discovery')}
              className="flex items-center gap-2 text-accent font-bold text-[10px] uppercase tracking-widest mb-8 hover:gap-4 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Discovery
            </button>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/20 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-accent/30">
              <Sparkles className="w-3 h-3" /> {festivalData.tagline}
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-8 leading-tight">
              Celebrate <br />
              <span className="text-accent italic font-normal">{festivalData.name}</span> with Soul.
            </h1>
            <p className="text-xl text-cream/70 mb-12 max-w-xl leading-relaxed">
              {festivalData.description}
            </p>
            <div className="flex gap-6">
              <button className="btn-accent !px-10 !py-5">Shop Collection</button>
              <button className="btn-secondary !bg-white/10 !text-white !border-white/20 !px-10 !py-5">View Gift Guide</button>
            </div>
          </motion.div>
        </div>

        {/* Subtle Diya Icons in Hero */}
        <div className="absolute bottom-10 right-10 flex gap-8 opacity-30">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className="text-accent"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" />
              </svg>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="container-custom relative z-10 -mt-20">
        {/* Decor Section */}
        <section className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-t-[40px] border-x border-t border-highlight/10 inline-block">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-4 h-4 text-accent" />
                <span className="text-accent font-bold text-[10px] uppercase tracking-widest">Festival Decor</span>
              </div>
              <h2 className="text-4xl font-display font-bold text-primary">Light Up Your Home</h2>
            </div>
            <button className="text-accent font-bold text-[10px] uppercase tracking-widest hover:tracking-[0.2em] transition-all mb-8">View All Decor</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {decorCrafts.map((craft, idx) => (
              <motion.div
                key={craft.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[40px] overflow-hidden border border-highlight/10 shadow-premium"
              >
                <div className="relative h-80 overflow-hidden">
                  <img src={craft.image} alt={craft.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:text-rose-500 transition-colors shadow-sm">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors">{craft.name}</h3>
                  <p className="text-text-soft text-sm mb-6">By {craft.artisan}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-display font-bold text-accent">₹{craft.price}</span>
                    <button className="btn-primary !py-3 !px-6 text-[10px]">Add to Cart</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Foods Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <Utensils className="w-4 h-4 text-accent" />
                <span className="text-accent font-bold text-[10px] uppercase tracking-widest">Traditional Tastes</span>
              </div>
              <h2 className="text-5xl font-display font-bold text-primary mb-6">Festive Flavors</h2>
              <p className="text-text-soft text-lg mb-10 leading-relaxed">
                Homemade sweets and savories prepared with traditional recipes and pure ingredients, just like at home.
              </p>
              <button className="btn-secondary group flex items-center gap-3">
                Explore All Foods <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {festivalFoods.map((food, idx) => (
                <motion.div
                  key={food.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-[48px] overflow-hidden border border-highlight/10 shadow-premium flex flex-col sm:flex-row"
                >
                  <div className="w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden">
                    <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-center">
                    <span className="text-accent font-bold text-[9px] uppercase tracking-widest mb-2">{food.tag}</span>
                    <h3 className="text-2xl font-display font-bold text-primary mb-2">{food.name}</h3>
                    <p className="text-text-soft text-sm mb-6 italic">By {food.creator}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xl font-display font-bold text-primary">₹{food.price}</span>
                      <button className="text-primary font-bold text-[10px] uppercase tracking-widest hover:text-accent transition-colors">Order Now</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gift Bundles */}
        <section className="mb-32 bg-primary rounded-[64px] p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-2xl -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Gift className="w-5 h-5 text-accent" />
                <span className="text-accent font-bold text-[10px] uppercase tracking-widest">Gifting Reimagined</span>
              </div>
              <h2 className="text-5xl font-display font-bold mb-6">Curated Gift Bundles</h2>
              <p className="text-cream/60">Thoughtfully paired heritage items to share the spirit of the festival with your loved ones.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {giftBundles.map((bundle) => (
                <div key={bundle.id} className="group bg-white/5 backdrop-blur-md rounded-[48px] p-8 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3 aspect-square rounded-[32px] overflow-hidden">
                      <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-2xl font-display font-bold mb-3">{bundle.name}</h3>
                      <p className="text-cream/50 text-sm mb-6">{bundle.items}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-2xl font-display font-bold text-accent">₹{bundle.price}</span>
                        <button className="btn-accent !py-3 !px-8 text-[10px]">Gift This</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Artisan */}
        <section>
          <div className="bg-white rounded-[64px] p-16 border border-highlight/10 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <img 
                    src="https://picsum.photos/seed/artisan-fest/800/800" 
                    alt="Featured Artisan" 
                    className="w-full aspect-square rounded-[48px] object-cover shadow-premium"
                  />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-[32px] flex items-center justify-center text-white shadow-2xl">
                    <Star className="w-12 h-12 fill-current" />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-[1px] w-8 bg-accent" />
                  <span className="text-accent font-bold text-[10px] uppercase tracking-widest">Artisan of the Season</span>
                </div>
                <h2 className="text-5xl font-display font-bold text-primary mb-8">Meet Ananya Sharma</h2>
                <p className="text-xl text-text-soft leading-relaxed italic font-serif mb-10">
                  "Diwali is when my workshop comes alive. Every diya I paint is a prayer for prosperity, carrying the light of our traditions to your homes."
                </p>
                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-accent">
                      <Palette className="w-5 h-5" />
                    </div>
                    <span className="text-primary font-bold">Master of Blue Pottery, Jaipur</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-accent">
                      <Star className="w-5 h-5" />
                    </div>
                    <span className="text-primary font-bold">15+ Years of Heritage Crafting</span>
                  </div>
                </div>
                <button className="btn-primary !px-10 !py-5">View Ananya's Collection</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
