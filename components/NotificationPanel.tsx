
import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  Trash2,
  BellOff,
  Zap,
  ShieldCheck
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'system' | 'admin' | 'promo' | 'alert';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'MTN Network Update',
      message: 'Maintenance scheduled for MTN users tonight from 12 AM to 2 AM. Top-ups might experience slight delays.',
      time: '10 mins ago',
      isRead: false
    },
    {
      id: '2',
      type: 'admin',
      title: 'AFA Status Approved',
      message: 'Hello! Your AFA registration request has been approved. You can now enjoy subsidized data rates.',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: '3',
      type: 'promo',
      title: 'Flash Sale Alert!',
      message: '5GB MTN Data for only GH₵ 10. Valid for the next 3 hours. Claim it now in the special offers panel!',
      time: '5 hours ago',
      isRead: true
    },
    {
      id: '4',
      type: 'system',
      title: 'Welcome to Buy Buzz',
      message: 'Thank you for choosing Ghana\'s #1 data spot. Complete your profile to earn your first 50 XP.',
      time: '1 day ago',
      isRead: true
    }
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertCircle className="text-red-500" size={20} />;
      case 'admin': return <MessageSquare className="text-amber-500" size={20} />;
      case 'promo': return <Zap className="text-indigo-500" size={20} fill="currentColor" />;
      default: return <Info className="text-slate-400" size={20} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'alert': return 'Urgent Alert';
      case 'admin': return 'Support Message';
      case 'promo': return 'Special Offer';
      default: return 'System Notice';
    }
  };

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-end">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-xl h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 shrink-0 bg-white sticky top-0 z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                <Bell size={12} fill="currentColor" /> Notifications Hub
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Stay Updated</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {notifications.filter(n => !n.isRead).length} Unread Messages
            </span>
            <button 
              onClick={markAllRead}
              className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 size={14} /> Mark all as read
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 scrollbar-hide">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-40 py-20">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <BellOff size={40} className="text-slate-300" />
              </div>
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">All caught up!</h4>
              <p className="text-xs text-slate-400 mt-1 font-medium">New updates will appear here</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`group relative bg-white p-6 rounded-[2rem] border transition-all duration-300 ${
                  notif.isRead ? 'border-slate-100 opacity-70' : 'border-indigo-100 shadow-md ring-1 ring-indigo-50'
                }`}
              >
                {!notif.isRead && (
                  <div className="absolute top-6 right-6 w-2 h-2 bg-indigo-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
                )}
                
                <div className="flex gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    notif.type === 'alert' ? 'bg-red-50' : 
                    notif.type === 'admin' ? 'bg-amber-50' : 
                    'bg-indigo-50'
                  }`}>
                    {getIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${
                        notif.type === 'alert' ? 'text-red-500' : 
                        notif.type === 'admin' ? 'text-amber-600' : 
                        'text-indigo-600'
                      }`}>
                        {getTypeLabel(notif.type)}
                      </span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span className="text-[10px] text-slate-400 font-bold">{notif.time}</span>
                    </div>
                    
                    <h5 className="text-sm font-black text-slate-900 mb-1.5 leading-tight">{notif.title}</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{notif.message}</p>
                    
                    <div className="mt-4 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => deleteNotification(notif.id)}
                        className="text-[10px] font-black text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Clear Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 bg-white space-y-4">
           <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3 border border-slate-100">
              <ShieldCheck className="text-indigo-500 shrink-0" size={18} />
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                Critical system alerts cannot be turned off. Promotional notifications can be managed in your account settings.
              </p>
           </div>
           <button 
             onClick={onClose}
             className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all active:scale-[0.98]"
           >
             Close Notifications
           </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
