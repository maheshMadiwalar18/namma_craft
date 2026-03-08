import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../ToastContext';
import { useAuth } from '../AuthContext';
import {
  Plus,
  Package,
  DollarSign,
  Eye,
  MessageSquare,
  Settings,
  MoreVertical,
  Edit3,
  Trash2,
  ChevronRight,
  LayoutDashboard,
  Gavel,
  ShoppingBag,
  TrendingUp,
  Bell,
  User,
  Search,
  ChevronDown,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Image as ImageIcon,
  Tag,
  MapPin,
  Trash
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  getProductsByArtisan,
  addProduct,
  updateProduct,
  deleteProduct,
  getOrdersBySeller
} from '../db';

const StatCard = ({ title, value, change, icon: Icon, trend, label }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-3xl border border-highlight/10 shadow-sm relative overflow-hidden group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-accent/5 rounded-xl text-accent">
        <Icon className="w-5 h-5" />
      </div>
      {change && (
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      )}
    </div>
    <h3 className="text-text-soft text-[10px] font-bold uppercase tracking-widest mb-1">{title}</h3>
    <p className="text-2xl font-display font-bold text-primary">{value}</p>
    {label && <p className="text-[10px] text-text-soft/60 mt-1 uppercase tracking-widest">{label}</p>}
  </motion.div>
);

