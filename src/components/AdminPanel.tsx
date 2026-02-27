
import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  History, 
  Settings, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  X,
  Edit,
  Trash2,
  Layers,
  DollarSign,
  Tag,
  Zap
} from 'lucide-react';
import { Dataset, DigitalService } from '../types';
import { DATASETS } from '../constants';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Users' | 'Bundles' | 'Services' | 'Flash Sales' | 'Custom Bundles' | 'Transactions' | 'Settings'>('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Mock State Management
  const [apiKeys, setApiKeys] = useState({
    paystackPublic: '',
    paystackSecret: '',
    momoApi: '',
    smsGateway: '',
    isDemoMode: true
  });
  const [bundles, setBundles] = useState<Dataset[]>(DATASETS);
  const [customBundles, setCustomBundles] = useState<Dataset[]>([
    { id: 'cb1', title: 'VIP Special 50GB', category: 'MTN', price: 150, licensesRemaining: 10, totalLicenses: 10, description: 'Exclusive for VIP users', rarity: 'Exclusive', viewingCount: 100, hypeVelocity: [] },
  ]);
  const [services, setServices] = useState<DigitalService[]>([
    { id: 's1', title: 'Buy Checkers', description: 'WAEC, BECE, Placement', price: 15, category: 'Education', badge: 'Popular' },
    { id: 's2', title: 'Custom Flyers', description: 'Professional Design', price: 50, category: 'Design', badge: 'New' },
    { id: 's3', title: 'AFA Registration', description: 'Community Telco', price: 10, category: 'Telco', badge: 'AFA' },
  ]);

  const [users, setUsers] = useState([
    { id: 'u1', name: 'Alpher Leno', email: 'alpherleno@gmail.com', balance: 450.50, xp: 1250, status: 'Active', joinedDate: '2024-01-15' },
    { id: 'u2', name: 'John Doe', email: 'john@example.com', balance: 120.00, xp: 450, status: 'Active', joinedDate: '2024-02-10' },
    { id: 'u3', name: 'Sarah Smith', email: 'sarah@example.com', balance: 0.00, xp: 10, status: 'Inactive', joinedDate: '2024-03-05' },
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-9821', user: 'Alpher Leno', item: 'MTN 10GB', amount: 45, status: 'Pending', date: 'Oct 24, 2024' },
    { id: 'ORD-9822', user: 'John Doe', item: 'Telecel 5GB', amount: 25, status: 'Processing', date: 'Oct 24, 2024' },
    { id: 'ORD-9823', user: 'Sarah Smith', item: 'WAEC Checker', amount: 15, status: 'Completed', date: 'Oct 23, 2024' },
  ]);

  const [serviceToggles, setServiceToggles] = useState({
    waec: true,
    bece: true,
    placement: true
  });

  const [editingBundle, setEditingBundle] = useState<Dataset | null>(null);
  const [editingService, setEditingService] = useState<DigitalService | null>(null);
  const [isAddingBundle, setIsAddingBundle] = useState(false);
  const [isAddingService, setIsAddingService] = useState(false);
  const [selectedUserOrders, setSelectedUserOrders] = useState<any[] | null>(null);
  const [messagingUser, setMessagingUser] = useState<any | null>(null);
  const [customBundleUser, setCustomBundleUser] = useState<any | null>(null);

  if (!isOpen) return null;

  const stats = [
    { label: 'Total Revenue', value: 'GH₵ 124,500', trend: '+12%', icon: <TrendingUp size={20} />, color: 'text-emerald-600' },
    { label: 'Active Users', value: '12,840', trend: '+5%', icon: <Users size={20} />, color: 'text-blue-600' },
    { label: 'Orders Today', value: '458', trend: '+18%', icon: <Package size={20} />, color: 'text-[#004F71]' },
    { label: 'System Health', value: '99.9%', trend: 'Stable', icon: <ShieldAlert size={20} />, color: 'text-amber-600' },
  ];

  const menuItems = [
    { id: 'Overview', icon: <TrendingUp size={18} /> },
    { id: 'Users', icon: <Users size={18} /> },
    { id: 'Bundles', icon: <Package size={18} /> },
    { id: 'Flash Sales', icon: <Zap size={18} /> },
    { id: 'Custom Bundles', icon: <Tag size={18} /> },
    { id: 'Services', icon: <Layers size={18} /> },
    { id: 'Transactions', icon: <History size={18} /> },
    { id: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="fixed inset-0 z-[800] flex flex-col md:flex-row bg-[#F8FAFC]">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#004F71] p-4 flex items-center justify-between shadow-lg z-[810]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FFCC00] rounded-lg flex items-center justify-center text-[#004F71] font-black">A</div>
          <span className="text-white font-black text-sm">Admin Hub</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-white/80 hover:text-white"
        >
          {isSidebarOpen ? <X size={24} /> : <MoreVertical size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-0 z-[805] md:relative md:z-0 md:flex
        ${isSidebarOpen ? 'flex' : 'hidden'}
        w-full md:w-64 bg-[#004F71] flex-col shrink-0 transition-all duration-300
      `}>
        <div className="p-8 hidden md:flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-[#FFCC00] rounded-xl flex items-center justify-center text-[#004F71] font-black shadow-lg">
            A
          </div>
          <div className="text-white">
            <div className="text-sm font-black tracking-tight">Admin Hub</div>
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Control Panel</div>
          </div>
        </div>

        <nav className="flex-1 px-4 md:px-8 space-y-2 overflow-y-auto pt-20 md:pt-0">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                ? 'bg-[#FFCC00] text-[#004F71] shadow-lg' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="truncate">{item.id}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/10">
          <button 
            onClick={onLogout || onClose}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all"
          >
            <X size={18} />
            {onLogout ? 'Logout' : 'Exit Admin'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white px-4 md:px-8 py-4 md:py-6 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">{activeTab}</h2>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full sm:w-auto">
            <div className="relative group flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#004F71] transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
              />
            </div>
            <button className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl border border-slate-200 transition-all">
              <Filter size={18} />
            </button>
            <button 
              onClick={() => {
                if (activeTab === 'Bundles' || activeTab === 'Flash Sales' || activeTab === 'Custom Bundles') setIsAddingBundle(true);
                if (activeTab === 'Services') setIsAddingService(true);
              }}
              className="px-4 py-2 bg-[#004F71] text-white text-xs font-black rounded-xl shadow-md hover:bg-[#003d57] transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={16} /> <span className="hidden xs:inline">Add New</span>
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          {activeTab === 'Overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center ${stat.color}`}>
                        {stat.icon}
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                        stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {stat.trend}
                      </span>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                    <div className="text-xl font-black text-slate-900 tracking-tight font-mono">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 md:px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Recent Orders</h3>
                  <button className="text-[10px] font-black text-[#004F71] uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                        <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">User</th>
                        <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Item</th>
                        <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                        <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 md:px-8 py-4 text-xs font-bold text-slate-900 font-mono">{order.id}</td>
                          <td className="px-6 md:px-8 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                <Users size={14} />
                              </div>
                              <div className="text-xs font-bold text-slate-900">{order.user}</div>
                            </div>
                          </td>
                          <td className="px-6 md:px-8 py-4 text-xs font-bold text-slate-600">{order.item}</td>
                          <td className="px-6 md:px-8 py-4 text-xs font-black text-[#004F71] font-mono">GH₵ {order.amount}</td>
                          <td className="px-6 md:px-8 py-4">
                            <span className={`px-2 py-1 text-[9px] font-black rounded-md uppercase tracking-widest ${
                              order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                              order.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                              'bg-amber-50 text-amber-600'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 md:px-8 py-4">
                            <div className="flex items-center gap-2">
                              {order.status !== 'Processing' && order.status !== 'Completed' && (
                                <button 
                                  onClick={() => setOrders(orders.map(o => o.id === order.id ? {...o, status: 'Processing'} : o))}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Mark as Processing"
                                >
                                  <Zap size={16} />
                                </button>
                              )}
                              {order.status !== 'Completed' && (
                                <button 
                                  onClick={() => setOrders(orders.map(o => o.id === order.id ? {...o, status: 'Completed'} : o))}
                                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                  title="Mark as Completed"
                                >
                                  <CheckCircle2 size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Users' && (
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Details</th>
                      <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Balance</th>
                      <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">XP / Rank</th>
                      <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Joined</th>
                      <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 md:px-8 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                              <Users size={20} />
                            </div>
                            <div>
                              <div className="text-sm font-black text-slate-900">{user.name}</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 md:px-8 py-4 text-sm font-black text-[#004F71] font-mono">GH₵ {user.balance.toFixed(2)}</td>
                        <td className="px-6 md:px-8 py-4">
                          <div className="text-sm font-black text-amber-600 font-mono">{user.xp} XP</div>
                          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Level {Math.floor(user.xp / 500) + 1}</div>
                        </td>
                        <td className="px-6 md:px-8 py-4 text-xs font-medium text-slate-500">{user.joinedDate}</td>
                        <td className="px-6 md:px-8 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => setMessagingUser(user)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Send Message"
                            >
                              <Zap size={16} />
                            </button>
                            <button 
                              onClick={() => setCustomBundleUser(user)}
                              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title="Create Custom Bundle"
                            >
                              <Tag size={16} />
                            </button>
                            <button 
                              onClick={() => setSelectedUserOrders([
                                { id: 'ORD-1', item: 'MTN 10GB', amount: 45, date: '2024-10-24' },
                                { id: 'ORD-2', item: 'Telecel 5GB', amount: 25, date: '2024-10-20' }
                              ])}
                              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <History size={16} />
                            </button>
                            <button 
                              onClick={() => setUsers(users.filter(u => u.id !== user.id))}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Account"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Bundles' && (
            <div className="space-y-4">
              {bundles.map((bundle) => (
                <div key={bundle.id} className="bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:border-[#004F71]/30 transition-all">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#004F71]/5 rounded-2xl flex items-center justify-center text-[#004F71] shrink-0">
                      <Package size={28} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-black text-slate-900 truncate">{bundle.title}</h4>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-black rounded uppercase shrink-0">{bundle.rarity}</span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium">Category: {bundle.category} • Price: <span className="font-mono">GH₵ {bundle.price.toLocaleString()}</span></p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8 w-full sm:w-auto">
                    <div className="w-full sm:text-right">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stock Status</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 sm:w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(bundle.licensesRemaining / bundle.totalLicenses) * 100}%` }} />
                        </div>
                        <span className="text-xs font-black text-slate-900 font-mono whitespace-nowrap">{bundle.licensesRemaining}/{bundle.totalLicenses}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button 
                        onClick={() => setEditingBundle(bundle)}
                        className="flex-1 sm:flex-none p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all border border-slate-100 flex justify-center"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => setBundles(prev => prev.filter(b => b.id !== bundle.id))}
                        className="flex-1 sm:flex-none p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all border border-red-100 flex justify-center"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Flash Sales' && (
            <div className="space-y-4">
              {bundles.filter(b => b.isFlashSale).map((bundle) => (
                <div key={bundle.id} className="bg-white p-4 md:p-6 rounded-3xl border border-amber-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:border-amber-400 transition-all bg-amber-50/30">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                      <Zap size={28} fill="currentColor" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-black text-slate-900 truncate">{bundle.title}</h4>
                        <span className="px-2 py-0.5 bg-amber-500 text-white text-[8px] font-black rounded uppercase shrink-0">Flash Sale</span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium">Category: {bundle.category} • Price: <span className="font-mono">GH₵ {bundle.price.toLocaleString()}</span></p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => {
                        const updated = bundles.map(b => b.id === bundle.id ? { ...b, isFlashSale: false } : b);
                        setBundles(updated);
                      }}
                      className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all"
                    >
                      End Sale
                    </button>
                    <button 
                      onClick={() => setEditingBundle(bundle)}
                      className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all border border-slate-100"
                    >
                      <Edit size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {bundles.filter(b => b.isFlashSale).length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                  <Zap size={48} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-slate-400 font-bold">No active flash sales. Start one from the Bundles tab.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Custom Bundles' && (
            <div className="space-y-4">
              {customBundles.map((bundle) => (
                <div key={bundle.id} className="bg-white p-4 md:p-6 rounded-3xl border border-indigo-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:border-indigo-400 transition-all bg-indigo-50/30">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                      <Tag size={28} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-black text-slate-900 truncate">{bundle.title}</h4>
                        <span className="px-2 py-0.5 bg-indigo-500 text-white text-[8px] font-black rounded uppercase shrink-0">Custom</span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium">Price: <span className="font-mono">GH₵ {bundle.price.toLocaleString()}</span> • User: Specific Group</p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => setEditingBundle(bundle)}
                      className="flex-1 sm:flex-none p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all border border-slate-100 flex justify-center"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => setCustomBundles(prev => prev.filter(b => b.id !== bundle.id))}
                      className="flex-1 sm:flex-none p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all border border-red-100 flex justify-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Services' && (
            <div className="space-y-8">
              {/* Service Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(serviceToggles).map(([key, value]) => (
                  <div key={key} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Service Status</div>
                      <h4 className="font-black text-slate-900 uppercase">{key} Checker</h4>
                    </div>
                    <button 
                      onClick={() => setServiceToggles(prev => ({ ...prev, [key]: !value }))}
                      className={`w-12 h-6 rounded-full transition-all relative ${value ? 'bg-emerald-500' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${value ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Flyer Offers Section */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Custom Flyer Offers</h3>
                    <p className="text-sm text-slate-400 font-medium">Manage and create promotional flyer designs</p>
                  </div>
                  <button className="px-4 py-2 bg-[#004F71] text-white text-xs font-black rounded-xl shadow-md hover:bg-[#003d57] transition-all flex items-center gap-2">
                    <Plus size={16} /> Create Offer
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.filter(s => s.category === 'Design').map((service) => (
                    <div key={service.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-black text-slate-900">{service.title}</h4>
                        <span className="text-sm font-black text-[#004F71] font-mono">GH₵ {service.price}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-6">{service.description}</p>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all">Adjust Price</button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {services.filter(s => s.category !== 'Design').map((service) => (
                  <div key={service.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#004F71] shrink-0">
                          <Layers size={24} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-black text-slate-900 truncate">{service.title}</h4>
                          <p className="text-xs text-slate-400 font-medium">{service.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price</div>
                        <div className="text-lg font-black text-[#004F71] font-mono">GH₵ {service.price.toLocaleString()}</div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mb-6 line-clamp-2">{service.description}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingService(service)}
                        className="flex-1 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2"
                      >
                        <Edit size={14} /> Edit Service
                      </button>
                      <button 
                        onClick={() => setServices(prev => prev.filter(s => s.id !== service.id))}
                        className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all border border-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Transactions' && (
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-black text-slate-900">System Transaction Log</h3>
                <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Filter size={20} /></button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">#TX-902{i}</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded uppercase">Purchase</span></td>
                        <td className="px-6 py-4 font-black text-slate-900">GH₵ {(Math.random() * 100).toFixed(2)}</td>
                        <td className="px-6 py-4"><span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Completed</span></td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-400">Oct 24, 2024</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Settings' && (
            <div className="max-w-4xl space-y-8">
              {/* API Configuration */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <ShieldAlert size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">API & Security Keys</h3>
                    <p className="text-sm text-slate-400 font-medium">Configure your production environment keys</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Paystack Public Key</label>
                    <input 
                      type="password" 
                      placeholder="pk_live_..."
                      value={apiKeys.paystackPublic}
                      onChange={(e) => setApiKeys({...apiKeys, paystackPublic: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Paystack Secret Key</label>
                    <input 
                      type="password" 
                      placeholder="sk_live_..."
                      value={apiKeys.paystackSecret}
                      onChange={(e) => setApiKeys({...apiKeys, paystackSecret: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Momo API Gateway</label>
                    <input 
                      type="text" 
                      placeholder="https://api.momo..."
                      value={apiKeys.momoApi}
                      onChange={(e) => setApiKeys({...apiKeys, momoApi: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SMS Gateway Key</label>
                    <input 
                      type="password" 
                      placeholder="API Key"
                      value={apiKeys.smsGateway}
                      onChange={(e) => setApiKeys({...apiKeys, smsGateway: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* System Behavior */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">System Behavior</h3>
                    <p className="text-sm text-slate-400 font-medium">Control how the application handles data and payments</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <h4 className="font-black text-slate-900">Demo Mode (Simulation)</h4>
                      <p className="text-xs text-slate-400 font-medium">When enabled, all payments and deliveries are simulated for testing.</p>
                    </div>
                    <button 
                      onClick={() => setApiKeys({...apiKeys, isDemoMode: !apiKeys.isDemoMode})}
                      className={`w-12 h-6 rounded-full transition-all relative ${apiKeys.isDemoMode ? 'bg-amber-500' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${apiKeys.isDemoMode ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <h4 className="font-black text-slate-900">Maintenance Mode</h4>
                      <p className="text-xs text-slate-400 font-medium">Disable all purchases while performing system updates.</p>
                    </div>
                    <button className="w-12 h-6 bg-slate-200 rounded-full relative">
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-8 py-4 bg-[#004F71] text-[#FFCC00] font-black rounded-2xl shadow-lg hover:bg-[#003d57] transition-all">
                  Save Configuration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

        {/* Send Message Modal */}
        {messagingUser && (
          <div className="fixed inset-0 z-[900] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMessagingUser(null)} />
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-black text-slate-900">Message to {messagingUser.name}</h3>
                <button onClick={() => setMessagingUser(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message Content</label>
                  <textarea 
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all h-32 resize-none"
                  />
                </div>
                <button 
                  onClick={() => setMessagingUser(null)}
                  className="w-full py-4 bg-[#004F71] text-white font-black rounded-2xl shadow-lg hover:bg-[#003d57] transition-all"
                >
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Custom Bundle Modal */}
        {customBundleUser && (
          <div className="fixed inset-0 z-[900] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setCustomBundleUser(null)} />
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-black text-slate-900">Custom Bundle for {customBundleUser.name}</h3>
                <button onClick={() => setCustomBundleUser(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target User</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                    <option value={customBundleUser.id}>{customBundleUser.name} ({customBundleUser.email})</option>
                    {users.filter(u => u.id !== customBundleUser.id).map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bundle Title</label>
                  <input type="text" placeholder="e.g. VIP Special 100GB" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (GH₵)</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                </div>
                <button 
                  onClick={() => setCustomBundleUser(null)}
                  className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg hover:bg-indigo-700 transition-all"
                >
                  Create Bundle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Orders Modal */}
        {selectedUserOrders && (
          <div className="fixed inset-0 z-[900] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedUserOrders(null)} />
            <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-black text-slate-900">User Order History</h3>
                <button onClick={() => setSelectedUserOrders(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {selectedUserOrders.map((order, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{order.id} • {order.date}</div>
                      <div className="text-sm font-bold text-slate-900">{order.item}</div>
                    </div>
                    <div className="text-sm font-black text-[#004F71]">GH₵ {order.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bundle Edit/Add Modal */}
        {(editingBundle || isAddingBundle) && (
          <div className="fixed inset-0 z-[900] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => { setEditingBundle(null); setIsAddingBundle(false); }} />
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-black text-slate-900">{isAddingBundle ? 'Add New Bundle' : 'Edit Bundle'}</h3>
                <button onClick={() => { setEditingBundle(null); setIsAddingBundle(false); }} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bundle Title</label>
                  <input 
                    type="text" 
                    defaultValue={editingBundle?.title || ''}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (GH₵)</label>
                    <input 
                      type="number" 
                      defaultValue={editingBundle?.price || ''}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stock Count</label>
                    <input 
                      type="number" 
                      defaultValue={editingBundle?.licensesRemaining || ''}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all">
                    <option>MTN</option>
                    <option>Telecel</option>
                    <option>AirtelTigo</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bundle Details (Optional)</label>
                  <textarea 
                    defaultValue={editingBundle?.description || ''}
                    placeholder="Additional details about the bundle..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all h-24 resize-none"
                  />
                </div>
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <input 
                    type="checkbox" 
                    defaultChecked={editingBundle?.isFlashSale}
                    id="flashSaleToggle"
                    className="w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                  />
                  <label htmlFor="flashSaleToggle" className="text-xs font-black text-amber-900 uppercase tracking-widest cursor-pointer">
                    Enable Flash Sale Mode
                  </label>
                </div>
                <button 
                  onClick={() => { setEditingBundle(null); setIsAddingBundle(false); }}
                  className="w-full py-4 bg-[#004F71] text-white font-black rounded-2xl shadow-lg hover:bg-[#003d57] transition-all mt-4"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Service Edit/Add Modal */}
        {(editingService || isAddingService) && (
          <div className="fixed inset-0 z-[900] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => { setEditingService(null); setIsAddingService(false); }} />
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-black text-slate-900">{isAddingService ? 'Add New Service' : 'Edit Service'}</h3>
                <button onClick={() => { setEditingService(null); setIsAddingService(false); }} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Title</label>
                  <input 
                    type="text" 
                    defaultValue={editingService?.title || ''}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    defaultValue={editingService?.description || ''}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all h-24 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (GH₵)</label>
                    <input 
                      type="number" 
                      defaultValue={editingService?.price || ''}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                    <input 
                      type="text" 
                      defaultValue={editingService?.category || ''}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => { setEditingService(null); setIsAddingService(false); }}
                  className="w-full py-4 bg-[#004F71] text-white font-black rounded-2xl shadow-lg hover:bg-[#003d57] transition-all mt-4"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default AdminPanel;
