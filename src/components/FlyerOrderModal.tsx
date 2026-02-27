
import React, { useState } from 'react';
import { X, Palette, Send, Loader2, CheckCircle2, MessageSquare, Clock, User, Mail, Phone } from 'lucide-react';

interface FlyerOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlyerOrderModal: React.FC<FlyerOrderModalProps> = ({ isOpen, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    flyerType: 'Business',
    description: '',
    urgency: 'Standard'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6">
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
        <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in-95 duration-300">
           <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 size={48} />
           </div>
           <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Order Received!</h3>
           <p className="text-gray-500 font-medium leading-relaxed mb-10">
             Our design team has received your request. We'll review your requirements and contact you via WhatsApp or Email within 2 hours.
           </p>
           <button 
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
              className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95"
           >
             Got it, Thanks!
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="relative h-40 bg-[#004F71] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FFCC00]/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
          
          <div className="relative z-10 text-center px-6">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-2xl">
              <Palette className="text-white" size={28} />
            </div>
            <h3 className="text-white font-black text-2xl tracking-tight">Custom Flyer Design</h3>
            <p className="text-[#FFCC00] text-[10px] font-bold uppercase tracking-[0.2em] mt-1 opacity-80">Professional Creative Services</p>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all rounded-full border border-white/20"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 sm:p-10 scrollbar-hide">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004F71] transition-colors" size={18} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ama Serwaa"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">WhatsApp Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004F71] transition-colors" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="024XXXXXXX"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004F71] transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Flyer Category</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004F71] transition-colors" size={18} />
                  <select
                    name="flyerType"
                    value={formData.flyerType}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all appearance-none"
                  >
                    <option value="Business">Business / Corporate</option>
                    <option value="Event">Event / Party</option>
                    <option value="Church">Church / Religious</option>
                    <option value="Funeral">Funeral / Memorial</option>
                    <option value="Social Media">Social Media Post</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Delivery Urgency</label>
                <div className="relative group">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004F71] transition-colors" size={18} />
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all appearance-none"
                  >
                    <option value="Standard">Standard (24-48 Hours)</option>
                    <option value="Express">Express (Under 12 Hours)</option>
                    <option value="Instant">Super Fast (Under 4 Hours)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Design Requirements</label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your design needs, colors, text to include, etc..."
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#004F71]/10 focus:border-[#004F71] outline-none transition-all resize-none"
              />
            </div>

            <div className="bg-[#004F71]/5 rounded-2xl p-6 border border-[#004F71]/10 flex items-start gap-4">
               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#004F71] shadow-sm shrink-0">
                  <Palette size={20} />
               </div>
               <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Pricing Note</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Final pricing depends on complexity and urgency. Our team will provide a quote immediately after reviewing your brief.
                  </p>
               </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-5 bg-[#004F71] text-white font-black rounded-2xl shadow-[0_20px_50px_rgba(0,79,113,0.3)] hover:bg-[#003d57] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-slate-400"
            >
              {isProcessing ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Submit Design Request
                  <Send size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FlyerOrderModal;
