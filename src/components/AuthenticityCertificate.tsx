import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Award, MapPin, User, Calendar, Hash, Sparkles, Package } from 'lucide-react';

interface AuthenticityCertificateProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  artisan: string;
  region: string;
  certificateId: string;
  dateIssued: string;
}

export const AuthenticityCertificate = ({ 
  isOpen, 
  onClose, 
  productName, 
  artisan, 
  region, 
  certificateId, 
  dateIssued 
}: AuthenticityCertificateProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-[40px] shadow-2xl overflow-hidden border-8 border-white"
          >
            {/* Certificate Background Pattern */}
            <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
            <div className="absolute inset-0 border-[20px] border-accent/5 pointer-events-none" />
            
            <div className="relative z-10 p-12 flex flex-col items-center text-center">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-accent/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-primary/40" />
              </button>

              {/* Header */}
              <div className="mb-8 flex flex-col items-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6 relative">
                  <Award className="w-10 h-10" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-accent/30 rounded-full"
                  />
                </div>
                <h2 className="text-4xl font-display font-bold text-primary mb-2">Certificate of Authenticity</h2>
                <div className="flex items-center gap-2 text-accent">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Verified Heritage Craft</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <div className="w-full max-w-md space-y-8 mb-12">
                <p className="text-text-soft italic text-lg leading-relaxed">
                  This document certifies that the following item is an authentic, handmade creation, crafted with traditional techniques passed down through generations.
                </p>

                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-accent mb-1">
                      <Package className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Product Name</span>
                    </div>
                    <p className="text-primary font-display font-bold text-xl">{productName}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-accent mb-1">
                      <User className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Master Artisan</span>
                    </div>
                    <p className="text-primary font-display font-bold text-xl">{artisan}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-accent mb-1">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Origin Region</span>
                    </div>
                    <p className="text-primary font-display font-bold text-xl">{region}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-accent mb-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Verification Status</span>
                    </div>
                    <p className="text-emerald-600 font-display font-bold text-xl flex items-center gap-2">
                      Handmade Verified
                    </p>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <div className="flex items-center gap-2 text-accent mb-1">
                        <Hash className="w-3 h-3" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Certificate ID</span>
                      </div>
                      <p className="text-primary font-mono text-xs font-bold">{certificateId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right md:text-left">
                      <div className="flex items-center gap-2 text-accent mb-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Date Issued</span>
                      </div>
                      <p className="text-primary font-mono text-xs font-bold">{dateIssued}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seal */}
              <div className="relative flex flex-col items-center">
                <div className="w-24 h-24 bg-accent rounded-full shadow-xl flex items-center justify-center text-white border-4 border-white relative overflow-hidden group">
                  <div className="absolute inset-0 mandala-bg opacity-20 group-hover:rotate-90 transition-transform duration-1000" />
                  <ShieldCheck className="w-12 h-12 relative z-10" />
                </div>
                <p className="mt-4 text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Official Artisan Seal</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
