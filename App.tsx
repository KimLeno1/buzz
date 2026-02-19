
import React, { useState } from 'react';
import Layout from './components/Layout';
import DatasetCard from './components/DatasetCard';
import AuthModal from './components/AuthModal';
import QuickBuyModal from './components/QuickBuyModal';
import FlyerOrderModal from './components/FlyerOrderModal';
import FlyerDesignPanel from './components/FlyerDesignPanel';
import CheckerPurchaseModal from './components/CheckerPurchaseModal';
import SpecialOffersPanel from './components/SpecialOffersPanel';
import MyCheckersPanel from './components/MyCheckersPanel';
import NotificationPanel from './components/NotificationPanel';
import WhatsAppJoinModal from './components/WhatsAppJoinModal';
import AFARegistrationModal from './components/AFARegistrationModal';
import ProfilePanel from './components/ProfilePanel';
import OrderPanel from './components/OrderPanel';
import TopUpModal from './components/TopUpModal';
import TransferModal from './components/TransferModal';
import TransactionHistoryPanel from './components/TransactionHistoryPanel';
import UserDashboard from './components/UserDashboard';
import ServicePanel from './components/ServicePanel';
import { DATASETS } from './constants';
import { Dataset, User, CartItem, WalletTransaction } from './types';
import { 
  Database, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ShoppingCart, 
  Info, 
  Wifi, 
  Zap, 
  Phone,
  ShieldCheck,
  Headphones,
  LayoutGrid,
  Copy,
  User as UserIcon,
  History,
  X,
  Wallet,
  CreditCard,
  AlertCircle
} from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [beneficiaryNumber, setBeneficiaryNumber] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);
  const [isFlyerPanelOpen, setIsFlyerPanelOpen] = useState(false);
  const [isCheckerModalOpen, setIsCheckerModalOpen] = useState(false);
  const [isMyCheckersOpen, setIsMyCheckersOpen] = useState(false);
  const [isSpecialOffersOpen, setIsSpecialOffersOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAFAModalOpen, setIsAFAModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrderPanelOpen, setIsOrderPanelOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isTransactionHistoryOpen, setIsTransactionHistoryOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [selectedQuickBuyBundle, setSelectedQuickBuyBundle] = useState<Dataset | null>(null);
  const [lastPurchase, setLastPurchase] = useState<{ bundle: any; beneficiary: string; sender: string; paymentMethod: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cartPaymentMethod, setCartPaymentMethod] = useState<'paystack' | 'wallet'>('paystack');
  const [cartError, setCartError] = useState('');
  
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [claimedFlashSales, setClaimedFlashSales] = useState<string[]>([]);

  const categories = ['All', 'MTN', 'Telecel', 'AirtelTigo'];

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
    if (dataset.isFlashSale && claimedFlashSales.includes(dataset.id)) {
      alert("You have already claimed this flash offer. Flash deals are limited to 1 per user.");
      return;
    }
    setSelectedQuickBuyBundle(dataset);
    setIsQuickBuyOpen(true);
  };

  const handleQuickPurchase = (bundle: Dataset, beneficiaryNumber: string, senderNumber: string, paymentMethod: 'paystack' | 'wallet') => {
    setIsProcessing(true);
    setLastPurchase({ bundle, beneficiary: beneficiaryNumber, sender: senderNumber, paymentMethod });
    
    // Simulate purchase logic
    setTimeout(() => {
      if (paymentMethod === 'wallet' && user) {
        setUser({ ...user, balance: user.balance - bundle.price });
      }

      setIsProcessing(false);
      setShowSuccess(true);
      setCart([]); // Clear cart if any
      
      if (bundle.isFlashSale) {
        setClaimedFlashSales(prev => [...prev, bundle.id]);
      }

      const newTx: WalletTransaction = {
        id: `TX-${Date.now()}`,
        type: 'Purchase',
        amount: bundle.price,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        description: `Purchased ${bundle.title} for ${beneficiaryNumber} (${paymentMethod})`
      };
      setTransactions(prev => [newTx, ...prev]);
    }, 2000);
  };

  const handleCheckerPurchase = (checker: any, phone: string) => {
    setIsProcessing(true);
    setLastPurchase({ 
      bundle: { title: checker.name, price: checker.price }, 
      beneficiary: phone, 
      sender: user?.email || 'Guest',
      paymentMethod: 'paystack'
    });
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      const newTx: WalletTransaction = {
        id: `TX-${Date.now()}`,
        type: 'Purchase',
        amount: checker.price,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        description: `Purchased ${checker.name} for ${phone}`
      };
      setTransactions(prev => [newTx, ...prev]);
    }, 1500);
  };

  const handleCheckout = () => {
    setCartError('');
    if (!beneficiaryNumber || beneficiaryNumber.length < 10 || !senderNumber || senderNumber.length < 10) {
      setCartError('Please enter valid 10-digit phone numbers for both beneficiary and sender.');
      return;
    }

    const total = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
    if (cartPaymentMethod === 'wallet') {
      if (!user) {
        setCartError('Please sign in to use your wallet.');
        return;
      }
      if (user.balance < total) {
        setCartError('Insufficient wallet balance. Please top up or use Paystack.');
        return;
      }
    }

    setIsProcessing(true);
    if (cart.length > 0) {
      setLastPurchase({ 
        bundle: cart[0], 
        beneficiary: beneficiaryNumber, 
        sender: senderNumber,
        paymentMethod: cartPaymentMethod
      });
    }
    setTimeout(() => {
      if (cartPaymentMethod === 'wallet' && user) {
        setUser({ ...user, balance: user.balance - total });
      }

      setIsProcessing(false);
      setShowSuccess(true);
      
      const bundle = cart[0];
      
      if (bundle.isFlashSale) {
        setClaimedFlashSales(prev => [...prev, bundle.id]);
      }

      const newTx: WalletTransaction = {
        id: `TX-${Date.now()}`,
        type: 'Purchase',
        amount: total,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        description: `Purchased ${bundle.title} (Cart) for ${beneficiaryNumber} (${cartPaymentMethod})`
      };
      setTransactions(prev => [newTx, ...prev]);
      
      setCart([]);
      setIsCartOpen(false);
    }, 2500);
  };

  const filteredDatasets = activeCategory === 'All' 
    ? DATASETS 
    : DATASETS.filter(d => d.category === activeCategory);

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser({
      id: `usr-${Math.floor(Math.random() * 1000)}`,
      name: userData.name,
      email: userData.email,
      rank: 'Seeker',
      xp: 0,
      balance: 100
    });

    const hasJoined = localStorage.getItem('wa_joined') === 'true';
    const lastPrompted = localStorage.getItem('wa_prompted_at');
    const now = Date.now();
    
    if (!hasJoined && (!lastPrompted || now - parseInt(lastPrompted) > 24 * 60 * 60 * 1000)) {
      setTimeout(() => {
        setIsWhatsAppModalOpen(true);
        localStorage.setItem('wa_prompted_at', now.toString());
      }, 1000);
    }
  };

  const handleJoinWhatsApp = () => {
    localStorage.setItem('wa_joined', 'true');
    window.open('https://chat.whatsapp.com/BpQ4p0t2hM54yKezIpOq6Q', '_blank');
    setIsWhatsAppModalOpen(false);
  };

  const handleReorder = (dataset: Dataset) => {
    if (dataset.isFlashSale) {
      alert("Flash sales are one-time offers and cannot be re-ordered.");
      return;
    }
    setSelectedQuickBuyBundle(dataset);
    setIsQuickBuyOpen(true);
  };

  const scrollToBundles = () => {
    const element = document.getElementById('bundles-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setTransactions([]);
    setClaimedFlashSales([]);
    setIsProfileOpen(false);
    setIsOrderPanelOpen(false);
    setIsTopUpModalOpen(false);
    setIsTransferModalOpen(false);
    setIsTransactionHistoryOpen(false);
  };

  const handleOpenAFA = () => {
    if (!user) {
      setAuthMode('signup');
      setIsAuthModalOpen(true);
    } else {
      setIsAFAModalOpen(true);
    }
  };

  const handleProfileClick = () => {
    if (!user) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    } else {
      setIsProfileOpen(true);
    }
  };

  const handleOrderHistoryClick = () => {
    if (!user) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    } else {
      setIsOrderPanelOpen(true);
    }
  };

  const handleTopUpSuccess = (amount: number) => {
    if (user) {
      setUser({
        ...user,
        balance: user.balance + amount
      });
      const newTx: WalletTransaction = {
        id: `TX-${Date.now()}`,
        type: 'Top-up',
        amount: amount,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        description: `Wallet top-up via Paystack`
      };
      setTransactions(prev => [newTx, ...prev]);
    }
  };

  const handleTransferSuccess = (amount: number, recipient: string) => {
    if (user) {
      setUser({
        ...user,
        balance: user.balance - amount
      });
      const newTx: WalletTransaction = {
        id: `TX-${Date.now()}`,
        type: 'Transfer',
        amount: amount,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        description: `Withdrawal to Momo wallet (${recipient})`
      };
      setTransactions(prev => [newTx, ...prev]);
    }
  };

  const handleUpdateUser = (updatedData: Partial<User>) => {
    if (user) {
      setUser({
        ...user,
        ...updatedData
      });
    }
  };

  return (
    <Layout 
      user={user} 
      cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
      onOpenCart={() => setIsCartOpen(true)}
      onOpenAuth={() => {
        setAuthMode('login');
        setIsAuthModalOpen(true);
      }}
      onLogout={handleLogout}
      onServicesClick={scrollToServices}
      onHomeClick={scrollToTop}
      onBuyDataClick={scrollToBundles}
      onAFAClick={handleOpenAFA}
      onProfileClick={handleProfileClick}
      onOrderHistoryClick={handleOrderHistoryClick}
      onSpecialOffersClick={() => setIsSpecialOffersOpen(true)}
      onNotificationsClick={() => setIsNotificationOpen(true)}
    >
      {user ? (
        <UserDashboard 
          user={user}
          onShopNow={scrollToBundles}
          onViewOrders={handleOrderHistoryClick}
          onReorder={handleReorder}
        />
      ) : (
        <>
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
                  <button 
                    onClick={scrollToBundles}
                    className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                  >
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

          {/* Member Benefits Section */}
          {!user && (
            <section className="py-12 bg-indigo-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
              </div>
              
              <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                      Exclusive Member Perks
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
                      Why join the spot? <br />
                      <span className="text-indigo-200">Better rates, faster top-ups.</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white shrink-0">
                          <Zap size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm mb-1">1GB for GH₵ 2</h4>
                          <p className="text-indigo-100 text-xs font-medium opacity-80">Exclusive member-only pricing on selected bundles.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white shrink-0">
                          <TrendingUp size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm mb-1">Loyalty Rewards</h4>
                          <p className="text-indigo-100 text-xs font-medium opacity-80">Earn XP and rank up for even bigger discounts.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white shrink-0">
                          <History size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm mb-1">Order History</h4>
                          <p className="text-indigo-100 text-xs font-medium opacity-80">Track all your purchases and reuse numbers easily.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white shrink-0">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm mb-1">Priority Support</h4>
                          <p className="text-indigo-100 text-xs font-medium opacity-80">Get help faster with our dedicated member support.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-auto">
                    <div className="bg-white rounded-3xl p-8 shadow-2xl text-center lg:w-80">
                      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <UserIcon size={32} />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-2">Stop Guessing</h3>
                      <p className="text-gray-500 text-sm font-medium mb-8">
                        Join thousands of smart users getting the best data deals in Ghana.
                      </p>
                      <button 
                        onClick={() => {
                          setAuthMode('signup');
                          setIsAuthModalOpen(true);
                        }}
                        className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
                      >
                        Create Account
                      </button>
                      <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Takes less than 30 seconds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

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
      <section id="bundles-section" className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-b border-gray-100 scroll-mt-20">
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

      {/* Service Panel Section */}
      <ServicePanel 
        onBuyCheckers={() => setIsCheckerModalOpen(true)}
        onViewMyCheckers={() => {
          if (!user) {
            setAuthMode('login');
            setIsAuthModalOpen(true);
          } else {
            setIsMyCheckersOpen(true);
          }
        }}
        onOrderFlyers={() => setIsFlyerPanelOpen(true)}
        onAFAClick={handleOpenAFA}
      />

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
            <button 
              onClick={() => {
                setAuthMode('signup');
                setIsAuthModalOpen(true);
              }}
              className="px-10 py-5 bg-indigo-600 text-white font-extrabold rounded-2xl shadow-xl hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 text-lg"
            >
              Get Started Now
              <ArrowRight size={24} />
            </button>
            <p className="mt-6 text-sm text-gray-400 font-medium">Join 50,000+ satisfied customers across Ghana today.</p>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

      {/* Quick Buy Modal */}
      <QuickBuyModal
        isOpen={isQuickBuyOpen}
        onClose={() => setIsQuickBuyOpen(false)}
        selectedBundle={selectedQuickBuyBundle}
        user={user}
        onPurchase={handleQuickPurchase}
      />

      {/* Checker Purchase Modal */}
      <CheckerPurchaseModal 
        isOpen={isCheckerModalOpen}
        onClose={() => setIsCheckerModalOpen(false)}
        onPurchase={handleCheckerPurchase}
      />

      {/* My Checkers Vault Panel */}
      <MyCheckersPanel 
        isOpen={isMyCheckersOpen}
        onClose={() => setIsMyCheckersOpen(false)}
      />

      {/* Special Offers Panel */}
      <SpecialOffersPanel 
        isOpen={isSpecialOffersOpen}
        onClose={() => setIsSpecialOffersOpen(false)}
        onSelectOffer={handleReorder}
        claimedIds={claimedFlashSales}
      />

      {/* Notification Center Panel */}
      <NotificationPanel 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Flyer Design Panel */}
      <FlyerDesignPanel 
        isOpen={isFlyerPanelOpen}
        onClose={() => setIsFlyerPanelOpen(false)}
      />

      {/* AFA Registration Modal */}
      <AFARegistrationModal 
        isOpen={isAFAModalOpen}
        onClose={() => setIsAFAModalOpen(false)}
        onSuccess={() => setIsAFAModalOpen(false)}
      />

      {/* Profile Panel */}
      {user && (
        <ProfilePanel 
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          onLogout={handleLogout}
          onOpenTopUp={() => setIsTopUpModalOpen(true)}
          onOpenTransfer={() => setIsTransferModalOpen(true)}
          onViewTransactions={() => setIsTransactionHistoryOpen(true)}
          onUpdateUser={handleUpdateUser}
        />
      )}

      {/* Order Panel */}
      {user && (
        <OrderPanel 
          isOpen={isOrderPanelOpen}
          onClose={() => setIsOrderPanelOpen(false)}
          user={user}
          onReorder={handleReorder}
        />
      )}

      {/* Top Up Modal */}
      {user && (
        <TopUpModal 
          isOpen={isTopUpModalOpen}
          onClose={() => setIsTopUpModalOpen(false)}
          user={user}
          onSuccess={handleTopUpSuccess}
        />
      )}

      {/* Transfer Modal */}
      {user && (
        <TransferModal 
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          user={user}
          onSuccess={handleTransferSuccess}
        />
      )}

      {/* Transaction History Panel */}
      {user && (
        <TransactionHistoryPanel 
          isOpen={isTransactionHistoryOpen}
          onClose={() => setIsTransactionHistoryOpen(false)}
          transactions={transactions}
        />
      )}

      {/* WhatsApp Join Modal */}
      <WhatsAppJoinModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        onJoin={handleJoinWhatsApp}
      />

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300" />
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-10 text-center shadow-2xl animate-in zoom-in-95 duration-300">
             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <CheckCircle2 size={40} />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
             <p className="text-gray-500 font-medium mb-8">Your {lastPurchase?.bundle?.title} top-up has been successfully validated and processed via {lastPurchase?.paymentMethod}.</p>
             
             <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left border border-gray-100">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200/50">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</span>
                   <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                      #BZ-{(Math.random() * 1000000).toFixed(0)} <Copy size={14} className="cursor-pointer" />
                   </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest">Item</span>
                    <span className="font-bold text-slate-900">{lastPurchase?.bundle?.title}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest">Recipient</span>
                    <span className="font-bold text-slate-900">{lastPurchase?.beneficiary}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest">Amount</span>
                    <span className="font-bold text-indigo-600">GH₵ {lastPurchase?.bundle?.price?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200/50">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</span>
                   <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-md">SUCCESSFUL</span>
                </div>
             </div>

             <button 
                onClick={() => setShowSuccess(false)}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all"
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
               <div className="pt-8 border-t border-gray-100 space-y-6">
                 <div className="space-y-4">
                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Beneficiary Number</label>
                     <div className="relative">
                       <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                       <input
                         type="tel"
                         placeholder="024XXXXXXX"
                         value={beneficiaryNumber}
                         onChange={(e) => setBeneficiaryNumber(e.target.value.replace(/\D/g, '').substring(0, 10))}
                         className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                       />
                     </div>
                   </div>
                   <div className="space-y-1">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Number (Sender)</label>
                     <div className="relative">
                       <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                       <input
                         type="tel"
                         placeholder="024XXXXXXX"
                         value={senderNumber}
                         onChange={(e) => setSenderNumber(e.target.value.replace(/\D/g, '').substring(0, 10))}
                         className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                       />
                     </div>
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Payment Method</label>
                   <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setCartPaymentMethod('paystack')}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${cartPaymentMethod === 'paystack' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 bg-white'}`}
                      >
                        <CreditCard size={18} className={cartPaymentMethod === 'paystack' ? 'text-indigo-600' : 'text-gray-400'} />
                        <span className="text-[10px] font-bold">Paystack</span>
                      </button>
                      <button 
                        onClick={() => setCartPaymentMethod('wallet')}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${cartPaymentMethod === 'wallet' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-100 bg-white'} ${!user ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                      >
                        <Wallet size={18} className={cartPaymentMethod === 'wallet' ? 'text-emerald-600' : 'text-gray-400'} />
                        <span className="text-[10px] font-bold">Wallet</span>
                      </button>
                   </div>
                 </div>

                 {cartError && (
                   <div className="p-3 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-[10px] font-bold">
                      <AlertCircle size={14} />
                      {cartError}
                   </div>
                 )}

                 <div className="flex justify-between items-end mb-8">
                    <span className="text-sm font-bold text-gray-400">Total Due</span>
                    <span className="text-2xl font-bold text-gray-900">
                      GH₵ {cart.reduce((acc, i) => acc + (i.price * i.quantity), 0).toLocaleString()}
                    </span>
                 </div>
                 <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 ${cartPaymentMethod === 'wallet' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                 >
                   {isProcessing ? (
                     <>
                       <div className="loader" />
                       Verifying...
                     </>
                   ) : (
                     'Confirm and Pay'
                   )}
                 </button>
                 <div className="mt-4 text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      {cartPaymentMethod === 'wallet' ? `Wallet Balance: GH₵ ${user?.balance.toLocaleString()}` : 'Secure Paystack Payment'}
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

export default App;
