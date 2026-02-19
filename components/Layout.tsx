
import React from 'react';
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
  Bell
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
  onNotificationsClick
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = React.useState(false);

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans ${user ? 'pb-20' : ''}`}>
      {/* Top Banner */}
      <div className="bg-indigo-600 text-white px-6 py-2 text-xs font-semibold text-center uppercase tracking-wider relative overflow-hidden">
        <span className="relative z-10">Q4 2024 Connectivity Updates are now live. <a href="#" className="underline ml-1">View Details</a></span>
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      </div>

      {/* Professional Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 md:px-12 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onHomeClick}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Buy Buzz Data Spot</h1>
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-500">
            <button onClick={onBuyDataClick} className="hover:text-indigo-600 transition-colors">Bundles</button>
            <button onClick={onServicesClick} className="hover:text-indigo-600 transition-colors">Services</button>
            <a href="#" className="hover:text-indigo-600 transition-colors">API Portal</a>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold">
              <Globe size={12} className="animate-spin" style={{animationDuration: '3s'}} />
              SYSTEMS ONLINE
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 border border-gray-200">
             <Search size={16} className="text-gray-400 mr-2" />
             <input type="text" placeholder="Search bundles..." className="bg-transparent text-sm outline-none w-48" />
          </div>
          
          <div className="flex items-center gap-1.5">
            <button 
              onClick={onNotificationsClick}
              className="relative p-2 text-gray-400 hover:text-indigo-600 transition-all group"
            >
              <Bell size={22} className="group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            <button 
              onClick={onOpenCart}
              className="relative p-2 text-gray-400 hover:text-indigo-600 transition-all"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          
          <div className="h-8 w-px bg-gray-200 mx-2" />
          
          {user ? (
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={onProfileClick}
            >
               <div className="text-right hidden sm:block">
                 <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tight leading-none mb-1 group-hover:text-indigo-600 transition-colors">Account</div>
                 <div className="text-sm font-bold text-gray-900">GH₵ {user.balance.toLocaleString()}</div>
               </div>
               <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 group-hover:border-indigo-500 group-hover:bg-indigo-50 transition-all">
                 <UserIcon size={18} className="text-gray-600 group-hover:text-indigo-600 transition-colors" />
               </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={onOpenAuth}
                className="hidden sm:block px-4 py-2 text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={onOpenAuth}
                className="px-5 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all active:scale-95"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 px-6 md:px-12 py-16 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6" onClick={onHomeClick}>
              <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-xs">B</div>
              <h2 className="text-lg font-bold cursor-pointer">Buy Buzz Data Spot</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">
              Ghana's premier destination for instant mobile data top-ups.
              Seamlessly connecting thousands of users across all major networks.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <ShieldCheck size={16} className="text-green-500" />
              Instant Network Delivery Guaranteed
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Networks</h3>
            <ul className="text-gray-500 text-sm space-y-3">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">MTN Pulse</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Telecel Mega</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">AirtelTigo Non-Expiry</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Roaming Data</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Support</h3>
            <ul className="text-gray-500 text-sm space-y-3">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Check Status</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Recharge FAQ</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Resources</h3>
            <ul className="text-gray-500 text-sm space-y-3">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Enterprise Portal</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Developer API</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Coverage Map</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Contact Support</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
          <div>&copy; 2024 Buy Buzz Data Spot. All rights reserved.</div>
          <div className="flex gap-6">
            <span className="flex items-center gap-1"><ShieldCheck size={12} /> PCI-DSS Compliant</span>
            <span>Instant Fulfillment</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Chat Icon */}
      <a 
        href="https://chat.whatsapp.com/BpQ4p0t2hM54yKezIpOq6Q" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`fixed ${user ? 'bottom-24' : 'bottom-8'} right-8 z-[400] group`}
      >
        <div className="absolute -top-12 right-0 bg-gray-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl pointer-events-none">
          CHAT WITH US
          <div className="absolute bottom-[-4px] right-4 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
        <div className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:rotate-12 transition-all duration-300 active:scale-95">
          <MessageCircle size={32} fill="currentColor" />
        </div>
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 pointer-events-none" />
      </a>

      {/* Bottom Navigation (Logged In Only) */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 z-[500] bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <button onClick={onHomeClick} className="flex flex-col items-center gap-1 p-2 text-indigo-600">
            <Home size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
          </button>
          <button 
            onClick={onServicesClick}
            className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <Layers size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Services</span>
          </button>
          <button onClick={onBuyDataClick} className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-indigo-600 transition-colors">
            <Zap size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Buy Data</span>
          </button>
          <div className="relative">
            <button 
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${isMoreMenuOpen ? 'text-indigo-600' : 'text-gray-400'}`}
            >
              <MoreHorizontal size={20} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">More</span>
            </button>
            
            {isMoreMenuOpen && (
              <div className="absolute bottom-16 right-0 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 animate-in slide-in-from-bottom-4 duration-200">
                <button 
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onNotificationsClick?.();
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors text-left"
                >
                  <Bell size={18} className="text-slate-500" />
                  <span className="text-sm font-bold text-gray-700">Notifications</span>
                </button>
                <button 
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onSpecialOffersClick?.();
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-amber-50 rounded-xl transition-colors text-left group"
                >
                  <Flame size={18} className="text-amber-500 group-hover:scale-110 transition-transform" fill="currentColor" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-700 leading-tight">Special Offers</span>
                    <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest">Flash Sales</span>
                  </div>
                </button>
                <button 
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onAFAClick?.();
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                >
                  <PhoneCall size={18} className="text-green-600" />
                  <span className="text-sm font-bold text-gray-700">AFA Registration</span>
                </button>
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
          <button 
            onClick={onProfileClick}
            className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <UserIcon size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Account</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Layout;
