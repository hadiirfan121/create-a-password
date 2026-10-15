export type AppView = 'WELCOME' | 'RULES_REGULATIONS' | 'GAME';

export interface TeamInfo {
  teamName: string;
  member1: string;
  member2: string;
}

export interface Rule {
  id: number;
  number: number;
  title: string;
  description: string;
  category: 'core' | 'math' | 'cyber' | 'science' | 'advanced';
  validator: (password: string, context: GameContext) => {
    passed: boolean;
    reason?: string;
    detail?: string;
  };
  renderHelper?: boolean;
  hint?: string;
}

export interface GameContext {
  captchaCode: string;
  countryName: string;
  chessBestMove: string;
  chessFen: string;
  sponsorName: string;
  hexColor: string;
}

export type GameStatus = 'PLAYING' | 'VICTORY' | 'GAME_OVER';

export interface GameStats {
  timeRemainingSeconds: number;
  totalTimeSeconds: number;
  highestRuleUnlocked: number;
  satisfiedConstraints: number;
  totalRules: number;
  charactersTyped: number;
}
