import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, User, ShieldCheck } from 'lucide-react';
import { useToast } from '../ToastContext';
import { useAuth } from '../AuthContext';

export const Login = ({ onNavigate }: any) => {
  const { showToast } = useToast();
  const { user, signInWithGoogle, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('buyer');
  const [isSigningIn, setIsSigningIn] = useState(false);

  // If user is already authenticated, redirect
  React.useEffect(() => {
    if (user) {
      showToast(`Welcome back, ${user.displayName || 'User'}!`);
      if (role === 'admin') onNavigate('admin');
      else if (role === 'seller') onNavigate('creator');
      else onNavigate('home');
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle(role);
      showToast('Signed in with Google successfully!');
      // Navigation will happen via the useEffect above
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        showToast('Sign-in cancelled', 'info');
      } else if (error.code === 'auth/configuration-not-found' || error.code === 'auth/invalid-api-key') {
        showToast('Firebase not configured yet. See src/firebase.ts', 'error');
        // Fallback: still navigate for demo purposes
        setTimeout(() => {
          if (role === 'admin') onNavigate('admin');
          else if (role === 'seller') onNavigate('creator');
          else onNavigate('home');
        }, 1500);
      } else {
        showToast(`Sign-in failed: ${error.message}`, 'error');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Email login is for demo only. Use Google Sign-In for real authentication!', 'info');
    if (role === 'admin') onNavigate('admin');
    else if (role === 'seller') onNavigate('creator');
    else onNavigate('home');
  };

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
                <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" fill="currentColor" />
                <path d="M12 22C12 22 19 19 21 12C23 5 12 2 12 2C12 2 1 5 3 12C5 19 12 22 12 22Z" fill="currentColor" fillOpacity="0.3" />
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
                className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${role === r ? 'bg-white text-primary shadow-sm' : 'text-text-soft hover:text-primary'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Google Sign-In - Primary Action */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSigningIn || loading}
            className="w-full flex items-center justify-center gap-4 py-5 bg-white border-2 border-highlight/15 rounded-2xl hover:border-accent/30 hover:bg-cream/30 transition-all text-sm font-bold text-primary shadow-sm group disabled:opacity-60 disabled:cursor-not-allowed mb-4"
          >
            {isSigningIn ? (
              <>
                <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                Connecting to Google...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign in with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-highlight/10"></div>
            </div>
            <span className="relative px-4 bg-white text-[10px] font-bold text-text-soft uppercase tracking-widest">Or use your email</span>
          </div>

          {/* Email Form - Secondary */}
          <form className="space-y-5" onSubmit={handleEmailSubmit}>
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
              {isLogin ? 'Sign In with Email' : 'Create Account'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

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
