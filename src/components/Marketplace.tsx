import React, { useState } from 'react';
import { Search, ChevronDown, Filter, X } from 'lucide-react';
import { ProductCard } from './FeaturedProducts';
import { motion, AnimatePresence } from 'motion/react';

const categories = ['All', 'Pottery', 'Textiles', 'Woodwork', 'Jewelry', 'Paintings'];
const regions = ['All India', 'Jaipur, Rajasthan', 'Varanasi, UP', 'Kutch, Gujarat', 'Bhubaneswar, Odisha'];
const materials = ['Clay', 'Teak Wood', 'Silk', 'Brass', 'Cotton', 'Jute'];

export const Marketplace = ({ onNavigate }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(5000);

  const products = [
    { id: 1, name: 'Hand-Painted Blue Pottery Vase', artisan: 'Ananya Sharma', price: 2450, region: 'Jaipur, Rajasthan', image: 'https://picsum.photos/seed/jaipur-pottery/600/800' },
    { id: 2, name: 'Hand-Woven Banarasi Silk Stole', artisan: 'Rajesh Kumar', price: 4500, region: 'Varanasi, UP', image: 'https://picsum.photos/seed/silk/600/800' },
    { id: 3, name: 'Intricate Teak Wood Carving', artisan: 'Vikram Singh', price: 3200, region: 'Saharanpur, UP', image: 'https://picsum.photos/seed/wood/600/800' },
    { id: 4, name: 'Traditional Meenakari Jhumkas', artisan: 'Priya Das', price: 1800, region: 'Bikaner, Rajasthan', image: 'https://picsum.photos/seed/jewelry-india/600/800' },
    { id: 5, name: 'Hand-Block Printed Cushion', artisan: 'Suresh Meena', price: 850, region: 'Sanganer, Rajasthan', image: 'https://picsum.photos/seed/block-print/600/800' },
    { id: 6, name: 'Terracotta Diya Set', artisan: 'Kavita Devi', price: 450, region: 'Gorakhpur, UP', image: 'https://picsum.photos/seed/diya/600/800' },
    { id: 7, name: 'Hand-Woven Jute Basket', artisan: 'Arjun Das', price: 1200, region: 'Kolkata, WB', image: 'https://picsum.photos/seed/jute/600/800' },
    { id: 8, name: 'Dhokra Art Figurine', artisan: 'Sunita Murmu', price: 2100, region: 'Bastar, Chhattisgarh', image: 'https://picsum.photos/seed/dhokra/600/800' },
  ];

  return (
    <div className="bg-cream min-h-screen mandala-bg">
      <div className="container-custom py-20">
        <div className="mb-16 text-center">
          <h1 className="text-primary mb-4">The Marketplace</h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-accent/30" />
            <div className="text-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" />
              </svg>
            </div>
            <div className="h-[1px] w-12 bg-accent/30" />
          </div>
          <p className="text-text-soft max-w-2xl mx-auto text-lg">
            Browse our curated collection of authentic Indian crafts, direct from the hands of master artisans across the subcontinent.
          </p>
        </div>

        {/* Top Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-primary/5">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
            <input 
              type="text" 
              placeholder="Search by craft, region or artisan..." 
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
                  {categories.map(cat => (
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
                  max="10000" 
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

              {/* Materials */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Material</h4>
                <div className="grid grid-cols-1 gap-3">
                  {materials.map(mat => (
                    <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded border-2 border-primary/10 text-accent focus:ring-accent/20 transition-all" />
                      <span className="text-[15px] text-text-soft group-hover:text-primary transition-colors font-medium">{mat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} {...product} onNavigate={onNavigate} />
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
                    {categories.map(cat => (
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
