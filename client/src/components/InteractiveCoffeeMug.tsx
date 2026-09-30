import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Flame, Coffee } from "lucide-react";

interface InteractiveCoffeeMugProps {
  onCaffeineBoost?: (count: number) => void;
  className?: string;
}

const coffeeQuotes = [
  "Single-Origin Dark Roast · 100% Focus",
  "Converting caffeine into clean TypeScript ☕",
  "Memory heap refreshed · Peak flow state ⚡",
  "Spring Boot APIs fueled & ready 🚀",
  "Zero compiler errors detected ✨",
  "Espresso shot active · High throughput 🔋",
];

export function InteractiveCoffeeMug({ onCaffeineBoost, className = "" }: InteractiveCoffeeMugProps) {
  const [sips, setSips] = useState(2);
  const [isSipping, setIsSipping] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [floatingParticles, setFloatingParticles] = useState<Array<{ id: number; text: string; x: number; y: number }>>([]);
  const [isHovered, setIsHovered] = useState(false);
  const particleIdRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Soothing Web Audio API ceramic clink & coffee sip tone
  const playSipSound = () => {
    try {
      if (typeof window === "undefined") return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      // Gentle harmonic ceramic chime (warm C-major resonance)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(293.66, now); // D4
      osc2.frequency.exponentialRampToValueAtTime(440, now + 0.2);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.42);
      osc2.stop(now + 0.42);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const handleSip = () => {
    if (isSipping) return;
    setIsSipping(true);
    playSipSound();

    const newSips = sips + 1;
    setSips(newSips);
    setQuoteIndex((prev) => (prev + 1) % coffeeQuotes.length);
    onCaffeineBoost?.(newSips);

    // Spawn floating emoji particles
    const id = ++particleIdRef.current;
    const particleTexts = ["+1 ☕", "⚡ Boost", "✨ Focus", "🔥 100%"];
    const randomText = particleTexts[Math.floor(Math.random() * particleTexts.length)];
    const randomX = (Math.random() - 0.5) * 40;

    setFloatingParticles((prev) => [...prev, { id, text: randomText, x: randomX, y: -20 }]);

    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1200);

    setTimeout(() => {
      setIsSipping(false);
    }, 380);
  };

  return (
    <div
      className={`interactive-coffee-mug-container relative select-none pointer-events-auto group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSip();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Interactive Coffee Mug: ${sips} espresso shots consumed. Tap to sip for a caffeine boost.`}
      title="Tap coffee mug for a caffeine boost!"
    >
      {/* Floating Particles on Tap */}
      <AnimatePresence>
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, y: 0, x: particle.x, scale: 0.7 }}
            animate={{ opacity: 0, y: -50, x: particle.x * 1.5, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none z-40 whitespace-nowrap text-[11px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.5)] backdrop-blur-md"
          >
            {particle.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Steam Physics Plumes */}
      <div className="steam-wrapper absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-10 pointer-events-none flex justify-center items-end overflow-visible">
        <span className="steam-plume steam-1" />
        <span className="steam-plume steam-2" />
        <span className="steam-plume steam-3" />
      </div>

      {/* Amber Warmth Ambient Glow */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-t from-amber-500/15 via-orange-500/8 to-transparent blur-md opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Realistic 3D Ceramic Coffee Mug Body */}
      <motion.div
        animate={isSipping ? { rotate: -14, scale: 1.12, y: -4 } : { rotate: 0, scale: isHovered ? 1.08 : 1, y: 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 20 }}
        className="relative flex items-center justify-center cursor-pointer"
      >
        {/* Coaster Base Shadow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-black/75 rounded-full blur-[3px] pointer-events-none" />

        {/* Outer Mug Shell */}
        <div className="relative w-11 h-13 bg-gradient-to-b from-[#2a2034] via-[#1a1424] to-[#0e0a16] rounded-b-2xl rounded-t-sm border border-violet-300/30 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.28),0_10px_24px_rgba(0,0,0,0.8),0_0_18px_rgba(245,158,11,0.18)] group-hover:border-amber-400/50 group-hover:shadow-[inset_0_1.5px_2.5px_rgba(255,255,255,0.45),0_12px_30px_rgba(0,0,0,0.9),0_0_26px_rgba(245,158,11,0.35)] transition-all">
          {/* Ceramic Cup Rim Highlight */}
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#443754] via-[#675282] to-[#342842] rounded-full border border-violet-200/40 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.5)] flex items-center justify-center p-0.5">
            {/* Rich Espresso Crema Surface */}
            <div className="w-full h-full bg-gradient-to-r from-[#53341c] via-[#854e24] to-[#422714] rounded-full flex items-center justify-center shadow-inner">
              <span className="w-2 h-0.5 bg-amber-200/60 rounded-full blur-[0.4px] animate-pulse" />
            </div>
          </div>

          {/* Minimalist Graphic Badge on Mug Front */}
          <div className="absolute top-4.5 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-85 group-hover:opacity-100 transition-opacity">
            <Coffee size={12} className="text-amber-400" />
            <span className="text-[7.5px] font-mono tracking-tight text-amber-200 mt-0.5 font-bold">{sips}x</span>
          </div>

          {/* Side Handle */}
          <div className="absolute top-2.5 -right-3.5 w-4 h-7 rounded-r-xl border-[2.5px] border-l-0 border-violet-300/35 bg-transparent group-hover:border-amber-400/50 shadow-[2px_1px_6px_rgba(0,0,0,0.5)]" />
        </div>
      </motion.div>

      {/* Micro Tooltip on Hover / Focus */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.16 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#120e1e]/95 border border-amber-400/30 shadow-[0_8px_24px_rgba(0,0,0,0.7),0_0_14px_rgba(245,158,11,0.2)] backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono font-medium text-amber-200">
              {coffeeQuotes[quoteIndex]}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
