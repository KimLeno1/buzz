
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Flame, 
  Zap, 
  Timer, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShoppingBag,
  Sparkles,
  Percent
} from 'lucide-react';
import { Dataset } from '../types';

interface SpecialOffersPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOffer: (dataset: Dataset) => void;
  claimedIds?: string[];
}

const SpecialOffersPanel: React.FC<SpecialOffersPanelProps> = ({ isOpen, onClose, onSelectOffer, claimedIds = [] }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 12 });

  // Simulate a countdown timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const flashSales = [
    {
      id: 'flash-001',
      title: 'Midnight Blaze: 10GB',
      price: 18,
      originalPrice: 45,
      stock: 12,
      totalStock: 50,
      category: 'MTN',
      rarity: 'Exclusive',
      description: 'Super-speed 4G data valid for 7 days. Limit 1 per user.',
      isFlashSale: true
    },
    {
      id: 'flash-002',
      title: 'Mega Rush: 20GB',
      price: 32,
      originalPrice: 75,
      stock: 4,
      totalStock: 20,
      category: 'Telecel',
      rarity: 'Unlimited',
      description: 'High capacity fiber-speed data for streaming and gaming.',
      isFlashSale: true
    }
  ];

  const smartOffers = [
    {
      id: 'smart-001',
      title: 'Student Saver Pack (5GB)',
      price: 8,
      category: 'AirtelTigo',
      badge: 'Best Value',
      icon: <Sparkles className="text-indigo-500" />
    },
    {
      id: 'smart-002',
      title: 'Working Professional (50GB)',
      price: 180,
      category: 'MTN',
      badge: 'Productivity',
      icon: <TrendingUp className="text-emerald-500" />
    }
  ];

  return (
    <div className="fixed inset-0 z-[750] flex items-center justify-end">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-xl h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 shrink-0 bg-white sticky top-0 z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                <Flame size={12} fill="currentColor" className="animate-pulse" /> Smart Flash Sales
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Exclusive Deals</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Countdown Banner */}
          <div className="bg-slate-900 rounded-3xl p-5 flex items-center justify-between text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <Timer className="text-amber-400" size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Refresh In</div>
                <div className="flex items-center gap-1 font-black text-xl">
                  <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span className="text-slate-500">:</span>
                  <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-amber-500/20">
              Active Now
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 bg-slate-50/30 scrollbar-hide">
          {/* Flash Sales Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Zap size={14} className="text-amber-500" fill="currentColor" /> Limited Flash Deals
              </h4>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Updates Daily</span>
            </div>
            
            <div className="space-y-4">
              {flashSales.map((offer) => {
                const isClaimed = claimedIds.includes(offer.id);
                return (
                  <div key={offer.id} className={`bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden active:scale-[0.98] ${isClaimed ? 'grayscale opacity-80 pointer-events-none' : ''}`}>
                    <div className="absolute top-0 right-0 p-4">
                      {isClaimed ? (
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex flex-col items-center justify-center border border-emerald-100">
                          <CheckCircle2 size={24} />
                          <span className="text-[8px] font-bold uppercase mt-1">CLAIMED</span>
                        </div>
                      ) : (
                        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex flex-col items-center justify-center border border-red-100 group-hover:scale-110 transition-transform">
                          <span className="text-lg font-black leading-none">-{Math.round((1 - offer.price/offer.originalPrice)*100)}%</span>
                          <span className="text-[8px] font-bold uppercase">OFF</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                      <div className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
                        offer.category === 'MTN' ? 'bg-[#FFCC00] text-black' : 'bg-[#E60000] text-white'
                      }`}>
                        {offer.category}
                      </div>
                      <div className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{offer.rarity}</span>
                    </div>

                    <h5 className="text-xl font-black text-slate-900 mb-2 leading-tight pr-16">{offer.title}</h5>
                    <p className="text-xs text-slate-500 font-medium mb-8 leading-relaxed">{offer.description}</p>

                    <div className="flex items-end justify-between mb-6">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-slate-900">GH₵ {offer.price}</span>
                          <span className="text-sm font-bold text-slate-400 line-through">GH₵ {offer.originalPrice}</span>
                        </div>
                        <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mt-1">Special Flash Price</div>
                      </div>
                    </div>

                    {/* Stock Indicator */}
                    {!isClaimed && (
                      <div className="space-y-2 mb-8">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className={offer.stock < 10 ? 'text-red-500' : 'text-slate-400'}>
                            {offer.stock < 10 ? 'Nearly Gone!' : 'Availability'}
                          </span>
                          <span className="text-slate-900">{offer.stock} Left</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${offer.stock < 10 ? 'bg-red-500' : 'bg-amber-500'}`}
                            style={{ width: `${(offer.stock / offer.totalStock) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={() => !isClaimed && onSelectOffer(offer as any)}
                      disabled={isClaimed}
                      className={`w-full py-4 font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl ${
                        isClaimed 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                        : 'bg-slate-900 text-white hover:bg-black group-hover:-translate-y-1'
                      }`}
                    >
                      {isClaimed ? 'Offer Already Claimed' : 'Claim Flash Offer'} 
                      {isClaimed ? <CheckCircle2 size={18} /> : <ShoppingBag size={18} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Smart Recommendations Section */}
          <section className="space-y-4">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-2">
              <Sparkles size={14} className="text-indigo-500" /> Smart Picks For You
            </h4>
            
            <div className="grid grid-cols-1 gap-4">
              {smartOffers.map((offer) => (
                <div 
                  key={offer.id} 
                  onClick={() => onSelectOffer(offer as any)}
                  className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all cursor-pointer hover:shadow-md"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {offer.icon}
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase tracking-widest rounded-md mb-1.5">
                        {offer.badge}
                      </div>
                      <h6 className="font-black text-slate-900 leading-tight">{offer.title}</h6>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-slate-900">GH₵ {offer.price}</div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase justify-end mt-1">
                      Explore <ArrowRight size={10} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/4 -translate-y-1/4 blur-3xl" />
             <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                   <Percent size={24} className="text-white" />
                </div>
                <h4 className="text-2xl font-black mb-2 tracking-tight">Refer & Earn Data</h4>
                <p className="text-indigo-100 text-sm font-medium mb-6 leading-relaxed opacity-80">
                  Invite your friends to the spot and get a GH₵ 5.00 top-up bonus when they make their first bundle purchase.
                </p>
                <button className="px-6 py-3 bg-white text-indigo-600 font-black rounded-xl text-xs uppercase tracking-widest hover:bg-indigo-50 transition-colors">
                   Invite Friends
                </button>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 bg-white">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-100 text-slate-900 font-black rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffersPanel;
