import React from 'react';
import { Heart, ShoppingCart, ChevronRight, Gavel, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useToast } from '../ToastContext';

export const ProductCard = ({ id, image, name, artisan, price, region, rarity, stock, isPopularInAuction, onNavigate }: any) => {
  const { showToast } = useToast();
  const [isLiked, setIsLiked] = React.useState(false);

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
      onClick={() => onNavigate && onNavigate(`product/${id || 1}`)}
      className="group cursor-pointer relative bg-white rounded-[20px] sm:rounded-[32px] p-2 sm:p-4 shadow-sm hover:shadow-premium transition-all duration-500 border border-highlight/10"
    >
      <div className="relative aspect-[4/5] rounded-[16px] sm:rounded-[24px] overflow-hidden mb-3 sm:mb-6">
        <img
          src={image || `https://picsum.photos/seed/indian-craft-${name.replace(/\s+/g, '-').toLowerCase()}/800/1000`}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 flex flex-col gap-1 sm:gap-2">
          <span className="badge-indian shadow-lg backdrop-blur-md bg-white/80 border-white/50 text-[8px] sm:text-[10px] px-2 py-0.5 sm:px-3 sm:py-1">
            {region || 'Handmade in India'}
          </span>
          {isPopularInAuction && (
            <span className="badge-indian !bg-primary !text-white border-none text-[8px] sm:text-[9px] shadow-lg flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1">
              <Gavel className="w-2 h-2 sm:w-3 sm:h-3" /> Popular
            </span>
          )}
        </div>

        {/* Handwritten "Handmade" Badge - Hidden on very small mobile to save space */}
        <div className="absolute -right-1 sm:-right-2 top-8 sm:top-12 z-20 rotate-12 pointer-events-none hidden xs:block">
          <div className="bg-accent/90 text-white px-2 sm:px-4 py-0.5 sm:py-1 rounded-lg handwritten text-xs sm:text-lg shadow-lg">
            Handmade
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
            showToast(isLiked ? 'Removed from favorites' : 'Added to favorites');
          }}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 sm:p-3 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-all z-10 shadow-lg hover:scale-110"
        >
          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${isLiked ? 'fill-accent text-accent' : 'text-primary'}`} />
        </button>

        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              showToast('Added to your collection!');
            }}
            className="w-full btn-primary !py-3 text-xs flex items-center justify-center gap-2 shadow-xl"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Collection
          </button>
        </div>
      </div>

      <div className="px-1 sm:px-2 pb-1 sm:pb-2 space-y-1 sm:space-y-3">
        <div className="flex justify-between items-start gap-1 sm:gap-2">
          <h3 className="text-sm sm:text-xl font-display font-bold text-primary leading-tight group-hover:text-accent transition-colors truncate">{name}</h3>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[10px] sm:text-sm text-text-soft font-medium flex items-center gap-1 sm:gap-2">
            <span className="w-3 sm:w-4 h-[1px] bg-accent/30" />
            {artisan}
          </p>
        </div>

        <div className="flex justify-between items-center pt-1 sm:pt-2">
          <span className="text-base sm:text-2xl font-display font-bold text-primary">₹{price.toLocaleString()}</span>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-highlight/20 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all">
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
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
