import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Info, AlertCircle } from 'lucide-react';

export const Toast = ({ message, type = 'success', isVisible, onClose }: any) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-rose-500" />;
      default: return <Info className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90vw] sm:w-auto sm:min-w-[320px]"
        >
          <div className="bg-white rounded-2xl p-4 shadow-2xl border border-highlight/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center">
              {getIcon()}
            </div>
            <div className="flex-grow">
              <p className="text-sm font-bold text-primary">{message}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-cream rounded-lg transition-all"
            >
              <X className="w-4 h-4 text-text-soft" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
