import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-cream pt-32 pb-16 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 mandala-bg opacity-[0.08] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5">
            <a href="/" className="flex items-center gap-4 text-4xl font-display font-bold text-accent mb-10 group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" fill="currentColor"/>
                  <path d="M12 22C12 22 19 19 21 12C23 5 12 2 12 2C12 2 1 5 3 12C5 19 12 22 12 22Z" fill="currentColor" fillOpacity="0.3"/>
                </svg>
              </div>
              NammaCraft
            </a>
            <p className="text-cream/60 leading-relaxed mb-12 text-xl font-light max-w-md">
              A global stage for India's master artisans. We bridge the gap between traditional craftsmanship and modern living, ensuring every piece finds a home that appreciates its soul.
            </p>
            <div className="flex gap-6">
              {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 hover:bg-accent hover:text-primary hover:border-accent hover:-translate-y-2 transition-all duration-500">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-10">Market</h4>
            <ul className="space-y-6 text-cream/60 font-medium">
              <li><a href="#" className="hover:text-accent transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Artisan Stories</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-10">Support</h4>
            <ul className="space-y-6 text-cream/60 font-medium">
              <li><a href="#" className="hover:text-accent transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-10">Newsletter</h4>
            <p className="text-cream/60 mb-10 font-light text-lg">Join our inner circle for exclusive previews and artisan tales.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-5 pl-8 pr-20 focus:outline-none focus:border-accent transition-all text-lg placeholder:text-cream/20"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-accent text-primary rounded-xl flex items-center justify-center hover:bg-white transition-all shadow-lg">
                <Mail className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-16 flex flex-col md:flex-row items-center justify-between gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-cream/30">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" />
              </svg>
            </div>
            <p>© 2024 NammaCraft. Handcrafted with love in India.</p>
          </div>
          <div className="flex gap-16">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>

  );
};
