import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  Clock, 
  ShieldCheck, 
  Leaf, 
  Info, 
  Truck, 
  Package,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote
} from 'lucide-react';

const foodData = {
  id: 1,
  name: 'Authentic Mysore Pak',
  region: 'Karnataka',
  creator: 'Lakshmi Devi',
  price: 450,
  originalPrice: 550,
  shelfLife: '15 Days',
  type: 'Veg',
  ingredients: ['Gram Flour (Besan)', 'Pure Desi Ghee', 'Sugar', 'Cardamom'],
  images: [
    'https://picsum.photos/seed/mysorepak1/800/800',
    'https://picsum.photos/seed/mysorepak2/800/800',
    'https://picsum.photos/seed/mysorepak3/800/800'
  ],
  heritage: 'Mysore Pak was first created in the kitchens of the Mysore Palace during the regime of Krishna Raja Wadiyar IV, by a palace cook named Madappa. It is a rich, buttery sweet that has become synonymous with Karnataka\'s culinary identity, especially during the Dasara festival.',
  preparation: 'Prepared using traditional iron kadhais, the ghee is heated to a specific temperature before adding the gram flour. The secret lies in the "honeycomb" texture which only experienced hands can achieve through precise timing.',
  creatorQuote: 'This recipe has been in my family for three generations. I still use the same proportions my grandmother taught me.',
  creatorImage: 'https://picsum.photos/seed/artisan-lakshmi/200/200',
  delivery: '3-5 Business Days',
  packaging: 'Eco-friendly Tin Box with vacuum seal'
};

const similarFoods = [
  { id: 2, name: 'Dharwad Peda', price: 380, img: 'https://picsum.photos/seed/peda/400/400', region: 'Karnataka' },
  { id: 3, name: 'Gokak Karadantu', price: 520, img: 'https://picsum.photos/seed/karadantu/400/400', region: 'Karnataka' },
  { id: 4, name: 'Chiroti', price: 290, img: 'https://picsum.photos/seed/chiroti/400/400', region: 'Karnataka' },
  { id: 5, name: 'Holige', price: 350, img: 'https://picsum.photos/seed/holige/400/400', region: 'Karnataka' }
];

