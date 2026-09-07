/**
 * Portfolio content: all data constants, shared types, and tiny DOM helpers
 * extracted verbatim from pages/Home.tsx (Phase 3). No React imports.
 */
export const navItems = [
  ["About", "about"],
  ["Work", "work"],
  ["Experience", "experience"],
  ["Contact", "contact"],
] as const;

export const skills = [
  { title: "Languages", code: "01", items: ["Java", "JavaScript", "Python", "SQL"] },
  { title: "Frontend", code: "02", items: ["HTML5", "CSS3", "React (basic)"] },
  { title: "UI / UX", code: "03", items: ["Figma", "Wireframing", "Prototyping"] },
  { title: "Backend", code: "04", items: ["Spring Boot", "REST API", "MySQL"] },
  { title: "Tools & Cloud", code: "05", items: ["Git", "GitHub", "VS Code", "Firebase", "Oracle APEX"] },
  { title: "Applied ML", code: "06", items: ["XGBoost", "SVM", "Logistic Regression", "Agile", "Scrum"] },
];

export const experience = [
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
export const experienceSignals = ["8+ APIs shipped", "3 review cycles", "20+ components"] as const;
export const experienceConnections = [
  { role: "Project Intern", focus: "Java service delivery", skills: ["Java", "Spring Boot", "REST APIs", "MySQL"] },
  { role: "UI/UX Design Intern", focus: "Research-led interface design", skills: ["Figma", "Usability", "Wireframes", "Prototypes"] },
  { role: "UI/UX Design Intern", focus: "Reusable mobile systems", skills: ["Figma", "Components", "Material Design", "Mobile flows"] },
] as const;
export const experienceSkillNodes = ["Java", "Spring Boot", "REST APIs", "MySQL", "Figma", "Usability", "Components", "Mobile flows"] as const;

export const certifications = [
  { issuer: "Oracle", title: "APEX Cloud Developer Professional", meta: "1Z0-771", theme: "Application development", focus: "Cloud delivery" },
  { issuer: "IBM", title: "Artificial Intelligence Fundamentals", meta: "SkillsBuild", theme: "Applied intelligence", focus: "AI foundations" },
  { issuer: "NPTEL", title: "Introduction to IoT", meta: "Credential", theme: "Connected systems", focus: "IoT concepts" },
  { issuer: "Infosys", title: "Springboard Internship 6.0", meta: "Certificate", theme: "Industry practice", focus: "Product delivery" },
] as const;

export const reelItems = ["React interfaces", "Figma systems", "Java services", "REST APIs", "Product thinking", "Applied ML"];
export const professionalRoles = ["Frontend Developer", "UI/UX Designer", "Java Developer"];
export const orbitProjects = [
  { id: "attack-study", index: "01", title: "Attack model", discipline: "ML / security", signal: "85% accuracy" },
  { id: "delivery-study", index: "02", title: "Delivery flow", discipline: "UX / mobile", signal: "15+ screens" },
  { id: "ai-content-studio", index: "03", title: "AI content studio", discipline: "Automation / media", signal: "Auto pipeline" },
  { id: "polur-charm", index: "04", title: "Polur Charm", discipline: "Travel / civic tech", signal: "24/7 discovery" },
] as const;
export type OrbitProjectId = (typeof orbitProjects)[number]["id"];
export const projectSkillGravity = {
  "attack-study": { label: "Attack model", note: "Python, XGBoost, SVM, Logistic Regression", skills: ["Python", "XGBoost", "SVM", "Logistic Regression"] },
  "delivery-study": { label: "Delivery flow", note: "Figma, Wireframing, Prototyping, Material-led UI", skills: ["Figma", "Wireframing", "Prototyping", "HTML5"] },
  "ai-content-studio": { label: "AI content studio", note: "Python automation, JavaScript, REST APIs, and Git", skills: ["Python", "JavaScript", "REST API", "Git"] },
  "polur-charm": { label: "Polur Charm", note: "React, TypeScript, Tailwind CSS, localization, and civic discovery", skills: ["JavaScript", "HTML5", "CSS3", "REST API"] },
} as const;
export const skillGravityVectors: Record<string, { x: string; y: string }> = {
  Python: { x: "7px", y: "-4px" }, XGBoost: { x: "-7px", y: "4px" }, SVM: { x: "5px", y: "5px" }, "Logistic Regression": { x: "-5px", y: "-5px" },
  Figma: { x: "7px", y: "-4px" }, Wireframing: { x: "-7px", y: "4px" }, Prototyping: { x: "5px", y: "5px" }, HTML5: { x: "-5px", y: "-5px" },
};
export const recruiterReviewSteps = [
  { id: "top", index: "01", label: "Availability", note: "Open to internships and collaborative product work." },
  { id: "about", index: "02", label: "Core proof", note: "React components, Figma screens, and 85% ML accuracy." },
  { id: "work", index: "03", label: "Selected work", note: "Machine-learning evaluation and mobile product design." },
  { id: "contact", index: "04", label: "Contact", note: "Reply within 1–2 days." },
] as const;
export const caseSignals = {
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
export type CaseStudyId = keyof typeof caseSignals;
export const aiContentStudio = {
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
export const polurCharm = {
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
export const projectCollection = [
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
    image: "/images/project-collection-pinterest-automation_0e75a634.webp",
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
    image: "/images/project-collection-social-publishing_227bb808.webp",
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
    image: "/images/project-collection-myjob-radar_8cc39039.webp",
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
    image: "/images/project-collection-aroma-diffuser_04698510.webp",
    alt: "Original cinematic smart aroma diffuser research visual with sensor halos and fuzzy-logic light curves",
  },
] as const;
export type CollectionProject = (typeof projectCollection)[number];
export type ConnectionPrefetchProfile = { enabled: boolean; intentDistance: number; velocityThreshold: number };

export function getConnectionPrefetchProfile(): ConnectionPrefetchProfile {
  const fallback = { enabled: true, intentDistance: 18, velocityThreshold: .35 };
  if (typeof navigator === "undefined") return fallback;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string; downlink?: number; rtt?: number } }).connection;
  if (!connection) return fallback;
  const constrained = connection.saveData || connection.effectiveType === "slow-2g" || connection.effectiveType === "2g" || (typeof connection.downlink === "number" && connection.downlink < 1.5) || (typeof connection.rtt === "number" && connection.rtt > 600);
  if (constrained) return { enabled: false, intentDistance: Number.POSITIVE_INFINITY, velocityThreshold: Number.POSITIVE_INFINITY };
  const cautious = connection.effectiveType === "3g" || (typeof connection.downlink === "number" && connection.downlink < 3) || (typeof connection.rtt === "number" && connection.rtt > 250);
  return cautious ? { enabled: true, intentDistance: 32, velocityThreshold: .55 } : fallback;
}

