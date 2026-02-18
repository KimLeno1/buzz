
import React from 'react';
import { ShoppingCart, ShieldCheck, User as UserIcon, Search, Globe } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  cartCount: number;
  onOpenCart: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, cartCount, onOpenCart }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Top Banner */}
      <div className="bg-indigo-600 text-white px-6 py-2 text-xs font-semibold text-center uppercase tracking-wider relative overflow-hidden">
        <span className="relative z-10">Q4 2024 Connectivity Updates are now live. <a href="#" className="underline ml-1">View Details</a></span>
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      </div>

      {/* Professional Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 md:px-12 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Buy Buzz Data Spot</h1>
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Bundles</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Corporate</a>
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
          
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-gray-500 hover:text-indigo-600 transition-all"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>
          
          <div className="h-8 w-px bg-gray-200 mx-2" />
          
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
               <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tight leading-none mb-1">Account</div>
               <div className="text-sm font-bold text-gray-900">GH₵ {user.balance.toLocaleString()}</div>
             </div>
             <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300 cursor-pointer hover:border-indigo-500 transition-colors">
               <UserIcon size={18} className="text-gray-600" />
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 px-6 md:px-12 py-16 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-xs">B</div>
              <h2 className="text-lg font-bold">Buy Buzz Data Spot</h2>
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
    </div>
  );
};

export default Layout;
