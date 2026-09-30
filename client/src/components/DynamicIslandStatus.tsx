import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Radio,
  Headphones,
  Coffee,
  Clock,
  MapPin,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Send,
  Zap,
  Briefcase,
  Code2,
  Play,
  Pause,
  ArrowRight
} from "lucide-react";

interface DynamicIslandStatusProps {
  onOpenContact?: () => void;
  onOpenRecruiter?: () => void;
}

type IslandMode = "status" | "music" | "focus" | "timezone";

const MODES: { id: IslandMode; label: string; icon: typeof Radio }[] = [
  { id: "status", label: "Availability", icon: Radio },
  { id: "music", label: "Soundtrack", icon: Headphones },
  { id: "focus", label: "Current Stack", icon: Zap },
  { id: "timezone", label: "Local Time", icon: Clock },
];

export function DynamicIslandStatus({
  onOpenContact,
  onOpenRecruiter,
}: DynamicIslandStatusProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMode, setActiveMode] = useState<IslandMode>("status");
  const [modeIndex, setModeIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const islandRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorNodeRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live ticking Indian Standard Time (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(istString);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-cycle compact teaser when idle
  useEffect(() => {
    if (isExpanded) return;
    const interval = setInterval(() => {
      setModeIndex((prev) => {
        const next = (prev + 1) % MODES.length;
        setActiveMode(MODES[next].id);
        return next;
      });
    }, 4600);
    return () => clearInterval(interval);
  }, [isExpanded]);

  // Clean up Web Audio API resources on unmount
  useEffect(() => {
    return () => {
      if (oscillatorNodeRef.current) {
        try {
          oscillatorNodeRef.current.osc1.stop();
          oscillatorNodeRef.current.osc2.stop();
        } catch {
          // ignore
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Click outside and Escape key to collapse
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, { passive: true });
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  // Copy email
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    const emailToCopy = "manojprabhu0707@gmail.com";
    let success = false;
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(emailToCopy).catch(() => {
        // Fallback handled below if needed
      });
      success = true;
    }
    if (!success && typeof document !== "undefined") {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = emailToCopy;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        // ignore
      }
    }
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2200);
  };

  // Ambient lo-fi harmonic chord generator using Web Audio API
  const toggleAmbientAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingAudio) {
      if (oscillatorNodeRef.current) {
        try {
          oscillatorNodeRef.current.gain.gain.linearRampToValueAtTime(0.0001, (audioCtxRef.current?.currentTime || 0) + 0.3);
          setTimeout(() => {
            oscillatorNodeRef.current?.osc1.stop();
            oscillatorNodeRef.current?.osc2.stop();
            oscillatorNodeRef.current = null;
          }, 350);
        } catch {
          // ignore
        }
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioContextClass();
        audioCtxRef.current = ctx;

        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Warm dreamy pentatonic tone (F# minor / A Major ambient chord)
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(220, ctx.currentTime); // A3

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(329.63, ctx.currentTime); // E4

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(480, ctx.currentTime);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.2);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        oscillatorNodeRef.current = { osc1, osc2, gain };
        setIsPlayingAudio(true);
      } catch (err) {
        console.warn("Audio Context init error:", err);
      }
    }
  };

  return (
    <div
      ref={islandRef}
      className="dynamic-island-wrapper relative z-30 select-none flex flex-col items-end pointer-events-auto"
      style={{
        width: isExpanded ? "100%" : "auto",
        maxWidth: isExpanded ? "min(24rem, 100%)" : "min(16.5rem, 100%)",
      }}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 480,
          damping: 32,
          mass: 0.7,
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label="Obsidian Dynamic Island status capsule. Click to expand."
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        className={`group relative overflow-hidden cursor-pointer transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-violet-400/70 ${
          isExpanded
            ? "w-full rounded-[1.35rem] bg-[#07050d]/96 backdrop-blur-2xl border border-violet-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(139,92,246,0.18)] p-3.5"
            : "rounded-full bg-[#06040a]/92 hover:bg-[#0c0915]/96 backdrop-blur-xl border border-white/10 hover:border-violet-400/40 shadow-[0_6px_20px_rgba(0,0,0,0.7),0_0_15px_rgba(139,92,246,0.12)] h-7.5 py-1 px-2.5 flex items-center"
        }`}
      >
        {/* Subtle top specular glass glint */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* COMPACT SLEEK MICRO-PILL MODE */}
        {!isExpanded && (
          <div className="flex items-center gap-2 w-full whitespace-nowrap">
            {/* Left Signal Indicator */}
            <div className="flex items-center justify-center shrink-0">
              {activeMode === "status" && (
                <div className="relative flex items-center justify-center w-3.5 h-3.5">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                </div>
              )}
              {activeMode === "music" && (
                <div
                  className="flex items-end gap-[2px] h-3 px-0.5 cursor-pointer"
                  onClick={toggleAmbientAudio}
                  title={isPlayingAudio ? "Mute ambient tone" : "Play ambient chord"}
                >
                  <span className={`w-[2.5px] bg-violet-400 rounded-full transition-all ${isPlayingAudio ? "animate-[pulse_0.5s_ease-in-out_infinite] h-3" : "h-2.5"}`} />
                  <span className={`w-[2.5px] bg-violet-300 rounded-full transition-all ${isPlayingAudio ? "animate-[pulse_0.4s_ease-in-out_infinite_0.15s] h-2" : "h-1.5"}`} />
                  <span className={`w-[2.5px] bg-purple-400 rounded-full transition-all ${isPlayingAudio ? "animate-[pulse_0.6s_ease-in-out_infinite_0.3s] h-3" : "h-2"}`} />
                </div>
              )}
              {activeMode === "focus" && (
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500/15 flex items-center justify-center border border-amber-500/30">
                  <Zap size={8.5} className="text-amber-400" />
                </div>
              )}
              {activeMode === "timezone" && (
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-500/15 flex items-center justify-center border border-cyan-500/30">
                  <Clock size={8.5} className="text-cyan-400" />
                </div>
              )}
            </div>

            {/* Middle Compact Text Content (Concise, no truncation) */}
            <div className="overflow-hidden min-w-0 pr-0.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMode}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex items-center gap-1.5 text-[0.68rem] tracking-wide text-zinc-200"
                >
                  {activeMode === "status" && (
                    <>
                      <span className="text-emerald-400 font-semibold">Available</span>
                      <span className="text-zinc-400 text-[0.62rem]">· Hire</span>
                    </>
                  )}
                  {activeMode === "music" && (
                    <>
                      <span className="text-violet-300 font-medium">Obsidian Lo-Fi</span>
                      <span className="text-zinc-400 text-[0.62rem] font-mono">88 BPM</span>
                    </>
                  )}
                  {activeMode === "focus" && (
                    <>
                      <span className="text-amber-300 font-medium">Stack</span>
                      <span className="text-zinc-400 text-[0.62rem]">React · Java · AI</span>
                    </>
                  )}
                  {activeMode === "timezone" && (
                    <>
                      <span className="text-cyan-300 font-mono font-medium">IST</span>
                      <span className="text-zinc-300 text-[0.62rem] font-mono">{currentTime ? currentTime.replace(/:\d\d\s/, " ") : "Chennai"}</span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Mini Tactile Cue */}
            <div className="shrink-0 flex items-center pl-0.5">
              <div className="w-3.5 h-3.5 rounded-full bg-white/[0.06] group-hover:bg-violet-500/20 flex items-center justify-center text-zinc-400 group-hover:text-violet-300 transition-colors">
                <ChevronDown size={10} className="transition-transform group-hover:translate-y-[0.5px]" />
              </div>
            </div>
          </div>
        )}

        {/* EXPANDED DYNAMIC ISLAND POP-OUT */}
        {isExpanded && (
          <div className="flex flex-col gap-3 w-full text-left" onClick={(e) => e.stopPropagation()}>
            {/* Header / Pill Notch Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-violet-200">
                  Dynamic Island
                </span>
                <span className="text-[9px] text-zinc-400 font-mono bg-white/5 border border-white/10 px-1 py-0.2 rounded">
                  Live
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Collapse Island"
              >
                <ChevronUp size={13} />
              </button>
            </div>

            {/* Category Segmented Tab Switcher */}
            <div className="grid grid-cols-4 gap-1 p-0.5 rounded-lg bg-black/60 border border-white/5">
              {MODES.map((mode) => {
                const Icon = mode.icon;
                const isActive = activeMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveMode(mode.id)}
                    className={`flex items-center justify-center gap-1 py-1 px-1.5 rounded-md text-[9.5px] font-semibold tracking-wide transition-all ${
                      isActive
                        ? "bg-violet-600/90 text-white shadow-[0_0_10px_rgba(139,92,246,0.35)]"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                    }`}
                  >
                    <Icon size={10} />
                    <span className="hidden sm:inline">{mode.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Specific Content View */}
            <div className="min-h-[110px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {activeMode === "status" && (
                  <motion.div
                    key="status"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2.5 bg-emerald-950/25 border border-emerald-500/20 p-2 rounded-lg">
                      <div className="flex gap-2">
                        <div className="mt-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] shrink-0" />
                        <div>
                          <h4 className="text-[11.5px] font-semibold text-emerald-300">
                            Available for Immediate Hire
                          </h4>
                          <p className="text-[10px] text-zinc-300 mt-0.5 leading-relaxed">
                            Open to Full-Time Software Engineer, Full-Stack, & Applied AI roles.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1.5 pt-0.5">
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-md text-[11px] font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 hover:text-white transition-all active:scale-95"
                      >
                        {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                        <span>{copied ? "Copied!" : "Copy Email"}</span>
                      </button>

                      <a
                        href="#contact"
                        onClick={() => {
                          setIsExpanded(false);
                          if (onOpenContact) onOpenContact();
                        }}
                        className="flex-1 flex items-center justify-center gap-1 py-1 px-2.5 rounded-md text-[11px] font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_14px_rgba(139,92,246,0.35)] transition-all active:scale-95"
                      >
                        <span>Contact</span>
                        <ArrowRight size={11} />
                      </a>
                    </div>
                  </motion.div>
                )}

                {activeMode === "music" && (
                  <motion.div
                    key="music"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between gap-2 bg-violet-950/25 border border-violet-500/20 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-md bg-violet-900/60 border border-violet-400/30 flex items-center justify-center shrink-0">
                          <Headphones size={13} className="text-violet-300" />
                        </div>
                        <div>
                          <div className="text-[11.5px] font-semibold text-violet-200">
                            Obsidian Deep Focus
                          </div>
                          <div className="text-[9.5px] text-zinc-400">
                            Lo-Fi Ambient · 88 BPM · Pentatonic
                          </div>
                        </div>
                      </div>

                      {/* Live Audio Chime Toggle */}
                      <button
                        type="button"
                        onClick={toggleAmbientAudio}
                        className={`p-1.5 rounded-md border transition-all ${
                          isPlayingAudio
                            ? "bg-violet-500 border-violet-400 text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                            : "bg-white/5 border-white/10 text-zinc-300 hover:text-white"
                        }`}
                        title={isPlayingAudio ? "Mute ambient tone" : "Play ambient chord synthesizer"}
                      >
                        {isPlayingAudio ? <Volume2 size={13} /> : <Play size={13} />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400 px-0.5">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        Flow state resonance
                      </span>
                      <span className="font-mono text-[9.5px] text-violet-300">
                        {isPlayingAudio ? "SYNTH ACTIVE" : "SYNTH IDLE"}
                      </span>
                    </div>
                  </motion.div>
                )}

                {activeMode === "focus" && (
                  <motion.div
                    key="focus"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                    className="flex flex-col gap-1.5"
                  >
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      <div className="p-1.5 rounded-md bg-white/5 border border-white/10">
                        <div className="text-[9px] text-zinc-400 font-mono uppercase">Primary Stack</div>
                        <div className="font-semibold text-zinc-200 text-[11px] mt-0.5">Java · React · Python</div>
                      </div>
                      <div className="p-1.5 rounded-md bg-white/5 border border-white/10">
                        <div className="text-[9px] text-zinc-400 font-mono uppercase">Specialty</div>
                        <div className="font-semibold text-violet-300 text-[11px] mt-0.5">Full-Stack & Applied AI</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1.5 p-1.5 rounded-md bg-amber-950/20 border border-amber-500/20 text-[11px]">
                      <div className="flex items-center gap-1.5 text-amber-300">
                        <Coffee size={12} />
                        <span>Caffeine: 92%</span>
                      </div>
                      <span className="text-[9.5px] text-zinc-400 font-mono">3x Espresso</span>
                    </div>
                  </motion.div>
                )}

                {activeMode === "timezone" && (
                  <motion.div
                    key="timezone"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                    className="flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-950/20 border border-cyan-500/20">
                      <div>
                        <div className="text-[9px] text-cyan-400 uppercase font-mono tracking-wider">
                          Indian Standard Time (IST)
                        </div>
                        <div className="text-sm font-bold font-mono text-zinc-100 mt-0.5 tracking-tight">
                          {currentTime || "Loading..."}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-medium">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                          Online Now
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-zinc-400 px-0.5">
                      <MapPin size={11} className="text-cyan-400 shrink-0" />
                      <span>Chennai, Tamil Nadu, India · Remote Ready</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
