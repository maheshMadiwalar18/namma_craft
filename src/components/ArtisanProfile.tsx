import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, Heart, MessageCircle, Share2, Palette, Hammer, Scissors, Coffee, Gem } from 'lucide-react';
import { ProductCard } from './FeaturedProducts';

export const ArtisanProfile = ({ onNavigate }: any) => {
  const artisanProducts = [
    { id: 1, name: 'Hand-Painted Blue Pottery Vase', artisan: 'Ananya Sharma', price: 2450, image: 'https://picsum.photos/seed/jaipur-pottery/600/800' },
    { id: 5, name: 'Cobalt Blue Ceramic Bowl', artisan: 'Ananya Sharma', price: 1250, image: 'https://picsum.photos/seed/blue-bowl/600/800' },
    { id: 6, name: 'Floral Pattern Serving Tray', artisan: 'Ananya Sharma', price: 1850, image: 'https://picsum.photos/seed/tray/600/800' },
    { id: 7, name: 'Decorative Wall Plate', artisan: 'Ananya Sharma', price: 950, image: 'https://picsum.photos/seed/wall-plate/600/800' },
  ];

  const reviews = [
    { id: 1, user: 'Priya M.', rating: 5, comment: 'The blue pottery is exquisite. The colors are so vibrant and the finish is perfect.', date: '2 days ago' },
    { id: 2, user: 'Amit S.', rating: 4, comment: 'Beautiful craftsmanship. It arrived safely in very secure packaging.', date: '1 week ago' },
  ];

  return (
    <div className="bg-cream min-h-screen pb-20 selection:bg-accent/20">
      {/* Header Section */}
      <div className="relative">
        <div className="h-64 md:h-[450px] w-full overflow-hidden relative">
          <img 
            src="https://picsum.photos/seed/rajasthan-landscape/1920/800" 
            alt="Artisan Workshop" 
            className="w-full h-full object-cover brightness-[0.85]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 mandala-bg opacity-[0.03]" />
        </div>
        
        <div className="container mx-auto px-6">
          <div className="relative -mt-32 md:-mt-48 flex flex-col md:flex-row items-end gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-48 h-48 md:w-72 md:h-72 rounded-full border-[12px] border-cream overflow-hidden shadow-premium z-10"
            >
              <img 
                src="https://picsum.photos/seed/indian-face/600/600" 
                alt="Ananya Sharma" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="flex-1 pb-6">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="badge-indian">Master Artisan</span>
                    <span className="badge-indian !bg-accent/10 !text-accent !border-accent/20">Traditional Craft</span>
                    <span className="text-accent font-medium text-sm tracking-widest uppercase ml-2">Est. 2008</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-4 tracking-tight">Ananya Sharma</h1>
                  <div className="flex flex-wrap items-center gap-6 text-text-soft">
                    <span className="flex items-center gap-2 font-medium bg-white/50 px-4 py-2 rounded-full border border-highlight/20 shadow-sm">
                      <MapPin className="w-5 h-5 text-accent" /> 
                      <span className="text-primary">Jaipur, Rajasthan, India</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <span className="font-bold text-primary">4.9</span>
                      <span className="text-sm">(1.2k+ reviews)</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <button className="btn-primary group">
                    <Heart className="w-5 h-5 group-hover:fill-white transition-colors" />
                    Follow Artisan
                  </button>
                  <button className="btn-secondary !px-6 flex items-center gap-2 group">
                    <MessageCircle className="w-5 h-5 group-hover:text-accent" />
                    Contact
                  </button>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('artisan-collection');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-primary font-bold uppercase tracking-widest text-sm hover:text-accent transition-colors"
                  >
                    View Products
                  </button>
                  <button className="p-4 bg-white/80 backdrop-blur-md border border-highlight/30 rounded-full hover:bg-white hover:shadow-lg transition-all">
                    <Share2 className="w-5 h-5 text-primary" />
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Story & Process */}
          <div className="lg:col-span-8 space-y-20">
            <section className="relative p-10 rounded-[40px] bg-white/40 border border-white/60 shadow-sm overflow-hidden">
              <div className="absolute inset-0 mandala-bg opacity-[0.02] pointer-events-none" />
              <div className="absolute -left-10 top-0 text-[120px] font-display text-primary/5 select-none pointer-events-none">
                Story
              </div>
              <h2 className="text-4xl font-display font-bold mb-8 text-primary flex items-center gap-4">
                <Palette className="w-8 h-8 text-accent" />
                The Journey of Blue Pottery
                <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
              </h2>
              <div className="prose prose-lg max-w-none text-text-soft leading-relaxed space-y-6 font-light">
                <p className="first-letter:text-7xl first-letter:font-display first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                  Growing up in the vibrant streets of Jaipur, I was always surrounded by the mesmerizing blue pottery that our city is famous for. My journey began in my father's workshop, where I learned the delicate art of mixing quartz, glass, and multani mitti.
                </p>
                <p>
                  I've spent the last 15 years perfecting the traditional floral motifs while introducing contemporary designs that appeal to a global audience. For me, blue pottery is not just a craft; it's a legacy that I am proud to carry forward. Each brushstroke is a conversation with history, and each kiln firing is a prayer for perfection.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <div className="bg-white p-8 rounded-2xl border border-highlight/20 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Palette className="w-12 h-12" />
                  </div>
                  <h4 className="font-display font-bold text-xl mb-3 text-primary">Natural Pigments</h4>
                  <p className="text-text-soft text-sm leading-relaxed">
                    We use only natural mineral oxides to achieve our signature cobalt blue and turquoise hues, ensuring each piece is eco-friendly and unique.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-highlight/20 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Hammer className="w-12 h-12" />
                  </div>
                  <h4 className="font-display font-bold text-xl mb-3 text-primary">Hand-Painted</h4>
                  <p className="text-text-soft text-sm leading-relaxed">
                    Every motif is painted by hand using fine squirrel-hair brushes, a technique that requires years of practice and a steady hand.
                  </p>
                </div>
              </div>
            </section>

            {/* Crafting Process */}
            <section>
              <h2 className="text-4xl font-display font-bold mb-10 text-primary flex items-center gap-4">
                <Hammer className="w-8 h-8 text-accent" />
                The Crafting Process
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { step: "01", title: "Molding", desc: "The unique dough is hand-molded into shapes without a potter's wheel." },
                  { step: "02", title: "Painting", desc: "Intricate floral and geometric patterns are hand-painted with cobalt blue." },
                  { step: "03", title: "Glazing", desc: "A special glass-based glaze is applied before firing at low temperatures." }
                ].map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="text-6xl font-display text-accent/10 absolute -top-6 -left-2 group-hover:text-accent/20 transition-colors">
                      {item.step}
                    </div>
                    <div className="relative pt-4">
                      <h4 className="font-bold text-primary mb-2">{item.title}</h4>
                      <p className="text-text-soft text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Products Grid */}
            <section id="artisan-collection">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-4xl font-display font-bold text-primary">The Collection</h2>
                  <p className="text-text-soft mt-2">Curated pieces from Ananya's studio</p>
                </div>
                <span className="text-accent font-bold text-sm tracking-widest uppercase">{artisanProducts.length} Masterpieces</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {artisanProducts.map(product => (
                  <ProductCard key={product.id} {...product} onNavigate={onNavigate} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Stats & Reviews */}
          <div className="lg:col-span-4 space-y-12">
            <div className="glass-premium p-10 rounded-3xl border border-white/50 shadow-premium sticky top-24">
              <h3 className="text-2xl font-display font-bold mb-8 text-primary">Artisan Stats</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-center group">
                  <span className="text-text-soft group-hover:text-primary transition-colors">Total Sales</span>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-display font-bold text-primary">1,240</span>
                    <span className="text-[10px] text-accent uppercase tracking-widest">Global Orders</span>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-highlight/20" />
                <div className="flex justify-between items-center group">
                  <span className="text-text-soft group-hover:text-primary transition-colors">Experience</span>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-display font-bold text-primary">15+</span>
                    <span className="text-[10px] text-accent uppercase tracking-widest">Years in Craft</span>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-highlight/20" />
                <div className="flex justify-between items-center group">
                  <span className="text-text-soft group-hover:text-primary transition-colors">Response Rate</span>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-display font-bold text-primary">98%</span>
                    <span className="text-[10px] text-accent uppercase tracking-widest">Within 24 Hours</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-10 btn-primary py-5 text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                <MessageCircle className="w-6 h-6" /> 
                Message Artisan
              </button>
              
              <div className="mt-12">
                <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-widest">Recent Reviews</h4>
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-white/50 p-6 rounded-2xl border border-white/80 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-primary">{review.user}</span>
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-text-soft italic">"{review.comment}"</p>
                    </div>
                  ))}
                  <button className="w-full py-2 text-accent text-sm font-bold hover:tracking-widest transition-all uppercase">
                    View All Reviews →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="section-spacing mt-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute inset-0 mandala-bg opacity-[0.05] -z-10" />
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-display font-bold mb-6 text-primary">Support the Craft</h2>
            <p className="text-text-soft mb-12 max-w-2xl mx-auto text-lg">
              By following Ananya, you're not just supporting an artist; you're helping preserve a 14th-century craft for future generations.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="btn-primary px-12 py-5 text-lg">Follow Ananya</button>
              <button className="btn-secondary px-12 py-5 text-lg">Share Her Story</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>

  );
};
