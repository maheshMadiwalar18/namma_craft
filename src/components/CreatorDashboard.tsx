import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  AlertCircle
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
  Area,
  LineChart,
  Line
} from 'recharts';

const salesData = [
  { day: 'Mon', bids: 12, revenue: 1200 },
  { day: 'Tue', bids: 21, revenue: 2100 },
  { day: 'Wed', bids: 8, revenue: 800 },
  { day: 'Thu', bids: 16, revenue: 1600 },
  { day: 'Fri', bids: 24, revenue: 2400 },
  { day: 'Sat', bids: 32, revenue: 3200 },
  { day: 'Sun', bids: 28, revenue: 2800 },
];

const products = [
  { id: 1, name: 'Hand-Painted Blue Pottery Vase', price: 2450, stock: 12, sales: 45, status: 'Active', image: 'https://picsum.photos/seed/jaipur-pottery/100/100' },
  { id: 2, name: 'Cobalt Blue Ceramic Bowl', price: 1250, stock: 8, sales: 28, status: 'Active', image: 'https://picsum.photos/seed/blue-bowl/100/100' },
];

const activeAuctions = [
  { id: 1, name: 'Antique Dhokra Chariot', currentBid: 28500, bidders: 14, timeLeft: '00:45:12', status: 'Active', image: 'https://picsum.photos/seed/dhokra-1/100/100' },
  { id: 2, name: 'Hand-Woven Pashmina Shawl', currentBid: 42000, bidders: 8, timeLeft: '02:15:30', status: 'Ending Soon', image: 'https://picsum.photos/seed/pashmina-1/100/100' },
];

