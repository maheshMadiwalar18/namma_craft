import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  Package, 
  Clock,
  ArrowLeft
} from 'lucide-react';

export const Checkout = ({ onNavigate }: any) => {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [isTracking, setIsTracking] = useState(false);

  const product = {
    name: 'Antique Dhokra Art Chariot',
    price: 28500,
    artisan: 'Suresh Murmu',
    image: 'https://picsum.photos/seed/dhokra-auction/400/400',
    shipping: 450,
    tax: 1425
  };

  const total = product.price + product.shipping + product.tax;

  if (step === 3) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-[60px] p-12 md:p-20 shadow-premium text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
          <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-display font-bold text-primary mb-4">Payment Successful!</h1>
          <p className="text-text-soft text-lg mb-12">Your order <span className="text-primary font-bold">#NC-84291</span> has been placed successfully. The artisan has been notified.</p>
          
          <div className="bg-cream/30 rounded-3xl p-8 mb-12 border border-highlight/10 text-left">
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-soft mb-6">Delivery Tracking</h3>
            <div className="space-y-8">
              {[
                { status: 'Order Confirmed', time: 'Today, 10:45 AM', done: true },
                { status: 'Preparing for Shipment', time: 'Estimated: Tomorrow', done: false },
                { status: 'In Transit', time: 'Estimated: Feb 26', done: false },
                { status: 'Delivered', time: 'Estimated: Feb 28', done: false },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i < 3 && <div className={`absolute left-[11px] top-6 w-[2px] h-8 ${item.done ? 'bg-emerald-500' : 'bg-highlight/20'}`} />}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${item.done ? 'bg-emerald-500 text-white' : 'bg-highlight/20 text-white'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${item.done ? 'text-primary' : 'text-text-soft'}`}>{item.status}</p>
                    <p className="text-[10px] text-text-soft/60 uppercase tracking-widest">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate('home')}
              className="btn-primary flex-1 py-4 shadow-xl shadow-primary/20"
            >
              Back to Home
            </button>
            <button className="btn-secondary flex-1 py-4">Download Invoice</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 px-6">
      <div className="container-custom max-w-6xl mx-auto">
        <button 
          onClick={() => onNavigate('auction')}
          className="flex items-center gap-2 text-text-soft hover:text-accent transition-all text-xs font-bold uppercase tracking-widest mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Auction
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-[40px] p-10 border border-highlight/10 shadow-sm">
              <div className="flex items-center gap-6 mb-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${step >= 1 ? 'bg-accent text-white' : 'bg-cream text-text-soft'}`}>
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="h-[2px] flex-1 bg-highlight/10 relative">
                  <div className={`absolute inset-0 bg-accent transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`} />
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${step >= 2 ? 'bg-accent text-white' : 'bg-cream text-text-soft'}`}>
                  <CreditCard className="w-6 h-6" />
                </div>
              </div>

              {step === 1 ? (
                <div className="space-y-8">
                  <h2 className="text-2xl font-display font-bold text-primary">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Full Name</label>
                      <input type="text" placeholder="Arjun Kapoor" className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Phone Number</label>
                      <input type="text" placeholder="+91 98765 43210" className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Street Address</label>
                    <input type="text" placeholder="123, Heritage Lane, Indiranagar" className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">City</label>
                      <input type="text" placeholder="Bangalore" className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-2">Pincode</label>
                      <input type="text" placeholder="560038" className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium" />
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full btn-primary !py-5 text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group">
                    Continue to Payment
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <h2 className="text-2xl font-display font-bold text-primary">Payment Method</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'upi', name: 'UPI (GPay, PhonePe)', icon: '📱' },
                      { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
                      { id: 'net', name: 'Net Banking', icon: '🏦' },
                    ].map((method) => (
                      <label key={method.id} className="flex items-center justify-between p-6 bg-cream/30 rounded-2xl border-2 border-transparent hover:border-accent/20 cursor-pointer transition-all group">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{method.icon}</span>
                          <span className="font-bold text-primary">{method.name}</span>
                        </div>
                        <input type="radio" name="payment" className="w-5 h-5 accent-accent" />
                      </label>
                    ))}
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-start gap-4">
                    <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-emerald-900">Secure Transaction</p>
                      <p className="text-xs text-emerald-700 mt-1 leading-relaxed">Your payment is protected by our artisan trust guarantee. Funds are held in escrow until delivery is confirmed.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="flex-1 btn-secondary !py-5">Back</button>
                    <button onClick={() => setStep(3)} className="flex-[2] btn-primary !py-5 text-sm shadow-xl shadow-primary/20">Pay ₹{total.toLocaleString()}</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[40px] p-10 border border-highlight/10 shadow-sm sticky top-32">
              <h3 className="text-xl font-display font-bold text-primary mb-8">Order Summary</h3>
              
              <div className="flex gap-6 mb-8">
                <img src={product.image} alt={product.name} className="w-24 h-24 rounded-2xl object-cover" />
                <div>
                  <h4 className="font-bold text-primary mb-1">{product.name}</h4>
                  <p className="text-xs text-text-soft mb-2">Artisan: {product.artisan}</p>
                  <div className="flex items-center gap-2 text-accent">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Auction Item</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-text-soft">Winning Bid</span>
                  <span className="font-bold text-primary">₹{product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-soft">Shipping & Handling</span>
                  <span className="font-bold text-primary">₹{product.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-soft">GST (5%)</span>
                  <span className="font-bold text-primary">₹{product.tax.toLocaleString()}</span>
                </div>
                <div className="h-[1px] bg-highlight/10" />
                <div className="flex justify-between text-lg">
                  <span className="font-display font-bold text-primary">Total Amount</span>
                  <span className="font-display font-bold text-accent">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">
                  <Truck className="w-4 h-4" />
                  Estimated Delivery: Feb 28, 2024
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">
                  <Package className="w-4 h-4" />
                  Eco-friendly Packaging Included
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
