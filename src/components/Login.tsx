import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, ShieldCheck } from 'lucide-react';
import { useToast } from '../ToastContext';
import { useAuth } from '../AuthContext';

export const Login = ({ onNavigate, initialMode = 'login' }: any) => {
  const { showToast } = useToast();
  const { user, userProfile, signInWithGoogle, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [role, setRole] = useState('buyer');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');


  // Sync mode if it changes
  React.useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  // Redirect if user profile is loaded
  React.useEffect(() => {
    if (user && userProfile) {
      // Don't redirect if it's an error object
      if (userProfile.error) {
        console.error('User profile has error, staying on login page');
        return;
      }
      const uRole = userProfile.role || 'buyer';
      if (uRole === 'admin') onNavigate('admin');
      else if (uRole === 'seller') onNavigate('creator');
      else onNavigate('buyer/dashboard'); // Redirect buyer to dashboard
    }
  }, [user, userProfile]);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const authData = isLogin ? {} : {
        displayName: fullName,
        email,
        age: age ? parseInt(age) : undefined,
        location,
        phone,
        gender,
        state,
        bio
      };


      const profile = await signInWithGoogle(role, authData);

      if (profile) {
        if (profile.error) {
          showToast(`Access failed: ${profile.error}`, 'error');
          return;
        }
        const uRole = profile.role || 'buyer';
        showToast(`Welcome ${uRole === 'seller' ? 'Artisan' : 'Collector'}, ${profile.displayName}!`);
        if (uRole === 'admin') onNavigate('admin');
        else if (uRole === 'seller') onNavigate('creator');
        else onNavigate('buyer/dashboard');
      }
    } catch (error: any) {
      showToast(`Login failed: ${error.message}`, 'error');
    } finally {
      setIsSigningIn(false);
    }
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
            {['buyer', 'seller'].map((r) => (
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

          {!isLogin && (
            <div className="space-y-4 mb-6">
              <div className="space-y-1">
                <label htmlFor="full-name" className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Full Name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                  <input
                    id="full-name"
                    type="text"
                    placeholder="Arjun Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-14 pr-6 py-3 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="age" className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Age</label>
                  <input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-5 py-3 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-5 py-3 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="location" className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Location</label>
                <input
                  id="location"
                  type="text"
                  placeholder="Bangalore, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-5 py-3 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="gender" className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Gender</label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-5 py-3 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium appearance-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label htmlFor="state" className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">State</label>
                  <input
                    id="state"
                    type="text"
                    placeholder="Karnataka"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-5 py-3 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="bio" className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Bio</label>
                <textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-5 py-3 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium h-20 resize-none"
                />
              </div>
              <div className="p-3 bg-accent/5 rounded-xl border border-accent/10">
                <p className="text-[10px] text-accent font-medium leading-tight">
                  <ShieldCheck className="w-3 h-3 inline mr-1 mb-0.5" />
                  This information helps us personalize your heritage experience.
                </p>
              </div>
            </div>
          )}

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={handleSignIn}
            disabled={isSigningIn || loading}
            className="w-full flex items-center justify-center gap-4 py-5 bg-primary text-white border-2 border-primary rounded-2xl hover:bg-primary-light transition-all text-sm font-bold shadow-xl shadow-primary/20 group disabled:opacity-60 disabled:cursor-not-allowed mb-6"
          >
            {isSigningIn ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Validating Credentials...
              </>
            ) : (
              <>
                {isLogin ? 'Enter the Treasury' : 'Initialize Account'}
              </>
            )}
          </button>

          <p className="text-center text-sm text-text-soft">
            {isLogin ? "New to the treasury?" : "Already a collector?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-accent font-bold hover:text-primary transition-colors"
            >
              {isLogin ? 'Create Account' : 'Sign In instead'}
            </button>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" /> Encrypted Local Session
          </div>
          <div className="flex items-center gap-2">
            <User className="w-3 h-3" /> 10k+ Cultural Explorers
          </div>
        </div>
      </motion.div>
    </div>
  );
};
