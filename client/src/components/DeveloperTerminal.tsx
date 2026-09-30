import { useState, useRef, useEffect, useCallback, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal as TerminalIcon,
  X,
  Maximize2,
  Minimize2,
  Trash2,
  Download,
  Copy,
  Check,
  CornerDownLeft,
  Sparkles,
  HelpCircle,
  FolderGit2,
  Cpu,
  Mail,
  Coffee,
  Volume2,
  VolumeX,
  FastForward,
  Shield,
  Eye,
  Activity,
  Binary,
} from "lucide-react";
import { toast } from "sonner";

interface DeveloperTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadResume?: () => void;
  onScrollToSection?: (id: string) => void;
  initialMatrixMode?: boolean;
}

interface CommandOutput {
  id: string;
  command: string;
  content: string | React.ReactNode;
  isStreaming?: boolean;
  timestamp: string;
  isError?: boolean;
  type?: "standard" | "matrix" | "hack" | "scan" | "quote";
}

// -------------------------------------------------------------
// Sound Synthesis Engine via Web Audio API (Zero external assets)
// -------------------------------------------------------------
class TerminalAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public playKeyClick(char?: string) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Slightly randomize pitch for realistic mechanical feel
      const baseFreq = char === "Enter" ? 380 : char === "Backspace" ? 280 : 540 + (Math.random() * 80 - 40);
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      filter.Q.setValueAtTime(3, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.022, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playChirp(type: "success" | "matrix" | "error" | "hack" = "success") {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (type === "success") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08); // A5
        gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.09);
      } else if (type === "matrix") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(440, this.ctx.currentTime + 0.06);
        osc.frequency.linearRampToValueAtTime(880, this.ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0005, this.ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
      } else if (type === "hack") {
        osc.type = "square";
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.setValueAtTime(440, this.ctx.currentTime + 0.04);
        osc.frequency.setValueAtTime(1320, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
      } else {
        // error
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.11);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.11);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }
}

const terminalAudio = new TerminalAudioEngine();

// -------------------------------------------------------------
// Matrix Rain Canvas Background
// -------------------------------------------------------------
const MatrixRainCanvas: FC<{ density?: number; isDim?: boolean }> = ({ isDim = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const characters =
      "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜXYZ0123456789%#@*+-/<>{}[]";
    const fontSize = 13;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -40));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    let lastFrameTime = performance.now();
    const frameInterval = 38; // ~26 fps for that classic hacker monitor cadence

    const draw = (now: number) => {
      animationId = requestAnimationFrame(draw);
      if (now - lastFrameTime < frameInterval) return;
      lastFrameTime = now;

      // Dark translucent wash to create trailing ghost trails
      ctx.fillStyle = isDim ? "rgba(4, 15, 9, 0.16)" : "rgba(4, 15, 9, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (y > 0 && y < height + fontSize) {
          // Leading head character glows bright white / neon lime
          ctx.fillStyle = "#ffffff";
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#34d399";
          ctx.fillText(char, x, y);

          // Second character behind leader is bright emerald
          const trailChar = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillStyle = "#34d399";
          ctx.shadowBlur = 4;
          ctx.shadowColor = "#10b981";
          ctx.fillText(trailChar, x, y - fontSize);
          ctx.shadowBlur = 0;
        }

        // Random reset to top
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDim]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      style={{ filter: "contrast(1.2) brightness(1.1)" }}
    />
  );
};

// -------------------------------------------------------------
// Cyber Typewriter Streaming Text Component
// -------------------------------------------------------------
interface TypewriterOutputProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  isMatrix?: boolean;
}

