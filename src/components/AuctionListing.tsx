import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Gavel, Filter, Search, ChevronRight, MapPin } from 'lucide-react';

const auctions = [
  { id: 1, name: 'Antique Dhokra Art Chariot', artisan: 'Suresh Murmu', origin: 'Bastar, Chhattisgarh', currentBid: 28500, timeLeft: '00:45:12', image: 'https://picsum.photos/seed/dhokra-1/600/800' },
  { id: 2, name: 'Hand-Woven Pashmina Shawl', artisan: 'Zahoor Ahmed', origin: 'Srinagar, Kashmir', currentBid: 42000, timeLeft: '02:15:30', image: 'https://picsum.photos/seed/pashmina-1/600/800' },
  { id: 3, name: 'Marble Inlay Jewelry Box', artisan: 'Irfan Khan', origin: 'Agra, Uttar Pradesh', currentBid: 12500, timeLeft: '01:10:05', image: 'https://picsum.photos/seed/marble-1/600/800' },
  { id: 4, name: 'Tanjore Gold Leaf Painting', artisan: 'R. Meenakshi', origin: 'Thanjavur, Tamil Nadu', currentBid: 55000, timeLeft: '05:20:45', image: 'https://picsum.photos/seed/tanjore-1/600/800' },
  { id: 5, name: 'Bidriware Silver Inlay Vase', artisan: 'Mohammed Abdul', origin: 'Bidar, Karnataka', currentBid: 18000, timeLeft: '00:15:20', image: 'https://picsum.photos/seed/bidri-1/600/800' },
  { id: 6, name: 'Pattachitra Scroll Painting', artisan: 'Bijay Maharana', origin: 'Raghurajpur, Odisha', currentBid: 9500, timeLeft: '03:40:10', image: 'https://picsum.photos/seed/pattachitra-1/600/800' },
];

export const AuctionListing = ({ onNavigate }: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-cream min-h-screen pb-20 selection:bg-accent/20">
      {/* Hero Header */}
      <section className="relative py-24 bg-primary text-cream overflow-hidden">
        <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Live Heritage Auctions</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">Acquire Timeless Art</h1>
            <p className="text-cream/70 max-w-2xl mx-auto text-lg font-light">
              Participate in exclusive auctions for rare, handcrafted masterpieces from India's most celebrated master artisans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="container-custom -mt-10 relative z-20">
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[32px] border border-white/40 shadow-premium flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-soft w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search rare crafts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-cream/30 border border-highlight/10 focus:border-accent outline-none transition-all"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none btn-secondary !py-4 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="flex-1 md:flex-none btn-primary !py-4">
              Ending Soon
            </button>
          </div>
        </div>
      </section>

      {/* Auction Grid */}
      <section className="container-custom py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {auctions.map((auction, idx) => (
            <motion.div
              key={auction.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => onNavigate('auction')}
              className="group cursor-pointer bg-white rounded-[40px] overflow-hidden border border-highlight/10 shadow-sm hover:shadow-premium transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={auction.image} 
                  alt={auction.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-6 left-6 z-10">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full border border-white/50 shadow-lg">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{auction.timeLeft}</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-widest mb-2">
                    <MapPin className="w-3 h-3" /> {auction.origin}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white leading-tight group-hover:text-accent transition-colors">{auction.name}</h3>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1">Current Bid</p>
                    <p className="text-3xl font-display font-bold text-primary">₹{auction.currentBid.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-text-soft font-bold uppercase tracking-widest mb-1">Artisan</p>
                    <p className="text-primary font-medium">{auction.artisan}</p>
                  </div>
                </div>
                
                <button className="w-full btn-primary !py-4 flex items-center justify-center gap-3 group/btn">
                  <Gavel className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                  Place Bid
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover/btn:opacity-100 transition-all" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom pb-20">
        <div className="bg-accent/5 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden border border-accent/10">
          <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />
          <h2 className="text-4xl font-display font-bold text-primary mb-6">Have a rare masterpiece?</h2>
          <p className="text-text-soft mb-10 max-w-xl mx-auto">
            Join our exclusive network of master artisans and collectors. List your authentic handcrafted items for auction.
          </p>
          <button className="btn-accent px-12 py-5 text-lg">Apply as Artisan</button>
        </div>
      </section>
    </div>
  );
};
