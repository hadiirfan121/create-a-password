import React from 'react';
import { COUNTRIES } from '../../utils/rulesData';
import { Compass, Globe } from 'lucide-react';

interface CountryHelperProps {
  countryName: string;
}

export const CountryHelper: React.FC<CountryHelperProps> = ({ countryName }) => {
  const country = COUNTRIES.find(c => c.name.toLowerCase() === countryName.toLowerCase()) || COUNTRIES[0];

  return (
    <div className="mt-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Geo card visual */}
        <div className="relative w-44 h-20 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center text-center p-2 overflow-hidden shadow-inner shrink-0">
          <Globe className="w-5 h-5 text-[#00E5FF] mb-1 opacity-80" />
          <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-300">
            {country.continent}
          </span>
        </div>

        {/* Clue only - no answers, no reveal, no hints */}
        <div className="flex-1 space-y-1 text-left">
          <div className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Geo Intelligence Dossier</span>
          </div>
          <p className="text-xs text-slate-400 italic">
            "{country.clue}"
          </p>
        </div>
      </div>
    </div>
  );
};
