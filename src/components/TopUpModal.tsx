
import React, { useState } from 'react';
import { 
  X, 
  Wallet, 
  CreditCard, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  ShieldCheck,
  Plus,
  TrendingUp
} from 'lucide-react';
import { User } from '../types';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSuccess: (amount: number) => void;
}

const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose, user, onSuccess }) => {
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAmount, setLastAmount] = useState(0);

  if (!isOpen) return null;

  const presets = [10, 20, 50, 100, 200];

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    setIsProcessing(true);
    setLastAmount(numAmount);

    // Simulate Paystack payment process
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  const finalSuccess = () => {
    onSuccess(lastAmount);
    setShowSuccess(false);
    setAmount('');
    onClose();
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[800] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" />
        <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in-95 duration-300">
           <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 size={48} />
           </div>
           <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Top-Up Successful!</h3>
           <p className="text-slate-500 font-medium leading-relaxed mb-8">
             GH₵ {lastAmount.toLocaleString()} has been added to your wallet. Your new balance is GH₵ {(user.balance + lastAmount).toLocaleString()}.
           </p>
           <button 
              onClick={finalSuccess}
              className="w-full py-5 bg-[#004F71] text-white font-black rounded-2xl hover:bg-[#003d57] transition-all shadow-xl active:scale-95"
           >
             Continue to Dashboard
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
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FFCC00]/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
          
          <div className="relative z-10 text-center px-6">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-2xl">
              <Wallet className="text-white" size={28} />
            </div>
            <h3 className="text-white font-black text-2xl tracking-tight">Add Funds</h3>
            <p className="text-[#FFCC00] text-[10px] font-bold uppercase tracking-[0.2em] mt-1 opacity-80">Instant Wallet Top-up</p>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all rounded-full border border-white/20"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 sm:p-10 space-y-8">
          <div className="flex justify-between items-center bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Current Balance</div>
              <div className="text-xl font-black text-slate-900">GH₵ {user.balance.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black text-[#004F71]/60 uppercase tracking-widest mb-0.5">New Balance</div>
              <div className="text-xl font-black text-[#004F71]">
                GH₵ {(user.balance + (parseFloat(amount) || 0)).toLocaleString()}
              </div>
            </div>
          </div>

          <form onSubmit={handleTopUp} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Enter Amount (GH₵)</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-lg group-focus-within:text-[#004F71] transition-colors">₵</div>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-xl font-black focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {presets.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(p.toString())}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all border ${
                    amount === p.toString() 
                    ? 'bg-[#004F71] text-white border-[#004F71] shadow-lg shadow-[#004F71]/20' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-[#004F71]/30 hover:text-[#004F71]'
                  }`}
                >
                  ₵{p}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Method</label>
              <div className="p-4 rounded-2xl border-2 border-[#004F71] bg-[#004F71]/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                    <img src="https://paystack.com/assets/img/login/paystack-logo.png" alt="Paystack" className="h-3 object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">Paystack</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Momo & Card</div>
                  </div>
                </div>
                <CheckCircle2 size={20} className="text-[#004F71]" />
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3 border border-slate-100">
               <ShieldCheck className="text-emerald-500 shrink-0" size={18} />
               <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                 Your transaction is encrypted with bank-grade security. Funds are credited instantly upon successful payment verification.
               </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing || !amount || parseFloat(amount) <= 0}
              className="w-full py-5 bg-[#004F71] text-white font-black rounded-2xl shadow-[0_20px_50px_rgba(0,79,113,0.3)] hover:bg-[#003d57] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:shadow-none"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Initializing Gateway...
                </>
              ) : (
                <>
                  Pay GH₵ {(parseFloat(amount) || 0).toLocaleString()}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopUpModal;
