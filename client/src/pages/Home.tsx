/**
 * Obsidian Studio page — an asymmetric editorial reel with ultraviolet signals and purposeful micro-motion.
 */
import { FocusEvent, FormEvent, MouseEvent, PointerEvent as ReactPointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
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
const experienceSignals = ["8+ APIs shipped", "3 review cycles", "20+ components"] as const;
const experienceConnections = [
  { role: "Project Intern", focus: "Java service delivery", skills: ["Java", "Spring Boot", "REST APIs", "MySQL"] },
  { role: "UI/UX Design Intern", focus: "Research-led interface design", skills: ["Figma", "Usability", "Wireframes", "Prototypes"] },
  { role: "UI/UX Design Intern", focus: "Reusable mobile systems", skills: ["Figma", "Components", "Material Design", "Mobile flows"] },
] as const;
const experienceSkillNodes = ["Java", "Spring Boot", "REST APIs", "MySQL", "Figma", "Usability", "Components", "Mobile flows"] as const;

const certifications = [
  { issuer: "Oracle", title: "APEX Cloud Developer Professional", meta: "1Z0-771", theme: "Application development", focus: "Cloud delivery" },
  { issuer: "IBM", title: "Artificial Intelligence Fundamentals", meta: "SkillsBuild", theme: "Applied intelligence", focus: "AI foundations" },
  { issuer: "NPTEL", title: "Introduction to IoT", meta: "Credential", theme: "Connected systems", focus: "IoT concepts" },
  { issuer: "Infosys", title: "Springboard Internship 6.0", meta: "Certificate", theme: "Industry practice", focus: "Product delivery" },
] as const;

const reelItems = ["React interfaces", "Figma systems", "Java services", "REST APIs", "Product thinking", "Applied ML"];
const professionalRoles = ["Frontend Developer", "UI/UX Designer", "Java Developer"];
const orbitProjects = [
  { id: "attack-study", index: "01", title: "Attack model", discipline: "ML / security", signal: "85% accuracy" },
  { id: "delivery-study", index: "02", title: "Delivery flow", discipline: "UX / mobile", signal: "15+ screens" },
  { id: "ai-content-studio", index: "03", title: "AI content studio", discipline: "Automation / media", signal: "Auto pipeline" },
  { id: "polur-charm", index: "04", title: "Polur Charm", discipline: "Travel / civic tech", signal: "24/7 discovery" },
] as const;
type OrbitProjectId = (typeof orbitProjects)[number]["id"];
const projectSkillGravity = {
  "attack-study": { label: "Attack model", note: "Python, XGBoost, SVM, Logistic Regression", skills: ["Python", "XGBoost", "SVM", "Logistic Regression"] },
  "delivery-study": { label: "Delivery flow", note: "Figma, Wireframing, Prototyping, Material-led UI", skills: ["Figma", "Wireframing", "Prototyping", "HTML5"] },
  "ai-content-studio": { label: "AI content studio", note: "Python automation, JavaScript, REST APIs, and Git", skills: ["Python", "JavaScript", "REST API", "Git"] },
  "polur-charm": { label: "Polur Charm", note: "React, TypeScript, Tailwind CSS, localization, and civic discovery", skills: ["JavaScript", "HTML5", "CSS3", "REST API"] },
} as const;
const skillGravityVectors: Record<string, { x: string; y: string }> = {
  Python: { x: "7px", y: "-4px" }, XGBoost: { x: "-7px", y: "4px" }, SVM: { x: "5px", y: "5px" }, "Logistic Regression": { x: "-5px", y: "-5px" },
  Figma: { x: "7px", y: "-4px" }, Wireframing: { x: "-7px", y: "4px" }, Prototyping: { x: "5px", y: "5px" }, HTML5: { x: "-5px", y: "-5px" },
};
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
  "polur-charm": {
    challenge: "Make regional travel information, public services, and heritage discovery easier to use in one bilingual place.",
    approach: "Combined local directories, transit planning, safety information, public utility maps, and game-like exploration tools.",
    outcome: "An active digital guide for residents and travellers exploring Polur, Parvathamalai, and nearby destinations.",
  },
} as const;
type CaseStudyId = keyof typeof caseSignals;
const aiContentStudio = {
  title: "YouTube Auto-Uploader & Autonomous AI Content Studio",
  category: "AI & Backend Automation / Media Processing Pipelines",
  status: "Production-Ready / Deployed",
  role: "Lead Backend & Automation Architect",
  description: "An autonomous YouTube content automation engine and media-processing pipeline built with Python for continuous cloud operation. It monitors multiple channels, creates vertical Shorts, prepares multilingual metadata and thumbnails, schedules publishing, and tracks operational risk.",
  problem: "Reduces repetitive manual work across content monitoring, downloading, editing, metadata preparation, and scheduling while managing reliability, quotas, duplicate processing, and content-risk monitoring.",
  features: ["Autonomous multi-channel ingestion and monitoring", "Resilient multi-tier download and processing paths", "Automated vertical Shorts generation with FFmpeg", "AI-assisted SEO tags and descriptions with Groq LLaMA", "Gemini-powered multimodal captions and thumbnail workflows", "Bilingual localization and metadata workflows", "Weekly mashup and collage generation", "SHA-256 and similarity-based deduplication", "Telegram remote control with approval workflows", "Copyright and content-risk alerts", "Cloud recovery, retries, and API quota management"],
  highlights: ["Fallback routing when individual download or processing paths fail", "SHA-256 persistence, regex filtering, and fuzzy matching for duplicate reduction", "State and OAuth credential restoration through stateless cloud cold starts", "Thread-safe API client management with quota tracking", "Exponential-backoff retries for network and API failures", "Concurrent processing controls using locks and events"],
  stack: [
    { label: "AI & APIs", values: ["YouTube Data API v3", "Google Gemini API", "Imagen 3", "Groq LLaMA", "Telegram Bot API", "Pyrogram", "JSONBin API", "Deep Translator"] },
    { label: "Media", values: ["FFmpeg", "FFprobe", "MoviePy", "Pillow", "yt-dlp"] },
    { label: "Cloud & reliability", values: ["Python 3.11+", "Render", "GitHub Actions", "Multithreading", "threading.Lock", "RLock", "Event", "urllib3", "Exponential Backoff"] },
  ],
  tags: ["Python", "YouTube API v3", "Google Gemini AI", "Imagen 3", "Groq LLaMA", "FFmpeg", "yt-dlp", "GitHub Actions", "Telegram Bot API", "Multithreading", "Pillow", "Render Cloud", "Media Automation"],
} as const;
const polurCharm = {
  title: "Polur Charm",
  category: "Web Development / Travel & Civic Tech",
  status: "In Progress / Active",
  role: "Full-Stack Frontend Developer",
  description: "An interactive bilingual digital tourism and civic discovery platform for Polur, Parvathamalai, and surrounding heritage destinations.",
  problem: "Brings travel planning, pilgrimage information, civic essentials, local discovery, and safety guidance into a clearer digital experience for residents and visitors.",
  features: ["Local directory for attractions, cuisine, hotels, and agro-tourism", "Side-by-side destination comparison", "24/7 transit hub with bus schedules, train routes, fare estimator, and regional assistant", "English and Tamil localization", "Emergency contacts and public utility maps", "Gamified Heritage Quest with quiz trails, XP points, and collectible badges", "Smart trip planner, ghat road safety advisor, full moon trek alerts, and budget calculators"],
  highlights: ["Structured travel and civic information into a single discovery system", "Designed bilingual content pathways for English and Tamil visitors", "Paired live-transit planning with public-service information", "Turned heritage exploration into guided, replayable quest journeys", "Applied SEO and Schema.org thinking to a regional discovery experience"],
  stack: [
    { label: "Application", values: ["React 19", "TypeScript", "TanStack Start", "TanStack Router", "TanStack Query"] },
    { label: "Interface", values: ["Tailwind CSS v4", "Radix UI", "Vite", "Zod", "Recharts"] },
    { label: "Experience", values: ["i18n Localization", "SEO", "Schema.org", "Travel discovery", "Civic information"] },
  ],
  tags: ["React 19", "TypeScript", "TanStack Start", "TanStack Router", "Tailwind CSS", "Radix UI", "i18n Localization", "SEO", "Schema.org", "Travel Tech", "Civic Tech"],
} as const;
const projectCollection = [
  {
    id: "anime-pinterest-automation",
    title: "Anime Pinterest Automation Bot",
    label: "Backend automation",
    tagline: "Automated scraping, image processing, and affiliate monetization pipeline for Pinterest.",
    category: "Backend Development & Automation",
    status: "Completed",
    description: "A Python automation service that processes art content from Telegram channels, prepares Pinterest-friendly images, generates contextual affiliate links, and publishes pins through the Pinterest API with rate limiting and daily quotas.",
    problem: "Streamlines repeated content extraction, preparation, affiliate linking, and scheduled publishing into one controlled workflow.",
    features: ["Automated content extraction and processing", "1000×1500 resizing, cropping, and watermarking", "Affiliate-link and hashtag generation", "Background posting queue with daily limits", "Pinterest media publishing and board selection"],
    technologies: ["Python", "BeautifulSoup4", "Pillow", "Pinterest API v5", "Flask", "Requests", "Render"],
    tags: ["Python", "Automation", "Web Scraping", "REST APIs", "Image Processing", "Social Media Bot"],
    image: "/manus-storage/project-collection-pinterest-automation_0e75a634.jpg",
    alt: "Original cinematic image automation visual with abstract creative image tiles and content-processing signals",
  },
  {
    id: "social-reaction-publisher",
    title: "Automated Social Media Reaction & Content Publishing Bot",
    label: "AI media processing",
    tagline: "End-to-end automated video reaction rendering, AI metadata generation, and multi-platform publishing pipeline.",
    category: "Backend & Automation Engineering / AI Media Processing",
    status: "Complete / Production-Ready",
    role: "Sole Developer / Architect",
    description: "An automated Python application for continuous cloud execution that processes short-form video, renders vertical split-screen reactions with FFmpeg, generates AI-assisted SEO metadata, and supports YouTube Shorts and Instagram Reels publishing workflows.",
    problem: "Reduces manual video processing, metadata preparation, approval, and multi-platform publishing work.",
    features: ["Multi-tier fallback content ingestion", "9:16 split-screen reaction rendering", "Adaptive audio normalization", "AI-generated titles, descriptions, and hashtags", "Telegram approvals, scheduling, and upload limits"],
    technologies: ["Python", "FFmpeg", "TeleBot", "Groq API", "YouTube Data API v3", "Meta Graph API", "Instagrapi", "SQLite", "Render"],
    tags: ["Python", "AI", "Automation", "FFmpeg", "Media Processing", "Groq LLM", "YouTube API", "Instagram API"],
    image: "/manus-storage/project-collection-social-publishing_227bb808.jpg",
    alt: "Original cinematic AI media publishing visual with abstract vertical video frames and automation signals",
  },
  {
    id: "myjob-ai-radar",
    title: "MyJob AI Radar",
    label: "AI career intelligence",
    tagline: "Autonomous AI-powered job radar and application assistant with multi-source job monitoring and Telegram-based management.",
    category: "AI Automation / Career Intelligence",
    status: "Production-Ready",
    description: "An AI-powered career intelligence platform that aggregates entry-level technology opportunities, analyzes job postings, prepares tailored application materials, and helps track opportunities through Telegram management and a companion Mini-App.",
    problem: "Reduces time spent searching fragmented job sources, preparing repetitive application materials, and tracking applications.",
    features: ["Multi-source job monitoring and aggregation", "AI job analysis and compatibility scoring", "Tailored résumé and cover-letter generation", "Telegram Bot management and Mini-App filtering", "Application tracking, monitoring, and error recovery"],
    technologies: ["Python", "Flask", "Telegram Bot API", "Playwright", "Google Gemini API", "Groq API", "FPDF", "Notion API", "Docker", "GitHub Actions"],
    tags: ["Python", "Telegram Bot", "Playwright", "Generative AI", "Google Gemini", "Groq", "Web Automation", "Flask", "Docker", "CI/CD"],
    liveUrl: "https://nm969989-cmd.github.io/myjob-ai-bot/",
    image: "/manus-storage/project-collection-myjob-radar_8cc39039.jpg",
    alt: "Original cinematic AI career radar with abstract opportunity cards and scanning signals",
  },
  {
    id: "smart-aroma-diffuser",
    title: "Smart Aroma Diffuser",
    label: "IoT & fuzzy logic",
    tagline: "Fuzzy Logic Control versus Time-Based Algorithms for efficient and adaptive aroma diffusion.",
    category: "IoT / Smart Systems / Research & Automation",
    status: "Completed",
    context: "College academic project / research prototype",
    description: "A smart aroma diffuser prototype comparing Fuzzy Logic Control with a traditional Time-Based Algorithm for adaptive aroma diffusion under changing temperature and humidity conditions.",
    problem: "Fixed-interval diffusers cannot dynamically adapt to changing environmental conditions.",
    features: ["Temperature and humidity sensing", "Fuzzy Logic Control for adaptive aroma output", "Time-Based Algorithm comparison", "Power-consumption and efficiency analysis", "Experimental prototype testing with SPSS comparison"],
    technologies: ["Fuzzy Logic Control", "Time-Based Control", "Environmental Sensors", "IoT Concepts", "SPSS", "Data Analysis", "Prototype Development"],
    results: ["92.5% FLC mean accuracy", "85.2% FLC mean efficiency", "18–20% reported FLC battery consumption", "FLC outperformed the Time-Based Algorithm across reported performance measures"],
    tags: ["Fuzzy Logic", "IoT", "Sensors", "Smart Automation", "SPSS", "Data Analysis", "Research Prototype"],
    image: "/manus-storage/project-collection-aroma-diffuser_04698510.jpg",
    alt: "Original cinematic smart aroma diffuser research visual with sensor halos and fuzzy-logic light curves",
  },
] as const;
type CollectionProject = (typeof projectCollection)[number];

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

