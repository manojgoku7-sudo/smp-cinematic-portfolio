/**
 * Obsidian Studio page — an asymmetric editorial reel with ultraviolet signals and purposeful micro-motion.
 * Hero portrait rule: the freestanding glasses-wearing Memoji remains compact, transparent, and cursor-responsive only on fine-pointer desktop devices.
 */
import { FocusEvent, FormEvent, MouseEvent, PointerEvent as ReactPointerEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { Dialog, Dialog as DialogRoot, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { RevealMetric } from "@/components/RevealMetric";
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
import { navItems, skills, experience, experienceSignals, certifications, reelItems, professionalRoles, orbitProjects, OrbitProjectId, projectSkillGravity, skillGravityVectors, recruiterReviewSteps, CaseStudyId, projectCollection, CollectionProject, getConnectionPrefetchProfile, InteractionPoint, skillProficiency, scrollToSection, downloadResume, releaseSignalButtonMagnet } from "../portfolio-data";
import { Reveal, SectionIntro, CaseSignalReveal, DeliveryWalkthrough, PolurCharmWalkthrough, PolurTripPlannerMicroFlow, DeliveryDeviceRelay, DeliveryInteractionLoop, AttackModelWalkthrough, AutomationStudioWalkthrough, ProjectProofMarker, ProjectSignalFocus, BlueprintCrosshair, LensAperture, TimelineCheckpoint, ExperienceEvidenceSignal, ExperienceConnectionMap, CredentialSignalScan, AIContentStudioDialog, PolurCharmDialog, ProjectCollectionDialog } from "../portfolio-sections";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
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
  const [aiContentStudioOpen, setAiContentStudioOpen] = useState(false);
  const [polurCharmOpen, setPolurCharmOpen] = useState(false);
  const [activeCollectionProject, setActiveCollectionProject] = useState<CollectionProject | null>(null);
  const [collectionDialogLoading, setCollectionDialogLoading] = useState(false);
  const [collectionFocus, setCollectionFocus] = useState<number | null>(null);
  const [collectionOpeningIndex, setCollectionOpeningIndex] = useState<number | null>(null);
  const [mobileCollectionSnap, setMobileCollectionSnap] = useState(0);
  const [gravityProject, setGravityProject] = useState<OrbitProjectId | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroMemojiRef = useRef<HTMLDivElement>(null);
  const heroMemojiTapReleaseTimer = useRef<number | null>(null);
  const heroMemojiSmileTimer = useRef<number | null>(null);
  const heroMemojiTouchStart = useRef<{ x: number; y: number } | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const projectFinderRef = useRef<HTMLSpanElement>(null);
  const lastConstellationPoint = useRef({ x: -100, y: -100, time: 0 });
  const lastContactConstellationPoint = useRef({ x: -100, y: -100, time: 0 });
  const lastActiveSection = useRef(active);
  const experiencePointerActive = useRef(false);
  const magneticEnabledRef = useRef(true);

  // A hovered or focused role row pins the map; scroll-follow stands down until released.
  const pinExperienceRow = (index: number) => {
    experiencePointerActive.current = true;
    setActiveExperience(index);
  };
  const releaseExperienceRow = () => {
    experiencePointerActive.current = false;
  };
  const collectionPrefetches = useRef(new Map<string, HTMLImageElement>());
  const collectionDialogTriggerIndex = useRef<number | null>(null);
  const collectionOpeningTimer = useRef<number | null>(null);
  const mobileCollectionScrollLeft = useRef(0);
  const mobileCollectionTouchStart = useRef<{ x: number; y: number; time: number; index: number; triggered: boolean } | null>(null);
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

  // Keyboard dismissal for modeless layers. Radix dialogs already trap and
  // close on Escape natively; these three overlays are hand-rolled instead.
  // Priority: recruiter review > recruiter quick-view > mobile menu.
  useEffect(() => {
    if (!mobileOpen && !recruiterOpen && !recruiterReviewOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (recruiterReviewOpen) {
        setRecruiterReviewOpen(false);
      } else if (recruiterOpen) {
        setRecruiterOpen(false);
        // The hero holds the only opener — return focus so keyboard users
        // are not stranded where the card used to be.
        document.querySelector<HTMLButtonElement>(".recruiter-hero-trigger")?.focus();
      } else if (mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, recruiterOpen, recruiterReviewOpen]);

  useEffect(() => {
    if (!activeCollectionProject || reduceMotion || motionPaused) {
      setCollectionDialogLoading(false);
      return;
    }
    const timer = window.setTimeout(() => setCollectionDialogLoading(false), 260);
    return () => window.clearTimeout(timer);
  }, [activeCollectionProject, motionPaused, reduceMotion]);

  useEffect(() => () => {
    if (collectionOpeningTimer.current !== null) window.clearTimeout(collectionOpeningTimer.current);
  }, []);

  const openCollectionProject = (project: CollectionProject, index: number) => {
    collectionDialogTriggerIndex.current = index + 1;
    setCollectionFocus(index);
    if (collectionOpeningTimer.current !== null) window.clearTimeout(collectionOpeningTimer.current);
    if (reduceMotion || motionPaused || lowDataMode) {
      setCollectionOpeningIndex(null);
    } else {
      setCollectionOpeningIndex(index);
      collectionOpeningTimer.current = window.setTimeout(() => setCollectionOpeningIndex(null), 520);
    }
    setCollectionDialogLoading(!reduceMotion && !motionPaused);
    setActiveCollectionProject(project);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const activeIndex = activeCollectionProject
      ? projectCollection.findIndex((project) => project.id === activeCollectionProject.id)
      : collectionFocus;
    if (lowDataMode || activeIndex === null || activeIndex < 0) return;
    const nextIndex = activeIndex + 1;
    if (nextIndex < 0 || nextIndex >= projectCollection.length) return;
    const prefetchTimer = window.setTimeout(() => prefetchCollectionArtwork(nextIndex), 90);
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

  useEffect(() => () => {
    if (heroMemojiTapReleaseTimer.current !== null) window.clearTimeout(heroMemojiTapReleaseTimer.current);
    if (heroMemojiSmileTimer.current !== null) window.clearTimeout(heroMemojiSmileTimer.current);
  }, []);

  useEffect(() => {
    if (motionPaused || reduceMotion || lowDataMode) return;
    const cycle = window.setInterval(() => setRoleIndex((current) => (current + 1) % professionalRoles.length), 3100);
    return () => window.clearInterval(cycle);
  }, [motionPaused, reduceMotion, lowDataMode]);

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 24;
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maximum > 0 ? Math.min(100, Math.max(0, (window.scrollY / maximum) * 100)) : 0;
      setScrolled((current) => current === nextScrolled ? current : nextScrolled);
      setScrollProgress((current) => Math.abs(current - nextProgress) < .25 ? current : nextProgress);
    };
    const onPointer = (event: PointerEvent) => {
      const cursor = cursorRef.current;
      if (cursor) cursor.style.transform = `translate3d(${event.clientX - 5}px, ${event.clientY - 5}px, 0)`;
    };
    const onEnter = () => cursorRef.current?.classList.add("is-active");
    const onLeave = () => cursorRef.current?.classList.remove("is-active");
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
    // Experience scroll-spy: keep the skills map aligned to the role nearest the reading band,
    // so the role map also follows on touch devices where hover/focus is unavailable.
    const experienceRows = Array.from(document.querySelectorAll<HTMLElement>("#experience .timeline-row"));
    const experienceVisibility = experienceRows.map(() => 0);
    const experienceObserver = new IntersectionObserver(
      (entries) => {
        if (experiencePointerActive.current) return; // Hover/focus owns the highlight.
        for (const entry of entries) {
          const index = experienceRows.indexOf(entry.target as HTMLElement);
          if (index >= 0) experienceVisibility[index] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }
        let bestIndex = -1;
        let bestRatio = 0;
        experienceVisibility.forEach((ratio, index) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        });
        if (bestIndex >= 0) setActiveExperience(bestIndex);
      },
      { rootMargin: "-34% 0px -46% 0px", threshold: [0.08, 0.18, 0.3, 0.45] },
    );
    experienceRows.forEach((row) => experienceObserver.observe(row));
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
      interactive.forEach((element) => {
        element.removeEventListener("pointerenter", onEnter);
        element.removeEventListener("pointerleave", onLeave);
      });
      observer.disconnect();
      experienceObserver.disconnect();
    };
  }, []);

  // Keep the magnetic-pull guard in sync with the accessibility switches, and
  // release any active pull the moment motion is paused or data mode drops.
  useEffect(() => {
    const enabled = !(Boolean(reduceMotion) || motionPaused || lowDataMode);
    magneticEnabledRef.current = enabled;
    if (!enabled) {
      document.querySelectorAll<HTMLElement>(".signal-button.is-magnetized").forEach(releaseSignalButtonMagnet);
    }
  });

  // Magnetic pull on signal buttons: a soft follow-light that nudges the button
  // toward the cursor while it is inside, then springs back on release.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer()) return;
    let current: HTMLElement | null = null;

    const releaseCurrent = () => {
      if (current) {
        releaseSignalButtonMagnet(current);
        current = null;
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !magneticEnabledRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const button = (event.target as Element | null)?.closest?.<HTMLElement>(".signal-button") ?? null;
      if (button) {
        const rect = button.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const pullX = Math.sign(dx) * Math.min(Math.abs(dx) * 0.28, rect.width * 0.09 + 6);
        const pullY = Math.sign(dy) * Math.min(Math.abs(dy) * 0.28, rect.height * 0.16 + 5);
        if (current && current !== button) releaseSignalButtonMagnet(current);
        current = button;
        button.classList.add("is-magnetized");
        button.style.setProperty("--magnet-x", `${pullX.toFixed(2)}px`);
        button.style.setProperty("--magnet-y", `${pullY.toFixed(2)}px`);
      } else {
        releaseCurrent();
      }
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!current) return;
      const related = event.relatedTarget as Node | null;
      if (related && current.contains(related)) return; // Still inside the button.
      releaseCurrent();
    };
    const onLeaveWindow = () => releaseCurrent();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("pointerleave", onLeaveWindow, { passive: true });
    window.addEventListener("blur", onLeaveWindow);
    window.addEventListener("pointercancel", onLeaveWindow);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("pointerleave", onLeaveWindow);
      window.removeEventListener("blur", onLeaveWindow);
      window.removeEventListener("pointercancel", onLeaveWindow);
      releaseCurrent();
    };
  }, []);

  // Experience reading beam: fills the role timeline as the reading band scrolls down it.
  useEffect(() => {
    const updateTimelineBeam = () => {
      const list = document.querySelector<HTMLElement>("#experience .timeline-list");
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const readingLine = window.innerHeight * 0.44;
      const progress = rect.height > 0 ? Math.min(1, Math.max(0, (readingLine - rect.top) / rect.height)) : 0;
      list.style.setProperty("--timeline-progress", progress.toFixed(4));
    };
    updateTimelineBeam();
    window.addEventListener("scroll", updateTimelineBeam, { passive: true });
    window.addEventListener("resize", updateTimelineBeam);
    return () => {
      window.removeEventListener("scroll", updateTimelineBeam);
      window.removeEventListener("resize", updateTimelineBeam);
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
    if (reduceMotion || motionPaused || lowDataMode) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -3.5}deg) rotateY(${x * 3.5}deg) translateY(-5px)`;
    // Pointer light on the artwork: paint-free CSS variables consumed by the scrim overlay.
    card.style.setProperty("--card-light-x", `${((x + 0.5) * 100).toFixed(2)}%`);
    card.style.setProperty("--card-light-y", `${((y + 0.5) * 100).toFixed(2)}%`);
  }

  function resetProjectTilt(event: MouseEvent<HTMLElement>) {
    const card = event.currentTarget;
    card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
    card.style.removeProperty("--card-light-x");
    card.style.removeProperty("--card-light-y");
  }

  // Capability tile glow: a soft ultraviolet follow-light beneath the tile content.
  function handleCapabilityGlow(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || motionPaused || lowDataMode || event.pointerType !== "mouse") return;
    const tile = event.currentTarget;
    const rect = tile.getBoundingClientRect();
    tile.style.setProperty("--cell-glow-x", `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(2)}%`);
    tile.style.setProperty("--cell-glow-y", `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(2)}%`);
  }

  function clearCapabilityGlow(event: ReactPointerEvent<HTMLElement>) {
    const tile = event.currentTarget;
    tile.style.removeProperty("--cell-glow-x");
    tile.style.removeProperty("--cell-glow-y");
  }

  // Hero Memoji gaze: the is-gazing class drives the visible hover treatment
  // (backdrop swell, portrait scale, ground shadow) via interaction-fluidity.css.
  // Actual pupil tracking is owned solely by the inline script in index.html,
  // which positions .mouse-pupil-tracker nodes over the fixed portrait.
  function followHeroMemojiGaze(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduceMotion || motionPaused || lowDataMode || event.pointerType !== "mouse" || window.innerWidth < 768) return;
    heroMemojiRef.current?.classList.add("is-gazing");
  }

  function resetHeroMemojiGaze() {
    heroMemojiRef.current?.classList.remove("is-gazing");
  }

  function noteHeroMemojiTouchStart(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch" || window.innerWidth >= 768) return;
    heroMemojiTouchStart.current = { x: event.clientX, y: event.clientY };
  }

  function triggerMobileMemojiBlink(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduceMotion || motionPaused || lowDataMode || event.pointerType !== "touch" || window.innerWidth >= 768) return;
    const touchStart = heroMemojiTouchStart.current;
    heroMemojiTouchStart.current = null;
    if (!touchStart || Math.hypot(event.clientX - touchStart.x, event.clientY - touchStart.y) > 12) return;
    const portrait = heroMemojiRef.current;
    if (!portrait || portrait.classList.contains("is-mobile-blinking")) return;
    portrait.classList.add("is-mobile-blinking");
    if (heroMemojiTapReleaseTimer.current !== null) window.clearTimeout(heroMemojiTapReleaseTimer.current);
    heroMemojiTapReleaseTimer.current = window.setTimeout(() => {
      portrait.classList.remove("is-mobile-blinking");
      heroMemojiTapReleaseTimer.current = null;
    }, 460);
  }

  function triggerHeroMemojiSmile(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduceMotion || motionPaused || lowDataMode || (event.pointerType !== "mouse" && event.pointerType !== "touch")) return;
    const portrait = heroMemojiRef.current;
    if (!portrait) return;
    portrait.classList.add("is-smiling");
    if (heroMemojiSmileTimer.current !== null) window.clearTimeout(heroMemojiSmileTimer.current);
    heroMemojiSmileTimer.current = window.setTimeout(() => {
      portrait.classList.remove("is-smiling");
      heroMemojiSmileTimer.current = null;
    }, 780);
  }

  function handleHeroMemojiPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    triggerMobileMemojiBlink(event);
    triggerHeroMemojiSmile(event);
  }

  // Obsidian Studio collection parallax: update image-only depth variables without React state so pointer movement cannot disturb dialogs.
  function handleCollectionArtworkParallax(event: ReactPointerEvent<HTMLButtonElement>) {
    if (reduceMotion || motionPaused || lowDataMode || event.pointerType !== "mouse" || window.innerWidth < 1024) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
    const depth = Math.min(1, Math.hypot(x, y) / Math.SQRT2);
    card.classList.add("is-artwork-parallax");
    card.style.setProperty("--collection-art-parallax-x", `${(x * 6.25).toFixed(2)}px`);
    card.style.setProperty("--collection-art-parallax-y", `${(y * 4.25).toFixed(2)}px`);
    card.style.setProperty("--collection-art-parallax-rotate-x", `${(y * -1.35).toFixed(2)}deg`);
    card.style.setProperty("--collection-art-parallax-rotate-y", `${(x * 1.6).toFixed(2)}deg`);
    card.style.setProperty("--collection-art-parallax-scale", `${(1.078 + depth * .022).toFixed(3)}`);
    card.style.setProperty("--collection-edge-refraction-x", `${((x + 1) * 50).toFixed(1)}%`);
    card.style.setProperty("--collection-edge-refraction-y", `${((y + 1) * 50).toFixed(1)}%`);
  }

  function resetCollectionArtworkParallax(event: React.SyntheticEvent<HTMLButtonElement>) {
    const card = event.currentTarget;
    card.classList.remove("is-artwork-parallax");
    card.style.removeProperty("--collection-art-parallax-x");
    card.style.removeProperty("--collection-art-parallax-y");
    card.style.removeProperty("--collection-art-parallax-rotate-x");
    card.style.removeProperty("--collection-art-parallax-rotate-y");
    card.style.removeProperty("--collection-art-parallax-scale");
    card.style.removeProperty("--collection-edge-refraction-x");
    card.style.removeProperty("--collection-edge-refraction-y");
  }

  function prefetchCollectionArtwork(index: number) {
    if (lowDataMode || !getConnectionPrefetchProfile().enabled || index < 0 || index >= projectCollection.length) return;
    const project = projectCollection[index];
    if (collectionPrefetches.current.has(project.image)) return;
    const image = new Image();
    image.decoding = "async";
    image.fetchPriority = "low";
    image.src = project.image;
    collectionPrefetches.current.set(project.image, image);
    image.decode?.().catch(() => undefined);
  }

  function handleMobileCollectionTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    if (window.innerWidth >= 768) return;
    const touch = event.touches[0];
    if (!touch) return;
    mobileCollectionScrollLeft.current = event.currentTarget.scrollLeft;
    mobileCollectionTouchStart.current = { x: touch.clientX, y: touch.clientY, time: event.timeStamp, index: mobileCollectionSnap, triggered: false };
  }

  function handleMobileCollectionTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (window.innerWidth >= 768) return;
    const touchStart = mobileCollectionTouchStart.current;
    const touch = event.touches[0];
    if (!touchStart || !touch || touchStart.triggered) return;
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const elapsed = Math.max(event.timeStamp - touchStart.time, 1);
    const velocity = Math.abs(deltaX) / elapsed;
    const profile = getConnectionPrefetchProfile();
    if (!profile.enabled || Math.abs(deltaX) < profile.intentDistance || Math.abs(deltaX) < Math.abs(deltaY) * 1.25 || velocity < profile.velocityThreshold) return;
    const direction: 1 | -1 = deltaX < 0 ? 1 : -1;
    const nextIndex = touchStart.index + direction;
    touchStart.triggered = true;
    prefetchCollectionArtwork(nextIndex);
  }

  function clearMobileCollectionTouchIntent() {
    mobileCollectionTouchStart.current = null;
  }

  function handleMobileCollectionScroll(event: React.UIEvent<HTMLDivElement>) {
    if (window.innerWidth >= 768) return;
    const stage = event.currentTarget;
    const scrollDelta = stage.scrollLeft - mobileCollectionScrollLeft.current;
    mobileCollectionScrollLeft.current = stage.scrollLeft;
    const stageCenter = stage.getBoundingClientRect().left + stage.clientWidth / 2;
    const nextSnap = projectCollection.reduce((nearest, _, index) => {
      const card = stage.querySelector<HTMLElement>(`.collection-card-${index + 1}`);
      if (!card) return nearest;
      const distance = Math.abs(card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2 - stageCenter);
      return distance < nearest.distance ? { index, distance } : nearest;
    }, { index: mobileCollectionSnap, distance: Number.POSITIVE_INFINITY }).index;
    setMobileCollectionSnap((current) => current === nextSnap ? current : nextSnap);
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
    if (reduceMotion || motionPaused || lowDataMode || event.pointerType !== "mouse" || window.innerWidth < 768) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const finder = projectFinderRef.current;
    if (!finder) return;
    finder.style.left = `${((event.clientX - bounds.left) / bounds.width) * 100}%`;
    finder.style.top = `${((event.clientY - bounds.top) / bounds.height) * 100}%`;
    finder.classList.add("is-active");
  }

  function resetProjectFinder() {
    projectFinderRef.current?.classList.remove("is-active");
  }

  function extendConstellation(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || motionPaused || lowDataMode || event.pointerType !== "mouse") return;
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
    if (reduceMotion || motionPaused || lowDataMode || event.pointerType !== "mouse") return;
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
    <>
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <main id="main-content" className={`page-shell ${motionPaused ? "motion-paused" : ""} ${lowDataMode ? "low-data" : ""} ${lightPreset ? "contrast-light" : ""} ${recruiterReviewOpen ? "recruiter-review-active" : ""}`}>
      <AnimatePresence>{introVisible && !reduceMotion && !lowDataMode ? <motion.div className="entry-loader" role="status" aria-label="Loading S Manoj Prabhu portfolio" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}><div className="entry-loader-content"><span className="entry-loader-seal"><img src="/images/smp-mj-monogram-clear-j_24fbf37a.webp" alt="" /></span><span className="entry-loader-signal" /><span className="label text-violet-100">SMP / initializing field reel</span></div></motion.div> : null}</AnimatePresence>
      {!reduceMotion && <div ref={cursorRef} className="cursor" aria-hidden="true" />}
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress-rail" aria-hidden="true"><span className="scroll-progress-label">Field progress</span><span className="scroll-progress-track"><span className="scroll-progress-fill" style={{ height: `${scrollProgress}%` }} /></span><span className="scroll-progress-value">{String(Math.round(scrollProgress)).padStart(2, "0")}</span></div>
      <header className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container flex h-[5rem] items-center justify-between">
          <div className="flex items-center gap-5">
            <button className="monogram-trigger flex items-center gap-3 text-left" onClick={() => { triggerMonogramRipple(); scrollToSection("top"); }} aria-label="Go to the top and reveal the MJ monogram" aria-describedby="mj-brand-tooltip">
              <span className={`seal-wrap ${monogramRipple ? "is-rippling" : ""}`} style={{ opacity: sealScrollOpacity }}><span className="monogram-halo" aria-hidden="true" style={{ transform: `rotate(${sealOrbitScrollOffset}deg)` }}><i className="monogram-halo-sweep" /><i key={`section-glint-${monogramSectionGlint || "idle"}`} className={`monogram-section-glint ${monogramSectionGlint ? "is-active" : ""}`} /><i key={`project-echo-${monogramProjectEcho || "idle"}`} className={`monogram-project-echo ${monogramProjectEcho ? `is-active ${openCaseSignal === "attack-study" || openCaseSignal === "polur-charm" ? "is-cyan" : "is-violet"}` : ""}`} /><span className={`monogram-selector-preview ${activeOrbitPreview ? `is-active ${activeOrbitPreview === "attack-study" || activeOrbitPreview === "polur-charm" ? "is-cyan" : "is-violet"}` : ""}`}><i className="monogram-selector-preview-cyan" /><i className="monogram-selector-preview-violet" /></span><b className="monogram-orbit-spark" /></span><span className="monogram-click-ripple" aria-hidden="true" /><img src="/images/smp-mj-monogram-clear-j_24fbf37a.webp" alt="MJ monogram" /></span>
              <span className="display text-[0.88rem] font-semibold tracking-[-0.04em] text-white">S MANOJ<br />PRABHU</span>
              <span id="mj-brand-tooltip" className="monogram-brand-tooltip" role="tooltip">MJ / Event horizon</span>
            </button>
            <span className="monogram-nav-divider hidden lg:block" aria-hidden="true" style={{ opacity: sealScrollOpacity, transform: `rotate(${dividerScrollRotation}deg)` }} />
          </div>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} className={`nav-link ${active === id ? "is-active" : ""}`} aria-current={active === id ? "true" : undefined} onClick={(event) => { event.preventDefault(); scrollToSection(id); window.history.pushState(null, "", `#${id}`); }}>{label}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex"><button className="contrast-toggle" type="button" onClick={() => setLightPreset((enabled) => !enabled)} aria-pressed={lightPreset}>{lightPreset ? <Moon size={14} /> : <Sun size={14} />}{lightPreset ? "Dark" : "Light"}</button><button className="recruiter-trigger" type="button" onClick={startRecruiterReview}>Recruiter path</button><a href="mailto:manojprabhu0707@gmail.com" className="signal-button min-h-0 px-4 py-2.5">Open correspondence <ArrowUpRight size={14} /></a></div>
          <button className="icon-button md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="mobile-nav">{mobileOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
        {mobileOpen ? (
          <div id="mobile-nav" className="border-t border-violet-200/10 bg-[#0b0a12]/95 px-5 py-6 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
              {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="display text-left text-2xl text-white" onClick={(event) => { event.preventDefault(); setMobileOpen(false); scrollToSection(id); window.history.pushState(null, "", `#${id}`); }}>{label}</a>)}
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
            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 38 }} animate={reduceMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.78, delay: 0.14, ease: [0.23, 1, 0.32, 1] }} className={`hero-name ${nameHaptic ? "is-haptic" : ""} display max-w-[10ch] text-[clamp(4.1rem,9vw,8.2rem)] font-semibold leading-[0.81] text-white`} aria-label="S Manoj Prabhu">
              <span className="name-line name-manoj" data-text="S MANOJ">S MANOJ</span><span className="name-line name-prabhu" data-text="PRABHU">PRABHU</span><span className="name-ripple-field" aria-hidden="true">{nameRipples.map((ripple) => <i key={ripple.id} className="name-ripple" style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }} />)}</span><span className="name-spark-field" aria-hidden="true">{[
                { left: "8%", top: "22%", dx: "34px", dy: "-10px", tilt: "-28deg", delay: "-1.1s" },
                { left: "56%", top: "14%", dx: "22px", dy: "14px", tilt: "36deg", delay: "-3.2s" },
                { left: "82%", top: "63%", dx: "-28px", dy: "-12px", tilt: "-48deg", delay: "-4.7s" },
                { left: "27%", top: "76%", dx: "42px", dy: "-8px", tilt: "12deg", delay: "-5.8s" },
              ].map((spark, index) => <i key={index} className="name-spark" style={{ "--spark-left": spark.left, "--spark-top": spark.top, "--spark-dx": spark.dx, "--spark-dy": spark.dy, "--spark-tilt": spark.tilt, "--spark-delay": spark.delay } as React.CSSProperties} />)}</span>
            </motion.h1>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.64, delay: 0.28, ease: [0.23, 1, 0.32, 1] }} className="mt-8 max-w-lg">
              <p className="hero-role-cycle" aria-live="off"><span className="hero-role-label">Now operating as</span><span className="sr-only">Roles: {professionalRoles.join(", ")}.</span><AnimatePresence mode="wait" initial={false}><motion.span key={professionalRoles[roleIndex]} className="hero-role-value" initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }} animate={reduceMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }} exit={reduceMotion ? {} : { opacity: 0, y: -7, filter: "blur(3px)" }} transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}>{professionalRoles[roleIndex]}</motion.span></AnimatePresence></p>
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
          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 24 }} animate={reduceMotion ? {} : { opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.95, delay: 0.18, ease: [0.23, 1, 0.32, 1] }} className="hero-visual">
            <div ref={heroMemojiRef} className="hero-memoji-portrait" onPointerMove={followHeroMemojiGaze} onPointerLeave={resetHeroMemojiGaze} onPointerDown={noteHeroMemojiTouchStart} onPointerUp={handleHeroMemojiPointerUp}>
              <span className="hero-memoji-ground-shadow" aria-hidden="true" />
              <span className="hero-memoji-backdrop" aria-hidden="true" />
              <img className="hero-memoji-reference-scene" src="/images/manoj-hero-transparent-memoji-glasses-a_0af8bf1f.webp" alt="Stylized light-skinned developer Memoji with glasses peeking over a light-gray laptop" />
            </div>
            <span className="hero-memoji-greeting" aria-hidden="true">Hi, I’m Manoj</span>
          </motion.div>
        </div>
      </section>

      <div className="reel" aria-label="Selected capabilities">
        <div className="reel-track">
          {[...reelItems, ...reelItems, ...reelItems].map((item, index) => <div className="reel-item" key={`${item}-${index}`}><span className="signal-dot scale-[0.62]" />{item}</div>)}
        </div>
      </div>

      <AnimatePresence>{recruiterOpen ? <motion.aside className="recruiter-brief-card" role="dialog" aria-label="Recruiter quick-view" initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.97 }} transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}><div className="recruiter-brief-head"><div><p className="label">Recruiter quick-view</p><p className="mt-1 text-sm font-semibold text-white">S Manoj Prabhu</p></div><button className="recruiter-close" type="button" autoFocus onClick={() => { setRecruiterOpen(false); document.querySelector<HTMLButtonElement>(".recruiter-hero-trigger")?.focus(); }} aria-label="Close recruiter quick-view"><X size={17} /></button></div><div className="recruiter-availability"><span className="signal-dot" /><span>Open to internships and collaborative product work</span></div><div className="recruiter-detail-grid"><div><p className="label">Based in</p><p>Polur, Tamil Nadu</p></div><div><p className="label">Core stack</p><p>React · Figma · Java</p></div><div><p className="label">Proof</p><p>85% ML accuracy</p></div><div><p className="label">Contact</p><p>Reply within 1–2 days</p></div></div><div className="recruiter-brief-actions"><button className="signal-button primary" type="button" onClick={downloadResume}>Get résumé <Download size={14} /></button><a className="signal-button" href="mailto:manojprabhu0707@gmail.com">Email Manoj <Mail size={14} /></a></div></motion.aside> : null}</AnimatePresence>

      <AnimatePresence>{recruiterReviewOpen ? <motion.aside className="recruiter-review-panel" role="region" aria-label="Recruiter review path" initial={reduceMotion ? false : { opacity: 0, y: 16, scale: .98 }} animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? {} : { opacity: 0, y: 12, scale: .98 }} transition={{ duration: .24, ease: [0.23, 1, 0.32, 1] }}><div className="recruiter-review-head"><div><p className="label">Recruiter review path</p><p>Four signals. One concise review.</p></div><button type="button" className="recruiter-close" onClick={() => setRecruiterReviewOpen(false)} aria-label="Close recruiter review path"><X size={17} /></button></div><div className="recruiter-review-progress" aria-label={`Checkpoint ${recruiterReviewStep + 1} of ${recruiterReviewSteps.length}`}>{recruiterReviewSteps.map((step, index) => <button key={step.id} type="button" className={index === recruiterReviewStep ? "is-active" : index < recruiterReviewStep ? "is-complete" : ""} onClick={() => goToRecruiterReviewStep(index)} aria-current={index === recruiterReviewStep ? "step" : undefined}><span>{step.index}</span><em>{step.label}</em></button>)}</div><div className="recruiter-review-copy" aria-live="polite"><span className="label">{recruiterReviewSteps[recruiterReviewStep].index} / {recruiterReviewSteps[recruiterReviewStep].label}</span><p>{recruiterReviewSteps[recruiterReviewStep].note}</p></div><div className="recruiter-review-actions"><button type="button" onClick={() => goToRecruiterReviewStep(recruiterReviewStep - 1)} disabled={recruiterReviewStep === 0}>Previous</button><button type="button" className="signal-button primary" onClick={() => recruiterReviewStep === recruiterReviewSteps.length - 1 ? setRecruiterReviewOpen(false) : goToRecruiterReviewStep(recruiterReviewStep + 1)}>{recruiterReviewStep === recruiterReviewSteps.length - 1 ? "Complete review" : "Next signal"} <ArrowDownRight size={14} /></button></div></motion.aside> : null}</AnimatePresence>

      <section id="about" className="editorial-band container py-28 md:py-40">
        {/* Obsidian Studio About visual: restore the original black-hole reel as a quiet right-side signal, with the copy kept in the foreground. */}
        <div className="about-blackhole-video" aria-hidden="true"><video ref={heroVideoRef} className="about-blackhole-video-media" autoPlay={!reduceMotion && !motionPaused && !lowDataMode} loop muted playsInline preload="metadata" poster="/images/smp-hero-orbit_86f3fd46.webp"><source src="/videos/smp-anime-black-hole_fe55ef2a.mp4" type="video/mp4" /></video><span className="about-blackhole-video-vignette" /></div><span className="signal-thread about-thread" aria-hidden="true" />
        <Reveal><SectionIntro index="02" eyebrow="Working at the intersection" title="Systems made visible." detail="A frontend developer and UI/UX designer with experience in Java, Spring Boot, and applied machine learning." motionPaused={motionPaused} /></Reveal>
        <div className="about-proof mt-14 grid gap-5 lg:grid-cols-[1.28fr_.72fr]">
          <Reveal delay={0.06} className="panel relative overflow-hidden p-7 md:p-10">
            <div className="absolute right-0 top-0 h-32 w-32 bg-violet-500/15 blur-3xl" />
            <p className="display max-w-[20ch] text-2xl leading-tight text-[#eeeaff] md:text-[2rem]">I create <span className="text-violet-300">clear, responsive interfaces</span> and practical user flows—from Figma design to implementation.</p>
            <div className="mt-12 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
              <RevealMetric value={20} suffix="+" label="Reusable React components" motionPaused={motionPaused} lowDataMode={lowDataMode} />
              <RevealMetric value={10} suffix="+" label="High-fidelity Figma screens" motionPaused={motionPaused} lowDataMode={lowDataMode} />
              <RevealMetric value={85} suffix="%" label="Best ML classification accuracy" motionPaused={motionPaused} lowDataMode={lowDataMode} />
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

      <section id="work" className="editorial-band top-rule bg-[#0d0b15] py-28 md:py-40" onPointerDown={createProjectPulse} onPointerMove={followProjectFinder} onPointerLeave={resetProjectFinder}>
        <div className="project-atmosphere" aria-hidden="true"><img className="project-seal-ghost" src="/images/smp-mj-monogram-clear-j_24fbf37a.webp" alt="" /><span className="project-signal-wave" />{projectPulses.map((pulse) => <span key={pulse.id} className="project-pulse" style={{ left: `${pulse.x}%`, top: `${pulse.y}%` }} />)}<span ref={projectFinderRef} className="project-orbital-finder"><i /><i /></span></div>
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
            <Reveal delay={0.06}><article id="attack-study" className={`project-card panel ${gravityProject === "attack-study" ? "is-gravity-source" : ""}`} aria-label="Prediction of Perpetration Attack case study." onMouseMove={handleProjectTilt} onMouseEnter={() => setGravityProject("attack-study")} onFocus={() => setGravityProject("attack-study")} onClick={() => setGravityProject("attack-study")} onMouseLeave={resetProjectTilt}>
              <img className="project-art" src="/images/smp-project-security_4a7c2847.webp" alt="Abstract diagnostic network visual for cybersecurity machine learning project" />
              <div className="project-scrim" /><span className="project-signal">classified study</span><span className="project-index">01 / 04</span><ProjectSignalFocus tone="cyan" motionPaused={motionPaused} /><LensAperture motionPaused={motionPaused} />
              <div className="project-caption"><div className="project-caption-head"><span className="label text-[0.5rem] text-violet-100">Case signal</span><span className="project-metric">85% accuracy</span></div><p>Four-model classifier for attack-pattern detection.</p></div>
              <div className="relative z-10 flex min-h-[480px] flex-col justify-end p-7 md:p-9"><p className="project-meta label text-violet-200">Machine learning · 01/2024—04/2024</p><h3 className="display mt-3 max-w-[11ch] text-4xl leading-[0.95] text-white md:text-5xl">Prediction of Perpetration Attack</h3><p className="mt-5 max-w-[44ch] text-sm leading-6 text-[#cec6da]">Built and evaluated four Python / Scikit-learn models — XGBoost, SVM, Logistic Regression, and Gradient Boosting — reaching <strong className="font-semibold text-white">85% classification accuracy</strong> on a cybersecurity dataset.</p><ProjectProofMarker value="85" suffix="%" ringValue={85} label="Best accuracy" detail="XGBoost selected after four-model evaluation" tone="cyan" motionPaused={motionPaused} /><AttackModelWalkthrough motionPaused={motionPaused} lowDataMode={lowDataMode} /><CaseSignalReveal id="attack-study" open={openCaseSignal === "attack-study"} onToggle={() => setOpenCaseSignal((current) => current === "attack-study" ? null : "attack-study")} motionPaused={motionPaused} /><div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5"><span className="label text-[0.57rem] text-white/65">Python · Scikit-learn · Model evaluation</span><a className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-violet-200 hover:text-white" href="https://github.com/manojprabhu07/Research-Papers-Final-Year-Project" target="_blank" rel="noreferrer">Open repository <ArrowUpRight size={15} /></a></div></div>
            </article></Reveal>
            <Reveal delay={0.13}><article id="delivery-study" className={`project-card panel ${gravityProject === "delivery-study" ? "is-gravity-source" : ""}`} aria-label="Food Delivery Mobile App case study." onMouseMove={handleProjectTilt} onMouseEnter={() => setGravityProject("delivery-study")} onFocus={() => setGravityProject("delivery-study")} onClick={() => setGravityProject("delivery-study")} onMouseLeave={resetProjectTilt}>
              <img className="project-art" src="/images/smp-project-food_c1b44933.webp" alt="Abstract layered mobile interface visual for food delivery design project" />
              <div className="project-scrim" /><span className="project-signal">interaction study</span><span className="project-index">02 / 04</span><ProjectSignalFocus tone="violet" motionPaused={motionPaused} /><BlueprintCrosshair motionPaused={motionPaused} />
              <div className="project-caption"><div className="project-caption-head"><span className="label text-[0.5rem] text-violet-100">Case signal</span><span className="project-metric">15+ screens</span></div><p>Task-first flow from discovery through delivery.</p></div>
              <div className="relative z-10 flex min-h-[480px] flex-col justify-end p-7 md:p-9"><p className="project-meta label text-violet-200">UI / UX design · 06/2023—08/2023</p><h3 className="display mt-3 max-w-[11ch] text-4xl leading-[0.95] text-white md:text-5xl">Food Delivery Mobile App</h3><p className="mt-5 max-w-[44ch] text-sm leading-6 text-[#cec6da]">Designed <strong className="font-semibold text-white">15+ production-ready screens</strong>, covering onboarding, discovery, cart, and order tracking, guided by Material Design and refined across two usability review cycles.</p><ProjectProofMarker value="15+" ringValue={100} label="Screens mapped" detail="Two usability review cycles across the mobile flow" motionPaused={motionPaused} /><DeliveryWalkthrough motionPaused={motionPaused} lowDataMode={lowDataMode} /><DeliveryInteractionLoop motionPaused={motionPaused} lowDataMode={lowDataMode} /><DeliveryDeviceRelay motionPaused={motionPaused} lowDataMode={lowDataMode} /><CaseSignalReveal id="delivery-study" open={openCaseSignal === "delivery-study"} onToggle={() => setOpenCaseSignal((current) => current === "delivery-study" ? null : "delivery-study")} motionPaused={motionPaused} /><div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5"><span className="label text-[0.57rem] text-white/65">Figma · Mobile UX · Interaction flows</span><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-violet-200">Case study available on request <ArrowUpRight size={15} /></span></div></div>
            </article></Reveal>
            <Reveal delay={0.18} className="project-sequence-third"><article id="ai-content-studio" className={`project-card ai-studio-project panel ${gravityProject === "ai-content-studio" ? "is-gravity-source" : ""}`} aria-label="YouTube Auto-Uploader and Autonomous AI Content Studio showcase." onMouseMove={handleProjectTilt} onMouseEnter={() => setGravityProject("ai-content-studio")} onFocus={() => setGravityProject("ai-content-studio")} onClick={() => setGravityProject("ai-content-studio")} onMouseLeave={resetProjectTilt}><img className="project-art" src="/images/ai-content-studio-showcase_e194be53.webp" alt="Abstract autonomous AI media studio with vertical video frames and orbital data streams" /><div className="project-scrim" /><span className="project-signal">autonomous studio</span><span className="project-index">03 / 04</span><ProjectSignalFocus tone="violet" motionPaused={motionPaused} /><div className="project-caption"><div className="project-caption-head"><span className="label text-[0.5rem] text-violet-100">Case signal</span><span className="project-metric">Auto pipeline</span></div><p>From channel monitoring through scheduled publishing.</p></div><div className="relative z-10 flex min-h-[620px] flex-col p-7 md:p-9 ai-studio-card-copy"><p className="project-meta label text-violet-200">AI & backend automation · production workflow</p><h3 className="display mt-3 max-w-[13ch] text-4xl leading-[.93] text-white md:text-5xl">YouTube Auto-Uploader & Autonomous AI Content Studio</h3><p className="mt-5 max-w-[43ch] text-sm leading-6 text-[#d1cadb]">A Python automation system for multi-channel monitoring, vertical Shorts, AI-assisted metadata, bilingual workflows, and resilient publishing operations.</p><div className="ai-studio-outcome"><span className="ai-studio-outcome-orbit" aria-hidden="true"><i /></span><div><p className="label">Outcome marker</p><b>Autonomous content pipeline</b><em>Ingestion → Shorts → metadata → scheduling</em></div></div><AutomationStudioWalkthrough motionPaused={motionPaused} lowDataMode={lowDataMode} /><button type="button" className="ai-studio-detail-trigger ai-studio-brief-action" onClick={() => setAiContentStudioOpen(true)} aria-haspopup="dialog">Open project brief <ArrowUpRight size={15} /></button></div></article></Reveal>
            <Reveal delay={0.23} className="project-sequence-fourth"><article id="polur-charm" className={`project-card polur-charm-project panel ${gravityProject === "polur-charm" ? "is-gravity-source" : ""}`} aria-label="Polur Charm tourism and civic platform case study." onMouseMove={handleProjectTilt} onMouseEnter={() => setGravityProject("polur-charm")} onFocus={() => setGravityProject("polur-charm")} onClick={() => setGravityProject("polur-charm")} onMouseLeave={resetProjectTilt}><img className="project-art" src="/images/polur-charm-portfolio-art_ee154405.webp" alt="Cinematic Parvathamalai and Polur travel-civic discovery visual" /><div className="project-scrim" /><span className="project-signal">regional discovery</span><span className="project-index">04 / 04</span><ProjectSignalFocus tone="cyan" motionPaused={motionPaused} /><div className="project-caption"><div className="project-caption-head"><span className="label text-[0.5rem] text-cyan-100">Case signal</span><span className="project-metric">24/7 discovery</span></div><p>Travel, civic essentials, and heritage exploration in one guide.</p></div><div className="relative z-10 flex min-h-[560px] flex-col justify-end p-7 md:p-9"><p className="project-meta label text-cyan-100">Web development · travel & civic tech</p><h3 className="display mt-3 max-w-[11ch] text-4xl leading-[.93] text-white md:text-5xl">Polur Charm</h3><p className="mt-5 max-w-[43ch] text-sm leading-6 text-[#d1cadb]">An interactive bilingual guide for Polur, Parvathamalai, and nearby heritage destinations—joining local discovery, transit, safety, public services, and gamified trails.</p><ProjectProofMarker value="24" suffix="/7" ringValue={100} label="Discovery access" detail="Transit, civic essentials, and heritage trails in one platform" tone="cyan" motionPaused={motionPaused} /><PolurCharmWalkthrough motionPaused={motionPaused} lowDataMode={lowDataMode} /><PolurTripPlannerMicroFlow motionPaused={motionPaused} lowDataMode={lowDataMode} /><CaseSignalReveal id="polur-charm" open={openCaseSignal === "polur-charm"} onToggle={() => setOpenCaseSignal((current) => current === "polur-charm" ? null : "polur-charm")} motionPaused={motionPaused} /><button type="button" className="ai-studio-detail-trigger mt-6" onClick={() => setPolurCharmOpen(true)} aria-haspopup="dialog">Open project brief <ArrowUpRight size={15} /></button><div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5"><span className="label text-[0.57rem] text-white/65">React 19 · TypeScript · TanStack · i18n</span><span className="flex flex-wrap gap-x-4 gap-y-2"><a className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-cyan-100 hover:text-white" href="https://polurcharm.com" target="_blank" rel="noreferrer">Visit live site <ArrowUpRight size={15} /></a><a className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-cyan-100 hover:text-white" href="https://github.com/gokuuchihatamil/polur-charm" target="_blank" rel="noreferrer">Repository <Github size={15} /></a></span></div></div></article></Reveal>
          </div>
        </div>
      </section>
      <AIContentStudioDialog open={aiContentStudioOpen} onOpenChange={setAiContentStudioOpen} />
      <PolurCharmDialog open={polurCharmOpen} onOpenChange={setPolurCharmOpen} />
      <section id="project-collection" className="project-collection-section top-rule bg-[#0a0911] py-28 md:py-40">
        <div className="container"><Reveal><SectionIntro index="03.5" eyebrow="Project collection" title="More signals in the field." detail="Four smaller studies across automation, AI media systems, career intelligence, and experimental IoT research." motionPaused={motionPaused} /></Reveal><div className="collection-guidance" id="collection-guidance" aria-live="polite"><span className="collection-guidance-kicker">Browse the hand</span><span className="collection-guidance-state">{collectionFocus === null ? "Hover or focus a card to bring its signal forward." : `Signal 0${collectionFocus + 1} / 04 · ${projectCollection[collectionFocus].title}`}</span><span className="collection-guidance-hint">Select for full brief <ArrowUpRight size={13} /></span></div><div className={`project-collection-stage mt-7 ${collectionFocus !== null ? "is-collection-engaged" : ""}`} onScroll={handleMobileCollectionScroll} onTouchStart={handleMobileCollectionTouchStart} onTouchMove={handleMobileCollectionTouchMove} onTouchEnd={clearMobileCollectionTouchIntent} onTouchCancel={clearMobileCollectionTouchIntent} aria-label="Project Collection. Select a project card to view its details." aria-describedby="collection-guidance"><span className="collection-selection-pulse" aria-hidden="true" />{projectCollection.map((project, index) => <div key={project.id} className={`collection-reveal collection-reveal-${index + 1} ${collectionFocus === index ? "is-collection-active" : ""}`}><button type="button" className={`collection-card collection-card-${index + 1} ${collectionOpeningIndex === index ? "is-opening" : ""}`} onClick={() => openCollectionProject(project, index)} onMouseEnter={() => setCollectionFocus(index)} onMouseLeave={(event) => { setCollectionFocus(null); resetCollectionArtworkParallax(event); }} onPointerMove={handleCollectionArtworkParallax} onPointerLeave={resetCollectionArtworkParallax} onFocus={() => setCollectionFocus(index)} onBlur={() => setCollectionFocus(null)} aria-label={`Open details for ${project.title}`}><img src={project.image} alt={project.alt} /><span className="collection-card-scrim" aria-hidden="true" /><span className="collection-card-refraction" aria-hidden="true" />{index === 3 && <span className="smart-aroma-sensor-pulse" aria-hidden="true" />}<span className="collection-card-index">0{index + 1} / 04</span><span className="collection-card-copy"><em>{project.label}</em><b>{project.title}</b></span><span className="collection-card-open">Open <ArrowUpRight size={14} /></span></button></div>)}</div><div className="collection-snap-indicator" aria-live="polite"><span className="collection-snap-line" aria-hidden="true" />{projectCollection.map((project, index) => <span key={project.id} className={`collection-snap-dot ${mobileCollectionSnap === index ? "is-active" : ""}`} aria-hidden="true" />)}<span className="sr-only">Card {mobileCollectionSnap + 1} of {projectCollection.length} centred: {mobileCollectionSnap + 1} / {projectCollection.length} · {projectCollection[mobileCollectionSnap].title}</span></div><Reveal delay={.28}><p className="collection-footnote"><span className="signal-dot" />Each collection card opens a focused brief. Only MyJob AI Radar includes its supplied public demo; no source-code links are shown.</p></Reveal></div>
      </section>
      <ProjectCollectionDialog project={activeCollectionProject} loading={collectionDialogLoading} motionPaused={motionPaused} onCloseAutoFocus={() => window.setTimeout(() => document.querySelector<HTMLButtonElement>(`.collection-card-${collectionDialogTriggerIndex.current}`)?.focus(), 0)} onOpenChange={(open) => { if (!open) { setCollectionDialogLoading(false); const staticClose = reduceMotion || motionPaused; window.setTimeout(() => { setActiveCollectionProject(null); if (!staticClose) window.setTimeout(() => document.querySelector<HTMLButtonElement>(`.collection-card-${collectionDialogTriggerIndex.current}`)?.focus(), 24); }, staticClose ? 0 : 260); } }} />

      <section id="experience" className="editorial-band container py-28 md:py-40">
        <Reveal><SectionIntro index="04" eyebrow="Experience" title="Learning in the work." detail="A growing practice across product design, full-stack delivery, and the systems that connect a polished surface to dependable behaviour." motionPaused={motionPaused} /></Reveal>
        <div className="experience-layout mt-14 grid gap-12 lg:grid-cols-[1.28fr_.72fr] lg:gap-20">
          <div className="timeline-list"><Reveal><div className={`timeline-row ${activeExperience === 0 ? "is-map-active" : ""}`} aria-label="Project Intern." onMouseEnter={() => pinExperienceRow(0)} onFocus={() => pinExperienceRow(0)} onMouseLeave={releaseExperienceRow} onBlur={releaseExperienceRow}><TimelineCheckpoint motionPaused={motionPaused} /><div className="label leading-6">{experience[0].period}<br /><span className="text-[#8d869a]">{experience[0].place}</span></div><div><h3 className="display text-2xl text-white">{experience[0].role}</h3><p className="mt-1 text-sm text-violet-200">{experience[0].company}</p><ExperienceEvidenceSignal label={experienceSignals[0]} motionPaused={motionPaused} /><ul className="mt-4 space-y-2.5 text-sm leading-6 text-[#b7b0c1]">{experience[0].details.map((detail) => <li key={detail} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 bg-violet-300" />{detail}</li>)}</ul></div></div></Reveal>
            {experience.slice(1).map((item, index) => <Reveal delay={(index + 1) * 0.08} key={item.company}><div className={`timeline-row ${activeExperience === index + 1 ? "is-map-active" : ""}`} aria-label={`${item.role}.`} onMouseEnter={() => pinExperienceRow(index + 1)} onFocus={() => pinExperienceRow(index + 1)} onMouseLeave={releaseExperienceRow} onBlur={releaseExperienceRow}><TimelineCheckpoint motionPaused={motionPaused} /><div className="label leading-6">{item.period}<br /><span className="text-[#8d869a]">{item.place}</span></div><div><h3 className="display text-2xl text-white">{item.role}</h3><p className="mt-1 text-sm text-violet-200">{item.company}</p><ExperienceEvidenceSignal label={experienceSignals[index + 1]} motionPaused={motionPaused} /><ul className="mt-4 space-y-2.5 text-sm leading-6 text-[#b7b0c1]">{item.details.map((detail) => <li key={detail} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 bg-violet-300" />{detail}</li>)}</ul></div></div></Reveal>)}
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
            {skills.map((skill, index) => <Reveal key={skill.code} delay={index * 0.04}><div className={`capability-cell min-h-[180px] bg-[#100d18] p-6 transition-colors hover:bg-[#171126] ${gravityProject && skill.items.some((item) => projectSkillGravity[gravityProject].skills.includes(item as never)) ? "is-gravity-group" : ""}`} onPointerMove={handleCapabilityGlow} onPointerLeave={clearCapabilityGlow}><div className="flex items-start justify-between"><p className="label">{skill.code}</p><Layers3 size={18} className="text-violet-300" /></div><h3 className="display mt-7 text-2xl text-white">{skill.title}</h3><div className="mt-5 flex flex-wrap gap-2">{skill.items.map((item) => { const proficiency = skillProficiency[item] ?? { level: "Working", stars: 3 }; const isGravityActive = Boolean(gravityProject && projectSkillGravity[gravityProject].skills.includes(item as never)); const vector = skillGravityVectors[item] ?? { x: "0px", y: "0px" }; return <span className={`skill-chip ${isGravityActive ? "is-gravity-active" : ""}`} key={item} tabIndex={0} aria-label={`${item}: ${proficiency.level} proficiency${isGravityActive ? ". Related to the active project." : ""}`} style={{ "--gravity-x": vector.x, "--gravity-y": vector.y } as React.CSSProperties}><span>{item}</span><span className="skill-tooltip" role="tooltip"><span className="skill-star-map" aria-hidden="true">{Array.from({ length: 4 }, (_, star) => <i key={star} className={star < proficiency.stars ? "is-lit" : ""} />)}</span><span className="skill-tooltip-copy">{proficiency.level} proficiency</span></span></span>; })}</div></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="editorial-band container py-28 md:py-40">
        <span className="signal-thread credential-thread" aria-hidden="true" />
        <Reveal><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="label">06 / Credentials</p><h2 className="display mt-4 text-4xl text-white md:text-6xl">Signals of momentum.</h2></div><BriefcaseBusiness className="mb-2 text-violet-300" size={28} /></div></Reveal>
        <div className="credential-grid relative mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"><CredentialSignalScan motionPaused={motionPaused} />{certifications.map((credential, index) => <Reveal delay={index * 0.06} key={credential.title}><article className="cert credential-card relative w-full bg-[#0d0b15] text-left" aria-label={`${credential.title}, issued by ${credential.issuer}`}><span className="cert-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p className="label text-violet-200">{credential.issuer}</p><p className="display mt-6 text-xl leading-tight text-white">{credential.title}</p><p className="mt-4 text-xs text-[#9d96ac]">{credential.meta}</p><span className="credential-open-cue">Credential record</span></article></Reveal>)}</div>
        <div className={`credential-exterior-field ${motionPaused || reduceMotion || lowDataMode ? "is-static" : ""}`} aria-hidden="true"><span className="credential-exterior-horizon" /><span className="credential-exterior-ring ring-one" /><span className="credential-exterior-ring ring-two" /><span className="credential-exterior-stream stream-one" /><span className="credential-exterior-stream stream-two" /><span className="credential-exterior-sparks"><i /><i /><i /><i /></span><span className="credential-exterior-caption">SMP / GRAVITY FIELD</span></div>
      </section>

      <section id="contact" className="editorial-band relative overflow-hidden border-t border-white/10 py-28 md:py-40" onPointerDown={createContactPulse} onPointerMove={extendContactConstellation} onPointerLeave={() => setContactConstellationTrail([])} style={{ backgroundImage: "linear-gradient(90deg, rgba(9,9,15,.95), rgba(9,9,15,.8)), url('/images/smp-ambient-texture_4dec6a68.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className={`contact-atmosphere ${contactFocused ? "is-engaged" : ""}`} aria-hidden="true"><span className="contact-orbit one" /><span className="contact-orbit two" /><span className="contact-glint one" /><span className="contact-glint two" /><span className="contact-beacon"><i /><i /><i /></span>{contactPulses.map((pulse) => <span key={pulse.id} className="contact-pulse" style={{ left: `${pulse.x}%`, top: `${pulse.y}%` }} />)}</div>
        <div className="contact-constellation" aria-hidden="true">{contactConstellationSegments.map((segment) => <span key={segment.id} className="constellation-line" style={{ left: `${segment.x}%`, top: `${segment.y}%`, width: `${segment.length}%`, transform: `rotate(${segment.angle}deg)` }} />)}{contactConstellationTrail.map((point) => <span key={point.id} className="constellation-point" style={{ left: `${point.x}%`, top: `${point.y}%` }} />)}</div>
        <div className="container relative z-10"><Reveal><div className="grid gap-12 lg:grid-cols-[.86fr_1.14fr] lg:gap-24"><div><p className="label">07 / Contact</p><h2 className="display mt-5 max-w-[9ch] text-5xl leading-[.9] text-white md:text-7xl">Let&apos;s make the next interaction <span className="violet-text">count.</span></h2><p className="mt-7 max-w-md text-[0.94rem] leading-7 text-[#b7b0c1]">For frontend, UI/UX, Java, or collaborative product work, write a note with a little context. I&apos;ll take it from there.</p><div className="mt-10 space-y-4"><a href="mailto:manojprabhu0707@gmail.com" className="flex items-center gap-4 text-sm text-[#d3cce0] hover:text-white"><span className="icon-button h-10 w-10"><Mail size={16} /></span>manojprabhu0707@gmail.com</a><a href="tel:+919677518268" className="flex items-center gap-4 text-sm text-[#d3cce0] hover:text-white"><span className="icon-button h-10 w-10"><Phone size={16} /></span>+91 9677518268</a><a href="https://maps.google.com/?q=Polur,Tamil+Nadu" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-sm text-[#d3cce0] hover:text-white"><span className="icon-button h-10 w-10"><MapPin size={16} /></span>Polur, Tamil Nadu</a></div></div>
          <form className="panel p-6 md:p-9" onSubmit={handleContact} onFocusCapture={() => setContactFocused(true)} onBlurCapture={handleContactBlur}><div className="grid gap-5"><div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><span className="label text-[0.57rem]">Correspondence / 01</span><button type="button" className="motion-toggle" onClick={() => setMotionPaused((paused) => !paused)} aria-pressed={motionPaused || Boolean(reduceMotion)} aria-label={reduceMotion ? "Background motion is paused by your device setting" : motionPaused ? "Resume background motion" : "Pause background motion"} disabled={Boolean(reduceMotion)}>{motionPaused || reduceMotion ? <Play size={13} /> : <Pause size={13} />}{motionPaused || reduceMotion ? "Motion paused" : "Motion live"}</button></div><label className="block"><span className="label mb-2 block">Your name</span><input className="form-field" required name="name" placeholder="What should I call you?" /></label><label className="block"><span className="label mb-2 block">Email</span><input className="form-field" type="email" required name="email" placeholder="name@company.com" /></label><label className="block"><span className="label mb-2 block">Message</span><textarea className="form-field min-h-36 resize-y" required name="message" placeholder="A few lines about the work, goal, or opportunity..." /></label><button className="signal-button primary w-full" type="submit">{sent ? "Message prepared" : "Send the note"} <Send size={15} /></button>{sent ? <div className="delivery-status" role="status" aria-live="polite"><CircleCheckBig size={19} /><div><p className="label text-[0.56rem] text-violet-100">Message prepared</p><p className="mt-1 text-xs leading-5 text-[#dfd6f5]">Your email app opened with this note addressed to Manoj. Send it there to complete delivery.</p></div></div> : null}<p className="text-center text-xs leading-5 text-[#827b91]">This form prepares a message in your email client; final delivery is confirmed by your email provider.</p></div></form></div></Reveal></div>
      </section>

      <footer className="border-t border-white/10 bg-[#08080e] py-7"><div className="container flex flex-col justify-between gap-5 text-xs text-[#8d869a] sm:flex-row sm:items-center"><div className="flex items-center gap-3"><span className="seal-wrap h-9 w-9"><img src="/images/smp-mj-monogram-clear-j_24fbf37a.webp" alt="MJ monogram" /></span><span>© {year} S Manoj Prabhu. Built with intention.</span></div><div className="flex items-center gap-4"><a className="hover:text-violet-200" href="https://github.com/manojprabhu07" target="_blank" rel="noreferrer">GitHub</a><a className="hover:text-violet-200" href="mailto:manojprabhu0707@gmail.com">Email</a><button className="inline-flex items-center gap-1 hover:text-violet-200" onClick={() => scrollToSection("top")}>Back to top <ArrowUpRight size={13} /></button><button className={`footer-star ${footerBurst ? "is-bursting" : ""}`} onClick={triggerFooterBurst} aria-label={reduceMotion ? "Star motion is disabled by your device setting" : motionPaused ? "Star motion is paused" : "Release a closing spark"} disabled={Boolean(reduceMotion || motionPaused)}><Sparkles size={14} /><span className="spark-tooltip">Release spark</span><span className="corner-spark-field" aria-hidden="true">{footerBurst ? Array.from({ length: 8 }, (_, index) => <span key={`${footerBurst}-${index}`} className="corner-spark" style={{ "--spark-angle": `${index * 45}deg` } as React.CSSProperties} />) : null}</span></button></div></div></footer>
      <div className="mobile-contact-dock" aria-label="Mobile quick actions"><button className="mobile-resume-action" type="button" onClick={downloadResume}><Download size={15} />Résumé</button><button className="mobile-contact-action" type="button" onClick={() => scrollToSection("contact")}><Mail size={16} />Contact</button></div>
    </main>
    </>
  );
}
