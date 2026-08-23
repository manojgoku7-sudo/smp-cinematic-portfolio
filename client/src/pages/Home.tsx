/**
 * Obsidian Studio page — an asymmetric editorial reel with ultraviolet signals and purposeful micro-motion.
 */
import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
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

function SectionIntro({ index, eyebrow, title, detail }: { index: string; eyebrow: string; title: string; detail?: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-[9rem_1fr] md:gap-10">
      <div className="flex items-center gap-3 md:block">
        <span className="label">{index}</span>
        <span className="hidden h-px flex-1 bg-violet-300/25 md:mt-3 md:block" />
      </div>
      <div>
        <p className="label mb-4">{eyebrow}</p>
        <h2 className="display section-heading">{title}</h2>
        {detail ? <p className="mt-6 max-w-xl text-[0.94rem] leading-7 text-[#b0aabc]">{detail}</p> : null}
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false });
  const [sent, setSent] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (motionPaused || reduceMotion) {
      video.pause();
      return;
    }
    video.play().catch(() => undefined);
  }, [motionPaused, reduceMotion]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onPointer = (event: PointerEvent) => setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }));
    const onEnter = () => setCursor((current) => ({ ...current, active: true }));
    const onLeave = () => setCursor((current) => ({ ...current, active: false }));
    const interactive = Array.from(document.querySelectorAll<HTMLElement>("a,button,input,textarea"));
    window.addEventListener("scroll", onScroll, { passive: true });
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

  return (
    <main className={`page-shell ${motionPaused ? "motion-paused" : ""}`}>
      {!reduceMotion && <div className={`cursor ${cursor.active ? "is-active" : ""}`} style={{ transform: `translate3d(${cursor.x - 5}px, ${cursor.y - 5}px, 0)` }} />}
      <div className="grain" aria-hidden="true" />

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
          <a href="mailto:manojprabhu0707@gmail.com" className="signal-button hidden min-h-0 px-4 py-2.5 md:inline-flex">Open correspondence <ArrowUpRight size={14} /></a>
          <button className="icon-button md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close navigation" : "Open navigation"}>{mobileOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
        {mobileOpen ? (
          <div className="border-t border-violet-200/10 bg-[#0b0a12]/95 px-5 py-6 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
              {navItems.map(([label, id]) => <button key={id} className="display text-left text-2xl text-white" onClick={() => { setMobileOpen(false); scrollToSection(id); }}>{label}</button>)}
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
            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 38 }} animate={reduceMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.78, delay: 0.14, ease: [0.23, 1, 0.32, 1] }} className="display max-w-[10ch] text-[clamp(4.1rem,9vw,8.2rem)] font-semibold leading-[0.81] text-white">
              S MANOJ <span className="violet-text">PRABHU</span>
            </motion.h1>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.64, delay: 0.28, ease: [0.23, 1, 0.32, 1] }} className="mt-8 max-w-lg">
              <p className="display text-xl leading-snug text-[#e7e0ff] md:text-2xl">Frontend Developer <span className="text-violet-300">/</span> UI/UX Designer <span className="text-violet-300">/</span> Java Developer</p>
              <p className="mt-4 max-w-md text-[0.93rem] leading-7 text-[#aca6ba]">Crafting intuitive interfaces and full-stack experiences — from Figma to production code.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="signal-button primary" onClick={() => scrollToSection("work")}>Open selected work <ArrowDownRight size={16} /></button>
                <button className="signal-button" onClick={downloadResume}>Retrieve résumé <Download size={15} /></button>
              </div>
              <div className="mt-9 flex flex-wrap gap-2.5">
                <a className="icon-button" href="mailto:manojprabhu0707@gmail.com" aria-label="Email Manoj"><Mail size={17} /></a>
                <a className="icon-button" href="tel:+919677518268" aria-label="Call Manoj"><Phone size={17} /></a>
                <a className="icon-button" href="https://github.com/manojprabhu07" target="_blank" rel="noreferrer" aria-label="Visit GitHub"><Github size={17} /></a>
                <a className="icon-button" href="https://www.linkedin.com/in/manojprabhu07" target="_blank" rel="noreferrer" aria-label="Visit LinkedIn"><Linkedin size={17} /></a>
              </div>
            </motion.div>
          </div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 24 }} animate={reduceMotion ? {} : { opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.95, delay: 0.18, ease: [0.23, 1, 0.32, 1] }} className="hero-visual">
            <video ref={heroVideoRef} className="hero-video" autoPlay={!reduceMotion && !motionPaused} loop muted playsInline preload="metadata" poster="/manus-storage/smp-hero-orbit_86f3fd46.jpg" aria-hidden="true">
              <source src="/manus-storage/smp-anime-black-hole_fe55ef2a.mp4" type="video/mp4" />
            </video>
            <div className="hero-grid" />
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

      <section id="about" className="editorial-band container py-28 md:py-40">
        <Reveal><SectionIntro index="02" eyebrow="Working at the intersection" title="Systems made visible." detail="A frontend developer and UI/UX designer who moves from interface structure to implementation — with enough backend and machine-learning context to make the whole experience connect." /></Reveal>
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

      <section id="work" className="editorial-band top-rule bg-[#0d0b15] py-28 md:py-40">
        <div className="container"><Reveal><SectionIntro index="03" eyebrow="Selected work" title="Proof of practice." detail="Two focused case studies across applied machine learning and mobile product design — distinct problems, one bias toward clear decisions." /></Reveal>
          <div className="project-grid mt-14 grid gap-5 lg:grid-cols-2">
            <Reveal delay={0.06}><article className="project-card panel" onMouseMove={handleProjectTilt} onMouseLeave={resetProjectTilt}>
              <img className="project-art" src="/manus-storage/smp-project-security_4a7c2847.jpg" alt="Abstract diagnostic network visual for cybersecurity machine learning project" />
              <div className="project-scrim" /><span className="project-signal">classified study</span><span className="project-index">01 / 02</span>
              <div className="relative z-10 flex min-h-[480px] flex-col justify-end p-7 md:p-9"><p className="label text-violet-200">Machine learning · 01/2024—04/2024</p><h3 className="display mt-3 max-w-[11ch] text-4xl leading-[0.95] text-white md:text-5xl">Prediction of Perpetration Attack</h3><p className="mt-5 max-w-[44ch] text-sm leading-6 text-[#cec6da]">Built and evaluated four Python / Scikit-learn models — XGBoost, SVM, Logistic Regression, and Gradient Boosting — reaching <strong className="font-semibold text-white">85% classification accuracy</strong> on a cybersecurity dataset.</p><div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5"><span className="label text-[0.57rem] text-white/65">Python · Scikit-learn · Model evaluation</span><a className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-violet-200 hover:text-white" href="https://github.com/manojprabhu07/Research-Papers-Final-Year-Project" target="_blank" rel="noreferrer">Open repository <ArrowUpRight size={15} /></a></div></div>
            </article></Reveal>
            <Reveal delay={0.13}><article className="project-card panel" onMouseMove={handleProjectTilt} onMouseLeave={resetProjectTilt}>
              <img className="project-art" src="/manus-storage/smp-project-food_c1b44933.jpg" alt="Abstract layered mobile interface visual for food delivery design project" />
              <div className="project-scrim" /><span className="project-signal">interaction study</span><span className="project-index">02 / 02</span>
              <div className="relative z-10 flex min-h-[480px] flex-col justify-end p-7 md:p-9"><p className="label text-violet-200">UI / UX design · 06/2023—08/2023</p><h3 className="display mt-3 max-w-[11ch] text-4xl leading-[0.95] text-white md:text-5xl">Food Delivery Mobile App</h3><p className="mt-5 max-w-[44ch] text-sm leading-6 text-[#cec6da]">Designed <strong className="font-semibold text-white">15+ production-ready screens</strong>, covering onboarding, discovery, cart, and order tracking, guided by Material Design and refined across two usability review cycles.</p><div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5"><span className="label text-[0.57rem] text-white/65">Figma · Mobile UX · Interaction flows</span><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-violet-200">Case study available on request <ArrowUpRight size={15} /></span></div></div>
            </article></Reveal>
          </div>
        </div>
      </section>

      <section id="experience" className="editorial-band container py-28 md:py-40">
        <Reveal><SectionIntro index="04" eyebrow="Experience" title="Learning in the work." detail="A growing practice across product design, full-stack delivery, and the systems that connect a polished surface to dependable behaviour." /></Reveal>
        <div className="experience-layout mt-14 grid gap-12 lg:grid-cols-[1.28fr_.72fr] lg:gap-20">
          <div className="timeline-list"><Reveal><div className="timeline-row"><div className="label leading-6">{experience[0].period}<br /><span className="text-[#777285]">{experience[0].place}</span></div><div><h3 className="display text-2xl text-white">{experience[0].role}</h3><p className="mt-1 text-sm text-violet-200">{experience[0].company}</p><ul className="mt-4 space-y-2.5 text-sm leading-6 text-[#b7b0c1]">{experience[0].details.map((detail) => <li key={detail} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 bg-violet-300" />{detail}</li>)}</ul></div></div></Reveal>
            {experience.slice(1).map((item, index) => <Reveal delay={(index + 1) * 0.08} key={item.company}><div className="timeline-row"><div className="label leading-6">{item.period}<br /><span className="text-[#777285]">{item.place}</span></div><div><h3 className="display text-2xl text-white">{item.role}</h3><p className="mt-1 text-sm text-violet-200">{item.company}</p><ul className="mt-4 space-y-2.5 text-sm leading-6 text-[#b7b0c1]">{item.details.map((detail) => <li key={detail} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 bg-violet-300" />{detail}</li>)}</ul></div></div></Reveal>)}
          </div>
          <Reveal delay={0.1} className="panel self-start p-7 md:p-8"><div className="flex items-center gap-3"><GraduationCap className="text-violet-300" size={20} /><p className="label">Education</p></div><div className="mt-7"><p className="display text-3xl leading-tight text-white">B.Tech, Information Technology</p><p className="mt-3 text-sm leading-6 text-[#c2bbce]">Saveetha School of Engineering, Chennai</p><p className="mt-5 border-l border-violet-400 pl-3 text-sm text-violet-200">09/2021—Present · CGPA 8.0 / 10.0</p></div><div className="mt-8 space-y-3 border-t border-white/10 pt-6"><div className="flex justify-between text-sm text-[#aaa4b7]"><span>HSC</span><span className="text-white">80%</span></div><div className="flex justify-between text-sm text-[#aaa4b7]"><span>SSLC</span><span className="text-white">79%</span></div></div></Reveal>
        </div>
      </section>

      <section className="editorial-band top-rule bg-[#0d0b15] py-28 md:py-40">
        <div className="container"><Reveal><SectionIntro index="05" eyebrow="Capabilities" title="A stack with range." detail="Design craft, frontend detail, backend thinking, and applied experimentation — organised around the goal of making a useful product feel inevitable." /></Reveal>
          <div className="capability-grid mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => <Reveal key={skill.code} delay={index * 0.04}><div className="min-h-[180px] bg-[#100d18] p-6 transition-colors hover:bg-[#171126]"><div className="flex items-start justify-between"><p className="label">{skill.code}</p><Layers3 size={18} className="text-violet-300" /></div><h3 className="display mt-7 text-2xl text-white">{skill.title}</h3><div className="mt-5 flex flex-wrap gap-2">{skill.items.map((item) => <span className="skill-chip" key={item}>{item}</span>)}</div></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="editorial-band container py-28 md:py-40">
        <Reveal><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="label">06 / Credentials</p><h2 className="display mt-4 text-4xl text-white md:text-6xl">Signals of momentum.</h2></div><BriefcaseBusiness className="mb-2 text-violet-300" size={28} /></div></Reveal>
        <div className="credential-grid mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">{certifications.map(([issuer, title, meta], index) => <Reveal delay={index * 0.06} key={title}><div className="cert bg-[#0d0b15]"><p className="label text-violet-200">{issuer}</p><p className="display mt-6 text-xl leading-tight text-white">{title}</p><p className="mt-4 text-xs text-[#9d96ac]">{meta}</p></div></Reveal>)}</div>
      </section>

      <section id="contact" className="editorial-band relative overflow-hidden border-t border-white/10 py-28 md:py-40" style={{ backgroundImage: "linear-gradient(90deg, rgba(9,9,15,.95), rgba(9,9,15,.8)), url('/manus-storage/smp-ambient-texture_4dec6a68.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="contact-atmosphere" aria-hidden="true"><span className="contact-orbit one" /><span className="contact-orbit two" /><span className="contact-glint one" /><span className="contact-glint two" /></div>
        <div className="container relative z-10"><Reveal><div className="grid gap-12 lg:grid-cols-[.86fr_1.14fr] lg:gap-24"><div><p className="label">07 / Contact</p><h2 className="display mt-5 max-w-[9ch] text-5xl leading-[.9] text-white md:text-7xl">Let&apos;s make the next interaction <span className="violet-text">count.</span></h2><p className="mt-7 max-w-md text-[0.94rem] leading-7 text-[#b7b0c1]">For frontend, UI/UX, Java, or collaborative product work, write a note with a little context. I&apos;ll take it from there.</p><div className="mt-10 space-y-4"><a href="mailto:manojprabhu0707@gmail.com" className="flex items-center gap-4 text-sm text-[#d3cce0] hover:text-white"><span className="icon-button h-10 w-10"><Mail size={16} /></span>manojprabhu0707@gmail.com</a><a href="tel:+919677518268" className="flex items-center gap-4 text-sm text-[#d3cce0] hover:text-white"><span className="icon-button h-10 w-10"><Phone size={16} /></span>+91 9677518268</a><a href="https://maps.google.com/?q=Polur,Tamil+Nadu" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-sm text-[#d3cce0] hover:text-white"><span className="icon-button h-10 w-10"><MapPin size={16} /></span>Polur, Tamil Nadu</a></div></div>
          <form className="panel p-6 md:p-9" onSubmit={handleContact}><div className="grid gap-5"><div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><span className="label text-[0.57rem]">Correspondence / 01</span><button type="button" className="motion-toggle" onClick={() => setMotionPaused((paused) => !paused)} aria-pressed={motionPaused || Boolean(reduceMotion)} aria-label={reduceMotion ? "Background motion is paused by your device setting" : motionPaused ? "Resume background motion" : "Pause background motion"} disabled={Boolean(reduceMotion)}>{motionPaused || reduceMotion ? <Play size={13} /> : <Pause size={13} />}{motionPaused || reduceMotion ? "Motion paused" : "Motion live"}</button></div><label className="block"><span className="label mb-2 block">Your name</span><input className="form-field" required name="name" placeholder="What should I call you?" /></label><label className="block"><span className="label mb-2 block">Email</span><input className="form-field" type="email" required name="email" placeholder="name@company.com" /></label><label className="block"><span className="label mb-2 block">Message</span><textarea className="form-field min-h-36 resize-y" required name="message" placeholder="A few lines about the work, goal, or opportunity..." /></label><button className="signal-button primary w-full" type="submit">{sent ? "Opening your email client" : "Send the note"} <Send size={15} /></button><p className="text-center text-xs leading-5 text-[#827b91]">This form opens your email client with the message addressed to Manoj.</p></div></form></div></Reveal></div>
      </section>

      <footer className="border-t border-white/10 bg-[#08080e] py-7"><div className="container flex flex-col justify-between gap-5 text-xs text-[#8d869a] sm:flex-row sm:items-center"><div className="flex items-center gap-3"><span className="seal-wrap h-9 w-9"><img src="/manus-storage/smp-logo_526971d2.png" alt="SMP monogram" /></span><span>© {year} S Manoj Prabhu. Built with intention.</span></div><div className="flex items-center gap-4"><a className="hover:text-violet-200" href="https://github.com/manojprabhu07" target="_blank" rel="noreferrer">GitHub</a><a className="hover:text-violet-200" href="mailto:manojprabhu0707@gmail.com">Email</a><button className="inline-flex items-center gap-1 hover:text-violet-200" onClick={() => scrollToSection("top")}>Back to top <ArrowUpRight size={13} /></button></div></div></footer>
    </main>
  );
}
