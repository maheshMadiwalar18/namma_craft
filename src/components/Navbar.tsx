import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, Plus, LogOut, LayoutDashboard, ChevronDown, Globe } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useToast } from '../ToastContext';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = ({ onNavigate, currentPage }: any) => {
  const { user, userProfile, logout, loading } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  const isBuyer = userProfile?.role === 'buyer' || !user;

  const handleDashboardNavigate = () => {
    const uRole = userProfile?.role;
    if (uRole === 'admin') onNavigate('admin');
    else if (uRole === 'seller') onNavigate('creator');
    else onNavigate('buyer/dashboard');
  };

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
          {/* Language Selector */}
          <div className="relative group hidden sm:block">
            <button className="flex items-center gap-1.5 p-2 hover:bg-accent/10 rounded-xl transition-all">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary hidden md:inline">{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-text-soft" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-32 bg-white/90 backdrop-blur-md rounded-2xl shadow-premium border border-highlight/20 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top-right group-hover:scale-100 scale-95">
              {['English', 'हिंदी', 'ಕನ್ನಡ'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setCurrentLang(lang);
                    showToast(`Language set to ${lang}`);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-colors ${
                    currentLang === lang ? 'bg-primary/5 text-primary' : 'text-text-soft hover:bg-cream hover:text-primary'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="relative hidden xl:block w-52">
            <label htmlFor="nav-search" className="sr-only">Search heritage products</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-accent" />
            <input
              id="nav-search"
              type="text"
              placeholder="Search..."
              className="w-full bg-cream/50 border border-transparent focus:border-accent/40 focus:ring-2 focus:ring-accent/10 focus:bg-white rounded-full py-2 pl-9 pr-4 text-xs font-medium text-primary transition-all outline-none placeholder:text-text-soft/40 shadow-inner"
            />
          </div>

          {isBuyer && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-accent/10 rounded-xl transition-all relative"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 text-primary" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[8px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {loading ? (
            <div className="w-20 h-8 bg-highlight/5 animate-pulse rounded-full" />
          ) : !user ? (
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => onNavigate('login')}
                className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-all px-2"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="flex items-center gap-2 bg-primary text-white py-2 px-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary-light transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                Sign Up
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={handleDashboardNavigate}
                className="flex items-center gap-2 bg-accent/10 text-accent py-2 px-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-sm border border-accent/20"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </button>

              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer bg-cream/50 hover:bg-cream rounded-full p-1.5 border border-highlight/20 transition-all">
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
                  <ChevronDown className="w-3.5 h-3.5 text-text-soft group-hover:text-primary transition-colors" />
                </div>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-2xl shadow-premium border border-highlight/20 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top-right group-hover:scale-100 scale-95">
                  <div className="px-4 py-3 border-b border-highlight/5 mb-2">
                    <p className="text-xs font-bold text-primary truncate">{user.displayName || 'User'}</p>
                    <p className="text-[10px] text-text-soft uppercase tracking-widest">{userProfile?.role || 'Guest'}</p>
                  </div>
                  <button
                    onClick={handleDashboardNavigate}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-primary hover:bg-cream rounded-xl transition-colors flex items-center gap-3"
                  >
                    <User className="w-4 h-4 text-accent" /> My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-3"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}



          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-3 text-primary hover:bg-primary/5 rounded-full transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Slide-out Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-cream z-[100] p-6 shadow-2xl overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-primary/5 pb-4">
                  <span className="font-display font-bold text-xl text-primary">Navigation Menu</span>
                  <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-primary/5 rounded-full transition-colors" aria-label="Close menu">
                    <X className="w-6 h-6 text-primary" />
                  </button>
                </div>

                {/* Mobile Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                  <input
                    type="text"
                    placeholder="Search heritage products..."
                    className="w-full bg-white border border-primary/10 rounded-full py-3 pl-11 pr-4 text-xs font-medium text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all shadow-sm"
                  />
                </div>

                {/* Nav Items */}
                <div className="space-y-1 mb-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${currentPage === item.id ? 'bg-primary text-white shadow-md' : 'text-text-soft hover:bg-white hover:text-primary'}`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => { onNavigate('admin'); setMenuOpen(false); }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${currentPage === 'admin' ? 'bg-primary text-white shadow-md' : 'text-text-soft hover:bg-white hover:text-primary'}`}
                  >
                    Admin Panel
                  </button>
                </div>

                {/* Language Selector in Mobile Menu */}
                <div className="border-t border-primary/5 pt-6 mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-soft mb-3 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Select Language
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {['English', 'हिंदी', 'ಕನ್ನಡ'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setCurrentLang(lang);
                          showToast(`Language set to ${lang}`);
                        }}
                        className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${
                          currentLang === lang ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-text-soft border-primary/10 hover:border-accent'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: Auth / Profile Actions */}
              <div className="border-t border-primary/5 pt-6 mt-6">
                {!user ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => { onNavigate('login'); setMenuOpen(false); }}
                      className="w-full btn-secondary !py-3.5 text-xs uppercase tracking-widest flex items-center justify-center font-bold"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { onNavigate('signup'); setMenuOpen(false); }}
                      className="w-full btn-primary !py-3.5 text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg font-bold"
                    >
                      <Plus className="w-4 h-4" /> Sign Up
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-primary/5">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          className="w-10 h-10 rounded-full object-cover border-2 border-accent"
                          alt={user.displayName || 'User'}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">
                          {user.displayName?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-primary truncate">{user.displayName}</p>
                        <p className="text-[10px] text-text-soft uppercase tracking-widest">{userProfile?.role || 'Collector'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => { handleDashboardNavigate(); setMenuOpen(false); }}
                        className="w-full bg-accent/10 hover:bg-accent hover:text-primary text-accent py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-accent/10"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                      </button>
                      <button
                        onClick={() => { handleLogout(); setMenuOpen(false); }}
                        className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
