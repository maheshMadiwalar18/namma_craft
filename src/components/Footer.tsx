import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export const Footer = ({ onNavigate }: any) => {
  return (
    <footer className="bg-primary text-cream pt-8 pb-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 mandala-bg opacity-[0.08] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-5">
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="flex items-center gap-3 text-2xl font-display font-bold text-accent mb-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" fill="currentColor" />
                  <path d="M12 22C12 22 19 19 21 12C23 5 12 2 12 2C12 2 1 5 3 12C5 19 12 22 12 22Z" fill="currentColor" fillOpacity="0.3" />
                </svg>
              </div>
              NammaCraft
            </button>
            <p className="text-cream/60 leading-relaxed mb-6 text-sm font-light max-w-md">
              A global stage for India's master artisans. Bridging traditional craftsmanship and modern living.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                <button key={idx} className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-4">Market</h4>
            <ul className="space-y-2 text-cream/60 text-sm font-medium">
              <li><button onClick={() => onNavigate && onNavigate('marketplace')} className="hover:text-accent transition-colors">New Arrivals</button></li>
              <li><button onClick={() => onNavigate && onNavigate('marketplace')} className="hover:text-accent transition-colors">Best Sellers</button></li>
              <li><button onClick={() => onNavigate && onNavigate('artisan')} className="hover:text-accent transition-colors">Artisan Stories</button></li>
              <li><button onClick={() => onNavigate && onNavigate('marketplace')} className="hover:text-accent transition-colors">Gift Cards</button></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-4">Support</h4>
            <ul className="space-y-2 text-cream/60 text-sm font-medium">
              <li><button className="hover:text-accent transition-colors">Shipping</button></li>
              <li><button className="hover:text-accent transition-colors">Returns</button></li>
              <li><button className="hover:text-accent transition-colors">Contact</button></li>
              <li><button className="hover:text-accent transition-colors">FAQ</button></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-4">Newsletter</h4>
            <p className="text-cream/60 mb-4 font-light text-sm">Join for exclusive previews and artisan tales.</p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-14 focus:outline-none focus:border-accent transition-all text-sm placeholder:text-cream/20"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-accent text-primary rounded-lg flex items-center justify-center hover:bg-white transition-all">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-cream/30">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent/30">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" />
              </svg>
            </div>
            <p>© 2024 NammaCraft. Handcrafted with love in India.</p>
          </div>
          <div className="flex gap-8">
            <button className="hover:text-accent transition-colors">Privacy Policy</button>
            <button className="hover:text-accent transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
