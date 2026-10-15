import React, { useState } from 'react';
import { COMPETITION_RULES } from '../utils/ruleValidators';
import { X, Search, Check, Lock, Shield } from 'lucide-react';

interface RulesIndexModalProps {
  unlockedRulesCount: number;
  passedRuleIds: number[];
  onClose: () => void;
}

export const RulesIndexModal: React.FC<RulesIndexModalProps> = ({
  unlockedRulesCount,
  passedRuleIds,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  const filtered = COMPETITION_RULES.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase()) ||
    `rule ${r.number}`.includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div>
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00E5FF]" />
              <span>Event Constraint Codex ({COMPETITION_RULES.length} Rules)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Rules unfold progressively as active constraints are fulfilled.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-800 bg-slate-900">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search constraints..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filtered.map(r => {
            const isUnlocked = r.number <= unlockedRulesCount;
            const isPassed = passedRuleIds.includes(r.id);

            return (
              <div
                key={r.id}
                className={`p-3.5 rounded-xl border text-xs transition-all ${
                  !isUnlocked
                    ? 'bg-slate-950/40 border-slate-800/40 opacity-40'
                    : isPassed
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold uppercase font-mono text-[11px] text-[#00E5FF]">
                      Rule {r.number}
                    </span>
                    <span className="font-bold text-white">{r.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    {isPassed ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <Check className="w-3.5 h-3.5" /> Satisfied
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-[#FF007F] font-semibold">Active</span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-slate-400 leading-relaxed">{r.description}</div>
                {r.hint && isUnlocked && (
                  <div className="mt-1 text-[11px] font-mono text-[#00E5FF]/90">
                    💡 Hint: {r.hint}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
