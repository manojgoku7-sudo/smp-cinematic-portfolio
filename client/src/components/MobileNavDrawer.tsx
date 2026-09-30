import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  ArrowUpRight,
  ChevronRight,
  Briefcase,
  Mail,
  Download,
  Copy,
  Check,
  Compass,
  Sparkles,
  Terminal,
} from "lucide-react";
import { toast } from "sonner";

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: readonly (readonly [string, string])[];
  activeSection: string;
  onSelectSection: (id: string) => void;
  onOpenRecruiterReview: () => void;
  onOpenTerminal?: () => void;
  onDownloadResume?: () => void;
  motionPaused: boolean;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  navItems,
  activeSection,
  onSelectSection,
  onOpenRecruiterReview,
  onOpenTerminal,
  onDownloadResume,
  motionPaused,
}: MobileNavDrawerProps) {
  const reduceMotion = useReducedMotion();
  const staticMotion = Boolean(reduceMotion || motionPaused);

  const [copiedEmail, setCopiedEmail] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Prevent layout shift from scrollbar disappearing
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  // Handle Escape key to dismiss drawer
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("manojprabhu0707@gmail.com");
    setCopiedEmail(true);
    toast.success("Email copied to clipboard: manojprabhu0707@gmail.com");
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2400);
  };

  const handleNavItemClick = (id: string) => {
    onClose();
    // Allow drawer exit animation to smoothly start before scrolling
    setTimeout(() => {
      onSelectSection(id);
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[140] md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          {/* Frosted Backdrop Overlay with Smooth Blur */}
          <motion.div
            id="mobile-nav-backdrop"
            className="fixed inset-0 bg-[#06040a]/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-out Obsidian Glass Drawer */}
          <motion.aside
            id="mobile-nav-drawer"
            className="mobile-drawer-glass fixed top-0 right-0 bottom-0 z-[150] w-[min(345px,90vw)] h-full flex flex-col justify-between overflow-y-auto overscroll-contain shadow-[-16px_0_60px_rgba(0,0,0,0.8)]"
            initial={staticMotion ? false : { x: "100%", opacity: 0.85 }}
            animate={staticMotion ? {} : { x: "0%", opacity: 1 }}
            exit={staticMotion ? {} : { x: "100%", opacity: 0.85 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.85,
            }}
          >
            {/* Ambient Cosmic Horizon Glow */}
            <div className="mobile-drawer-ambient-glow" aria-hidden="true" />
            <div className="mobile-drawer-cosmic-arc" aria-hidden="true" />

            {/* Top Section: Header, Telemetry & Navigation */}
            <div className="relative z-10 px-5 sm:px-6 pt-5 pb-4">
              {/* Header Bar */}
              <div className="flex items-center justify-between gap-3 border-b border-violet-300/15 pb-4">
                {/* Brand Monogram Cluster */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="seal-wrap h-9 w-9 shrink-0 flex items-center justify-center rounded-full bg-violet-950/40 border border-violet-400/30 shadow-[0_0_12px_rgba(139,92,246,0.25)]">
                      <img
                        src="/images/smp-mj-monogram-clear-j_24fbf37a.png"
                        alt="MJ monogram"
                        loading="lazy"
                        decoding="async"
                        width={30}
                        height={30}
                        className="h-full w-full object-contain p-1"
                      />
                    </span>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#090710] shadow-[0_0_8px_#34d399]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-sm font-semibold text-white tracking-tight leading-tight">
                      S Manoj Prabhu
                    </span>
                    <span className="text-[10px] font-mono text-violet-300/80 tracking-wide uppercase flex items-center gap-1.5 mt-0.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Systems &amp; UI
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  id="mobile-nav-close-button"
                  className="mobile-drawer-close-btn"
                  onClick={onClose}
                  aria-label="Close navigation menu"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Monospace Sub-header Telemetry */}
              <div className="flex items-center justify-between mt-3 px-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-violet-400/60 font-semibold flex items-center gap-1.5">
                  <Compass size={11} className="text-violet-400/80" />
                  Navigation Index
                </span>
                <span className="text-[9px] font-mono text-violet-300/40">
                  {navItems.length} SECT
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="mt-2.5 flex flex-col gap-1.5" aria-label="Main mobile navigation">
                {navItems.map(([label, id], index) => {
                  const isActive = activeSection === id;
                  const itemNumber = String(index + 1).padStart(2, "0");

                  return (
                    <motion.button
                      key={id}
                      type="button"
                      id={`mobile-nav-link-${id}`}
                      className={`mobile-nav-item ${isActive ? "is-active" : ""}`}
                      onClick={() => handleNavItemClick(id)}
                      initial={staticMotion ? false : { opacity: 0, x: 18 }}
                      animate={staticMotion ? {} : { opacity: 1, x: 0 }}
                      transition={{
                        delay: staticMotion ? 0 : 0.04 + index * 0.035,
                        duration: 0.26,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="mobile-nav-number">{itemNumber}</span>
                        <span className="mobile-nav-label display text-lg">{label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {isActive && (
                          <span className="mobile-nav-active-pip" aria-hidden="true" />
                        )}
                        <ChevronRight
                          size={15}
                          className={`mobile-nav-chevron ${isActive ? "text-violet-300" : "text-white/25"}`}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Featured Fast Actions */}
              <div className="mt-5 pt-4 border-t border-violet-300/15 flex flex-col gap-2">
                <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-violet-400/60 font-semibold px-1 flex items-center gap-1.5">
                  <Sparkles size={11} className="text-violet-400/80" />
                  Interactive Modes
                </span>

                {/* Recruiter Review Path Action */}
                <button
                  type="button"
                  id="mobile-nav-recruiter-btn"
                  className="mobile-drawer-action-btn recruiter"
                  onClick={() => {
                    onClose();
                    setTimeout(onOpenRecruiterReview, 120);
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 rounded-md bg-violet-500/20 text-violet-300 border border-violet-400/30 shrink-0">
                      <Briefcase size={14} />
                    </span>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-white tracking-tight">Recruiter Review Path</p>
                      <p className="text-[10px] text-violet-200/70">Curated 3-step candidate brief</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-violet-300/60 shrink-0" />
                </button>

                {/* Developer Terminal */}
                {onOpenTerminal && (
                  <button
                    type="button"
                    id="mobile-nav-terminal-btn"
                    className="mobile-drawer-action-btn terminal"
                    onClick={() => {
                      onClose();
                      setTimeout(onOpenTerminal, 120);
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shrink-0">
                        <Terminal size={14} />
                      </span>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-white tracking-tight">Interactive Terminal</p>
                        <p className="text-[10px] text-emerald-200/70">CLI developer shell • Try commands</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-emerald-300/60 shrink-0" />
                  </button>
                )}

                {/* Download Résumé */}
                {onDownloadResume && (
                  <button
                    type="button"
                    id="mobile-nav-resume-btn"
                    className="mobile-drawer-action-btn neutral"
                    onClick={() => {
                      onDownloadResume();
                      toast.success("Downloading S Manoj Prabhu Résumé");
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-md bg-white/10 text-violet-200 border border-white/15 shrink-0">
                        <Download size={14} />
                      </span>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-white tracking-tight">Download Résumé</p>
                        <p className="text-[10px] text-white/60">Verified copy • Plain text</p>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-white/40 shrink-0" />
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Footer Section: Email & Social */}
            <div className="relative z-10 px-5 sm:px-6 py-4 border-t border-violet-300/15 bg-[#090710]/60 backdrop-blur-md">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-violet-300/70 uppercase tracking-wider">
                    Direct Contact
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 text-[11px] text-violet-300 hover:text-white transition-colors cursor-pointer"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="text-emerald-300 font-mono">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span className="font-mono">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  id="mobile-nav-email-link"
                  className="mobile-drawer-email-card w-full text-left cursor-pointer"
                  title="Click to copy email address"
                  aria-label="Click to copy email address"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail size={14} className="text-violet-300 shrink-0" />
                    <span className="text-xs text-white/95 truncate font-medium font-mono">
                      manojprabhu0707@gmail.com
                    </span>
                  </div>
                  <Copy size={13} className="text-violet-300/80 shrink-0" />
                </button>

                <div className="flex items-center justify-between pt-1 text-[11px] text-[#8d869a]">
                  <span className="font-mono text-[10px]">Chennai, India</span>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://github.com/manojprabhu07"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-violet-200 transition-colors py-1"
                    >
                      GitHub
                    </a>
                    <span className="text-violet-400/40">•</span>
                    <a
                      href="https://www.linkedin.com/in/manojprabhu07"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-violet-200 transition-colors py-1"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

