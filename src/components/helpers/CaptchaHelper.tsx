import React, { useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaHelperProps {
  code: string;
  onRefresh: () => void;
}

export const CaptchaHelper: React.FC<CaptchaHelperProps> = ({ code, onRefresh }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dark cyber canvas
    ctx.fillStyle = '#0B0F19';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Neon laser grid / noise
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 0, 127, 0.4)' : 'rgba(0, 229, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.bezierCurveTo(
        Math.random() * canvas.width, Math.random() * canvas.height,
        Math.random() * canvas.width, Math.random() * canvas.height,
        Math.random() * canvas.width, Math.random() * canvas.height
      );
      ctx.stroke();
    }

    // Characters with neon glow
    ctx.font = 'bold 24px "Courier New", monospace';
    ctx.textBaseline = 'middle';
    const charSpacing = canvas.width / (code.length + 1);

    for (let i = 0; i < code.length; i++) {
      ctx.save();
      const x = (i + 0.8) * charSpacing;
      const y = canvas.height / 2 + (Math.random() * 6 - 3);
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.35);
      ctx.fillStyle = i % 2 === 0 ? '#FF007F' : '#00E5FF';
      ctx.shadowColor = i % 2 === 0 ? '#FF007F' : '#00E5FF';
      ctx.shadowBlur = 8;
      ctx.fillText(code[i], -10, 0);
      ctx.restore();
    }
  }, [code]);

  return (
    <div className="mt-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl">
      <div className="flex items-center gap-3">
        <canvas
          ref={canvasRef}
          width={180}
          height={48}
          className="border border-slate-700 rounded-lg bg-slate-950 shadow-inner"
        />
        <button
          type="button"
          onClick={onRefresh}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
          title="Regenerate CAPTCHA"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
