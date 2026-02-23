import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Upload, 
  ChevronLeft, 
  Info, 
  Gavel, 
  Clock, 
  Tag, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Plus
} from 'lucide-react';
import { AIPricingPanel } from './AIPricingPanel';
import { VoiceAssistant } from './VoiceAssistant';

export const CreateAuction = ({ onNavigate }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Pottery',
    origin: '',
    startPrice: '',
    minIncrement: '',
    reservePrice: '',
    duration: '3 days',
    buyNow: false,
    buyNowPrice: '',
    craftStory: '',
    badge: 'Handmade'
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleVoiceData = (data: any) => {
    setFormData(prev => ({
      ...prev,
      name: data.name || prev.name,
      category: data.category || prev.category,
      origin: data.origin || prev.origin,
      startPrice: data.startPrice?.toString() || prev.startPrice,
      duration: data.duration || prev.duration,
      craftStory: data.craftStory || prev.craftStory
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-cream min-h-screen relative overflow-hidden p-6 md:p-12">
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => onNavigate('creator')}
            className="flex items-center gap-2 text-text-soft hover:text-primary transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Studio</span>
          </button>
          <div className="flex gap-4">
            <button className="btn-secondary !py-3 !px-8 text-xs uppercase tracking-widest">Save Draft</button>
            <button className="btn-primary !py-3 !px-10 text-xs uppercase tracking-widest shadow-xl shadow-primary/20">Publish Auction</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-10">
            <VoiceAssistant onDataExtracted={handleVoiceData} />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-display font-bold text-primary mb-2">Create New Auction</h1>
              <p className="text-text-soft">Share your craft with the world through a premium bidding experience.</p>
            </motion.div>

            {/* Product Selection */}
            <section className="bg-white p-10 rounded-[40px] border border-highlight/10 shadow-premium space-y-8">
              <div className="flex items-center justify-between border-b border-highlight/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-display font-bold text-primary">Product Details</h2>
                </div>
                <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors flex items-center gap-2">
                  <Plus className="w-3 h-3" /> Select Existing Product
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Product Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Hand-Painted Blue Pottery Vase"
                      className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Category</label>
                    <select 
                      className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium appearance-none"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Pottery</option>
                      <option>Textiles</option>
                      <option>Woodwork</option>
                      <option>Jewelry</option>
                      <option>Paintings</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Origin Region</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                    value={formData.origin}
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                  />
                </div>

                {/* Image Uploader */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Product Images</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-highlight/20 rounded-[32px] p-12 flex flex-col items-center justify-center gap-4 bg-cream/10 group-hover:bg-cream/20 transition-all group-hover:border-accent/40">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="text-primary font-bold">Click or drag images here</p>
                        <p className="text-text-soft text-xs mt-1">PNG, JPG up to 10MB. High resolution preferred.</p>
                      </div>
                    </div>
                  </div>
                  {previewImage && (
                    <div className="flex gap-4 mt-4">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-accent shadow-lg">
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setPreviewImage(null)}
                          className="absolute top-1 right-1 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-rose-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                      <button className="w-24 h-24 rounded-2xl border-2 border-dashed border-highlight/20 flex items-center justify-center text-text-soft hover:border-accent hover:text-accent transition-all">
                        <Plus className="w-6 h-6" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Auction Settings */}
            <section className="bg-white p-10 rounded-[40px] border border-highlight/10 shadow-premium space-y-8">
              <div className="flex items-center gap-3 border-b border-highlight/10 pb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <Gavel className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-display font-bold text-primary">Auction Settings</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2 flex items-center gap-1">
                      Starting Price <Info className="w-3 h-3" />
                    </label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-primary">₹</span>
                      <input 
                        type="number" 
                        placeholder="0.00"
                        className="w-full pl-12 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                        value={formData.startPrice}
                        onChange={(e) => setFormData({...formData, startPrice: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Min. Bid Increment</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-primary">₹</span>
                      <input 
                        type="number" 
                        placeholder="500"
                        className="w-full pl-12 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                        value={formData.minIncrement}
                        onChange={(e) => setFormData({...formData, minIncrement: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Auction Duration</label>
                    <select 
                      className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium appearance-none"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    >
                      <option>1 day</option>
                      <option>3 days</option>
                      <option>7 days</option>
                      <option>Custom Date</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Reserve Price (Optional)</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-primary">₹</span>
                      <input 
                        type="number" 
                        placeholder="Hidden from buyers"
                        className="w-full pl-12 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                        value={formData.reservePrice}
                        onChange={(e) => setFormData({...formData, reservePrice: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-highlight/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-primary">Add "Buy Now" Option</h4>
                    <p className="text-xs text-text-soft">Allow buyers to skip the auction and purchase instantly.</p>
                  </div>
                  <button 
                    onClick={() => setFormData({...formData, buyNow: !formData.buyNow})}
                    className={`w-14 h-8 rounded-full transition-all relative ${formData.buyNow ? 'bg-accent' : 'bg-highlight/20'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${formData.buyNow ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
                {formData.buyNow && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 space-y-2"
                  >
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Buy Now Price</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-primary">₹</span>
                      <input 
                        type="number" 
                        placeholder="Must be higher than starting price"
                        className="w-full pl-12 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                        value={formData.buyNowPrice}
                        onChange={(e) => setFormData({...formData, buyNowPrice: e.target.value})}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </section>

            {/* Storytelling Section */}
            <section className="bg-white p-10 rounded-[40px] border border-highlight/10 shadow-premium space-y-8">
              <div className="flex items-center gap-3 border-b border-highlight/10 pb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <Palette className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-display font-bold text-primary">Craft Storytelling</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">The Craft Story</label>
                    <textarea 
                      rows={6}
                      placeholder="Describe the tradition, materials, and cultural significance of this piece..."
                      className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium resize-none"
                      value={formData.craftStory}
                      onChange={(e) => setFormData({...formData, craftStory: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Workshop / Artisan Photo</label>
                    <div className="h-[164px] border-2 border-dashed border-highlight/20 rounded-2xl flex flex-col items-center justify-center gap-2 bg-cream/10 hover:bg-cream/20 transition-all cursor-pointer group">
                      <Upload className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Upload Photo</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Authenticity Badge</label>
                  <div className="flex flex-wrap gap-3">
                    {['Handmade', 'Traditional Craft', 'Limited Edition', 'Eco-Friendly'].map((badge) => (
                      <button 
                        key={badge}
                        onClick={() => setFormData({...formData, badge})}
                        className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border-2 ${
                          formData.badge === badge 
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                            : 'bg-cream/50 text-text-soft border-transparent hover:border-accent/20'
                        }`}
                      >
                        {badge}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-12 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-soft">Live Preview</h3>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Updating Live
                </span>
              </div>

              <div className="bg-white rounded-[40px] border border-highlight/10 shadow-2xl overflow-hidden group">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={previewImage || 'https://picsum.photos/seed/placeholder/800/1000'} 
                    alt="Preview" 
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${!previewImage && 'opacity-20 grayscale'}`}
                  />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="badge-indian !bg-white/90 !backdrop-blur-md !text-primary shadow-lg">
                      {formData.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-xs font-bold uppercase tracking-widest">Ends in: {formData.duration}</span>
                    </div>
                    <h4 className="text-2xl font-display font-bold mb-1">{formData.name || 'Your Craft Name'}</h4>
                    <p className="text-xs text-white/70 uppercase tracking-widest">{formData.category} • {formData.origin || 'Origin Region'}</p>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-text-soft uppercase tracking-widest font-bold mb-1">Starting Bid</p>
                      <p className="text-3xl font-display font-bold text-primary">₹{formData.startPrice || '0'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-text-soft uppercase tracking-widest font-bold mb-1">Min. Increment</p>
                      <p className="text-lg font-bold text-accent">₹{formData.minIncrement || '0'}</p>
                    </div>
                  </div>
                  <button className="w-full btn-primary !py-4 text-xs uppercase tracking-widest pointer-events-none opacity-50">
                    Place Bid
                  </button>
                  {formData.buyNow && (
                    <div className="pt-6 border-t border-highlight/10 flex items-center justify-between">
                      <p className="text-xs text-text-soft font-medium">Available for instant purchase</p>
                      <p className="font-bold text-primary">₹{formData.buyNowPrice || '0'}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Pricing Panel */}
              <AIPricingPanel name={formData.name} category={formData.category} />

              {/* Tips Card */}
              <div className="bg-accent/5 p-8 rounded-[32px] border border-accent/10 space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <HelpCircle className="w-5 h-5" />
                  <h4 className="font-display font-bold">Artisan Tip</h4>
                </div>
                <p className="text-sm text-primary/70 leading-relaxed italic">
                  "Auctions with a compelling 'Craft Story' and high-quality workshop photos tend to receive 40% more bids. Share the soul of your work!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Palette = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.5-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6H16c3.3 0 6-2.7 6-6 0-4.4-4.5-8-10-8z"/>
  </svg>
);
