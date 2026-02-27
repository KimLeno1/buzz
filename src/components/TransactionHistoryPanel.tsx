
import React, { useState } from 'react';
import { 
  X, 
  Search, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Calendar,
  Filter
} from 'lucide-react';
import { WalletTransaction } from '../types';

interface TransactionHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: WalletTransaction[];
}

const TransactionHistoryPanel: React.FC<TransactionHistoryPanelProps> = ({ isOpen, onClose, transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'All' | 'Top-up' | 'Transfer' | 'Purchase'>('All');

  if (!isOpen) return null;

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || tx.id.includes(searchTerm);
    const matchesFilter = filter === 'All' || tx.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fixed inset-0 z-[750] flex items-center justify-end">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-xl h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Transaction History</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Unified Financial Records</p>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#004F71] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['All', 'Top-up', 'Transfer', 'Purchase'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap border ${
                    filter === f 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {f}s
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-slate-50/30">
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
              <Calendar size={48} className="text-slate-200 mb-4" />
              <p className="text-sm font-bold text-slate-400">No transactions recorded</p>
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <div key={tx.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    tx.type === 'Top-up' ? 'bg-emerald-50 text-emerald-600' :
                    tx.type === 'Transfer' ? 'bg-amber-50 text-amber-600' :
                    'bg-[#004F71]/5 text-[#004F71]'
                  }`}>
                    {tx.type === 'Top-up' ? <ArrowDownLeft size={20} /> :
                     tx.type === 'Transfer' ? <ArrowUpRight size={20} /> :
                     <ShoppingBag size={20} />}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 leading-tight mb-1">{tx.description}</div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                      <span>{tx.date}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span className={tx.status === 'Completed' ? 'text-emerald-500' : 'text-amber-500'}>{tx.status}</span>
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-black text-right ${
                  tx.type === 'Top-up' ? 'text-emerald-600' : 'text-slate-900'
                }`}>
                  {tx.type === 'Top-up' ? '+' : '-'} GH₵ {tx.amount.toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-slate-100 bg-white">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-100 text-slate-900 font-black rounded-2xl hover:bg-slate-200 transition-all"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPanel;