const completedAuctions = [
  { id: 3, name: 'Terracotta Horse Figurine', winningBid: 12500, winner: 'Rahul M.', date: 'Feb 20, 2024', status: 'Pending Shipping', image: 'https://picsum.photos/seed/horse/100/100' },
  { id: 4, name: 'Blue Pottery Platter', winningBid: 4800, winner: 'Sita R.', date: 'Feb 18, 2024', status: 'Shipped', image: 'https://picsum.photos/seed/pottery/100/100' },
];

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
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'auctions', label: 'My Auctions', icon: Gavel },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'earnings', label: 'Earnings', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-cream min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-cream hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">Artisan Studio</span>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-accent text-primary font-bold' : 'text-cream/60 hover:bg-white/5 hover:text-cream'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Ananya Sharma</p>
              <p className="text-[10px] text-cream/40 uppercase tracking-widest">Master Artisan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-24 bg-white border-b border-highlight/10 flex items-center justify-between px-10 sticky top-0 z-30 shadow-sm">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
            <input 
              type="text" 
              placeholder="Search products, auctions..."
              className="w-full pl-12 pr-6 py-3 bg-cream/30 rounded-xl text-sm border-transparent focus:border-accent focus:bg-white transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-3 hover:bg-cream/50 rounded-xl transition-all group">
              <Bell className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-highlight/10" />
            <button 
              onClick={() => onNavigate('add-food')}
              className="btn-secondary !py-2.5 !px-6 text-[10px] uppercase tracking-widest shadow-lg shadow-primary/5"
            >
              Add Food Item
            </button>
            <button 
              onClick={() => onNavigate('create-auction')}
              className="btn-primary !py-2.5 !px-6 text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20"
            >
              Start Auction
            </button>
          </div>
        </header>

        <div className="p-10">
          <div className="mb-10">
            <h1 className="text-4xl font-display font-bold text-primary mb-2">Artisan Dashboard</h1>
            <p className="text-text-soft">Manage your heritage crafts and track auction performance.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard title="Active Auctions" value="12" change="+2" icon={Gavel} trend="up" label="Current Listings" />
            <StatCard title="Total Bids" value="1,240" change="+18%" icon={TrendingUp} trend="up" label="Received Today" />
            <StatCard title="Earnings (Feb)" value="₹45,200" change="+12.5%" icon={Wallet} trend="up" label="Monthly Revenue" />
            <StatCard title="Auctions Won" value="8" change="+3" icon={CheckCircle2} trend="up" label="Pending Checkout" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
            {/* Active Auctions Section */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-[32px] border border-highlight/10 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-highlight/10 flex justify-between items-center">
                  <h3 className="text-xl font-display font-bold text-primary">Active Auctions</h3>
                  <button className="text-accent text-xs font-bold uppercase tracking-widest hover:tracking-[0.2em] transition-all">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-cream/20">
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Product</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Highest Bid</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Bidders</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Time Left</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Status</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-highlight/5">
                      {activeAuctions.map((auc) => (
                        <tr key={auc.id} className="hover:bg-cream/10 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <img src={auc.image} alt={auc.name} className="w-12 h-12 rounded-xl object-cover" />
                              <p className="font-bold text-primary text-sm">{auc.name}</p>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <p className="text-sm font-bold text-primary">₹{auc.currentBid.toLocaleString()}</p>
                          </td>
                          <td className="px-8 py-5">
                            <p className="text-sm text-text-soft">{auc.bidders} Bidders</p>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2 text-text-soft">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="text-xs font-mono">{auc.timeLeft}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                              auc.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                              <div className={`w-1 h-1 rounded-full ${auc.status === 'Active' ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                              {auc.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <button className="p-2 hover:bg-primary hover:text-white rounded-lg transition-all text-text-soft">
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Completed Auctions Section */}
              <div className="bg-white rounded-[32px] border border-highlight/10 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-highlight/10 flex justify-between items-center">
                  <h3 className="text-xl font-display font-bold text-primary">Completed Auctions</h3>
                  <button className="text-accent text-xs font-bold uppercase tracking-widest hover:tracking-[0.2em] transition-all">History</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-cream/20">
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Product</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Winning Bid</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Winner</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Date</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Status</th>
                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-highlight/5">
                      {completedAuctions.map((auc) => (
                        <tr key={auc.id} className="hover:bg-cream/10 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <img src={auc.image} alt={auc.name} className="w-12 h-12 rounded-xl object-cover" />
                              <p className="font-bold text-primary text-sm">{auc.name}</p>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <p className="text-sm font-bold text-primary">₹{auc.winningBid.toLocaleString()}</p>
                          </td>
                          <td className="px-8 py-5">
                            <p className="text-sm text-text-soft">{auc.winner}</p>
                          </td>
                          <td className="px-8 py-5">
                            <p className="text-xs text-text-soft font-mono">{auc.date}</p>
                          </td>
                          <td className="px-8 py-5">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                              auc.status === 'Shipped' ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/5 text-primary'
                            }`}>
                              {auc.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            {auc.status === 'Pending Shipping' ? (
                              <button className="btn-primary !py-1.5 !px-4 text-[9px] uppercase tracking-widest">
                                Ship Now
                              </button>
                            ) : (
                              <button className="text-text-soft hover:text-primary transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bid Insights Panel */}
              <div className="bg-white p-8 rounded-[32px] border border-highlight/10 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-xl font-display font-bold text-primary">Bid Insights</h3>
                    <p className="text-text-soft text-xs mt-1">Bidding activity over the last 7 days</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text-soft">Bids</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text-soft">Revenue</span>
                    </div>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorBidsCreator" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E67E22" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#E67E22" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                      <Tooltip />
                      <Area type="monotone" dataKey="bids" stroke="#E67E22" strokeWidth={3} fillOpacity={1} fill="url(#colorBidsCreator)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Sidebar Content: Notifications & Earnings */}
            <div className="lg:col-span-4 space-y-8">
              {/* Notifications */}
              <div className="bg-white p-8 rounded-[32px] border border-highlight/10 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-display font-bold text-primary">Notifications</h3>
                  <span className="w-5 h-5 bg-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full">3</span>
                </div>
                <div className="space-y-6">
                  {[
                    { title: "New highest bid placed", desc: "₹28,500 on Antique Dhokra Chariot", time: "2m ago", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
                    { title: "Auction ending soon", desc: "Pashmina Silk Shawl ends in 1 hour", time: "45m ago", icon: Clock, color: "text-amber-600 bg-amber-50" },
                    { title: "Auction won", desc: "Proceed to shipping for Order #842", time: "2h ago", icon: CheckCircle2, color: "text-primary bg-primary/5" },
                  ].map((note, i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${note.color}`}>
                        <note.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 border-b border-highlight/5 pb-4 group-last:border-0">
                        <h4 className="text-sm font-bold text-primary mb-1">{note.title}</h4>
                        <p className="text-xs text-text-soft mb-1">{note.desc}</p>
                        <span className="text-[10px] text-text-soft/40 uppercase tracking-widest">{note.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earnings Section */}
              <div className="bg-primary p-8 rounded-[40px] text-cream relative overflow-hidden">
                <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Wallet className="w-6 h-6 text-accent" />
                    <h3 className="text-lg font-display font-bold">Earnings Overview</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-cream/60 text-[10px] uppercase tracking-widest font-bold mb-1">Total Revenue</p>
                      <p className="text-4xl font-display font-bold">₹1,24,500</p>
                    </div>
                    <div className="h-[1px] bg-white/10" />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-cream/60 text-[10px] uppercase tracking-widest font-bold mb-1">Pending Payout</p>
                        <p className="text-xl font-display font-bold text-accent">₹12,400</p>
                      </div>
                      <button className="btn-accent !py-2 !px-4 text-[10px] uppercase tracking-widest">Withdraw</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Payments */}
              <div className="bg-white p-8 rounded-[32px] border border-highlight/10 shadow-sm">
                <h3 className="text-lg font-display font-bold text-primary mb-6">Recent Payments</h3>
                <div className="space-y-4">
                  {[
                    { id: '#PAY-901', amount: '₹18,200', date: 'Feb 20', status: 'Paid' },
                    { id: '#PAY-898', amount: '₹12,500', date: 'Feb 18', status: 'Paid' },
                  ].map((pay, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-cream/20 rounded-xl">
                      <div>
                        <p className="text-xs font-bold text-primary">{pay.id}</p>
                        <p className="text-[10px] text-text-soft uppercase tracking-widest">{pay.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">{pay.amount}</p>
                        <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">{pay.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-accent/5 p-8 rounded-[32px] border border-accent/10">
                <div className="flex items-center gap-3 text-accent mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <h4 className="font-display font-bold">Seller Tip</h4>
                </div>
                <p className="text-sm text-primary/70 leading-relaxed italic">
                  "Items with 'Ending Soon' status see a 60% spike in bid activity. Ensure your product descriptions are detailed to convert these last-minute bidders!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
