import React from 'react';
import { Clock, AlertTriangle, ShieldCheck, Users } from 'lucide-react';
import { TeamInfo } from '../types/game';

interface GameHUDProps {
  timeRemainingSeconds: number;
  initialTimeSeconds: number;
  unlockedRulesCount: number;
  passedRulesCount: number;
  totalRulesCount: number;
  teamInfo: TeamInfo;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  timeRemainingSeconds,
  initialTimeSeconds,
  unlockedRulesCount,
  passedRulesCount,
  totalRulesCount,
  teamInfo,
}) => {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemainingSeconds <= 300; // < 5 mins
  const isCriticalTime = timeRemainingSeconds <= 60; // < 1 min

  const progressPercent = Math.max(0, Math.min(100, (timeRemainingSeconds / initialTimeSeconds) * 100));

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md relative overflow-hidden space-y-4">
      {/* Top ambient color strip matching the logo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF007F] via-white to-[#00E5FF]" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: 75-Minute Timer (LOCKED - NO RESTART) */}
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-2xl flex items-center justify-center border transition-all ${
              isCriticalTime
                ? 'bg-[#FF007F]/20 border-[#FF007F] text-[#FF007F] animate-pulse'
                : isLowTime
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'bg-slate-950/80 border-slate-700 text-[#00E5FF]'
            }`}
          >
            <Clock className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span
                className={`text-3xl sm:text-4xl font-mono font-extrabold tracking-tight tabular-nums drop-shadow-sm ${
                  isCriticalTime
                    ? 'text-[#FF007F]'
                    : isLowTime
                    ? 'text-amber-400'
                    : 'text-white'
                }`}
              >
                {formatTime(timeRemainingSeconds)}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 uppercase">
                Locked 75m Run
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 font-medium">
              <span>Time Remaining</span>
              {isLowTime && (
                <span className="text-[#FF007F] font-bold flex items-center gap-1 ml-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> High Urgency!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Team Info & Constraints Solved */}
        <div className="flex flex-col sm:items-end gap-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Users className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="font-bold text-white">{teamInfo.teamName}</span>
            {teamInfo.member1 && (
              <span className="text-slate-500 hidden md:inline">
                ({teamInfo.member1}{teamInfo.member2 ? ` & ${teamInfo.member2}` : ''})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Rules Satisfied:</span>
            <span className="font-mono font-extrabold text-[#00E5FF] text-base">
              {passedRulesCount}
            </span>
            <span className="text-slate-600">/</span>
            <span className="font-mono font-semibold text-slate-300">
              {unlockedRulesCount} Unlocked
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              ({totalRulesCount} total)
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar with Split Gradient */}
      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isCriticalTime
              ? 'bg-[#FF007F]'
              : isLowTime
              ? 'bg-amber-400'
              : 'bg-gradient-to-r from-[#FF007F] via-[#7928CA] to-[#00E5FF]'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
