
import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Ticket, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Filter,
  Download,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface PurchasedChecker {
  id: string;
  type: 'WAEC' | 'BECE' | 'Placement';
  serial: string;
  pin: string;
  date: string;
  status: 'Used' | 'Valid';
  candidateName?: string;
}

interface MyCheckersPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyCheckersPanel: React.FC<MyCheckersPanelProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'WAEC' | 'BECE' | 'Placement'>('All');

  if (!isOpen) return null;

  // Mock data for purchased checkers
  const myCheckers: PurchasedChecker[] = [
    {
      id: 'CHK-001',
      type: 'WAEC',
      serial: 'W2400018293',
      pin: '8821-0092-4412',
      date: 'Oct 25, 2024',
      status: 'Valid',
      candidateName: 'John Doe'
    },
    {
      id: 'CHK-002',
      type: 'Placement',
      serial: 'P2499102',
      pin: '9901-2234-1100',
      date: 'Oct 12, 2024',
      status: 'Used',
      candidateName: 'John Doe'
    },
    {
      id: 'CHK-003',
      type: 'BECE',
      serial: 'B24001122',
      pin: '1122-3344-5566',
      date: 'Sep 30, 2024',
      status: 'Valid'
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCheckers = myCheckers.filter(chk => {
    const matchesSearch = chk.serial.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         chk.pin.includes(searchTerm) || 
                         (chk.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = activeFilter === 'All' || chk.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    return status === 'Valid' ? 'text-emerald-500 bg-emerald-50' : 'text-slate-400 bg-slate-100';
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'WAEC': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'BECE': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Placement': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="fixed inset-0 z-[750] flex items-center justify-end">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-xl h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 shrink-0 bg-white sticky top-0 z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                <ShieldCheck size={12} fill="currentColor" /> My Digital Vault
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Purchased Checkers</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search Serial, PIN or Candidate..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['All', 'WAEC', 'BECE', 'Placement'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f as any)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                    activeFilter === f 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30 scrollbar-hide">
          {filteredCheckers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center opacity-40">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Ticket size={40} className="text-slate-300" />
              </div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No checkers found</p>
            </div>
          ) : (
            filteredCheckers.map((checker) => (
              <div key={checker.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all">
                {/* Card Top */}
                <div className="p-6 border-b border-slate-50 flex justify-between items-start">
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${getTypeStyle(checker.type)}`}>
                         <Zap size={24} fill="currentColor" />
                      </div>
                      <div>
                         <h4 className="font-black text-slate-900 leading-none mb-1.5">{checker.type} Checker</h4>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{checker.date}</p>
                      </div>
                   </div>
                   <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${getStatusColor(checker.status)}`}>
                      {checker.status}
                   </div>
                </div>

                {/* Card Body (Credentials) */}
                <div className="p-6 space-y-5 bg-gradient-to-b from-white to-slate-50/50">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Serial Number</label>
                        <div className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl">
                           <code className="text-xs font-black text-slate-700">{checker.serial}</code>
                           <button 
                             onClick={() => handleCopy(checker.serial, checker.id + 's')}
                             className="p-1.5 text-slate-300 hover:text-indigo-600 transition-colors"
                           >
                             {copiedId === checker.id + 's' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                           </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Pin Code</label>
                        <div className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl">
                           <code className="text-xs font-black text-slate-900">{checker.pin}</code>
                           <button 
                             onClick={() => handleCopy(checker.pin, checker.id + 'p')}
                             className="p-1.5 text-slate-300 hover:text-indigo-600 transition-colors"
                           >
                             {copiedId === checker.id + 'p' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                           </button>
                        </div>
                      </div>
                   </div>

                   {checker.candidateName && (
                     <div className="flex items-center gap-2 px-1">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Candidate:</span>
                        <span className="text-[10px] font-bold text-slate-500">{checker.candidateName}</span>
                     </div>
                   )}
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 py-4 bg-slate-50 flex items-center justify-between">
                   <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-colors">
                      <Download size={14} /> Save Voucher
                   </button>
                   <a 
                     href="#" 
                     className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
                   >
                      Go to Portal <ExternalLink size={12} />
                   </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Notice */}
        <div className="p-8 border-t border-slate-100 bg-white space-y-6">
           <div className="bg-amber-50 p-4 rounded-2xl flex items-start gap-3 border border-amber-100">
              <Clock size={18} className="text-amber-500 shrink-0" />
              <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                Checkers are usually valid for up to 5 usages on the official portal. Protect your PIN and Serial from unauthorized access.
              </p>
           </div>
           <button 
             onClick={onClose}
             className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all active:scale-[0.98]"
           >
             Close Vault
           </button>
        </div>
      </div>
    </div>
  );
};

export default MyCheckersPanel;
