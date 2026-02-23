import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ChevronRight, 
  Heart, 
  ShoppingBag, 
  Utensils, 
  Palette, 
  Gift, 
  Star,
  Quote,
  Filter,
  Calendar
} from 'lucide-react';
import { ProductCard } from './FeaturedProducts';

const regions = [
  'Rajasthan', 'Karnataka', 'Kerala', 'West Bengal', 'Odisha', 'Gujarat', 'Uttar Pradesh', 'Tamil Nadu'
];

const festivals = [
  'Diwali', 'Holi', 'Onam', 'Durga Puja', 'Pongal', 'Ganesh Chaturthi', 'Eid'
];

const interests = [
  { id: 'decor', label: 'Home Decor', icon: Palette },
  { id: 'collectibles', label: 'Collectibles', icon: Star },
  { id: 'foods', label: 'Traditional Foods', icon: Utensils },
  { id: 'gifts', label: 'Gifts', icon: Gift },
];

const discoveryData = {
  crafts: [
    { id: 1, name: 'Hand-Painted Blue Pottery Vase', artisan: 'Ananya Sharma', price: 2450, region: 'Jaipur, Rajasthan', image: 'https://picsum.photos/seed/jaipur-pottery/600/800', rarity: 'Rare', stock: 5, isPopularInAuction: true },
    { id: 2, name: 'Hand-Woven Banarasi Silk Stole', artisan: 'Rajesh Kumar', price: 4500, region: 'Varanasi, UP', image: 'https://picsum.photos/seed/silk/600/800', rarity: 'Limited Edition', stock: 2, isPopularInAuction: false },
  ],
  foods: [
    { id: 1, name: 'Authentic Mysore Pak', creator: 'Lakshmi Devi', price: 450, region: 'Mysore, Karnataka', tag: 'Homemade', image: 'https://picsum.photos/seed/mysorepak/600/800' },
    { id: 2, name: 'Rajasthani Ghevar', creator: 'Shanti Devi', price: 650, region: 'Jaipur, Rajasthan', tag: 'Festival Special', image: 'https://picsum.photos/seed/ghevar/600/800' },
  ],
  artisans: [
    { 
      id: 1, 
      name: 'Suresh Murmu', 
      craft: 'Dhokra Art', 
      region: 'Bastar, Chhattisgarh', 
      image: 'https://picsum.photos/seed/artisan-suresh/400/400',
      story: 'Preserving the 4,000-year-old lost wax casting technique passed down through generations in his tribe.'
    },
    { 
      id: 2, 
      name: 'Ananya Sharma', 
      craft: 'Blue Pottery', 
      region: 'Jaipur, Rajasthan', 
      image: 'https://picsum.photos/seed/artisan-ananya/400/400',
      story: 'Reviving the Persian-influenced art of blue pottery with contemporary floral motifs.'
    }
  ]
};

