import React, { useState } from 'react';
import { Rule, GameContext } from '../types/game';
import { Check, X, Lightbulb } from 'lucide-react';
import { CaptchaHelper } from './helpers/CaptchaHelper';
import { ChessHelper } from './helpers/ChessHelper';
import { CountryHelper } from './helpers/CountryHelper';
import { PeriodicHelper } from './helpers/PeriodicHelper';
import { SponsorHelper } from './helpers/SponsorHelper';
import { CHESS_PUZZLES } from '../utils/rulesData';

interface RuleCardProps {
  rule: Rule;
  passed: boolean;
  detail?: string;
  context: GameContext;
  password: string;
  onRefreshCaptcha: () => void;
}

export const RuleCard: React.FC<RuleCardProps> = ({
  rule,
  passed,
  detail,
  context,
  password,
  onRefreshCaptcha,
}) => {
  const [showHint, setShowHint] = useState(false);

  return (
    <div
      className={`border rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-lg backdrop-blur-md ${
        passed
          ? 'bg-slate-900/80 border-emerald-500/50 text-emerald-100 shadow-emerald-950/30'
          : 'bg-slate-900/90 border-[#FF007F]/70 text-slate-100 shadow-[0_0_20px_rgba(255,0,127,0.12)]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold font-mono ${
              passed
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                : 'bg-[#FF007F] text-white shadow-[0_0_10px_rgba(255,0,127,0.5)]'
            }`}
          >
            {passed ? <Check className="w-4 h-4 stroke-[3]" /> : <X className="w-4 h-4 stroke-[3]" />}
          </div>
          <span className="text-xs font-extrabold font-mono uppercase tracking-wider text-slate-400">
            Rule {rule.number}
          </span>
        </div>

        {detail && (
          <span
            className={`text-xs font-mono px-2.5 py-0.5 rounded-lg border ${
              passed
                ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-300 font-semibold'
                : 'bg-rose-950/60 border-[#FF007F]/40 text-[#FF007F] font-bold'
            }`}
          >
            {detail}
          </span>
        )}
      </div>

      <div className="mt-2.5 text-sm font-medium leading-snug text-slate-200">
        {rule.description}
      </div>

      {/* Small Hint Toggle */}
      {rule.hint && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-[#00E5FF] transition-colors"
          >
            <Lightbulb className="w-3 h-3 text-amber-400" />
            <span>{showHint ? 'Hide small hint' : 'Show small hint'}</span>
          </button>

          {showHint && (
            <div className="mt-1.5 text-[11px] font-mono text-[#00E5FF] bg-slate-950/90 border border-[#00E5FF]/30 p-2.5 rounded-xl flex items-start gap-2 shadow-inner">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Hint: {rule.hint}</span>
            </div>
          )}
        </div>
      )}

      {/* Embedded Helper References */}
      {rule.number === 8 && (
        <SponsorHelper currentPassword={password} />
      )}

      {rule.number === 10 && (
        <CaptchaHelper
          code={context.captchaCode}
          onRefresh={onRefreshCaptcha}
        />
      )}

      {rule.number === 11 && (
        <PeriodicHelper />
      )}

      {rule.number === 12 && (
        <CountryHelper countryName={context.countryName} />
      )}

      {rule.number === 13 && (
        <ChessHelper puzzle={CHESS_PUZZLES[0]} />
      )}

      {rule.number === 17 && (
        <div className="mt-3 p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded-md border border-white/40 shadow-inner"
            style={{ backgroundColor: context.hexColor }}
          />
          <span className="text-xs font-mono font-bold text-white">
            Target Hex Code: {context.hexColor}
          </span>
        </div>
      )}
    </div>
  );
};
