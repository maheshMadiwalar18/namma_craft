import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight, Minus, Plus } from 'lucide-react';

export const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove, onNavigate }: any) => {
  const total = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-highlight/10 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-primary">Your Collection</h2>
                  <p className="text-xs text-text-soft font-bold uppercase tracking-widest">{cartItems.length} Items</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-cream rounded-2xl transition-all group"
              >
                <X className="w-6 h-6 text-text-soft group-hover:text-primary group-hover:rotate-90 transition-all duration-500" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 rounded-full bg-cream-dark flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-text-soft/20" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-primary mb-2">Your collection is empty</h3>
                    <p className="text-sm text-text-soft max-w-[240px] mx-auto">Discover unique handcrafted treasures to add to your heritage collection.</p>
                  </div>
                  <button
                    onClick={() => { onClose(); onNavigate('marketplace'); }}
                    className="btn-primary !py-4 !px-8 text-xs uppercase tracking-widest"
                  >
                    Explore Marketplace
                  </button>
                </div>
              ) : (
                cartItems.map((item: any) => (
                  <motion.div
                    layout
                    key={item.productId}
                    className="flex gap-6 p-4 bg-white rounded-3xl border border-highlight/5 shadow-sm group"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-display font-bold text-primary group-hover:text-accent transition-colors">{item.name}</h4>
                        <p className="text-[10px] text-text-soft font-bold uppercase tracking-widest">{item.artisan}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-cream/50 rounded-xl p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-white rounded-lg transition-all"
                          >
                            <Minus className="w-3 h-3 text-primary" />
                          </button>
                          <span className="text-xs font-bold text-primary w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                            className="p-1 hover:bg-white rounded-lg transition-all"
                          >
                            <Plus className="w-3 h-3 text-primary" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-bold text-primary">₹{(item.price * item.quantity).toLocaleString()}</p>
                          <button
                            onClick={() => onRemove(item.productId)}
                            className="p-2 hover:bg-rose-50 rounded-xl text-text-soft hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-8 bg-white border-t border-highlight/10 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-text-soft">
                    <span>Subtotal</span>
                    <span className="font-bold text-primary">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-text-soft">
                    <span>Shipping</span>
                    <span className="font-bold text-primary">Calculated at checkout</span>
                  </div>
                  <div className="h-[1px] bg-highlight/10 w-full" />
                  <div className="flex justify-between text-xl font-display font-bold text-primary">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => { onClose(); onNavigate('checkout'); }}
                  className="w-full btn-primary !py-5 text-sm flex items-center justify-center gap-3 group shadow-xl shadow-primary/20"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
