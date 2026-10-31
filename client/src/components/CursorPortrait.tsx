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
    const canvas = document.createElement("canvas");
    canvas.width = 768;
    canvas.height = 432;
    canvas.className = image.className;
    canvas.setAttribute("aria-label", "Manoj's portrait following your pointer");
    canvas.setAttribute("role", "img");
    canvas.style.willChange = "auto";
    canvas.style.display = "none";
    image.insertAdjacentElement("afterend", canvas);
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) { canvas.remove(); return; }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const frames: (HTMLImageElement | undefined)[] = new Array(64);
    let disposed = false;
    let ready = false;
    let visible = false;
    let raf = 0;
    let previous = 0;
    let position = 56;
    let target = 56;
    let rendered = -1;
    let bounds = root.getBoundingClientRect();
    let dirty = true;
    const enabled = () => !paused && !lowData && !reduced.matches;
    const poses = [8, 13, 16, 19, 27, 30, 36, 43, 47];

    function draw(index: number) {
      const frame = frames[index];
      if (!frame || index === rendered || disposed) return;
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.drawImage(frame, 0, 0, canvas.width, canvas.height);
      image!.style.display = "none";
      canvas.style.display = "block";
      rendered = index;
    }
    function tick(now: number) {
      raf = 0;
      if (disposed || !ready || !visible || document.hidden || !enabled()) return;
      const dt = previous ? Math.min(32, now - previous) : 16.67;
      previous = now;
      const delta = target - position;
      // Ease in sequence space, not angle space: cross every intermediate pose.
      // Cap travel to one source frame per display refresh to prevent large jumps.
      const step = delta * (1 - Math.exp(-dt / 70));
      position += Math.max(-1, Math.min(1, step));
      if (Math.abs(target - position) < 0.02) position = target;
      draw(Math.round(position));
      if (position !== target) raf = requestAnimationFrame(tick);
      else previous = 0;
    }
    function schedule() {
      if (!raf && ready && visible && !document.hidden && enabled()) raf = requestAnimationFrame(tick);
    }
    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "touch" || !visible || !enabled()) return;
      if (dirty) { bounds = root!.getBoundingClientRect(); dirty = false; }
      const dx = event.clientX - bounds.left - bounds.width / 2;
      const dy = event.clientY - bounds.top - bounds.height * 0.42;
      // Hold the current gaze near the face instead of snapping to a separate image.
      if (Math.hypot(dx, dy) < bounds.width * 0.06) return;
      const angle = (Math.atan2(dx, -dy) + Math.PI * 2) % (Math.PI * 2);
      const sector = angle / (Math.PI / 4);
      const i = Math.min(7, Math.floor(sector));
      target = poses[i] + (poses[i + 1] - poses[i]) * (sector - i);
      schedule();
    }
    function invalidate() { dirty = true; }
    function stop() { cancelAnimationFrame(raf); raf = 0; previous = 0; }
    function onVisibility() { if (document.hidden) stop(); else schedule(); }
    function onPreference() {
      if (!enabled()) { stop(); canvas.style.display = "none"; image!.style.display = "block"; }
      else { startLoading(); if (ready) { rendered = -1; draw(Math.round(position)); } schedule(); }
    }
    // Decode the entire small sequence before enabling tracking; partial loading
    // previously caused fallback poses to jump as more frames arrived.
    let cursor = 0;
    async function loadWorker() {
      while (cursor < 64 && !disposed) {
        const index = cursor++;
        const frame = new Image();
        frame.decoding = "async";
        frame.src = `/frames/frame-${String(index).padStart(3, "0")}.webp`;
        try { await frame.decode(); if (!disposed) frames[index] = frame; }
        catch { /* Keep the static fallback if the sequence cannot be decoded. */ }
      }
    }
    let loading = false;
    function startLoading() {
      if (loading || !enabled()) return;
      loading = true;
      void Promise.all(Array.from({ length: 4 }, loadWorker)).then(() => {
      if (disposed || frames.filter(Boolean).length !== 64) return;
      ready = true;
      if (enabled()) draw(56);
      schedule();
    });
    }
    startLoading();
    const resize = new ResizeObserver(invalidate);
    resize.observe(root);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      dirty = true;
      if (!visible) stop(); else schedule();
    });
    observer.observe(root);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", invalidate, { passive: true, capture: true });
    window.addEventListener("resize", invalidate, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onPreference);
    return () => {
      disposed = true;
      stop();
      canvas.remove();
      image.style.display = "block";
      resize.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", invalidate, true);
      window.removeEventListener("resize", invalidate);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onPreference);
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