export type InteractionPoint = { id: number; x: number; y: number };
export const skillProficiency: Record<string, { level: string; stars: number }> = {
  Java: { level: "Applied", stars: 4 }, JavaScript: { level: "Working", stars: 3 }, Python: { level: "Working", stars: 3 }, SQL: { level: "Working", stars: 3 }, HTML5: { level: "Applied", stars: 4 }, CSS3: { level: "Applied", stars: 4 }, "React (basic)": { level: "Foundation", stars: 2 }, Figma: { level: "Applied", stars: 4 }, Wireframing: { level: "Applied", stars: 4 }, Prototyping: { level: "Applied", stars: 4 }, "Spring Boot": { level: "Working", stars: 3 }, "REST API": { level: "Applied", stars: 4 }, MySQL: { level: "Working", stars: 3 }, Git: { level: "Working", stars: 3 }, GitHub: { level: "Working", stars: 3 }, "VS Code": { level: "Applied", stars: 4 }, Firebase: { level: "Working", stars: 3 }, "Oracle APEX": { level: "Foundation", stars: 2 }, XGBoost: { level: "Applied", stars: 4 }, SVM: { level: "Working", stars: 3 }, "Logistic Regression": { level: "Working", stars: 3 }, Agile: { level: "Working", stars: 3 }, Scrum: { level: "Working", stars: 3 },
};

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function downloadResume() {
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

export function releaseSignalButtonMagnet(button: HTMLElement | null) {
  if (!button) return;
  button.classList.remove("is-magnetized");
  button.style.removeProperty("--magnet-x");
  button.style.removeProperty("--magnet-y");
}
