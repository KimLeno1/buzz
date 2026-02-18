
import React, { useState } from 'react';
import Layout from './components/Layout';
import DatasetCard from './components/DatasetCard';
import { DATASETS } from './constants';
import { Dataset, User, CartItem } from './types';
import { 
  Database, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ShoppingCart, 
  Info, 
  Wifi, 
  Zap, 
  PhoneCall, 
  Palette, 
  GraduationCap, 
  ExternalLink,
  ShieldCheck,
  Headphones,
  LayoutGrid,
  Loader2,
  Copy
} from 'lucide-react';

const App: React.FC = () => {
  const [user] = useState<User>({
    id: 'usr-882',
    rank: 'Analyst',
    xp: 2450,
    balance: 85000
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'MTN', 'Telecel', 'AirtelTigo'];

  const additionalServices = [
    {
      id: 'afa-reg',
      title: 'AFA Registration',
      description: 'Talk more pay less. Register for AFA and enjoy discounted rates on call, SMS, and data. Special bundle for heavy users.',
      icon: <PhoneCall className="text-green-600" size={24} />,
      buttonText: 'Register Now',
      color: 'bg-green-50'
    },
    {
      id: 'flyer-design',
      title: 'Custom Flyer Design',
      description: 'Professional Flyer designs for your business, events or promotions. Get eye-catching viewers converted to customers.',
      icon: <Palette className="text-purple-600" size={24} />,
      buttonText: 'Design Now',
      color: 'bg-purple-50'
    },
    {
      id: 'waec-checker',
      title: 'WAEC Results Checker',
      description: 'Check your WAEC results instantly. Get pins and check results for WAEC, BECE and other examination bodies. Fast and reliable.',
      icon: <GraduationCap className="text-blue-600" size={24} />,
      buttonText: 'Check Now',
      color: 'bg-blue-50'
    }
  ];

  const features = [
    {
      title: 'Fast Delivery',
      description: 'Get your data bundle immediately after validation. Delivery period mostly varies based on network traffic but is typically instant.',
      icon: <Zap className="text-amber-500" size={32} />
    },
    {
      title: 'Secure Payment',
      description: 'Multiple secure payment options with SSL encryption to ensure your transactions and personal details are always protected.',
      icon: <ShieldCheck className="text-emerald-500" size={32} />
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer service and technical support to assist you with any inquiries or issues you might encounter.',
      icon: <Headphones className="text-sky-500" size={32} />
    },
    {
      title: 'One Stop Solution',
      description: 'Data, AFA, Flyers, WAEC Results - all in one convenient place. We simplify your digital needs under one roof.',
      icon: <LayoutGrid className="text-indigo-500" size={32} />
    }
  ];

  const addToCart = (dataset: Dataset) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dataset.id);
      if (existing) {
        return prev.map(item => item.id === dataset.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...dataset, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setCart([]);
      setIsCartOpen(false);
    }, 2500);
  };

  const filteredDatasets = activeCategory === 'All' 
    ? DATASETS 
    : DATASETS.filter(d => d.category === activeCategory);

  return (
    <Layout 
      user={user} 
      cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
      onOpenCart={() => setIsCartOpen(true)}
    >
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-full mb-8">
              <Zap size={12} fill="currentColor" /> Instant Network Delivery Enabled
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Stay Connected with <br />
              <span className="text-indigo-600">Premium Data Bundles.</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-lg font-medium leading-relaxed mb-10">
              Instant top-ups for MTN, Telecel, and AirtelTigo. No more downtime, just pure high-speed connectivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                Browse Bundles <ArrowRight size={18} />
              </button>
              <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all">
                Check Balance
              </button>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-inner relative overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Network Speed Monitor</h4>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  </div>
               </div>
               <div className="space-y-4">
                 {[
                   { name: 'MTN 4G+', speed: '42.5' },
                   { name: 'Telecel Fiber', speed: '38.2' },
                   { name: 'AirtelTigo LTE', speed: '24.1' }
                 ].map((net, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                     <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <Wifi size={20} />
                     </div>
                     <div className="flex-1">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">{net.name}</div>
                        <div className="h-1.5 w-full bg-gray-50 rounded overflow-hidden">
                           <div className="h-full bg-indigo-600 rounded" style={{ width: `${Number(net.speed) * 2}%` }} />
                        </div>
                     </div>
                     <div className="text-xs font-bold text-indigo-600">{net.speed}MB/s</div>
                   </div>
                 ))}
               </div>
               <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>99.9% Network Uptime</span>
                  <span>Verified Top-ups</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-between gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
           <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Instant Crediting</div>
           <div className="flex items-center gap-2"><TrendingUp size={16} /> Market Best Rates</div>
           <div className="flex items-center gap-2"><Database size={16} /> Secure Gateway</div>
           <div className="flex items-center gap-2"><Info size={16} /> 24/7 Support</div>
        </div>
      </section>

      {/* Marketplace Grid */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Available Bundles</h2>
            <p className="text-gray-500 text-sm font-medium">Choose your network and get connected instantly.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                  activeCategory === cat 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDatasets.map(dataset => (
            <DatasetCard key={dataset.id} dataset={dataset} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-b border-gray-100">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Additional Services</h2>
          <p className="text-gray-500 text-sm font-medium">Beyond data, we provide essential tools for your business and personal growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalServices.map(service => (
            <div key={service.id} className="group bg-white rounded-2xl border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:border-indigo-100 relative overflow-hidden">
              <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
                {service.description}
              </p>
              <button className="w-full py-4 bg-gray-900 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all group/btn shadow-md active:scale-95">
                {service.buttonText}
                <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
              
              {/* Subtle background detail */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                {React.cloneElement(service.icon as React.ReactElement, { size: 120 })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-6 md:px-12 py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Why Choose Buy Buzz Data Spot?</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We've built Ghana's most reliable digital marketplace by focusing on what matters most to our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6 p-4 bg-gray-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center">
            <button className="px-10 py-5 bg-indigo-600 text-white font-extrabold rounded-2xl shadow-xl hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 text-lg">
              Get Started Now
              <ArrowRight size={24} />
            </button>
            <p className="mt-6 text-sm text-gray-400 font-medium">Join 50,000+ satisfied customers across Ghana today.</p>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300" />
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-10 text-center shadow-2xl animate-in zoom-in-95 duration-300">
             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <CheckCircle2 size={40} />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
             <p className="text-gray-500 font-medium mb-8">Your data top-up has been successfully validated and is being credited to your number.</p>
             
             <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left border border-gray-100">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200/50">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
                   <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                      #BZ-{(Math.random() * 1000000).toFixed(0)} <Copy size={14} className="cursor-pointer" />
                   </div>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status</span>
                   <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-md">PROCESSED</span>
                </div>
             </div>

             <button 
                onClick={() => setShowSuccess(false)}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all"
             >
               Return to Dashboard
             </button>
          </div>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div 
            className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => !isProcessing && setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
             <div className="flex justify-between items-center mb-12">
                <h3 className="text-xl font-bold text-gray-900">Your Selection</h3>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  disabled={isProcessing}
                  className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  <X size={20} />
                </button>
             </div>

             <div className="flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                       <ShoppingCart className="text-gray-300" size={24} />
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Your selection is empty.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center font-bold text-indigo-600 text-xs">{item.category}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">{item.title}</h4>
                        <div className="text-xs text-gray-500 mt-1 font-medium">GH₵ {item.price.toLocaleString()} x {item.quantity}</div>
                      </div>
                      {!isProcessing && (
                        <button 
                          onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))}
                          className="text-gray-300 hover:text-red-500 transition-colors self-center p-2"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))
                )}
             </div>

             {cart.length > 0 && (
               <div className="pt-8 border-t border-gray-100">
                 <div className="flex justify-between items-end mb-8">
                    <span className="text-sm font-bold text-gray-400">Total Due</span>
                    <span className="text-2xl font-bold text-gray-900">
                      GH₵ {cart.reduce((acc, i) => acc + (i.price * i.quantity), 0).toLocaleString()}
                    </span>
                 </div>
                 <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:bg-indigo-400"
                 >
                   {isProcessing ? (
                     <>
                       <div className="loader" />
                       Verifying Transaction...
                     </>
                   ) : (
                     'Confirm and Recharge'
                   )}
                 </button>
                 <div className="mt-4 text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      Secure PCI-DSS Compliant Gateway
                    </p>
                 </div>
               </div>
             )}
          </div>
        </div>
      )}
    </Layout>
  );
};

// Simple X icon helper
const X = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default App;
