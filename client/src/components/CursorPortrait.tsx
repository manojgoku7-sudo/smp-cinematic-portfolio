import { useEffect, useRef, useState, useCallback } from "react";
import "./CursorPortrait.css";

const BASE = "/frames/";
const CENTER = `${BASE}center.webp`;
// Calibrated pose timestamps in seconds from charachter.mp4
// Directions clockwise: [up, upperRight, right, lowerRight, down, lowerLeft, left, upperLeft, up]
const POSES = [1.25, 2.0, 2.5, 3.0, 4.25, 4.75, 5.75, 6.75, 7.5];
const TWO_PI = Math.PI * 2;
const file = (index: number) => `${BASE}frame-${String(index).padStart(3, "0")}.webp`;

export function CursorPortrait({
  paused = false,
  lowData = false,
}: {
  paused?: boolean;
  lowData?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState(false);
  const greetingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const greet = useCallback(() => {
    if (greetingTimer.current) clearTimeout(greetingTimer.current);
    setGreeting(true);
    greetingTimer.current = setTimeout(() => setGreeting(false), 3500);
  }, []);

  useEffect(() => {
    return () => {
      if (greetingTimer.current) clearTimeout(greetingTimer.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const coarseOnly = matchMedia("(hover: none) and (pointer: coarse)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const cores = nav.hardwareConcurrency ?? 8;
    const memory = nav.deviceMemory ?? 8;
    const saveData = Boolean(nav.connection?.saveData);
    const isConstrainedDevice =
      (coarseOnly.matches && window.innerWidth < 768) ||
      cores <= 2 ||
      memory <= 2 ||
      saveData;

    // On constrained mobile phones, preload a 16-frame subset (stride = 4); on desktop/laptops load all 64 frames
    const frameStride = isConstrainedDevice ? 4 : 1;
    const workerCount = isConstrainedDevice ? 2 : 6;

    let disposed = false;
    let visible = true;
    let rafId = 0;
    let previousTime = 0;
    let currentAngle = 0;
    let targetAngle = 0;
    let active = false;
    let isNearCenter = true;
    let currentRenderedIndex = -1;

    let mouseX = -10000;
    let mouseY = -10000;
    let hasMouse = false;

    // Cache preloaded frame image objects
    const frames: (HTMLImageElement | undefined)[] = new Array(64);
    const centerImg = new Image();
    centerImg.decoding = "async";
    centerImg.src = CENTER;

    // Crossfade from the displayed pose, even when a transition is interrupted.
    const previousFrame = document.createElement("canvas");
    previousFrame.width = canvas.width;
    previousFrame.height = canvas.height;
    const previousCtx = previousFrame.getContext("2d");
    let fadeId = 0;
    let hasRendered = false;
    const render = (img: HTMLImageElement) => {
      if (disposed || !ctx) return;
      if (fadeId) cancelAnimationFrame(fadeId);
      fadeId = 0;
      if (!hasRendered || !previousCtx || paused || lowData || reduced.matches) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        hasRendered = true;
        return;
      }
      previousCtx.clearRect(0, 0, canvas.width, canvas.height);
      previousCtx.drawImage(canvas, 0, 0);
      const started = performance.now();
      const fade = (now: number) => {
        if (disposed) return;
        const amount = Math.min(1, (now - started) / 100);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.drawImage(previousFrame, 0, 0);
        ctx.globalAlpha = amount;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        if (amount < 1) fadeId = requestAnimationFrame(fade);
        else fadeId = 0;
      };
      fadeId = requestAnimationFrame(fade);
    };

    // Draw initial center frame as soon as it loads
    if (centerImg.complete && centerImg.naturalWidth > 0) {
      render(centerImg);
    } else {
      centerImg.onload = () => {
        if (!disposed && currentRenderedIndex === -1) {
          render(centerImg);
        }
      };
    }

    const canTrackMouse = () => !paused && !lowData && !reduced.matches;

    // Find the requested frame or the closest already-loaded frame so gaze responds immediately
    const getBestLoadedFrame = (targetIdx: number): { index: number; img: HTMLImageElement } | null => {
      const direct = frames[targetIdx];
      if (direct && direct.complete && direct.naturalWidth > 0) {
        return { index: targetIdx, img: direct };
      }
      for (let offset = 1; offset < 32; offset++) {
        const prev = (targetIdx - offset + 64) % 64;
        const prevImg = frames[prev];
        if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) {
          return { index: prev, img: prevImg };
        }
        const next = (targetIdx + offset) % 64;
        const nextImg = frames[next];
        if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
          return { index: next, img: nextImg };
        }
      }
      return null;
    };

    // Build frame index list: load key cardinal/intercardinal frames first so tracking works immediately, then fill in between
    const frameIndices: number[] = [];
    if (!lowData && !reduced.matches) {
      const seen = new Set<number>();
      for (const stridePass of [8, 4, frameStride]) {
        if (stridePass < frameStride) continue;
        for (let idx = 0; idx < 64; idx += stridePass) {
          if (!seen.has(idx)) {
            seen.add(idx);
            frameIndices.push(idx);
          }
        }
      }
    }

    let queueCursor = 0;
    const loadSingleFrame = (i: number): Promise<void> =>
      new Promise((resolve) => {
        if (disposed) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = "async";
        frames[i] = img;
        const finish = () => {
          // If cursor is already active and waiting on frames, schedule a draw tick
          if (!disposed && hasMouse && !isNearCenter && !rafId) {
            previousTime = performance.now();
            rafId = requestAnimationFrame(draw);
          }
          resolve();
        };
        img.onload = finish;
        img.onerror = () => resolve();
        img.src = file(i);
      });

    const loadWorker = async () => {
      while (queueCursor < frameIndices.length && !disposed) {
        const i = frameIndices[queueCursor++];
        await loadSingleFrame(i);
      }
    };

    for (let w = 0; w < workerCount; w++) {
      void loadWorker();
    }

    function draw(now: number) {
      rafId = 0;
      if (disposed || !visible || !canTrackMouse() || !root) return;

      const dt = previousTime ? Math.min(48, now - previousTime) : 16;
      previousTime = now;

      if (hasMouse) {
        const bounds = root.getBoundingClientRect();
        if (bounds.bottom < -50 || bounds.top > window.innerHeight + 50) {
          return;
        }

        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height * 0.42;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const dist = Math.hypot(dx, dy);

        // Dead-zone near face center
        if (dist < bounds.width * 0.12) {
          isNearCenter = true;
        } else {
          isNearCenter = false;
          targetAngle = Math.atan2(dx, -dy);
          if (!active) {
            currentAngle = targetAngle;
            active = true;
          }
        }
      }

      if (isNearCenter) {
        // When near center, smoothly settle to center frame
        if (currentRenderedIndex !== -1) {
          currentRenderedIndex = -1;
          if (centerImg.complete && centerImg.naturalWidth > 0) {
            render(centerImg);
          }
        }
        return;
      }

      // Compute shortest angular difference
      const delta = Math.atan2(
        Math.sin(targetAngle - currentAngle),
        Math.cos(targetAngle - currentAngle)
      );

      // Critically damped exponential spring: responsive yet silky smooth
      const factor = 1 - Math.exp(-dt / 85);
      currentAngle += delta * factor;

      // Map normalized angle to poses and quantize to nearest preloaded stride frame
      const norm = ((currentAngle % TWO_PI) + TWO_PI) % TWO_PI;
      const sectorExact = Math.min(7.9999, norm / (Math.PI / 4));
      const start = Math.floor(sectorExact) % 8;
      const blend = sectorExact - start;
      const next = start + 1;
      const time = POSES[start] + (POSES[next] - POSES[start]) * blend;
      const rawIndex = Math.max(0, Math.min(63, Math.round((time * 24 * 63) / 239)));
      const desiredIndex = Math.min(
        64 - frameStride,
        Math.max(0, Math.round(rawIndex / frameStride) * frameStride)
      );

      const match = getBestLoadedFrame(desiredIndex);
      if (match && currentRenderedIndex !== match.index) {
        currentRenderedIndex = match.index;
        render(match.img);
      }

      // Continue animation if angle is still moving or desired frame is still loading
      if (Math.abs(delta) > 0.001 || (match && match.index !== desiredIndex)) {
        rafId = requestAnimationFrame(draw);
      }
    }

    function scheduleDraw() {
      if (!canTrackMouse() || !visible || rafId) return;
      previousTime = performance.now();
      rafId = requestAnimationFrame(draw);
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      hasMouse = true;
      scheduleDraw();
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      hasMouse = true;
      scheduleDraw();
    }

    function onScroll() {
      // While scrolling, update gaze relative to current mouse position on next animation frame
      if (hasMouse) {
        scheduleDraw();
      }
    }

    function reset() {
      hasMouse = false;
      isNearCenter = true;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      currentRenderedIndex = -1;
      if (centerImg.complete && centerImg.naturalWidth > 0) {
        render(centerImg);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        reset();
      } else if (hasMouse) {
        scheduleDraw();
      }
    });

    observer.observe(root);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("mouseleave", reset);

    const onVisibilityChange = () => {
      if (document.hidden) reset();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      disposed = true;
      if (fadeId) cancelAnimationFrame(fadeId);
      reset();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("mouseleave", reset);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [paused, lowData]);

  return (
    <div className="cursor-portrait" ref={rootRef}>
      <button
        type="button"
        className="cursor-portrait-trigger"
        aria-label="Say hello to Manoj"
        onClick={greet}
        onKeyDown={(event) => {
          if (event.key === "Escape") setGreeting(false);
        }}
      >
        <span className="cursor-portrait-blend">
          <canvas
            ref={canvasRef}
            className="cursor-portrait-image"
            width={1280}
            height={720}
            aria-label="Manoj's animated portrait with smooth cursor and scroll gaze tracking"
          />
        </span>
      </button>
      <div className="cursor-portrait-greeting" role="status" aria-live="polite">
        {greeting && <span>Hi, I’m Manoj 👋</span>}
      </div>
    </div>
  );
}
