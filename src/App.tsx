/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppView, GameContext, GameStatus, TeamInfo } from './types/game';
import { COMPETITION_RULES } from './utils/ruleValidators';
import { generateCaptcha } from './utils/rulesData';
import { sounds } from './utils/audio';
import { bgMusic } from './utils/bgMusic';
import { WelcomePage } from './components/WelcomePage';
import { RulesPage } from './components/RulesPage';
import { Header } from './components/Header';
import { GameHUD } from './components/GameHUD';
import { PasswordInput } from './components/PasswordInput';
import { RuleCard } from './components/RuleCard';
import { CompanionInspector } from './components/CompanionInspector';
import { GameOverModal } from './components/GameOverModal';
import { VictoryModal } from './components/VictoryModal';
import { RulesIndexModal } from './components/RulesIndexModal';

const STRICT_TIMER_SECONDS = 75 * 60; // 75 minutes = 4500 seconds

export default function App() {
  // Navigation Flow
  const [currentView, setCurrentView] = useState<AppView>('WELCOME');

  // Team Registration
  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    teamName: '',
    member1: '',
    member2: '',
  });

  // Game Core State
  const [password, setPassword] = useState<string>('');
  const [unlockedRulesCount, setUnlockedRulesCount] = useState<number>(1);
  const [gameStatus, setGameStatus] = useState<GameStatus>('PLAYING');

  // 75-minute non-stop timer (No restart allowed once entered!)
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(STRICT_TIMER_SECONDS);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals
  const [showRulesIndex, setShowRulesIndex] = useState<boolean>(false);
  const [showInspectorModal, setShowInspectorModal] = useState<boolean>(false);

  // Dynamic context for game rules
  const [context, setContext] = useState<GameContext>({
    captchaCode: generateCaptcha(),
    countryName: 'Japan',
    chessBestMove: 'Bxf7+',
    chessFen: 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    sponsorName: 'NVIDIA',
    hexColor: '#00E5FF',
  });

  const lastPassedRulesRef = useRef<number[]>([]);
  const rulesContainerRef = useRef<HTMLDivElement | null>(null);

  // Audio mute sync
  useEffect(() => {
    sounds.isMuted = isMuted;
  }, [isMuted]);

  // Prevent accidental back / reload during the live game
  useEffect(() => {
    if (currentView !== 'GAME' || gameStatus !== 'PLAYING') return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Game is actively timed! Leaving will invalidate your progress.';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentView, gameStatus]);

  // Background music management during active gameplay
  useEffect(() => {
    if (currentView === 'GAME' && gameStatus === 'PLAYING') {
      bgMusic.play();
    } else if (gameStatus !== 'PLAYING') {
      bgMusic.stop();
    }
  }, [currentView, gameStatus]);

  // 75-minute Timer Interval
  useEffect(() => {
    if (currentView !== 'GAME' || gameStatus !== 'PLAYING') return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameStatus('GAME_OVER');
          sounds.playError();
          bgMusic.stop();
          return 0;
        }
        if (prev <= 60 && prev % 2 === 0) {
          sounds.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentView, gameStatus]);

  // Evaluate all currently unlocked rules
  const ruleResults = COMPETITION_RULES.slice(0, unlockedRulesCount).map((rule) => {
    const result = rule.validator(password, context);
    return {
      rule,
      passed: result.passed,
      detail: result.detail,
    };
  });

  const passedRuleIds = ruleResults.filter((r) => r.passed).map((r) => r.rule.id);
  const allUnlockedPassed = ruleResults.length > 0 && ruleResults.every((r) => r.passed);

  // Sequential rule unlocking
  useEffect(() => {
    if (currentView !== 'GAME' || gameStatus !== 'PLAYING') return;

    if (allUnlockedPassed && unlockedRulesCount < COMPETITION_RULES.length) {
      const nextCount = unlockedRulesCount + 1;
      setUnlockedRulesCount(nextCount);
      sounds.playSuccess();

      setTimeout(() => {
        rulesContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 150);
    } else if (allUnlockedPassed && unlockedRulesCount === COMPETITION_RULES.length) {
      setGameStatus('VICTORY');
    }
  }, [allUnlockedPassed, unlockedRulesCount, currentView, gameStatus]);

  // Audio feedback on breaking rules
  useEffect(() => {
    if (currentView !== 'GAME') return;
    const prevPassed = lastPassedRulesRef.current;
    if (prevPassed.length > 0 && passedRuleIds.length < prevPassed.length) {
      sounds.playError();
    }
    lastPassedRulesRef.current = passedRuleIds;
  }, [passedRuleIds, currentView]);

  // Handlers
  const handleInsertText = useCallback((text: string) => {
    setPassword((prev) => prev + text);
    sounds.playTick();
  }, []);

  const handleRefreshCaptcha = () => {
    setContext((prev) => ({
      ...prev,
      captchaCode: generateCaptcha(),
    }));
    sounds.playTick();
  };

  const timeSpent = STRICT_TIMER_SECONDS - timeRemainingSeconds;

  // View 1: Welcome Page
  if (currentView === 'WELCOME') {
    return (
      <WelcomePage
        teamInfo={teamInfo}
        onUpdateTeam={setTeamInfo}
        onStart={() => setCurrentView('RULES_REGULATIONS')}
      />
    );
  }

  // View 2: Rules & Regulations Page
  if (currentView === 'RULES_REGULATIONS') {
    return (
      <RulesPage
        teamInfo={teamInfo}
        onPlay={() => {
          setCurrentView('GAME');
          setTimeRemainingSeconds(STRICT_TIMER_SECONDS);
          setGameStatus('PLAYING');
        }}
      />
    );
  }

  // View 3: The 75-Minute Challenge Game
  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col font-sans antialiased selection:bg-[#FF007F] selection:text-white relative overflow-hidden">
      {/* Background ambient neon glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FF007F]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top Bar Header with Logo & Team Info (No Restart Option!) */}
      <Header
        teamInfo={teamInfo}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        onOpenRulesGuide={() => setShowRulesIndex(true)}
        onOpenTelemetry={() => setShowInspectorModal(true)}
      />

      {/* Main Game Arena */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Workspace HUD: Locked 75-Minute Timer & Progress */}
        <GameHUD
          timeRemainingSeconds={timeRemainingSeconds}
          initialTimeSeconds={STRICT_TIMER_SECONDS}
          unlockedRulesCount={unlockedRulesCount}
          passedRulesCount={passedRuleIds.length}
          totalRulesCount={COMPETITION_RULES.length}
          teamInfo={teamInfo}
        />

        {/* Telemetry Inspector */}
        <CompanionInspector
          password={password}
          context={context}
          unlockedRulesCount={unlockedRulesCount}
          passedRulesCount={passedRuleIds.length}
        />

        {/* Password Terminal Input Area */}
        <section aria-label="Password entry area" className="w-full">
          <PasswordInput
            value={password}
            onChange={setPassword}
            disabled={gameStatus !== 'PLAYING'}
          />
        </section>

        {/* Active Rules Stack */}
        <section id="rules-container" ref={rulesContainerRef} className="space-y-3 pt-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Active Constraints ({ruleResults.length} Unlocked)
            </h2>
            <span className="text-xs font-mono">
              {allUnlockedPassed ? (
                <span className="text-[#00E5FF] font-semibold">
                  All current rules met! Next constraint unlocking...
                </span>
              ) : (
                <span className="text-[#FF007F]">Resolve highlighted pink rules to advance</span>
              )}
            </span>
          </div>

          <div className="space-y-3">
            {[...ruleResults].reverse().map(({ rule, passed, detail }) => (
              <RuleCard
                key={rule.id}
                rule={rule}
                passed={passed}
                detail={detail}
                context={context}
                password={password}
                onRefreshCaptcha={handleRefreshCaptcha}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t border-slate-800/80 bg-[#070A0F]/90 py-5 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">{teamInfo.teamName || 'Team'}</span>
            <span>·</span>
            <span>75-Minute Arena Run</span>
            <span>·</span>
            <span>{COMPETITION_RULES.length} Constraints Total</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowRulesIndex(true)}
              className="hover:text-[#00E5FF] transition-colors underline"
            >
              Constraint Codex
            </button>
            <button
              type="button"
              onClick={() => setShowInspectorModal(true)}
              className="hover:text-[#FF007F] transition-colors underline"
            >
              System Telemetry
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {gameStatus === 'GAME_OVER' && (
        <GameOverModal
          highestRule={unlockedRulesCount}
          timeSpentSeconds={timeSpent}
          charactersTyped={password.length}
          teamInfo={teamInfo}
          finalPassword={password}
          totalRules={COMPETITION_RULES.length}
        />
      )}

      {gameStatus === 'VICTORY' && (
        <VictoryModal
          finalPassword={password}
          timeSpentSeconds={timeSpent}
          totalRules={COMPETITION_RULES.length}
          teamInfo={teamInfo}
        />
      )}

      {showRulesIndex && (
        <RulesIndexModal
          unlockedRulesCount={unlockedRulesCount}
          passedRuleIds={passedRuleIds}
          onClose={() => setShowRulesIndex(false)}
        />
      )}

      {showInspectorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white font-mono uppercase tracking-wider text-sm">
                System Telemetry Monitor
              </h3>
              <button
                type="button"
                onClick={() => setShowInspectorModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <CompanionInspector
              password={password}
              context={context}
              unlockedRulesCount={unlockedRulesCount}
              passedRulesCount={passedRuleIds.length}
            />
          </div>
        </div>
      )}
    </div>
  );
}
