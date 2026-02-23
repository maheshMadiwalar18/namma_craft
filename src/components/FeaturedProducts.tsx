import React from 'react';
import { Heart, ShoppingCart, ChevronRight, Gavel, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const ProductCard = ({ image, name, artisan, price, region, rarity, stock, isPopularInAuction, onNavigate }: any) => {
  const getRarityColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'one-of-a-kind': return 'bg-purple-500 text-white';
      case 'limited edition': return 'bg-[#CD7F32] text-white'; // Bronze
      case 'rare': return 'bg-[#FFD700] text-primary'; // Gold
      default: return 'bg-slate-200 text-slate-600';
    }
  };

  const getRarityBar = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'one-of-a-kind': return 'w-full bg-purple-500';
      case 'limited edition': return 'w-3/4 bg-[#CD7F32]';
      case 'rare': return 'w-1/2 bg-[#FFD700]';
      default: return 'w-1/4 bg-slate-300';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onNavigate && onNavigate('product')}
      className="group cursor-pointer relative bg-white rounded-[32px] p-4 shadow-sm hover:shadow-premium transition-all duration-500 border border-highlight/10"
    >
      <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-6">
        <img 
          src={image || `https://picsum.photos/seed/indian-craft-${name.replace(/\s+/g, '-').toLowerCase()}/800/1000`} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span className="badge-indian shadow-lg backdrop-blur-md bg-white/80 border-white/50 text-[10px]">
            {region || 'Handmade in India'}
          </span>
          {isPopularInAuction && (
            <span className="badge-indian !bg-primary !text-white border-none text-[9px] shadow-lg flex items-center gap-1">
              <Gavel className="w-3 h-3" /> Popular in Auctions
            </span>
          )}
          {rarity && (
            <span className={`badge-indian border-none text-[9px] shadow-lg font-bold uppercase tracking-widest ${getRarityColor(rarity)}`}>
              {rarity}
            </span>
          )}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-all z-10 shadow-lg hover:scale-110"
        >
          <Heart className="w-4 h-4 text-primary hover:text-accent transition-colors" />
        </button>

        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button className="w-full btn-primary !py-3 text-xs flex items-center justify-center gap-2 shadow-xl">
            <ShoppingCart className="w-4 h-4" /> Add to Collection
          </button>
        </div>
      </div>

      <div className="px-2 pb-2 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xl font-display font-bold text-primary leading-tight group-hover:text-accent transition-colors truncate">{name}</h3>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-soft font-medium flex items-center gap-2">
            <span className="w-4 h-[1px] bg-accent/30" />
            {artisan}
          </p>
          {stock !== undefined && (
            <span className="text-[10px] font-bold text-text-soft uppercase tracking-widest">
              {stock} Available
            </span>
          )}
        </div>

        {rarity && (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-text-soft/60">
              <span>Rarity Level</span>
              <span className="text-primary">{rarity}</span>
            </div>
            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-1000 ${getRarityBar(rarity)}`} />
            </div>
          </div>
        )}

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

export const FeaturedProducts = ({ onNavigate }: any) => {
  const products = [
    { id: 1, name: 'Hand-Painted Blue Pottery Vase', artisan: 'Ananya Sharma', price: 2450, region: 'Jaipur, Rajasthan', image: 'https://picsum.photos/seed/jaipur-pottery/600/800', rarity: 'Rare', stock: 5, isPopularInAuction: true },
    { id: 2, name: 'Hand-Woven Banarasi Silk Stole', artisan: 'Rajesh Kumar', price: 4500, region: 'Varanasi, UP', image: 'https://picsum.photos/seed/silk/600/800', rarity: 'Limited Edition', stock: 2, isPopularInAuction: false },
    { id: 3, name: 'Intricate Teak Wood Carving', artisan: 'Vikram Singh', price: 3200, region: 'Saharanpur, UP', image: 'https://picsum.photos/seed/wood/600/800', rarity: 'One-of-a-kind', stock: 1, isPopularInAuction: true },
    { id: 4, name: 'Traditional Meenakari Jhumkas', artisan: 'Priya Das', price: 1800, region: 'Bikaner, Rajasthan', image: 'https://picsum.photos/seed/jewelry-india/600/800', rarity: 'Common', stock: 12, isPopularInAuction: false },
  ];

  return (
    <section className="section-spacing bg-cream-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cream to-transparent" />
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-primary mb-4">Curated Masterpieces</h2>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-accent" />
              <div className="text-accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" />
                </svg>
              </div>
              <div className="h-[1px] w-12 bg-accent" />
            </div>
            <p className="text-lg text-text-soft text-balance">
              Each creation is a testament to the skill and dedication of our master artisans, preserving techniques passed down through centuries.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('marketplace')}
            className="btn-secondary group flex items-center gap-2"
          >
            View Full Collection
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} {...product} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
};
