import React, { useState } from 'react';
import { AssociationLogo } from './AssociationLogo';
import { TeamInfo } from '../types/game';
import { Users, Shield, ArrowRight, Sparkles, Maximize2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface WelcomePageProps {
  teamInfo: TeamInfo;
  onUpdateTeam: (info: TeamInfo) => void;
  onStart: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({
  teamInfo,
  onUpdateTeam,
  onStart,
}) => {
  const [error, setError] = useState('');

  const handleStartClick = () => {
    if (!teamInfo.teamName.trim()) {
      setError('Please enter your Team Name to register.');
      sounds.playError();
      return;
    }
    if (!teamInfo.member1.trim()) {
      setError('Please enter at least Member 1 name.');
      sounds.playError();
      return;
    }
    setError('');
    sounds.playSuccess();

    // Start background music and trigger full screen mode
    try {
      import('../utils/bgMusic').then(({ bgMusic }) => {
        bgMusic.play();
      });
    } catch {
      // Audio context fallback
    }

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        // Fallback if browser security denies without user gesture or in iframe
      });
    }

    onStart();
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col justify-between selection:bg-[#FF007F] selection:text-white relative overflow-hidden">
      {/* Background cyber ambient gradients matching the logo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF007F]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#00E5FF]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-gradient-to-t from-[#FF007F]/10 via-[#00E5FF]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Header bar */}
      <header className="relative z-10 w-full border-b border-slate-800/80 bg-[#070A0F]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AssociationLogo size={36} withGlow={false} />
            <div className="text-left">
              <span className="text-sm font-extrabold tracking-wider uppercase text-white block">
                COMPUTER SCIENCE AND ENGINEERING
              </span>
              <span className="text-[10px] tracking-widest text-[#00E5FF] uppercase block">
                Department Association Arena
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
            <span>75-MINUTE EVENT ARENA</span>
          </div>
        </div>
      </header>

      {/* Main hero card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-[#FF007F]/10 backdrop-blur-xl relative overflow-hidden text-center space-y-8">
          {/* Top glowing strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF007F] via-white to-[#00E5FF]" />

          {/* Association Logo Banner */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative group cursor-pointer transition-transform hover:scale-105 duration-300">
              <AssociationLogo size={140} withGlow={true} />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-[#00E5FF]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF007F]" />
                <span>Association Cryptographic Challenge</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Create a Password 😉
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                A 75-minute high-stakes battle of logic, science, and relentless security constraints. No external help. Total team survival.
              </p>
            </div>
          </div>

          {/* Team Registration Card */}
          <div className="space-y-4 text-left bg-slate-950/60 p-5 sm:p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00E5FF]" />
                <span>Team Registration</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">Max 2 Members</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Team Name <span className="text-[#FF007F]">*</span>
                </label>
                <input
                  type="text"
                  value={teamInfo.teamName}
                  onChange={(e) => onUpdateTeam({ ...teamInfo, teamName: e.target.value })}
                  placeholder="e.g. CyberPhantoms, LogicGate"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Member 1 <span className="text-[#FF007F]">*</span>
                  </label>
                  <input
                    type="text"
                    value={teamInfo.member1}
                    onChange={(e) => onUpdateTeam({ ...teamInfo, member1: e.target.value })}
                    placeholder="Full Name / Handle"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00E5FF] transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Member 2 <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={teamInfo.member2}
                    onChange={(e) => onUpdateTeam({ ...teamInfo, member2: e.target.value })}
                    placeholder="Full Name / Handle"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00E5FF] transition-all font-mono"
                  />
                </div>
              </div>

              {error && (
                <div className="text-xs text-rose-400 font-semibold bg-rose-950/40 border border-rose-800 p-2 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Action Button: START */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleStartClick}
              className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base uppercase tracking-wider text-white shadow-xl transition-all duration-200 flex items-center justify-center gap-3 group relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF007F 0%, #7928CA 50%, #00E5FF 100%)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>START</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-mono">
              <Maximize2 className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Full-screen view will engage automatically upon start</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-[#070A0F]/80 backdrop-blur-md py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-2">
          <span>Official Association Cyber Arena</span>
          <span>·</span>
          <span>75-Minute Timed Challenge</span>
        </div>
      </footer>
    </div>
  );
};
