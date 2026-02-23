import React from 'react';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';

export const Navbar = ({ onNavigate, currentPage }: any) => {
  return (
    <nav className="sticky top-0 z-50 glass-premium h-[90px] px-10 flex items-center justify-between border-b border-highlight/20 shadow-sm">
      <div className="flex items-center gap-16">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-4 text-3xl font-display font-bold text-primary tracking-tight group"
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center group-hover:rotate-[15deg] transition-transform duration-700 shadow-lg shadow-primary/20">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
                <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" fill="currentColor"/>
                <path d="M12 22C12 22 19 19 21 12C23 5 12 2 12 2C12 2 1 5 3 12C5 19 12 22 12 22Z" fill="currentColor" fillOpacity="0.3"/>
              </svg>
            </div>
            <div className="absolute -inset-2 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">NammaCraft</span>
        </button>
        
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-text-soft">
          {[
            { id: 'home', label: 'Home' },
            { id: 'discovery', label: 'Discovery' },
            { id: 'marketplace', label: 'Marketplace' },
            { id: 'auction-listing', label: 'Auctions' },
            { id: 'artisan', label: 'Artisans' },
            { id: 'creator', label: 'Studio' },
            { id: 'admin', label: 'Admin' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative py-2 transition-all hover:text-accent group ${currentPage === item.id ? 'text-primary' : ''}`}
            >
              {item.label}
              <div className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-500 ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative hidden xl:block w-72">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
          <input 
            type="text" 
            placeholder="Search our treasury..." 
            className="w-full bg-cream/50 border-2 border-transparent focus:border-accent/20 focus:bg-white rounded-full py-3 pl-12 pr-6 text-sm font-medium text-primary transition-all outline-none placeholder:text-text-soft/40"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-3.5 hover:bg-accent/10 rounded-2xl transition-all relative group">
            <ShoppingBag className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            <span className="absolute top-2 right-2 w-5 h-5 bg-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-md">2</span>
          </button>
          
          <button 
            onClick={() => onNavigate('login')}
            className="hidden sm:flex items-center gap-3 btn-primary !py-3 !px-8 text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 group"
          >
            <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Account
          </button>
          
          <button className="lg:hidden p-2 text-primary">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>
    </nav>

  );
};
