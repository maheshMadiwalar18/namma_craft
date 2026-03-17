import React, { useState } from 'react';
import { Search, ChevronDown, Filter, X, ShoppingBag, Heart, ChevronRight, Utensils } from 'lucide-react';
import { ProductCard } from './FeaturedProducts';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../ToastContext';
import { useCart } from '../CartContext';

import {
  craftCategories,
  foodCategories,
  regions,
  foodSpecialties,
  craftProducts,
  foodProducts
} from '../data/marketplace';

const FoodCard = ({ id, image, name, creator, price, region, tag, onNavigate }: any) => {
  const { showToast } = useToast();
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onNavigate?.('food-detail')}
      className="group cursor-pointer relative bg-white rounded-[20px] sm:rounded-[32px] p-2 sm:p-4 shadow-sm hover:shadow-premium transition-all duration-500 border border-highlight/10"
    >
      <div className="relative aspect-[4/5] rounded-[16px] sm:rounded-[24px] overflow-hidden mb-3 sm:mb-6">
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
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
            showToast(isLiked ? 'Removed from favorites' : 'Added to favorites');
          }}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-all z-10 shadow-lg hover:scale-110"
        >
          <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-accent text-accent' : 'text-primary'}`} />
        </button>

        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id: id || `food_${name.toLowerCase().replaceAll(/\s/g, '_')}`,
                image,
                name,
                artisan: creator,
                price,
                region,
                tag
              });
            }}
            className="w-full btn-primary !py-3 text-xs flex items-center justify-center gap-2 shadow-xl"
          >
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="px-2 pb-2 space-y-2">
        <div className="flex justify-between items-start gap-1 sm:gap-2">
          <h3 className="text-sm sm:text-xl font-display font-bold text-primary leading-tight group-hover:text-accent transition-colors truncate">{name}</h3>
        </div>
        <p className="text-[10px] sm:text-sm text-text-soft font-medium flex items-center gap-1 sm:gap-2 italic">
          <span className="w-3 sm:w-4 h-[1px] bg-accent/30" />
          By {creator}
        </p>
        <div className="flex justify-between items-center pt-2">
          <span className="text-base sm:text-2xl font-display font-bold text-primary">₹{price.toLocaleString()}</span>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-highlight/20 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all">
            <ChevronRight className="w-3 h-3 sm:w-4 h-4" />
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



  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All India');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterJoin = () => {
    if (newsletterEmail) {
      showToast('Welcome! Artisan previews will be sent to ' + newsletterEmail);
      setNewsletterEmail('');
    } else {
      showToast('Please enter a valid email address', 'error');
    }
  };


  const toggleMaterial = (material: string) => {
    setCurrentPage(1); // Reset to first page when filtering
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const activeProducts = (activeTab === 'crafts' ? craftProducts : foodProducts).filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.artisan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.creator?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

    const matchesRegion = selectedRegion === 'All India' || p.region.includes(selectedRegion.split(',')[0]);

    const matchesMaterial = selectedMaterials.length === 0 ||
      (activeTab === 'crafts'
        ? selectedMaterials.some(m => p.material?.includes(m) || p.name.includes(m))
        : selectedMaterials.includes(p.tag));

    return matchesSearch && matchesCategory && matchesRegion && matchesMaterial && p.price <= priceRange;
  }).sort((a: any, b: any) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Newest Arrivals') return b.id - a.id;
    if (sortBy === 'Artisan (A-Z)') {
      const nameA = (a.artisan || a.creator || '').toLowerCase();
      const nameB = (b.artisan || b.creator || '').toLowerCase();
      return nameA.localeCompare(nameB);
    }
    return 0; // Popular (Default order)
  });

  const totalPages = Math.ceil(activeProducts.length / itemsPerPage);
  const paginatedProducts = activeProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
                onClick={() => { setActiveTab('crafts'); setSelectedCategory('All'); setCurrentPage(1); }}
                className={`px-10 py-3 rounded-[20px] text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'crafts' ? 'bg-primary text-white shadow-lg' : 'text-text-soft hover:text-primary'
                  }`}
              >
                Handmade Crafts
              </button>
              <button
                onClick={() => { setActiveTab('foods'); setSelectedCategory('All'); setCurrentPage(1); }}
                className={`px-10 py-3 rounded-[20px] text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'foods' ? 'bg-primary text-white shadow-lg' : 'text-text-soft hover:text-primary'
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
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
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
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className="w-full appearance-none input-field !py-3 pl-6 pr-12 text-sm font-bold text-primary cursor-pointer !bg-white/60 focus:outline-none"
              >
                <option value="Popular">Sort by: Popular</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Newest Arrivals">Newest Arrivals</option>
                <option value="Artisan (A-Z)">Artisan (A-Z)</option>
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
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                          className="peer appearance-none w-5 h-5 rounded-full border-2 border-primary/10 checked:border-accent transition-all"
                        />
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
                  onChange={(e) => { setPriceRange(Number.parseInt(e.target.value)); setCurrentPage(1); }}
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
                  <select
                    value={selectedRegion}
                    onChange={(e) => { setSelectedRegion(e.target.value); setCurrentPage(1); }}
                    className="w-full appearance-none input-field !py-3 pl-5 pr-12 text-sm font-bold text-primary cursor-pointer !bg-white/60 focus:outline-none"
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
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
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(tag)}
                        onChange={() => toggleMaterial(tag)}
                        className="w-5 h-5 rounded border-2 border-primary/10 text-accent focus:ring-accent/20 transition-all cursor-pointer"
                      />
                      <span className="text-[15px] text-text-soft group-hover:text-primary transition-colors font-medium">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sell CTA */}
              <div className="bg-primary p-8 rounded-[32px] text-cream relative overflow-hidden">
                <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
                <div className="relative z-10">
                  <h4 className="font-display font-bold text-lg mb-4">Are you an Artisan?</h4>
                  <p className="text-xs text-cream/60 mb-6 leading-relaxed">
                    Join our community of master creators and share your heritage with the world.
                  </p>
                  <button
                    onClick={() => onNavigate('sell-product')}
                    className="w-full btn-accent !py-2.5 !px-4 text-[10px] uppercase tracking-widest"
                  >
                    Start Selling
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
              {paginatedProducts.map(product => (
                activeTab === 'crafts'
                  ? <ProductCard key={product.id} {...product} onNavigate={onNavigate} />
                  : <FoodCard key={product.id} {...product} onNavigate={onNavigate} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ←
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={`page-${i + 1}`}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${i + 1 === currentPage ? 'bg-primary text-white shadow-lg' : 'bg-white text-primary border border-primary/5 hover:border-accent'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="pt-16 pb-0 bg-primary text-cream mandala-bg relative overflow-hidden">
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
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="input-field !bg-white/5 !border-white/10 !text-white placeholder:text-white/30 !rounded-full !px-8"
            />
            <button onClick={handleNewsletterJoin} className="btn-accent whitespace-nowrap !px-10">Join Now</button>
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
                {/* Mobile Category */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Category</h4>
                  <div className="space-y-3">
                    {activeCategories.map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="m-category"
                          checked={selectedCategory === cat}
                          onChange={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                          className="accent-accent w-5 h-5 focus:ring-0"
                        />
                        <span className="text-text-soft font-medium">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mobile Price Range */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max={activeTab === 'crafts' ? 10000 : 2000}
                    value={priceRange}
                    onChange={(e) => { setPriceRange(Number.parseInt(e.target.value)); setCurrentPage(1); }}
                    className="w-full accent-accent h-1.5 bg-primary/5 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-4 text-[10px] font-bold text-primary">
                    <span>₹0</span>
                    <span className="text-accent">₹{priceRange}</span>
                  </div>
                </div>

                {/* Mobile Region */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Region</h4>
                  <div className="relative">
                    <select
                      value={selectedRegion}
                      onChange={(e) => { setSelectedRegion(e.target.value); setCurrentPage(1); }}
                      className="w-full appearance-none input-field !py-3 pl-5 pr-12 text-sm font-bold text-primary cursor-pointer !bg-white/60 focus:outline-none"
                    >
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft pointer-events-none" />
                  </div>
                </div>

                {/* Mobile Specialty / Materials */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
                    {activeTab === 'crafts' ? 'Material' : 'Specialty'}
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {(activeTab === 'crafts' ? ['Clay', 'Teak Wood', 'Silk', 'Brass', 'Cotton'] : foodSpecialties).map(tag => (
                      <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(tag)}
                          onChange={() => toggleMaterial(tag)}
                          className="w-5 h-5 rounded border-2 border-primary/10 text-accent focus:ring-accent/20 transition-all cursor-pointer"
                        />
                        <span className="text-[15px] text-text-soft group-hover:text-primary transition-colors font-medium">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full btn-primary h-14"
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