const TypewriterOutput: FC<TypewriterOutputProps> = ({
  text,
  speed = 12,
  onComplete,
  isMatrix = false,
}) => {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    if (isSkipped) {
      setDisplayedLength(text.length);
      onComplete?.();
      return;
    }

    if (displayedLength < text.length) {
      const timeout = setTimeout(() => {
        // Step faster through whitespace and line breaks
        const currentChar = text[displayedLength];
        const step = currentChar === " " || currentChar === "\n" ? 2 : 1;
        setDisplayedLength((prev) => Math.min(text.length, prev + step));

        // Subtly click audio on punctuation or words
        if (displayedLength % 5 === 0) {
          terminalAudio.playKeyClick();
        }
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      onComplete?.();
    }
  }, [displayedLength, text, speed, isSkipped, onComplete]);

  const currentSlice = text.slice(0, displayedLength);
  const isDone = displayedLength >= text.length || isSkipped;

  return (
    <div className="relative group/typewriter">
      <div className="whitespace-pre-wrap font-mono text-xs sm:text-[13px] leading-relaxed">
        {currentSlice}
        {!isDone && (
          <span
            className={`inline-block w-2 h-3.5 ml-0.5 align-middle ${
              isMatrix ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-cyan-400"
            } animate-pulse`}
          />
        )}
      </div>
      {!isDone && (
        <button
          type="button"
          onClick={() => setIsSkipped(true)}
          className="absolute -top-1 right-0 text-[10px] font-mono text-zinc-500 hover:text-emerald-300 opacity-60 hover:opacity-100 flex items-center gap-1 transition-opacity cursor-pointer bg-black/60 px-1.5 py-0.5 rounded border border-white/10"
        >
          <FastForward size={10} /> Skip
        </button>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// Interactive Hacker Decryption Sequence Component
// -------------------------------------------------------------
const MatrixHackSimulation: FC<{ onDone: () => void }> = ({ onDone }) => {
  const [step, setStep] = useState(0);
  const [cipherText, setCipherText] = useState("0x00000000");

  const steps = [
    "[>] TARGET: s-manoj-prabhu.local (IPv4: 192.168.1.7)",
    "[+] INITIATING MATRIX QUANTUM HANDSHAKE...",
    "[+] BYPASSING ADAPTIVE NEURAL FIREWALL... [████████████] 100%",
    "[+] HARVESTING KERNEL DECRYPTION ENTROPY...",
    "[✔] ACCESS GRANTED. ROOT PRIVILEGES ELEVATED.",
    "[★] WELCOME OPERATOR. THE SYSTEM IS NOW YOURS.",
  ];

  useEffect(() => {
    const cipherInterval = setInterval(() => {
      const chars = "0123456789ABCDEF!@#$%&*";
      let hex = "0x";
      for (let i = 0; i < 8; i++) {
        hex += chars[Math.floor(Math.random() * chars.length)];
      }
      setCipherText(hex);
    }, 45);

    return () => clearInterval(cipherInterval);
  }, []);

  useEffect(() => {
    if (step < steps.length) {
      terminalAudio.playChirp("hack");
      const timeout = setTimeout(() => {
        setStep((s) => s + 1);
      }, 550);
      return () => clearTimeout(timeout);
    } else {
      onDone();
    }
  }, [step, steps.length, onDone]);

  return (
    <div className="p-3 my-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs space-y-1.5 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
      <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold border-b border-emerald-500/20 pb-1">
        <span className="flex items-center gap-1.5">
          <Shield size={12} className="text-emerald-400 animate-pulse" />
          <span>MATRIX PENETRATION PROTOCOL</span>
        </span>
        <span className="text-zinc-400 font-normal">CYPHER: {cipherText}</span>
      </div>
      <div className="space-y-1 pt-1">
        {steps.slice(0, step).map((line, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-emerald-500 text-[10px]">[{i + 1}]</span>
            <span className={i === steps.length - 1 ? "text-white font-bold animate-pulse" : "text-emerald-300"}>
              {line}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Matrix Quotes Dataset
// -------------------------------------------------------------
const MATRIX_QUOTES = [
  {
    speaker: "Morpheus",
    text: "This is your last chance. After this, there is no turning back. You take the blue pill—the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill—you stay in Wonderland, and I show you how deep the rabbit hole goes.",
  },
  {
    speaker: "Neo",
    text: "I know what you're trying to do. I'm not afraid anymore. The Matrix isn't real. The only limit is what you accept.",
  },
  {
    speaker: "Trinity",
    text: "The Matrix cannot tell you who you are. The code is only a reflection. You have to believe in what you create.",
  },
  {
    speaker: "The Oracle",
    text: "Know thyself. Everything that has a beginning has an end. Don't worry about the vase. What vase? *crash* That vase.",
  },
  {
    speaker: "Agent Smith",
    text: "Never send a human to do a machine's job. Evolution, Morpheus, evolution. Like the dinosaur. Look out that window. You had your time.",
  },
];

// -------------------------------------------------------------
// Terminal Welcome Banner (Minimalist & Sleek)
// -------------------------------------------------------------
const TerminalWelcomeBanner: FC<{
  matrixMode: boolean;
  onExecuteCommand: (cmd: string) => void;
}> = ({ matrixMode, onExecuteCommand }) => {
  return (
    <div className="py-2 mb-2 select-none font-mono text-xs">
      <div className="flex items-center gap-2 mb-2 text-zinc-300">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            matrixMode ? "bg-emerald-400" : "bg-emerald-400 shadow-[0_0_6px_#34d399]"
          }`}
        />
        <span className="font-semibold text-white tracking-tight">manoj@portfolio</span>
        <span className="text-zinc-600">·</span>
        <span className="text-zinc-500 text-[11px]">zsh</span>
        <span className="text-zinc-600 text-[10px] ml-auto hidden sm:inline">
          Esc to close
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        {[
          { cmd: "skills", label: "skills" },
          { cmd: "projects", label: "projects" },
          { cmd: "resume", label: "resume" },
          { cmd: "matrix", label: "matrix" },
          { cmd: "help", label: "help" },
        ].map((c) => (
          <button
            key={c.cmd}
            type="button"
            onClick={() => onExecuteCommand(c.cmd)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all cursor-pointer ${
              matrixMode
                ? "bg-emerald-950/40 border-emerald-500/25 text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-400"
                : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.08] text-zinc-300 hover:text-white"
            }`}
          >
            <span className="text-zinc-500 mr-1">$</span>
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const INITIAL_WELCOME = "";

const QUICK_COMMANDS = [
  { label: "help", cmd: "help", icon: HelpCircle, key: "1" },
  { label: "skills", cmd: "skills", icon: Cpu, key: "2" },
  { label: "projects", cmd: "projects", icon: FolderGit2, key: "3" },
  { label: "matrix", cmd: "matrix", icon: Binary, key: "4" },
  { label: "hack", cmd: "hack", icon: Shield, key: "5" },
  { label: "resume", cmd: "resume", icon: Download, key: "6" },
  { label: "clear", cmd: "clear", icon: Trash2, key: "7" },
];

export const DeveloperTerminal: FC<DeveloperTerminalProps> = ({
  isOpen,
  onClose,
  onDownloadResume,
  onScrollToSection,
  initialMatrixMode = false,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: "init",
      command: "welcome",
      content: INITIAL_WELCOME,
      timestamp: new Date().toLocaleTimeString(),
      type: "standard",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [matrixMode, setMatrixMode] = useState(initialMatrixMode);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [typingSpeed, setTypingSpeed] = useState<number>(10);
  const [cmatrixFullscreen, setCmatrixFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync initialMatrixMode when opened
  useEffect(() => {
    if (isOpen && initialMatrixMode) {
      setMatrixMode(true);
    }
  }, [isOpen, initialMatrixMode]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Sync audio toggle with engine
  const toggleAudio = () => {
    const next = !isAudioEnabled;
    setIsAudioEnabled(next);
    terminalAudio.enabled = next;
    toast.success(next ? "Mechanical audio effects enabled" : "Audio muted");
  };

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  // Handle global Escape key to close terminal or exit cmatrix
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (cmatrixFullscreen) {
          setCmatrixFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, cmatrixFullscreen, onClose]);

  const executeCommand = useCallback(
    (rawCmd: string) => {
      const trimmed = rawCmd.trim();
      if (!trimmed) return;

      const lower = trimmed.toLowerCase();
      const parts = lower.split(" ");
      const cmd = parts[0];
      const arg = parts.slice(1).join(" ");

      // Add to command history buffer
      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryPointer(-1);

      if (cmd === "clear" || cmd === "cls") {
        setHistory([]);
        setInputVal("");
        terminalAudio.playChirp("success");
        return;
      }

      if (cmd === "exit" || cmd === "quit") {
        onClose();
        setInputVal("");
        return;
      }

      let content: React.ReactNode | string = "";
      let isError = false;
      let outputType: CommandOutput["type"] = "standard";

      switch (cmd) {
        case "help":
        case "?":
        case "commands":
          terminalAudio.playChirp("success");
          content = (
            <div className="space-y-2.5 my-2 font-mono text-xs">
              <div className="text-emerald-400 font-bold tracking-wide uppercase flex items-center gap-1.5 pb-1 border-b border-white/10">
                <HelpCircle size={13} />
                <span>Obsidian Shell Command Registry</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                {[
                  { cmd: "skills", desc: "Technical stack & architectural toolkit" },
                  { cmd: "projects", desc: "Flagship case studies & live demos" },
                  { cmd: "resume", desc: "Download verified CV (PDF)" },
                  { cmd: "matrix", desc: "Toggle green phosphor digital rain mode" },
                  { cmd: "hack", desc: "Quantum firewall breach simulation" },
                  { cmd: "cmatrix", desc: "Fullscreen falling rain screensaver" },
                  { cmd: "about", desc: "Developer dossier & technical background" },
                  { cmd: "contact", desc: "Direct email, phone, GitHub & LinkedIn" },
                  { cmd: "coffee", desc: "Brew an espresso at Manoj's desk" },
                  { cmd: "quote", desc: "Stream authentic quotes from the Matrix" },
                  { cmd: "sound", desc: "Toggle mechanical keystroke clicks" },
                  { cmd: "clear", desc: "Flush terminal screen buffer" },
                ].map((item) => (
                  <button
                    key={item.cmd}
                    type="button"
                    onClick={() => executeCommand(item.cmd)}
                    className="flex items-baseline gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-violet-500/35 hover:bg-white/[0.05] transition-all cursor-pointer text-left group"
                  >
                    <span className="text-cyan-400 font-bold min-w-[58px] group-hover:text-cyan-300">
                      {item.cmd}
                    </span>
                    <span className="text-zinc-400 text-[10.5px] line-clamp-1">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          );
          break;

        case "matrix":
        case "theme":
          setMatrixMode((prev) => {
            const next = !prev;
            terminalAudio.playChirp(next ? "matrix" : "success");
            toast.success(next ? "Matrix phosphor mode activated" : "Standard Obsidian mode restored");
            return next;
          });
          content = matrixMode
            ? "[!] Matrix phosphor mode DEACTIVATED. Returning to Obsidian violet palette."
            : "[★] MATRIX PHOSPHOR MODE ACTIVATED. Digital rain canvas initialized. Terminal scanlines engaged.";
          outputType = "matrix";
          break;

        case "cmatrix":
        case "rain":
          setCmatrixFullscreen(true);
          setMatrixMode(true);
          terminalAudio.playChirp("matrix");
          content = "[★] Fullscreen Matrix rain initiated. Click anywhere or press Escape to return.";
          outputType = "matrix";
          break;

        case "hack":
        case "breach":
        case "decrypt":
          setMatrixMode(true);
          content = <MatrixHackSimulation onDone={() => terminalAudio.playChirp("success")} />;
          outputType = "hack";
          break;

        case "quote":
        case "neo":
        case "morpheus": {
          const q = MATRIX_QUOTES[Math.floor(Math.random() * MATRIX_QUOTES.length)];
          terminalAudio.playChirp("matrix");
          content = `"${q.text}"\n\n— ${q.speaker}`;
          outputType = "quote";
          break;
        }

        case "sound":
        case "audio": {
          const next = !isAudioEnabled;
          setIsAudioEnabled(next);
          terminalAudio.enabled = next;
          content = next
            ? "[✔] Audio synthesis ONLINE. Keystroke clicks and command chirps enabled."
            : "[!] Audio synthesis MUTED. Keystrokes will remain silent.";
          break;
        }

        case "speed": {
          const num = parseInt(arg, 10);
          if (!isNaN(num) && num >= 1 && num <= 80) {
            setTypingSpeed(num);
            content = `[✔] Typewriter streaming delay set to ${num}ms per character.`;
          } else {
            content = `Usage: speed <milliseconds> (e.g. speed 5 for super fast, speed 20 for deliberate)`;
            isError = true;
          }
          break;
        }

        case "about":
        case "whoami":
          terminalAudio.playChirp("success");
          content = (
            <div className="space-y-2.5 my-2 font-mono text-xs">
              <div className="text-violet-400 font-bold tracking-wide uppercase flex items-center gap-1.5 pb-1 border-b border-white/10">
                <TerminalIcon size={13} />
                <span>Developer Dossier &amp; Architecture</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                <span className="font-bold text-white">S Manoj Prabhu</span> — Frontend Developer &amp; UI/UX Designer based in Polur, Tamil Nadu, India.
              </p>
              <div className="p-2.5 rounded-lg border border-white/10 bg-white/[0.02] space-y-1.5 text-[11px] text-zinc-300">
                <p>• <span className="text-violet-300 font-semibold">Frontend:</span> Responsive React 19, TypeScript, Tailwind CSS v4, Framer Motion</p>
                <p>• <span className="text-cyan-300 font-semibold">UI/UX:</span> High-fidelity Figma architectures, component tokens, tactile micro-motion</p>
                <p>• <span className="text-emerald-300 font-semibold">Backend:</span> Java Spring Boot REST architectures, Python automation scripts</p>
                <p>• <span className="text-pink-300 font-semibold">Applied ML:</span> 85% intrusion classification accuracy comparing XGBoost vs SVM</p>
              </div>
              <p className="italic text-zinc-400 text-[11px]">
                "Building digital interfaces where physical tactile feedback meets clean engineering."
              </p>
            </div>
          );
          break;

        case "skills":
        case "stack":
          terminalAudio.playChirp("success");
          content = (
            <div className="space-y-2.5 my-2 font-mono text-xs">
              <div className="text-emerald-400 font-bold tracking-wide uppercase flex items-center gap-1.5 pb-1 border-b border-white/10">
                <Cpu size={13} />
                <span>Technical Stack &amp; Architectural Toolkit</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg border border-white/10 bg-white/[0.02]">
                  <p className="text-violet-300 font-semibold mb-1 text-[11px] uppercase tracking-wider">Frontend &amp; Interface</p>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">React 19, TypeScript, Tailwind CSS v4, Framer Motion, Radix UI, Vite</p>
                </div>
                <div className="p-2.5 rounded-lg border border-white/10 bg-white/[0.02]">
                  <p className="text-cyan-300 font-semibold mb-1 text-[11px] uppercase tracking-wider">Backend &amp; Platform</p>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">Java, Spring Boot, Python 3, REST APIs, PostgreSQL, Node.js Express</p>
                </div>
                <div className="p-2.5 rounded-lg border border-white/10 bg-white/[0.02]">
                  <p className="text-pink-300 font-semibold mb-1 text-[11px] uppercase tracking-wider">Design Systems &amp; UX</p>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">Figma (Tokens, Auto Layout 5.0, Interactive Prototypes, Tactile Micro-motion)</p>
                </div>
                <div className="p-2.5 rounded-lg border border-white/10 bg-white/[0.02]">
                  <p className="text-emerald-300 font-semibold mb-1 text-[11px] uppercase tracking-wider">Applied Machine Learning</p>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">Scikit-learn, XGBoost, Network Intrusion Detection (85% Accuracy)</p>
                </div>
              </div>
            </div>
          );
          break;

        case "projects":
        case "work":
          terminalAudio.playChirp("success");
          content = (
            <div className="space-y-2.5 my-2 font-mono text-xs">
              <div className="text-cyan-400 font-bold tracking-wide uppercase flex items-center gap-1.5 pb-1 border-b border-white/10">
                <FolderGit2 size={13} />
                <span>Selected Production Case Studies</span>
              </div>
              <div className="space-y-2">
                {[
                  {
                    title: "Network Intrusion Detection System",
                    badge: "ML · 85% Accuracy",
                    desc: "Comparative multi-model benchmark analyzing network threat vectors with XGBoost & SVM.",
                  },
                  {
                    title: "Courier & Parcel Delivery Mobile App",
                    badge: "Figma · 30+ Screens",
                    desc: "End-to-end mobile design system with dispatch tracking & haptic flow.",
                  },
                  {
                    title: "Autonomous AI Content Studio",
                    badge: "Python · Cloud Pipeline",
                    desc: "Automated media generation pipeline rendering split-screen Shorts with FFmpeg.",
                  },
                  {
                    title: "Polur Charm — Civic Discovery",
                    badge: "Bilingual Platform",
                    desc: "Regional transit tables, bus timetables, and Parvathamalai trekking logs.",
                  },
                ].map((proj) => (
                  <div key={proj.title} className="p-2.5 rounded-lg border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{proj.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono">{proj.badge}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{proj.desc}</p>
                    </div>
                    {onScrollToSection && (
                      <button
                        type="button"
                        onClick={() => {
                          onScrollToSection("work");
                          onClose();
                        }}
                        className="text-[10px] text-cyan-400 hover:text-cyan-200 underline shrink-0 cursor-pointer self-start sm:self-center font-mono"
                      >
                        View in Portfolio →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
          break;

        case "resume":
        case "cv":
          onDownloadResume?.();
          terminalAudio.playChirp("success");
          toast.success("Downloading S Manoj Prabhu Résumé");
          content = `[✔] Verified copy of S Manoj Prabhu Résumé retrieved.
The curriculum vitae file is transferring to your browser downloads folder.`;
          break;

        case "coffee":
        case "brew":
          terminalAudio.playChirp("success");
          content = `   ( (
    ) )
  ........
  |      |]
  \\      /
   \`----\`
[☕] Fresh single-origin dark roast brewed at Manoj's desk!
Click the ceramic mug beside Manoj's laptop on the home screen to increase the caffeine counter!`;
          break;

        case "contact":
        case "email":
          terminalAudio.playChirp("success");
          content = `DIRECT COMMUNICATION CHANNELS:
  • Email:    manojprabhu0707@gmail.com
  • Phone:    +91 96775 18268
  • GitHub:   https://github.com/manojprabhu07
  • LinkedIn: https://www.linkedin.com/in/manojprabhu07`;
          break;

        case "ls":
        case "dir":
          content = `about.txt     skills.json     projects/     resume.pdf
contact.md    matrix.sh       config.sys    .zshrc`;
          break;

        case "cat":
          if (!arg) {
            content = "Usage: cat <filename> (e.g. cat about.txt, cat resume.pdf)";
            isError = true;
          } else if (arg.includes("about")) {
            executeCommand("about");
            return;
          } else if (arg.includes("skill")) {
            executeCommand("skills");
            return;
          } else if (arg.includes("contact")) {
            executeCommand("contact");
            return;
          } else if (arg.includes("resume")) {
            executeCommand("resume");
            return;
          } else if (arg.includes("matrix")) {
            executeCommand("matrix");
            return;
          } else {
            content = `cat: ${arg}: No such file or directory`;
            isError = true;
          }
          break;

        case "sudo":
          content = "🔒 Root Access Granted: Operator Manoj has already unlocked unrestricted guest privileges.";
          break;

        case "date":
          content = new Date().toString();
          break;

        default:
          isError = true;
          terminalAudio.playChirp("error");
          content = `zsh: command not found: "${cmd}". Type "help" to inspect valid commands.`;
          break;
      }

      setHistory((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          command: trimmed,
          content,
          timestamp: new Date().toLocaleTimeString(),
          isError,
          type: outputType,
        },
      ]);
      setInputVal("");
    },
    [matrixMode, isAudioEnabled, onClose, onDownloadResume]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Sound on every key press
    terminalAudio.playKeyClick(e.key);

    // Number hotkeys 1-7 when prompt is empty
    if (inputVal === "" && /^[1-7]$/.test(e.key)) {
      e.preventDefault();
      const idx = parseInt(e.key, 10) - 1;
      if (QUICK_COMMANDS[idx]) {
        executeCommand(QUICK_COMMANDS[idx].cmd);
        return;
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextPointer =
        historyPointer === -1
          ? commandHistory.length - 1
          : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setInputVal(commandHistory[nextPointer]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= commandHistory.length) {
        setHistoryPointer(-1);
        setInputVal("");
      } else {
        setHistoryPointer(nextPointer);
        setInputVal(commandHistory[nextPointer]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const query = inputVal.toLowerCase().trim();
      if (!query) return;
      const match = QUICK_COMMANDS.map((c) => c.cmd).find((cmd) =>
        cmd.startsWith(query)
      );
      if (match) {
        setInputVal(match);
      }
    }
  };

  const handleCopyAll = () => {
    const textLines = history
      .map((h) => `$ ${h.command}\n${typeof h.content === "string" ? h.content : "[Interactive Block]"}`)
      .join("\n\n");
    navigator.clipboard.writeText(textLines);
    setCopied(true);
    toast.success("Terminal session copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-2.5 sm:p-5 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Developer Terminal"
          data-lenis-prevent
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => {
              if (cmatrixFullscreen) setCmatrixFullscreen(false);
              else onClose();
            }}
          />

          {/* Fullscreen CMatrix Screensaver overlay if active */}
          {cmatrixFullscreen && (
            <div
              onClick={() => setCmatrixFullscreen(false)}
              className="fixed inset-0 z-50 bg-[#030d07] cursor-pointer flex flex-col items-center justify-center select-none"
              title="Click anywhere or press Esc to return"
            >
              <MatrixRainCanvas isDim={false} />
              <div className="relative z-10 text-center space-y-3 pointer-events-none">
                <div className="inline-block px-4 py-2 rounded-full border border-emerald-500/40 bg-black/80 backdrop-blur-md shadow-[0_0_30px_#10b981]">
                  <p className="font-mono text-emerald-400 font-bold text-sm tracking-widest animate-pulse">
                    [ THE MATRIX IS REAL ]
                  </p>
                </div>
                <p className="font-mono text-xs text-emerald-500/80">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">Esc</kbd> or click anywhere to return to terminal
                </p>
              </div>
            </div>
          )}

          {/* Terminal Window Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className={`relative flex flex-col w-full ${
              isFullscreen
                ? "h-[94vh] max-w-[96vw]"
                : "h-[600px] max-h-[88vh] max-w-3xl"
            } rounded-2xl overflow-hidden border transition-all duration-300 z-10 ${
              matrixMode
                ? "border-emerald-500/40 shadow-[0_32px_96px_-12px_rgba(0,0,0,0.95),0_0_40px_rgba(16,185,129,0.2)] bg-[#030a06]/98"
                : "border-white/12 shadow-[0_32px_96px_-12px_rgba(0,0,0,0.92),0_0_40px_rgba(139,92,246,0.12)] bg-[#090812]/98"
            }`}
          >
            {/* Matrix Digital Rain Background Layer (Only rendered in matrix mode) */}
            {matrixMode && <MatrixRainCanvas isDim={true} />}

            {/* CRT Phosphor Scanline Overlay in Matrix Mode */}
            {matrixMode && (
              <div
                className="absolute inset-0 pointer-events-none z-20 opacity-25"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0px, rgba(0, 0, 0, 0.55) 1px, transparent 1px, transparent 3px)",
                }}
              />
            )}

            {/* Window Header */}
            <div
              className={`relative z-30 flex items-center justify-between px-3.5 py-2.5 border-b select-none ${
                matrixMode
                  ? "border-emerald-500/25 bg-emerald-950/50 backdrop-blur-md"
                  : "border-white/10 bg-white/[0.04] backdrop-blur-md"
              }`}
            >
              {/* Traffic light macOS dots & Active Tab */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 active:brightness-90 transition-all flex items-center justify-center group cursor-pointer"
                    aria-label="Close terminal window (Esc)"
                    title="Close (Esc)"
                  >
                    <X size={8} className="text-black opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setHistory([])}
                    className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 active:brightness-90 transition-all flex items-center justify-center group cursor-pointer"
                    aria-label="Clear screen buffer"
                    title="Clear buffer"
                  >
                    <span className="w-1.5 h-0.5 bg-black rounded opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 active:brightness-90 transition-all flex items-center justify-center group cursor-pointer"
                    aria-label="Toggle fullscreen"
                    title="Toggle fullscreen"
                  >
                    <span className="w-1.5 h-1.5 border-[1px] border-black opacity-0 group-hover:opacity-100" />
                  </button>
                </div>

                {/* Active Session Tab */}
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 pl-1">
                  <span className="text-zinc-400">manoj</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-200 font-medium">terminal</span>
                  <span className="text-[10px] text-zinc-500">· zsh</span>
                </div>
              </div>

              {/* Window Tools (Matrix Mode Toggle, Sound, Copy, Close) */}
              <div className="flex items-center gap-1 font-mono text-[11px]">
                {/* Matrix Mode Switch */}
                <button
                  type="button"
                  onClick={() => executeCommand("matrix")}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] transition-all cursor-pointer ${
                    matrixMode
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.25)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                  title="Toggle CRT Matrix mode"
                >
                  <Binary size={12} className={matrixMode ? "text-emerald-400 animate-pulse" : "text-zinc-500"} />
                  <span className="font-medium">{matrixMode ? "CRT Active" : "CRT Rain"}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    isAudioEnabled
                      ? "text-emerald-400 hover:bg-emerald-500/20"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-white/10"
                  }`}
                  title={isAudioEnabled ? "Audio clicks enabled" : "Audio muted"}
                  aria-label="Toggle audio clicks"
                >
                  {isAudioEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                </button>
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className="p-1.5 rounded text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Copy terminal session"
                  aria-label="Copy terminal session"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-0.5"
                  title="Close terminal (Esc)"
                  aria-label="Close terminal (Esc)"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalBodyRef}
              onClick={() => inputRef.current?.focus()}
              data-lenis-prevent
              className={`relative z-20 flex-1 overflow-y-auto p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed cursor-text scrollbar-thin ${
                matrixMode ? "text-emerald-300" : "text-zinc-200"
              }`}
            >
              {history.map((item, index) => {
                const isLatest = index === history.length - 1;
                return (
                  <div key={item.id} className="mb-3 space-y-1">
                    {item.command === "welcome" ? (
                      <TerminalWelcomeBanner
                        matrixMode={matrixMode}
                        onExecuteCommand={executeCommand}
                      />
                    ) : (
                      <>
                        <div className="flex items-center gap-1.5 text-zinc-400 select-none text-[11px] sm:text-xs">
                          <span className={matrixMode ? "text-emerald-400 font-semibold" : "text-zinc-300 font-semibold"}>
                            {matrixMode ? "matrix" : "manoj"}
                          </span>
                          <span className="text-zinc-600">❯</span>
                          <span className="text-white font-medium ml-0.5">{item.command}</span>
                          <span className="text-[10px] text-zinc-600 ml-auto font-sans">{item.timestamp}</span>
                        </div>
                        <div className="pl-1 sm:pl-2">
                          {typeof item.content === "string" ? (
                            isLatest ? (
                              <TypewriterOutput
                                text={item.content}
                                speed={typingSpeed}
                                isMatrix={matrixMode}
                              />
                            ) : (
                              <div className="whitespace-pre-wrap">{item.content}</div>
                            )
                          ) : (
                            item.content
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              {/* Active Command Input Line with Clean Prompt */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/[0.04]">
                <div className="flex items-center gap-1.5 text-xs font-mono shrink-0 select-none">
                  <span className={matrixMode ? "text-emerald-400 font-semibold" : "text-white font-medium"}>
                    {matrixMode ? "matrix" : "manoj"}
                  </span>
                  <span className="text-zinc-600">❯</span>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`flex-1 bg-transparent outline-none font-mono text-xs sm:text-[13px] caret-white py-1 ${
                    matrixMode
                      ? "text-emerald-300 placeholder:text-emerald-700/60"
                      : "text-white placeholder:text-zinc-600"
                  }`}
                  placeholder="Type a command (try: skills, projects, resume)..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  className={`px-2 py-1 rounded text-[10px] transition-colors shrink-0 cursor-pointer ${
                    matrixMode
                      ? "bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-500/40"
                      : "bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white"
                  }`}
                  title="Run command (Enter)"
                >
                  <CornerDownLeft size={11} />
                </button>
              </form>
            </div>

            {/* Developer Command Dock / Function Bar */}
            <div
              className={`relative z-30 px-3.5 py-2 border-t flex items-center justify-between gap-2 select-none ${
                matrixMode
                  ? "border-emerald-500/20 bg-emerald-950/60 backdrop-blur-md"
                  : "border-white/10 bg-black/60 backdrop-blur-md"
              }`}
            >
              {/* Command Triggers */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {[
                  { label: "skills", cmd: "skills" },
                  { label: "projects", cmd: "projects" },
                  { label: "resume", cmd: "resume" },
                  { label: "matrix", cmd: "matrix" },
                  { label: "help", cmd: "help" },
                  { label: "clear", cmd: "clear" },
                ].map((item) => (
                  <button
                    key={item.cmd}
                    type="button"
                    onClick={() => executeCommand(item.cmd)}
                    className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-mono transition-all shrink-0 cursor-pointer ${
                      matrixMode
                        ? "bg-emerald-950/60 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/25"
                        : "bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/[0.06] hover:border-white/20"
                    }`}
                  >
                    <span>${item.label}</span>
                  </button>
                ))}
              </div>

              {/* Status / Close hint */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 shrink-0">
                <span className="hidden sm:inline">Esc to close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