function PolurCharmWalkthrough({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  const reduceMotion = useReducedMotion();
  const [runId, setRunId] = useState(0);
  const staticPlayback = reduceMotion || motionPaused || lowDataMode;
  return <section className={`polur-walkthrough ${staticPlayback ? "is-static" : ""}`} aria-label="Polur Charm discovery walkthrough"><div className="polur-walkthrough-head"><div><span className="label">Live guide walkthrough</span><p>Discover → plan → explore</p></div><button type="button" className="polur-replay" onClick={() => setRunId((current) => current + 1)} disabled={staticPlayback} aria-label={staticPlayback ? "Walkthrough motion is currently paused" : "Replay Polur Charm walkthrough"}><Play size={12} />Replay</button></div><div key={runId} className="polur-guide-screen" aria-hidden="true"><div className="polur-guide-panel polur-guide-discover"><span className="polur-guide-time">05:15 · Local guide</span><b>Parvathamalai trail</b><p>Full moon trek alert</p><div className="polur-guide-route"><i /><span><strong>Temple base</strong><em>Trail access · open</em></span><small>42 km</small></div><div className="polur-guide-stats"><span>Bus <b>04:20</b></span><span>Weather <b>Clear</b></span></div></div><div className="polur-guide-panel polur-guide-plan"><span className="polur-guide-time">Trip planner · 01</span><b>Route ready</b><p>Transit and safety checked</p><div className="polur-plan-list"><span><i />Regional bus <b>₹72</b></span><span><i />Ghat advisory <b>Clear</b></span><span><i />Water point <b>Saved</b></span></div></div><div className="polur-guide-panel polur-guide-quest"><span className="polur-guide-time">Heritage quest · 03</span><b>Explore and collect</b><p>Parvathamalai badge unlocked</p><div className="polur-quest-badge"><i>✦</i><span><strong>120 XP</strong><em>Trail marker logged</em></span></div></div><div className="polur-guide-progress"><i /><i /><i /></div></div><p className="polur-walkthrough-note">Illustrative discovery loop based on the platform’s local guide, trip-planning, safety, and heritage-quest tools.</p></section>;
}

function PolurTripPlannerMicroFlow({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  void motionPaused;
  void lowDataMode;
  return null;
}

function DeliveryDeviceRelay({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const staticRelay = reduceMotion || motionPaused || lowDataMode;
  const devices = [
    { name: "Phone", className: "is-phone", note: "Discovery" },
    { name: "Tablet", className: "is-tablet", note: "Cart" },
    { name: "Desktop", className: "is-desktop", note: "Tracking" },
  ];
  return <section className={`delivery-device-relay ${entered && !staticRelay ? "is-active" : ""}`} aria-label="Responsive delivery interface relay"><div className="delivery-device-relay-head"><span className="label">Responsive relay</span><p>Phone → tablet → desktop</p></div><motion.div className="delivery-device-stage" initial={staticRelay ? false : { opacity: 0, y: 7 }} whileInView={staticRelay ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .6 }} onViewportEnter={() => setEntered(true)} transition={{ duration: .3, ease: [0.23, 1, 0.32, 1] }}>{devices.map((device, index) => <div key={device.name} className={`relay-frame ${device.className}`}><span className="relay-device-bar" /><div className="relay-screen"><i /><b>{device.note}</b><em>Mobile flow</em></div><small>{String(index + 1).padStart(2, "0")} / {device.name}</small></div>)}<span className="relay-flow" aria-hidden="true"><i /><i /><i /></span></motion.div><p className="delivery-device-relay-note">One flow, calibrated across the screen sizes where people browse, decide, and track.</p></section>;
}

function DeliveryInteractionLoop({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  const reduceMotion = useReducedMotion();
  const staticLoop = reduceMotion || motionPaused || lowDataMode;
  return <section className={`delivery-interaction-loop ${staticLoop ? "is-static" : ""}`} aria-label="Delivery add-to-cart interaction detail"><div className="delivery-interaction-loop-head"><div><span className="label">Interaction detail</span><p>Quick add → cart confirmation</p></div><span className="delivery-loop-status">Live micro-flow</span></div><div className="delivery-interaction-stage" aria-hidden="true"><div className="delivery-loop-product"><span className="delivery-loop-art" /><div><b>Spiced ramen</b><em>Chef special · 28 min</em></div><strong>₹240</strong><button type="button">Add</button></div><span className="delivery-loop-cursor" /><span className="delivery-loop-pulse" /><div className="delivery-loop-cart"><i>01</i><span>Added to your cart</span><b>View cart</b></div></div><p className="delivery-interaction-loop-note">Illustrative interaction study: a clear action, immediate confirmation, and an unobstructed route to checkout.</p></section>;
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

function AutomationStudioWalkthrough({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  const reduceMotion = useReducedMotion();
  const [runId, setRunId] = useState(0);
  const staticPlayback = reduceMotion || motionPaused || lowDataMode;
  return <><section className={`studio-walkthrough ${staticPlayback ? "is-static" : ""}`} aria-label="AI Content Studio automation walkthrough"><div className="studio-walkthrough-head"><div><span className="label">Automation walkthrough</span><p>Monitor → produce → scheduled publish</p></div><button type="button" className="studio-replay" onClick={() => setRunId((current) => current + 1)} disabled={staticPlayback} aria-label={staticPlayback ? "Walkthrough motion is currently paused" : "Replay AI Content Studio walkthrough"}><Play size={12} />Replay</button></div><div key={runId} className="studio-console" aria-hidden="true"><div className="studio-stage studio-monitor"><span>01 / SIGNAL MONITOR</span><b>Channel watch</b><div><i /><i /><i /></div><em>New source detected</em></div><div className="studio-stage studio-produce"><span>02 / ASSET ENGINE</span><b>Shorts & metadata</b><div><i /><i /><i /></div><em>Render and enrich</em></div><div className="studio-stage studio-publish"><span>03 / DELIVERY QUEUE</span><b>Scheduled publish</b><div><i /><i /><i /></div><em>Ready for release</em><small className="studio-complete-status"><i />Published</small></div><span className="studio-flow-path"><i /><i /><i /></span><span className="studio-orbit-token" /><span className="studio-scanline" /></div><p className="studio-walkthrough-note">Illustrative automation preview: source monitoring, asset production, and scheduled publishing in one operational loop.</p></section><AutomationReliabilityReel motionPaused={motionPaused} lowDataMode={lowDataMode} /></>;
}

function AutomationReliabilityReel({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  const reduceMotion = useReducedMotion();
  const [runId, setRunId] = useState(0);
  const staticPlayback = reduceMotion || motionPaused || lowDataMode;
  return <section className={`studio-reliability-reel ${staticPlayback ? "is-static" : ""}`} aria-label="AI Content Studio reliability walkthrough"><div className="studio-reliability-head"><div><span className="label">Reliability reel</span><p>Guard → recover → verify</p></div><button type="button" className="studio-replay" onClick={() => setRunId((current) => current + 1)} disabled={staticPlayback} aria-label={staticPlayback ? "Reliability reel motion is currently paused" : "Replay AI Content Studio reliability reel"}><Play size={12} />Replay</button></div><div key={runId} className="studio-reliability-screen" aria-hidden="true"><div className="studio-reliability-card studio-guard"><span>01 / QUOTA GUARD</span><b>API watch</b><em>Usage threshold detected</em><div className="studio-guard-meter"><i /><i /><i /><i /><i /></div></div><div className="studio-reliability-card studio-recover"><span>02 / FAILOVER PATH</span><b>Resume asset job</b><em>Fallback route engaged</em><div className="studio-recover-route"><i /><i /><i /></div></div><div className="studio-reliability-card studio-verify"><span>03 / STATE RESTORE</span><b>Cloud state verified</b><em>Credentials and queue restored</em><small><i />Recovered</small></div><span className="studio-reliability-sweep" /><span className="studio-reliability-packet"><i /></span></div><p className="studio-reliability-note">Illustrative reliability preview: quota awareness, fallback routing, and state restoration keep the automation pipeline resilient.</p></section>;
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

function LensAperture({ motionPaused }: { motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const staticMotion = reduceMotion || motionPaused;
  return <motion.span className={`ml-lens-aperture ${entered && !staticMotion ? "is-focused" : ""}`} aria-hidden="true" initial={staticMotion ? false : { opacity: 0, scale: .72 }} whileInView={staticMotion ? {} : { opacity: 1, scale: 1 }} viewport={{ once: true, amount: .48 }} onViewportEnter={() => setEntered(true)} transition={{ duration: .3, delay: .18, ease: [0.23, 1, 0.32, 1] }}><i className="lens-core" /><i className="lens-orbit one" /><i className="lens-orbit two" /><b /></motion.span>;
}

function TimelineCheckpoint({ motionPaused }: { motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const staticPulse = reduceMotion || motionPaused;
  return <motion.span className={`timeline-checkpoint ${entered && !staticPulse ? "is-active" : ""}`} aria-hidden="true" initial={false} whileInView={{}} viewport={{ once: true, amount: 0.55 }} onViewportEnter={() => setEntered(true)} />;
}

function ExperienceEvidenceSignal({ label, motionPaused }: { label: string; motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const staticMotion = reduceMotion || motionPaused;
  return <motion.span className="experience-evidence-signal" initial={staticMotion ? false : { opacity: 0, x: -8 }} whileInView={staticMotion ? {} : { opacity: 1, x: 0 }} viewport={{ once: true, amount: .56 }} transition={{ duration: .32, delay: .12, ease: [0.23, 1, 0.32, 1] }}><motion.i aria-hidden="true" initial={staticMotion ? false : { scaleX: 0 }} whileInView={staticMotion ? {} : { scaleX: 1 }} viewport={{ once: true, amount: .56 }} transition={{ duration: .46, delay: .16, ease: [0.23, 1, 0.32, 1] }} /><b>{label}</b><em>evidence signal</em></motion.span>;
}

function ExperienceConnectionMap({ activeExperience, motionPaused }: { activeExperience: number; motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const activeConnection = experienceConnections[activeExperience];
  const staticMotion = reduceMotion || motionPaused;
  return <motion.aside className={`experience-connection-map ${staticMotion ? "is-static" : ""}`} aria-label="Skills connected to the active experience role" initial={staticMotion ? false : { opacity: 0, y: 12 }} whileInView={staticMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .42, ease: [0.23, 1, 0.32, 1] }}><div className="experience-map-head"><div><p className="label">Skills / role map</p><p>Hover or focus a role to trace its active tools.</p></div><span>{String(activeExperience + 1).padStart(2, "0")} / 03</span></div><div className="experience-map-stage" aria-live="polite"><span className="experience-map-core"><b>{activeConnection.role === "Project Intern" ? "Build" : "Design"}</b><em>{activeConnection.focus}</em></span>{experienceSkillNodes.map((skill, index) => { const isActive = activeConnection.skills.some((item) => item === skill); return <span key={skill} className={`experience-map-link link-${index} ${isActive ? "is-active" : ""}`} aria-hidden="true" />; })}{experienceSkillNodes.map((skill, index) => { const isActive = activeConnection.skills.some((item) => item === skill); return <span key={skill} className={`experience-map-node node-${index} ${isActive ? "is-active" : ""}`}><b>{skill}</b></span>; })}</div><p className="experience-map-reading"><span className="label">Active role</span>{activeConnection.focus}</p></motion.aside>;
}

function CredentialSignalScan({ motionPaused }: { motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const staticMotion = reduceMotion || motionPaused;
  return <motion.span className={`credential-signal-scan ${entered && !staticMotion ? "is-active" : ""}`} aria-hidden="true" initial={staticMotion ? false : { opacity: 0 }} whileInView={staticMotion ? {} : { opacity: 1 }} viewport={{ once: true, amount: .35 }} onViewportEnter={() => setEntered(true)} transition={{ duration: .2 }}><i /><i /><i /></motion.span>;
}

function CredentialPreviewDialog({ credential, open, onOpenChange, motionPaused, lowDataMode }: { credential: typeof certifications[number] | null; open: boolean; onOpenChange: (open: boolean) => void; motionPaused: boolean; lowDataMode: boolean }) {
  const reduceMotion = useReducedMotion();
  const staticMotion = reduceMotion || motionPaused || lowDataMode;
  if (!credential) return null;
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="credential-preview-dialog max-h-[min(44rem,calc(100svh-2rem))] overflow-y-auto rounded-none border-white/15 bg-[#0b0912] p-0 text-[#f4f0ff] shadow-[0_28px_100px_rgba(0,0,0,.62)] sm:max-w-2xl" showCloseButton={false}><div className="credential-preview-shell"><div className={`credential-preview-reel ${staticMotion ? "is-static" : ""}`} aria-hidden="true"><span className="credential-preview-grid" /><span className="credential-preview-radius radius-one" /><span className="credential-preview-radius radius-two" /><span className="credential-preview-radius radius-three" /><span className="credential-preview-axis axis-one" /><span className="credential-preview-axis axis-two" /><span className="credential-preview-orbit one" /><span className="credential-preview-orbit two" /><span className="credential-preview-accretion" /><span className="credential-preview-inner-currents"><i /><i /><i /></span><span className="credential-preview-spark-field"><i className="spark-one" /><i className="spark-two" /><i className="spark-three" /><i className="spark-four" /><i className="spark-five" /><i className="spark-six" /></span><span className="credential-preview-pulse-ring" /><span className="credential-preview-horizon" /><span className="credential-preview-core" /><span className="credential-preview-scan" /><span className="credential-preview-stamp">SMP / EVENT HORIZON</span></div><div className="credential-preview-copy"><div className="flex items-start justify-between gap-4"><p className="label">Credential / preview</p><button type="button" className="credential-preview-close" onClick={() => onOpenChange(false)} aria-label="Close credential preview"><X size={16} /></button></div><DialogTitle className="display mt-5 max-w-[16ch] text-3xl leading-[.94] text-white sm:text-5xl">{credential.title}</DialogTitle><DialogDescription className="mt-4 max-w-md text-sm leading-6 text-[#c8c0d8]">A focused record preview for {credential.issuer}, highlighting the learning signal represented in this portfolio.</DialogDescription><dl className="credential-preview-metadata"><div><dt>Issuer</dt><dd>{credential.issuer}</dd></div><div><dt>Record</dt><dd>{credential.meta}</dd></div><div><dt>Focus</dt><dd>{credential.focus}</dd></div></dl><div className="credential-preview-note"><span className="signal-dot" aria-hidden="true" /><p><b>{credential.theme}</b><br />Official verification can be added here when its credential-specific link is available.</p></div></div></div></DialogContent></Dialog>;
}

function AIContentStudioDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[min(48rem,calc(100svh-2rem))] overflow-y-auto rounded-none border-white/15 bg-[#0b0912] p-0 text-[#f4f0ff] shadow-[0_28px_100px_rgba(0,0,0,.62)] sm:max-w-4xl" showCloseButton={false}><div className="ai-studio-dialog"><div className="ai-studio-dialog-visual" aria-hidden="true"><img src="/manus-storage/ai-content-studio-showcase_e194be53.jpg" alt="" /><span>Studio / 03</span></div><div className="p-6 sm:p-9"><div className="flex items-start justify-between gap-5"><div><p className="label text-violet-200">Project / Showcase only</p><DialogTitle className="display mt-4 max-w-[18ch] text-3xl leading-[.94] text-white sm:text-5xl">{aiContentStudio.title}</DialogTitle></div><button type="button" className="credential-preview-close shrink-0" onClick={() => onOpenChange(false)} aria-label="Close project details"><X size={16} /></button></div><DialogDescription className="mt-5 max-w-3xl text-sm leading-6 text-[#c8c0d8]">{aiContentStudio.description}</DialogDescription><dl className="ai-studio-summary"><div><dt>Category</dt><dd>{aiContentStudio.category}</dd></div><div><dt>Status</dt><dd>{aiContentStudio.status}</dd></div><div><dt>Role</dt><dd>{aiContentStudio.role}</dd></div></dl><section className="ai-studio-detail-section"><p className="label">Problem solved</p><p>{aiContentStudio.problem}</p></section><section className="ai-studio-detail-section"><p className="label">Main features</p><ul className="ai-studio-feature-list">{aiContentStudio.features.map((feature) => <li key={feature}><CircleCheckBig size={14} aria-hidden="true" /><span>{feature}</span></li>)}</ul></section><section className="ai-studio-detail-section"><p className="label">Technical highlights</p><ul className="ai-studio-feature-list">{aiContentStudio.highlights.map((highlight) => <li key={highlight}><span className="ai-studio-bullet" aria-hidden="true" /><span>{highlight}</span></li>)}</ul></section><section className="ai-studio-detail-section"><p className="label">Technology stack</p><div className="ai-studio-stack-grid">{aiContentStudio.stack.map((group) => <div key={group.label}><b>{group.label}</b><p>{group.values.join(" · ")}</p></div>)}</div></section><section className="ai-studio-detail-section"><p className="label">Tags</p><div className="ai-studio-tags">{aiContentStudio.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section><p className="ai-studio-showcase-note"><span className="signal-dot" aria-hidden="true" />This is a portfolio showcase. No source repository, View Code, or public demo link is listed.</p></div></div></DialogContent></Dialog>;
}

function PolurCharmDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[min(48rem,calc(100svh-2rem))] overflow-y-auto rounded-none border-white/15 bg-[#0b0912] p-0 text-[#f4f0ff] shadow-[0_28px_100px_rgba(0,0,0,.62)] sm:max-w-4xl" showCloseButton={false}><div className="ai-studio-dialog polur-charm-dialog"><div className="ai-studio-dialog-visual" aria-hidden="true"><img src="/manus-storage/polur-charm-portfolio-art_ee154405.jpg" alt="" /><span>Polur / 04</span></div><div className="p-6 sm:p-9"><div className="flex items-start justify-between gap-5"><div><p className="label text-cyan-100">Project / Active</p><DialogTitle className="display mt-4 max-w-[18ch] text-3xl leading-[.94] text-white sm:text-5xl">{polurCharm.title}</DialogTitle></div><button type="button" className="credential-preview-close shrink-0" onClick={() => onOpenChange(false)} aria-label="Close Polur Charm project details"><X size={16} /></button></div><DialogDescription className="mt-5 max-w-3xl text-sm leading-6 text-[#c8c0d8]">{polurCharm.description}</DialogDescription><dl className="ai-studio-summary polur-charm-summary"><div><dt>Category</dt><dd>{polurCharm.category}</dd></div><div><dt>Status</dt><dd>{polurCharm.status}</dd></div><div><dt>Role</dt><dd>{polurCharm.role}</dd></div></dl><section className="ai-studio-detail-section"><p className="label">Problem solved</p><p>{polurCharm.problem}</p></section><section className="ai-studio-detail-section"><p className="label">Main features</p><ul className="ai-studio-feature-list">{polurCharm.features.map((feature) => <li key={feature}><CircleCheckBig size={14} aria-hidden="true" /><span>{feature}</span></li>)}</ul></section><section className="ai-studio-detail-section"><p className="label">Technical highlights</p><ul className="ai-studio-feature-list">{polurCharm.highlights.map((highlight) => <li key={highlight}><span className="ai-studio-bullet" aria-hidden="true" /><span>{highlight}</span></li>)}</ul></section><section className="ai-studio-detail-section"><p className="label">Technology stack</p><div className="ai-studio-stack-grid">{polurCharm.stack.map((group) => <div key={group.label}><b>{group.label}</b><p>{group.values.join(" · ")}</p></div>)}</div></section><section className="ai-studio-detail-section"><p className="label">Tags</p><div className="ai-studio-tags">{polurCharm.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section><div className="polur-charm-dialog-actions"><a href="https://polurcharm.com" target="_blank" rel="noreferrer">Visit live site <ArrowUpRight size={15} /></a><a href="https://github.com/gokuuchihatamil/polur-charm" target="_blank" rel="noreferrer">Open repository <Github size={15} /></a></div></div></div></DialogContent></Dialog>;
}

function ProjectCollectionDialog({ project, loading, onOpenChange }: { project: CollectionProject | null; loading: boolean; onOpenChange: (open: boolean) => void }) {
  const [dialogImageReady, setDialogImageReady] = useState(false);
  useEffect(() => {
    if (!project) return;
    setDialogImageReady(false);
    const priorityImage = new Image();
    priorityImage.src = project.image;
    priorityImage.decode?.().then(() => setDialogImageReady(true)).catch(() => setDialogImageReady(true));
    return () => {
      priorityImage.onload = null;
      priorityImage.onerror = null;
    };
  }, [project]);
  if (!project) return null;
  if (loading) return <Dialog open={Boolean(project)} onOpenChange={onOpenChange}><DialogContent className="collection-dialog collection-dialog-loading-shell rounded-none border-white/15 bg-[#0b0912] p-0 text-[#f4f0ff] shadow-[0_28px_100px_rgba(0,0,0,.62)] sm:max-w-4xl" showCloseButton={false}><DialogTitle className="sr-only">Loading {project.title}</DialogTitle><DialogDescription className="sr-only">Preparing project collection details.</DialogDescription><div className="collection-dialog-loader" role="status" aria-live="polite"><img className={`collection-dialog-loader-image ${dialogImageReady ? "is-ready" : ""}`} src={project.image} alt="" aria-hidden="true" fetchPriority="high" decoding="async" /><div className="collection-dialog-loader-orbit"><Spinner className="size-7 text-violet-200" /></div><p className="label text-violet-200">Aligning project signal</p><span>Preparing {project.title}</span></div><button type="button" className="credential-preview-close collection-dialog-loader-close" onClick={() => onOpenChange(false)} aria-label="Close project collection details"><X size={16} /></button></DialogContent></Dialog>;
  return <Dialog open={Boolean(project)} onOpenChange={onOpenChange}><DialogContent className="collection-dialog max-h-[min(48rem,calc(100svh-2rem))] overflow-y-auto rounded-none border-white/15 bg-[#0b0912] p-0 text-[#f4f0ff] shadow-[0_28px_100px_rgba(0,0,0,.62)] sm:max-w-4xl" showCloseButton={false}><div className="collection-dialog-shell"><div className={`collection-dialog-visual ${dialogImageReady ? "is-image-ready" : ""}`} aria-hidden="true"><img src={project.image} alt="" fetchPriority="high" decoding="async" onLoad={() => setDialogImageReady(true)} onError={() => setDialogImageReady(true)} /><span>Collection / {String(projectCollection.findIndex((entry) => entry.id === project.id) + 1).padStart(2, "0")}</span></div><div className="collection-dialog-copy"><div className="flex items-start justify-between gap-5"><div><p className="label text-violet-200">Project collection</p><DialogTitle className="display mt-4 max-w-[18ch] text-3xl leading-[.94] text-white sm:text-5xl">{project.title}</DialogTitle></div><button type="button" className="credential-preview-close shrink-0" onClick={() => onOpenChange(false)} aria-label="Close project collection details"><X size={16} /></button></div><DialogDescription className="mt-5 max-w-3xl text-sm leading-6 text-[#d3cbdf]">{project.tagline}</DialogDescription><p className="mt-5 text-sm leading-6 text-[#bcb4ca]">{project.description}</p><dl className="collection-dialog-summary"><div><dt>Category</dt><dd>{project.category}</dd></div><div><dt>Status</dt><dd>{project.status}</dd></div><div><dt>{"role" in project ? "Role" : "Context"}</dt><dd>{"role" in project ? project.role : "context" in project ? project.context : "Project collection"}</dd></div></dl><section className="collection-detail-section"><p className="label">Problem solved</p><p>{project.problem}</p></section><section className="collection-detail-section"><p className="label">Main features</p><ul>{project.features.map((feature) => <li key={feature}><CircleCheckBig size={14} aria-hidden="true" /><span>{feature}</span></li>)}</ul></section><section className="collection-detail-section"><p className="label">Technologies & skills</p><div className="collection-tech-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></section>{"results" in project ? <section className="collection-detail-section"><p className="label">Important results</p><ul>{project.results.map((result) => <li key={result}><span className="ai-studio-bullet" aria-hidden="true" /><span>{result}</span></li>)}</ul></section> : null}<section className="collection-detail-section"><p className="label">Tags</p><div className="collection-tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section>{"liveUrl" in project ? <a className="collection-live-demo" href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} /></a> : null}<p className="collection-security-note"><span className="signal-dot" aria-hidden="true" />This collection entry does not expose source code or repository links.</p></div></div></DialogContent></Dialog>;
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
  const [footerBurst, setFooterBurst] = useState(0);
  const [monogramRipple, setMonogramRipple] = useState(0);
  const [monogramSectionGlint, setMonogramSectionGlint] = useState(0);
  const [monogramProjectEcho, setMonogramProjectEcho] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [nameRipples, setNameRipples] = useState<InteractionPoint[]>([]);
  const [nameHaptic, setNameHaptic] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);
  const [lowDataMode, setLowDataMode] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [recruiterReviewOpen, setRecruiterReviewOpen] = useState(false);
  const [recruiterReviewStep, setRecruiterReviewStep] = useState(0);
  const [lightPreset, setLightPreset] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("smp-contrast-preset") === "light");
  const [activeOrbitProject, setActiveOrbitProject] = useState<OrbitProjectId>("attack-study");
  const [orbitSelectorPreview, setOrbitSelectorPreview] = useState<OrbitProjectId | null>(null);
  const [openCaseSignal, setOpenCaseSignal] = useState<CaseStudyId | null>(null);
  const [contactFocused, setContactFocused] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
  const [activeCredential, setActiveCredential] = useState<number | null>(null);
  const [aiContentStudioOpen, setAiContentStudioOpen] = useState(false);
  const [polurCharmOpen, setPolurCharmOpen] = useState(false);
  const [activeCollectionProject, setActiveCollectionProject] = useState<CollectionProject | null>(null);
  const [collectionDialogLoading, setCollectionDialogLoading] = useState(false);
  const [collectionFocus, setCollectionFocus] = useState<number | null>(null);
  const [mobileCollectionSnap, setMobileCollectionSnap] = useState(0);
  const [gravityProject, setGravityProject] = useState<OrbitProjectId | null>(null);
  const [projectFinder, setProjectFinder] = useState({ x: -100, y: -100, active: false });
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const lastConstellationPoint = useRef({ x: -100, y: -100, time: 0 });
  const lastContactConstellationPoint = useRef({ x: -100, y: -100, time: 0 });
  const lastActiveSection = useRef(active);
  const collectionPrefetches = useRef(new Map<string, HTMLImageElement>());
  const reduceMotion = useReducedMotion();
  const sealScrollOpacity = motionPaused || reduceMotion || lowDataMode ? 1 : Math.max(0.74, 1 - scrollProgress * 0.0026);
  const sealOrbitScrollOffset = motionPaused || reduceMotion || lowDataMode ? 0 : Math.min(18, scrollProgress * 0.18);
  const dividerScrollRotation = sealOrbitScrollOffset * 0.34;
  const activeOrbitPreview = motionPaused || reduceMotion || lowDataMode ? null : orbitSelectorPreview;

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
    if (active === lastActiveSection.current) return;
    lastActiveSection.current = active;
    if (motionPaused || reduceMotion || lowDataMode) return;
    const glintId = Date.now();
    setMonogramSectionGlint(glintId);
    const timer = window.setTimeout(() => setMonogramSectionGlint((current) => current === glintId ? 0 : current), 1040);
    return () => window.clearTimeout(timer);
  }, [active, lowDataMode, motionPaused, reduceMotion]);

  useEffect(() => {
    if (!openCaseSignal || motionPaused || reduceMotion || lowDataMode) return;
    const echoId = Date.now();
    setMonogramProjectEcho(echoId);
    const timer = window.setTimeout(() => setMonogramProjectEcho((current) => current === echoId ? 0 : current), 860);
    return () => window.clearTimeout(timer);
  }, [lowDataMode, motionPaused, openCaseSignal, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || lowDataMode) {
      setIntroVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setIntroVisible(false), 860);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, lowDataMode]);

  useEffect(() => {
    if (!activeCollectionProject || reduceMotion) {
      setCollectionDialogLoading(false);
      return;
    }
    const timer = window.setTimeout(() => setCollectionDialogLoading(false), 260);
    return () => window.clearTimeout(timer);
  }, [activeCollectionProject, reduceMotion]);

  useEffect(() => {
    const activeIndex = activeCollectionProject
      ? projectCollection.findIndex((project) => project.id === activeCollectionProject.id)
      : collectionFocus;
    if (lowDataMode || activeIndex === null || activeIndex < 0) return;
    const nextProject = projectCollection[(activeIndex + 1) % projectCollection.length];
    if (collectionPrefetches.current.has(nextProject.image)) return;
    const prefetchTimer = window.setTimeout(() => {
      const image = new Image();
      image.decoding = "async";
      image.fetchPriority = "low";
      image.src = nextProject.image;
      collectionPrefetches.current.set(nextProject.image, image);
      image.decode?.().catch(() => undefined);
    }, 90);
    return () => window.clearTimeout(prefetchTimer);
  }, [activeCollectionProject, collectionFocus, lowDataMode]);

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

  function selectOrbitProject(id: OrbitProjectId) {
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

  function triggerFooterBurst() {
    if (reduceMotion || motionPaused) return;
    const burstId = Date.now();
    setFooterBurst(burstId);
    window.setTimeout(() => setFooterBurst((current) => current === burstId ? 0 : current), 780);
  }

  function triggerMonogramRipple() {
    if (reduceMotion || motionPaused || lowDataMode) return;
    const rippleId = Date.now();
    setMonogramRipple(rippleId);
    window.setTimeout(() => setMonogramRipple((current) => current === rippleId ? 0 : current), 760);
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
      <AnimatePresence>{introVisible && !reduceMotion && !lowDataMode ? <motion.div className="entry-loader" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}><div className="entry-loader-content"><span className="entry-loader-seal"><img src="/manus-storage/smp-mj-monogram-clear-j_24fbf37a.png" alt="" /></span><span className="entry-loader-signal" /><span className="label text-violet-100">SMP / initializing field reel</span></div></motion.div> : null}</AnimatePresence>
      {!reduceMotion && <div className={`cursor ${cursor.active ? "is-active" : ""}`} style={{ transform: `translate3d(${cursor.x - 5}px, ${cursor.y - 5}px, 0)` }} />}
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress-rail" aria-hidden="true"><span className="scroll-progress-label">Field progress</span><span className="scroll-progress-track"><span className="scroll-progress-fill" style={{ height: `${scrollProgress}%` }} /></span><span className="scroll-progress-value">{String(Math.round(scrollProgress)).padStart(2, "0")}</span></div>
      <header className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container flex h-[5rem] items-center justify-between">
          <div className="flex items-center gap-5">
            <button className="monogram-trigger flex items-center gap-3 text-left" onClick={() => { triggerMonogramRipple(); scrollToSection("top"); }} aria-label="Go to the top and reveal the MJ monogram" aria-describedby="mj-brand-tooltip">
              <span className={`seal-wrap ${monogramRipple ? "is-rippling" : ""}`} style={{ opacity: sealScrollOpacity }}><span className="monogram-halo" aria-hidden="true" style={{ transform: `rotate(${sealOrbitScrollOffset}deg)` }}><i className="monogram-halo-sweep" /><i key={`section-glint-${monogramSectionGlint || "idle"}`} className={`monogram-section-glint ${monogramSectionGlint ? "is-active" : ""}`} /><i key={`project-echo-${monogramProjectEcho || "idle"}`} className={`monogram-project-echo ${monogramProjectEcho ? `is-active ${openCaseSignal === "attack-study" || openCaseSignal === "polur-charm" ? "is-cyan" : "is-violet"}` : ""}`} /><span className={`monogram-selector-preview ${activeOrbitPreview ? `is-active ${activeOrbitPreview === "attack-study" || activeOrbitPreview === "polur-charm" ? "is-cyan" : "is-violet"}` : ""}`}><i className="monogram-selector-preview-cyan" /><i className="monogram-selector-preview-violet" /></span><b className="monogram-orbit-spark" /></span><span className="monogram-click-ripple" aria-hidden="true" /><img src="/manus-storage/smp-mj-monogram-clear-j_24fbf37a.png" alt="MJ monogram" /></span>
              <span className="display text-[0.88rem] font-semibold tracking-[-0.04em] text-white">S MANOJ<br />PRABHU</span>
              <span id="mj-brand-tooltip" className="monogram-brand-tooltip" role="tooltip">MJ / Event horizon</span>
            </button>
            <span className="monogram-nav-divider hidden lg:block" aria-hidden="true" style={{ opacity: sealScrollOpacity, transform: `rotate(${dividerScrollRotation}deg)` }} />
          </div>
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
        <Reveal><SectionIntro index="02" eyebrow="Working at the intersection" title="Systems made visible." detail="A frontend developer and UI/UX designer with experience in Java, Spring Boot, and applied machine learning." motionPaused={motionPaused} /></Reveal>
        <div className="about-proof mt-14 grid gap-5 lg:grid-cols-[1.28fr_.72fr]">
          <Reveal delay={0.06} className="panel relative overflow-hidden p-7 md:p-10">
            <div className="absolute right-0 top-0 h-32 w-32 bg-violet-500/15 blur-3xl" />
            <p className="display max-w-[20ch] text-2xl leading-tight text-[#eeeaff] md:text-[2rem]">I create <span className="text-violet-300">clear, responsive interfaces</span> and practical user flows—from Figma design to implementation.</p>
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
        <div className="project-atmosphere" aria-hidden="true"><img className="project-seal-ghost" src="/manus-storage/smp-mj-monogram-clear-j_24fbf37a.png" alt="" /><span className="project-signal-wave" />{projectPulses.map((pulse) => <span key={pulse.id} className="project-pulse" style={{ left: `${pulse.x}%`, top: `${pulse.y}%` }} />)}<span className={`project-orbital-finder ${projectFinder.active ? "is-active" : ""}`} style={{ left: `${projectFinder.x}%`, top: `${projectFinder.y}%` }}><i /><i /></span></div>
        <div className="container relative z-10"><Reveal><SectionIntro index="03" eyebrow="Selected work" title="Proof of practice." detail="Four focused project studies across applied machine learning, mobile product design, autonomous content operations, and civic discovery." motionPaused={motionPaused} /></Reveal>
          <nav className="mobile-project-nav" aria-label="Project study navigation"><span className="mobile-project-label">Jump to study</span><button onClick={() => scrollToSection("attack-study")}>01 Attack model</button><button onClick={() => scrollToSection("delivery-study")}>02 Delivery app</button><button onClick={() => scrollToSection("ai-content-studio")}>03 AI studio</button><button onClick={() => scrollToSection("polur-charm")}>04 Polur Charm</button></nav>
          <div className="project-orbit-selector" aria-label="Featured project selector">
            <div className="project-orbit-intro"><p className="label">Project orbit / choose a signal</p><p>Rotate between the four studies, then follow the selected signal into the work.</p><span className="project-orbit-current">{orbitProjects.find((project) => project.id === activeOrbitProject)?.signal}</span></div>
            <div className="project-orbit-stage">
              <span className="project-orbit-ring outer" aria-hidden="true" /><span className="project-orbit-ring inner" aria-hidden="true" /><span className="project-orbit-axis" aria-hidden="true" />
              <span className="project-orbit-core" aria-hidden="true"><i /><b>Work<br />orbit</b></span>
              {orbitProjects.map((project, index) => <button key={project.id} className={`orbit-project-node node-${index + 1} ${project.id === "attack-study" || project.id === "polur-charm" ? "project-tone-cyan" : "project-tone-violet"} ${activeOrbitProject === project.id ? "is-active" : ""}`} type="button" aria-pressed={activeOrbitProject === project.id} onMouseEnter={() => setOrbitSelectorPreview(project.id)} onMouseLeave={() => setOrbitSelectorPreview(null)} onFocus={() => { setActiveOrbitProject(project.id); setOrbitSelectorPreview(project.id); }} onBlur={() => setOrbitSelectorPreview(null)} onClick={() => selectOrbitProject(project.id)}><span className="orbit-project-index">{project.index}</span><span><b>{project.title}</b><em>{project.discipline}</em></span></button>)}
            </div>
          </div>
          <div className="project-comparison-shell"><button className={`project-comparison-toggle ${comparisonOpen ? "is-open" : ""}`} type="button" onClick={() => setComparisonOpen((current) => !current)} aria-expanded={comparisonOpen} aria-controls="project-comparison"><span>Compare signals</span><span>{comparisonOpen ? "Close" : "Open"} <ArrowUpRight size={13} /></span></button><AnimatePresence initial={false}>{comparisonOpen ? <motion.div id="project-comparison" className="project-comparison" initial={reduceMotion || motionPaused ? false : { opacity: 0, y: 8, scale: 0.99 }} animate={reduceMotion || motionPaused ? {} : { opacity: 1, y: 0, scale: 1 }} exit={reduceMotion || motionPaused ? {} : { opacity: 0, y: -5, scale: 0.99 }} transition={{ duration: .22, ease: [0.23, 1, 0.32, 1] }}><div className="comparison-head"><span>Signal</span><b>Attack model</b><b>Delivery flow</b></div><div><span>Outcome</span><b>85% accuracy</b><b>15+ screens</b></div><div><span>Method</span><b>4-model evaluation</b><b>2 review cycles</b></div><div><span>Tools</span><b>Python · Scikit-learn</b><b>Figma · Mobile UX</b></div></motion.div> : null}</AnimatePresence></div>
          <div className="project-grid mt-14 grid gap-5 lg:grid-cols-2">
            <Reveal delay={0.06}><article id="attack-study" className={`project-card panel ${gravityProject === "attack-study" ? "is-gravity-source" : ""}`} tabIndex={0} aria-label="Prediction of Perpetration Attack case study. Focus or hover to align related capabilities." onMouseMove={handleProjectTilt} onMouseEnter={() => setGravityProject("attack-study")} onFocus={() => setGravityProject("attack-study")} onClick={() => setGravityProject("attack-study")} onMouseLeave={resetProjectTilt}>
              <img className="project-art" src="/manus-storage/smp-project-security_4a7c2847.jpg" alt="Abstract diagnostic network visual for cybersecurity machine learning project" />
              <div className="project-scrim" /><span className="project-signal">classified study</span><span className="project-index">01 / 04</span><ProjectSignalFocus tone="cyan" motionPaused={motionPaused} /><LensAperture motionPaused={motionPaused} />
              <div className="project-caption"><div className="project-caption-head"><span className="label text-[0.5rem] text-violet-100">Case signal</span><span className="project-metric">85% accuracy</span></div><p>Four-model classifier for attack-pattern detection.</p></div>
              <div className="relative z-10 flex min-h-[480px] flex-col justify-end p-7 md:p-9"><p className="project-meta label text-violet-200">Machine learning · 01/2024—04/2024</p><h3 className="display mt-3 max-w-[11ch] text-4xl leading-[0.95] text-white md:text-5xl">Prediction of Perpetration Attack</h3><p className="mt-5 max-w-[44ch] text-sm leading-6 text-[#cec6da]">Built and evaluated four Python / Scikit-learn models — XGBoost, SVM, Logistic Regression, and Gradient Boosting — reaching <strong className="font-semibold text-white">85% classification accuracy</strong> on a cybersecurity dataset.</p><ProjectProofMarker value="85" suffix="%" ringValue={85} label="Best accuracy" detail="XGBoost selected after four-model evaluation" tone="cyan" motionPaused={motionPaused} /><AttackModelWalkthrough motionPaused={motionPaused} lowDataMode={lowDataMode} /><CaseSignalReveal id="attack-study" open={openCaseSignal === "attack-study"} onToggle={() => setOpenCaseSignal((current) => current === "attack-study" ? null : "attack-study")} motionPaused={motionPaused} /><div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5"><span className="label text-[0.57rem] text-white/65">Python · Scikit-learn · Model evaluation</span><a className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-violet-200 hover:text-white" href="https://github.com/manojprabhu07/Research-Papers-Final-Year-Project" target="_blank" rel="noreferrer">Open repository <ArrowUpRight size={15} /></a></div></div>
            </article></Reveal>
            <Reveal delay={0.13}><article id="delivery-study" className={`project-card panel ${gravityProject === "delivery-study" ? "is-gravity-source" : ""}`} tabIndex={0} aria-label="Food Delivery Mobile App case study. Focus or hover to align related capabilities." onMouseMove={handleProjectTilt} onMouseEnter={() => setGravityProject("delivery-study")} onFocus={() => setGravityProject("delivery-study")} onClick={() => setGravityProject("delivery-study")} onMouseLeave={resetProjectTilt}>
              <img className="project-art" src="/manus-storage/smp-project-food_c1b44933.jpg" alt="Abstract layered mobile interface visual for food delivery design project" />
              <div className="project-scrim" /><span className="project-signal">interaction study</span><span className="project-index">02 / 04</span><ProjectSignalFocus tone="violet" motionPaused={motionPaused} /><BlueprintCrosshair motionPaused={motionPaused} />
              <div className="project-caption"><div className="project-caption-head"><span className="label text-[0.5rem] text-violet-100">Case signal</span><span className="project-metric">15+ screens</span></div><p>Task-first flow from discovery through delivery.</p></div>
              <div className="relative z-10 flex min-h-[480px] flex-col justify-end p-7 md:p-9"><p className="project-meta label text-violet-200">UI / UX design · 06/2023—08/2023</p><h3 className="display mt-3 max-w-[11ch] text-4xl leading-[0.95] text-white md:text-5xl">Food Delivery Mobile App</h3><p className="mt-5 max-w-[44ch] text-sm leading-6 text-[#cec6da]">Designed <strong className="font-semibold text-white">15+ production-ready screens</strong>, covering onboarding, discovery, cart, and order tracking, guided by Material Design and refined across two usability review cycles.</p><ProjectProofMarker value="15+" ringValue={100} label="Screens mapped" detail="Two usability review cycles across the mobile flow" motionPaused={motionPaused} /><DeliveryWalkthrough motionPaused={motionPaused} lowDataMode={lowDataMode} /><DeliveryInteractionLoop motionPaused={motionPaused} lowDataMode={lowDataMode} /><DeliveryDeviceRelay motionPaused={motionPaused} lowDataMode={lowDataMode} /><CaseSignalReveal id="delivery-study" open={openCaseSignal === "delivery-study"} onToggle={() => setOpenCaseSignal((current) => current === "delivery-study" ? null : "delivery-study")} motionPaused={motionPaused} /><div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5"><span className="label text-[0.57rem] text-white/65">Figma · Mobile UX · Interaction flows</span><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-violet-200">Case study available on request <ArrowUpRight size={15} /></span></div></div>
            </article></Reveal>
            <Reveal delay={0.18} className="project-sequence-third"><article id="ai-content-studio" className={`project-card ai-studio-project panel ${gravityProject === "ai-content-studio" ? "is-gravity-source" : ""}`} tabIndex={0} aria-label="YouTube Auto-Uploader and Autonomous AI Content Studio showcase. Focus or hover to align related capabilities." onMouseMove={handleProjectTilt} onMouseEnter={() => setGravityProject("ai-content-studio")} onFocus={() => setGravityProject("ai-content-studio")} onClick={() => setGravityProject("ai-content-studio")} onMouseLeave={resetProjectTilt}><img className="project-art" src="/manus-storage/ai-content-studio-showcase_e194be53.jpg" alt="Abstract autonomous AI media studio with vertical video frames and orbital data streams" /><div className="project-scrim" /><span className="project-signal">autonomous studio</span><span className="project-index">03 / 04</span><ProjectSignalFocus tone="violet" motionPaused={motionPaused} /><div className="project-caption"><div className="project-caption-head"><span className="label text-[0.5rem] text-violet-100">Case signal</span><span className="project-metric">Auto pipeline</span></div><p>From channel monitoring through scheduled publishing.</p></div><div className="relative z-10 flex min-h-[620px] flex-col p-7 md:p-9 ai-studio-card-copy"><p className="project-meta label text-violet-200">AI & backend automation · production workflow</p><h3 className="display mt-3 max-w-[13ch] text-4xl leading-[.93] text-white md:text-5xl">YouTube Auto-Uploader & Autonomous AI Content Studio</h3><p className="mt-5 max-w-[43ch] text-sm leading-6 text-[#d1cadb]">A Python automation system for multi-channel monitoring, vertical Shorts, AI-assisted metadata, bilingual workflows, and resilient publishing operations.</p><div className="ai-studio-outcome"><span className="ai-studio-outcome-orbit" aria-hidden="true"><i /></span><div><p className="label">Outcome marker</p><b>Autonomous content pipeline</b><em>Ingestion → Shorts → metadata → scheduling</em></div></div><AutomationStudioWalkthrough motionPaused={motionPaused} lowDataMode={lowDataMode} /><button type="button" className="ai-studio-detail-trigger ai-studio-brief-action" onClick={() => setAiContentStudioOpen(true)} aria-haspopup="dialog">Open project brief <ArrowUpRight size={15} /></button></div></article></Reveal>
            <Reveal delay={0.23} className="project-sequence-fourth"><article id="polur-charm" className={`project-card polur-charm-project panel ${gravityProject === "polur-charm" ? "is-gravity-source" : ""}`} tabIndex={0} aria-label="Polur Charm tourism and civic platform case study. Focus or hover to align related capabilities." onMouseMove={handleProjectTilt} onMouseEnter={() => setGravityProject("polur-charm")} onFocus={() => setGravityProject("polur-charm")} onClick={() => setGravityProject("polur-charm")} onMouseLeave={resetProjectTilt}><img className="project-art" src="/manus-storage/polur-charm-portfolio-art_ee154405.jpg" alt="Cinematic Parvathamalai and Polur travel-civic discovery visual" /><div className="project-scrim" /><span className="project-signal">regional discovery</span><span className="project-index">04 / 04</span><ProjectSignalFocus tone="cyan" motionPaused={motionPaused} /><div className="project-caption"><div className="project-caption-head"><span className="label text-[0.5rem] text-cyan-100">Case signal</span><span className="project-metric">24/7 discovery</span></div><p>Travel, civic essentials, and heritage exploration in one guide.</p></div><div className="relative z-10 flex min-h-[560px] flex-col justify-end p-7 md:p-9"><p className="project-meta label text-cyan-100">Web development · travel & civic tech</p><h3 className="display mt-3 max-w-[11ch] text-4xl leading-[.93] text-white md:text-5xl">Polur Charm</h3><p className="mt-5 max-w-[43ch] text-sm leading-6 text-[#d1cadb]">An interactive bilingual guide for Polur, Parvathamalai, and nearby heritage destinations—joining local discovery, transit, safety, public services, and gamified trails.</p><ProjectProofMarker value="24" suffix="/7" ringValue={100} label="Discovery access" detail="Transit, civic essentials, and heritage trails in one platform" tone="cyan" motionPaused={motionPaused} /><PolurCharmWalkthrough motionPaused={motionPaused} lowDataMode={lowDataMode} /><PolurTripPlannerMicroFlow motionPaused={motionPaused} lowDataMode={lowDataMode} /><CaseSignalReveal id="polur-charm" open={openCaseSignal === "polur-charm"} onToggle={() => setOpenCaseSignal((current) => current === "polur-charm" ? null : "polur-charm")} motionPaused={motionPaused} /><button type="button" className="ai-studio-detail-trigger mt-6" onClick={() => setPolurCharmOpen(true)} aria-haspopup="dialog">Open project brief <ArrowUpRight size={15} /></button><div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5"><span className="label text-[0.57rem] text-white/65">React 19 · TypeScript · TanStack · i18n</span><span className="flex flex-wrap gap-x-4 gap-y-2"><a className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-cyan-100 hover:text-white" href="https://polurcharm.com" target="_blank" rel="noreferrer">Visit live site <ArrowUpRight size={15} /></a><a className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-cyan-100 hover:text-white" href="https://github.com/gokuuchihatamil/polur-charm" target="_blank" rel="noreferrer">Repository <Github size={15} /></a></span></div></div></article></Reveal>
          </div>
        </div>
      </section>
      <AIContentStudioDialog open={aiContentStudioOpen} onOpenChange={setAiContentStudioOpen} />
      <PolurCharmDialog open={polurCharmOpen} onOpenChange={setPolurCharmOpen} />
      <section id="project-collection" className="project-collection-section top-rule bg-[#0a0911] py-28 md:py-40">
        <div className="container"><Reveal><SectionIntro index="03.5" eyebrow="Project collection" title="More signals in the field." detail="Four smaller studies across automation, AI media systems, career intelligence, and experimental IoT research." motionPaused={motionPaused} /></Reveal><div className="collection-guidance" id="collection-guidance" aria-live="polite"><span className="collection-guidance-kicker">Browse the hand</span><span className="collection-guidance-state">{collectionFocus === null ? "Hover or focus a card to bring its signal forward." : `Signal 0${collectionFocus + 1} / 04 · ${projectCollection[collectionFocus].title}`}</span><span className="collection-guidance-hint">Select for full brief <ArrowUpRight size={13} /></span></div><div className={`project-collection-stage mt-7 ${collectionFocus !== null ? "is-collection-engaged" : ""}`} onScroll={(event) => { if (window.innerWidth >= 768) return; const stage = event.currentTarget; const stageCenter = stage.getBoundingClientRect().left + stage.clientWidth / 2; const nextSnap = projectCollection.reduce((nearest, _, index) => { const card = stage.querySelector<HTMLElement>(`.collection-card-${index + 1}`); if (!card) return nearest; const distance = Math.abs(card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2 - stageCenter); return distance < nearest.distance ? { index, distance } : nearest; }, { index: mobileCollectionSnap, distance: Number.POSITIVE_INFINITY }).index; setMobileCollectionSnap((current) => current === nextSnap ? current : nextSnap); }} aria-label="Project Collection. Select a project card to view its details." aria-describedby="collection-guidance">{projectCollection.map((project, index) => <div key={project.id} className={`collection-reveal collection-reveal-${index + 1} ${collectionFocus === index ? "is-collection-active" : ""}`}><button type="button" className={`collection-card collection-card-${index + 1}`} onClick={() => { setCollectionFocus(index); setCollectionDialogLoading(!reduceMotion); setActiveCollectionProject(project); }} onMouseEnter={() => setCollectionFocus(index)} onMouseLeave={() => setCollectionFocus(null)} onFocus={() => setCollectionFocus(index)} onBlur={() => setCollectionFocus(null)} aria-label={`Open details for ${project.title}`}><img src={project.image} alt={project.alt} /><span className="collection-card-scrim" aria-hidden="true" /><span className="collection-card-index">0{index + 1} / 04</span><span className="collection-card-copy"><em>{project.label}</em><b>{project.title}</b></span><span className="collection-card-open">Open <ArrowUpRight size={14} /></span></button></div>)}</div><div className="collection-snap-indicator" aria-live="polite"><span className="collection-snap-line" aria-hidden="true" />{projectCollection.map((project, index) => <span key={project.id} className={`collection-snap-dot ${mobileCollectionSnap === index ? "is-active" : ""}`} aria-hidden="true" />)}<span className="sr-only">Card {mobileCollectionSnap + 1} of {projectCollection.length} centred: {projectCollection[mobileCollectionSnap].title}</span></div><Reveal delay={.28}><p className="collection-footnote"><span className="signal-dot" />Each collection card opens a focused brief. Only MyJob AI Radar includes its supplied public demo; no source-code links are shown.</p></Reveal></div>
      </section>
      <ProjectCollectionDialog project={activeCollectionProject} loading={collectionDialogLoading} onOpenChange={(open) => { if (!open) { setCollectionDialogLoading(false); setActiveCollectionProject(null); } }} />

      <section id="experience" className="editorial-band container py-28 md:py-40">
        <Reveal><SectionIntro index="04" eyebrow="Experience" title="Learning in the work." detail="A growing practice across product design, full-stack delivery, and the systems that connect a polished surface to dependable behaviour." motionPaused={motionPaused} /></Reveal>
        <div className="experience-layout mt-14 grid gap-12 lg:grid-cols-[1.28fr_.72fr] lg:gap-20">
          <div className="timeline-list"><Reveal><div className={`timeline-row ${activeExperience === 0 ? "is-map-active" : ""}`} tabIndex={0} aria-label="Project Intern. Focus to highlight related skills." onMouseEnter={() => setActiveExperience(0)} onFocus={() => setActiveExperience(0)}><TimelineCheckpoint motionPaused={motionPaused} /><div className="label leading-6">{experience[0].period}<br /><span className="text-[#777285]">{experience[0].place}</span></div><div><h3 className="display text-2xl text-white">{experience[0].role}</h3><p className="mt-1 text-sm text-violet-200">{experience[0].company}</p><ExperienceEvidenceSignal label={experienceSignals[0]} motionPaused={motionPaused} /><ul className="mt-4 space-y-2.5 text-sm leading-6 text-[#b7b0c1]">{experience[0].details.map((detail) => <li key={detail} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 bg-violet-300" />{detail}</li>)}</ul></div></div></Reveal>
            {experience.slice(1).map((item, index) => <Reveal delay={(index + 1) * 0.08} key={item.company}><div className={`timeline-row ${activeExperience === index + 1 ? "is-map-active" : ""}`} tabIndex={0} aria-label={`${item.role}. Focus to highlight related skills.`} onMouseEnter={() => setActiveExperience(index + 1)} onFocus={() => setActiveExperience(index + 1)}><TimelineCheckpoint motionPaused={motionPaused} /><div className="label leading-6">{item.period}<br /><span className="text-[#777285]">{item.place}</span></div><div><h3 className="display text-2xl text-white">{item.role}</h3><p className="mt-1 text-sm text-violet-200">{item.company}</p><ExperienceEvidenceSignal label={experienceSignals[index + 1]} motionPaused={motionPaused} /><ul className="mt-4 space-y-2.5 text-sm leading-6 text-[#b7b0c1]">{item.details.map((detail) => <li key={detail} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 bg-violet-300" />{detail}</li>)}</ul></div></div></Reveal>)}
          </div>
          <Reveal delay={0.1} className="experience-aside-stack self-start"><ExperienceConnectionMap activeExperience={activeExperience} motionPaused={motionPaused} /><div className="panel p-7 md:p-8"><div className="flex items-center gap-3"><GraduationCap className="text-violet-300" size={20} /><p className="label">Education</p></div><div className="mt-7"><p className="display text-3xl leading-tight text-white">B.Tech, Information Technology</p><p className="mt-3 text-sm leading-6 text-[#c2bbce]">Saveetha School of Engineering, Chennai</p><p className="mt-5 border-l border-violet-400 pl-3 text-sm text-violet-200">09/2021—Present · CGPA 8.0 / 10.0</p></div><div className="mt-8 space-y-3 border-t border-white/10 pt-6"><div className="flex justify-between text-sm text-[#aaa4b7]"><span>HSC</span><span className="text-white">80%</span></div><div className="flex justify-between text-sm text-[#aaa4b7]"><span>SSLC</span><span className="text-white">79%</span></div></div></div></Reveal>
        </div>
      </section>

      <section className="editorial-band top-rule bg-[#0d0b15] py-28 md:py-40">
        <div className="mini-singularity skill-singularity" aria-hidden="true"><span /></div><span className="signal-thread skill-thread" aria-hidden="true" />
        <div className="container"><Reveal><SectionIntro index="05" eyebrow="Capabilities" title="A stack with range." detail="Design craft, frontend detail, backend thinking, and applied experimentation — organised around the goal of making a useful product feel inevitable." motionPaused={motionPaused} /></Reveal>
          <Reveal delay={0.08}><div className="skill-legend" aria-label="Four-point star-map proficiency scale"><span className="skill-legend-title">Star map / four-point scale</span>{[[1, "Exploring"], [2, "Foundation"], [3, "Working"], [4, "Applied"]].map(([stars, label]) => <span className="skill-legend-item" key={label as string}><span className="skill-legend-stars" aria-hidden="true">{Array.from({ length: 4 }, (_, star) => <b key={star} className={star < Number(stars) ? "is-lit" : ""} />)}</span>{label}</span>)}</div></Reveal>
          <div className={`skill-gravity-status ${gravityProject ? "is-active" : ""}`} aria-live="polite"><span className="skill-gravity-core" aria-hidden="true"><i /></span><div><p className="label">Project gravity</p><p>{gravityProject ? <><b>{projectSkillGravity[gravityProject].label}</b> draws in {projectSkillGravity[gravityProject].note}.</> : "Hover or focus a featured project to align its relevant skills."}</p></div><div className="skill-gravity-controls" aria-label="Choose a project skill alignment">{orbitProjects.map((project) => <button type="button" key={project.id} className={gravityProject === project.id ? "is-active" : ""} onClick={() => setGravityProject(project.id)} aria-pressed={gravityProject === project.id}>{project.index}</button>)}<button type="button" className="skill-gravity-reset" onClick={() => setGravityProject(null)} disabled={!gravityProject}>Reset</button></div></div>
          <div className="capability-grid mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => <Reveal key={skill.code} delay={index * 0.04}><div className={`min-h-[180px] bg-[#100d18] p-6 transition-colors hover:bg-[#171126] ${gravityProject && skill.items.some((item) => projectSkillGravity[gravityProject].skills.includes(item as never)) ? "is-gravity-group" : ""}`}><div className="flex items-start justify-between"><p className="label">{skill.code}</p><Layers3 size={18} className="text-violet-300" /></div><h3 className="display mt-7 text-2xl text-white">{skill.title}</h3><div className="mt-5 flex flex-wrap gap-2">{skill.items.map((item) => { const proficiency = skillProficiency[item] ?? { level: "Working", stars: 3 }; const isGravityActive = Boolean(gravityProject && projectSkillGravity[gravityProject].skills.includes(item as never)); const vector = skillGravityVectors[item] ?? { x: "0px", y: "0px" }; return <span className={`skill-chip ${isGravityActive ? "is-gravity-active" : ""}`} key={item} tabIndex={0} aria-label={`${item}: ${proficiency.level} proficiency${isGravityActive ? ". Related to the active project." : ""}`} style={{ "--gravity-x": vector.x, "--gravity-y": vector.y } as React.CSSProperties}><span>{item}</span><span className="skill-tooltip" role="tooltip"><span className="skill-star-map" aria-hidden="true">{Array.from({ length: 4 }, (_, star) => <i key={star} className={star < proficiency.stars ? "is-lit" : ""} />)}</span><span className="skill-tooltip-copy">{proficiency.level} proficiency</span></span></span>; })}</div></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="editorial-band container py-28 md:py-40">
        <span className="signal-thread credential-thread" aria-hidden="true" />
        <Reveal><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="label">06 / Credentials</p><h2 className="display mt-4 text-4xl text-white md:text-6xl">Signals of momentum.</h2></div><BriefcaseBusiness className="mb-2 text-violet-300" size={28} /></div></Reveal>
        <div className="credential-grid relative mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"><CredentialSignalScan motionPaused={motionPaused} />{certifications.map((credential, index) => <Reveal delay={index * 0.06} key={credential.title}><button type="button" className="cert credential-card relative w-full bg-[#0d0b15] text-left" onClick={() => setActiveCredential(index)} aria-haspopup="dialog" aria-label={`Open preview for ${credential.title}, issued by ${credential.issuer}`}><span className="cert-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p className="label text-violet-200">{credential.issuer}</p><p className="display mt-6 text-xl leading-tight text-white">{credential.title}</p><p className="mt-4 text-xs text-[#9d96ac]">{credential.meta}</p><span className="credential-open-cue">Open record <ArrowUpRight size={13} /></span></button></Reveal>)}</div>
        <div className={`credential-exterior-field ${motionPaused || reduceMotion || lowDataMode ? "is-static" : ""}`} aria-hidden="true"><span className="credential-exterior-horizon" /><span className="credential-exterior-ring ring-one" /><span className="credential-exterior-ring ring-two" /><span className="credential-exterior-stream stream-one" /><span className="credential-exterior-stream stream-two" /><span className="credential-exterior-sparks"><i /><i /><i /><i /></span><span className="credential-exterior-caption">SMP / GRAVITY FIELD</span></div>
        <CredentialPreviewDialog credential={activeCredential === null ? null : certifications[activeCredential]} open={activeCredential !== null} onOpenChange={(open) => { if (!open) setActiveCredential(null); }} motionPaused={motionPaused} lowDataMode={lowDataMode} />
      </section>

      <section id="contact" className="editorial-band relative overflow-hidden border-t border-white/10 py-28 md:py-40" onPointerDown={createContactPulse} onPointerMove={extendContactConstellation} onPointerLeave={() => setContactConstellationTrail([])} style={{ backgroundImage: "linear-gradient(90deg, rgba(9,9,15,.95), rgba(9,9,15,.8)), url('/manus-storage/smp-ambient-texture_4dec6a68.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className={`contact-atmosphere ${contactFocused ? "is-engaged" : ""}`} aria-hidden="true"><span className="contact-orbit one" /><span className="contact-orbit two" /><span className="contact-glint one" /><span className="contact-glint two" /><span className="contact-beacon"><i /><i /><i /></span>{contactPulses.map((pulse) => <span key={pulse.id} className="contact-pulse" style={{ left: `${pulse.x}%`, top: `${pulse.y}%` }} />)}</div>
        <div className="contact-constellation" aria-hidden="true">{contactConstellationSegments.map((segment) => <span key={segment.id} className="constellation-line" style={{ left: `${segment.x}%`, top: `${segment.y}%`, width: `${segment.length}%`, transform: `rotate(${segment.angle}deg)` }} />)}{contactConstellationTrail.map((point) => <span key={point.id} className="constellation-point" style={{ left: `${point.x}%`, top: `${point.y}%` }} />)}</div>
        <div className="container relative z-10"><Reveal><div className="grid gap-12 lg:grid-cols-[.86fr_1.14fr] lg:gap-24"><div><p className="label">07 / Contact</p><h2 className="display mt-5 max-w-[9ch] text-5xl leading-[.9] text-white md:text-7xl">Let&apos;s make the next interaction <span className="violet-text">count.</span></h2><p className="mt-7 max-w-md text-[0.94rem] leading-7 text-[#b7b0c1]">For frontend, UI/UX, Java, or collaborative product work, write a note with a little context. I&apos;ll take it from there.</p><div className="mt-10 space-y-4"><a href="mailto:manojprabhu0707@gmail.com" className="flex items-center gap-4 text-sm text-[#d3cce0] hover:text-white"><span className="icon-button h-10 w-10"><Mail size={16} /></span>manojprabhu0707@gmail.com</a><a href="tel:+919677518268" className="flex items-center gap-4 text-sm text-[#d3cce0] hover:text-white"><span className="icon-button h-10 w-10"><Phone size={16} /></span>+91 9677518268</a><a href="https://maps.google.com/?q=Polur,Tamil+Nadu" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-sm text-[#d3cce0] hover:text-white"><span className="icon-button h-10 w-10"><MapPin size={16} /></span>Polur, Tamil Nadu</a></div></div>
          <form className="panel p-6 md:p-9" onSubmit={handleContact} onFocusCapture={() => setContactFocused(true)} onBlurCapture={handleContactBlur}><div className="grid gap-5"><div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><span className="label text-[0.57rem]">Correspondence / 01</span><button type="button" className="motion-toggle" onClick={() => setMotionPaused((paused) => !paused)} aria-pressed={motionPaused || Boolean(reduceMotion)} aria-label={reduceMotion ? "Background motion is paused by your device setting" : motionPaused ? "Resume background motion" : "Pause background motion"} disabled={Boolean(reduceMotion)}>{motionPaused || reduceMotion ? <Play size={13} /> : <Pause size={13} />}{motionPaused || reduceMotion ? "Motion paused" : "Motion live"}</button></div><label className="block"><span className="label mb-2 block">Your name</span><input className="form-field" required name="name" placeholder="What should I call you?" /></label><label className="block"><span className="label mb-2 block">Email</span><input className="form-field" type="email" required name="email" placeholder="name@company.com" /></label><label className="block"><span className="label mb-2 block">Message</span><textarea className="form-field min-h-36 resize-y" required name="message" placeholder="A few lines about the work, goal, or opportunity..." /></label><button className="signal-button primary w-full" type="submit">{sent ? "Message prepared" : "Send the note"} <Send size={15} /></button>{sent ? <div className="delivery-status" role="status" aria-live="polite"><CircleCheckBig size={19} /><div><p className="label text-[0.56rem] text-violet-100">Message prepared</p><p className="mt-1 text-xs leading-5 text-[#dfd6f5]">Your email app opened with this note addressed to Manoj. Send it there to complete delivery.</p></div></div> : null}<p className="text-center text-xs leading-5 text-[#827b91]">This form prepares a message in your email client; final delivery is confirmed by your email provider.</p></div></form></div></Reveal></div>
      </section>

      <footer className="border-t border-white/10 bg-[#08080e] py-7"><div className="container flex flex-col justify-between gap-5 text-xs text-[#8d869a] sm:flex-row sm:items-center"><div className="flex items-center gap-3"><span className="seal-wrap h-9 w-9"><img src="/manus-storage/smp-mj-monogram-clear-j_24fbf37a.png" alt="MJ monogram" /></span><span>© {year} S Manoj Prabhu. Built with intention.</span></div><div className="flex items-center gap-4"><a className="hover:text-violet-200" href="https://github.com/manojprabhu07" target="_blank" rel="noreferrer">GitHub</a><a className="hover:text-violet-200" href="mailto:manojprabhu0707@gmail.com">Email</a><button className="inline-flex items-center gap-1 hover:text-violet-200" onClick={() => scrollToSection("top")}>Back to top <ArrowUpRight size={13} /></button><button className={`footer-star ${footerBurst ? "is-bursting" : ""}`} onClick={triggerFooterBurst} aria-label={reduceMotion ? "Star motion is disabled by your device setting" : motionPaused ? "Star motion is paused" : "Release a closing spark"} disabled={Boolean(reduceMotion || motionPaused)}><Sparkles size={14} /><span className="spark-tooltip">Release spark</span><span className="corner-spark-field" aria-hidden="true">{footerBurst ? Array.from({ length: 8 }, (_, index) => <span key={`${footerBurst}-${index}`} className="corner-spark" style={{ "--spark-angle": `${index * 45}deg` } as React.CSSProperties} />) : null}</span></button></div></div></footer>
      <div className="mobile-contact-dock" aria-label="Mobile quick actions"><button className="mobile-resume-action" type="button" onClick={downloadResume}><Download size={15} />Résumé</button><button className="mobile-contact-action" type="button" onClick={() => scrollToSection("contact")}><Mail size={16} />Contact</button></div>
    </main>
  );
}
