import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Minus, Plus, ShoppingCart, Zap, Heart, Share2, ChevronLeft, ChevronRight, MapPin, Gavel, ShieldCheck, Truck, Package, Gem, Award } from 'lucide-react';
import { ProductCard } from './FeaturedProducts';
import { AuthenticityCertificate } from './AuthenticityCertificate';

export const ProductDetail = ({ onNavigate }: any) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  const product = {
    name: 'Hand-Painted Blue Pottery Vase',
    price: 2450,
    artisan: 'Ananya Sharma',
    location: 'Jaipur, Rajasthan',
    origin: 'Made in Jaipur, India',
    rating: 4.9,
    reviews: 124,
    materials: 'Quartz Stone, Glass, Multani Mitti',
    dimensions: '12" H x 6" W',
    availability: 'In Stock',
    images: [
      'https://picsum.photos/seed/jaipur-pottery/800/1000',
      'https://picsum.photos/seed/pottery-detail-1/800/1000',
      'https://picsum.photos/seed/pottery-detail-2/800/1000',
      'https://picsum.photos/seed/pottery-detail-3/800/1000',
    ],
    description: 'This exquisite blue pottery vase is a masterpiece of Jaipur craftsmanship. Each piece is hand-painted with intricate floral motifs using traditional cobalt blue and turquoise dyes. The unique glaze and texture are achieved through a laborious process that involves no clay, making it a rare and precious addition to your home decor.',
    culturalStory: 'Blue Pottery is a traditional craft of Jaipur, Rajasthan, with roots tracing back to Turko-Persian origins. Unlike conventional pottery, it does not use clay; instead, it is made from a mix of quartz stone powder, powdered glass, Multani Mitti (Fuller\'s Earth), borax, gum, and water. The art was brought to Jaipur in the 17th century and has since become an iconic symbol of the city\'s rich artistic heritage.',
    artisanQuote: 'Every brushstroke is a conversation with history, and each kiln firing is a prayer for perfection.',
  };

  const relatedProducts = [
    { id: 101, name: 'Hand-Block Printed Cushion', artisan: 'Suresh Meena', price: 850, image: 'https://picsum.photos/seed/block-print/600/800' },
    { id: 102, name: 'Terracotta Diya Set', artisan: 'Kavita Devi', price: 450, image: 'https://picsum.photos/seed/diya/600/800' },
    { id: 103, name: 'Hand-Woven Jute Basket', artisan: 'Arjun Das', price: 1200, image: 'https://picsum.photos/seed/jute/600/800' },
    { id: 104, name: 'Dhokra Art Figurine', artisan: 'Sunita Murmu', price: 2100, image: 'https://picsum.photos/seed/dhokra/600/800' },
  ];

  return (
    <div className="bg-cream min-h-screen pb-20 selection:bg-accent/20">
      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-text-soft/60 mb-12">
          <button onClick={() => onNavigate('home')} className="hover:text-accent transition-colors">Home</button>
          <span className="text-[8px]">/</span>
          <button onClick={() => onNavigate('marketplace')} className="hover:text-accent transition-colors">Marketplace</button>
          <span className="text-[8px]">/</span>
          <span className="text-primary font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-6 relative">
            <div className="absolute top-8 left-8 z-10">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="badge-indian shadow-premium backdrop-blur-md bg-white/80 border-white/50"
              >
                Handcrafted in {product.location}
              </motion.span>
            </div>
            
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-premium bg-white group">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <div className="absolute inset-y-0 left-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="p-4 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-xl hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-primary" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="p-4 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-xl hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-primary" />
                </button>
              </div>
              
              {/* Image Indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeImage === idx ? 'w-8 bg-white' : 'w-1.5 bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImage === idx ? 'border-accent scale-105 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button 
                onClick={() => onNavigate('artisan')}
                className="group inline-flex items-center gap-3 mb-6"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors">
                  <img src="https://picsum.photos/seed/indian-face/100/100" alt={product.artisan} className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-accent font-bold uppercase tracking-widest leading-none mb-1">Master Artisan</p>
                  <p className="text-primary font-display font-bold text-lg leading-none group-hover:text-accent transition-colors">{product.artisan}</p>
                </div>
              </button>
              
              <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-4 leading-[1.1] tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => setIsCertificateOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-accent/5 hover:bg-accent/10 text-accent rounded-full border border-accent/20 transition-all group"
                >
                  <Award className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Digital Authenticity Certificate</span>
                </button>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <span className="badge-indian !bg-accent/10 !text-accent !border-accent/20">Handmade</span>
                <span className="badge-indian !bg-primary/5 !text-primary !border-primary/10">Traditional Craft</span>
              </div>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-1 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-accent' : 'fill-highlight text-highlight'}`} />
                  ))}
                  <span className="ml-2 font-bold text-primary">4.9</span>
                </div>
                <div className="h-4 w-[1px] bg-highlight/30" />
                <span className="text-text-soft text-sm font-medium">{product.reviews} Patrons</span>
              </div>
              
              <div className="mb-10">
                <p className="text-5xl font-display font-bold text-primary">₹{product.price.toLocaleString()}</p>
                <p className="text-text-soft text-sm mt-2">Inclusive of all taxes • Free shipping in India</p>
              </div>

              <div className="space-y-10">
                <div className="flex items-center gap-8">
                  <span className="font-bold text-primary uppercase tracking-widest text-xs">Quantity</span>
                  <div className="flex items-center border-2 border-highlight/20 rounded-full p-1.5 bg-white/50 backdrop-blur-sm shadow-sm">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 hover:bg-accent/10 rounded-full transition-all text-primary"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-display font-bold text-xl text-primary">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 hover:bg-accent/10 rounded-full transition-all text-primary"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 btn-primary flex items-center justify-center gap-3 !py-5 text-lg shadow-xl shadow-primary/20 group">
                    <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" /> 
                    Buy Now
                  </button>
                  <button 
                    onClick={() => onNavigate('auction')}
                    className="flex-1 btn-secondary flex items-center justify-center gap-3 !py-5 text-lg shadow-xl group"
                  >
                    <Gavel className="w-6 h-6 group-hover:scale-110 transition-transform" /> 
                    Join Auction
                  </button>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-highlight/20">
                  <div className="flex gap-8">
                    <button className="flex items-center gap-2 text-text-soft hover:text-accent transition-all text-xs font-bold uppercase tracking-widest">
                      <Heart className="w-4 h-4" /> Wishlist
                    </button>
                    <button className="flex items-center gap-2 text-text-soft hover:text-accent transition-all text-xs font-bold uppercase tracking-widest">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">In Stock</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Craft Story Section */}
        <section className="mb-32 relative overflow-hidden rounded-[60px] bg-cream-dark p-12 md:p-24 border border-highlight/20">
          <div className="absolute inset-0 mandala-bg opacity-[0.02] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-accent" />
                <span className="text-accent font-bold text-sm tracking-[0.3em] uppercase">Craft Story</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-primary mb-10 leading-tight">The Legacy of Jaipur Blue Pottery</h2>
              <div className="prose prose-lg text-text-soft font-light leading-relaxed space-y-6">
                <p>{product.culturalStory}</p>
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">Materials</p>
                    <p className="text-primary font-medium">{product.materials}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">Process</p>
                    <p className="text-primary font-medium">17th Century Persian Technique</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[40px] overflow-hidden shadow-premium">
                <img 
                  src="https://picsum.photos/seed/artisan-working/800/800" 
                  alt="Artisan at work" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="absolute -bottom-10 -left-10 right-10 glass-premium p-10 rounded-[32px] border-white/40"
              >
                <p className="text-primary font-display italic text-2xl mb-6 leading-tight">"{product.artisanQuote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20">
                    <img src="https://picsum.photos/seed/indian-face/100/100" alt={product.artisan} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-primary font-bold">{product.artisan}</p>
                    <p className="text-[10px] text-accent uppercase tracking-widest font-bold">Master Artisan, Jaipur</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Details & Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          <div className="lg:col-span-4 space-y-12">
            <div className="glass-premium p-10 rounded-[40px] border border-white/60 shadow-premium">
              <h3 className="text-2xl font-display font-bold mb-8 text-primary">Product Details</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Gem className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-1">Materials</p>
                    <p className="text-primary font-medium">{product.materials}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-1">Dimensions</p>
                    <p className="text-primary font-medium">{product.dimensions}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-1">Origin</p>
                    <p className="text-primary font-medium">{product.origin}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-1">Delivery</p>
                    <p className="text-primary font-medium">Free shipping in India • 7-10 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h3 className="text-4xl font-display font-bold text-primary">Collector Reviews</h3>
                <p className="text-text-soft mt-2">Hear from those who cherish our crafts</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-display font-bold text-primary">{product.rating}</p>
                  <p className="text-[10px] text-accent uppercase tracking-widest font-bold">Average Rating</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { user: 'Priya M.', initial: 'PM', comment: "The blue pottery is exquisite. The colors are so vibrant and the finish is perfect. It looks stunning in my living room." },
                { user: 'Amit S.', initial: 'AS', comment: "Beautiful craftsmanship. It arrived safely in very secure packaging. Highly recommended for anyone who loves traditional Indian art." }
              ].map((review, i) => (
                <div key={i} className="bg-white p-10 rounded-[32px] border border-highlight/20 shadow-premium group hover:border-accent transition-colors">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center font-display font-bold text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all">
                        {review.initial}
                      </div>
                      <div>
                        <p className="font-bold text-primary text-lg">{review.user}</p>
                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Verified Collector</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-text-soft italic leading-relaxed text-lg">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <section className="section-spacing border-t border-highlight/20">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-[1px] w-8 bg-accent/30" />
                <span className="text-accent font-bold text-xs tracking-widest uppercase">More from Ananya</span>
              </div>
              <h2 className="text-4xl font-display font-bold text-primary">Artisan's Collection</h2>
            </div>
            <button 
              onClick={() => onNavigate('artisan')}
              className="text-accent font-bold uppercase tracking-widest text-sm hover:tracking-[0.2em] transition-all"
            >
              View Studio →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} {...product} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      </div>

      <AuthenticityCertificate 
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        productName={product.name}
        artisan={product.artisan}
        region={product.location}
        certificateId="CERT-JP-2024-8842"
        dateIssued="February 23, 2026"
      />

      {/* CTA Section */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-10" />
        <div className="absolute inset-0 mandala-bg opacity-[0.05] -z-10" />
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-cream text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">Authentic Craftsmanship,<br />Delivered to Your Door</h2>
            <p className="text-cream/70 mb-12 max-w-2xl mx-auto text-xl font-light">
              Every purchase supports a local artisan and helps preserve traditional techniques for future generations.
            </p>
            <div className="flex justify-center gap-6">
              <button className="btn-accent px-12 py-5 text-lg shadow-2xl shadow-accent/20">Explore More Crafts</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>

  );
};
