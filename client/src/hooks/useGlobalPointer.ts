import { useEffect, useRef } from "react";

export interface UseGlobalPointerOptions {
  /** Pause interpolation updates without tearing down listeners */
  paused?: boolean;
  /** Disable pointer tracking and reset CSS variables to viewport center */
  disabled?: boolean;
  /** Exponential smoothing factor (0 < damping <= 1). Defaults to 0.12 for responsive silk motion */
  damping?: number;
}

/**
 * Tracks mouse/pointer X/Y coordinates on `document` and coalesces updates via
 * `requestAnimationFrame`, writing global CSS custom properties (`--pointer-x`,
 * `--pointer-y`, `--cursor-pos-x`, `--cursor-pos-y`, `--bg-shift-x`, `--bg-shift-y`)
 * onto `document.documentElement` for zero-re-render, GPU-composited follow effects.
 */
export function useGlobalPointer({
  paused = false,
  disabled = false,
  damping = 0.12,
}: UseGlobalPointerOptions = {}) {
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const hasInitialPoint = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const rootStyle = document.documentElement.style;
    const initCenterX = (window.innerWidth || 1280) * 0.5;
    const initCenterY = (window.innerHeight || 800) * 0.5;

    if (!hasInitialPoint.current) {
      targetX.current = initCenterX;
      targetY.current = initCenterY;
      currentX.current = initCenterX;
      currentY.current = initCenterY;
    }

    const writeVariables = (x: number, y: number) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const pctX = (x / width) * 100;
      const pctY = (y / height) * 100;
      const normX = (x / width) * 2 - 1;
      const normY = (y / height) * 2 - 1;
      const shiftX = normX * 38;
      const shiftY = normY * 30;

      rootStyle.setProperty("--pointer-x", `${x.toFixed(1)}px`);
      rootStyle.setProperty("--pointer-y", `${y.toFixed(1)}px`);
      rootStyle.setProperty("--cursor-pos-x", `${pctX.toFixed(2)}%`);
      rootStyle.setProperty("--cursor-pos-y", `${pctY.toFixed(2)}%`);
      rootStyle.setProperty("--bg-shift-x", `${shiftX.toFixed(2)}px`);
      rootStyle.setProperty("--bg-shift-y", `${shiftY.toFixed(2)}px`);
    };

    if (disabled) {
      writeVariables(initCenterX, initCenterY);
      return;
    }

    let isRunning = true;
    let isLoopActive = false;

    const animate = () => {
      if (!isRunning) {
        isLoopActive = false;
        return;
      }

      if (!paused) {
        const diffX = targetX.current - currentX.current;
        const diffY = targetY.current - currentY.current;
        const isMoving = Math.abs(diffX) > 0.15 || Math.abs(diffY) > 0.15;

        if (isMoving) {
          currentX.current += diffX * damping;
          currentY.current += diffY * damping;
          writeVariables(currentX.current, currentY.current);
          rafId.current = window.requestAnimationFrame(animate);
          return;
        } else {
          currentX.current = targetX.current;
          currentY.current = targetY.current;
          writeVariables(currentX.current, currentY.current);
        }
      }

      isLoopActive = false;
    };

    const scheduleTick = () => {
      if (!isLoopActive && isRunning && !paused) {
        isLoopActive = true;
        rafId.current = window.requestAnimationFrame(animate);
      }
    };

    const handleCoords = (clientX: number, clientY: number) => {
      targetX.current = clientX;
      targetY.current = clientY;
      if (!hasInitialPoint.current) {
        hasInitialPoint.current = true;
        currentX.current = clientX;
        currentY.current = clientY;
      }
      scheduleTick();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      handleCoords(event.clientX, event.clientY);
    };

    const onMouseMove = (event: MouseEvent) => {
      handleCoords(event.clientX, event.clientY);
    };

    const onMouseLeave = () => {
      targetX.current = (window.innerWidth || 1280) * 0.5;
      targetY.current = (window.innerHeight || 800) * 0.5;
      scheduleTick();
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

    // Initialize CSS variables on mount
    scheduleTick();

    return () => {
      isRunning = false;
      isLoopActive = false;
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [paused, disabled, damping]);
}
