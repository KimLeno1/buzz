
import React from 'react';
import { X, MessageCircle, ArrowRight, BellRing } from 'lucide-react';

interface WhatsAppJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
}

const WhatsAppJoinModal: React.FC<WhatsAppJoinModalProps> = ({ isOpen, onClose, onJoin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="relative h-48 bg-[#25D366] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
          
          <div className="relative z-10 text-center px-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-2xl">
              <MessageCircle className="text-white" size={40} fill="currentColor" />
            </div>
            <h3 className="text-white font-black text-2xl tracking-tight">Join Our Community</h3>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all rounded-full border border-white/20"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 sm:p-10 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Stay Updated!</h2>
          <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8">
            Get instant alerts on new data bundles, exclusive discounts, and 24/7 support by joining our official WhatsApp community.
          </p>

          <div className="space-y-3">
            <button
              onClick={onJoin}
              className="w-full py-5 bg-[#25D366] text-white font-black rounded-2xl shadow-[0_20px_50px_rgba(37,211,102,0.3)] hover:bg-[#1eb956] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Join WhatsApp Group
              <ArrowRight size={20} />
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              <BellRing size={18} />
              Remind Me Later
            </button>
          </div>
          
          <p className="mt-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Trusted by 50,000+ users in Ghana
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppJoinModal;
