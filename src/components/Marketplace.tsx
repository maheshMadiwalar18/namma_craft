import React, { useState } from 'react';
import { Search, ChevronDown, Filter, X, ShoppingBag, Heart, ChevronRight, Utensils, Leaf } from 'lucide-react';
import { ProductCard } from './FeaturedProducts';
import { motion, AnimatePresence } from 'motion/react';

const craftCategories = ['All', 'Pottery', 'Textiles', 'Woodwork', 'Jewelry', 'Paintings'];
const foodCategories = ['All', 'Sweets', 'Savories', 'Spices', 'Pickles', 'Beverages'];
const regions = ['All India', 'Jaipur, Rajasthan', 'Varanasi, UP', 'Kutch, Gujarat', 'Bhubaneswar, Odisha', 'Mysore, Karnataka'];
const foodSpecialties = ['All', 'Homemade', 'Festival Special', 'Organic', 'Vegan'];

const FoodCard = ({ image, name, creator, price, region, tag, onNavigate }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onNavigate && onNavigate('food-detail')}
      className="group cursor-pointer relative bg-white rounded-[32px] p-4 shadow-sm hover:shadow-premium transition-all duration-500 border border-highlight/10"
    >
      <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-6">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span className="badge-indian shadow-lg backdrop-blur-md bg-white/80 border-white/50 text-[10px]">
            {region}
          </span>
          <span className="badge-indian !bg-accent/90 !text-white border-none text-[9px] shadow-lg flex items-center gap-1">
            <Utensils className="w-2 h-2" /> {tag}
          </span>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-all z-10 shadow-lg hover:scale-110"
        >
          <Heart className="w-4 h-4 text-primary hover:text-accent transition-colors" />
        </button>

        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button className="w-full btn-primary !py-3 text-xs flex items-center justify-center gap-2 shadow-xl">
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="px-2 pb-2 space-y-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xl font-display font-bold text-primary leading-tight group-hover:text-accent transition-colors truncate">{name}</h3>
        </div>
        <p className="text-sm text-text-soft font-medium flex items-center gap-2 italic">
          <span className="w-4 h-[1px] bg-accent/30" />
          By {creator}
        </p>
        <div className="flex justify-between items-center pt-2">
          <span className="text-2xl font-display font-bold text-primary">₹{price.toLocaleString()}</span>
          <div className="w-8 h-8 rounded-full border border-highlight/20 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Marketplace = ({ onNavigate }: any) => {
  const [activeTab, setActiveTab] = useState<'crafts' | 'foods'>('crafts');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(5000);

  const craftProducts = [
    { id: 1, name: 'Hand-Painted Blue Pottery Vase', artisan: 'Ananya Sharma', price: 2450, region: 'Jaipur, Rajasthan', image: 'https://picsum.photos/seed/jaipur-pottery/600/800', rarity: 'Rare', stock: 5, isPopularInAuction: true },
    { id: 2, name: 'Hand-Woven Banarasi Silk Stole', artisan: 'Rajesh Kumar', price: 4500, region: 'Varanasi, UP', image: 'https://picsum.photos/seed/silk/600/800', rarity: 'Limited Edition', stock: 2, isPopularInAuction: false },
    { id: 3, name: 'Intricate Teak Wood Carving', artisan: 'Vikram Singh', price: 3200, region: 'Saharanpur, UP', image: 'https://picsum.photos/seed/wood/600/800', rarity: 'One-of-a-kind', stock: 1, isPopularInAuction: true },
    { id: 4, name: 'Traditional Meenakari Jhumkas', artisan: 'Priya Das', price: 1800, region: 'Bikaner, Rajasthan', image: 'https://picsum.photos/seed/jewelry-india/600/800', rarity: 'Common', stock: 12, isPopularInAuction: false },
    { id: 5, name: 'Hand-Block Printed Cushion', artisan: 'Suresh Meena', price: 850, region: 'Sanganer, Rajasthan', image: 'https://picsum.photos/seed/block-print/600/800', rarity: 'Common', stock: 25, isPopularInAuction: false },
    { id: 6, name: 'Terracotta Diya Set', artisan: 'Kavita Devi', price: 450, region: 'Gorakhpur, UP', image: 'https://picsum.photos/seed/diya/600/800', rarity: 'Common', stock: 50, isPopularInAuction: true },
    { id: 7, name: 'Hand-Woven Jute Basket', artisan: 'Arjun Das', price: 1200, region: 'Kolkata, WB', image: 'https://picsum.photos/seed/jute/600/800', rarity: 'Rare', stock: 8, isPopularInAuction: false },
    { id: 8, name: 'Dhokra Art Figurine', artisan: 'Sunita Murmu', price: 2100, region: 'Bastar, Chhattisgarh', image: 'https://picsum.photos/seed/dhokra/600/800', rarity: 'Limited Edition', stock: 3, isPopularInAuction: true },
  ];

  const foodProducts = [
    { id: 1, name: 'Authentic Mysore Pak', creator: 'Lakshmi Devi', price: 450, region: 'Mysore, Karnataka', tag: 'Homemade', image: 'https://picsum.photos/seed/mysorepak/600/800' },
    { id: 2, name: 'Rajasthani Ghevar', creator: 'Shanti Devi', price: 650, region: 'Jaipur, Rajasthan', tag: 'Festival Special', image: 'https://picsum.photos/seed/ghevar/600/800' },
    { id: 3, name: 'Malabar Parotta (Pack of 5)', creator: 'Mariam Beevi', price: 180, region: 'Kozhikode, Kerala', tag: 'Homemade', image: 'https://picsum.photos/seed/parotta/600/800' },
    { id: 4, name: 'Organic Lakadong Turmeric', creator: 'Kong Mary', price: 320, region: 'Jaintia Hills, Meghalaya', tag: 'Organic', image: 'https://picsum.photos/seed/turmeric/600/800' },
    { id: 5, name: 'Hand-Pounded Red Rice', creator: 'Suresh Gowda', price: 240, region: 'Coorg, Karnataka', tag: 'Organic', image: 'https://picsum.photos/seed/redrice/600/800' },
    { id: 6, name: 'Spicy Mango Pickle', creator: 'Amma\'s Kitchen', price: 150, region: 'Guntur, AP', tag: 'Homemade', image: 'https://picsum.photos/seed/pickle/600/800' },
    { id: 7, name: 'Darjeeling First Flush Tea', creator: 'Tenzing Norgay', price: 850, region: 'Darjeeling, WB', tag: 'Specialty', image: 'https://picsum.photos/seed/tea/600/800' },
    { id: 8, name: 'Kashmiri Saffron (1g)', creator: 'Bilal Ahmad', price: 450, region: 'Pampore, J&K', tag: 'Specialty', image: 'https://picsum.photos/seed/saffron/600/800' },
  ];

  const activeProducts = activeTab === 'crafts' ? craftProducts : foodProducts;
  const activeCategories = activeTab === 'crafts' ? craftCategories : foodCategories;

  return (
    <div className="bg-cream min-h-screen mandala-bg">
      <div className="container-custom py-20">
        <div className="mb-16 text-center">
          <h1 className="text-primary mb-4">The Marketplace</h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-accent/30" />
            <div className="text-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" />
              </svg>
            </div>
            <div className="h-[1px] w-12 bg-accent/30" />
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-[24px] border border-primary/5 flex gap-2">
              <button 
                onClick={() => setActiveTab('crafts')}
                className={`px-10 py-3 rounded-[20px] text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === 'crafts' ? 'bg-primary text-white shadow-lg' : 'text-text-soft hover:text-primary'
                }`}
              >
                Handmade Crafts
              </button>
              <button 
                onClick={() => setActiveTab('foods')}
                className={`px-10 py-3 rounded-[20px] text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === 'foods' ? 'bg-primary text-white shadow-lg' : 'text-text-soft hover:text-primary'
                }`}
              >
                Traditional Foods
              </button>
            </div>
          </div>

          <p className="text-text-soft max-w-2xl mx-auto text-lg">
            {activeTab === 'crafts' 
              ? 'Browse our curated collection of authentic Indian crafts, direct from the hands of master artisans.'
              : 'Discover homemade delicacies and regional specialties crafted using traditional recipes.'}
          </p>
        </div>

        {/* Top Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-primary/5">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
            <input 
              type="text" 
              placeholder={`Search by ${activeTab === 'crafts' ? 'craft' : 'food'}, region or creator...`} 
              className="search-bar w-full pl-12 pr-6 !h-[50px] !bg-white/60"
            />
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 btn-secondary !py-2.5 !px-6 text-sm"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
            
            <div className="relative flex-1 lg:flex-none">
              <select className="w-full appearance-none input-field !py-3 pl-6 pr-12 text-sm font-bold text-primary cursor-pointer !bg-white/60">
                <option>Sort by: Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-12">
              {/* Category */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Category</h4>
                <div className="space-y-3">
                  {activeCategories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input type="radio" name="category" className="peer appearance-none w-5 h-5 rounded-full border-2 border-primary/10 checked:border-accent transition-all" defaultChecked={cat === 'All'} />
                        <div className="absolute w-2 h-2 rounded-full bg-accent opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[15px] text-text-soft group-hover:text-primary transition-colors font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Price Range</h4>
                <input 
                  type="range" 
                  min="0" 
                  max={activeTab === 'crafts' ? 10000 : 2000} 
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-accent h-1.5 bg-primary/5 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-4 text-sm font-bold text-primary">
                  <span>₹0</span>
                  <span className="text-accent">₹{priceRange}</span>
                </div>
              </div>

              {/* Region */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Region</h4>
                <div className="relative">
                  <select className="w-full appearance-none input-field !py-3 pl-5 pr-12 text-sm font-bold text-primary cursor-pointer !bg-white/60">
                    {regions.map(region => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft pointer-events-none" />
                </div>
              </div>

              {/* Specialty / Materials */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">
                  {activeTab === 'crafts' ? 'Material' : 'Specialty'}
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {(activeTab === 'crafts' ? ['Clay', 'Teak Wood', 'Silk', 'Brass', 'Cotton'] : foodSpecialties).map(tag => (
                    <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded border-2 border-primary/10 text-accent focus:ring-accent/20 transition-all" />
                      <span className="text-[15px] text-text-soft group-hover:text-primary transition-colors font-medium">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeProducts.map(product => (
                activeTab === 'crafts' 
                  ? <ProductCard key={product.id} {...product} onNavigate={onNavigate} />
                  : <FoodCard key={product.id} {...product} onNavigate={onNavigate} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-20 flex justify-center items-center gap-4">
              <button className="w-12 h-12 rounded-full flex items-center justify-center border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all">←</button>
              <div className="flex gap-2">
                {[1, 2, 3].map(n => (
                  <button 
                    key={n} 
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${n === 1 ? 'bg-primary text-white shadow-lg' : 'bg-white text-primary border border-primary/5 hover:border-accent'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <button className="w-12 h-12 rounded-full flex items-center justify-center border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all">→</button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="section-spacing bg-primary text-cream mandala-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-white mb-8">Can't find what you're looking for?</h2>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-accent/40" />
            <div className="text-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" />
              </svg>
            </div>
            <div className="h-[1px] w-12 bg-accent/40" />
          </div>
          <p className="text-cream/70 mb-12 max-w-2xl mx-auto text-lg font-light">
            Our artisans are always crafting new masterpieces. Join our inner circle to get notified about exclusive drops and custom commission opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="Enter your email address" className="input-field !bg-white/5 !border-white/10 !text-white placeholder:text-white/30 !rounded-full !px-8" />
            <button className="btn-accent whitespace-nowrap !px-10">Join Now</button>
          </div>
        </div>
      </section>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-md z-[60]"
            />
            <motion.aside 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-cream z-[70] p-10 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-primary">Filters</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-primary/5 rounded-full transition-colors">
                  <X className="w-6 h-6 text-primary" />
                </button>
              </div>
              
              <div className="space-y-12">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Category</h4>
                  <div className="space-y-3">
                    {activeCategories.map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="m-category" className="accent-accent w-5 h-5" defaultChecked={cat === 'All'} />
                        <span className="text-text-soft font-medium">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full btn-primary"
                >
                  Apply Filters
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
