
import React, { useState } from 'react';
import { 
  X, 
  Palette, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Monitor, 
  Send, 
  Loader2,
  ChevronLeft,
  Zap,
  Target,
  FileText,
  Contact,
  AlertCircle
} from 'lucide-react';

interface FlyerPlan {
  id: 'simple' | 'complex';
  title: string;
  price: number;
  description: string;
  features: string[];
  bestFor: string[];
  color: string;
}

interface FlyerDesignPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlyerDesignPanel: React.FC<FlyerDesignPanelProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'plans' | 'details' | 'contact'>('plans');
  const [selectedPlan, setSelectedPlan] = useState<FlyerPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    purpose: '',
    description: '',
    notes: '',
    whatsapp: '',
    email: ''
  });

  if (!isOpen) return null;

  const plans: FlyerPlan[] = [
    {
      id: 'simple',
      title: 'Simple Flyer Design',
      price: 15,
      description: 'Perfect for basic promotions and announcements',
      color: 'indigo',
      features: [
        'Clean & Professional Layout',
        '2-3 Color Scheme',
        'Basic Graphics & Icons',
        'Text Content Placement',
        '2 Revision Rounds',
        '24-48 Hour Delivery'
      ],
      bestFor: ['Business Promotions', 'Event Announcements', 'Basic Advertisements']
    },
    {
      id: 'complex',
      title: 'Complex Flyer Design',
      price: 20,
      description: 'Advanced designs for maximum impact',
      color: 'purple',
      features: [
        'Creative & Unique Layout',
        'Full Color Palette',
        'Custom Graphics & Illustrations',
        'Photo Editing & Effects',
        '3-4 Revision Rounds',
        'Branding Integration',
        '48-72 Hour Delivery'
      ],
      bestFor: ['Product Launches', 'Corporate Events', 'High-Impact Marketing']
    }
  ];

  const handleSelectPlan = (plan: FlyerPlan) => {
    setSelectedPlan(plan);
    setStep('details');
  };

  const handleDetailsNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('contact');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.whatsapp && !formData.email) {
      setError('Please provide at least a WhatsApp number or an Email address.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  const closePanel = () => {
    setStep('plans');
    setSelectedPlan(null);
    setShowSuccess(false);
    setFormData({ title: '', purpose: '', description: '', notes: '', whatsapp: '', email: '' });
    setError('');
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[800] flex items-center justify-end">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closePanel} />
        <div className="relative bg-white w-full max-w-xl h-full shadow-2xl flex flex-col items-center justify-center p-12 text-center animate-in slide-in-from-right duration-500">
           <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
              <CheckCircle2 size={48} />
           </div>
           <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Order Placed!</h3>
           <p className="text-slate-500 font-medium leading-relaxed mb-10">
             Your <strong>{selectedPlan?.title}</strong> request has been queued. Our lead designer will reach out via {formData.whatsapp ? 'WhatsApp' : 'Email'} shortly to begin the creative process.
           </p>
           <button 
              onClick={closePanel}
              className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95"
           >
             Go Back to Dashboard
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-end">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={closePanel}
      />
      <div className="relative bg-white w-full max-w-xl h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
        {/* Header with Stepper */}
        <div className="p-8 border-b border-slate-100 bg-white sticky top-0 z-20 shrink-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              {step !== 'plans' && (
                <button 
                  onClick={() => setStep(step === 'contact' ? 'details' : 'plans')}
                  className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-50"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {step === 'plans' ? 'Choose Package' : step === 'details' ? 'Design Details' : 'Review & Contact'}
              </h3>
            </div>
            <button onClick={closePanel} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <X size={24} />
            </button>
          </div>
          
          {/* Stepper Dots */}
          <div className="flex items-center gap-2 px-1">
             <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 'plans' ? 'w-8 bg-indigo-600' : 'w-2 bg-indigo-100'}`} />
             <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 'details' ? 'w-8 bg-indigo-600' : 'w-2 bg-indigo-100'}`} />
             <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 'contact' ? 'w-8 bg-indigo-600' : 'w-2 bg-indigo-100'}`} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30 scrollbar-hide">
          {/* STEP 1: PLANS */}
          {step === 'plans' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`group bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer relative overflow-hidden active:scale-[0.98]`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.id === 'complex' && (
                    <div className="absolute top-6 right-6 px-3 py-1 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg z-10">
                      Recommended
                    </div>
                  )}

                  <div className="flex items-start gap-6 mb-8">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 ${
                      plan.id === 'simple' ? 'bg-indigo-50 text-indigo-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                      {plan.id === 'simple' ? <Monitor size={32} /> : <Sparkles size={32} />}
                    </div>
                    <div className="pr-12">
                      <h4 className="text-xl font-black text-slate-900 leading-none mb-2">{plan.title}</h4>
                      <p className="text-sm text-slate-400 font-medium">{plan.description}</p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-sm font-black text-slate-400">GHS</span>
                    <span className="text-4xl font-black text-slate-900">{plan.price.toFixed(2)}</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.slice(0, 4).map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                        <CheckCircle2 size={16} className={`shrink-0 ${plan.id === 'simple' ? 'text-indigo-500' : 'text-purple-500'}`} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg ${
                      plan.id === 'simple' ? 'bg-indigo-600 text-white' : 'bg-purple-600 text-white'
                    }`}>
                    Select {plan.id} <ArrowRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: DESIGN DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleDetailsNext} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <FileText size={20} />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Customize Your {selectedPlan?.id} Flyer</h4>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Flyer Title *</label>
                  <input 
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Grand Opening Sale"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Purpose *</label>
                  <input 
                    required
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    placeholder="e.g., Business Promotion, Church Event"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Content Description *</label>
                  <textarea 
                    required
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="List all the text and info that should be on the flyer..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Additional Notes (Optional)</label>
                  <textarea 
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Colors, themes, or special instructions..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Continue to Contact <ArrowRight size={20} />
              </button>
            </form>
          )}

          {/* STEP 3: REVIEW & CONTACT */}
          {step === 'contact' && (
            <form onSubmit={handleSubmitOrder} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Contact size={20} />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">How should we reach you?</h4>
                </div>

                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Provide at least one contact method so our designers can send you the initial drafts and finalize the design.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp Number</label>
                    <input 
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="024XXXXXXX"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-slate-100" />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">And / Or</span>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-in shake duration-300">
                    <AlertCircle size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
                  </div>
                )}
              </div>

              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
                 <div className="relative z-10">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Fee</div>
                        <div className="text-3xl font-black">GHS {selectedPlan?.price.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-1">
                          <Zap size={14} fill="currentColor" /> Pay on Delivery
                        </div>
                        <div className="text-xs font-medium text-slate-500">Subject to review</div>
                      </div>
                    </div>
                 </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:bg-slate-300"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Processing Order...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Custom Flyer Order
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlyerDesignPanel;