export const FoodDetail = ({ onNavigate }: any) => {
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 selection:bg-accent/20">
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-soft mb-12">
          <button onClick={() => onNavigate('home')} className="hover:text-accent transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => onNavigate('marketplace')} className="hover:text-accent transition-colors">Traditional Foods</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">{foodData.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              layoutId={`food-img-${foodData.id}`}
              className="relative aspect-square rounded-[48px] overflow-hidden bg-white border border-highlight/10 shadow-premium"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={foodData.images[activeImg]}
                  alt={foodData.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setActiveImg((prev) => (prev === 0 ? foodData.images.length - 1 : prev - 1))}
                  className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-lg hover:bg-accent hover:text-white transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setActiveImg((prev) => (prev === foodData.images.length - 1 ? 0 : prev + 1))}
                  className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-lg hover:bg-accent hover:text-white transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>

            <div className="flex gap-4">
              {foodData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImg === idx ? 'border-accent scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${foodData.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <Leaf className="w-3 h-3" /> {foodData.type}
                </span>
                <span className="px-4 py-1.5 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Homemade
                </span>
              </div>
              
              <h1 className="text-5xl font-display font-bold text-primary mb-4 leading-tight">{foodData.name}</h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-text-soft text-sm font-medium">(128 Reviews)</span>
                <div className="h-4 w-[1px] bg-highlight/20" />
                <span className="text-text-soft text-sm font-medium">{foodData.region}, India</span>
              </div>

              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-4xl font-display font-bold text-accent">₹{foodData.price}</span>
                <span className="text-xl text-text-soft line-through opacity-50">₹{foodData.originalPrice}</span>
                <span className="text-emerald-600 text-sm font-bold uppercase tracking-widest">Save 18%</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-white/50 p-4 rounded-2xl border border-highlight/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-soft uppercase tracking-widest">Shelf Life</p>
                    <p className="text-sm font-bold text-primary">{foodData.shelfLife}</p>
                  </div>
                </div>
                <div className="bg-white/50 p-4 rounded-2xl border border-highlight/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-soft uppercase tracking-widest">Authentic</p>
                    <p className="text-sm font-bold text-primary">Lab Tested</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-soft flex items-center gap-2">
                  <Info className="w-4 h-4" /> Key Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {foodData.ingredients.map((ing, i) => (
                    <span key={i} className="px-4 py-2 bg-white rounded-xl border border-highlight/10 text-sm font-medium text-primary">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center bg-white rounded-2xl border border-highlight/10 px-4">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 text-primary hover:text-accent transition-colors">-</button>
                  <span className="w-12 text-center font-bold text-primary">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="p-2 text-primary hover:text-accent transition-colors">+</button>
                </div>
                <button className="flex-1 btn-primary !py-5 text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group">
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </button>
                <button className="w-16 h-16 rounded-2xl border border-highlight/10 flex items-center justify-center text-text-soft hover:text-rose-500 hover:bg-white transition-all">
                  <Heart className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="pt-10 border-t border-highlight/10 space-y-6">
              <div className="flex items-center gap-4 text-sm text-text-soft">
                <Truck className="w-5 h-5 text-accent" />
                <span>Delivery within <strong>{foodData.delivery}</strong></span>
              </div>
              <div className="flex items-center gap-4 text-sm text-text-soft">
                <Package className="w-5 h-5 text-accent" />
                <span>Packaging: <strong>{foodData.packaging}</strong></span>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-soft hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" /> Share Recipe
                </button>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-soft hover:text-primary transition-colors">
                  <Quote className="w-4 h-4" /> Ask Creator
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          <div className="lg:col-span-8 space-y-16">
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-accent" />
                <h2 className="text-3xl font-display font-bold text-primary">Food Heritage</h2>
              </div>
              <div className="prose prose-stone max-w-none">
                <p className="text-lg text-text-soft leading-relaxed mb-8 italic font-serif">
                  {foodData.heritage}
                </p>
                <h4 className="text-xl font-display font-bold text-primary mb-4">Preparation Style</h4>
                <p className="text-text-soft leading-relaxed">
                  {foodData.preparation}
                </p>
              </div>
            </section>

            <section className="bg-white rounded-[48px] p-12 border border-highlight/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl rounded-full -mr-32 -mt-32" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="shrink-0">
                  <div className="relative">
                    <img src={foodData.creatorImage} alt={foodData.creator} className="w-32 h-32 rounded-3xl object-cover shadow-xl" />
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-accent rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <Quote className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-serif italic text-primary mb-6 leading-relaxed">
                    "{foodData.creatorQuote}"
                  </p>
                  <div>
                    <h4 className="font-display font-bold text-primary text-xl">{foodData.creator}</h4>
                    <p className="text-accent font-bold text-[10px] uppercase tracking-widest">Master Sweets Maker, {foodData.region}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="bg-primary text-white rounded-[40px] p-10 shadow-2xl shadow-primary/20">
                <h3 className="text-xl font-display font-bold mb-6">Artisan Trust</h3>
                <ul className="space-y-6">
                  {[
                    { title: 'Small Batch', desc: 'Made in limited quantities to ensure quality.' },
                    { title: 'No Preservatives', desc: '100% natural ingredients, no artificial colors.' },
                    { title: 'Fair Trade', desc: 'Direct earnings for the home-chef.' }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm mb-1">{item.title}</h5>
                        <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Foods Carousel */}
        <section>
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-8 bg-accent/30" />
                <span className="text-accent font-bold text-[10px] uppercase tracking-widest">Regional Treasures</span>
              </div>
              <h2 className="text-4xl font-display font-bold text-primary">More from {foodData.region}</h2>
            </div>
            <button className="text-accent font-bold text-[10px] uppercase tracking-widest hover:tracking-[0.2em] transition-all">View All</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarFoods.map((food, idx) => (
              <motion.div
                key={food.id}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[32px] overflow-hidden border border-highlight/10 shadow-sm hover:shadow-premium transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={food.img} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-bold text-primary uppercase tracking-widest">
                      {food.region}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors">{food.name}</h3>
                  <p className="text-accent font-bold text-sm mb-4">₹{food.price}</p>
                  <button className="w-full py-3 bg-cream/50 rounded-xl text-primary font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                    View Product
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
