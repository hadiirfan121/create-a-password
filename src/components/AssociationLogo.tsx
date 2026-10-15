import React from 'react';

interface AssociationLogoProps {
  size?: number;
  className?: string;
  withGlow?: boolean;
}

export const AssociationLogo: React.FC<AssociationLogoProps> = ({
  size = 140,
  className = '',
  withGlow = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ambient glow matching the split logo colors */}
      {withGlow && (
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-60 pointer-events-none transition-all duration-500"
          style={{
            background:
              'radial-gradient(circle at 35% 50%, rgba(255, 0, 127, 0.45) 0%, transparent 60%), radial-gradient(circle at 65% 50%, rgba(0, 229, 255, 0.45) 0%, transparent 60%)',
          }}
        />
      )}

      <svg
        viewBox="0 0 400 400"
        width={size}
        height={size}
        className="relative z-10 drop-shadow-[0_0_20px_rgba(255,0,127,0.35)] drop-shadow-[0_0_30px_rgba(0,229,255,0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Magenta / Pink linear gradient */}
          <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1493" />
            <stop offset="50%" stopColor="#FF007F" />
            <stop offset="100%" stopColor="#C71585" />
          </linearGradient>

          {/* Cyan / Electric Blue linear gradient */}
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="50%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Center pillar split gradients */}
          <linearGradient id="centerPink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF69B4" />
            <stop offset="100%" stopColor="#FF007F" />
          </linearGradient>
          <linearGradient id="centerCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Neon splatter & star sparks around emblem */}
        {/* Pink left sparks */}
        <circle cx="110" cy="140" r="5" fill="#FF007F" opacity="0.8" />
        <circle cx="90" cy="180" r="3.5" fill="#FF1493" opacity="0.9" />
        <circle cx="120" cy="80" r="4" fill="#FF007F" opacity="0.7" />
        <circle cx="70" cy="220" r="3" fill="#FF69B4" opacity="0.85" />
        <circle cx="140" cy="300" r="4.5" fill="#FF007F" opacity="0.75" />
        <circle cx="80" cy="270" r="2.5" fill="#FF1493" opacity="0.8" />

        {/* Cyan right sparks */}
        <circle cx="290" cy="140" r="5" fill="#00E5FF" opacity="0.8" />
        <circle cx="310" cy="180" r="3.5" fill="#38BDF8" opacity="0.9" />
        <circle cx="280" cy="80" r="4" fill="#00FFFF" opacity="0.7" />
        <circle cx="330" cy="220" r="3" fill="#06B6D4" opacity="0.85" />
        <circle cx="260" cy="300" r="4.5" fill="#00E5FF" opacity="0.75" />
        <circle cx="320" cy="270" r="2.5" fill="#38BDF8" opacity="0.8" />

        {/* Horizontal Laser Flares */}
        <line x1="30" y1="200" x2="130" y2="200" stroke="#FF007F" strokeWidth="2.5" opacity="0.9" filter="url(#neonGlow)" />
        <line x1="270" y1="200" x2="370" y2="200" stroke="#00E5FF" strokeWidth="2.5" opacity="0.9" filter="url(#neonGlow)" />

        {/* Vertical Top/Bottom Needle Tips */}
        <line x1="200" y1="20" x2="200" y2="70" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
        <line x1="200" y1="330" x2="200" y2="380" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />

        {/* ================= LEFT HALF (NEON PINK / MAGENTA) ================= */}
        <g id="left-wing" filter="url(#neonGlow)">
          {/* Top Left Spire Chevron */}
          <polygon
            points="198,60 160,110 160,190 198,140"
            fill="url(#centerPink)"
          />
          {/* Left Upper Wing */}
          <polygon
            points="70,195 130,130 150,150 110,195 160,250 140,270 70,195"
            fill="url(#pinkGrad)"
          />
          {/* Left Inner Wing Rib */}
          <polygon
            points="110,205 155,160 170,175 130,220 165,260 150,275 110,205"
            fill="#FF1493"
          />
          {/* Left Lower Diamond Base */}
          <polygon
            points="198,340 115,255 135,235 198,300"
            fill="url(#pinkGrad)"
          />
          <polygon
            points="198,280 155,235 170,220 198,250"
            fill="#FF69B4"
          />
        </g>

        {/* ================= RIGHT HALF (ELECTRIC CYAN / BLUE) ================= */}
        <g id="right-wing" filter="url(#neonGlow)">
          {/* Top Right Spire Chevron */}
          <polygon
            points="202,60 240,110 240,190 202,140"
            fill="url(#centerCyan)"
          />
          {/* Right Upper Wing */}
          <polygon
            points="330,195 270,130 250,150 290,195 240,250 260,270 330,195"
            fill="url(#cyanGrad)"
          />
          {/* Right Inner Wing Rib */}
          <polygon
            points="290,205 245,160 230,175 270,220 235,260 250,275 290,205"
            fill="#00E5FF"
          />
          {/* Right Lower Diamond Base */}
          <polygon
            points="202,340 285,255 265,235 202,300"
            fill="url(#cyanGrad)"
          />
          <polygon
            points="202,280 245,235 230,220 202,250"
            fill="#E0F2FE"
          />
        </g>

        {/* Central Vertical Division Notch (Black fissure through emblem) */}
        <line x1="200" y1="55" x2="200" y2="345" stroke="#050811" strokeWidth="5" />

        {/* Center Diamond Core Accent */}
        <polygon
          points="200,185 212,200 200,215 188,200"
          fill="#FFFFFF"
          opacity="0.95"
          filter="url(#neonGlow)"
        />
      </svg>
    </div>
  );
};
