import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Upload,
  Camera,
  Tag,
  Info,
  CheckCircle2,
  Sparkles,
  Mic,
  IndianRupee,
  Plus,
  Package,
  ChevronRight,
  User
} from 'lucide-react';
import { HandwrittenNote } from './HandwrittenNote';

export const SellProduct = ({ onNavigate }: any) => {
  const [step, setStep] = useState(1);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Pottery',
    description: '',
    price: '',
    region: 'Jaipur, Rajasthan',
    material: '',
    stock: '1'
  });

  const categories = ['Pottery', 'Textiles', 'Woodwork', 'Jewelry', 'Paintings', 'Metalwork'];
  const regions = ['Jaipur, Rajasthan', 'Varanasi, UP', 'Kutch, Gujarat', 'Bhubaneswar, Odisha', 'Mysore, Karnataka', 'Kolkata, WB'];

  const handleVoiceDescription = () => {
    setIsVoiceRecording(true);
    setTimeout(() => {
      setIsVoiceRecording(false);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setFormData({
          ...formData,
          name: 'Hand-Painted Blue Pottery Vase',
          description: 'A beautiful, traditional blue pottery vase from Jaipur, featuring intricate floral patterns and a glossy finish. Handcrafted using quartz, raw glaze, sodium sulphate, and multani mitti.',
          material: 'Quartz & Clay'
        });
      }, 2000);
    }, 3000);
  };

  const handlePriceSuggestion = async () => {
    setIsAnalyzing(true);
    // Analyze market trends
    setTimeout(() => {
      setIsAnalyzing(false);
      setFormData({ ...formData, price: '2450' });
    }, 1500);
  };

  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-highlight/10 sticky top-0 z-40">
        <div className="container-custom h-20 flex items-center justify-between">
          <button
            onClick={() => onNavigate('creator')}
            className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-bold text-sm uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Studio
          </button>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-accent' : 'bg-primary/5'}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-soft">Step {step} of 3</span>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-4xl mt-12">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-primary mb-4">List a New Masterpiece</h1>
          <p className="text-text-soft text-lg">Share your heritage craft with a global audience of connoisseurs.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-8 rounded-[32px] border border-highlight/10 shadow-sm">
                    <h3 className="text-xl font-display font-bold text-primary mb-8 flex items-center gap-3">
                      <Package className="w-6 h-6 text-accent" /> Basic Information
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <label htmlFor="prod-name" className="block text-[10px] font-bold uppercase tracking-widest text-text-soft mb-3">Product Name</label>
                        <input
                          id="prod-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Hand-Painted Blue Pottery Vase"
                          className="input-field"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="prod-category" className="block text-[10px] font-bold uppercase tracking-widest text-text-soft mb-3">Category</label>
                          <select
                            id="prod-category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="input-field appearance-none"
                          >
                            {categories.map(cat => <option key={cat}>{cat}</option>)}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="prod-region" className="block text-[10px] font-bold uppercase tracking-widest text-text-soft mb-3">Region of Origin</label>
                          <select
                            id="prod-region"
                            value={formData.region}
                            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                            className="input-field appearance-none"
                          >
                            {regions.map(r => <option key={r}>{r}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label htmlFor="prod-description" className="block text-[10px] font-bold uppercase tracking-widest text-text-soft">Product Story & Description</label>
                          <button
                            onClick={handleVoiceDescription}
                            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${isVoiceRecording ? 'text-rose-500 animate-pulse' : 'text-accent hover:text-primary'}`}
                          >
                            <Mic className="w-3.5 h-3.5" /> {isVoiceRecording ? 'Recording...' : 'Describe by Voice'}
                          </button>
                        </div>
                        <textarea
                          id="prod-description"
                          rows={5}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Tell the story behind this piece..."
                          className="input-field resize-none"
                        />
                        {isAnalyzing && (
                          <div className="mt-3 flex items-center gap-2 text-accent animate-pulse">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Polishing your story...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="btn-primary !px-12 py-4 flex items-center gap-3"
                    >
                      Next Step <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-8 rounded-[32px] border border-highlight/10 shadow-sm">
                    <h3 className="text-xl font-display font-bold text-primary mb-8 flex items-center gap-3">
                      <Camera className="w-6 h-6 text-accent" /> Product Media
                    </h3>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="aspect-square rounded-3xl border-2 border-dashed border-primary/10 flex flex-col items-center justify-center gap-4 hover:border-accent/40 hover:bg-accent/5 transition-all cursor-pointer group">
                        <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all">
                          <Upload className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-primary">Upload Main Image</p>
                          <p className="text-[10px] text-text-soft uppercase tracking-widest mt-1">Min 1200x1200px</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="aspect-square rounded-2xl border-2 border-dashed border-primary/5 flex items-center justify-center text-text-soft/40 hover:border-accent/20 hover:bg-accent/5 transition-all cursor-pointer">
                            <Plus className="w-6 h-6" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-accent/5 p-6 rounded-2xl border border-accent/10 flex gap-4">
                      <Info className="w-5 h-5 text-accent shrink-0" />
                      <p className="text-xs text-primary/70 leading-relaxed italic">
                        "High-quality photos from multiple angles increase buyer trust by 85%. Use natural lighting to showcase the true colors of your craft."
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="btn-secondary !px-10"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="btn-primary !px-12 flex items-center gap-3"
                    >
                      Next Step <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-8 rounded-[32px] border border-highlight/10 shadow-sm">
                    <h3 className="text-xl font-display font-bold text-primary mb-8 flex items-center gap-3">
                      <Tag className="w-6 h-6 text-accent" /> Pricing & Inventory
                    </h3>

                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <label htmlFor="prod-price" className="block text-[10px] font-bold uppercase tracking-widest text-text-soft mb-3">Selling Price (₹)</label>
                          <div className="relative">
                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                            <input
                              id="prod-price"
                              type="number"
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                              placeholder="0.00"
                              className="input-field pl-12"
                            />
                          </div>
                          <button
                            onClick={handlePriceSuggestion}
                            className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5" /> Get Market Guidance
                          </button>
                        </div>
                        <div>
                          <label htmlFor="prod-stock" className="block text-[10px] font-bold uppercase tracking-widest text-text-soft mb-3">Available Stock</label>
                          <input
                            id="prod-stock"
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            placeholder="1"
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="prod-material" className="block text-[10px) font-bold uppercase tracking-widest text-text-soft mb-3">Material Used</label>
                        <input
                          id="prod-material"
                          type="text"
                          value={formData.material}
                          onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                          placeholder="e.g. Pure Silk, Teak Wood, Brass"
                          className="input-field"
                        />
                      </div>

                      <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                        <div className="flex items-center gap-3 mb-4">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <h4 className="font-bold text-primary">Ready to List</h4>
                        </div>
                        <p className="text-xs text-text-soft leading-relaxed">
                          By listing this product, you confirm that it is an authentic handcrafted item. NammaCraft takes a 5% commission on successful sales to support platform maintenance and artisan marketing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="btn-secondary !px-10"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        alert('Product listed successfully!');
                        onNavigate('creator');
                      }}
                      className="btn-primary !px-16 py-4 shadow-xl shadow-primary/20"
                    >
                      Publish Listing
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Heritage Insights Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="relative mb-12">
                <div className="absolute -top-6 -left-6 z-10">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white shadow-lg">
                    <User className="w-6 h-6" />
                  </div>
                </div>
                <HandwrittenNote rotation={-2} className="!bg-white !text-primary !border-primary/10 !text-sm !p-6 !shadow-premium">
                  <p className="font-bold text-accent mb-2 uppercase tracking-widest text-[10px]">Aarav's Tip</p>
                  "Artisans who share the story of their materials often sell 40% faster. Don't forget to mention where your clay or silk comes from!"
                </HandwrittenNote>
              </div>

              <div className="bg-primary p-8 rounded-[40px] text-cream relative overflow-hidden">
                <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-accent" />
                    <h3 className="text-lg font-display font-bold">Market Insights</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[10px] uppercase tracking-widest text-cream/40 mb-2">Market Demand</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-accent">High</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`w-1.5 h-4 rounded-full ${i <= 4 ? 'bg-accent' : 'bg-white/10'}`} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[10px] uppercase tracking-widest text-cream/40 mb-2">Suggested Range</p>
                      <p className="text-xl font-bold">₹2,200 - ₹2,800</p>
                    </div>

                    <p className="text-xs text-cream/60 leading-relaxed italic">
                      "Blue Pottery is currently trending in Urban Home Decor. Listing at ₹2,450 positions you competitively while maintaining premium artisan value."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[32px] border border-highlight/10 shadow-sm">
                <h3 className="text-lg font-display font-bold text-primary mb-6">Listing Preview</h3>
                <div className="aspect-[4/5] bg-cream/30 rounded-2xl mb-4 flex items-center justify-center text-text-soft/20">
                  <Package className="w-12 h-12" />
                </div>
                <h4 className="font-bold text-primary mb-1">{formData.name || 'Product Name'}</h4>
                <p className="text-xs text-text-soft mb-3">{formData.region}</p>
                <p className="text-xl font-display font-bold text-accent">₹{formData.price || '0'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProduct;
