import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Github, Chrome, User, ShieldCheck } from 'lucide-react';

export const Login = ({ onNavigate }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('buyer'); // buyer, seller, admin

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white rounded-[48px] p-10 md:p-12 shadow-premium border border-highlight/10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
                <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" fill="currentColor"/>
                <path d="M12 22C12 22 19 19 21 12C23 5 12 2 12 2C12 2 1 5 3 12C5 19 12 22 12 22Z" fill="currentColor" fillOpacity="0.3"/>
              </svg>
            </div>
            <h1 className="text-3xl font-display font-bold text-primary mb-2">
              {isLogin ? 'Welcome Back' : 'Join the Treasury'}
            </h1>
            <p className="text-text-soft text-sm">
              {isLogin ? 'Sign in to continue your cultural journey' : 'Create an account to start collecting heritage'}
            </p>
          </div>

          {/* Role Selector */}
          <div className="flex bg-cream/50 p-1.5 rounded-2xl mb-8">
            {['buyer', 'seller', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  role === r ? 'bg-white text-primary shadow-sm' : 'text-text-soft hover:text-primary'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form className="space-y-5" onSubmit={(e) => {
            e.preventDefault();
            if (role === 'admin') onNavigate('admin');
            else if (role === 'seller') onNavigate('creator');
            else onNavigate('home');
          }}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                <input 
                  type="email" 
                  placeholder="artisan@nammacraft.com"
                  className="w-full pl-14 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft">Password</label>
                {isLogin && <button type="button" className="text-[10px] font-bold text-accent uppercase tracking-widest hover:text-primary transition-colors">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary !py-5 text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group mt-4">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-highlight/10"></div>
              </div>
              <span className="relative px-4 bg-white text-[10px] font-bold text-text-soft uppercase tracking-widest">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 bg-cream/30 rounded-2xl hover:bg-cream transition-all text-sm font-bold text-primary">
                <Chrome className="w-4 h-4" /> Google
              </button>
              <button className="flex items-center justify-center gap-3 py-4 bg-cream/30 rounded-2xl hover:bg-cream transition-all text-sm font-bold text-primary">
                <Github className="w-4 h-4" /> Github
              </button>
            </div>
          </div>

          <p className="text-center mt-10 text-sm text-text-soft">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-accent font-bold hover:text-primary transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" /> Secure Login
          </div>
          <div className="flex items-center gap-2">
            <User className="w-3 h-3" /> 10k+ Artisans
          </div>
        </div>
      </motion.div>
    </div>
  );
};
