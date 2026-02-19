
import React from 'react';
import { 
  Ticket, 
  History, 
  Palette, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
  badge?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, onClick, color, badge }) => (
  <div 
    onClick={onClick}
    className="group relative bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full active:scale-[0.98]"
  >
    {/* Animated background decoration */}
    <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-bl-[100px] -mr-8 -mt-8`} />
    
    <div className="relative z-10">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 28 }) : icon}
      </div>

      {badge && (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
          <Sparkles size={10} /> {badge}
        </div>
      )}

      <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 flex-1">
        {description}
      </p>

      <div className="flex items-center gap-2 text-sm font-black text-indigo-600 group/link">
        Get Started 
        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);

interface ServicePanelProps {
  onBuyCheckers: () => void;
  onViewMyCheckers: () => void;
  onOrderFlyers: () => void;
  onAFAClick: () => void;
}

const ServicePanel: React.FC<ServicePanelProps> = ({ onBuyCheckers, onViewMyCheckers, onOrderFlyers, onAFAClick }) => {
  return (
    <section id="services-section" className="px-6 md:px-12 py-24 max-w-7xl mx-auto border-b border-gray-100 scroll-mt-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            <Sparkles size={12} fill="currentColor" /> Premium Digital Services
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
            More than just <span className="text-indigo-600">Mobile Data.</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium leading-relaxed">
            We provide essential digital tools to help you succeed in the Ghanaian digital economy.
          </p>
        </div>
        
        <button 
          className="group flex items-center gap-3 text-sm font-black text-gray-400 hover:text-indigo-600 transition-all uppercase tracking-widest"
        >
          Explore All Services <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ServiceCard
          title="Buy Checkers"
          description="Instant Pins for WAEC, BECE, and Placement. Validated instantly and delivered via SMS."
          icon={<Ticket className="text-blue-600" />}
          onClick={onBuyCheckers}
          color="bg-blue-50"
          badge="Popular"
        />
        <ServiceCard
          title="My Checkers"
          description="Access your full purchase history of results checkers and pins anytime from your dashboard."
          icon={<History className="text-amber-600" />}
          onClick={onViewMyCheckers}
          color="bg-amber-50"
        />
        <ServiceCard
          title="Custom Flyers"
          description="Professional graphic design services for your business, events, or social media posts."
          icon={<Palette className="text-purple-600" />}
          onClick={onOrderFlyers}
          color="bg-purple-50"
          badge="Design"
        />
        <ServiceCard
          title="AFA Registration"
          description="Join the community-based telco service. Enjoy massive data benefits at subsidized rates."
          icon={<ShieldCheck className="text-emerald-600" />}
          onClick={onAFAClick}
          color="bg-emerald-50"
          badge="AFA"
        />
      </div>
    </section>
  );
};

export default ServicePanel;
