/**
 * Obsidian Studio page — an asymmetric editorial reel with ultraviolet signals and purposeful micro-motion.
 */
import { FocusEvent, FormEvent, MouseEvent, PointerEvent as ReactPointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CircleCheckBig,
  Code2,
  Download,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Pause,
  Phone,
  Play,
  Send,
  Sparkles,
  Sun,
  Moon,
  X,
} from "lucide-react";

const navItems = [
  ["About", "about"],
  ["Work", "work"],
  ["Experience", "experience"],
  ["Contact", "contact"],
] as const;

const skills = [
  { title: "Languages", code: "01", items: ["Java", "JavaScript", "Python", "SQL"] },
  { title: "Frontend", code: "02", items: ["HTML5", "CSS3", "React (basic)"] },
  { title: "UI / UX", code: "03", items: ["Figma", "Wireframing", "Prototyping"] },
  { title: "Backend", code: "04", items: ["Spring Boot", "REST API", "MySQL"] },
  { title: "Tools & Cloud", code: "05", items: ["Git", "GitHub", "VS Code", "Firebase", "Oracle APEX"] },
  { title: "Applied ML", code: "06", items: ["XGBoost", "SVM", "Logistic Regression", "Agile", "Scrum"] },
];

const experience = [
  {
    period: "09/2025 — 11/2025",
    role: "Project Intern",
    company: "Infosys Springboard · Internship 6.0",
    place: "Remote",
    details: [
      "Built a full-stack Dynamic Ride Sharing and Carpooling Platform using Java, Spring Boot, and MySQL.",
      "Implemented 8+ RESTful APIs for user registration, trip matching, booking, and route tracking.",
    ],
  },
  {
    period: "01/2024 — 03/2024",
    role: "UI/UX Design Intern",
    company: "Fluezen Technology",
    place: "Chennai, Tamil Nadu",
    details: [
      "Designed and delivered 10+ mobile and web UI screens in Figma within a two-month sprint.",
      "Conducted usability testing across 3 iterative design cycles, reducing handoff time by approximately 25%.",
    ],
  },
  {
    period: "06/2023 — 08/2023",
    role: "UI/UX Design Intern",
    company: "Kaashiv Infotech",
    place: "Chennai, Tamil Nadu",
    details: [
      "Developed a Figma component library of 20+ UI elements, reducing screen design time by 30%.",
      "Designed mobile application screens applying Material Design principles and 8-point grid systems.",
    ],
  },
];

const certifications = [
  ["Oracle", "APEX Cloud Developer Professional", "1Z0-771"],
  ["IBM", "Artificial Intelligence Fundamentals", "SkillsBuild"],
  ["NPTEL", "Introduction to IoT", "Credential"],
  ["Infosys", "Springboard Internship 6.0", "Certificate"],
];

