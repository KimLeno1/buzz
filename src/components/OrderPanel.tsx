
import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Filter, 
  Package, 
  ChevronRight, 
  RefreshCcw, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Zap
} from 'lucide-react';
import { User, Dataset } from '../types';

interface Order {
  id: string;
  bundle: Dataset;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  beneficiary: string;
  amount: number;
}

interface OrderPanelProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onReorder: (dataset: Dataset) => void;
}

const OrderPanel: React.FC<OrderPanelProps> = ({ isOpen, onClose, user, onReorder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'MTN' | 'Telecel' | 'AirtelTigo'>('All');

  if (!isOpen) return null;

  // Mock data for the order history
  const orders: Order[] = [
    {
      id: 'BZ-98210',
      bundle: { id: 'mtn-1', title: 'MTN 6GB Unlimited', price: 27, category: 'MTN', rarity: 'Unlimited', licensesRemaining: 0, totalLicenses: 1000, description: '', hypeVelocity: [], viewingCount: 0 },
      date: 'Oct 24, 2024 • 10:45 AM',
      status: 'Completed',
      beneficiary: '0244123456',
      amount: 27
    },
    {
      id: 'BZ-98205',
      bundle: { id: 'tc-1', title: 'Telecel 10GB (60 Days)', price: 38, category: 'Telecel', rarity: 'Premium', licensesRemaining: 0, totalLicenses: 500, description: '', hypeVelocity: [], viewingCount: 0 },
      date: 'Oct 22, 2024 • 03:12 PM',
      status: 'Completed',
      beneficiary: '0507890123',
      amount: 38
    },
    {
      id: 'BZ-98190',
      bundle: { id: 'at-1', title: 'AirtelTigo 3GB Non-Expiry', price: 12, category: 'AirtelTigo', rarity: 'Standard', licensesRemaining: 0, totalLicenses: 2000, description: '', hypeVelocity: [], viewingCount: 0 },
      date: 'Oct 18, 2024 • 09:05 AM',
      status: 'Completed',
      beneficiary: '0276543210',
      amount: 12
    },
    {
      id: 'BZ-FLASH-01',
      bundle: { id: 'flash-001', title: 'Midnight Blaze Flash (10GB)', price: 18, category: 'MTN', rarity: 'Exclusive', licensesRemaining: 0, totalLicenses: 50, description: '', hypeVelocity: [], viewingCount: 0, isFlashSale: true },
      date: 'Oct 15, 2024 • 11:30 PM',
      status: 'Completed',
      beneficiary: '0244123456',
      amount: 18
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.beneficiary.includes(searchTerm) || order.bundle.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || order.bundle.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalSpent = orders.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-end">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-xl h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 shrink-0">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-[#004F71]/5 text-[#004F71] text-[10px] font-black uppercase tracking-widest rounded-md mb-2">
                <Package size={12} /> Transaction History
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Your Orders</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Orders</div>
                <div className="text-xl font-black text-slate-900">{orders.length}</div>
             </div>
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Spent</div>
                <div className="text-xl font-black text-indigo-600">GH₵ {totalSpent.toLocaleString()}</div>
             </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#004F71] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search beneficiary or bundle..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['All', 'MTN', 'Telecel', 'AirtelTigo'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap border ${
                    activeFilter === filter 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-slate-50/50">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-4">
                <Clock size={32} />
              </div>
              <h4 className="text-sm font-bold text-slate-900">No orders found</h4>
              <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filters.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      order.bundle.category === 'MTN' ? 'bg-[#FFCC00]/10 text-[#FFCC00]' : 
                      order.bundle.category === 'Telecel' ? 'bg-[#E60000]/10 text-[#E60000]' : 'bg-[#00AEEF]/10 text-[#00AEEF]'
                    }`}>
                      {order.bundle.isFlashSale ? <Zap size={24} fill="currentColor" /> : <CreditCard size={24} />}
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        {order.id}
                        {order.bundle.isFlashSale && <span className="bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded text-[8px] font-black uppercase">Flash Sale</span>}
                      </div>
                      <h4 className="font-black text-slate-900">{order.bundle.title}</h4>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-md flex items-center gap-1 uppercase tracking-tighter">
                      <CheckCircle2 size={12} /> {order.status}
                    </div>
                    <div className="text-sm font-black text-[#004F71] mt-2">GH₵ {order.amount.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="space-y-1">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Beneficiary</div>
                    <div className="text-xs font-bold text-slate-700">{order.beneficiary}</div>
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</div>
                    <div className="text-xs font-bold text-slate-700">{order.date}</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  {!order.bundle.isFlashSale ? (
                    <button 
                      onClick={() => onReorder(order.bundle)}
                      className="flex-1 py-3 bg-[#004F71] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#003d57] transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCcw size={14} /> Re-order
                    </button>
                  ) : (
                    <div className="flex-1 py-3 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 border border-slate-100 cursor-not-allowed">
                      One-time Offer
                    </div>
                  )}
                  <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-all border border-slate-100">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 bg-white shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-100 text-slate-900 font-black rounded-2xl hover:bg-slate-200 transition-all active:scale-[0.98]"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPanel;
