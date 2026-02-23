import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  LayoutDashboard,
  Gavel,
  Palette,
  Settings,
  BarChart3,
  Bell,
  User,
  ChevronDown,
  MoreVertical,
  Pause,
  Play,
  XCircle,
  Eye,
  ShieldAlert,
  History,
  MapPin,
  ChevronLeft
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

const data = [
  { name: 'Mon', bids: 400, revenue: 2400 },
  { name: 'Tue', bids: 300, revenue: 1398 },
  { name: 'Wed', bids: 200, revenue: 9800 },
  { name: 'Thu', bids: 278, revenue: 3908 },
  { name: 'Fri', bids: 189, revenue: 4800 },
  { name: 'Sat', bids: 239, revenue: 3800 },
  { name: 'Sun', bids: 349, revenue: 4300 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-3xl border border-highlight/10 shadow-sm relative overflow-hidden group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-accent/5 rounded-xl text-accent">
        <Icon className="w-5 h-5" />
      </div>
      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <h3 className="text-text-soft text-[10px] font-bold uppercase tracking-widest mb-1">{title}</h3>
    <p className="text-2xl font-display font-bold text-primary">{value}</p>
  </motion.div>
);

export const AdminDashboard = ({ onNavigate }: any) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAuction, setSelectedAuction] = useState<any>(null);

  const auctions = [
    { id: 'AUC-101', name: 'Antique Dhokra Chariot', artisan: 'Suresh Murmu', currentBid: 28500, startPrice: 15000, timeLeft: '00:45:12', status: 'Active', image: 'https://picsum.photos/seed/dhokra-1/100/100' },
    { id: 'AUC-102', name: 'Pashmina Silk Shawl', artisan: 'Zahoor Ahmed', currentBid: 42000, startPrice: 30000, timeLeft: '02:15:30', status: 'Active', image: 'https://picsum.photos/seed/pashmina-1/100/100' },
    { id: 'AUC-103', name: 'Marble Inlay Box', artisan: 'Irfan Khan', currentBid: 12500, startPrice: 8000, timeLeft: '00:00:00', status: 'Completed', image: 'https://picsum.photos/seed/marble-1/100/100' },
    { id: 'AUC-104', name: 'Tanjore Painting', artisan: 'R. Meenakshi', currentBid: 55000, startPrice: 40000, timeLeft: '05:20:45', status: 'Flagged', image: 'https://picsum.photos/seed/tanjore-1/100/100' },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'auctions', label: 'Auctions', icon: Gavel },
    { id: 'artisans', label: 'Artisans', icon: Palette },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-cream min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-cream hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">Admin Hub</span>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSelectedAuction(null);
              }}
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
              <p className="text-sm font-bold">Vikram Singh</p>
              <p className="text-[10px] text-cream/40 uppercase tracking-widest">Super Admin</p>
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
              placeholder="Search auctions, artisans, or bids..."
              className="w-full pl-12 pr-6 py-3 bg-cream/30 rounded-xl text-sm border-transparent focus:border-accent focus:bg-white transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-3 hover:bg-cream/50 rounded-xl transition-all group">
              <Bell className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-highlight/10" />
            <button className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-primary font-bold border border-highlight/10 group-hover:border-accent transition-colors">
                VS
              </div>
              <ChevronDown className="w-4 h-4 text-text-soft group-hover:text-accent transition-colors" />
            </button>
          </div>
        </header>

        <div className="p-10">
          <AnimatePresence mode="wait">
            {!selectedAuction ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {activeTab === 'dashboard' && (
                  <>
                    <div className="mb-10">
                      <h1 className="text-4xl font-display font-bold text-primary mb-2">Platform Overview</h1>
                      <p className="text-text-soft">Real-time monitoring of heritage auctions and artisan growth.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                      <StatCard title="Active Auctions" value="42" change="+12%" icon={Gavel} trend="up" />
                      <StatCard title="Ending Soon" value="8" change="-2" icon={Clock} trend="down" />
                      <StatCard title="Total Bids Today" value="1,240" change="+18%" icon={TrendingUp} trend="up" />
                      <StatCard title="Auction Revenue" value="₹8.4L" change="+24%" icon={ShoppingBag} trend="up" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                      <div className="bg-white p-8 rounded-[32px] border border-highlight/10 shadow-sm">
                        <h3 className="text-xl font-display font-bold text-primary mb-6">Bidding Trends</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                              <defs>
                                <linearGradient id="colorBids" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#E67E22" stopOpacity={0.1}/>
                                  <stop offset="95%" stopColor="#E67E22" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                              <Tooltip />
                              <Area type="monotone" dataKey="bids" stroke="#E67E22" strokeWidth={3} fillOpacity={1} fill="url(#colorBids)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="bg-white p-8 rounded-[32px] border border-highlight/10 shadow-sm">
                        <h3 className="text-xl font-display font-bold text-primary mb-6">Revenue Growth</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                              <Tooltip />
                              <Bar dataKey="revenue" fill="#6B1D1D" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="bg-white rounded-[32px] border border-highlight/10 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-highlight/10 flex justify-between items-center">
                    <h3 className="text-xl font-display font-bold text-primary">Auction Management</h3>
                    <div className="flex gap-3">
                      <button className="btn-secondary !py-2 !px-4 text-xs">Export CSV</button>
                      <button 
                        onClick={() => onNavigate('create-auction')}
                        className="btn-primary !py-2 !px-6 text-xs"
                      >
                        Create Auction
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-cream/20">
                          <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Product</th>
                          <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Artisan</th>
                          <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Current Bid</th>
                          <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Time Left</th>
                          <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60">Status</th>
                          <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text-soft/60 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-highlight/5">
                        {auctions.map((auc) => (
                          <tr key={auc.id} className="hover:bg-cream/10 transition-colors group">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <img src={auc.image} alt={auc.name} className="w-12 h-12 rounded-xl object-cover" />
                                <div>
                                  <p className="font-bold text-primary text-sm">{auc.name}</p>
                                  <p className="text-[10px] text-text-soft uppercase tracking-widest">{auc.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <p className="text-sm text-primary font-medium">{auc.artisan}</p>
                            </td>
                            <td className="px-8 py-5">
                              <p className="text-sm font-bold text-primary">₹{auc.currentBid.toLocaleString()}</p>
                              <p className="text-[10px] text-text-soft">Start: ₹{auc.startPrice.toLocaleString()}</p>
                            </td>
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-2 text-text-soft">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="text-xs font-mono">{auc.timeLeft}</span>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                                auc.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                                auc.status === 'Flagged' ? 'bg-rose-50 text-rose-600' :
                                'bg-slate-50 text-slate-600'
                              }`}>
                                <div className={`w-1 h-1 rounded-full ${
                                  auc.status === 'Active' ? 'bg-emerald-600' :
                                  auc.status === 'Flagged' ? 'bg-rose-600' :
                                  'bg-slate-600'
                                }`} />
                                {auc.status}
                              </span>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <div className="flex justify-end gap-2">
                                <button 
                                  onClick={() => setSelectedAuction(auc)}
                                  className="p-2 hover:bg-primary hover:text-white rounded-lg transition-all text-text-soft"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                {auc.status === 'Active' && (
                                  <>
                                    <button className="p-2 hover:bg-amber-500 hover:text-white rounded-lg transition-all text-text-soft">
                                      <Pause className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 hover:bg-emerald-500 hover:text-white rounded-lg transition-all text-text-soft">
                                      <CheckCircle2 className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                                <button className="p-2 hover:bg-rose-500 hover:text-white rounded-lg transition-all text-text-soft">
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <button 
                  onClick={() => setSelectedAuction(null)}
                  className="flex items-center gap-2 text-text-soft hover:text-primary transition-all group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">Back to Auctions</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white p-10 rounded-[40px] border border-highlight/10 shadow-sm">
                      <div className="flex justify-between items-start mb-10">
                        <div className="flex gap-6">
                          <img src={selectedAuction.image} alt="" className="w-32 h-32 rounded-3xl object-cover shadow-lg" />
                          <div>
                            <h2 className="text-3xl font-display font-bold text-primary mb-2">{selectedAuction.name}</h2>
                            <div className="flex items-center gap-4 text-text-soft text-sm">
                              <span className="flex items-center gap-1"><Palette className="w-4 h-4" /> {selectedAuction.artisan}</span>
                              <span className="h-4 w-[1px] bg-highlight/20" />
                              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Bastar, Chhattisgarh</span>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <span className="badge-indian !bg-emerald-50 !text-emerald-600 !border-emerald-100">Verified Artisan</span>
                              <span className="badge-indian !bg-accent/10 !text-accent !border-accent/20">Traditional Craft</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-text-soft uppercase tracking-widest font-bold mb-1">Current Bid</p>
                          <p className="text-4xl font-display font-bold text-primary">₹{selectedAuction.currentBid.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6 mb-10">
                        <div className="p-6 bg-cream/30 rounded-2xl border border-highlight/5">
                          <p className="text-[10px] text-text-soft uppercase tracking-widest font-bold mb-2">Total Bids</p>
                          <p className="text-2xl font-display font-bold text-primary">24</p>
                        </div>
                        <div className="p-6 bg-cream/30 rounded-2xl border border-highlight/5">
                          <p className="text-[10px] text-text-soft uppercase tracking-widest font-bold mb-2">Watchers</p>
                          <p className="text-2xl font-display font-bold text-primary">156</p>
                        </div>
                        <div className="p-6 bg-cream/30 rounded-2xl border border-highlight/5">
                          <p className="text-[10px] text-text-soft uppercase tracking-widest font-bold mb-2">Time Remaining</p>
                          <p className="text-2xl font-display font-bold text-primary">{selectedAuction.timeLeft}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-lg font-display font-bold text-primary flex items-center gap-2">
                          <History className="w-5 h-5 text-accent" /> Bid History Timeline
                        </h4>
                        <div className="space-y-4">
                          {[
                            { user: 'RK', amount: 28500, time: '2 mins ago', status: 'Valid' },
                            { user: 'AS', amount: 27000, time: '5 mins ago', status: 'Valid' },
                            { user: 'PM', amount: 25500, time: '12 mins ago', status: 'Suspicious' },
                          ].map((bid, i) => (
                            <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${bid.status === 'Suspicious' ? 'bg-rose-50 border-rose-100' : 'bg-white border-highlight/5 shadow-sm'}`}>
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center font-bold text-primary">{bid.user}</div>
                                <div>
                                  <p className="font-bold text-primary">₹{bid.amount.toLocaleString()}</p>
                                  <p className="text-[10px] text-text-soft uppercase tracking-widest">{bid.time}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {bid.status === 'Suspicious' && (
                                  <span className="flex items-center gap-1 text-[9px] font-bold text-rose-600 uppercase tracking-widest">
                                    <AlertCircle className="w-3 h-3" /> Suspicious Pattern
                                  </span>
                                )}
                                <button className="text-text-soft hover:text-rose-600 transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white p-8 rounded-[40px] border border-highlight/10 shadow-sm">
                      <h4 className="text-lg font-display font-bold text-primary mb-6">Moderation Controls</h4>
                      <div className="space-y-4">
                        <button className="w-full btn-primary !py-4 flex items-center justify-center gap-3">
                          <CheckCircle2 className="w-5 h-5" /> Approve Auction
                        </button>
                        <button className="w-full btn-secondary !py-4 flex items-center justify-center gap-3">
                          <Pause className="w-5 h-5" /> Pause Auction
                        </button>
                        <button className="w-full py-4 rounded-2xl border-2 border-rose-100 text-rose-600 font-bold uppercase tracking-widest text-xs hover:bg-rose-50 transition-all flex items-center justify-center gap-3">
                          <XCircle className="w-5 h-5" /> Cancel Auction
                        </button>
                      </div>
                      <div className="mt-8 pt-8 border-t border-highlight/10">
                        <p className="text-[10px] text-text-soft uppercase tracking-widest font-bold mb-4">Quick Actions</p>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="p-3 bg-cream/50 rounded-xl text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-accent hover:text-white transition-all">Extend 1h</button>
                          <button className="p-3 bg-cream/50 rounded-xl text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-accent hover:text-white transition-all">Flag Bids</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-rose-50 p-8 rounded-[40px] border border-rose-100">
                      <div className="flex items-center gap-3 mb-4 text-rose-600">
                        <ShieldAlert className="w-6 h-6" />
                        <h4 className="font-display font-bold">Trust & Safety</h4>
                      </div>
                      <p className="text-sm text-rose-700/80 leading-relaxed mb-6">
                        Our AI has detected unusual bidding activity from 2 participants. Manual review is recommended before approval.
                      </p>
                      <button className="w-full py-3 bg-rose-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-rose-200">
                        Resolve Dispute
                      </button>
                    </div>
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
