import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Utensils, Palette, User, X, ChevronRight, Sparkles, Star } from 'lucide-react';

const regionData: Record<string, any> = {
  'Rajasthan': {
    crafts: ['Blue Pottery', 'Meenakari Jewelry', 'Hand-block Printing'],
    foods: ['Ghevar', 'Dal Baati Churma', 'Ker Sangri'],
    artisans: ['Ananya Sharma', 'Priya Das'],
    description: 'The Land of Kings, known for its vibrant colors and desert heritage.',
    color: '#E67E22'
  },
  'Karnataka': {
    crafts: ['Mysore Silk', 'Channapatna Toys', 'Sandalwood Carving'],
    foods: ['Mysore Pak', 'Bisi Bele Bath', 'Dharwad Pedha'],
    artisans: ['Lakshmi Devi', 'Suresh Gowda'],
    description: 'A blend of ancient empires and modern innovation, rich in silk and sandalwood.',
    color: '#6B1D1D'
  },
  'Uttar Pradesh': {
    crafts: ['Banarasi Silk', 'Chikan Embroidery', 'Teak Wood Carving'],
    foods: ['Petha', 'Lucknowi Kebabs', 'Banarasi Paan'],
    artisans: ['Rajesh Kumar', 'Vikram Singh'],
    description: 'The heartland of India, home to the Taj Mahal and spiritual Varanasi.',
    color: '#F39C12'
  },
  'Gujarat': {
    crafts: ['Patola Silk', 'Kutch Embroidery', 'Lippan Art'],
    foods: ['Dhokla', 'Thepla', 'Khandvi'],
    artisans: ['Savitaben', 'Arjun Bhai'],
    description: 'A coastal state with a rich mercantile history and intricate textile traditions.',
    color: '#D4145A'
  },
  'West Bengal': {
    crafts: ['Kantha Stitch', 'Terracotta Art', 'Jamdani Silk'],
    foods: ['Rosogolla', 'Sandesh', 'Darjeeling Tea'],
    artisans: ['Arjun Das', 'Tenzing Norgay'],
    description: 'The cultural capital, famous for its literature, art, and sweets.',
    color: '#8B2E2E'
  }
};

export const CulturalMap = ({ onNavigate }: any) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Simplified India Map SVG paths (Representative)
  const regions = [
    { id: 'Rajasthan', path: 'M30,30 L50,20 L70,30 L60,50 L40,50 Z', x: 35, y: 35 },
    { id: 'Uttar Pradesh', path: 'M70,30 L90,35 L95,55 L75,60 L65,50 Z', x: 75, y: 45 },
    { id: 'Gujarat', path: 'M15,50 L35,50 L40,70 L20,75 L10,65 Z', x: 20, y: 60 },
    { id: 'Karnataka', path: 'M40,75 L60,75 L65,95 L45,95 L35,85 Z', x: 50, y: 85 },
    { id: 'West Bengal', path: 'M95,55 L110,60 L105,80 L90,75 Z', x: 100, y: 65 },
  ];

  return (
    <section className="section-spacing bg-cream-dark relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <MapPin className="w-3 h-3" /> Interactive Heritage Explorer
          </motion.div>
          <h2 className="text-primary mb-4">Explore India's Cultural Map</h2>
          <p className="text-text-soft max-w-2xl mx-auto">
            Click on a region to discover the unique crafts, flavors, and master artisans that define its heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Map Container */}
          <div className="lg:col-span-7 bg-white/40 backdrop-blur-md rounded-[48px] p-12 border border-highlight/10 shadow-premium aspect-square flex items-center justify-center relative">
            <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-2xl">
              {regions.map((region) => (
                <motion.path
                  key={region.id}
                  d={region.path}
                  fill={selectedRegion === region.id ? regionData[region.id].color : '#FDFBF7'}
                  stroke={selectedRegion === region.id ? '#fff' : '#6B1D1D'}
                  strokeWidth="0.5"
                  whileHover={{ scale: 1.05, fill: regionData[region.id].color, stroke: '#fff' }}
                  onClick={() => setSelectedRegion(region.id)}
                  className="cursor-pointer transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              ))}
              {/* Region Labels */}
              {regions.map((region) => (
                <text
                  key={`label-${region.id}`}
                  x={region.x}
                  y={region.y}
                  fontSize="3"
                  fontWeight="bold"
                  fill={selectedRegion === region.id ? '#fff' : '#6B1D1D'}
                  className="pointer-events-none uppercase tracking-tighter"
                  textAnchor="middle"
                >
                  {region.id}
                </text>
              ))}
            </svg>
            
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-soft">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white border border-primary/20" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-soft">Available</span>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {selectedRegion ? (
                <motion.div
                  key={selectedRegion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[40px] p-10 border border-highlight/10 shadow-premium space-y-8 relative overflow-hidden"
                >
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] -mr-16 -mt-16 rounded-full"
                    style={{ backgroundColor: regionData[selectedRegion].color }}
                  />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 text-accent mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Regional Discovery</span>
                      </div>
                      <h3 className="text-4xl font-display font-bold text-primary">{selectedRegion}</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedRegion(null)}
                      className="p-2 hover:bg-cream rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-text-soft" />
                    </button>
                  </div>

                  <p className="text-text-soft leading-relaxed italic border-l-2 border-accent/20 pl-4">
                    {regionData[selectedRegion].description}
                  </p>

                  <div className="space-y-6">
                    {/* Crafts */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-primary">
                        <Palette className="w-4 h-4" />
                        <h4 className="text-sm font-bold uppercase tracking-widest">Signature Crafts</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {regionData[selectedRegion].crafts.map((craft: string) => (
                          <span key={craft} className="px-3 py-1 bg-cream rounded-lg text-[11px] font-medium text-primary border border-highlight/20">
                            {craft}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Foods */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-primary">
                        <Utensils className="w-4 h-4" />
                        <h4 className="text-sm font-bold uppercase tracking-widest">Traditional Flavors</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {regionData[selectedRegion].foods.map((food: string) => (
                          <span key={food} className="px-3 py-1 bg-accent/5 rounded-lg text-[11px] font-medium text-accent border border-accent/10">
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Artisans */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-primary">
                        <User className="w-4 h-4" />
                        <h4 className="text-sm font-bold uppercase tracking-widest">Featured Artisans</h4>
                      </div>
                      <div className="space-y-2">
                        {regionData[selectedRegion].artisans.map((artisan: string) => (
                          <div key={artisan} className="flex items-center justify-between p-3 bg-cream/30 rounded-xl hover:bg-cream transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-accent shadow-sm">
                                <Star className="w-4 h-4 fill-current" />
                              </div>
                              <span className="text-sm font-bold text-primary">{artisan}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-text-soft group-hover:translate-x-1 transition-transform" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => onNavigate('marketplace')}
                    className="w-full btn-primary !py-4 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    Explore {selectedRegion} Collection <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white/40 backdrop-blur-md rounded-[40px] border border-dashed border-highlight/30">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-accent mb-6 shadow-premium">
                    <MapPin className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary mb-4">Select a Region</h3>
                  <p className="text-text-soft text-sm">
                    Discover the soul of India by exploring its diverse regional heritage. Click any highlighted area on the map to begin your journey.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