const reelItems = ["React interfaces", "Figma systems", "Java services", "REST APIs", "Product thinking", "Applied ML"];
const professionalRoles = ["Frontend Developer", "UI/UX Designer", "Java Developer"];
const orbitProjects = [
  { id: "attack-study", index: "01", title: "Attack model", discipline: "ML / security", signal: "85% accuracy" },
  { id: "delivery-study", index: "02", title: "Delivery flow", discipline: "UX / mobile", signal: "15+ screens" },
] as const;
const recruiterReviewSteps = [
  { id: "top", index: "01", label: "Availability", note: "Open to internships and collaborative product work." },
  { id: "about", index: "02", label: "Core proof", note: "React components, Figma screens, and 85% ML accuracy." },
  { id: "work", index: "03", label: "Selected work", note: "Machine-learning evaluation and mobile product design." },
  { id: "contact", index: "04", label: "Contact", note: "Reply within 1–2 days." },
] as const;
const caseSignals = {
  "attack-study": {
    challenge: "Separate high-signal attack patterns from a noisy cybersecurity dataset.",
    approach: "Compared four supervised learning models with a consistent evaluation flow.",
    outcome: "XGBoost delivered the strongest result at 85% classification accuracy.",
  },
  "delivery-study": {
    challenge: "Make a multi-step ordering journey feel direct on a small mobile screen.",
    approach: "Mapped discovery, cart, and tracking across a cohesive Figma flow.",
    outcome: "Refined 15+ screens through two usability review cycles.",
  },
} as const;
type CaseStudyId = keyof typeof caseSignals;
const nebulaStars = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: 6 + ((index * 37) % 88),
  top: 7 + ((index * 61) % 81),
  size: 1 + ((index * 7) % 3),
  opacity: 0.28 + ((index * 13) % 52) / 100,
  delay: -((index * 17) % 43) / 10,
  speed: 3.8 + ((index * 11) % 31) / 10,
  tone: index % 9 === 0 ? "is-rose" : index % 4 === 0 ? "is-violet" : "",
}));
type InteractionPoint = { id: number; x: number; y: number };
const skillProficiency: Record<string, { level: string; stars: number }> = {
  Java: { level: "Applied", stars: 4 }, JavaScript: { level: "Working", stars: 3 }, Python: { level: "Working", stars: 3 }, SQL: { level: "Working", stars: 3 }, HTML5: { level: "Applied", stars: 4 }, CSS3: { level: "Applied", stars: 4 }, "React (basic)": { level: "Foundation", stars: 2 }, Figma: { level: "Applied", stars: 4 }, Wireframing: { level: "Applied", stars: 4 }, Prototyping: { level: "Applied", stars: 4 }, "Spring Boot": { level: "Working", stars: 3 }, "REST API": { level: "Applied", stars: 4 }, MySQL: { level: "Working", stars: 3 }, Git: { level: "Working", stars: 3 }, GitHub: { level: "Working", stars: 3 }, "VS Code": { level: "Applied", stars: 4 }, Firebase: { level: "Working", stars: 3 }, "Oracle APEX": { level: "Foundation", stars: 2 }, XGBoost: { level: "Applied", stars: 4 }, SVM: { level: "Working", stars: 3 }, "Logistic Regression": { level: "Working", stars: 3 }, Agile: { level: "Working", stars: 3 }, Scrum: { level: "Working", stars: 3 },
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function downloadResume() {
  const resume = `S MANOJ PRABHU\nFrontend Developer | UI/UX Designer | Java Developer\n\nCONTACT\nmanojprabhu0707@gmail.com | +91 9677518268\ngithub.com/manojprabhu07 | Polur, Tamil Nadu\n\nPROFILE\nFrontend Developer and UI/UX Designer specialising in React, Figma, Java/Spring Boot, and applied Machine Learning.\n\nEXPERIENCE\nProject Intern — Infosys Springboard (09/2025–11/2025)\nUI/UX Design Intern — Fluezen Technology (01/2024–03/2024)\nUI/UX Design Intern — Kaashiv Infotech (06/2023–08/2023)\n\nEDUCATION\nB.Tech, Information Technology — Saveetha School of Engineering, Chennai. CGPA: 8.0/10.0\n`;
  const blob = new Blob([resume], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "S-Manoj-Prabhu-Resume.txt";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.17 }}
      transition={{ duration: 0.62, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function GravityHeading({ title, motionPaused }: { title: string; motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const staticType = reduceMotion || motionPaused;
  return <h2 className="display section-heading gravity-heading" aria-label={title}>{title.split(" ").map((word, wordIndex) => <span className="gravity-word-shell" key={`${word}-${wordIndex}`}><span className="gravity-word">{word.split("").map((character, characterIndex) => { const index = wordIndex * 8 + characterIndex; return <motion.span key={`${character}-${characterIndex}`} className="gravity-letter" aria-hidden="true" initial={staticType ? false : { x: (index % 5 - 2) * 3, y: 9 + (index % 3) * 3, rotate: (index % 3 - 1) * 1.2, opacity: .6 }} whileInView={staticType ? {} : { x: 0, y: 0, rotate: 0, opacity: 1 }} viewport={{ once: true, amount: .55 }} transition={{ duration: .54, delay: .08 + (index % 8) * .035, ease: [0.23, 1, 0.32, 1] }}>{character}</motion.span>; })}</span>{wordIndex < title.split(" ").length - 1 ? <span className="gravity-space" aria-hidden="true" /> : null}</span>)}</h2>;
}

function SectionIntro({ index, eyebrow, title, detail, motionPaused = false }: { index: string; eyebrow: string; title: string; detail?: string; motionPaused?: boolean }) {
  return (
    <div className="grid gap-6 md:grid-cols-[9rem_1fr] md:gap-10">
      <div className="flex items-center gap-3 md:block">
        <span className="label">{index}</span>
        <span className="hidden h-px flex-1 bg-violet-300/25 md:mt-3 md:block" />
      </div>
      <div>
        <p className="label mb-4">{eyebrow}</p>
        <GravityHeading title={title} motionPaused={motionPaused} />
        {detail ? <p className="mt-6 max-w-xl text-[0.94rem] leading-7 text-[#b0aabc]">{detail}</p> : null}
      </div>
    </div>
  );
}

function CaseSignalReveal({ id, open, onToggle, motionPaused }: { id: CaseStudyId; open: boolean; onToggle: () => void; motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const signal = caseSignals[id];
  const staticMotion = reduceMotion || motionPaused;
  return (
    <div className="case-signal-control">
      <button className={`case-signal-button ${open ? "is-open" : ""}`} type="button" onClick={onToggle} aria-expanded={open} aria-controls={`${id}-signal-detail`}>
        <span>Case signal</span><span>{open ? "Close" : "Open"} <ArrowUpRight size={13} /></span>
      </button>
      <AnimatePresence initial={false}>
        {open ? <motion.div id={`${id}-signal-detail`} className="case-signal-detail" initial={staticMotion ? false : { opacity: 0, y: 8, scale: 0.985 }} animate={staticMotion ? {} : { opacity: 1, y: 0, scale: 1 }} exit={staticMotion ? {} : { opacity: 0, y: -5, scale: 0.99 }} transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
          <div><span>Challenge</span><p>{signal.challenge}</p></div><div><span>Approach</span><p>{signal.approach}</p></div><div><span>Outcome</span><p>{signal.outcome}</p></div>
        </motion.div> : null}
      </AnimatePresence>
    </div>
  );
}

function DeliveryWalkthrough({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  const reduceMotion = useReducedMotion();
  const [runId, setRunId] = useState(0);
  const staticPlayback = reduceMotion || motionPaused || lowDataMode;
  return (
    <section className={`delivery-walkthrough ${staticPlayback ? "is-static" : ""}`} aria-label="Food delivery flow walkthrough">
      <div className="delivery-walkthrough-head"><div><span className="label">Flow walkthrough</span><p>Discover → cart → live order</p></div><button type="button" className="delivery-replay" onClick={() => setRunId((current) => current + 1)} disabled={staticPlayback} aria-label={staticPlayback ? "Walkthrough motion is currently paused" : "Replay food delivery walkthrough"}><Play size={12} />Replay</button></div>
      <div key={runId} className="delivery-device" aria-hidden="true">
        <div className="delivery-screen delivery-discover"><span className="device-status">9:41</span><p>Good evening</p><b>Find your next bite</b><span className="delivery-search">Search dishes</span><div className="delivery-cuisine-row"><i /><i /><i /></div><div className="delivery-restaurant"><span /><b>Local favourites</b><em>28 min · 4.8</em></div></div>
        <div className="delivery-screen delivery-cart"><span className="device-status">9:42</span><p>Your order</p><b>Comfort bowl</b><div className="delivery-cart-line"><i /><span><strong>Spiced ramen</strong><em>Customise · 1 item</em></span><b>₹240</b></div><div className="delivery-total"><span>Total</span><b>₹269</b></div><button>Continue to payment</button></div>
        <div className="delivery-screen delivery-track"><span className="device-status">9:48</span><p>Order #SMP-07</p><b>On the way</b><div className="delivery-map"><i /><i /><span /></div><div className="delivery-rider"><span>●</span><div><b>Rider picked up your order</b><em>Arriving in 12 minutes</em></div></div></div>
        <div className="delivery-progress" aria-hidden="true"><i /><i /><i /></div>
      </div>
      <p className="delivery-walkthrough-note">Illustrative flow study based on the project’s onboarding, discovery, cart, and order-tracking screens.</p>
    </section>
  );
}

function AttackModelWalkthrough({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  const reduceMotion = useReducedMotion();
  const [runId, setRunId] = useState(0);
  const staticPlayback = reduceMotion || motionPaused || lowDataMode;
  return (
    <section className={`attack-walkthrough ${staticPlayback ? "is-static" : ""}`} aria-label="Attack model evaluation walkthrough">
      <div className="attack-walkthrough-head"><div><span className="label">Evaluation walkthrough</span><p>Feature set → model comparison → best result</p></div><button type="button" className="attack-replay" onClick={() => setRunId((current) => current + 1)} disabled={staticPlayback} aria-label={staticPlayback ? "Walkthrough motion is currently paused" : "Replay attack model walkthrough"}><Play size={12} />Replay</button></div>
      <div key={runId} className="attack-console" aria-hidden="true">
        <div className="attack-stage attack-input"><span className="attack-terminal-label">01 / INPUT MATRIX</span><b>Cybersecurity dataset</b><div className="attack-feature-stack"><i><span />Signal patterns</i><i><span />Traffic markers</i><i><span />Event fields</i></div><p>Structured for model evaluation</p></div>
        <div className="attack-stage attack-compare"><span className="attack-terminal-label">02 / MODEL REVIEW</span><b>Four-model comparison</b><div className="attack-model-grid"><i>XGBoost</i><i>SVM</i><i>Logistic<br />Regression</i><i>Gradient<br />Boosting</i></div><p>Consistent evaluation pass</p></div>
        <div className="attack-stage attack-result"><span className="attack-terminal-label">03 / BEST RESULT</span><div className="attack-result-seal"><span>85</span><em>%</em></div><b>XGBoost selected</b><p>Best observed classification accuracy</p><i className="attack-result-line" /></div>
        <div className="attack-progress" aria-hidden="true"><i /><i /><i /></div>
      </div>
      <p className="attack-walkthrough-note">Illustrative evaluation flow based on the reported four-model comparison and final 85% classification accuracy.</p>
    </section>
  );
}

function ProjectProofMarker({ value, suffix = "", ringValue, label, detail, tone = "violet", motionPaused }: { value: string; suffix?: string; ringValue: number; label: string; detail: string; tone?: "violet" | "cyan"; motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const [hasEntered, setHasEntered] = useState(false);
  const offset = 251.2 * (1 - ringValue / 100);
  const staticMarker = reduceMotion || motionPaused;
  return (
    <motion.div className={`project-proof-marker is-${tone} ${hasEntered && !staticMarker ? "is-visible" : ""}`} initial={staticMarker ? false : { opacity: 0, y: 9 }} whileInView={staticMarker ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.34, ease: [0.23, 1, 0.32, 1] }} onViewportEnter={() => setHasEntered(true)} aria-label={`${value}${suffix} ${label}. ${detail}`}>
      <span className="proof-ring-wrap" style={{ "--proof-offset": `${offset}px` } as React.CSSProperties}><svg viewBox="0 0 96 96" aria-hidden="true"><circle className="proof-ring-track" cx="48" cy="48" r="40" /><circle className="proof-ring-progress" cx="48" cy="48" r="40" /></svg><span className="proof-value"><b>{value}</b><em>{suffix}</em></span></span>
      <span className="proof-copy"><span className="label">Outcome marker</span><b>{label}</b><em>{detail}</em></span>
    </motion.div>
  );
}

function ProjectSignalFocus({ tone, motionPaused }: { tone: "violet" | "cyan"; motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const staticMotion = reduceMotion || motionPaused;
  return <motion.span className={`project-signal-focus is-${tone}`} aria-hidden="true" initial={staticMotion ? false : { opacity: 0, scaleX: 0 }} whileInView={staticMotion ? {} : { opacity: 0.78, scaleX: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.72, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}><i /><i /></motion.span>;
}

function BlueprintCrosshair({ motionPaused }: { motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const staticMotion = reduceMotion || motionPaused;
  return <motion.span className={`blueprint-crosshair ${entered && !staticMotion ? "is-focused" : ""}`} aria-hidden="true" initial={staticMotion ? false : { opacity: 0, scale: 0.92 }} whileInView={staticMotion ? {} : { opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.48 }} onViewportEnter={() => setEntered(true)} transition={{ duration: .28, delay: .22, ease: [0.23, 1, 0.32, 1] }}><i className="blueprint-crosshair-h" /><i className="blueprint-crosshair-v" /><b /><em /></motion.span>;
}

function TimelineCheckpoint({ motionPaused }: { motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const staticPulse = reduceMotion || motionPaused;
  return <motion.span className={`timeline-checkpoint ${entered && !staticPulse ? "is-active" : ""}`} aria-hidden="true" initial={false} whileInView={{}} viewport={{ once: true, amount: 0.55 }} onViewportEnter={() => setEntered(true)} />;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sent, setSent] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [starBursts, setStarBursts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [projectPulses, setProjectPulses] = useState<InteractionPoint[]>([]);
  const [constellationTrail, setConstellationTrail] = useState<InteractionPoint[]>([]);
  const [contactPulses, setContactPulses] = useState<InteractionPoint[]>([]);
  const [contactConstellationTrail, setContactConstellationTrail] = useState<InteractionPoint[]>([]);
  const [cornerBurst, setCornerBurst] = useState(0);
  const [footerBurst, setFooterBurst] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [nameRipples, setNameRipples] = useState<InteractionPoint[]>([]);
  const [nameHaptic, setNameHaptic] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);
  const [lowDataMode, setLowDataMode] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [recruiterReviewOpen, setRecruiterReviewOpen] = useState(false);
  const [recruiterReviewStep, setRecruiterReviewStep] = useState(0);
  const [lightPreset, setLightPreset] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("smp-contrast-preset") === "light");
  const [activeOrbitProject, setActiveOrbitProject] = useState<CaseStudyId>("attack-study");
  const [openCaseSignal, setOpenCaseSignal] = useState<CaseStudyId | null>(null);
  const [contactFocused, setContactFocused] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [projectFinder, setProjectFinder] = useState({ x: -100, y: -100, active: false });
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const lastConstellationPoint = useRef({ x: -100, y: -100, time: 0 });
  const lastContactConstellationPoint = useRef({ x: -100, y: -100, time: 0 });
  const reduceMotion = useReducedMotion();

  const year = useMemo(() => new Date().getFullYear(), []);
  const constellationSegments = useMemo(() => constellationTrail.slice(1).map((point, index) => {
    const previous = constellationTrail[index];
    const dx = point.x - previous.x;
    const dy = point.y - previous.y;
    return { id: `${previous.id}-${point.id}`, x: previous.x, y: previous.y, length: Math.hypot(dx, dy), angle: Math.atan2(dy, dx) * (180 / Math.PI) };
  }), [constellationTrail]);
  const contactConstellationSegments = useMemo(() => contactConstellationTrail.slice(1).map((point, index) => {
    const previous = contactConstellationTrail[index];
    const dx = point.x - previous.x;
    const dy = point.y - previous.y;
    return { id: `${previous.id}-${point.id}`, x: previous.x, y: previous.y, length: Math.hypot(dx, dy), angle: Math.atan2(dy, dx) * (180 / Math.PI) };
  }), [contactConstellationTrail]);

  useEffect(() => {
    window.localStorage.setItem("smp-contrast-preset", lightPreset ? "light" : "dark");
  }, [lightPreset]);

  useEffect(() => {
    if (reduceMotion || lowDataMode) {
      setIntroVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setIntroVisible(false), 860);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, lowDataMode]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (motionPaused || reduceMotion || lowDataMode) {
      video.pause();
      return;
    }
    video.play().catch(() => undefined);
  }, [motionPaused, reduceMotion, lowDataMode]);

  useEffect(() => {
    if (motionPaused || reduceMotion || lowDataMode) return;
    const cycle = window.setInterval(() => setRoleIndex((current) => (current + 1) % professionalRoles.length), 3100);
    return () => window.clearInterval(cycle);
  }, [motionPaused, reduceMotion, lowDataMode]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maximum > 0 ? Math.min(100, Math.max(0, (window.scrollY / maximum) * 100)) : 0);
    };
    const onPointer = (event: PointerEvent) => setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }));
    const onEnter = () => setCursor((current) => ({ ...current, active: true }));
    const onLeave = () => setCursor((current) => ({ ...current, active: false }));
    const interactive = Array.from(document.querySelectorAll<HTMLElement>("a,button,input,textarea"));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    window.addEventListener("pointermove", onPointer, { passive: true });
    interactive.forEach((element) => {
      element.addEventListener("pointerenter", onEnter);
      element.addEventListener("pointerleave", onLeave);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-38% 0px -50%", threshold: [0.05, 0.18, 0.4] },
    );
    // Observe the main navigable chapters for the active navigation signal.
    navItems.forEach(([, id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
      interactive.forEach((element) => {
        element.removeEventListener("pointerenter", onEnter);
        element.removeEventListener("pointerleave", onLeave);
      });
      observer.disconnect();
    };
  }, []);

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:manojprabhu0707@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  function handleProjectTilt(event: MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -3.5}deg) rotateY(${x * 3.5}deg) translateY(-5px)`;
  }

  function resetProjectTilt(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  }

  function selectOrbitProject(id: CaseStudyId) {
    setActiveOrbitProject(id);
    scrollToSection(id);
  }

  function startRecruiterReview() {
    setRecruiterOpen(false);
    setMobileOpen(false);
    setRecruiterReviewStep(0);
    setRecruiterReviewOpen(true);
    scrollToSection(recruiterReviewSteps[0].id);
  }

  function goToRecruiterReviewStep(nextStep: number) {
    const boundedStep = Math.min(Math.max(nextStep, 0), recruiterReviewSteps.length - 1);
    setRecruiterReviewStep(boundedStep);
    scrollToSection(recruiterReviewSteps[boundedStep].id);
  }

  function handleContactBlur(event: FocusEvent<HTMLFormElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setContactFocused(false);
  }

  function createNebulaBurst(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || motionPaused) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const burst = { id: Date.now(), x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100 };
    setStarBursts((current) => [...current.slice(-2), burst]);
    window.setTimeout(() => setStarBursts((current) => current.filter((item) => item.id !== burst.id)), 820);
  }

  function createProjectPulse(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || motionPaused) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pulse = { id: Date.now(), x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100 };
    setProjectPulses((current) => [...current.slice(-2), pulse]);
    window.setTimeout(() => setProjectPulses((current) => current.filter((item) => item.id !== pulse.id)), 920);
  }

  function followProjectFinder(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || motionPaused) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setProjectFinder({ x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100, active: true });
  }

  function extendConstellation(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || motionPaused) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    const now = performance.now();
    const previous = lastConstellationPoint.current;
    if (now - previous.time < 52 || Math.hypot(x - previous.x, y - previous.y) < 3.4) return;
    lastConstellationPoint.current = { x, y, time: now };
    setConstellationTrail((current) => [...current.slice(-7), { id: Date.now() + Math.random(), x, y }]);
  }

  function createContactPulse(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || motionPaused) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pulse = { id: Date.now(), x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100 };
    setContactPulses((current) => [...current.slice(-2), pulse]);
    window.setTimeout(() => setContactPulses((current) => current.filter((item) => item.id !== pulse.id)), 920);
  }

  function extendContactConstellation(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || motionPaused) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    const now = performance.now();
    const previous = lastContactConstellationPoint.current;
    if (now - previous.time < 58 || Math.hypot(x - previous.x, y - previous.y) < 3.7) return;
    lastContactConstellationPoint.current = { x, y, time: now };
    setContactConstellationTrail((current) => [...current.slice(-7), { id: Date.now() + Math.random(), x, y }]);
  }

  function triggerCornerBurst() {
    if (reduceMotion || motionPaused) return;
    const burstId = Date.now();
    setCornerBurst(burstId);
    window.setTimeout(() => setCornerBurst((current) => current === burstId ? 0 : current), 780);
  }

  function triggerFooterBurst() {
    if (reduceMotion || motionPaused) return;
    const burstId = Date.now();
    setFooterBurst(burstId);
    window.setTimeout(() => setFooterBurst((current) => current === burstId ? 0 : current), 780);
  }

  function createNameRipple(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || motionPaused) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const interactionId = Date.now();
    const ripple = { id: interactionId, x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100 };
    setNameRipples((current) => [...current.slice(-1), ripple]);
    setNameHaptic(interactionId);
    window.setTimeout(() => setNameRipples((current) => current.filter((item) => item.id !== ripple.id)), 900);
    window.setTimeout(() => setNameHaptic((current) => current === interactionId ? 0 : current), 300);
  }

  return (
    <main className={`page-shell ${motionPaused ? "motion-paused" : ""} ${lowDataMode ? "low-data" : ""} ${lightPreset ? "contrast-light" : ""} ${recruiterReviewOpen ? "recruiter-review-active" : ""}`}>
      <AnimatePresence>{introVisible && !reduceMotion && !lowDataMode ? <motion.div className="entry-loader" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}><div className="entry-loader-content"><span className="entry-loader-seal"><img src="/manus-storage/smp-logo_526971d2.png" alt="" /></span><span className="entry-loader-signal" /><span className="label text-violet-100">SMP / initializing field reel</span></div></motion.div> : null}</AnimatePresence>
      {!reduceMotion && <div className={`cursor ${cursor.active ? "is-active" : ""}`} style={{ transform: `translate3d(${cursor.x - 5}px, ${cursor.y - 5}px, 0)` }} />}
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress-rail" aria-hidden="true"><span className="scroll-progress-label">Field progress</span><span className="scroll-progress-track"><span className="scroll-progress-fill" style={{ height: `${scrollProgress}%` }} /></span><span className="scroll-progress-value">{String(Math.round(scrollProgress)).padStart(2, "0")}</span></div>
      <button className={`corner-star ${cornerBurst ? "is-bursting" : ""}`} onClick={triggerCornerBurst} aria-label={reduceMotion ? "Star motion is disabled by your device setting" : motionPaused ? "Star motion is paused" : "Release a star spark"} disabled={Boolean(reduceMotion || motionPaused)}><Sparkles size={17} /><span className="spark-tooltip">Release spark</span><span className="corner-spark-field" aria-hidden="true">{cornerBurst ? Array.from({ length: 8 }, (_, index) => <span key={`${cornerBurst}-${index}`} className="corner-spark" style={{ "--spark-angle": `${index * 45}deg` } as React.CSSProperties} />) : null}</span></button>

      <header className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container flex h-[5rem] items-center justify-between">
          <button className="flex items-center gap-3 text-left" onClick={() => scrollToSection("top")} aria-label="Go to the top">
            <span className="seal-wrap"><img src="/manus-storage/smp-logo_526971d2.png" alt="SMP monogram" /></span>
            <span className="display text-[0.88rem] font-semibold tracking-[-0.04em] text-white">S MANOJ<br />PRABHU</span>
          </button>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <button key={id} className={`nav-link ${active === id ? "is-active" : ""}`} onClick={() => scrollToSection(id)}>{label}</button>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex"><button className="contrast-toggle" type="button" onClick={() => setLightPreset((enabled) => !enabled)} aria-pressed={lightPreset}>{lightPreset ? <Moon size={14} /> : <Sun size={14} />}{lightPreset ? "Dark" : "Light"}</button><button className="recruiter-trigger" type="button" onClick={startRecruiterReview}>Recruiter path</button><a href="mailto:manojprabhu0707@gmail.com" className="signal-button min-h-0 px-4 py-2.5">Open correspondence <ArrowUpRight size={14} /></a></div>
          <button className="icon-button md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close navigation" : "Open navigation"}>{mobileOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
        {mobileOpen ? (
          <div className="border-t border-violet-200/10 bg-[#0b0a12]/95 px-5 py-6 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
              {navItems.map(([label, id]) => <button key={id} className="display text-left text-2xl text-white" onClick={() => { setMobileOpen(false); scrollToSection(id); }}>{label}</button>)}
              <div className="flex gap-3 pt-1"><button className="contrast-toggle" type="button" onClick={() => setLightPreset((enabled) => !enabled)} aria-pressed={lightPreset}>{lightPreset ? <Moon size={14} /> : <Sun size={14} />}{lightPreset ? "Dark preset" : "Light preset"}</button><button className="recruiter-trigger" type="button" onClick={startRecruiterReview}>Recruiter path</button></div>
              <a href="mailto:manojprabhu0707@gmail.com" className="label mt-2 inline-flex items-center gap-2 text-violet-200">Send an email <ArrowUpRight size={15} /></a>
            </nav>
          </div>
        ) : null}
      </header>

      <section id="top" className="hero container">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,.98fr)] lg:gap-12">
          <div className="relative z-10 pt-4 lg:pt-0">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={reduceMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }} className="mb-7 flex items-center gap-3">
              <span className="signal-dot" />
              <span className="label text-[#d3c5ff]">Available for considered digital work</span>
            </motion.div>
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08, ease: [0.23, 1, 0.32, 1] }} className="label mb-5">01 / SMP field reel</motion.p>
            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 38 }} animate={reduceMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.78, delay: 0.14, ease: [0.23, 1, 0.32, 1] }} className={`hero-name ${nameHaptic ? "is-haptic" : ""} display max-w-[10ch] text-[clamp(4.1rem,9vw,8.2rem)] font-semibold leading-[0.81] text-white`} tabIndex={0} aria-label="S Manoj Prabhu. Click or press Enter to release a signal ripple." onPointerDown={createNameRipple} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); const bounds = event.currentTarget.getBoundingClientRect(); createNameRipple({ ...event, clientX: bounds.left + bounds.width / 2, clientY: bounds.top + bounds.height / 2 } as unknown as ReactPointerEvent<HTMLElement>); } }}>
              <span className="name-line name-manoj" data-text="S MANOJ">S MANOJ</span><span className="name-line name-prabhu" data-text="PRABHU">PRABHU</span><span className="name-ripple-field" aria-hidden="true">{nameRipples.map((ripple) => <i key={ripple.id} className="name-ripple" style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }} />)}</span><span className="name-spark-field" aria-hidden="true">{[
                { left: "8%", top: "22%", dx: "34px", dy: "-10px", tilt: "-28deg", delay: "-1.1s" },
                { left: "56%", top: "14%", dx: "22px", dy: "14px", tilt: "36deg", delay: "-3.2s" },
                { left: "82%", top: "63%", dx: "-28px", dy: "-12px", tilt: "-48deg", delay: "-4.7s" },
                { left: "27%", top: "76%", dx: "42px", dy: "-8px", tilt: "12deg", delay: "-5.8s" },
              ].map((spark, index) => <i key={index} className="name-spark" style={{ "--spark-left": spark.left, "--spark-top": spark.top, "--spark-dx": spark.dx, "--spark-dy": spark.dy, "--spark-tilt": spark.tilt, "--spark-delay": spark.delay } as React.CSSProperties} />)}</span>
            </motion.h1>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.64, delay: 0.28, ease: [0.23, 1, 0.32, 1] }} className="mt-8 max-w-lg">
              <p className="hero-role-cycle" aria-live="polite"><span className="hero-role-label">Now operating as</span><AnimatePresence mode="wait" initial={false}><motion.span key={professionalRoles[roleIndex]} className="hero-role-value" initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }} animate={reduceMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }} exit={reduceMotion ? {} : { opacity: 0, y: -7, filter: "blur(3px)" }} transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}>{professionalRoles[roleIndex]}</motion.span></AnimatePresence></p>
              <p className="mt-4 max-w-md text-[0.93rem] leading-7 text-[#aca6ba]">Crafting intuitive interfaces and full-stack experiences — from Figma to production code.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="signal-button primary" onClick={() => scrollToSection("work")}>Open selected work <ArrowDownRight size={16} /></button>
                <button className="signal-button" onClick={downloadResume}>Retrieve résumé <Download size={15} /></button>
              </div>
              <div className="hero-contact-cluster mt-9 flex flex-wrap gap-2.5">
                <a className="icon-button hero-contact-link" href="mailto:manojprabhu0707@gmail.com" aria-label="Email Manoj" data-tooltip="Email Manoj"><Mail size={17} /></a>
                <a className="icon-button hero-contact-link" href="tel:+919677518268" aria-label="Call Manoj" data-tooltip="Call Manoj"><Phone size={17} /></a>
                <a className="icon-button hero-contact-link" href="https://github.com/manojprabhu07" target="_blank" rel="noreferrer" aria-label="Visit GitHub" data-tooltip="GitHub"><Github size={17} /></a>
                <a className="icon-button hero-contact-link" href="https://www.linkedin.com/in/manojprabhu07" target="_blank" rel="noreferrer" aria-label="Visit LinkedIn" data-tooltip="LinkedIn"><Linkedin size={17} /></a>
              </div>
              <button className="recruiter-hero-trigger hero-recruiter-signal" type="button" onClick={() => setRecruiterOpen(true)}>Recruiter quick-view <ArrowUpRight size={14} /></button>
            </motion.div>
          </div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 24 }} animate={reduceMotion ? {} : { opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.95, delay: 0.18, ease: [0.23, 1, 0.32, 1] }} className="hero-visual" onPointerDown={createNebulaBurst} onPointerMove={extendConstellation} onPointerLeave={() => setConstellationTrail([])}>
            {lowDataMode ? <img className="hero-image" src="/manus-storage/smp-hero-orbit_86f3fd46.jpg" alt="Abstract ultraviolet orbit study" /> : <video ref={heroVideoRef} className="hero-video" autoPlay={!reduceMotion && !motionPaused} loop muted playsInline preload="metadata" poster="/manus-storage/smp-hero-orbit_86f3fd46.jpg" aria-hidden="true">
              <source src="/manus-storage/smp-anime-black-hole_fe55ef2a.mp4" type="video/mp4" />
            </video>}
            <div className="hero-grid" />
            <div className="nebula-starfield" aria-hidden="true">{nebulaStars.map((star) => <span key={star.id} className={`nebula-star ${star.tone}`} style={{ left: `${star.left}%`, top: `${star.top}%`, "--star-size": `${star.size}px`, "--star-opacity": star.opacity, "--star-delay": `${star.delay}s`, "--star-speed": `${star.speed}s` } as React.CSSProperties} />)}{starBursts.map((burst) => <span key={burst.id} className="nebula-burst" style={{ left: `${burst.x}%`, top: `${burst.y}%` }} />)}</div>
            <div className="constellation-trail" aria-hidden="true">{constellationSegments.map((segment) => <span key={segment.id} className="constellation-line" style={{ left: `${segment.x}%`, top: `${segment.y}%`, width: `${segment.length}%`, transform: `rotate(${segment.angle}deg)` }} />)}{constellationTrail.map((point) => <span key={point.id} className="constellation-point" style={{ left: `${point.x}%`, top: `${point.y}%` }} />)}</div>
            <div className="hero-seal" aria-label="SMP signal mark"><span className="signal-stroke one" /><span className="signal-stroke two" /><span className="signal-stroke three" /></div>
            <span className="hero-seal-caption">SMP / orbit study</span>
            <div className="orbit" aria-hidden="true" />
            <div className="absolute left-5 top-5 z-10 flex items-center gap-2 border border-white/10 bg-[#0b0a12]/50 px-3 py-2 backdrop-blur-md"><Sparkles size={13} className="text-violet-300" /><span className="label text-[0.55rem] text-white/80">SMP orbit, in motion</span></div>
            <div className="absolute bottom-5 left-5 z-10 max-w-[13rem] border-l border-violet-300/60 pl-3"><p className="label text-[0.57rem] text-violet-200">Based in</p><p className="mt-1 text-sm font-semibold text-white">Polur, Tamil Nadu</p></div>
          </motion.div>
        </div>
      </section>

      <div className="reel" aria-label="Selected capabilities">
        <div className="reel-track">
          {[...reelItems, ...reelItems, ...reelItems].map((item, index) => <div className="reel-item" key={`${item}-${index}`}><span className="signal-dot scale-[0.62]" />{item}</div>)}
        </div>
      </div>

      <AnimatePresence>{recruiterOpen ? <motion.aside className="recruiter-brief-card" role="dialog" aria-modal="true" aria-label="Recruiter quick-view" initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.97 }} transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}><div className="recruiter-brief-head"><div><p className="label">Recruiter quick-view</p><p className="mt-1 text-sm font-semibold text-white">S Manoj Prabhu</p></div><button className="recruiter-close" type="button" onClick={() => setRecruiterOpen(false)} aria-label="Close recruiter quick-view"><X size={17} /></button></div><div className="recruiter-availability"><span className="signal-dot" /><span>Open to internships and collaborative product work</span></div><div className="recruiter-detail-grid"><div><p className="label">Based in</p><p>Polur, Tamil Nadu</p></div><div><p className="label">Core stack</p><p>React · Figma · Java</p></div><div><p className="label">Proof</p><p>85% ML accuracy</p></div><div><p className="label">Contact</p><p>Reply within 1–2 days</p></div></div><div className="recruiter-brief-actions"><button className="signal-button primary" type="button" onClick={downloadResume}>Get résumé <Download size={14} /></button><a className="signal-button" href="mailto:manojprabhu0707@gmail.com">Email Manoj <Mail size={14} /></a></div></motion.aside> : null}</AnimatePresence>

      <AnimatePresence>{recruiterReviewOpen ? <motion.aside className="recruiter-review-panel" role="region" aria-label="Recruiter review path" initial={reduceMotion ? false : { opacity: 0, y: 16, scale: .98 }} animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? {} : { opacity: 0, y: 12, scale: .98 }} transition={{ duration: .24, ease: [0.23, 1, 0.32, 1] }}><div className="recruiter-review-head"><div><p className="label">Recruiter review path</p><p>Four signals. One concise review.</p></div><button type="button" className="recruiter-close" onClick={() => setRecruiterReviewOpen(false)} aria-label="Close recruiter review path"><X size={17} /></button></div><div className="recruiter-review-progress" aria-label={`Checkpoint ${recruiterReviewStep + 1} of ${recruiterReviewSteps.length}`}>{recruiterReviewSteps.map((step, index) => <button key={step.id} type="button" className={index === recruiterReviewStep ? "is-active" : index < recruiterReviewStep ? "is-complete" : ""} onClick={() => goToRecruiterReviewStep(index)} aria-current={index === recruiterReviewStep ? "step" : undefined}><span>{step.index}</span><em>{step.label}</em></button>)}</div><div className="recruiter-review-copy" aria-live="polite"><span className="label">{recruiterReviewSteps[recruiterReviewStep].index} / {recruiterReviewSteps[recruiterReviewStep].label}</span><p>{recruiterReviewSteps[recruiterReviewStep].note}</p></div><div className="recruiter-review-actions"><button type="button" onClick={() => goToRecruiterReviewStep(recruiterReviewStep - 1)} disabled={recruiterReviewStep === 0}>Previous</button><button type="button" className="signal-button primary" onClick={() => recruiterReviewStep === recruiterReviewSteps.length - 1 ? setRecruiterReviewOpen(false) : goToRecruiterReviewStep(recruiterReviewStep + 1)}>{recruiterReviewStep === recruiterReviewSteps.length - 1 ? "Complete review" : "Next signal"} <ArrowDownRight size={14} /></button></div></motion.aside> : null}</AnimatePresence>

      <section id="about" className="editorial-band container py-28 md:py-40">
        <div className="mini-singularity about-singularity" aria-hidden="true"><span /></div><span className="signal-thread about-thread" aria-hidden="true" />
        <Reveal><SectionIntro index="02" eyebrow="Working at the intersection" title="Systems made visible." detail="A frontend developer and UI/UX designer who moves from interface structure to implementation — with enough backend and machine-learning context to make the whole experience connect." motionPaused={motionPaused} /></Reveal>
        <div className="about-proof mt-14 grid gap-5 lg:grid-cols-[1.28fr_.72fr]">
          <Reveal delay={0.06} className="panel relative overflow-hidden p-7 md:p-10">
            <div className="absolute right-0 top-0 h-32 w-32 bg-violet-500/15 blur-3xl" />
            <p className="display max-w-[20ch] text-2xl leading-tight text-[#eeeaff] md:text-[2rem]">I turn <span className="text-violet-300">complex product intent</span> into interface systems that are intuitive to use and practical to ship.</p>
            <div className="mt-12 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div><p className="display text-3xl text-white">20<span className="text-violet-300">+</span></p><p className="label mt-2 text-[0.57rem]">Reusable React components</p></div>
              <div><p className="display text-3xl text-white">10<span className="text-violet-300">+</span></p><p className="label mt-2 text-[0.57rem]">High-fidelity Figma screens</p></div>
              <div><p className="display text-3xl text-white">85<span className="text-violet-300">%</span></p><p className="label mt-2 text-[0.57rem]">Best ML classification accuracy</p></div>
            </div>
          </Reveal>
          <Reveal delay={0.14} className="panel p-7 md:p-8">
            <p className="label">Operating principles</p>
            <div className="mt-7 space-y-6">
              {["Make the hierarchy do the explaining.", "Build the component system before the screen count grows.", "Test interactions where they matter: in the flow."].map((line, index) => <div key={line} className="flex gap-4"><span className="display text-lg text-violet-300">0{index + 1}</span><p className="max-w-[19ch] text-sm leading-6 text-[#c5bfce]">{line}</p></div>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="work" className="editorial-band top-rule bg-[#0d0b15] py-28 md:py-40" onPointerDown={createProjectPulse} onPointerMove={followProjectFinder} onPointerLeave={() => setProjectFinder((current) => ({ ...current, active: false }))}>
        <div className="project-atmosphere" aria-hidden="true"><img className="project-seal-ghost" src="/manus-storage/smp-logo_526971d2.png" alt="" /><span className="project-signal-wave" />{projectPulses.map((pulse) => <span key={pulse.id} className="project-pulse" style={{ left: `${pulse.x}%`, top: `${pulse.y}%` }} />)}<span className={`project-orbital-finder ${projectFinder.active ? "is-active" : ""}`} style={{ left: `${projectFinder.x}%`, top: `${projectFinder.y}%` }}><i /><i /></span></div>
        <div className="container relative z-10"><Reveal><SectionIntro index="03" eyebrow="Selected work" title="Proof of practice." detail="Two focused case studies across applied machine learning and mobile product design — distinct problems, one bias toward clear decisions." motionPaused={motionPaused} /></Reveal>
          <nav className="mobile-project-nav" aria-label="Project study navigation"><span className="mobile-project-label">Jump to study</span><button onClick={() => scrollToSection("attack-study")}>01 Attack model</button><button onClick={() => scrollToSection("delivery-study")}>02 Delivery app</button></nav>
          <div className="project-orbit-selector" aria-label="Featured project selector">
            <div className="project-orbit-intro"><p className="label">Project orbit / choose a signal</p><p>Rotate between the two studies, then follow the selected signal into the work.</p><span className="project-orbit-current">{orbitProjects.find((project) => project.id === activeOrbitProject)?.signal}</span></div>
            <div className="project-orbit-stage">
              <span className="project-orbit-ring outer" aria-hidden="true" /><span className="project-orbit-ring inner" aria-hidden="true" /><span className="project-orbit-axis" aria-hidden="true" />
              <span className="project-orbit-core" aria-hidden="true"><i /><b>Work<br />orbit</b></span>
              {orbitProjects.map((project, index) => <button key={project.id} className={`orbit-project-node node-${index + 1} ${activeOrbitProject === project.id ? "is-active" : ""}`} type="button" aria-pressed={activeOrbitProject === project.id} onFocus={() => setActiveOrbitProject(project.id)} onClick={() => selectOrbitProject(project.id)}><span className="orbit-project-index">{project.index}</span><span><b>{project.title}</b><em>{project.discipline}</em></span></button>)}
            </div>
          </div>
          <div className="project-comparison-shell"><button className={`project-comparison-toggle ${comparisonOpen ? "is-open" : ""}`} type="button" onClick={() => setComparisonOpen((current) => !current)} aria-expanded={comparisonOpen} aria-controls="project-comparison"><span>Compare signals</span><span>{comparisonOpen ? "Close" : "Open"} <ArrowUpRight size={13} /></span></button><AnimatePresence initial={false}>{comparisonOpen ? <motion.div id="project-comparison" className="project-comparison" initial={reduceMotion || motionPaused ? false : { opacity: 0, y: 8, scale: 0.99 }} animate={reduceMotion || motionPaused ? {} : { opacity: 1, y: 0, scale: 1 }} exit={reduceMotion || motionPaused ? {} : { opacity: 0, y: -5, scale: 0.99 }} transition={{ duration: .22, ease: [0.23, 1, 0.32, 1] }}><div className="comparison-head"><span>Signal</span><b>Attack model</b><b>Delivery flow</b></div><div><span>Outcome</span><b>85% accuracy</b><b>15+ screens</b></div><div><span>Method</span><b>4-model evaluation</b><b>2 review cycles</b></div><div><span>Tools</span><b>Python · Scikit-learn</b><b>Figma · Mobile UX</b></div></motion.div> : null}</AnimatePresence></div>
          <div className="project-grid mt-14 grid gap-5 lg:grid-cols-2">
            <Reveal delay={0.06}><article id="attack-study" className="project-card panel" tabIndex={0} aria-label="Prediction of Perpetration Attack case study. Focus to reveal the project note." onMouseMove={handleProjectTilt} onMouseLeave={resetProjectTilt}>
              <img className="project-art" src="/manus-storage/smp-project-security_4a7c2847.jpg" alt="Abstract diagnostic network visual for cybersecurity machine learning project" />
              <div className="project-scrim" /><span className="project-signal">classified study</span><span className="project-index">01 / 02</span><ProjectSignalFocus tone="cyan" motionPaused={motionPaused} />
              <div className="project-caption"><div className="project-caption-head"><span className="label text-[0.5rem] text-violet-100">Case signal</span><span className="project-metric">85% accuracy</span></div><p>Four-model classifier for attack-pattern detection.</p></div>
              <div className="relative z-10 flex min-h-[480px] flex-col justify-end p-7 md:p-9"><p className="project-meta label text-violet-200">Machine learning · 01/2024—04/2024</p><h3 className="display mt-3 max-w-[11ch] text-4xl leading-[0.95] text-white md:text-5xl">Prediction of Perpetration Attack</h3><p className="mt-5 max-w-[44ch] text-sm leading-6 text-[#cec6da]">Built and evaluated four Python / Scikit-learn models — XGBoost, SVM, Logistic Regression, and Gradient Boosting — reaching <strong className="font-semibold text-white">85% classification accuracy</strong> on a cybersecurity dataset.</p><ProjectProofMarker value="85" suffix="%" ringValue={85} label="Best accuracy" detail="XGBoost selected after four-model evaluation" tone="cyan" motionPaused={motionPaused} /><AttackModelWalkthrough motionPaused={motionPaused} lowDataMode={lowDataMode} /><CaseSignalReveal id="attack-study" open={openCaseSignal === "attack-study"} onToggle={() => setOpenCaseSignal((current) => current === "attack-study" ? null : "attack-study")} motionPaused={motionPaused} /><div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5"><span className="label text-[0.57rem] text-white/65">Python · Scikit-learn · Model evaluation</span><a className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-violet-200 hover:text-white" href="https://github.com/manojprabhu07/Research-Papers-Final-Year-Project" target="_blank" rel="noreferrer">Open repository <ArrowUpRight size={15} /></a></div></div>
            </article></Reveal>
            <Reveal delay={0.13}><article id="delivery-study" className="project-card panel" tabIndex={0} aria-label="Food Delivery Mobile App case study. Focus to reveal the project note." onMouseMove={handleProjectTilt} onMouseLeave={resetProjectTilt}>
              <img className="project-art" src="/manus-storage/smp-project-food_c1b44933.jpg" alt="Abstract layered mobile interface visual for food delivery design project" />
              <div className="project-scrim" /><span className="project-signal">interaction study</span><span className="project-index">02 / 02</span><ProjectSignalFocus tone="violet" motionPaused={motionPaused} /><BlueprintCrosshair motionPaused={motionPaused} />
              <div className="project-caption"><div className="project-caption-head"><span className="label text-[0.5rem] text-violet-100">Case signal</span><span className="project-metric">15+ screens</span></div><p>Task-first flow from discovery through delivery.</p></div>
              <div className="relative z-10 flex min-h-[480px] flex-col justify-end p-7 md:p-9"><p className="project-meta label text-violet-200">UI / UX design · 06/2023—08/2023</p><h3 className="display mt-3 max-w-[11ch] text-4xl leading-[0.95] text-white md:text-5xl">Food Delivery Mobile App</h3><p className="mt-5 max-w-[44ch] text-sm leading-6 text-[#cec6da]">Designed <strong className="font-semibold text-white">15+ production-ready screens</strong>, covering onboarding, discovery, cart, and order tracking, guided by Material Design and refined across two usability review cycles.</p><ProjectProofMarker value="15+" ringValue={100} label="Screens mapped" detail="Two usability review cycles across the mobile flow" motionPaused={motionPaused} /><DeliveryWalkthrough motionPaused={motionPaused} lowDataMode={lowDataMode} /><CaseSignalReveal id="delivery-study" open={openCaseSignal === "delivery-study"} onToggle={() => setOpenCaseSignal((current) => current === "delivery-study" ? null : "delivery-study")} motionPaused={motionPaused} /><div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5"><span className="label text-[0.57rem] text-white/65">Figma · Mobile UX · Interaction flows</span><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-violet-200">Case study available on request <ArrowUpRight size={15} /></span></div></div>
            </article></Reveal>
          </div>
        </div>
      </section>

      <section id="experience" className="editorial-band container py-28 md:py-40">
        <Reveal><SectionIntro index="04" eyebrow="Experience" title="Learning in the work." detail="A growing practice across product design, full-stack delivery, and the systems that connect a polished surface to dependable behaviour." motionPaused={motionPaused} /></Reveal>
        <div className="experience-layout mt-14 grid gap-12 lg:grid-cols-[1.28fr_.72fr] lg:gap-20">
          <div className="timeline-list"><Reveal><div className="timeline-row"><TimelineCheckpoint motionPaused={motionPaused} /><div className="label leading-6">{experience[0].period}<br /><span className="text-[#777285]">{experience[0].place}</span></div><div><h3 className="display text-2xl text-white">{experience[0].role}</h3><p className="mt-1 text-sm text-violet-200">{experience[0].company}</p><ul className="mt-4 space-y-2.5 text-sm leading-6 text-[#b7b0c1]">{experience[0].details.map((detail) => <li key={detail} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 bg-violet-300" />{detail}</li>)}</ul></div></div></Reveal>
            {experience.slice(1).map((item, index) => <Reveal delay={(index + 1) * 0.08} key={item.company}><div className="timeline-row"><TimelineCheckpoint motionPaused={motionPaused} /><div className="label leading-6">{item.period}<br /><span className="text-[#777285]">{item.place}</span></div><div><h3 className="display text-2xl text-white">{item.role}</h3><p className="mt-1 text-sm text-violet-200">{item.company}</p><ul className="mt-4 space-y-2.5 text-sm leading-6 text-[#b7b0c1]">{item.details.map((detail) => <li key={detail} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 bg-violet-300" />{detail}</li>)}</ul></div></div></Reveal>)}
          </div>
          <Reveal delay={0.1} className="panel self-start p-7 md:p-8"><div className="flex items-center gap-3"><GraduationCap className="text-violet-300" size={20} /><p className="label">Education</p></div><div className="mt-7"><p className="display text-3xl leading-tight text-white">B.Tech, Information Technology</p><p className="mt-3 text-sm leading-6 text-[#c2bbce]">Saveetha School of Engineering, Chennai</p><p className="mt-5 border-l border-violet-400 pl-3 text-sm text-violet-200">09/2021—Present · CGPA 8.0 / 10.0</p></div><div className="mt-8 space-y-3 border-t border-white/10 pt-6"><div className="flex justify-between text-sm text-[#aaa4b7]"><span>HSC</span><span className="text-white">80%</span></div><div className="flex justify-between text-sm text-[#aaa4b7]"><span>SSLC</span><span className="text-white">79%</span></div></div></Reveal>
        </div>
      </section>

      <section className="editorial-band top-rule bg-[#0d0b15] py-28 md:py-40">
        <div className="mini-singularity skill-singularity" aria-hidden="true"><span /></div><span className="signal-thread skill-thread" aria-hidden="true" />
        <div className="container"><Reveal><SectionIntro index="05" eyebrow="Capabilities" title="A stack with range." detail="Design craft, frontend detail, backend thinking, and applied experimentation — organised around the goal of making a useful product feel inevitable." motionPaused={motionPaused} /></Reveal>
          <Reveal delay={0.08}><div className="skill-legend" aria-label="Four-point star-map proficiency scale"><span className="skill-legend-title">Star map / four-point scale</span>{[[1, "Exploring"], [2, "Foundation"], [3, "Working"], [4, "Applied"]].map(([stars, label]) => <span className="skill-legend-item" key={label as string}><span className="skill-legend-stars" aria-hidden="true">{Array.from({ length: 4 }, (_, star) => <b key={star} className={star < Number(stars) ? "is-lit" : ""} />)}</span>{label}</span>)}</div></Reveal>
          <div className="capability-grid mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => <Reveal key={skill.code} delay={index * 0.04}><div className="min-h-[180px] bg-[#100d18] p-6 transition-colors hover:bg-[#171126]"><div className="flex items-start justify-between"><p className="label">{skill.code}</p><Layers3 size={18} className="text-violet-300" /></div><h3 className="display mt-7 text-2xl text-white">{skill.title}</h3><div className="mt-5 flex flex-wrap gap-2">{skill.items.map((item) => { const proficiency = skillProficiency[item] ?? { level: "Working", stars: 3 }; return <span className="skill-chip" key={item} tabIndex={0} aria-label={`${item}: ${proficiency.level} proficiency`}><span>{item}</span><span className="skill-tooltip" role="tooltip"><span className="skill-star-map" aria-hidden="true">{Array.from({ length: 4 }, (_, star) => <i key={star} className={star < proficiency.stars ? "is-lit" : ""} />)}</span><span className="skill-tooltip-copy">{proficiency.level} proficiency</span></span></span>; })}</div></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="editorial-band container py-28 md:py-40">
        <div className="mini-singularity credential-singularity" aria-hidden="true"><span /></div><span className="signal-thread credential-thread" aria-hidden="true" />
        <Reveal><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="label">06 / Credentials</p><h2 className="display mt-4 text-4xl text-white md:text-6xl">Signals of momentum.</h2></div><BriefcaseBusiness className="mb-2 text-violet-300" size={28} /></div></Reveal>
        <div className="credential-grid mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">{certifications.map(([issuer, title, meta], index) => <Reveal delay={index * 0.06} key={title}><div className="cert bg-[#0d0b15]"><p className="label text-violet-200">{issuer}</p><p className="display mt-6 text-xl leading-tight text-white">{title}</p><p className="mt-4 text-xs text-[#9d96ac]">{meta}</p></div></Reveal>)}</div>
      </section>

      <section id="contact" className="editorial-band relative overflow-hidden border-t border-white/10 py-28 md:py-40" onPointerDown={createContactPulse} onPointerMove={extendContactConstellation} onPointerLeave={() => setContactConstellationTrail([])} style={{ backgroundImage: "linear-gradient(90deg, rgba(9,9,15,.95), rgba(9,9,15,.8)), url('/manus-storage/smp-ambient-texture_4dec6a68.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className={`contact-atmosphere ${contactFocused ? "is-engaged" : ""}`} aria-hidden="true"><span className="contact-orbit one" /><span className="contact-orbit two" /><span className="contact-glint one" /><span className="contact-glint two" /><span className="contact-beacon"><i /><i /><i /></span>{contactPulses.map((pulse) => <span key={pulse.id} className="contact-pulse" style={{ left: `${pulse.x}%`, top: `${pulse.y}%` }} />)}</div>
        <div className="contact-constellation" aria-hidden="true">{contactConstellationSegments.map((segment) => <span key={segment.id} className="constellation-line" style={{ left: `${segment.x}%`, top: `${segment.y}%`, width: `${segment.length}%`, transform: `rotate(${segment.angle}deg)` }} />)}{contactConstellationTrail.map((point) => <span key={point.id} className="constellation-point" style={{ left: `${point.x}%`, top: `${point.y}%` }} />)}</div>
        <div className="container relative z-10"><Reveal><div className="grid gap-12 lg:grid-cols-[.86fr_1.14fr] lg:gap-24"><div><p className="label">07 / Contact</p><h2 className="display mt-5 max-w-[9ch] text-5xl leading-[.9] text-white md:text-7xl">Let&apos;s make the next interaction <span className="violet-text">count.</span></h2><p className="mt-7 max-w-md text-[0.94rem] leading-7 text-[#b7b0c1]">For frontend, UI/UX, Java, or collaborative product work, write a note with a little context. I&apos;ll take it from there.</p><div className="mt-10 space-y-4"><a href="mailto:manojprabhu0707@gmail.com" className="flex items-center gap-4 text-sm text-[#d3cce0] hover:text-white"><span className="icon-button h-10 w-10"><Mail size={16} /></span>manojprabhu0707@gmail.com</a><a href="tel:+919677518268" className="flex items-center gap-4 text-sm text-[#d3cce0] hover:text-white"><span className="icon-button h-10 w-10"><Phone size={16} /></span>+91 9677518268</a><a href="https://maps.google.com/?q=Polur,Tamil+Nadu" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-sm text-[#d3cce0] hover:text-white"><span className="icon-button h-10 w-10"><MapPin size={16} /></span>Polur, Tamil Nadu</a></div></div>
          <form className="panel p-6 md:p-9" onSubmit={handleContact} onFocusCapture={() => setContactFocused(true)} onBlurCapture={handleContactBlur}><div className="grid gap-5"><div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><span className="label text-[0.57rem]">Correspondence / 01</span><button type="button" className="motion-toggle" onClick={() => setMotionPaused((paused) => !paused)} aria-pressed={motionPaused || Boolean(reduceMotion)} aria-label={reduceMotion ? "Background motion is paused by your device setting" : motionPaused ? "Resume background motion" : "Pause background motion"} disabled={Boolean(reduceMotion)}>{motionPaused || reduceMotion ? <Play size={13} /> : <Pause size={13} />}{motionPaused || reduceMotion ? "Motion paused" : "Motion live"}</button></div><label className="block"><span className="label mb-2 block">Your name</span><input className="form-field" required name="name" placeholder="What should I call you?" /></label><label className="block"><span className="label mb-2 block">Email</span><input className="form-field" type="email" required name="email" placeholder="name@company.com" /></label><label className="block"><span className="label mb-2 block">Message</span><textarea className="form-field min-h-36 resize-y" required name="message" placeholder="A few lines about the work, goal, or opportunity..." /></label><button className="signal-button primary w-full" type="submit">{sent ? "Message prepared" : "Send the note"} <Send size={15} /></button>{sent ? <div className="delivery-status" role="status" aria-live="polite"><CircleCheckBig size={19} /><div><p className="label text-[0.56rem] text-violet-100">Message prepared</p><p className="mt-1 text-xs leading-5 text-[#dfd6f5]">Your email app opened with this note addressed to Manoj. Send it there to complete delivery.</p></div></div> : null}<p className="text-center text-xs leading-5 text-[#827b91]">This form prepares a message in your email client; final delivery is confirmed by your email provider.</p></div></form></div></Reveal></div>
      </section>

      <footer className="border-t border-white/10 bg-[#08080e] py-7"><div className="container flex flex-col justify-between gap-5 text-xs text-[#8d869a] sm:flex-row sm:items-center"><div className="flex items-center gap-3"><span className="seal-wrap h-9 w-9"><img src="/manus-storage/smp-logo_526971d2.png" alt="SMP monogram" /></span><span>© {year} S Manoj Prabhu. Built with intention.</span></div><div className="flex items-center gap-4"><a className="hover:text-violet-200" href="https://github.com/manojprabhu07" target="_blank" rel="noreferrer">GitHub</a><a className="hover:text-violet-200" href="mailto:manojprabhu0707@gmail.com">Email</a><button className="inline-flex items-center gap-1 hover:text-violet-200" onClick={() => scrollToSection("top")}>Back to top <ArrowUpRight size={13} /></button><button className={`footer-star ${footerBurst ? "is-bursting" : ""}`} onClick={triggerFooterBurst} aria-label={reduceMotion ? "Star motion is disabled by your device setting" : motionPaused ? "Star motion is paused" : "Release a closing spark"} disabled={Boolean(reduceMotion || motionPaused)}><Sparkles size={14} /><span className="spark-tooltip">Release spark</span><span className="corner-spark-field" aria-hidden="true">{footerBurst ? Array.from({ length: 8 }, (_, index) => <span key={`${footerBurst}-${index}`} className="corner-spark" style={{ "--spark-angle": `${index * 45}deg` } as React.CSSProperties} />) : null}</span></button></div></div></footer>
      <div className="mobile-contact-dock" aria-label="Mobile quick actions"><button className="mobile-resume-action" type="button" onClick={downloadResume}><Download size={15} />Résumé</button><button className="mobile-contact-action" type="button" onClick={() => scrollToSection("contact")}><Mail size={16} />Contact</button></div>
    </main>
  );
}