export const CulturalDiscovery = ({ onNavigate }: any) => {
  const [selectedRegion, setSelectedRegion] = useState('Rajasthan');
  const [selectedFestival, setSelectedFestival] = useState('Diwali');
  const [activeInterests, setActiveInterests] = useState<string[]>(['decor', 'foods']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleInterest = (id: string) => {
    setActiveInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3" /> Personalized Cultural Picks for You
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-6">Discover India’s Soul</h1>
          <p className="text-text-soft text-lg">Explore curated heritage crafts and flavors based on your interests and regions.</p>
        </div>

        {/* Discovery Filters */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[48px] p-8 md:p-12 border border-highlight/10 shadow-premium mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-4 space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4 flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Select Region
              </label>
              <div className="relative">
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full appearance-none px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-bold text-primary cursor-pointer"
                >
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft rotate-90 pointer-events-none" />
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Festival Context
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <select 
                    value={selectedFestival}
                    onChange={(e) => setSelectedFestival(e.target.value)}
                    className="w-full appearance-none px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-bold text-primary cursor-pointer"
                  >
                    {festivals.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft rotate-90 pointer-events-none" />
                </div>
                <button 
                  onClick={() => onNavigate('festival-home')}
                  className="px-6 py-4 bg-accent text-white rounded-2xl hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 flex items-center justify-center group"
                  title="View Festival Collection"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4 flex items-center gap-2">
                <Search className="w-3 h-3" /> Quick Search
              </label>
              <input 
                type="text" 
                placeholder="Search anything cultural..."
                className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-bold text-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-10 pt-10 border-t border-highlight/10">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-soft mb-6 text-center">What are you looking for today?</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {interests.map(interest => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border-2 ${
                    activeInterests.includes(interest.id)
                      ? 'bg-primary text-white border-primary shadow-lg'
                      : 'bg-cream/30 text-text-soft border-transparent hover:bg-cream/50'
                  }`}
                >
                  <interest.icon className="w-4 h-4" />
                  {interest.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Curated Sections */}
        <div className="space-y-32">
          {/* Crafts Section */}
          <section>
            <div className="flex justify-between items-end mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-8 bg-accent/30" />
                  <span className="text-accent font-bold text-[10px] uppercase tracking-widest">Heritage Crafts</span>
                </div>
                <h2 className="text-4xl font-display font-bold text-primary">Masterpieces from {selectedRegion}</h2>
              </div>
              <button onClick={() => onNavigate('marketplace')} className="text-accent font-bold text-[10px] uppercase tracking-widest hover:tracking-[0.2em] transition-all flex items-center gap-2">
                Explore All <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {discoveryData.crafts.map(craft => (
                <ProductCard key={craft.id} {...craft} onNavigate={onNavigate} />
              ))}
            </div>
          </section>

          {/* Traditional Foods Section */}
          <section>
            <div className="flex justify-between items-end mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-8 bg-accent/30" />
                  <span className="text-accent font-bold text-[10px] uppercase tracking-widest">Culinary Heritage</span>
                </div>
                <h2 className="text-4xl font-display font-bold text-primary">Traditional Flavors</h2>
              </div>
              <button onClick={() => onNavigate('marketplace')} className="text-accent font-bold text-[10px] uppercase tracking-widest hover:tracking-[0.2em] transition-all flex items-center gap-2">
                Explore All <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {discoveryData.foods.map(food => (
                <motion.div
                  key={food.id}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-[40px] overflow-hidden border border-highlight/10 shadow-sm hover:shadow-premium transition-all"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
                        {food.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Utensils className="w-3 h-3 text-accent" />
                      <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{food.region}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors">{food.name}</h3>
                    <p className="text-text-soft text-sm mb-6 italic">Handcrafted by {food.creator}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-display font-bold text-accent">₹{food.price}</span>
                      <button 
                        onClick={() => onNavigate('food-detail')}
                        className="px-6 py-3 bg-cream rounded-xl text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Featured Artisans Section */}
          <section>
            <div className="flex items-center gap-3 mb-12">
              <div className="h-[1px] w-8 bg-accent/30" />
              <span className="text-accent font-bold text-[10px] uppercase tracking-widest">The Hands Behind the Craft</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {discoveryData.artisans.map(artisan => (
                <motion.div
                  key={artisan.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-[48px] p-10 border border-highlight/10 shadow-premium flex flex-col md:flex-row items-center gap-10 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full -mr-16 -mt-16" />
                  <div className="shrink-0">
                    <img src={artisan.image} alt={artisan.name} className="w-40 h-40 rounded-[32px] object-cover shadow-xl" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-3 h-3 text-accent" />
                      <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{artisan.region}</span>
                    </div>
                    <h3 className="text-3xl font-display font-bold text-primary mb-4">{artisan.name}</h3>
                    <p className="text-text-soft text-sm leading-relaxed mb-6 italic font-serif">
                      <Quote className="w-4 h-4 inline-block mr-2 text-accent/30" />
                      {artisan.story}
                    </p>
                    <button 
                      onClick={() => onNavigate('artisan')}
                      className="text-primary font-bold text-[10px] uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2"
                    >
                      Read Full Story <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
