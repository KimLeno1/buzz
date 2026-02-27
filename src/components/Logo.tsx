
import React from 'react';

const Logo: React.FC<{ className?: string, size?: number, showText?: boolean }> = ({ 
  className = "", 
  size = 40,
  showText = true
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#004F71" />
            <stop offset="100%" stopColor="#FFCC00" />
          </linearGradient>
        </defs>
        {/* Stylized 'B' shape based on the uploaded image */}
        <path
          d="M30 20C20 20 15 25 15 35V65C15 75 20 80 30 80H55C75 80 85 70 85 50C85 30 75 20 55 20H30ZM35 35H55C65 35 70 40 70 50C70 60 65 65 55 65H35V35Z"
          fill="url(#logoGradient)"
          fillRule="evenodd"
        />
        {/* Inner cutout to make it look like a link/loop */}
        <rect x="35" y="42" width="15" height="16" rx="8" fill="#FFCC00" />
      </svg>
      {showText && (
        <div className="mt-1 flex flex-col items-center">
          <span className="text-[#FFCC00] font-black text-[11px] tracking-tight leading-none drop-shadow-[0_0_8px_rgba(255,204,0,0.3)]">BUYBUZZ</span>
          <span className="text-white font-bold text-[7px] tracking-[0.3em] leading-none mt-1 opacity-90">DATASPOT</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
