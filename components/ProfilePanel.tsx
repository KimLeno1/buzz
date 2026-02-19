
import React, { useState } from 'react';
import { 
  X, 
  User as UserIcon, 
  Shield, 
  Wallet, 
  Award, 
  Settings, 
  Bell, 
  ChevronRight, 
  LogOut,
  CreditCard,
  Mail,
  Zap,
  Star,
  Lock,
  ArrowLeft,
  Save,
  Loader2,
  CheckCircle2,
  ArrowUpRight,
  History
} from 'lucide-react';
import { User } from '../types';

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onLogout: () => void;
  onOpenTopUp: () => void;
  onOpenTransfer: () => void;
  onViewTransactions: () => void;
  onUpdateUser: (updatedData: Partial<User>) => void;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ isOpen, onClose, user, onLogout, onOpenTopUp, onOpenTransfer, onViewTransactions, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const RANKS = [
    { name: 'Seeker', minXp: 0, color: 'bg-slate-500' },
    { name: 'Analyst', minXp: 100, color: 'bg-blue-500' },
    { name: 'Oracle', minXp: 230, color: 'bg-indigo-500' },
    { name: 'Master', minXp: 399, color: 'bg-purple-500' },
    { name: 'Legend', minXp: 619, color: 'bg-amber-500' },
  ];

  const currentRankIndex = RANKS.findIndex(r => r.name === user.rank);
  const nextRank = RANKS[currentRankIndex + 1];
  
  const progress = nextRank 
    ? Math.min(100, Math.max(0, ((user.xp - RANKS[currentRankIndex].minXp) / (nextRank.minXp - RANKS[currentRankIndex].minXp)) * 100))
    : 100;

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate update process
    setTimeout(() => {
      onUpdateUser({
        name: formData.name,
        email: formData.email
      });
      setIsSaving(false);
      setShowUpdateSuccess(true);
      setTimeout(() => {
        setShowUpdateSuccess(false);
        setIsEditing(false);
      }, 2000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-0 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-2xl h-full sm:h-auto sm:max-h-[90vh] sm:rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <div className="relative h-48 bg-slate-900 flex items-center px-8 sm:px-12 overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
          
          <div className="relative z-10 flex items-center gap-6 w-full">
            {isEditing ? (
              <button 
                onClick={() => setIsEditing(false)}
                className="p-3 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all rounded-2xl border border-white/20"
              >
                <ArrowLeft size={24} />
              </button>
            ) : (
              <div className="relative">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                  <UserIcon size={40} className="text-white" />
                </div>
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${RANKS[currentRankIndex].color} border-4 border-slate-900 rounded-full flex items-center justify-center text-white`}>
                  <Star size={12} fill="currentColor" />
                </div>
              </div>
            )}
            
            <div className="flex-1">
              <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
                {isEditing ? 'Edit Profile' : (user.name || 'Member')}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">{user.rank}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-white/50 text-[10px] font-black uppercase tracking-widest">{user.xp} XP</span>
              </div>
            </div>

            {!isEditing && (
              <button 
                onClick={onClose}
                className="p-2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all rounded-full border border-white/20"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 scrollbar-hide">
          {isEditing ? (
            <form onSubmit={handleUpdateSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="h-px bg-slate-100 my-4" />

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password (To Confirm Changes)</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password (Optional)</label>
                  <div className="relative group">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="New password"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {showUpdateSuccess && (
                <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-bold">Profile updated successfully!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-5 bg-indigo-600 text-white font-black rounded-3xl shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <Save size={20} />
                    Save Profile Changes
                  </>
                )}
              </button>
            </form>
          ) : (
            <>
              {/* Wallet Section */}
              <div className="space-y-4">
                <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                      <Wallet size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">Wallet Balance</div>
                      <div className="text-xl font-black text-slate-900">GH₵ {user.balance.toLocaleString()}</div>
                    </div>
                  </div>
                  <button 
                    onClick={onViewTransactions}
                    className="p-3 bg-white text-slate-400 rounded-xl hover:text-indigo-600 transition-colors shadow-sm"
                  >
                    <History size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={onOpenTopUp}
                    className="bg-indigo-600 text-white p-6 rounded-3xl flex flex-col gap-4 group hover:bg-indigo-700 transition-all shadow-lg"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <CreditCard size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-black text-sm">Add Funds</div>
                      <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Deposit</div>
                    </div>
                  </button>

                  <button 
                    onClick={onOpenTransfer}
                    className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col gap-4 group hover:bg-black transition-all shadow-lg"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <ArrowUpRight size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-black text-sm">Transfer</div>
                      <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Withdraw</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* XP Progress */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">XP Progress</div>
                    <h4 className="text-sm font-black text-slate-900">Leveling to {nextRank?.name || 'MAX'}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-indigo-600">{Math.round(progress)}%</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <div 
                    className={`h-full ${RANKS[currentRankIndex].color} transition-all duration-1000 ease-out`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Award size={12} className="text-indigo-500" />
                  Complete more orders to earn XP
                </div>
              </div>

              {/* Menu Sections */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Settings</label>
                <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                  {[
                    { icon: <Shield size={18} />, label: 'Security & Privacy', desc: 'Password, 2FA, Login History', action: () => setIsEditing(true) },
                    { icon: <Mail size={18} />, label: 'Email Preferences', desc: 'Updates, Receipts, Marketing', action: () => setIsEditing(true) },
                    { icon: <Settings size={18} />, label: 'Profile Details', desc: 'Update name, email, and password', action: () => setIsEditing(true) }
                  ].map((item, i) => (
                    <button 
                      key={i}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
                          {item.icon}
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-black text-slate-900 leading-none mb-1">{item.label}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{item.desc}</div>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full py-5 bg-red-50 text-red-600 font-black rounded-3xl hover:bg-red-100 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <LogOut size={20} />
                  Sign Out from Device
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
