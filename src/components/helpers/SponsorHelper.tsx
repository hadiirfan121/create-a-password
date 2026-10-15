import React from 'react';
import { TECH_SPONSORS } from '../../utils/rulesData';
import { Shield } from 'lucide-react';

interface SponsorHelperProps {
  currentPassword: string;
}

export const SponsorHelper: React.FC<SponsorHelperProps> = ({ currentPassword }) => {
  const lowerPwd = currentPassword.toLowerCase();

  return (
    <div className="mt-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
      <div className="text-xs font-semibold text-slate-300">
        Official Association Partners:
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {TECH_SPONSORS.map((sp) => {
          const isPresent = lowerPwd.includes(sp.name.toLowerCase());
          return (
            <div
              key={sp.name}
              className={`p-3 rounded-xl border text-left transition-all ${
                isPresent
                  ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-white ring-1 ring-[#00E5FF]'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <div className="font-mono font-bold text-xs tracking-wider text-white mb-1">
                {sp.name}
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-1">{sp.tag}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
