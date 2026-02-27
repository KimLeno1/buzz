
import React, { useState } from 'react';
import { 
  X, 
  ArrowUpRight, 
  Smartphone, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  Info,
  AlertCircle
} from 'lucide-react';
import { User } from '../types';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSuccess: (amount: number, recipient: string) => void;
}

const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, user, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (numAmount > user.balance) {
      setError('Insufficient balance in your Buzz wallet.');
      return;
    }

    if (recipient.length < 10) {
      setError('Please enter a valid 10-digit wallet number.');
      return;
    }

    setIsProcessing(true);

    // Simulate transfer process
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  const finalSuccess = () => {
    onSuccess(parseFloat(amount), recipient);
    setShowSuccess(false);
    setAmount('');
    setRecipient('');
    onClose();
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[800] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" />
        <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in-95 duration-300">
           <div className="w-24 h-24 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 size={48} />
           </div>
           <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Transfer Initiated!</h3>
           <p className="text-slate-500 font-medium leading-relaxed mb-8">
             GH₵ {parseFloat(amount).toLocaleString()} is being sent to {recipient}. It will reflect in your mobile wallet shortly.
           </p>
           <button 
              onClick={finalSuccess}
              className="w-full py-5 bg-[#004F71] text-white font-black rounded-2xl hover:bg-[#003d57] transition-all shadow-xl active:scale-95"
           >
             Back to Dashboard
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <div className="relative h-40 bg-[#004F71] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFCC00] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#004F71] rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
          
          <div className="relative z-10 text-center px-6">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-2xl">
              <ArrowUpRight className="text-white" size={28} />
            </div>
            <h3 className="text-white font-black text-2xl tracking-tight">Transfer Funds</h3>
            <p className="text-[#FFCC00] text-[10px] font-bold uppercase tracking-[0.2em] mt-1 opacity-80">Withdraw to Mobile Wallet</p>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all rounded-full border border-white/20"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 sm:p-10 space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex justify-between items-center">
             <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Available Balance</div>
                <div className="text-xl font-black text-slate-900">GH₵ {user.balance.toLocaleString()}</div>
             </div>
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm">
                <Info size={18} />
             </div>
          </div>

          <form onSubmit={handleTransfer} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transfer Amount (GH₵)</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-lg">₵</div>
                <input
                  type="number"
                  required
                  min="1"
                  max={user.balance}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-xl font-black focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Recipient Wallet Number</label>
              <div className="relative group">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-900" size={18} />
                <input
                  type="tel"
                  required
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value.replace(/\D/g, '').substring(0, 10))}
                  placeholder="024XXXXXXX"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={18} />
                <span className="text-xs font-bold">{error}</span>
              </div>
            )}

            <div className="bg-amber-50 p-4 rounded-2xl flex items-start gap-3 border border-amber-100">
               <ShieldCheck className="text-amber-500 shrink-0" size={18} />
               <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                 A processing fee of GH₵ 1.00 applies to all external transfers. Funds usually arrive within 5-15 minutes.
               </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing || !amount || parseFloat(amount) <= 0}
              className="w-full py-5 bg-[#004F71] text-white font-black rounded-2xl shadow-xl hover:bg-[#003d57] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:shadow-none"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Processing Withdrawal...
                </>
              ) : (
                <>
                  Confirm Transfer
                  <ArrowUpRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
