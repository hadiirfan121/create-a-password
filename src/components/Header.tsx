import React, { useState } from 'react';
import { AssociationLogo } from './AssociationLogo';
import { TeamInfo } from '../types/game';
import { Volume2, VolumeX, Music, Shield } from 'lucide-react';
import { bgMusic } from '../utils/bgMusic';

interface HeaderProps {
  teamInfo: TeamInfo;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenRulesGuide: () => void;
  onOpenTelemetry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  teamInfo,
  isMuted,
  onToggleMute,
  onOpenRulesGuide,
  onOpenTelemetry,
}) => {
  const [isMusicMuted, setIsMusicMuted] = useState(bgMusic.getIsMuted());

  const handleToggleMusic = () => {
    if (!bgMusic.getIsPlaying()) {
      bgMusic.play();
      setIsMusicMuted(false);
    } else {
      const muted = bgMusic.toggleMute();
      setIsMusicMuted(muted);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070A0F]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Association Brand and Team Name */}
        <div className="flex items-center gap-3 shrink-0">
          <AssociationLogo size={34} withGlow={false} />
          <div>
            <span className="text-sm font-extrabold tracking-wide uppercase text-white block">
              COMPUTER SCIENCE &amp; ENGINEERING
            </span>
            <span className="text-[10px] font-mono text-[#00E5FF] block">
              Team: {teamInfo.teamName || 'Challenger'}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-5 text-xs font-semibold text-slate-400">
          <button
            type="button"
            onClick={onOpenRulesGuide}
            className="hover:text-[#00E5FF] transition-colors whitespace-nowrap"
          >
            Rules Codex (44)
          </button>
          <button
            type="button"
            onClick={onOpenTelemetry}
            className="hover:text-[#FF007F] transition-colors whitespace-nowrap"
          >
            System Telemetry
          </button>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 font-mono">
            75m Non-Stop
          </span>
        </nav>

        {/* Zone 3: Audio controls for Music & FX */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Background Music Toggle */}
          <button
            type="button"
            onClick={handleToggleMusic}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-colors ${
              !isMusicMuted
                ? 'bg-[#00E5FF]/15 border-[#00E5FF]/60 text-[#00E5FF]'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={isMusicMuted ? 'Turn on background suspense soundtrack' : 'Mute background music'}
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isMusicMuted ? 'Music Off' : 'Music On'}</span>
          </button>

          {/* Sound FX Mute */}
          <button
            type="button"
            onClick={onToggleMute}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-colors"
            title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#FF007F]" /> : <Volume2 className="w-4 h-4 text-slate-300" />}
          </button>
        </div>
      </div>
    </header>
  );
};
