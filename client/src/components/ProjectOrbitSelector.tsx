import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, CheckCircle2 } from "lucide-react";

export interface OrbitProject {
  id: "attack-study" | "delivery-study" | "ai-content-studio" | "polur-charm";
  index: string;
  title: string;
  discipline: string;
  signal: string;
}

interface ProjectMetadata {
  shortTitle: string;
  fullTitle: string;
  category: string;
  tagline: string;
  image: string;
  imageAlt: string;
  badge: string;
  metrics: { value: string; description: string }[];
  stack: string[];
}

const PROJECT_DETAILS: Record<OrbitProject["id"], ProjectMetadata> = {
  "attack-study": {
    shortTitle: "Attack Model",
    fullTitle: "Prediction of Perpetration Attack",
    category: "Machine Learning · Cyber Defense",
    tagline:
      "Supervised machine learning pipeline benchmarking multi-class algorithms to detect and classify network intrusion vectors with high precision.",
    image: "/images/smp-project-security_4a7c2847.jpg",
    imageAlt: "Abstract diagnostic network visual for cybersecurity machine learning project",
    badge: "Supervised Pipeline",
    metrics: [
      {
        value: "85%",
        description: "Classification accuracy across zero-day attack vectors",
      },
      {
        value: "4 Models",
        description: "Comparative benchmark: XGBoost, Random Forest, SVM & Trees",
      },
    ],
    stack: ["Python", "Scikit-learn", "XGBoost", "Pandas"],
  },
  "delivery-study": {
    shortTitle: "Delivery UX",
    fullTitle: "Food Delivery Mobile Experience",
    category: "Product Architecture · Mobile UX",
    tagline:
      "End-to-end design system engineered for rapid order discovery and friction-free checkout, validated through structured usability testing.",
    image: "/images/smp-project-food_c1b44933.jpg",
    imageAlt: "Food delivery mobile application screens and order flow",
    badge: "Mobile Prototype",
    metrics: [
      {
        value: "15+ Screens",
        description: "Production-ready mobile flows from onboarding to live tracking",
      },
      {
        value: "8pt Grid",
        description: "Atomic design token system minimizing cart checkout friction",
      },
    ],
    stack: ["Figma", "Design Systems", "Usability Testing", "Wireframing"],
  },
  "ai-content-studio": {
    shortTitle: "AI Studio",
    fullTitle: "Autonomous AI Content Studio",
    category: "Cloud Automation · Generative Media",
    tagline:
      "Autonomous cloud pipeline automating programmatic video creation, dynamic script synthesis, GPU encoding, and multi-channel distribution.",
    image: "/images/ai-content-studio-showcase_e194be53.jpg",
    imageAlt: "Autonomous AI content generation and video pipeline interface",
    badge: "Cloud Automation",
    metrics: [
      {
        value: "100%",
        description: "Zero-touch pipeline from script generation to final video",
      },
      {
        value: "< 3 min",
        description: "Turnaround time, replacing 4 hours of manual video assembly",
      },
    ],
    stack: ["Python", "Groq LLaMA 3", "FFmpeg", "Docker"],
  },
  "polur-charm": {
    shortTitle: "Polur Charm",
    fullTitle: "Polur Charm Civic & Tourism Platform",
    category: "Civic Platform · Full-Stack Web",
    tagline:
      "Bilingual civic platform modernizing regional utilities, live bus schedules, and Parvathamalai cultural heritage trails.",
    image: "/images/polur-charm-portfolio-art_ee154405.jpg",
    imageAlt: "Polur Charm civic portal and regional bus transit interface",
    badge: "Civic PWA",
    metrics: [
      {
        value: "24/7 Live",
        description: "Real-time regional transit schedules and route updates",
      },
      {
        value: "Offline PWA",
        description: "Optimized for rural mobile networks with sub-second loads",
      },
    ],
    stack: ["React 19", "TypeScript", "Tailwind CSS", "PWA"],
  },
};

interface ProjectOrbitSelectorProps {
  projects: readonly OrbitProject[];
  activeProjectId: OrbitProject["id"];
  onSelectProject: (id: OrbitProject["id"]) => void;
  onHoverProject?: (id: OrbitProject["id"] | null) => void;
  motionPaused?: boolean;
  lowDataMode?: boolean;
  reduceMotion?: boolean | null;
}

