import React from 'react';
import { AssociationLogo } from './AssociationLogo';
import { Clock, ShieldAlert, Award, FileText, CheckCircle2 } from 'lucide-react';
import { TeamInfo } from '../types/game';

interface GameOverModalProps {
  highestRule: number;
  timeSpentSeconds: number;
  charactersTyped: number;
  teamInfo: TeamInfo;
  finalPassword: string;
  totalRules: number;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  highestRule,
  timeSpentSeconds,
  charactersTyped,
  teamInfo,
  finalPassword,
  totalRules,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center space-y-6">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF007F] via-white to-[#00E5FF]" />

        <div className="flex flex-col items-center justify-center space-y-3">
          <AssociationLogo size={80} withGlow={true} />
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF007F]">
              Session Terminated · Time Limit Expired
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Challenge Concluded!
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              The allotted 75 minutes have expired. Your team's performance has been logged into the event registry.
            </p>
          </div>
        </div>

        {/* Team Result Scorecard */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-left space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <span className="text-xs text-slate-500 font-mono block">Registered Team:</span>
              <span className="text-base font-bold text-white font-mono">{teamInfo.teamName}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 font-mono block">Members:</span>
              <span className="text-xs text-[#00E5FF] font-mono">
                {teamInfo.member1}{teamInfo.member2 ? ` & ${teamInfo.member2}` : ''}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Rules Unlocked</span>
              <span className="text-lg font-bold font-mono text-[#00E5FF]">
                {highestRule} / {totalRules}
              </span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Time Recorded</span>
              <span className="text-lg font-bold font-mono text-white">
                {formatTime(timeSpentSeconds)}
              </span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Char Length</span>
              <span className="text-lg font-bold font-mono text-[#FF007F]">
                {charactersTyped}
              </span>
            </div>
          </div>
        </div>

        {/* Final Password String */}
        <div className="text-left space-y-1.5">
          <span className="text-xs font-mono font-semibold text-slate-400">
            Final Submitted Password String:
          </span>
          <div className="p-3 bg-slate-950 text-slate-200 rounded-xl font-mono text-xs break-all border border-slate-800 max-h-24 overflow-y-auto">
            {finalPassword || '<Empty Password>'}
          </div>
        </div>

        {/* Official Clause */}
        <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-[11px] text-slate-400 text-left">
          <strong className="text-slate-300">Official Evaluation:</strong> Teams completing the maximum number of constraints in the shortest duration will be awarded top rank by the Event Head.
        </div>
      </div>
    </div>
  );
};
