import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  X, 
  ChevronRight, 
  Utensils, 
  Clock, 
  Leaf, 
  MapPin, 
  IndianRupee, 
  Package,
  Sparkles,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { AIPricingPanel } from './AIPricingPanel';
import { VoiceAssistant } from './VoiceAssistant';

export const AddFoodItem = ({ onNavigate }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    ingredients: '',
    shelfLife: '',
    price: '',
    quantity: '',
    festival: '',
    story: '',
    type: 'Veg' // Veg, Non-veg, Vegan
  });

  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleVoiceData = (data: any) => {
    setFormData(prev => ({
      ...prev,
      name: data.name || prev.name,
      region: data.origin || prev.region,
      price: data.startPrice?.toString() || prev.price,
      story: data.craftStory || prev.story
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[48px] p-12 text-center shadow-premium relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold text-primary mb-4">Listing Published!</h2>
          <p className="text-text-soft mb-10">Your traditional food item is now live in the marketplace. Local foodies can now discover your heritage recipe.</p>
          <div className="space-y-4">
            <button onClick={() => onNavigate('creator')} className="w-full btn-primary !py-4">Back to Dashboard</button>
            <button onClick={() => setIsSuccess(false)} className="w-full py-4 text-accent font-bold uppercase tracking-widest text-xs">Add Another Item</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />
      
      <div className="container-custom max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => onNavigate('creator')}
          className="flex items-center gap-2 text-text-soft hover:text-accent transition-all text-xs font-bold uppercase tracking-widest mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-10">
            <VoiceAssistant onDataExtracted={handleVoiceData} />
            
            <div className="bg-white rounded-[48px] p-10 md:p-12 shadow-premium border border-highlight/10">
              <div className="mb-10">
                <h1 className="text-4xl font-display font-bold text-primary mb-2">Add Traditional Food Item</h1>
                <p className="text-text-soft">Share your homemade heritage recipes with the world.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Upload */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Food Image</label>
                  <div className="relative group">
                    {image ? (
                      <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-accent/20">
                        <img src={image} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setImage(null)}
                          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-rose-500 shadow-lg hover:bg-rose-500 hover:text-white transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center aspect-video rounded-3xl border-2 border-dashed border-highlight/30 bg-cream/20 hover:bg-cream/40 hover:border-accent/40 transition-all cursor-pointer group">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-accent mb-4 shadow-sm group-hover:scale-110 transition-transform">
                          <Upload className="w-8 h-8" />
                        </div>
                        <p className="text-sm font-bold text-primary">Click to upload food photo</p>
                        <p className="text-[10px] text-text-soft uppercase tracking-widest mt-2">JPG, PNG up to 5MB</p>
                        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Food Name</label>
                    <div className="relative">
                      <Utensils className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                      <input 
                        type="text" 
                        placeholder="e.g. Mysore Pak"
                        className="w-full pl-14 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Region / State</label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                      <input 
                        type="text" 
                        placeholder="e.g. Karnataka"
                        className="w-full pl-14 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                        value={formData.region}
                        onChange={(e) => setFormData({...formData, region: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Ingredients</label>
                  <textarea 
                    placeholder="List the main ingredients used..."
                    className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium min-h-[100px] resize-none"
                    value={formData.ingredients}
                    onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Shelf Life</label>
                    <div className="relative">
                      <Clock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                      <input 
                        type="text" 
                        placeholder="e.g. 15 Days"
                        className="w-full pl-14 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                        value={formData.shelfLife}
                        onChange={(e) => setFormData({...formData, shelfLife: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Price (₹)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                      <input 
                        type="number" 
                        placeholder="450"
                        className="w-full pl-14 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Quantity</label>
                    <div className="relative">
                      <Package className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                      <input 
                        type="text" 
                        placeholder="e.g. 10 Boxes"
                        className="w-full pl-14 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Festival Tag (Optional)</label>
                  <div className="relative">
                    <Sparkles className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                    <input 
                      type="text" 
                      placeholder="e.g. Diwali Special"
                      className="w-full pl-14 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                      value={formData.festival}
                      onChange={(e) => setFormData({...formData, festival: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Story behind this recipe</label>
                  <textarea 
                    placeholder="Tell the tradition, the memory, or the heritage of this food..."
                    className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium min-h-[120px] resize-none"
                    value={formData.story}
                    onChange={(e) => setFormData({...formData, story: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Food Type</label>
                  <div className="flex gap-4">
                    {['Veg', 'Non-veg', 'Vegan'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({...formData, type: t})}
                        className={`flex-1 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border-2 ${
                          formData.type === t 
                            ? 'bg-primary text-white border-primary shadow-lg' 
                            : 'bg-cream/30 text-text-soft border-transparent hover:bg-cream/50'
                        }`}
                      >
                        {t === 'Veg' && <Leaf className="w-3 h-3 inline-block mr-2" />}
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn-primary !py-6 text-sm shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 group disabled:opacity-50"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Food Item'}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[1px] w-8 bg-accent/30" />
                <span className="text-accent font-bold text-[10px] uppercase tracking-widest">Live Preview</span>
              </div>

              <motion.div 
                className="bg-white rounded-[40px] overflow-hidden border border-highlight/10 shadow-premium"
              >
                <div className="relative h-72 bg-cream/30">
                  {image ? (
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-soft/20">
                      <Utensils className="w-20 h-20" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold text-primary uppercase tracking-widest shadow-sm">
                      Homemade
                    </span>
                    {formData.festival && (
                      <span className="px-4 py-1.5 bg-accent text-white rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm">
                        {formData.festival}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-3 h-3 text-accent" />
                        <span className="text-[9px] font-bold text-accent uppercase tracking-widest">
                          {formData.region || 'Region'} Specialty
                        </span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-primary">
                        {formData.name || 'Food Item Name'}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-display font-bold text-accent">₹{formData.price || '0'}</p>
                      <p className="text-[10px] text-text-soft font-bold uppercase tracking-widest">Per Unit</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-soft">
                      <Clock className="w-3.5 h-3.5" /> {formData.shelfLife || 'Shelf Life'}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-soft">
                      <Leaf className={`w-3.5 h-3.5 ${formData.type === 'Veg' ? 'text-emerald-500' : 'text-rose-500'}`} /> {formData.type}
                    </div>
                  </div>

                  <p className="text-text-soft text-sm line-clamp-2 mb-8 italic leading-relaxed">
                    "{formData.story || 'The story of your recipe will appear here...'}"
                  </p>
                  
                  <button className="w-full py-4 bg-cream/50 rounded-2xl text-primary font-bold text-[10px] uppercase tracking-widest cursor-default">
                    View Details
                  </button>
                </div>
              </motion.div>

              {/* AI Pricing Panel */}
              <div className="mt-8">
                <AIPricingPanel name={formData.name} />
              </div>

              <div className="mt-8 p-6 bg-accent/5 rounded-3xl border border-accent/10">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" /> Creator Tip
                </h4>
                <p className="text-xs text-text-soft leading-relaxed">
                  High-quality photos of the food in natural light tend to get 3x more orders. Don't forget to mention if it's a family secret!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
