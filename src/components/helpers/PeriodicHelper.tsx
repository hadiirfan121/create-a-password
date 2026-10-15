import React, { useState } from 'react';
import { PERIODIC_TABLE } from '../../utils/rulesData';
import { Atom, Search } from 'lucide-react';

export const PeriodicHelper: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = PERIODIC_TABLE.filter(el =>
    el.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    el.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 8);

  return (
    <div className="mt-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5">
      <div className="flex items-center justify-between text-xs font-mono text-slate-300">
        <div className="flex items-center gap-1.5 font-semibold text-[#00E5FF]">
          <Atom className="w-4 h-4" />
          <span>Periodic Table Reference</span>
        </div>
        <span className="text-slate-500 text-[11px]">Chemical elements search</span>
      </div>

      {/* Search Bar only - no auto insert */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search element by name or symbol..."
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#00E5FF]"
        />
      </div>

      {searchTerm && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
          {filtered.map(el => (
            <div
              key={el.symbol}
              className="p-2 text-left bg-slate-900 border border-slate-800 rounded-lg text-xs"
            >
              <div className="font-bold text-[#00E5FF] font-mono">{el.symbol}</div>
              <div className="text-[10px] text-slate-400">{el.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
