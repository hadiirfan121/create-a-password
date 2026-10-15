import React, { useState } from 'react';
import {
  calculateDigitsSum,
  isPrime,
  checkUppercaseVowels,
} from '../utils/ruleValidators';
import { GameContext } from '../types/game';
import { Calculator, ChevronDown, ChevronUp, Cpu, Check, AlertCircle } from 'lucide-react';

interface CompanionInspectorProps {
  password: string;
  context: GameContext;
  unlockedRulesCount: number;
  passedRulesCount: number;
}

export const CompanionInspector: React.FC<CompanionInspectorProps> = ({
  password,
  context,
  unlockedRulesCount,
  passedRulesCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { sum: digitSum, digits } = calculateDigitsSum(password);
  const length = password.length;
  const primeStatus = isPrime(length);
  const { passed: vowelsPassed, lowercaseVowels } = checkUppercaseVowels(password);
  const containsLength = length > 0 && password.includes(length.toString());

  return (
    <aside aria-label="Password telemetry and math inspector" className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg backdrop-blur-md">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-slate-950/70 hover:bg-slate-950 flex items-center justify-between text-left transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Cpu className="w-4 h-4 text-[#00E5FF]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            System Telemetry &amp; Constraint Monitor
          </span>
          <span className="text-xs font-mono text-slate-400">
            ({passedRulesCount}/{unlockedRulesCount} satisfied)
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span>{isOpen ? 'Collapse' : 'Expand Details'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Summary strip visible always */}
      <div className="px-4 py-3 bg-slate-900 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div>
          <span className="text-slate-500 block text-[10px] uppercase">Digit Sum</span>
          <span className={`font-bold text-sm ${digitSum === 25 ? 'text-[#00E5FF]' : 'text-slate-200'}`}>
            {digitSum} / 25
          </span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase">Char Length</span>
          <span className={`font-bold text-sm ${primeStatus ? 'text-[#00E5FF]' : 'text-slate-200'}`}>
            {length} {primeStatus ? '(Prime)' : ''}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase">Uppercase Vowels</span>
          <span className={`font-bold text-sm ${vowelsPassed ? 'text-[#00E5FF]' : lowercaseVowels.length > 0 ? 'text-[#FF007F]' : 'text-slate-400'}`}>
            {vowelsPassed ? 'Compliant' : lowercaseVowels.length > 0 ? 'Lowercase' : 'None'}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase">Length Stamp</span>
          <span className={`font-bold text-sm ${containsLength ? 'text-[#00E5FF]' : 'text-slate-400'}`}>
            {containsLength ? `"${length}" Present` : `Needs "${length}"`}
          </span>
        </div>
      </div>

      {/* Expanded detailed breakdown */}
      {isOpen && (
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3 text-xs">
          {/* Digits Breakdown */}
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <div className="font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span className="text-[#00E5FF]">Rule 5: Digits Addition</span>
              <span className="font-mono text-slate-400">Sum = {digitSum}</span>
            </div>
            <div className="text-slate-300 font-mono text-[11px] break-all">
              {digits.length > 0 ? digits.join(' + ') + ` = ${digitSum}` : 'No digits in password'}
            </div>
          </div>

          {/* Vowels Check */}
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <div className="font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span className="text-[#FF007F]">Rule 16: Vowel Capitalization</span>
              <span className="font-mono text-slate-400">
                {vowelsPassed ? 'All Uppercase' : 'Contains Lowercase'}
              </span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              {lowercaseVowels.length > 0
                ? `Lowercase vowels to fix: [${lowercaseVowels.join(', ')}]`
                : 'All detected vowels are properly capitalized.'}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
