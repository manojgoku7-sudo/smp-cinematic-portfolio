/**
 * Obsidian Studio proof metric — counts from 0 to its final value once the metric scrolls
 * into view. Fully guarded: reduced-motion, low-data, and the manual motion-pause switch
 * all settle the number instantly instead of animating.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type RevealMetricProps = {
  value: number;
  suffix?: string;
  label: string;
  motionPaused?: boolean;
  lowDataMode?: boolean;
};

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

export function RevealMetric({ value, suffix = "", label, motionPaused = false, lowDataMode = false }: RevealMetricProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const staticValue = Boolean(reduceMotion) || lowDataMode;
  const animated = !staticValue && !motionPaused;
  const [display, setDisplay] = useState(!animated ? value : 0);

  // Pause or reduced-motion contexts settle the number instantly at its final value.
  const settle = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setDisplay(value);
  }, [value]);

  useEffect(() => {
    if (!animated) {
      settle();
      return;
    }
    const node = rootRef.current;
    if (!node) return;
    let observer: IntersectionObserver | null = null;

    const run = () => {
      if (startedRef.current) return; // A count already ran (or is running) — never restart.
      startedRef.current = true;
      const startedAt = performance.now();
      const duration = 1200;
      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        setDisplay(Math.round(value * easeOutCubic(progress)));
        frameRef.current = progress < 1 ? window.requestAnimationFrame(step) : null;
      };
      frameRef.current = window.requestAnimationFrame(step);
    };

    // Start immediately when the metric is already inside the first viewport.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      run();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            run();
            observer?.disconnect();
            observer = null;
          }
        },
        { threshold: 0.4, rootMargin: "0px 0px -6% 0px" },
      );
      observer.observe(node);
    }

    return () => {
      observer?.disconnect();
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [animated, settle, value]);

  return (
    <div className="reveal-metric" ref={rootRef}>
      {/* While animating, the rolling number is decorative; a sr-only caption below states the final value. */}
      <p className="display text-3xl text-white" aria-hidden={animated ? "true" : undefined}>
        {display}
        <span className="text-violet-300">{suffix}</span>
      </p>
      <p className="label mt-2 text-[0.57rem]">{label}</p>
      <span className="sr-only" aria-hidden={animated ? undefined : "true"}>
        {value}
        {suffix} {label}
      </span>
    </div>
  );
}
