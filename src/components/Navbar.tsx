import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useToast } from '../ToastContext';

export const Navbar = ({ onNavigate, currentPage }: any) => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      showToast('Logged out successfully');
      onNavigate('home');
    } catch (error) {
      showToast('Logout failed', 'error');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'marketplace', label: 'Market' },
    { id: 'auction-listing', label: 'Auctions' },
    { id: 'artisan', label: 'Artisans' },
    { id: 'creator', label: 'Studio' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 glass-premium h-16 px-4 md:px-6 flex items-center justify-between border-b border-highlight/20 shadow-sm">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6 md:gap-10">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-xl font-display font-bold text-primary tracking-tight group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:rotate-[15deg] transition-transform duration-500 shadow-md shadow-primary/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
                <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" fill="currentColor" />
                <path d="M12 22C12 22 19 19 21 12C23 5 12 2 12 2C12 2 1 5 3 12C5 19 12 22 12 22Z" fill="currentColor" fillOpacity="0.3" />
              </svg>
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">NammaCraft</span>
          </button>

          <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-text-soft">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 transition-all hover:text-accent ${currentPage === item.id ? 'text-primary' : ''}`}
              >
                {item.label}
                <div className={`absolute -bottom-0.5 left-0 h-[2px] bg-accent transition-all duration-300 ${currentPage === item.id ? 'w-full' : 'w-0 hover:w-full'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Search + Actions */}
        <div className="flex items-center gap-3">
          <div className="relative hidden xl:block w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-accent" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-cream/50 border border-transparent focus:border-accent/20 focus:bg-white rounded-full py-2 pl-9 pr-4 text-xs font-medium text-primary transition-all outline-none placeholder:text-text-soft/40"
            />
          </div>

          <button className="p-2 hover:bg-accent/10 rounded-xl transition-all relative">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[8px] font-bold flex items-center justify-center rounded-full border-2 border-white">2</span>
          </button>

          {user ? (
            <div className="hidden sm:flex items-center relative group">
              <div className="flex items-center gap-2 cursor-pointer bg-cream/50 hover:bg-cream rounded-full pl-1.5 pr-3 py-1.5 border border-highlight/20 transition-all">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-7 h-7 rounded-full object-cover border border-accent/30"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xs">
                    {user.displayName?.charAt(0) || 'U'}
                  </div>
                )}
                <span className="text-xs font-bold text-primary truncate max-w-[80px]">
                  {user.displayName?.split(' ')[0] || 'User'}
                </span>
              </div>
              <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-xl shadow-premium border border-highlight/10 p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => onNavigate('creator')}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-primary hover:bg-cream rounded-lg transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-3 h-3" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="hidden sm:flex items-center gap-2 bg-primary text-white py-2 px-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary-light transition-all shadow-md"
            >
              <User className="w-3.5 h-3.5" />
              Login
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-[100] bg-black/20" onClick={() => setMenuOpen(false)}>
          <div className="bg-white border-b border-highlight/20 shadow-xl p-4 space-y-1" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${currentPage === item.id ? 'bg-primary/5 text-primary' : 'text-text-soft hover:bg-cream'}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { onNavigate('admin'); setMenuOpen(false); }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-text-soft hover:bg-cream"
            >
              Admin
            </button>
            {!user ? (
              <button
                onClick={() => { onNavigate('login'); setMenuOpen(false); }}
                className="w-full bg-primary text-white py-3 rounded-xl text-sm font-bold mt-2"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="w-full bg-rose-50 text-rose-600 py-3 rounded-xl text-sm font-bold mt-2 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
