import React from 'react';
import { ChessPuzzle } from '../../utils/rulesData';
import { Target } from 'lucide-react';

interface ChessHelperProps {
  puzzle: ChessPuzzle;
}

export const ChessHelper: React.FC<ChessHelperProps> = ({ puzzle }) => {
  const parseFenRows = (fen: string) => {
    const boardPart = fen.split(' ')[0];
    const rows = boardPart.split('/');
    return rows.map(row => {
      const squares: string[] = [];
      for (const char of row) {
        if (/\d/.test(char)) {
          const emptyCount = parseInt(char, 10);
          for (let i = 0; i < emptyCount; i++) squares.push('');
        } else {
          squares.push(char);
        }
      }
      return squares;
    });
  };

  const board = parseFenRows(puzzle.fen);

  const pieceUnicode: Record<string, string> = {
    p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
    P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔'
  };

  return (
    <div className="mt-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* 8x8 Chessboard */}
        <div className="border-2 border-slate-700 rounded-xl overflow-hidden shadow-lg shrink-0">
          <div className="grid grid-cols-8 w-44 h-44">
            {board.map((row, rIdx) =>
              row.map((sq, cIdx) => {
                const isLight = (rIdx + cIdx) % 2 === 0;
                const isWhitePiece = sq && sq === sq.toUpperCase();
                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`flex items-center justify-center font-bold text-base select-none ${
                      isLight ? 'bg-slate-800 text-slate-200' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    {sq ? (
                      <span className={isWhitePiece ? 'text-[#00E5FF] drop-shadow-[0_0_4px_rgba(0,229,255,0.4)]' : 'text-slate-400'}>
                        {pieceUnicode[sq] || sq}
                      </span>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Puzzle prompt */}
        <div className="flex-1 space-y-1.5 text-left">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00E5FF] flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#FF007F]" />
            <span>White to Move</span>
          </div>
          <div className="text-xs text-slate-300">
            Find the winning tactical move and enter standard algebraic notation.
          </div>
        </div>
      </div>
    </div>
  );
};
