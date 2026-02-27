
import React, { useState } from 'react';
import { 
  Wifi, 
  Send, 
  Smartphone, 
  Lightbulb, 
  Tv, 
  Store,
  PlusCircle,
  ArrowUpCircle,
  ArrowRightLeft,
  ChevronRight,
  Zap,
  Clock,
  CheckCircle2,
  History,
  ShieldCheck,
  Palette
} from 'lucide-react';
import { User, Dataset } from '../types';

interface UserDashboardProps {
  user: User;
  onShopNow: () => void;
  onViewOrders: () => void;
  onReorder: (dataset: Dataset) => void;
  onAFAClick: () => void;
  onBuyCheckers: () => void;
  onOrderFlyers: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ 
  user, 
  onShopNow, 
  onViewOrders, 
  onReorder,
  onAFAClick,
  onBuyCheckers,
  onOrderFlyers
}) => {
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const services = [
    { label: 'Bundles', icon: <Wifi size={32} />, onClick: onShopNow },
    { label: 'Transfers', icon: <Send size={32} />, onClick: () => {} },
    { label: 'Airtime', icon: <Smartphone size={32} />, onClick: () => {} },
    { label: 'AFA', icon: <ShieldCheck size={32} />, onClick: onAFAClick },
    { label: 'WAEC Checker', icon: <Tv size={32} />, onClick: onBuyCheckers },
    { label: 'Flyer', icon: <Palette size={32} />, onClick: onOrderFlyers },
  ];

  const banners = [
    {
      id: 1,
      image: 'https://picsum.photos/seed/momo1/800/400',
      title: "It's Adventure time on Y'ello Thursdays",
      subtitle: "MTN x MoMo"
    },
    {
      id: 2,
      image: 'https://picsum.photos/seed/momo2/800/400',
      title: "Get 50% Bonus on Data Bundles",
      subtitle: "Limited Time Offer"
    }
  ];

  return (
    <div className="flex flex-col bg-[#F2F2F2] min-h-screen pb-20">
      {/* Greeting Section */}
      <div className="bg-[#004F71] px-6 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-1">
              {getTimeGreeting()}
            </h2>
            <h1 className="text-white text-2xl font-black tracking-tight">
              {user.name || 'Member'}
            </h1>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#FFCC00] border border-white/10">
            <Zap size={24} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Wallet Card Section */}
      <div className="bg-[#004F71] pt-4 pb-20 px-6 rounded-b-[40px] relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 text-center relative">
            <div className="absolute top-0 left-0 bg-[#FFCC00] text-[#004F71] text-[10px] font-black px-3 py-1 rounded-br-xl uppercase tracking-widest">
              Wallet
            </div>
            <div className="mt-4 text-xl font-bold text-[#004F71] tracking-widest">
              {user.phone || '0553877937'}
            </div>
            <div className="mt-2 text-4xl font-black text-[#004F71]">
              GH₵ {user.balance.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Service Grid Section */}
      <div className="px-6 mt-6">
        <div className="grid grid-cols-3 gap-4">
          {services.map((service, idx) => (
            <button 
              key={idx}
              onClick={service.onClick}
              className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <div className="text-[#004F71]">{service.icon}</div>
              <span className="text-[10px] font-bold text-gray-500">{service.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Promotional Banners Section */}
      <div className="px-6 mt-8">
        <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4">
          {banners.map(banner => (
            <div 
              key={banner.id} 
              className="min-w-[85%] relative rounded-3xl overflow-hidden shadow-lg aspect-[2/1]"
            >
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <div className="text-[#FFCC00] text-[10px] font-black uppercase tracking-widest mb-1">
                  {banner.subtitle}
                </div>
                <h4 className="text-white font-bold text-lg leading-tight">
                  {banner.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Activity Section */}
      <div className="px-6 mt-8 mb-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-black text-[#004F71] uppercase tracking-widest">Recent Activity</h3>
          <button onClick={onViewOrders} className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
            VIEW ALL <ChevronRight size={14} />
          </button>
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#004F71]">
              <ArrowRightLeft size={20} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-900">Transfer to 0244123456</div>
              <div className="text-[10px] text-gray-400 font-medium">24 Oct 2024 • 10:45 AM</div>
            </div>
            <div className="text-xs font-black text-red-500">-GH₵ 50.00</div>
          </div>
          <div className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-green-600">
              <PlusCircle size={20} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-900">Wallet Top-up</div>
              <div className="text-[10px] text-gray-400 font-medium">23 Oct 2024 • 03:20 PM</div>
            </div>
            <div className="text-xs font-black text-green-600">+GH₵ 100.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
