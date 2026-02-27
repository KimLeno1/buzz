
import React from 'react';
import { Dataset } from '../types';
import { Users, ChevronRight, BarChart3, ShoppingBag } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface DatasetCardProps {
  dataset: Dataset;
  onAddToCart: (ds: Dataset) => void;
}

const NetworkLogo = ({ category }: { category: string }) => {
  switch (category) {
    case 'MTN':
      return (
        <div className="w-10 h-10 bg-[#FFCC00] rounded-full flex items-center justify-center border-2 border-black/5 shadow-sm overflow-hidden">
          <span className="text-black font-black text-[10px] tracking-tighter">MTN</span>
        </div>
      );
    case 'Telecel':
      return (
        <div className="w-10 h-10 bg-[#E60000] rounded-lg flex items-center justify-center border-2 border-white/20 shadow-sm">
          <span className="text-white font-black text-[10px] tracking-tight">telecel</span>
        </div>
      );
    case 'AirtelTigo':
      return (
        <div className="w-10 h-10 bg-gradient-to-br from-[#00AEEF] to-[#0054A6] rounded-md flex items-center justify-center border-2 border-white/20 shadow-sm">
          <span className="text-white font-black text-[8px] leading-tight text-center">Airtel<br/>Tigo</span>
        </div>
      );
    default:
      return (
        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
          <BarChart3 size={18} className="text-white" />
        </div>
      );
  }
};

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, onAddToCart }) => {
  const isLowStock = dataset.licensesRemaining / dataset.totalLicenses < 0.2;

  const rarityStyles = {
    Standard: 'bg-gray-100 text-gray-600',
    Premium: 'bg-blue-50 text-blue-600',
    Unlimited: 'bg-green-50 text-green-700',
    Exclusive: 'bg-[#004F71] text-[#FFCC00]',
  }[dataset.rarity];

  const networkColors = {
    MTN: 'text-[#FFCC00]',
    Telecel: 'text-red-600',
    AirtelTigo: 'text-blue-600',
    'All-Network': 'text-[#004F71]'
  }[dataset.category];

  const bullets = dataset.description.split(/[;.]/).filter(s => s.trim().length > 0);

  return (
    <div className="group bg-white rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg flex flex-col h-full overflow-hidden">
      {/* Visual Header */}
      <div className="h-44 relative bg-gray-50 p-4 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ minWidth: 0, minHeight: 0 }}>
           <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
             <AreaChart data={dataset.hypeVelocity}>
               <Area 
                 type="monotone" 
                 dataKey="value" 
                 stroke="#4f46e5" 
                 fill="#4f46e5" 
                 strokeWidth={2} 
                 animationDuration={500}
               />
             </AreaChart>
           </ResponsiveContainer>
        </div>
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
             <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm ${rarityStyles}`}>
               {dataset.rarity}
             </span>
             <NetworkLogo category={dataset.category} />
          </div>
          <div>
            <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1 ${networkColors}`}>
              <BarChart3 size={12} /> {dataset.category} NETWORK
            </div>
            <h3 className="text-base font-bold text-gray-900 leading-tight">
              {dataset.title}
            </h3>
            <div className="flex items-center gap-1.5 text-[9px] font-semibold text-gray-400 mt-2">
                <Users size={10} /> {dataset.viewingCount} USERS ACTIVE
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <ul className="text-sm text-gray-500 mb-6 space-y-1.5 flex-1">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 bg-[#004F71]/40 rounded-full flex-shrink-0" />
              <span className="leading-tight font-medium">{bullet.trim()}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Activation Fee</div>
              <div className="text-xl font-bold text-gray-900">GH₵ {dataset.price.toLocaleString()}</div>
            </div>
            <div className="text-right">
               <div className={`text-[10px] font-bold uppercase mb-1 ${isLowStock ? 'text-orange-600' : 'text-gray-400'}`}>
                 {dataset.licensesRemaining} BUNDLES LEFT
               </div>
               <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                 <div 
                   className={`h-full ${isLowStock ? 'bg-orange-500' : 'bg-[#004F71]'}`} 
                   style={{ width: `${(dataset.licensesRemaining / dataset.totalLicenses) * 100}%` }}
                 />
               </div>
            </div>
          </div>

          <button 
            onClick={() => onAddToCart(dataset)}
            className="w-full py-3 bg-[#004F71] text-[#FFCC00] font-black text-sm rounded-xl hover:bg-[#003d57] transition-all flex items-center justify-center gap-2 group/btn shadow-md active:scale-95"
          >
            <ShoppingBag size={16} />
            Buy Now
            <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatasetCard;
