import React, { useState } from 'react';
import { AssociationLogo } from './AssociationLogo';
import { TeamInfo } from '../types/game';
import { ShieldAlert, Play, CheckSquare, Square, AlertOctagon, Timer, Lock } from 'lucide-react';
import { sounds } from '../utils/audio';

interface RulesPageProps {
  teamInfo: TeamInfo;
  onPlay: () => void;
}

export const RulesPage: React.FC<RulesPageProps> = ({ teamInfo, onPlay }) => {
  const [isReady, setIsReady] = useState(false);

  const handlePlayClick = () => {
    if (!isReady) {
      sounds.playError();
      return;
    }
    sounds.playFanfare();

    try {
      import('../utils/bgMusic').then(({ bgMusic }) => {
        bgMusic.play();
      });
    } catch {
      // Audio fallback
    }

    // Re-verify fullscreen in case it was dropped
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    onPlay();
  };

  const officialRules = [
    {
      title: 'Team Eligibility',
      text: 'A maximum of two members per team is allowed.',
    },
    {
      title: 'Strict Time Limit',
      text: 'Complete the challenge within the allotted time (75 minutes).',
    },
    {
      title: 'No External Assistance',
      text: 'Mobile phones, AI tools, search engines, and outside help are prohibited.',
    },
    {
      title: 'No Tampering',
      text: 'Using scripts, developer tools, or modifying the game is strictly prohibited.',
    },
    {
      title: 'No Disturbance',
      text: 'Do not share answers, give hints, or disturb other teams.',
    },
    {
      title: 'System Usage',
      text: 'Do not refresh, close, or modify the game without permission. Once started, you cannot restart.',
    },
    {
      title: 'Winner Selection',
      text: 'Teams completing all constraints within the time limit will be given priority. If no team completes the game, the team that satisfies the maximum number of constraints will be declared the winner.',
    },
    {
      title: 'Tie-Breaker',
      text: 'If teams satisfy the same number of constraints, the team that achieves the result in the shortest time will win.',
    },
    {
      title: 'Final Decision Authority',
      text: 'The organizers and the respective Event Head reserve the right to make final decisions regarding the event, interpret the rules, resolve disputes, modify event procedures, or cancel the event if necessary. Their decisions shall be final and binding.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col justify-between selection:bg-[#FF007F] selection:text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FF007F]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 w-full border-b border-slate-800 bg-[#070A0F]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AssociationLogo size={36} withGlow={false} />
            <div>
              <span className="text-sm font-bold tracking-wider uppercase text-white block">
                COMPUTER SCIENCE AND ENGINEERING
              </span>
              <span className="text-[10px] tracking-widest text-[#FF007F] uppercase block">
                Department Association Protocol
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
            <span className="text-slate-500">Team:</span>
            <span className="font-bold text-[#00E5FF]">{teamInfo.teamName}</span>
          </div>
        </div>
      </header>

      {/* Rules Content Container */}
      <main className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col justify-center">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-6">
          {/* Top glowing strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF007F] via-white to-[#00E5FF]" />

          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-[#FF007F]">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Mandatory Competitive Guidelines</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
              Rules & Regulations
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Read carefully. All participants are strictly bound by the following competitive regulations.
            </p>
          </div>

          {/* Rules List Grid */}
          <div className="space-y-3 max-h-[46vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
            {officialRules.map((rule, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-[#FF007F] to-[#00E5FF] text-white flex items-center justify-center text-xs font-mono font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#00E5FF]">
                      {rule.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                      {rule.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Locked In Alert */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/60 flex items-center gap-3 text-left">
            <Lock className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs text-amber-200">
              <strong className="text-amber-300">Point of No Return:</strong> Once you press PLAY, the 75-minute countdown begins immediately. There is no restart button and no going back.
            </div>
          </div>

          {/* Checkbox: "we are ready for the game 😈😈" */}
          <div className="pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsReady(!isReady);
                sounds.playTick();
              }}
              className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-center gap-3 text-sm sm:text-base font-bold ${
                isReady
                  ? 'bg-gradient-to-r from-[#FF007F]/20 to-[#00E5FF]/20 border-[#00E5FF] text-white shadow-lg shadow-[#00E5FF]/10'
                  : 'bg-slate-950/80 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="text-xl">
                {isReady ? (
                  <CheckSquare className="w-6 h-6 text-[#00E5FF]" />
                ) : (
                  <Square className="w-6 h-6 text-slate-500" />
                )}
              </div>
              <span>we are ready for the game 😈😈</span>
            </button>
          </div>

          {/* PLAY Button */}
          <div>
            <button
              type="button"
              disabled={!isReady}
              onClick={handlePlayClick}
              className={`w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base uppercase tracking-wider text-white shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 relative overflow-hidden ${
                isReady
                  ? 'cursor-pointer hover:scale-[1.01] active:scale-[0.99] opacity-100'
                  : 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
              }`}
              style={
                isReady
                  ? {
                      background: 'linear-gradient(135deg, #FF007F 0%, #7928CA 50%, #00E5FF 100%)',
                    }
                  : {}
              }
            >
              <Play className="w-5 h-5 fill-current" />
              <span>PLAY</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 bg-[#070A0F]/90 backdrop-blur-md py-4 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-center gap-2">
          <span>Organizers & Event Heads Decisions are Final</span>
          <span>·</span>
          <span>Strict Competitive Fairness Enforced</span>
        </div>
      </footer>
    </div>
  );
};
