import { useEffect, useRef, useState, useCallback } from "react";
import "./CursorPortrait.css";

export function CursorPortrait({ paused = false, lowData = false }: {
  paused?: boolean;
  lowData?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [greeting, setGreeting] = useState(false);
  const greetingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const greet = useCallback(() => {
    if (greetingTimer.current) clearTimeout(greetingTimer.current);
    setGreeting(true);
    greetingTimer.current = setTimeout(() => setGreeting(false), 3500);
  }, []);

  useEffect(() => () => {
    if (greetingTimer.current) clearTimeout(greetingTimer.current);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const image = imageRef.current;
    if (!root || !image) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let visible = false;
    let frame = 0;
    let previous = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let bounds = root.getBoundingClientRect();
    let boundsDirty = false;
    const enabled = () => !paused && !lowData && !reduced.matches && fine.matches;

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      x = y = targetX = targetY = 0;
      image!.style.transform = "translate3d(0, 0, 0)";
      image!.style.willChange = "auto";
    }

    function tick(now: number) {
      frame = 0;
      if (!visible || document.hidden || !enabled()) { stop(); return; }
      // Time-based smoothing is consistent on 60, 90 and 120 Hz displays.
      const dt = previous ? Math.min(now - previous, 50) : 16.67;
      previous = now;
      const alpha = 1 - Math.exp(-dt / 65);
      x += (targetX - x) * alpha;
      y += (targetY - y) * alpha;
      const settled = Math.abs(targetX - x) + Math.abs(targetY - y) < 0.001;
      if (settled) { x = targetX; y = targetY; }
      image!.style.transform = `perspective(900px) translate3d(${x * 10}px, ${y * 7}px, 0) rotateX(${-y * 2}deg) rotateY(${x * 3}deg)`;
      if (!settled) frame = requestAnimationFrame(tick);
      else { previous = 0; image!.style.willChange = "auto"; }
    }

    function schedule() {
      if (frame || !visible || document.hidden || !enabled()) return;
      image!.style.willChange = "transform";
      frame = requestAnimationFrame(tick);
    }
    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "touch" || !visible || !enabled()) return;
      if (boundsDirty) { bounds = root!.getBoundingClientRect(); boundsDirty = false; }
      // Continuous coordinates: no angle seam, quantized poses or central dead zone.
      targetX = Math.tanh((event.clientX - bounds.left - bounds.width / 2) / Math.max(bounds.width * 0.65, 1));
      targetY = Math.tanh((event.clientY - bounds.top - bounds.height * 0.42) / Math.max(bounds.height * 0.65, 1));
      schedule();
    }
    function settle() { targetX = targetY = 0; schedule(); }
    function invalidateBounds() { boundsDirty = true; }
    function onVisibility() { if (document.hidden) stop(); }
    function onPreference() { if (!enabled()) stop(); }
    const resize = new ResizeObserver(invalidateBounds);
    resize.observe(root);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      boundsDirty = true;
      if (!visible) stop();
    });
    observer.observe(root);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", invalidateBounds, { passive: true, capture: true });
    window.addEventListener("resize", invalidateBounds, { passive: true });
    window.addEventListener("blur", settle);
    document.documentElement.addEventListener("pointerleave", settle);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onPreference);
    fine.addEventListener("change", onPreference);
    return () => {
      stop();
      resize.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", invalidateBounds, true);
      window.removeEventListener("resize", invalidateBounds);
      window.removeEventListener("blur", settle);
      document.documentElement.removeEventListener("pointerleave", settle);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onPreference);
      fine.removeEventListener("change", onPreference);
    };
  }, [paused, lowData]);

  return (
    <div className="cursor-portrait" ref={rootRef}>
      <button type="button" className="cursor-portrait-trigger" aria-label="Say hello to Manoj"
        onClick={greet} onKeyDown={event => { if (event.key === "Escape") setGreeting(false); }}>
        <span className="cursor-portrait-blend">
          <img ref={imageRef} className="cursor-portrait-image" src="/frames/center.webp"
            width={1280} height={720} decoding="async" fetchPriority="high"
            alt="Manoj Prabhu" style={{ willChange: "auto", transformOrigin: "50% 65%" }} />
        </span>
      </button>
      <div className="cursor-portrait-greeting" role="status" aria-live="polite">
        {greeting && <span>Hi, I'm Manoj 👋</span>}
      </div>
    </div>
  );
}
