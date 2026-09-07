/**
 * Portfolio sections: presentational subcomponents extracted verbatim from
 * pages/Home.tsx (Phase 3). Props-driven only; no behavioral changes.
 */
import { FocusEvent, FormEvent, MouseEvent, PointerEvent as ReactPointerEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { Dialog, Dialog as DialogRoot, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CircleCheckBig,
  ChevronLeft,
  ChevronRight,
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
import { skills, experience, experienceConnections, experienceSkillNodes, caseSignals, CaseStudyId, aiContentStudio, polurCharm, projectCollection, CollectionProject } from "./portfolio-data";

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className ? `section-reveal ${className}` : "section-reveal"}
      initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.988 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.52, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function GravityHeading({ title, motionPaused }: { title: string; motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const staticType = reduceMotion || motionPaused;
  return <h2 className="display section-heading gravity-heading" aria-label={title}>{title.split(" ").map((word, wordIndex) => <span className="gravity-word-shell" key={`${word}-${wordIndex}`}><span className="gravity-word">{word.split("").map((character, characterIndex) => { const index = wordIndex * 8 + characterIndex; return <motion.span key={`${character}-${characterIndex}`} className="gravity-letter" aria-hidden="true" initial={staticType ? false : { x: (index % 5 - 2) * 3, y: 9 + (index % 3) * 3, rotate: (index % 3 - 1) * 1.2, opacity: .6 }} whileInView={staticType ? {} : { x: 0, y: 0, rotate: 0, opacity: 1 }} viewport={{ once: true, amount: .55 }} transition={{ duration: .54, delay: .08 + (index % 8) * .035, ease: [0.23, 1, 0.32, 1] }}>{character}</motion.span>; })}</span>{wordIndex < title.split(" ").length - 1 ? <span className="gravity-space" aria-hidden="true" /> : null}</span>)}</h2>;
}

export function SectionIntro({ index, eyebrow, title, detail, motionPaused = false }: { index: string; eyebrow: string; title: string; detail?: string; motionPaused?: boolean }) {
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

export function CaseSignalReveal({ id, open, onToggle, motionPaused }: { id: CaseStudyId; open: boolean; onToggle: () => void; motionPaused: boolean }) {
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

export function DeliveryWalkthrough({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
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

export function PolurCharmWalkthrough({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  const reduceMotion = useReducedMotion();
  const [runId, setRunId] = useState(0);
  const staticPlayback = reduceMotion || motionPaused || lowDataMode;
  return <section className={`polur-walkthrough ${staticPlayback ? "is-static" : ""}`} aria-label="Polur Charm discovery walkthrough"><div className="polur-walkthrough-head"><div><span className="label">Live guide walkthrough</span><p>Discover → plan → explore</p></div><button type="button" className="polur-replay" onClick={() => setRunId((current) => current + 1)} disabled={staticPlayback} aria-label={staticPlayback ? "Walkthrough motion is currently paused" : "Replay Polur Charm walkthrough"}><Play size={12} />Replay</button></div><div key={runId} className="polur-guide-screen" aria-hidden="true"><div className="polur-guide-panel polur-guide-discover"><span className="polur-guide-time">05:15 · Local guide</span><b>Parvathamalai trail</b><p>Full moon trek alert</p><div className="polur-guide-route"><i /><span><strong>Temple base</strong><em>Trail access · open</em></span><small>42 km</small></div><div className="polur-guide-stats"><span>Bus <b>04:20</b></span><span>Weather <b>Clear</b></span></div></div><div className="polur-guide-panel polur-guide-plan"><span className="polur-guide-time">Trip planner · 01</span><b>Route ready</b><p>Transit and safety checked</p><div className="polur-plan-list"><span><i />Regional bus <b>₹72</b></span><span><i />Ghat advisory <b>Clear</b></span><span><i />Water point <b>Saved</b></span></div></div><div className="polur-guide-panel polur-guide-quest"><span className="polur-guide-time">Heritage quest · 03</span><b>Explore and collect</b><p>Parvathamalai badge unlocked</p><div className="polur-quest-badge"><i>✦</i><span><strong>120 XP</strong><em>Trail marker logged</em></span></div></div><div className="polur-guide-progress"><i /><i /><i /></div></div><p className="polur-walkthrough-note">Illustrative discovery loop based on the platform’s local guide, trip-planning, safety, and heritage-quest tools.</p></section>;
}

export function PolurTripPlannerMicroFlow({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  void motionPaused;
  void lowDataMode;
  return null;
}

export function DeliveryDeviceRelay({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
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

export function DeliveryInteractionLoop({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  const reduceMotion = useReducedMotion();
  const staticLoop = reduceMotion || motionPaused || lowDataMode;
  return <section className={`delivery-interaction-loop ${staticLoop ? "is-static" : ""}`} aria-label="Delivery add-to-cart interaction detail"><div className="delivery-interaction-loop-head"><div><span className="label">Interaction detail</span><p>Quick add → cart confirmation</p></div><span className="delivery-loop-status">Live micro-flow</span></div><div className="delivery-interaction-stage" aria-hidden="true"><div className="delivery-loop-product"><span className="delivery-loop-art" /><div><b>Spiced ramen</b><em>Chef special · 28 min</em></div><strong>₹240</strong><button type="button">Add</button></div><span className="delivery-loop-cursor" /><span className="delivery-loop-pulse" /><div className="delivery-loop-cart"><i>01</i><span>Added to your cart</span><b>View cart</b></div></div><p className="delivery-interaction-loop-note">Illustrative interaction study: a clear action, immediate confirmation, and an unobstructed route to checkout.</p></section>;
}

export function AttackModelWalkthrough({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
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

export function AutomationStudioWalkthrough({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  return <AutomationReliabilityReel motionPaused={motionPaused} lowDataMode={lowDataMode} />;
}

export function AutomationReliabilityReel({ motionPaused, lowDataMode }: { motionPaused: boolean; lowDataMode: boolean }) {
  const reduceMotion = useReducedMotion();
  const [runId, setRunId] = useState(0);
  const staticPlayback = reduceMotion || motionPaused || lowDataMode;
  return <section className={`studio-reliability-reel ${staticPlayback ? "is-static" : ""}`} aria-label="AI Content Studio reliability walkthrough"><div className="studio-reliability-head"><div><span className="label">Reliability reel</span><p>Guard → recover → verify</p></div><button type="button" className="studio-replay" onClick={() => setRunId((current) => current + 1)} disabled={staticPlayback} aria-label={staticPlayback ? "Reliability reel motion is currently paused" : "Replay AI Content Studio reliability reel"}><Play size={12} />Replay</button></div><div key={runId} className="studio-reliability-screen" aria-hidden="true"><div className="studio-reliability-card studio-guard"><span>01 / QUOTA GUARD</span><b>API watch</b><em>Usage threshold detected</em><div className="studio-guard-meter"><i /><i /><i /><i /><i /></div></div><div className="studio-reliability-card studio-recover"><span>02 / FAILOVER PATH</span><b>Resume asset job</b><em>Fallback route engaged</em><div className="studio-recover-route"><i /><i /><i /></div></div><div className="studio-reliability-card studio-verify"><span>03 / STATE RESTORE</span><b>Cloud state verified</b><em>Credentials and queue restored</em><small><i />Recovered</small></div><span className="studio-reliability-sweep" /><span className="studio-reliability-packet"><i /></span></div><p className="studio-reliability-note">Illustrative reliability preview: quota awareness, fallback routing, and state restoration keep the automation pipeline resilient.</p></section>;
}

export function ProjectProofMarker({ value, suffix = "", ringValue, label, detail, tone = "violet", motionPaused }: { value: string; suffix?: string; ringValue: number; label: string; detail: string; tone?: "violet" | "cyan"; motionPaused: boolean }) {
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

export function ProjectSignalFocus({ tone, motionPaused }: { tone: "violet" | "cyan"; motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const staticMotion = reduceMotion || motionPaused;
  return <motion.span className={`project-signal-focus is-${tone}`} aria-hidden="true" initial={staticMotion ? false : { opacity: 0, scaleX: 0 }} whileInView={staticMotion ? {} : { opacity: 0.78, scaleX: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.72, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}><i /><i /></motion.span>;
}

export function BlueprintCrosshair({ motionPaused }: { motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const staticMotion = reduceMotion || motionPaused;
  return <motion.span className={`blueprint-crosshair ${entered && !staticMotion ? "is-focused" : ""}`} aria-hidden="true" initial={staticMotion ? false : { opacity: 0, scale: 0.92 }} whileInView={staticMotion ? {} : { opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.48 }} onViewportEnter={() => setEntered(true)} transition={{ duration: .28, delay: .22, ease: [0.23, 1, 0.32, 1] }}><i className="blueprint-crosshair-h" /><i className="blueprint-crosshair-v" /><b /><em /></motion.span>;
}

export function LensAperture({ motionPaused }: { motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const staticMotion = reduceMotion || motionPaused;
  return <motion.span className={`ml-lens-aperture ${entered && !staticMotion ? "is-focused" : ""}`} aria-hidden="true" initial={staticMotion ? false : { opacity: 0, scale: .72 }} whileInView={staticMotion ? {} : { opacity: 1, scale: 1 }} viewport={{ once: true, amount: .48 }} onViewportEnter={() => setEntered(true)} transition={{ duration: .3, delay: .18, ease: [0.23, 1, 0.32, 1] }}><i className="lens-core" /><i className="lens-orbit one" /><i className="lens-orbit two" /><b /></motion.span>;
}

export function TimelineCheckpoint({ motionPaused }: { motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const staticPulse = reduceMotion || motionPaused;
  return <motion.span className={`timeline-checkpoint ${entered && !staticPulse ? "is-active" : ""}`} aria-hidden="true" initial={false} whileInView={{}} viewport={{ once: true, amount: 0.55 }} onViewportEnter={() => setEntered(true)} />;
}

export function ExperienceEvidenceSignal({ label, motionPaused }: { label: string; motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const staticMotion = reduceMotion || motionPaused;
  return <motion.span className="experience-evidence-signal" initial={staticMotion ? false : { opacity: 0, x: -8 }} whileInView={staticMotion ? {} : { opacity: 1, x: 0 }} viewport={{ once: true, amount: .56 }} transition={{ duration: .32, delay: .12, ease: [0.23, 1, 0.32, 1] }}><motion.i aria-hidden="true" initial={staticMotion ? false : { scaleX: 0 }} whileInView={staticMotion ? {} : { scaleX: 1 }} viewport={{ once: true, amount: .56 }} transition={{ duration: .46, delay: .16, ease: [0.23, 1, 0.32, 1] }} /><b>{label}</b><em>evidence signal</em></motion.span>;
}

export function ExperienceConnectionMap({ activeExperience, motionPaused }: { activeExperience: number; motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const activeConnection = experienceConnections[activeExperience];
  const staticMotion = reduceMotion || motionPaused;
  return <motion.aside className={`experience-connection-map ${staticMotion ? "is-static" : ""}`} aria-label="Skills connected to the active experience role" initial={staticMotion ? false : { opacity: 0, y: 12 }} whileInView={staticMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .42, ease: [0.23, 1, 0.32, 1] }}><div className="experience-map-head"><div><p className="label">Skills / role map</p><p>Hover or focus a role to trace its active tools.</p></div><span>{String(activeExperience + 1).padStart(2, "0")} / 03</span></div><div className="experience-map-stage" aria-live="polite"><span className="experience-map-core"><b>{activeConnection.role === "Project Intern" ? "Build" : "Design"}</b><em>{activeConnection.focus}</em></span>{experienceSkillNodes.map((skill, index) => { const isActive = activeConnection.skills.some((item) => item === skill); return <span key={skill} className={`experience-map-link link-${index} ${isActive ? "is-active" : ""}`} aria-hidden="true" />; })}{experienceSkillNodes.map((skill, index) => { const isActive = activeConnection.skills.some((item) => item === skill); return <span key={skill} className={`experience-map-node node-${index} ${isActive ? "is-active" : ""}`}><b>{skill}</b></span>; })}</div><p className="experience-map-reading"><span className="label">Active role</span>{activeConnection.focus}</p></motion.aside>;
}

export function CredentialSignalScan({ motionPaused }: { motionPaused: boolean }) {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const staticMotion = reduceMotion || motionPaused;
  return <motion.span className={`credential-signal-scan ${entered && !staticMotion ? "is-active" : ""}`} aria-hidden="true" initial={staticMotion ? false : { opacity: 0 }} whileInView={staticMotion ? {} : { opacity: 1 }} viewport={{ once: true, amount: .35 }} onViewportEnter={() => setEntered(true)} transition={{ duration: .2 }}><i /><i /><i /></motion.span>;
}


export function AIContentStudioDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[min(48rem,calc(100svh-2rem))] overflow-y-auto rounded-none border-white/15 bg-[#0b0912] p-0 text-[#f4f0ff] shadow-[0_28px_100px_rgba(0,0,0,.62)] sm:max-w-4xl" showCloseButton={false}><div className="ai-studio-dialog"><div className="ai-studio-dialog-visual" aria-hidden="true"><img src="/images/ai-content-studio-showcase_e194be53.webp" alt="" /><span>Studio / 03</span></div><div className="p-6 sm:p-9"><div className="flex items-start justify-between gap-5"><div><p className="label text-violet-200">Project / Showcase only</p><DialogTitle className="display mt-4 max-w-[18ch] text-3xl leading-[.94] text-white sm:text-5xl">{aiContentStudio.title}</DialogTitle></div><button type="button" className="credential-preview-close shrink-0" onClick={() => onOpenChange(false)} aria-label="Close project details"><X size={16} /></button></div><DialogDescription className="mt-5 max-w-3xl text-sm leading-6 text-[#c8c0d8]">{aiContentStudio.description}</DialogDescription><dl className="ai-studio-summary"><div><dt>Category</dt><dd>{aiContentStudio.category}</dd></div><div><dt>Status</dt><dd>{aiContentStudio.status}</dd></div><div><dt>Role</dt><dd>{aiContentStudio.role}</dd></div></dl><section className="ai-studio-detail-section"><p className="label">Problem solved</p><p>{aiContentStudio.problem}</p></section><section className="ai-studio-detail-section"><p className="label">Main features</p><ul className="ai-studio-feature-list">{aiContentStudio.features.map((feature) => <li key={feature}><CircleCheckBig size={14} aria-hidden="true" /><span>{feature}</span></li>)}</ul></section><section className="ai-studio-detail-section"><p className="label">Technical highlights</p><ul className="ai-studio-feature-list">{aiContentStudio.highlights.map((highlight) => <li key={highlight}><span className="ai-studio-bullet" aria-hidden="true" /><span>{highlight}</span></li>)}</ul></section><section className="ai-studio-detail-section"><p className="label">Technology stack</p><div className="ai-studio-stack-grid">{aiContentStudio.stack.map((group) => <div key={group.label}><b>{group.label}</b><p>{group.values.join(" · ")}</p></div>)}</div></section><section className="ai-studio-detail-section"><p className="label">Tags</p><div className="ai-studio-tags">{aiContentStudio.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section><p className="ai-studio-showcase-note"><span className="signal-dot" aria-hidden="true" />This is a portfolio showcase. No source repository, View Code, or public demo link is listed.</p></div></div></DialogContent></Dialog>;
}

export function PolurCharmDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[min(48rem,calc(100svh-2rem))] overflow-y-auto rounded-none border-white/15 bg-[#0b0912] p-0 text-[#f4f0ff] shadow-[0_28px_100px_rgba(0,0,0,.62)] sm:max-w-4xl" showCloseButton={false}><div className="ai-studio-dialog polur-charm-dialog"><div className="ai-studio-dialog-visual" aria-hidden="true"><img src="/images/polur-charm-portfolio-art_ee154405.webp" alt="" /><span>Polur / 04</span></div><div className="p-6 sm:p-9"><div className="flex items-start justify-between gap-5"><div><p className="label text-cyan-100">Project / Active</p><DialogTitle className="display mt-4 max-w-[18ch] text-3xl leading-[.94] text-white sm:text-5xl">{polurCharm.title}</DialogTitle></div><button type="button" className="credential-preview-close shrink-0" onClick={() => onOpenChange(false)} aria-label="Close Polur Charm project details"><X size={16} /></button></div><DialogDescription className="mt-5 max-w-3xl text-sm leading-6 text-[#c8c0d8]">{polurCharm.description}</DialogDescription><dl className="ai-studio-summary polur-charm-summary"><div><dt>Category</dt><dd>{polurCharm.category}</dd></div><div><dt>Status</dt><dd>{polurCharm.status}</dd></div><div><dt>Role</dt><dd>{polurCharm.role}</dd></div></dl><section className="ai-studio-detail-section"><p className="label">Problem solved</p><p>{polurCharm.problem}</p></section><section className="ai-studio-detail-section"><p className="label">Main features</p><ul className="ai-studio-feature-list">{polurCharm.features.map((feature) => <li key={feature}><CircleCheckBig size={14} aria-hidden="true" /><span>{feature}</span></li>)}</ul></section><section className="ai-studio-detail-section"><p className="label">Technical highlights</p><ul className="ai-studio-feature-list">{polurCharm.highlights.map((highlight) => <li key={highlight}><span className="ai-studio-bullet" aria-hidden="true" /><span>{highlight}</span></li>)}</ul></section><section className="ai-studio-detail-section"><p className="label">Technology stack</p><div className="ai-studio-stack-grid">{polurCharm.stack.map((group) => <div key={group.label}><b>{group.label}</b><p>{group.values.join(" · ")}</p></div>)}</div></section><section className="ai-studio-detail-section"><p className="label">Tags</p><div className="ai-studio-tags">{polurCharm.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section><div className="polur-charm-dialog-actions"><a href="https://polurcharm.com" target="_blank" rel="noreferrer">Visit live site <ArrowUpRight size={15} /></a><a href="https://github.com/gokuuchihatamil/polur-charm" target="_blank" rel="noreferrer">Open repository <Github size={15} /></a></div></div></div></DialogContent></Dialog>;
}

export function CollectionDialogAperture({ staticMotion }: { staticMotion: boolean }) {
  return <span className={`collection-dialog-aperture ${staticMotion ? "is-static" : ""}`} aria-hidden="true"><i /><i /><i /></span>;
}

/* Obsidian Studio Smart Aroma detail: quiet, evidence-led control loop that only appears inside the matching project brief. */
export function SmartAromaWorkflowLoop({ staticMotion }: { staticMotion: boolean }) {
  return <section className={`smart-aroma-workflow ${staticMotion ? "is-static" : ""}`} aria-labelledby="smart-aroma-workflow-title"><div className="smart-aroma-workflow-head"><p className="label" id="smart-aroma-workflow-title">Diffusion control loop</p><span><i aria-hidden="true" />Adaptive output</span></div><div className="smart-aroma-workflow-track"><span className="smart-aroma-workflow-packet" aria-hidden="true"><i /></span><ol><li><span>01</span><div><b>Sense</b><em>Temp + humidity</em></div></li><li><span>02</span><div><b>Interpret</b><em>Fuzzy Logic</em></div></li><li><span>03</span><div><b>Diffuse</b><em>Adaptive output</em></div></li></ol></div><p className="smart-aroma-workflow-note">A compact visual loop of the prototype’s sensor-to-output control sequence.</p></section>;
}

export function SmartAromaWorkflowPortal({ project, loading, motionPaused }: { project: CollectionProject | null; loading: boolean; motionPaused: boolean }) {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (!project || loading || project.id !== "smart-aroma-diffuser") {
      setTarget(null);
      return;
    }
    const frame = window.requestAnimationFrame(() => setTarget(document.querySelector<HTMLDivElement>(".collection-dialog-copy .collection-detail-section:nth-of-type(2)")));
    return () => window.cancelAnimationFrame(frame);
  }, [loading, project]);
  if (!target || !project || project.id !== "smart-aroma-diffuser" || loading) return null;
  return createPortal(<SmartAromaWorkflowLoop staticMotion={motionPaused || Boolean(reduceMotion)} />, target);
}

export function ProjectCollectionDialogBase({ project, loading, onOpenChange: onProjectOpenChange, onCloseAutoFocus, motionPaused }: { project: CollectionProject | null; loading: boolean; onOpenChange: (open: boolean) => void; onCloseAutoFocus: () => void; motionPaused: boolean }) {
  const [dialogImageReady, setDialogImageReady] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(Boolean(project));
  const [isClosing, setIsClosing] = useState(false);
  const onProjectOpenChangeRef = useRef(onProjectOpenChange);
  const reduceMotion = useReducedMotion();
  const staticMotion = reduceMotion || motionPaused;
  useEffect(() => {
    onProjectOpenChangeRef.current = onProjectOpenChange;
  }, [onProjectOpenChange]);
  useEffect(() => {
    if (project) {
      setDialogOpen(true);
      setIsClosing(false);
    }
  }, [project]);
  const onOpenChange = useCallback((open: boolean) => {
    if (open) {
      setIsClosing(false);
      setDialogOpen(true);
      return;
    }
    if (staticMotion) setDialogOpen(false);
    else setIsClosing(true);
    onProjectOpenChangeRef.current(false);
  }, [staticMotion]);
  const handleBackToCollection = useCallback(() => {
    document.getElementById("project-collection")?.scrollIntoView({ behavior: staticMotion ? "auto" : "smooth", block: "start" });
    onOpenChange(false);
  }, [onOpenChange, staticMotion]);
  const Dialog = useMemo(() => ({ children }: { children: ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => <DialogRoot open={dialogOpen} onOpenChange={onOpenChange}>{children}</DialogRoot>, [dialogOpen, onOpenChange]);
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
  if (loading) return <Dialog open={Boolean(project)} onOpenChange={onOpenChange}><DialogContent className={`collection-dialog collection-dialog-loading-shell ${isClosing ? "is-closing" : ""} ${staticMotion ? "is-static" : ""} rounded-none border-white/15 bg-[#0b0912] p-0 text-[#f4f0ff] shadow-[0_28px_100px_rgba(0,0,0,.62)] sm:max-w-4xl`} showCloseButton={false} onCloseAutoFocus={(event) => { event.preventDefault(); onCloseAutoFocus(); }}><CollectionDialogAperture staticMotion={staticMotion} /><DialogTitle className="sr-only">Loading {project.title}</DialogTitle><DialogDescription className="sr-only">Preparing project collection details.</DialogDescription><div className="collection-dialog-loader" role="status" aria-live="polite"><img className={`collection-dialog-loader-image ${dialogImageReady ? "is-ready" : ""}`} src={project.image} alt="" aria-hidden="true" fetchPriority="high" decoding="async" /><div className="collection-dialog-loader-orbit"><Spinner className="size-7 text-violet-200" /></div><p className="label text-violet-200">Aligning project signal</p><span>Preparing {project.title}</span><div className="collection-loader-progress" aria-hidden="true"><i /></div></div><button type="button" className="credential-preview-close collection-dialog-loader-close" onClick={() => onOpenChange(false)} aria-label="Close project collection details"><X size={16} /></button></DialogContent></Dialog>;
  return <Dialog open={Boolean(project)} onOpenChange={onOpenChange}><DialogContent className={`collection-dialog ${isClosing ? "is-closing" : ""} ${staticMotion ? "is-static" : ""} max-h-[min(48rem,calc(100svh-2rem))] overflow-y-auto rounded-none border-white/15 bg-[#0b0912] p-0 text-[#f4f0ff] shadow-[0_28px_100px_rgba(0,0,0,.62)] sm:max-w-4xl`} showCloseButton={false} onCloseAutoFocus={(event) => { event.preventDefault(); onCloseAutoFocus(); }}><div className="collection-dialog-shell"><div className={`collection-dialog-visual ${dialogImageReady ? "is-image-ready" : ""}`} aria-hidden="true"><img src={project.image} alt="" fetchPriority="high" decoding="async" onLoad={() => setDialogImageReady(true)} onError={() => setDialogImageReady(true)} /><span>Collection / {String(projectCollection.findIndex((entry) => entry.id === project.id) + 1).padStart(2, "0")}</span></div><div className="collection-dialog-copy"><div className="flex items-start justify-between gap-5"><div><nav className="collection-dialog-breadcrumb" aria-label="Project Collection breadcrumb"><button type="button" onClick={handleBackToCollection} aria-label="Close project details and return to Project Collection"><ChevronLeft size={13} aria-hidden="true" /><span>Back to collection</span></button></nav><p className="label text-violet-200">Project collection</p><DialogTitle className="display mt-4 max-w-[18ch] text-3xl leading-[.94] text-white sm:text-5xl">{project.title}</DialogTitle></div><button type="button" className="credential-preview-close shrink-0" onClick={() => onOpenChange(false)} aria-label="Close project collection details"><X size={16} /></button></div><DialogDescription className="mt-5 max-w-3xl text-sm leading-6 text-[#d3cbdf]">{project.tagline}</DialogDescription><p className="mt-5 text-sm leading-6 text-[#bcb4ca]">{project.description}</p><dl className="collection-dialog-summary"><div><dt>Category</dt><dd>{project.category}</dd></div><div><dt>Status</dt><dd>{project.status}</dd></div><div><dt>{"role" in project ? "Role" : "Context"}</dt><dd>{"role" in project ? project.role : "context" in project ? project.context : "Project collection"}</dd></div></dl><section className="collection-detail-section"><p className="label">Problem solved</p><p>{project.problem}</p></section><section className="collection-detail-section"><p className="label">Main features</p><ul>{project.features.map((feature) => <li key={feature}><CircleCheckBig size={14} aria-hidden="true" /><span>{feature}</span></li>)}</ul></section><section className="collection-detail-section"><p className="label">Technologies & skills</p><div className="collection-tech-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></section>{"results" in project ? <section className="collection-detail-section"><p className="label">Important results</p><ul>{project.results.map((result) => <li key={result}><span className="ai-studio-bullet" aria-hidden="true" /><span>{result}</span></li>)}</ul></section> : null}<section className="collection-detail-section"><p className="label">Tags</p><div className="collection-tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section>{"liveUrl" in project ? <a className="collection-live-demo" href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} /></a> : null}<p className="collection-security-note"><span className="signal-dot" aria-hidden="true" />This collection entry does not expose source code or repository links.</p></div></div></DialogContent></Dialog>;
}

export function CollectionDialogNavigator({ project, loading }: { project: CollectionProject | null; loading: boolean }) {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!project || loading) {
      setTarget(null);
      return;
    }
    const frame = window.requestAnimationFrame(() => setTarget(document.querySelector<HTMLDivElement>(".collection-dialog-copy > .flex")));
    return () => window.cancelAnimationFrame(frame);
  }, [loading, project]);

  if (!project || !target) return null;
  const projectIndex = projectCollection.findIndex((entry) => entry.id === project.id);
  const previousProject = projectCollection[projectIndex - 1];
  const nextProject = projectCollection[projectIndex + 1];
  const navigateTo = (index: number) => document.querySelector<HTMLButtonElement>(`.collection-card-${index + 1}`)?.click();

  return createPortal(
    <nav className="collection-dialog-nav" aria-label="Project Collection navigation">
      <button type="button" onClick={() => navigateTo(projectIndex - 1)} disabled={!previousProject} aria-label={previousProject ? `Previous project: ${previousProject.title}` : "No previous project"}>
        <ChevronLeft size={15} aria-hidden="true" />
        <span>Previous</span>
      </button>
      <p aria-live="polite"><span>Project</span> {String(projectIndex + 1).padStart(2, "0")} <i>/</i> {String(projectCollection.length).padStart(2, "0")}</p>
      <button type="button" onClick={() => navigateTo(projectIndex + 1)} disabled={!nextProject} aria-label={nextProject ? `Next project: ${nextProject.title}` : "No next project"}>
        <span>Next</span>
        <ChevronRight size={15} aria-hidden="true" />
      </button>
    </nav>,
    target,
  );
}

export function ProjectCollectionDialog({ project, loading, onOpenChange, onCloseAutoFocus, motionPaused }: { project: CollectionProject | null; loading: boolean; onOpenChange: (open: boolean) => void; onCloseAutoFocus: () => void; motionPaused: boolean }) {
  return <><ProjectCollectionDialogBase project={project} loading={loading} onOpenChange={onOpenChange} onCloseAutoFocus={onCloseAutoFocus} motionPaused={motionPaused} /><CollectionDialogNavigator project={project} loading={loading} /><SmartAromaWorkflowPortal project={project} loading={loading} motionPaused={motionPaused} /></>;
}
