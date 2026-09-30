import React, { useEffect, useState, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { Terminal, RefreshCw, Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface CyberTypingDescriptionProps {
  text: string;
  highlights?: string[];
  tone?: "cyan" | "violet" | "emerald" | "amber";
  promptLabel?: string;
  speed?: number;
  motionPaused?: boolean;
  lowDataMode?: boolean;
  className?: string;
  replayable?: boolean;
}

const TONE_STYLES = {
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-950/15",
    prompt: "text-cyan-400",
    cursor: "text-cyan-400 bg-cyan-400",
    highlight: "text-cyan-200 font-semibold underline decoration-cyan-500/40 underline-offset-2",
    glow: "shadow-[inset_0_1px_0_rgba(34,211,238,0.15),0_0_15px_rgba(34,211,238,0.08)]",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  },
  violet: {
    border: "border-violet-500/30",
    bg: "bg-violet-950/15",
    prompt: "text-violet-400",
    cursor: "text-violet-400 bg-violet-400",
    highlight: "text-violet-200 font-semibold underline decoration-violet-500/40 underline-offset-2",
    glow: "shadow-[inset_0_1px_0_rgba(167,139,250,0.15),0_0_15px_rgba(167,139,250,0.08)]",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-950/15",
    prompt: "text-emerald-400",
    cursor: "text-emerald-400 bg-emerald-400",
    highlight: "text-emerald-200 font-semibold underline decoration-emerald-500/40 underline-offset-2",
    glow: "shadow-[inset_0_1px_0_rgba(16,185,129,0.15),0_0_15px_rgba(16,185,129,0.08)]",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-950/15",
    prompt: "text-amber-400",
    cursor: "text-amber-400 bg-amber-400",
    highlight: "text-amber-200 font-semibold underline decoration-amber-500/40 underline-offset-2",
    glow: "shadow-[inset_0_1px_0_rgba(251,191,36,0.15),0_0_15px_rgba(251,191,36,0.08)]",
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
};

export function CyberTypingDescription({
  text,
  highlights = [],
  tone = "cyan",
  promptLabel = "sys.desc",
  speed = 14,
  motionPaused = false,
  lowDataMode = false,
  className = "",
  replayable = true,
}: CyberTypingDescriptionProps) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = !reduceMotion && !motionPaused && !lowDataMode;
  const [displayedLength, setDisplayedLength] = useState(shouldAnimate ? 0 : text.length);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(!shouldAnimate);
  const [copied, setCopied] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const colors = TONE_STYLES[tone] || TONE_STYLES.cyan;

  const startTyping = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    setDisplayedLength(0);
    setIsTyping(true);
    setIsComplete(false);

    let current = 0;
    const total = text.length;

    timerRef.current = setInterval(() => {
      // Small randomized burst cadence for authentic cyber packet telemetry feel
      const increment = Math.random() > 0.85 ? 2 : 1;
      current = Math.min(total, current + increment);
      setDisplayedLength(current);

      if (current >= total) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsTyping(false);
        setIsComplete(true);
      }
    }, speed);
  }, [text, speed]);

  // Observer to trigger when scrolled into view
  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayedLength(text.length);
      setIsComplete(true);
      setIsTyping(false);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          startTyping();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [shouldAnimate, startTyping, text.length]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    startTyping();
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopied(true);
    toast.success("Project description copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  // Render text up to displayedLength with highlighted chunks if specified
  const renderFormattedText = () => {
    const currentSubstr = text.slice(0, displayedLength);

    if (highlights.length === 0) {
      return <span>{currentSubstr}</span>;
    }

    // Build regex to match any highlight keyword safely
    const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const regex = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = currentSubstr.split(regex);

    return (
      <>
        {parts.map((part, idx) => {
          const isMatch = highlights.some((h) => h.toLowerCase() === part.toLowerCase());
          if (isMatch) {
            return (
              <strong key={idx} className={colors.highlight}>
                {part}
              </strong>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`cyber-typing-block relative my-4 rounded-lg border ${colors.border} ${colors.bg} ${colors.glow} p-3.5 sm:p-4 font-mono text-[12.5px] leading-relaxed backdrop-blur-md transition-all duration-300 group/cyber ${className}`}
    >
      {/* Cyber terminal header line */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5 select-none text-[10px] tracking-wider uppercase">
        <div className="flex items-center gap-1.5">
          <Terminal size={11} className={`${colors.prompt} animate-pulse`} />
          <span className={`${colors.prompt} font-bold`}>{promptLabel}</span>
          <span className="text-zinc-600">::</span>
          <span className="text-zinc-400 hidden xs:inline">telemetry_stream</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className={`px-1.5 py-0.2 rounded border text-[9px] font-bold ${
              isTyping
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
            }`}
          >
            {isTyping ? "TRANSMITTING" : "SYNCHRONIZED"}
          </span>

          {replayable && (
            <button
              type="button"
              onClick={handleReplay}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Replay typing stream"
              aria-label="Replay cybersecurity terminal typing stream"
            >
              <RefreshCw size={10} className={isTyping ? "animate-spin" : ""} />
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Copy description"
            aria-label="Copy description text"
          >
            {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
          </button>
        </div>
      </div>

      {/* Cyber Monospaced Content */}
      <div className="relative text-zinc-300 font-mono">
        <span className={`${colors.prompt} font-bold mr-1.5 select-none`}>&gt;</span>
        {renderFormattedText()}
        
        {/* Blinking Cyber Cursor */}
        {!isComplete && (
          <span
            className={`inline-block w-2 h-3.5 ml-0.5 align-middle ${colors.cursor} animate-pulse shadow-[0_0_8px_currentColor]`}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