export const CreatorDashboard = ({ onNavigate }: any) => {
  const { showToast } = useToast();
  const { user, userProfile, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sellerProducts, setSellerProducts] = useState<any[]>([]);
  const [sellerOrders, setSellerOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'Pottery',
    stock: '1',
    region: userProfile?.state || '',
    rarity: 'Common'
  });

  useEffect(() => {
    if (userProfile?.firebaseUid) {
      fetchDashboardData();
    }
  }, [userProfile]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [products, orders] = await Promise.all([
        getProductsByArtisan(userProfile.firebaseUid),
        getOrdersBySeller(userProfile.firebaseUid)
      ]);
      setSellerProducts(products);
      setSellerOrders(orders);
    } catch (error) {
      showToast('Error loading dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, { ...formData, price: Number(formData.price), stock: Number(formData.stock) });
        showToast('Product updated successfully!');
      } else {
        await addProduct({ ...formData, price: Number(formData.price), stock: Number(formData.stock) });
        showToast('Product added successfully!');
      }
      setIsAddingProduct(false);
      setEditingProduct(null);
      resetForm();
      fetchDashboardData();
    } catch (error) {
      showToast('Error saving product', 'error');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        showToast('Product deleted');
        fetchDashboardData();
      } catch (error) {
        showToast('Error deleting product', 'error');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      image: '',
      category: 'Pottery',
      stock: '1',
      region: userProfile?.state || '',
      rarity: 'Common'
    });
  };

  const calculateEarnings = () => {
    return sellerOrders.reduce((total, order) => {
      const sellerItems = order.items.filter((item: any) => item.sellerId === userProfile.firebaseUid);
      const orderTotal = sellerItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      return total + orderTotal;
    }, 0);
  };

  if (loading && activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'profile', label: 'Profile', icon: Settings },
  ];

  return (
    <div className="bg-cream min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-cream hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary">
              <Package className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">Artisan Studio</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === item.id
                  ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/20'
                  : 'text-cream/60 hover:bg-white/5 hover:text-cream'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/10">
          <button
            onClick={() => { logout(); onNavigate('home'); }}
            className="flex items-center gap-4 text-cream/60 hover:text-rose-400 transition-colors w-full px-6 py-2"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-24 bg-white border-b border-highlight/10 flex items-center justify-between px-10 sticky top-0 z-30 shadow-sm">
          <h2 className="text-2xl font-display font-bold text-primary uppercase tracking-tight">
            {sidebarItems.find(i => i.id === activeTab)?.label}
          </h2>

          <div className="flex items-center gap-6">
            <button
              onClick={() => { setIsAddingProduct(true); setEditingProduct(null); resetForm(); setActiveTab('products'); }}
              className="btn-primary !py-2.5 !px-6 text-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> List New Craft
            </button>
            <div className="h-8 w-[1px] bg-highlight/10" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-primary">{userProfile?.displayName}</p>
                <p className="text-[10px] text-text-soft uppercase tracking-widest">Master Artisan</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard title="Total Revenue" value={`₹${calculateEarnings()}`} change="+12%" icon={DollarSign} trend="up" />
                  <StatCard title="Active Listings" value={sellerProducts.length} icon={Package} label="Crafts currently live" />
                  <StatCard title="Total Orders" value={sellerOrders.length} icon={ShoppingBag} label="Orders received" />
                  <StatCard title="Profile Views" value="842" change="+18%" icon={Eye} trend="up" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-[40px] border border-highlight/10 shadow-sm">
                    <h3 className="text-xl font-display font-bold text-primary mb-6">Sales Performance</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { name: 'Mon', sales: 4000 },
                          { name: 'Tue', sales: 3000 },
                          { name: 'Wed', sales: 2000 },
                          { name: 'Thu', sales: 2780 },
                          { name: 'Fri', sales: 1890 },
                          { name: 'Sat', sales: 2390 },
                          { name: 'Sun', sales: 3490 },
                        ]}>
                          <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#E67E22" stopOpacity={0.1} />
                              <stop offset="95%" stopColor="#E67E22" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Area type="monotone" dataKey="sales" stroke="#E67E22" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-primary p-10 rounded-[40px] text-cream relative overflow-hidden">
                    <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
                    <div className="relative z-10 h-full flex flex-col">
                      <h3 className="text-2xl font-display font-bold mb-6">Recent Sales Activity</h3>
                      <div className="space-y-6 flex-1">
                        {sellerOrders.slice(0, 3).map((order) => (
                          <div key={order._id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                            <div>
                              <p className="font-bold">{order.buyerName}</p>
                              <p className="text-[10px] text-cream/40 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-accent">₹{order.totalPrice}</p>
                              <p className="text-[10px] text-cream/40 uppercase tracking-widest">{order.status}</p>
                            </div>
                          </div>
                        ))}
                        {sellerOrders.length === 0 && <p className="text-cream/40 italic">No orders yet. Keep crafting!</p>}
                      </div>
                      <button onClick={() => setActiveTab('orders')} className="mt-8 text-xs font-bold text-accent uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all">
                        View All Orders <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {isAddingProduct ? (
                  <div className="bg-white p-10 rounded-[40px] border border-highlight/10 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="text-2xl font-display font-bold text-primary">
                        {editingProduct ? 'Edit Your Masterpiece' : 'List New Creation'}
                      </h3>
                      <button onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }} className="text-xs font-bold text-text-soft hover:text-rose-500 uppercase tracking-widest transition-colors">Cancel</button>
                    </div>

                    <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Product Name</label>
                        <input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent outline-none font-medium"
                          placeholder="e.g. Hand-Painted Blue Pottery Vase"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Price (₹)</label>
                        <input
                          required
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent outline-none font-medium"
                          placeholder="2450"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Description of Craft & Heritage</label>
                        <textarea
                          required
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                          className="w-full p-6 bg-cream/30 rounded-[32px] border-2 border-transparent focus:border-accent outline-none font-medium resize-none"
                          placeholder="Tell the story of how this piece was created..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Image URL</label>
                        <input
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent outline-none font-medium"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent outline-none font-medium appearance-none"
                        >
                          <option>Pottery</option>
                          <option>Textiles</option>
                          <option>Woodwork</option>
                          <option>Jewelry</option>
                          <option>Paintings</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Stock Availability</label>
                        <input
                          type="number"
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                          className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent outline-none font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Rarity Level</label>
                        <select
                          value={formData.rarity}
                          onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
                          className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent outline-none font-medium appearance-none"
                        >
                          <option>Common</option>
                          <option>Rare</option>
                          <option>Limited Edition</option>
                          <option>One-of-a-kind</option>
                        </select>
                      </div>

                      <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                        <button type="button" onClick={() => setIsAddingProduct(false)} className="px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-text-soft hover:bg-cream transition-all">Discard</button>
                        <button type="submit" className="btn-primary !px-12 !py-4 text-xs">
                          {editingProduct ? 'Update Masterpiece' : 'Publish Product'}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-white rounded-[40px] border border-highlight/10 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-highlight/10 flex justify-between items-center">
                      <h3 className="text-xl font-display font-bold text-primary">Your Collection</h3>
                      <div className="flex gap-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
                          <input placeholder="Search products..." className="pl-10 pr-4 py-2 bg-cream/50 rounded-xl text-xs outline-none focus:bg-white transition-all w-48" />
                        </div>
                        <button className="p-2 bg-cream/50 rounded-xl hover:bg-white transition-all">
                          <Search className="w-4 h-4 text-text-soft" />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-cream/20">
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Product</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Category</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Price</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Stock</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Status</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-highlight/5">
                          {sellerProducts.map((prod) => (
                            <tr key={prod._id} className="hover:bg-cream/10 transition-colors group">
                              <td className="px-8 py-5">
                                <div className="flex items-center gap-4">
                                  <img src={prod.image || 'https://via.placeholder.com/100'} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                  <div>
                                    <p className="font-bold text-primary text-sm truncate max-w-[200px]">{prod.name}</p>
                                    <p className="text-[10px] text-text-soft uppercase tracking-widest">{prod.rarity}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-5">
                                <span className="text-xs font-medium text-text-soft">{prod.category}</span>
                              </td>
                              <td className="px-8 py-5">
                                <span className="text-sm font-bold text-primary">₹{prod.price.toLocaleString()}</span>
                              </td>
                              <td className="px-8 py-5">
                                <span className={`text-xs font-bold ${prod.stock < 5 ? 'text-rose-500' : 'text-primary'}`}>{prod.stock}</span>
                              </td>
                              <td className="px-8 py-5">
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-bold uppercase tracking-widest">Active</span>
                              </td>
                              <td className="px-8 py-5 text-right">
                                <div className="flex justify-end gap-3">
                                  <button
                                    onClick={() => {
                                      setEditingProduct(prod);
                                      setFormData({
                                        name: prod.name,
                                        price: prod.price.toString(),
                                        description: prod.description,
                                        image: prod.image,
                                        category: prod.category,
                                        stock: prod.stock.toString(),
                                        region: prod.region,
                                        rarity: prod.rarity
                                      });
                                      setIsAddingProduct(true);
                                    }}
                                    className="p-2 hover:bg-accent hover:text-white rounded-lg transition-all text-text-soft"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(prod._id)}
                                    className="p-2 hover:bg-rose-500 hover:text-white rounded-lg transition-all text-text-soft"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {sellerProducts.length === 0 && (
                            <tr>
                              <td colSpan={6} className="px-8 py-20 text-center">
                                <div className="flex flex-col items-center gap-4 text-text-soft">
                                  <Package className="w-12 h-12 opacity-20" />
                                  <p className="font-display text-lg uppercase tracking-widest">No products listed yet</p>
                                  <button onClick={() => setIsAddingProduct(true)} className="btn-secondary !py-2 !px-6 text-xs mt-2">Create First Listing</button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[40px] border border-highlight/10 shadow-sm overflow-hidden"
              >
                <div className="p-8 border-b border-highlight/10 flex justify-between items-center">
                  <h3 className="text-xl font-display font-bold text-primary">Incoming Orders</h3>
                  <div className="flex gap-4">
                    <button className="text-xs font-bold text-primary border-b-2 border-accent pb-1">All Orders</button>
                    <button className="text-xs font-bold text-text-soft hover:text-primary transition-colors pb-1">Pending</button>
                    <button className="text-xs font-bold text-text-soft hover:text-primary transition-colors pb-1">Shipped</button>
                  </div>
                </div>

                <div className="divide-y divide-highlight/5">
                  {sellerOrders.map((order) => (
                    <div key={order._id} className="p-8 hover:bg-cream/10 transition-all">
                      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                        <div className="flex items-start gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-primary font-bold shadow-sm border border-highlight/5">
                            {order.buyerName.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-primary text-lg">{order.buyerName}</h4>
                            <p className="text-xs text-text-soft uppercase tracking-widest font-medium">Order #{order._id.substring(0, 8)} • {new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-left md:text-right">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' :
                              order.status === 'pending' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                            {order.status}
                          </span>
                          <p className="mt-3 text-2xl font-display font-bold text-primary">₹{order.totalPrice.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="bg-cream/30 rounded-[32px] p-6 border border-highlight/5 mb-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-soft mb-4 flex items-center gap-2">
                          <ShoppingBag className="w-3 h-3" /> Ordered Crafts
                        </p>
                        <div className="space-y-4">
                          {order.items.filter((item: any) => item.sellerId === userProfile.firebaseUid).map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-4">
                              <img src={item.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                              <div className="flex-1">
                                <p className="text-sm font-bold text-primary">{item.name}</p>
                                <p className="text-xs text-text-soft">Qty: {item.quantity} × ₹{item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <button className="btn-primary !py-3 !px-8 text-[10px] uppercase tracking-widest">Update Status</button>
                        <button className="btn-secondary !py-3 !px-8 text-[10px] uppercase tracking-widest">Contact Buyer</button>
                        <button className="ml-auto p-3 hover:bg-rose-50 text-text-soft hover:text-rose-500 rounded-xl transition-all">
                          <AlertCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {sellerOrders.length === 0 && (
                    <div className="p-20 text-center">
                      <ShoppingBag className="w-12 h-12 text-text-soft/20 mx-auto mb-4" />
                      <p className="text-text-soft font-display uppercase tracking-widest">No orders received yet</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-4xl"
              >
                <div className="bg-white rounded-[40px] p-10 border border-highlight/10 shadow-sm">
                  <div className="flex justify-between items-start mb-12">
                    <div className="flex items-center gap-8">
                      <img
                        src={user?.photoURL || 'https://ui-avatars.com/api/?name=' + userProfile?.displayName}
                        className="w-32 h-32 rounded-[40px] object-cover border-4 border-cream shadow-xl"
                        alt=""
                      />
                      <div>
                        <h3 className="text-3xl font-display font-bold text-primary mb-1">{userProfile?.displayName}</h3>
                        <p className="text-text-soft flex items-center gap-2 mb-4">
                          <MapPin className="w-4 h-4 text-accent" /> Master Artisan from {userProfile?.state || 'India'}
                        </p>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest border border-accent/20">Certified Creator</span>
                          <span className="px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest border border-highlight/10">18 sales completed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Full Name</label>
                      <input
                        defaultValue={userProfile?.displayName}
                        className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">State/Region</label>
                      <input
                        defaultValue={userProfile?.state}
                        className="w-full px-6 py-4 bg-cream/30 rounded-2xl border-2 border-transparent focus:border-accent outline-none font-medium"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-soft ml-4">Artisan Story (Bio)</label>
                      <textarea
                        defaultValue={userProfile?.bio}
                        rows={4}
                        className="w-full p-6 bg-cream/30 rounded-[32px] border-2 border-transparent focus:border-accent outline-none font-medium resize-none"
                        placeholder="Share your heritage and the techniques you use..."
                      />
                    </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                    <button
                      onClick={() => showToast('Profile updated (demo only)', 'info')}
                      className="btn-primary !px-12 !py-4 text-xs"
                    >
                      Update Studio Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'earnings' && (
              <motion.div
                key="earnings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard title="Available Balance" value={`₹${calculateEarnings()}`} icon={Wallet} color="bg-emerald-50" />
                  <StatCard title="Withdrawals" value="₹2,400" icon={ArrowDownRight} color="bg-rose-50" />
                  <StatCard title="Next Payout" value="Mar 15" icon={Clock} color="bg-blue-50" />
                </div>

                <div className="bg-white p-10 rounded-[40px] border border-highlight/10 shadow-sm">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-display font-bold text-primary">Transaction History</h3>
                    <button className="text-xs font-bold text-accent uppercase tracking-widest">Download Statement</button>
                  </div>
                  <div className="space-y-6">
                    {sellerOrders.map((order) => (
                      <div key={order._id} className="flex items-center justify-between py-6 border-b border-highlight/5 last:border-0 hover:px-4 transition-all hover:bg-cream/10 rounded-2xl">
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <TrendingUp className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-primary">Sale: {order.items[0].name}</p>
                            <p className="text-[10px] text-text-soft uppercase tracking-widest">Order Receipt #{order._id.substring(0, 8)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-emerald-600">+₹{order.totalPrice.toLocaleString()}</p>
                          <p className="text-[10px] text-text-soft uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                    {sellerOrders.length === 0 && <p className="text-center py-10 text-text-soft italic">No transactions recorded yet.</p>}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
