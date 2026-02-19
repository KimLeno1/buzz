
import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, Loader2, Phone } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSecurityClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 5) {
      setIsAdminMode(true);
      setIsLogin(true);
      setClickCount(0);
    }
  };

  // Update isLogin when initialMode changes or modal opens
  React.useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login');
    }
  }, [isOpen, initialMode]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!isLogin && !isAdminMode) {
      // Phone Validation (10 digits)
      if (formData.phone.length !== 10) {
        setError('Phone number must be exactly 10 digits.');
        return;
      }

      // Password Strength Validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        setError('Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({ 
        name: isLogin ? (formData.email.split('@')[0]) : `${formData.firstName} ${formData.lastName}`, 
        email: formData.email 
      });
      onClose();
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === 'phone') {
      value = value.replace(/\D/g, '').substring(0, 10);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all rounded-full border border-white/20"
        >
          <X size={20} />
        </button>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Header Section */}
          <div className="relative h-48 bg-indigo-600 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            </div>
            
            <div className="relative z-10 text-center px-6">
              <div 
                onClick={handleSecurityClick}
                className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-2xl cursor-pointer active:scale-90 transition-transform"
              >
                <ShieldCheck className={isAdminMode ? "text-amber-400" : "text-white"} size={32} />
              </div>
              <h3 className="text-white font-black text-2xl tracking-tight">
                {isAdminMode ? 'Admin Portal' : 'Buy Buzz Spot'}
              </h3>
              <p className="text-indigo-100 text-xs font-bold uppercase tracking-[0.2em] mt-1 opacity-80">
                {isAdminMode ? 'Restricted Access' : 'Secure Gateway'}
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
                {isAdminMode ? 'System Login' : isLogin ? 'Welcome Back' : 'Join the Spot'}
              </h2>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                {isAdminMode 
                  ? 'Authorized personnel only. All access attempts are logged and monitored.'
                  : isLogin 
                  ? 'Access your premium data bundles and manage your digital assets with ease.' 
                  : 'Start your journey with Ghana\'s most reliable data and digital service marketplace.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Kwesi"
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Arthur"
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="024XXXXXXX"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Security Password</label>
                  {isLogin && (
                    <button type="button" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-colors">
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>
              )}

              {error && <p className="text-xs text-red-500 font-bold ml-1">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-5 text-white font-black rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-indigo-400 mt-10 ${
                  isAdminMode ? 'bg-gray-900 hover:bg-black' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    {isAdminMode ? 'Authenticate Admin' : isLogin ? 'Sign In to Account' : 'Create My Account'}
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            {!isAdminMode && (
              <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500 font-bold">
                  {isLogin ? "New to Buy Buzz?" : "Already a member?"}{' '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-indigo-600 font-black hover:text-indigo-700 transition-colors underline underline-offset-4"
                  >
                    {isLogin ? 'Sign Up Now' : 'Sign In Here'}
                  </button>
                </p>
              </div>
            )}

            {isAdminMode && (
              <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <button
                  onClick={() => setIsAdminMode(false)}
                  className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-gray-600 transition-colors"
                >
                  Return to User Login
                </button>
              </div>
            )}
            
            <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale">
               <img src="https://paystack.com/assets/img/login/paystack-logo.png" alt="Paystack" className="h-4" referrerPolicy="no-referrer" />
               <div className="w-px h-4 bg-gray-300" />
               <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
