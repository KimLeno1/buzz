
import React, { useState } from 'react';
import { 
  X, 
  Ticket, 
  Smartphone, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  ShieldCheck,
  Zap,
  Info,
  CreditCard,
  Wallet
} from 'lucide-react';
import { User } from '../types';

interface CheckerType {
  id: string;
  name: string;
  price: number;
  description: string;
  color: string;
  iconColor: string;
}

interface CheckerPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (checker: CheckerType, phone: string, paymentMethod: 'paystack' | 'wallet') => void;
  user: User | null;
}

const CHECKER_TYPES: CheckerType[] = [
  {
    id: 'waec',
    name: 'WAEC Result Checker',
    price: 18.00,
    description: 'Check WASSCE & SSCE Results',
    color: 'bg-blue-50 border-blue-100 hover:border-blue-400',
    iconColor: 'text-blue-600 bg-blue-100'
  },
  {
    id: 'bece',
    name: 'BECE Result Checker',
    price: 15.00,
    description: 'Check Junior High Results',
    color: 'bg-emerald-50 border-emerald-100 hover:border-emerald-400',
    iconColor: 'text-emerald-600 bg-emerald-100'
  },
  {
    id: 'placement',
    name: 'School Placement Pin',
    price: 12.00,
    description: 'CSSPS School Placement Pin',
    color: 'bg-amber-50 border-amber-100 hover:border-amber-400',
    iconColor: 'text-amber-600 bg-amber-100'
  }
];

const CheckerPurchaseModal: React.FC<CheckerPurchaseModalProps> = ({ isOpen, onClose, onPurchase, user }) => {
  const [selectedType, setSelectedType] = useState<CheckerType>(CHECKER_TYPES[0]);
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'wallet'>('paystack');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (phone.length < 10) {
      setError('Please enter a valid 10-digit delivery phone number.');
      return;
    }

    if (paymentMethod === 'wallet') {
      if (!user) {
        setError('Please sign in to pay with your balance.');
        return;
      }
      if (user.balance < selectedType.price) {
        setError('Insufficient balance. Please top up or use Paystack.');
        return;
      }
    }

    setIsProcessing(true);
    // Simulate payment validation
    setTimeout(() => {
      setIsProcessing(false);
      onPurchase(selectedType, phone, paymentMethod);
      onClose();
      setPhone('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-[#004F71]/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="relative h-40 bg-[#004F71] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFCC00] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FFCC00] rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
          
          <div className="relative z-10 text-center px-6">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-2xl">
              <Ticket className="text-[#FFCC00]" size={28} />
            </div>
            <h3 className="text-white font-black text-2xl tracking-tight">Result Checkers</h3>
            <p className="text-[#FFCC00] text-[10px] font-bold uppercase tracking-[0.2em] mt-1 opacity-80">Instant PIN Delivery Service</p>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all rounded-full border border-white/20"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 sm:p-10 scrollbar-hide">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Checker Type Selection */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-[#004F71] uppercase tracking-widest ml-1">Select Service Type</label>
              <div className="grid grid-cols-1 gap-3">
                {CHECKER_TYPES.map((type) => (
                  <div 
                    key={type.id}
                    onClick={() => setSelectedType(type)}
                    className={`cursor-pointer p-5 rounded-[1.5rem] border-2 transition-all flex items-center justify-between group active:scale-[0.98] ${
                      selectedType.id === type.id 
                        ? 'border-[#004F71] bg-[#004F71]/5 shadow-xl translate-x-1' 
                        : `${type.color} bg-opacity-50`
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${type.iconColor}`}>
                        <Zap size={24} fill="currentColor" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-[#004F71] leading-tight">{type.name}</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tight mt-0.5">{type.description}</div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                       <div className="font-black text-[#004F71]">GH₵ {type.price.toFixed(2)}</div>
                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedType.id === type.id ? 'bg-[#004F71] border-[#004F71]' : 'border-gray-200'}`}>
                          {selectedType.id === type.id && <CheckCircle2 size={12} className="text-[#FFCC00]" />}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-[#004F71] uppercase tracking-widest ml-1">Delivery Phone Number (For SMS)</label>
              <div className="relative group">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004F71] transition-colors" size={18} />
                <input
                  type="tel"
                  required
                  placeholder="024XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-2 px-1">
                <Info size={12} className="text-[#004F71]" />
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">The Checker PIN & Serial will be sent via SMS to this number.</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-[#004F71] uppercase tracking-widest ml-1">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => setPaymentMethod('paystack')}
                  className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    paymentMethod === 'paystack' 
                      ? 'border-[#004F71] bg-[#004F71]/5' 
                      : 'border-gray-100 bg-white'
                  }`}
                >
                  <CreditCard size={20} className={paymentMethod === 'paystack' ? 'text-[#004F71]' : 'text-gray-400'} />
                  <span className={`text-[10px] font-black ${paymentMethod === 'paystack' ? 'text-[#004F71]' : 'text-gray-400'}`}>Paystack</span>
                </div>
                <div 
                  onClick={() => setPaymentMethod('wallet')}
                  className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    paymentMethod === 'wallet' 
                      ? 'border-[#004F71] bg-[#004F71]/5' 
                      : 'border-gray-100 bg-white'
                  } ${!user ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                >
                  <Wallet size={20} className={paymentMethod === 'wallet' ? 'text-[#004F71]' : 'text-gray-400'} />
                  <span className={`text-[10px] font-black ${paymentMethod === 'wallet' ? 'text-[#004F71]' : 'text-gray-400'}`}>Balance</span>
                </div>
              </div>
            </div>

            {error && <p className="text-xs text-red-500 font-bold ml-1">{error}</p>}

            {/* Order Summary */}
            <div className="bg-[#004F71] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
              <div className="relative z-10 flex justify-between items-end">
                <div>
                  <div className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Total to Pay</div>
                  <div className="text-3xl font-black">GH₵ {selectedType.price.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-[#FFCC00] text-[10px] font-black uppercase tracking-widest mb-1">
                    <ShieldCheck size={14} /> Instant Credit
                  </div>
                  <div className="text-xs font-bold text-white/40">Includes Service Charge</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isProcessing || phone.length < 10}
              className="w-full py-5 bg-[#004F71] text-[#FFCC00] font-black rounded-2xl shadow-xl hover:bg-[#003d57] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Verifying Transaction...
                </>
              ) : (
                <>
                  Confirm and Pay
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

export default CheckerPurchaseModal;
