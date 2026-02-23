import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gavel, Clock, Users, TrendingUp, ShieldCheck, ChevronLeft, MessageCircle, Heart, Share2, MapPin, Zap, AlertCircle, CheckCircle2, PartyPopper } from 'lucide-react';

export const LiveAuction = ({ onNavigate }: any) => {
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [bids, setBids] = useState([
    { id: 1, user: 'RK', amount: 28500, time: '2 mins ago' },
    { id: 2, user: 'AS', amount: 27000, time: '5 mins ago' },
    { id: 3, user: 'PM', amount: 25500, time: '12 mins ago' },
  ]);
  const [watchers, setWatchers] = useState(42);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showOutbidWarning, setShowOutbidWarning] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [lastBidByMe, setLastBidByMe] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (lastBidByMe) {
            setIsWon(true);
          } else {
            setIsLost(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    const watcherInterval = setInterval(() => {
      setWatchers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);

    // Simulate being outbid after 10 seconds if user bid
    let outbidTimeout: any;
    if (lastBidByMe && !isWon) {
      outbidTimeout = setTimeout(() => {
        const newBid = {
          id: Date.now(),
          user: 'JD',
          amount: bids[0].amount + 1000,
          time: 'Just now'
        };
        setBids([newBid, ...bids]);
        setLastBidByMe(false);
        setShowOutbidWarning(true);
        setTimeout(() => setShowOutbidWarning(false), 5000);
      }, 10000);
    }

    return () => {
      clearInterval(timer);
      clearInterval(watcherInterval);
      if (outbidTimeout) clearTimeout(outbidTimeout);
    };
  }, [lastBidByMe, isWon, bids]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentBid = bids[0].amount;
  const minNextBid = currentBid + 500;

  const handlePlaceBid = () => {
    const amount = parseInt(bidAmount);
    if (amount >= minNextBid) {
      const newBid = {
        id: Date.now(),
        user: 'YOU',
        amount: amount,
        time: 'Just now'
      };
      setBids([newBid, ...bids]);
      setBidAmount('');
      setLastBidByMe(true);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    }
  };

  const product = {
    name: 'Antique Dhokra Art Chariot',
    artisan: 'Suresh Murmu',
    origin: 'Bastar, Chhattisgarh',
    startPrice: 15000,
    image: 'https://picsum.photos/seed/dhokra-auction/1200/1600',
    story: 'Dhokra is a non-ferrous metal casting using the lost-wax casting technique. This sort of metal casting has been used in India for over 4,000 years and is still used. One of the earliest known lost-wax artifacts is the dancing girl of Mohenjo-daro.'
  };

  if (isWon) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center p-6 selection:bg-accent/20">
        <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-[60px] p-12 md:p-20 shadow-premium text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
          <div className="flex justify-center mb-10">
            <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <PartyPopper className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">Congratulations!</h1>
          <p className="text-xl text-text-soft mb-12 font-light">
            You won the <span className="text-primary font-bold">{product.name}</span>. This handcrafted masterpiece is now yours to cherish.
          </p>
          
          <div className="bg-cream/50 rounded-3xl p-8 mb-12 border border-highlight/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-text-soft text-sm uppercase tracking-widest font-bold">Winning Bid</span>
              <span className="text-2xl font-display font-bold text-primary">₹{currentBid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-soft text-sm uppercase tracking-widest font-bold">Artisan</span>
              <span className="text-primary font-medium">{product.artisan}</span>
            </div>
          </div>

          <div className="space-y-6">
            <button 
              onClick={() => onNavigate('checkout')}
              className="w-full btn-primary !py-6 text-lg shadow-2xl shadow-primary/20"
            >
              Proceed to Checkout
            </button>
            <button 
              onClick={() => onNavigate('home')}
              className="w-full py-4 text-accent font-bold uppercase tracking-widest text-sm hover:tracking-[0.2em] transition-all"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isLost) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center p-6 selection:bg-accent/20">
        <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-[60px] p-12 md:p-20 shadow-premium text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-rose-500" />
          <div className="flex justify-center mb-10">
            <div className="w-24 h-24 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">Auction Ended</h1>
          <p className="text-xl text-text-soft mb-12 font-light">
            The auction for <span className="text-primary font-bold">{product.name}</span> has concluded. Better luck next time!
          </p>
          
          <div className="bg-cream/50 rounded-3xl p-8 mb-12 border border-highlight/10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-soft mb-6 text-left">Recommended for You</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Dhokra Lamp', price: '₹12,400', img: 'https://picsum.photos/seed/dhokra-lamp/100/100' },
                { name: 'Bronze Figurine', price: '₹8,900', img: 'https://picsum.photos/seed/bronze/100/100' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-highlight/10 flex items-center gap-4 text-left hover:border-accent transition-all cursor-pointer group">
                  <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform" />
                  <div>
                    <p className="text-sm font-bold text-primary mb-1">{item.name}</p>
                    <p className="text-sm text-accent font-bold">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <button 
              onClick={() => onNavigate('auction-listing')}
              className="w-full btn-primary !py-6 text-lg shadow-2xl shadow-primary/20"
            >
              Browse More Auctions
            </button>
            <button 
              onClick={() => onNavigate('home')}
              className="w-full py-4 text-accent font-bold uppercase tracking-widest text-sm hover:tracking-[0.2em] transition-all"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen pb-20 selection:bg-accent/20">
      {/* Notifications */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-bold">Bid placed successfully!</span>
          </motion.div>
        )}
        {showOutbidWarning && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] bg-maroon text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <AlertCircle className="w-6 h-6" />
            <span className="font-bold">You've been outbid! Place a higher bid to stay in.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 py-12">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => onNavigate('auction-listing')}
            className="flex items-center gap-2 text-text-soft hover:text-primary transition-all group"
          >
            <div className="w-10 h-10 rounded-full border border-highlight/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="font-bold uppercase tracking-widest text-xs">Back to Auctions</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Live Auction</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-highlight/20 shadow-sm">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{watchers} Watching</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Product Display */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[4/5] rounded-[48px] overflow-hidden shadow-premium bg-white"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                <span className="badge-indian shadow-lg backdrop-blur-md bg-white/80 border-white/50">
                  {product.origin}
                </span>
                <span className="badge-indian !bg-accent !text-white border-none shadow-lg">
                  Limited Edition
                </span>
                <span className="badge-indian !bg-primary/90 !text-white border-none shadow-lg">
                  Traditional Craft
                </span>
              </div>

              <div className="absolute bottom-10 left-10 right-10">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/40">
                    <img src="https://picsum.photos/seed/artisan-face/100/100" alt={product.artisan} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold">Master Artisan</p>
                    <p className="text-white font-display text-lg">{product.artisan}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="glass-premium p-10 rounded-[40px] border border-white/60 shadow-premium relative overflow-hidden">
              <div className="absolute inset-0 mandala-bg opacity-[0.02] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-8 bg-accent" />
                  <span className="text-accent font-bold text-[10px] tracking-[0.3em] uppercase">The Heritage</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-primary mb-4">Dhokra: The Lost Wax Legend</h3>
                <p className="text-text-soft font-light leading-relaxed italic">
                  "{product.story}"
                </p>
                <div className="flex items-center gap-8 mt-8 pt-8 border-t border-highlight/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-1">Start Price</p>
                    <p className="text-primary font-display font-bold text-xl">₹{product.startPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-1">Total Bids</p>
                    <p className="text-primary font-display font-bold text-xl">{bids.length}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-1">Authenticity</p>
                    <div className="flex items-center gap-1 text-emerald-600">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bidding Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-premium p-10 rounded-[48px] border border-white/60 shadow-premium sticky top-24">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full mb-6">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">{formatTime(timeLeft)} Remaining</span>
                </div>
                <p className="text-text-soft text-sm font-medium uppercase tracking-widest mb-2">Current Highest Bid</p>
                <motion.div 
                  key={currentBid}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-display font-bold text-primary mb-2"
                >
                  ₹{currentBid.toLocaleString()}
                </motion.div>
                <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest">Reserve Price Met</p>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center px-6 py-4 bg-white/50 rounded-2xl border border-highlight/10">
                  <span className="text-text-soft text-xs font-bold uppercase tracking-widest">Min. Next Bid</span>
                  <span className="text-primary font-bold">₹{minNextBid.toLocaleString()}</span>
                </div>

                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-bold">₹</div>
                  <input 
                    type="number" 
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder={minNextBid.toString()}
                    className="w-full pl-12 pr-6 py-5 rounded-2xl border-2 border-highlight/20 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none font-display font-bold text-xl transition-all"
                  />
                </div>

                <button 
                  onClick={handlePlaceBid}
                  className="w-full btn-primary !py-6 text-lg shadow-2xl shadow-primary/30 group flex items-center justify-center gap-3"
                >
                  <TrendingUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Place Your Bid
                </button>
                
                <button className="w-full py-4 text-text-soft hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" /> Or Buy Now for ₹45,000
                </button>
              </div>

              {/* Live Activity */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Live Activity</h4>
                  <div className="flex items-center gap-1 text-[10px] text-accent font-bold uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Real-time
                  </div>
                </div>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar">
                  <AnimatePresence initial={false}>
                    {bids.map((bid, idx) => (
                      <motion.div 
                        key={bid.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${idx === 0 ? 'bg-accent/5 border-accent/20 shadow-sm' : 'bg-white/30 border-highlight/10'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm ${idx === 0 ? 'bg-accent text-white' : 'bg-cream text-primary'}`}>
                            {bid.user}
                          </div>
                          <div>
                            <p className="text-primary font-bold text-sm">₹{bid.amount.toLocaleString()}</p>
                            <p className="text-[9px] text-text-soft uppercase tracking-widest">{bid.time}</p>
                          </div>
                        </div>
                        {idx === 0 && (
                          <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[8px] font-bold uppercase tracking-widest">
                            Highest
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-8">
              <button className="flex items-center gap-2 text-text-soft hover:text-accent transition-all text-xs font-bold uppercase tracking-widest">
                <Heart className="w-4 h-4" /> Save Auction
              </button>
              <button className="flex items-center gap-2 text-text-soft hover:text-accent transition-all text-xs font-bold uppercase tracking-widest">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button className="flex items-center gap-2 text-text-soft hover:text-accent transition-all text-xs font-bold uppercase tracking-widest">
                <MessageCircle className="w-4 h-4" /> Ask Artisan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