export function ProjectOrbitSelector({
  projects,
  activeProjectId,
  onSelectProject,
  onHoverProject,
  motionPaused = false,
  lowDataMode = false,
  reduceMotion = false,
}: ProjectOrbitSelectorProps) {
  const isAnimated = !motionPaused && !lowDataMode && !reduceMotion;
  const [hoveredId, setHoveredId] = useState<OrbitProject["id"] | null>(null);

  const currentProject =
    projects.find((p) => p.id === activeProjectId) || projects[0];
  const currentDetails = PROJECT_DETAILS[currentProject.id];

  const scrollToStudy = (id: OrbitProject["id"]) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="project-spotlight-shell relative my-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0e0a1b]/80 p-5 sm:p-7 md:p-9 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-2xl"
      aria-label="Featured Project Spotlight"
    >
      {/* Subtle ambient illumination */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-600/10 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-cyan-600/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-6 sm:space-y-8">
        {/* ========================================================================= */}
        {/* 1. PROFESSIONAL SEGMENTED PROJECT SWITCHER                                */}
        {/* ========================================================================= */}
        <div
          role="tablist"
          aria-label="Select featured case study"
          className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1.5 backdrop-blur-md"
        >
          {projects.map((proj) => {
            const isActive = proj.id === activeProjectId;
            const details = PROJECT_DETAILS[proj.id];

            return (
              <button
                key={proj.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectProject(proj.id)}
                onMouseEnter={() => {
                  setHoveredId(proj.id);
                  onHoverProject?.(proj.id);
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  onHoverProject?.(null);
                }}
                className={`relative flex items-center justify-between gap-2 rounded-lg px-3.5 py-2.5 text-left transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSpotlightPill"
                    className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.12] shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-2 min-w-0">
                  <span className="font-mono text-[0.68rem] text-white/40">
                    {proj.index}
                  </span>
                  <span className="text-xs sm:text-sm font-medium tracking-tight truncate">
                    {details.shortTitle}
                  </span>
                </div>
                {isActive && (
                  <span className="relative z-10 hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 2. RESTRAINED TWO-COLUMN SHOWCASE (LIMITED, HIGH-IMPACT DETAILS)           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-center">
          {/* LEFT: Project Editorial Dossier */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={isAnimated ? { opacity: 0, y: 8 } : {}}
              animate={isAnimated ? { opacity: 1, y: 0 } : {}}
              exit={isAnimated ? { opacity: 0, y: -6 } : {}}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs font-medium text-violet-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span className="tracking-wide">{currentDetails.category}</span>
              </div>

              {/* Title & Concise Summary */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-[1.15]">
                  {currentDetails.fullTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#b8b0c8] leading-relaxed max-w-xl">
                  {currentDetails.tagline}
                </p>
              </div>

              {/* Limited Key Metrics (Clean, unboxed 2-stat row) */}
              <div className="grid grid-cols-2 gap-6 py-4 border-y border-white/[0.08]">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                    {currentDetails.metrics[0].value}
                  </div>
                  <p className="text-xs sm:text-sm text-white/55 mt-1 leading-snug">
                    {currentDetails.metrics[0].description}
                  </p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                    {currentDetails.metrics[1].value}
                  </div>
                  <p className="text-xs sm:text-sm text-white/55 mt-1 leading-snug">
                    {currentDetails.metrics[1].description}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-white/40 mr-1 font-mono">
                  Stack:
                </span>
                {currentDetails.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/70 font-mono"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Action Trigger */}
              <div className="flex items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => scrollToStudy(currentProject.id)}
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black transition-all hover:bg-white/90 active:scale-[0.98] shadow-md shadow-white/5"
                >
                  <span>View Case Study</span>
                  <ArrowDown
                    size={13}
                    className="transition-transform group-hover:translate-y-0.5"
                  />
                </button>
                <span className="text-xs text-white/40 font-mono">
                  Study 0{currentProject.index} of 04
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT: High-Fidelity Project Visual Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={isAnimated ? { opacity: 0, scale: 0.98 } : {}}
              animate={isAnimated ? { opacity: 1, scale: 1 } : {}}
              exit={isAnimated ? { opacity: 0, scale: 0.98 } : {}}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                onClick={() => scrollToStudy(currentProject.id)}
                className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.1] bg-[#080512] shadow-2xl cursor-pointer"
                title={`Open ${currentDetails.shortTitle} case study`}
              >
                {/* Artwork */}
                <img
                  src={currentDetails.image}
                  alt={currentDetails.imageAlt}
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />

                {/* Subtle dark vignette gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#090514]/90 via-[#090514]/30 to-transparent"
                  aria-hidden="true"
                />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[0.68rem] font-medium text-white/90 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  <span>{currentDetails.badge}</span>
                </div>

                {/* Bottom Bar on Artwork */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-white/90">
                  <span className="font-mono text-white/70">
                    0{currentProject.index} // {currentDetails.shortTitle}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-cyan-300 opacity-90 transition-opacity group-hover:opacity-100 group-hover:underline">
                    <span>Inspect</span>
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
