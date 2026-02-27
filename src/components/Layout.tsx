
import React from 'react';
import Logo from './Logo';
import { 
  ShoppingCart, 
  ShieldCheck, 
  User as UserIcon, 
  Search, 
  Globe, 
  MessageCircle,
  Home,
  Layers,
  Zap,
  MoreHorizontal,
  LogOut,
  History,
  PhoneCall,
  X,
  Flame,
  Bell,
  Bot
} from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onServicesClick?: () => void;
  onHomeClick?: () => void;
  onBuyDataClick?: () => void;
  onAFAClick?: () => void;
  onProfileClick?: () => void;
  onOrderHistoryClick?: () => void;
  onSpecialOffersClick?: () => void;
  onNotificationsClick?: () => void;
  onAssistantClick?: () => void;
  onOpenAdmin?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user, 
  cartCount, 
  onOpenCart, 
  onOpenAuth, 
  onLogout,
  onServicesClick,
  onHomeClick,
  onBuyDataClick,
  onAFAClick,
  onProfileClick,
  onOrderHistoryClick,
  onSpecialOffersClick,
  onNotificationsClick,
  onAssistantClick,
  onOpenAdmin
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = React.useState(false);

  return (
    <div className={`min-h-screen flex flex-col bg-[#F2F2F2] text-gray-900 font-sans ${user ? 'pb-24' : ''}`}>
      {/* Professional Header - MoMo Style */}
      <header className="sticky top-0 z-50 bg-[#004F71] px-6 py-4 flex justify-between items-center shadow-md">
        <button 
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full border-2 border-[#FFCC00] flex items-center justify-center text-[#FFCC00]"
        >
          <UserIcon size={24} />
        </button>
        
        <div className="flex items-center gap-2 cursor-pointer" onClick={onHomeClick}>
          <Logo size={32} />
        </div>

        <button 
          onClick={onNotificationsClick}
          className="relative text-[#FFCC00]"
        >
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#004F71]" />
        </button>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Floating WhatsApp Button (Formerly AI Assistant) */}
      <button 
        onClick={() => window.open('https://chat.whatsapp.com/BpQ4p0t2hM54yKezIpOq6Q', '_blank')}
        className={`fixed ${user ? 'bottom-32' : 'bottom-8'} right-6 z-[400] group`}
      >
        <div className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white hover:scale-110 transition-all active:scale-95">
          <MessageCircle size={32} fill="currentColor" />
        </div>
        <div className="absolute -top-10 right-0 bg-gray-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl pointer-events-none">
          CHAT WITH US
          <div className="absolute bottom-[-4px] right-4 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      </button>

      {/* Bottom Navigation - MoMo Style */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 z-[500] bg-white border-t border-gray-100 px-2 py-3 flex justify-around items-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <button onClick={onHomeClick} className="flex flex-col items-center gap-1 px-3 text-[#004F71]">
            <Home size={24} />
            <span className="text-[10px] font-bold">Home</span>
          </button>
          
          <button 
            onClick={onAFAClick}
            className="flex flex-col items-center gap-1 px-3 text-gray-400"
          >
            <PhoneCall size={24} />
            <span className="text-[10px] font-bold">Transfers</span>
          </button>

          {/* Center Scan Button */}
          <div className="relative -top-6">
            <button className="w-16 h-16 bg-[#FFCC00] rounded-full flex items-center justify-center shadow-lg border-4 border-white active:scale-95 transition-transform">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-[#004F71] rounded-full" />
                <div className="w-2 h-2 bg-[#004F71] rounded-full" />
                <div className="w-2 h-2 bg-[#004F71] rounded-full" />
                <div className="w-2 h-2 bg-[#004F71] rounded-full" />
              </div>
            </button>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-500 whitespace-nowrap">Scan QR</span>
          </div>

          <button 
            onClick={onSpecialOffersClick}
            className="flex flex-col items-center gap-1 px-3 text-gray-400"
          >
            <Flame size={24} />
            <span className="text-[10px] font-bold">Offers</span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className={`flex flex-col items-center gap-1 px-3 transition-colors ${isMoreMenuOpen ? 'text-[#004F71]' : 'text-gray-400'}`}
            >
              <MoreHorizontal size={24} />
              <span className="text-[10px] font-bold">More</span>
            </button>
            
            {isMoreMenuOpen && (
              <div className="absolute bottom-16 right-0 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 animate-in slide-in-from-bottom-4 duration-200">
                <button 
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onOrderHistoryClick?.();
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                >
                  <History size={18} className="text-blue-600" />
                  <span className="text-sm font-bold text-gray-700">Order History</span>
                </button>
                <button 
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onServicesClick?.();
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                >
                  <Layers size={18} className="text-indigo-600" />
                  <span className="text-sm font-bold text-gray-700">Services</span>
                </button>
                <div className="h-px bg-gray-100 my-2 mx-2" />
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl transition-colors text-left text-red-600"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-bold">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
