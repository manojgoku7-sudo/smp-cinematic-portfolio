import { useEffect, useRef, useState } from "react";
import "./CursorPortrait.css";

const BASE = "/frames/";
const CENTER = `${BASE}center.webp`;
// Viewer coordinates, clockwise from up. Calibrated to charachter.mp4.
const POSES = [1.25, 2, 2.5, 3, 4.25, 4.75, 5.75, 6.75, 7.5];
const file = (index: number) => `${BASE}frame-${String(index).padStart(3, "0")}.webp`;

export function CursorPortrait({ paused = false, lowData = false }: {
  paused?: boolean; lowData?: boolean;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState(false);
  const greetingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function greet() {
    if (greetingTimer.current) clearTimeout(greetingTimer.current);
    setGreeting(true);
    greetingTimer.current = setTimeout(() => setGreeting(false), 3500);
  }
  useEffect(() => () => {
    if (greetingTimer.current) clearTimeout(greetingTimer.current);
  }, []);
  useEffect(() => {
    const image = imageRef.current;
    const root = rootRef.current;
    if (!image || !root) return;
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false, ready = false, loading = false, visible = true;
    let active = false, angle = 0, target = 0, raf = 0, previous = 0;
    let current = -1;
    const frames: HTMLImageElement[] = [];
    const enabled = () => !paused && !lowData && pointer.matches && !reduced.matches;
    function reset() {
      active = false; current = -1; previous = 0;
      cancelAnimationFrame(raf); raf = 0;
      image!.src = CENTER;
    }
    function draw(now: number) {
      raf = 0;
      if (disposed || !active || !ready || !visible || !enabled()) return;
      const dt = previous ? Math.min(80, now - previous) : 16;
      previous = now;
      const delta = Math.atan2(Math.sin(target - angle), Math.cos(target - angle));
      angle += delta * (1 - Math.exp(-dt / 90));
      const sector = ((angle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI / 4);
      const start = Math.floor(sector), blend = sector - start;
      const time = POSES[start] + (POSES[start + 1] - POSES[start]) * blend;
      const index = Math.max(0, Math.min(63, Math.round(time * 24 * 63 / 239)));
      if (current !== index) { image!.src = frames[index].src; current = index; }
      if (Math.abs(delta) > 0.002) raf = requestAnimationFrame(draw);
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !ready || !visible || !enabled()) return;
      const bounds = root!.getBoundingClientRect();
      const dx = event.clientX - bounds.left - bounds.width / 2;
      const dy = event.clientY - bounds.top - bounds.height * 0.42;
      if (Math.hypot(dx, dy) < bounds.width * 0.12) { reset(); return; }
      target = Math.atan2(dx, -dy);
      if (!active) { angle = target; active = true; }
      if (!raf) raf = requestAnimationFrame(draw);
    }
    async function preload() {
      if (loading || ready || disposed || !enabled()) return;
      loading = true;
      let next = 0, failures = 0;
      async function worker() {
        while (next < 64 && !disposed) {
          const index = next++;
          const frame = new Image(); frames[index] = frame; frame.src = file(index);
          try { await frame.decode(); } catch { failures++; }
        }
      }
      await Promise.all(Array.from({ length: 4 }, worker));
      loading = false;
      if (!disposed) { ready = failures === 0; root!.dataset.ready = String(ready); }
    }
    function settings() { reset(); void preload(); }
    function visibility() { if (document.hidden) reset(); }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) reset(); else void preload();
    });
    observer.observe(root);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", visibility);
    pointer.addEventListener("change", settings); reduced.addEventListener("change", settings);
    return () => {
      disposed = true; reset(); observer.disconnect();
      window.removeEventListener("pointermove", move); window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", visibility);
      pointer.removeEventListener("change", settings); reduced.removeEventListener("change", settings);
    };
  }, [paused, lowData]);

  return <div className="cursor-portrait" ref={rootRef}>
    <button type="button" className="cursor-portrait-trigger" aria-label="Say hello to Manoj"
      onClick={greet} onKeyDown={(event) => { if (event.key === "Escape") setGreeting(false); }}>
      <span className="cursor-portrait-blend">
    <img ref={imageRef} className="cursor-portrait-image" src={CENTER}
      alt="Manoj's animated portrait wearing a white shirt and gold chain"
      width={1280} height={720} fetchPriority="high" decoding="async" />
      </span>
    </button>
    <div className="cursor-portrait-greeting" role="status" aria-live="polite">
      {greeting && <span>Hi, I’m Manoj 👋</span>}
    </div>
  </div>;
}
