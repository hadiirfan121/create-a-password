import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { AssociationLogo } from './AssociationLogo';
import { Trophy, Copy, Check, Award, CheckCircle } from 'lucide-react';
import { sounds } from '../utils/audio';
import { TeamInfo } from '../types/game';

interface VictoryModalProps {
  finalPassword: string;
  timeSpentSeconds: number;
  totalRules: number;
  teamInfo: TeamInfo;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  finalPassword,
  timeSpentSeconds,
  totalRules,
  teamInfo,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      import('../utils/bgMusic').then(({ bgMusic }) => {
        bgMusic.stop();
      });
    } catch {
      // Ignore
    }
    sounds.playFanfare();

    const count = 250;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#FF007F', '#00E5FF', '#FFFFFF'] });
    fire(0.2, { spread: 60, colors: ['#FF007F', '#00E5FF'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#00E5FF', '#FF007F'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#FF007F', '#00E5FF'] });
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs}s`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center space-y-6">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF007F] via-white to-[#00E5FF]" />

        <div className="flex flex-col items-center justify-center space-y-3">
          <AssociationLogo size={90} withGlow={true} />
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#00E5FF]">
              <Trophy className="w-4 h-4 text-[#FF007F]" />
              <span>Flawless Cryptographic Mastery</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">
              ALL CONSTRAINTS SOLVED!
            </h2>
            <p className="text-xs text-slate-400">
              Team <strong className="text-white">{teamInfo.teamName}</strong> has officially solved all {totalRules} constraints in the 75-minute arena.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950 border border-slate-800 rounded-2xl text-left">
          <div>
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">Time Recorded</span>
            <span className="text-lg font-bold font-mono text-white">
              {formatTime(timeSpentSeconds)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">Rules Mastered</span>
            <span className="text-lg font-bold font-mono text-[#00E5FF]">
              {totalRules} / {totalRules}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">Final Length</span>
            <span className="text-lg font-bold font-mono text-[#FF007F]">
              {finalPassword.length} chars
            </span>
          </div>
        </div>

        {/* Password Display Box */}
        <div className="text-left space-y-1.5">
          <span className="text-xs font-mono font-semibold text-slate-300">
            Certified Master Password:
          </span>
          <div className="p-3 bg-slate-950 text-[#00E5FF] rounded-xl font-mono text-xs break-all max-h-24 overflow-y-auto border border-slate-800 shadow-inner">
            {finalPassword}
          </div>
        </div>

        {/* Copy Button */}
        <div>
          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-3.5 px-4 text-xs font-mono font-bold uppercase tracking-wider text-white rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #FF007F 0%, #7928CA 50%, #00E5FF 100%)',
            }}
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Final Password!' : 'Copy Certified Password'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
