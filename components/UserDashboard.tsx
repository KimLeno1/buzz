
import React from 'react';
import { 
  Search, 
  ShoppingBag, 
  History, 
  TrendingUp, 
  Wallet, 
  ArrowRight, 
  RefreshCcw, 
  Clock,
  CheckCircle2,
  Zap,
  Tag
} from 'lucide-react';
import { User, Dataset } from '../types';

interface UserDashboardProps {
  user: User;
  onShopNow: () => void;
  onViewOrders: () => void;
  onReorder: (dataset: Dataset) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onShopNow, onViewOrders, onReorder }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const RANKS = [
    { name: 'Seeker', minXp: 0 },
    { name: 'Analyst', minXp: 100 },
    { name: 'Oracle', minXp: 230 }, // 100 + (100 * 1.3)
    { name: 'Master', minXp: 399 }, // 230 + (130 * 1.3)
    { name: 'Legend', minXp: 619 }, // 399 + (169 * 1.3)
  ];

  const getCurrentRankInfo = () => {
    const currentRankIndex = RANKS.findIndex(r => r.name === user.rank);
    const nextRank = RANKS[currentRankIndex + 1];
    
    if (!nextRank) return { progress: 100, nextRankName: 'Max Rank' };
    
    const currentRankMin = RANKS[currentRankIndex].minXp;
    const nextRankMin = nextRank.minXp;
    const progress = Math.min(100, Math.max(0, ((user.xp - currentRankMin) / (nextRankMin - currentRankMin)) * 100));
    
    return { progress, nextRankName: nextRank.name };
  };

  const { progress, nextRankName } = getCurrentRankInfo();

  // Mock data for the dashboard
  const stats = {
    totalOrders: 12,
    amountSpent: 450,
    amountSaved: 85
  };

  const recentOrders = [
    {
      id: 'ord-101',
      bundle: {
        id: 'mtn-1',
        title: 'MTN 1GB Non-Expiry',
        price: 10,
        category: 'MTN',
        description: 'Instant 1GB data top-up',
        rarity: 'Standard',
        licensesRemaining: 999,
        totalLicenses: 1000,
        hypeVelocity: [],
        viewingCount: 120
      },
      date: '2 hours ago',
      status: 'Completed',
      beneficiary: '0244123456'
    },
    {
      id: 'ord-flash',
      bundle: {
        id: 'flash-001',
        title: 'Midnight Blaze: 10GB',
        price: 18,
        category: 'MTN',
        description: 'Exclusive Flash Deal',
        rarity: 'Exclusive',
        licensesRemaining: 0,
        totalLicenses: 50,
        hypeVelocity: [],
        viewingCount: 120,
        isFlashSale: true
      },
      date: '3 hours ago',
      status: 'Completed',
      beneficiary: '0244123456'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-10">
      {/* Greeting & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">
            {getGreeting()}, <span className="text-indigo-600">{user.name || 'Member'}</span>!
          </h1>
          <p className="text-gray-500 font-medium">Ready to top up your connectivity today?</p>
        </div>
        
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search bundles or services..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
            <ShoppingBag size={28} />
          </div>
          <div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Orders</div>
            <div className="text-2xl font-black text-gray-900">{stats.totalOrders}</div>
            <div className="text-[10px] font-bold text-green-500 mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> +2 this week
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
            <Wallet size={28} />
          </div>
          <div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Spent (Month)</div>
            <div className="text-2xl font-black text-gray-900">GH₵ {stats.amountSpent}</div>
            <div className="text-[10px] font-bold text-gray-400 mt-1">Across all networks</div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
            <Tag size={28} />
          </div>
          <div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Saved</div>
            <div className="text-2xl font-black text-gray-900">GH₵ {stats.amountSaved}</div>
            <div className="text-[10px] font-bold text-amber-600 mt-1">Member exclusive deals</div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Quick Actions */}
        <div className="space-y-6">
          <h3 className="text-lg font-black text-gray-900 tracking-tight ml-2">Quick Actions</h3>
          <div className="space-y-4">
            <button 
              onClick={onShopNow}
              className="w-full p-6 bg-indigo-600 text-white rounded-3xl shadow-xl hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Zap size={24} fill="currentColor" />
                </div>
                <div className="text-left">
                  <div className="font-black text-lg">Shop Now</div>
                  <div className="text-xs font-medium text-indigo-100">Browse all bundles</div>
                </div>
              </div>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={onViewOrders}
              className="w-full p-6 bg-white border border-gray-200 text-gray-900 rounded-3xl shadow-sm hover:bg-gray-50 hover:-translate-y-1 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600">
                  <History size={24} />
                </div>
                <div className="text-left">
                  <div className="font-black text-lg">All Orders</div>
                  <div className="text-xs font-medium text-gray-500">View your history</div>
                </div>
              </div>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Rank Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
            <div className="relative z-10">
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Current Rank</div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp size={28} />
                </div>
                <div>
                  <div className="text-2xl font-black">{user.rank}</div>
                  <div className="text-xs font-bold text-gray-400">{user.xp} XP Earned</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span>Progress to {nextRankName}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black text-gray-900 tracking-tight">Recent Bundle Orders</h3>
            <button onClick={onViewOrders} className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-colors">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                    order.bundle.category === 'MTN' ? 'bg-amber-50 text-amber-600' : 
                    order.bundle.category === 'Telecel' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {order.bundle.isFlashSale ? <Zap size={28} fill="currentColor" /> : <ShoppingBag size={28} />}
                  </div>
                  <div>
                    <div className="font-black text-gray-900 mb-0.5">{order.bundle.title}</div>
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={12} /> {order.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{order.beneficiary}</span>
                      {order.bundle.isFlashSale && (
                        <>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="text-amber-600 font-black uppercase tracking-tighter">Flash Sale</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-black text-gray-900">GH₵ {order.bundle.price}</div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase tracking-tighter">
                      <CheckCircle2 size={10} /> {order.status}
                    </div>
                  </div>
                  
                  {!order.bundle.isFlashSale ? (
                    <button 
                      onClick={() => onReorder(order.bundle as Dataset)}
                      className="flex items-center gap-2 px-5 py-3 bg-gray-50 text-gray-900 text-xs font-black rounded-xl hover:bg-indigo-600 hover:text-white transition-all group"
                    >
                      <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                      Re-order
                    </button>
                  ) : (
                    <div className="px-5 py-3 bg-slate-50 text-slate-400 text-xs font-black rounded-xl border border-slate-100 flex items-center gap-2 cursor-default">
                      <Zap size={14} /> One-time
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Empty State / Placeholder */}
            <div className="p-10 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-4">
                  <History size={32} />
               </div>
               <h4 className="text-sm font-bold text-gray-400">No older orders to show</h4>
               <p className="text-xs text-gray-300 mt-1">Your future purchases will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
