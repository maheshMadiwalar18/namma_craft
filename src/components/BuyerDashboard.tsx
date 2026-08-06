import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    User,
    ShoppingBag,
    Heart,
    Settings,
    LogOut,
    Package,
    Truck,
    CheckCircle,
    Clock,
    MapPin,
    Phone,
    Mail,
    ChevronRight,
    TrendingUp,
    LayoutDashboard,
    Search,
    Bell,
    CreditCard
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useToast } from '../ToastContext';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-[32px] border border-highlight/10 shadow-sm"
    >
        <div className={`p-3 rounded-2xl w-fit mb-4 ${color}`}>
            <Icon className="w-5 h-5" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-soft mb-1">{title}</p>
        <h3 className="text-2xl font-display font-bold text-primary">{value}</h3>
    </motion.div>
);

export const BuyerDashboard = ({ onNavigate }: any) => {
    const { user, userProfile, logout } = useAuth();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isEditing, setIsEditing] = useState(false);

    // Mock data for demonstration (In real app, fetch from backend)
    const orders = [
        { id: 'ORD-8821', product: 'Blue Pottery Vase', date: 'Mar 5, 2026', amount: 2450, status: 'Delivered', image: 'https://picsum.photos/seed/pottery/100/100' },
        { id: 'ORD-8845', product: 'Banarasi Silk Stole', date: 'Mar 7, 2026', amount: 4500, status: 'Shipped', image: 'https://picsum.photos/seed/silk/100/100' },
        { id: 'ORD-8890', product: 'Kundan Bangle', date: 'Yesterday', amount: 3800, status: 'Processing', image: 'https://picsum.photos/seed/jewelry/100/100' },
    ];

    const wishlist = [
        { id: 1, name: 'Hand-Carved Teak Mirror', price: 12500, image: 'https://picsum.photos/seed/mirror/200/200' },
        { id: 2, name: 'Madhubani Lotus Painting', price: 5500, image: 'https://picsum.photos/seed/art/200/200' },
    ];

    const handleLogout = async () => {
        await logout();
        showToast('Logged out successfully');
        onNavigate('home');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-50 text-emerald-600';
            case 'Shipped': return 'bg-blue-50 text-blue-600';
            case 'Processing': return 'bg-amber-50 text-amber-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    const sidebarItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'orders', label: 'My Orders', icon: ShoppingBag },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'profile', label: 'Profile Settings', icon: User },
    ];

    return (
        <div className="bg-cream min-h-screen flex selection:bg-accent/20">
            {/* Sidebar */}
            <aside className="w-80 bg-primary text-cream hidden lg:flex flex-col sticky top-0 h-screen p-8">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary font-bold">NC</div>
                        <span className="font-display font-bold text-2xl">Namma Craft</span>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/10">
                        <img
                            src={user?.photoURL || 'https://ui-avatars.com/api/?name=' + (userProfile?.displayName || 'User')}
                            className="w-12 h-12 rounded-2xl object-cover border-2 border-accent/20"
                            alt="Avatar"
                        />
                        <div className="min-w-0">
                            <p className="font-bold text-sm truncate">{userProfile?.displayName || 'Cultural Explorer'}</p>
                            <p className="text-[10px] text-cream/40 uppercase tracking-widest">Collector</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === item.id
                                ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/10'
                                : 'text-cream/60 hover:bg-white/5 hover:text-cream'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm tracking-wide">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="mt-auto flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-300 hover:bg-rose-500/10 hover:text-rose-400 transition-all font-bold"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm tracking-wide lowercase italic">safe exit</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 relative">
                <header className="h-24 bg-white/80 backdrop-blur-md border-b border-highlight/10 flex items-center justify-between px-10 sticky top-0 z-30">
                    <h2 className="text-2xl font-display font-bold text-primary">
                        {sidebarItems.find(i => i.id === activeTab)?.label}
                    </h2>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="pl-12 pr-6 py-2.5 bg-cream/50 rounded-full text-xs focus:bg-white transition-all outline-none border border-transparent focus:border-accent/30 w-64"
                            />
                        </div>
                        <button className="p-3 hover:bg-cream rounded-full relative">
                            <Bell className="w-5 h-5 text-primary" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-white" />
                        </button>
                        <div className="w-[1px] h-8 bg-highlight/10" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{userProfile?.displayName}</p>
                                <p className="text-[8px] text-text-soft uppercase tracking-widest">Active Member</p>
                            </div>
                            <img
                                src={user?.photoURL || 'https://ui-avatars.com/api/?name=' + userProfile?.displayName}
                                className="w-10 h-10 rounded-full border border-highlight/10"
                                alt=""
                            />
                        </div>
                    </div>
                </header>

                <div className="p-10">
                    <AnimatePresence mode="wait">
                        {activeTab === 'dashboard' && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-10"
                            >
                                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    <StatCard title="Total Spent" value="₹12,450" icon={TrendingUp} color="bg-emerald-50 text-emerald-600" />
                                    <StatCard title="Active Orders" value="2" icon={Package} color="bg-blue-50 text-blue-600" />
                                    <StatCard title="Favorites" value="18" icon={Heart} color="bg-rose-50 text-rose-600" />
                                    <StatCard title="Craft Coins" value="850" icon={CreditCard} color="bg-amber-50 text-amber-600" />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Recent Orders */}
                                    <div className="lg:col-span-2 bg-white rounded-[40px] p-8 border border-highlight/10 shadow-sm">
                                        <div className="flex justify-between items-center mb-8 px-2">
                                            <h3 className="text-xl font-display font-bold text-primary">Recent Acquisitions</h3>
                                            <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-accent uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                                                View All <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <div key={order.id} className="group p-4 rounded-3xl hover:bg-cream/30 transition-all border border-transparent hover:border-highlight/5 flex items-center gap-6">
                                                    <img src={order.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" alt="" />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-primary truncate">{order.product}</h4>
                                                        <p className="text-[10px] text-text-soft uppercase tracking-widest font-medium">{order.id} • {order.date}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-primary mb-1">₹{order.amount.toLocaleString()}</p>
                                                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Wishlist Preview */}
                                    <div className="bg-primary p-8 rounded-[40px] text-cream relative overflow-hidden">
                                        <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
                                        <h3 className="text-xl font-display font-bold mb-8 relative z-10">Curated Treats</h3>
                                        <div className="space-y-6 relative z-10">
                                            {wishlist.map((item) => (
                                                <div key={item.id} className="flex gap-4 group">
                                                    <img src={item.image} className="w-20 h-20 rounded-2xl object-cover border border-white/10" alt="" />
                                                    <div>
                                                        <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                                                        <p className="text-accent font-bold">₹{item.price.toLocaleString()}</p>
                                                        <button className="mt-2 text-[10px] font-bold uppercase tracking-widest text-cream/40 group-hover:text-accent transition-colors">
                                                            Move to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={() => setActiveTab('wishlist')} className="w-full mt-10 py-4 rounded-2xl border-2 border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-primary hover:border-accent transition-all relative z-10">
                                            Full Wishlist
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="max-w-4xl"
                            >
                                <div className="bg-white rounded-[40px] p-10 border border-highlight/10 shadow-sm">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="flex items-center gap-8">
                                            <div className="relative group">
                                                <img
                                                    src={user?.photoURL || 'https://ui-avatars.com/api/?name=' + userProfile?.displayName}
                                                    className="w-32 h-32 rounded-[40px] object-cover border-4 border-cream shadow-xl"
                                                    alt=""
                                                />
                                                <button className="absolute -bottom-2 -right-2 p-3 bg-accent text-primary rounded-2xl shadow-lg hover:scale-110 transition-transform">
                                                    <Settings className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-display font-bold text-primary mb-1">{userProfile?.displayName}</h3>
                                                <p className="text-text-soft flex items-center gap-2 mb-4">
                                                    <MapPin className="w-4 h-4 text-accent" /> {userProfile?.location || 'India'}
                                                </p>
                                                <div className="flex gap-2">
                                                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest border border-accent/20">Verified Email</span>
                                                    <span className="px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest border border-highlight/10">Member since 2024</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="btn-secondary !py-2.5 !px-6 text-xs uppercase tracking-widest"
                                        >
                                            {isEditing ? 'Cancel' : 'Edit Profile'}
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                                                <input
                                                    type="text"
                                                    defaultValue={userProfile?.displayName}
                                                    disabled={!isEditing}
                                                    className="w-full pl-14 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium disabled:opacity-50"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                                                <input
                                                    type="email"
                                                    defaultValue={userProfile?.email}
                                                    disabled={!isEditing}
                                                    className="w-full pl-14 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium disabled:opacity-50"
                                                />

                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                                                <input
                                                    type="tel"
                                                    defaultValue={userProfile?.phone || '+91 98765 43210'}
                                                    disabled={!isEditing}
                                                    className="w-full pl-14 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium disabled:opacity-50"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Shipping State</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                                                <input
                                                    type="text"
                                                    defaultValue={userProfile?.state || 'Karnataka'}
                                                    disabled={!isEditing}
                                                    className="w-full pl-14 pr-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium disabled:opacity-50"
                                                />
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Detailed Address</label>
                                            <textarea
                                                defaultValue={userProfile?.location + ", " + userProfile?.state}
                                                disabled={!isEditing}
                                                rows={3}
                                                className="w-full p-6 bg-cream/30 rounded-[32px] border-2 border-transparent focus:border-accent focus:bg-white outline-none transition-all font-medium resize-none disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-12 flex justify-end gap-4"
                                        >
                                            <button onClick={() => setIsEditing(false)} className="px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-text-soft hover:bg-cream transition-all">Discard</button>
                                            <button
                                                onClick={() => { setIsEditing(false); showToast('Profile updated successfully!'); }}
                                                className="btn-primary !px-10 !py-4 text-xs"
                                            >
                                                Save Changes
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'orders' && (
                            <motion.div
                                key="orders"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                <div className="bg-white rounded-[40px] border border-highlight/10 shadow-sm overflow-hidden">
                                    <div className="p-8 border-b border-highlight/10 flex justify-between items-center">
                                        <div className="flex gap-6">
                                            <button className="text-sm font-bold text-primary border-b-2 border-accent pb-2">Ongoing</button>
                                            <button className="text-sm font-bold text-text-soft hover:text-primary transition-colors pb-2">Completed</button>
                                            <button className="text-sm font-bold text-text-soft hover:text-primary transition-colors pb-2">Cancelled</button>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-highlight/5">
                                        {orders.map((order) => (
                                            <div key={order.id} className="p-8 hover:bg-cream/20 transition-all flex flex-col md:flex-row md:items-center gap-8">
                                                <img src={order.image} className="w-24 h-24 rounded-3xl object-cover" alt="" />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h4 className="text-lg font-bold text-primary">{order.product}</h4>
                                                            <p className="text-xs text-text-soft uppercase tracking-widest font-medium">Order #{order.id}</p>
                                                        </div>
                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-6 mt-6">
                                                        <div className="flex items-center gap-2 text-text-soft italic text-xs">
                                                            <Truck className="w-4 h-4" />
                                                            Estimated Delivery: Mar 12
                                                        </div>
                                                        <div className="h-1 w-1 rounded-full bg-highlight/30" />
                                                        <div className="text-xs font-bold text-primary uppercase tracking-widest">₹{order.amount.toLocaleString()}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <button className="btn-primary !py-3 !px-8 text-[10px]">Track Order</button>
                                                    <button className="btn-secondary !py-3 !px-8 text-[10px]">Need Help?</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'wishlist' && (
                            <motion.div
                                key="wishlist"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {wishlist.map((item) => (
                                    <div key={item.id} className="bg-white rounded-[32px] p-4 border border-highlight/10 shadow-sm group">
                                        <div className="relative aspect-square rounded-[24px] overflow-hidden mb-6">
                                            <img src={item.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                                            <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-lg">
                                                <Heart className="w-4 h-4 fill-current" />
                                            </button>
                                        </div>
                                        <div className="px-2 pb-2">
                                            <h4 className="text-lg font-bold text-primary mb-1">{item.name}</h4>
                                            <p className="text-accent font-bold mb-6">₹{item.price.toLocaleString()}</p>
                                            <button className="w-full btn-primary !py-4 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                                                <ShoppingBag className="w-4 h-4" /> Move to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};
