import React, { useRef } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [copied, setCopied] = React.useState(false);

  const charCount = value.length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative w-full space-y-2">
      {/* Label and Character Count */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
        <label htmlFor="password-input" className="font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>Password Input Terminal</span>
        </label>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[#00E5FF] tabular-nums font-semibold">
            {charCount} {charCount === 1 ? 'char' : 'chars'}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg"
            title="Copy password"
          >
            {copied ? <Check className="w-3 h-3 text-[#00E5FF]" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Editor Container with Cyber Neon Focus Glow */}
      <div className="relative rounded-2xl border border-slate-800 bg-slate-950/90 focus-within:border-[#00E5FF] focus-within:ring-2 focus-within:ring-[#00E5FF]/20 shadow-2xl transition-all">
        <textarea
          ref={textareaRef}
          id="password-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Enter your password..."
          rows={4}
          className="w-full p-4 font-mono text-base text-slate-100 placeholder:text-slate-600 bg-transparent resize-y rounded-2xl focus:outline-none leading-relaxed"
          autoFocus
        />
      </div>
    </div>
  );
};
