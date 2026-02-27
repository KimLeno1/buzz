
import React, { useState, useEffect } from 'react';
import { X, Phone, CheckCircle2, Loader2, ArrowRight, Wallet, CreditCard, AlertCircle } from 'lucide-react';
import { Dataset, User } from '../types';
import { DATASETS } from '../constants';

interface QuickBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBundle: Dataset | null;
  user: User | null;
  onPurchase: (bundle: Dataset, beneficiaryNumber: string, senderNumber: string, paymentMethod: 'paystack' | 'wallet') => void;
}

const QuickBuyModal: React.FC<QuickBuyModalProps> = ({ isOpen, onClose, selectedBundle, user, onPurchase }) => {
  const [beneficiaryNumber, setBeneficiaryNumber] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [activeBundle, setActiveBundle] = useState<Dataset | null>(selectedBundle);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'wallet'>('paystack');
  const [error, setError] = useState('');

  const relatedBundles = selectedBundle 
    ? DATASETS.filter(ds => ds.category === selectedBundle.category)
    : DATASETS;

  useEffect(() => {
    if (selectedBundle) {
      setActiveBundle(selectedBundle);
    } else if (DATASETS.length > 0) {
      setActiveBundle(DATASETS[0]);
    }
  }, [selectedBundle, isOpen]);

  if (!isOpen) return null;

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!beneficiaryNumber || beneficiaryNumber.length < 10) {
      setError('Please enter a valid 10-digit beneficiary phone number.');
      return;
    }

    if (!senderNumber || senderNumber.length < 10) {
      setError('Please enter a valid 10-digit sender phone number.');
      return;
    }

    if (!activeBundle) {
      setError('Please select a bundle.');
      return;
    }

    if (paymentMethod === 'wallet') {
      if (!user) {
        setError('You must be signed in to pay with wallet balance.');
        return;
      }
      if (user.balance < activeBundle.price) {
        setError('Insufficient wallet balance. Please top up or use Paystack.');
        return;
      }
    }

    setIsProcessing(true);
    // Simulate validation
    setTimeout(() => {
      setIsProcessing(false);
      onPurchase(activeBundle, beneficiaryNumber, senderNumber, paymentMethod);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
            <p className="text-xs text-gray-500 font-medium">Complete your order summary and payment.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-xl hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <form onSubmit={handlePurchase} className="space-y-8">
            {/* Bundle Selection */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Select Bundle</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedBundles.map((ds) => (
                  <div 
                    key={ds.id}
                    onClick={() => setActiveBundle(ds)}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      activeBundle?.id === ds.id 
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                        : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[8px] font-black ${
                        ds.category === 'MTN' ? 'bg-[#FFCC00] text-black' : 
                        ds.category === 'Telecel' ? 'bg-[#E60000] text-white' : 
                        'bg-[#004F71] text-white'
                      }`}>
                        {ds.category.substring(0, 3)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 leading-tight">{ds.title}</div>
                        <div className="text-[10px] text-gray-500 font-medium">GH₵ {ds.price.toLocaleString()}</div>
                      </div>
                    </div>
                    {activeBundle?.id === ds.id && (
                      <CheckCircle2 size={18} className="text-[#004F71]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Beneficiary Info */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Beneficiary Contact</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    required
                    placeholder="Beneficiary Number"
                    value={beneficiaryNumber}
                    onChange={(e) => setBeneficiaryNumber(e.target.value.replace(/\D/g, '').substring(0, 10))}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#004F71] focus:border-transparent outline-none transition-all font-medium"
                  />
                </div>
              </div>

              {/* Sender Info */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Contact (Sender)</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone Number"
                    value={senderNumber}
                    onChange={(e) => setSenderNumber(e.target.value.replace(/\D/g, '').substring(0, 10))}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#004F71] focus:border-transparent outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-[#004F71] uppercase tracking-widest ml-1">Payment Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div 
                  onClick={() => setPaymentMethod('paystack')}
                  className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                    paymentMethod === 'paystack' 
                      ? 'border-[#004F71] bg-[#004F71]/5 shadow-md' 
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                      <CreditCard size={20} className="text-[#004F71]" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-[#004F71]">Paystack</div>
                      <div className="text-[10px] text-gray-500 font-bold">Momo / Card</div>
                    </div>
                  </div>
                  {paymentMethod === 'paystack' && (
                    <div className="w-6 h-6 bg-[#004F71] rounded-full flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-[#FFCC00]" />
                    </div>
                  )}
                </div>

                <div 
                  onClick={() => setPaymentMethod('wallet')}
                  className={`cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                    paymentMethod === 'wallet' 
                      ? 'border-[#004F71] bg-[#004F71]/5 shadow-md' 
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                  } ${!user ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                      <Wallet size={20} className="text-[#004F71]" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-[#004F71]">Account Balance</div>
                      <div className="text-[10px] text-gray-500 font-bold">
                        {user ? `Bal: GH₵ ${user.balance.toLocaleString()}` : 'Sign in to use'}
                      </div>
                    </div>
                  </div>
                  {paymentMethod === 'wallet' && (
                    <div className="w-6 h-6 bg-[#004F71] rounded-full flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-[#FFCC00]" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={20} />
                <p className="text-xs font-bold">{error}</p>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">Order Summary</label>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Selected Bundle</span>
                  <span className="font-bold text-gray-900">{activeBundle?.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment Via</span>
                  <span className="font-bold text-gray-900 capitalize">{paymentMethod}</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between text-base">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="font-black text-[#004F71]">GH₵ {activeBundle?.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Action */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</div>
              <div className="text-2xl font-black text-gray-900">GH₵ {activeBundle?.price.toLocaleString() || '0'}</div>
            </div>
            <button
              onClick={handlePurchase}
              disabled={isProcessing || !activeBundle}
              className={`w-full sm:w-auto px-10 py-4 text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 active:scale-95 ${
                paymentMethod === 'wallet' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#004F71] hover:bg-[#003d57]'
              }`}
            >
              {isProcessing ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Confirm and Pay
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickBuyModal;
