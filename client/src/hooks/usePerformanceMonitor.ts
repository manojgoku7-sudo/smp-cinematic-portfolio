import { useEffect } from "react";

export interface PerformanceMonitorOptions {
  /**
   * Whether monitoring is enabled.
   * Defaults to true in development (`import.meta.env.DEV`), false in production.
   */
  enabled?: boolean;
  /**
   * Threshold in milliseconds above which a frame interval is considered a drop/hiccup.
   * Standard 60 FPS is ~16.67ms. Default is 34ms (representing ~1 or more dropped frames, <30 FPS).
   */
  frameDropThresholdMs?: number;
  /**
   * Whether to log frame drops to the console. Defaults to true.
   */
  logFrameDrops?: boolean;
  /**
   * Whether to log long tasks (>50ms) using PerformanceObserver. Defaults to true.
   */
  logLongTasks?: boolean;
}

/**
 * Custom hook to monitor animation bottlenecks, frame drops, and long tasks in development.
 * Automatically cleans up on unmount and ignores background tab pauses.
 */
export function usePerformanceMonitor({
  enabled = import.meta.env.DEV,
  frameDropThresholdMs = 34,
  logFrameDrops = true,
  logLongTasks = true,
}: PerformanceMonitorOptions = {}) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    console.info(
      "%c[PerfMonitor] 🚀 Active%c — Monitoring frame drops (>%sms) and Long Tasks (>50ms)",
      "color: #a78bfa; font-weight: 700; background: #181528; padding: 2px 6px; border-radius: 4px;",
      "color: #94a3b8;"
    );

    let rafId: number | null = null;
    let lastTime = performance.now();
    let isTabHidden = document.hidden;

    // Track tab visibility so we don't trigger false positives when user leaves the tab
    const handleVisibilityChange = () => {
      isTabHidden = document.hidden;
      lastTime = performance.now();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 1. Frame Drop / Jank Detection via rAF
    if (logFrameDrops) {
      const checkFrame = (now: number) => {
        if (!isTabHidden) {
          const delta = now - lastTime;
          // Ignore huge gaps (>1000ms) which typically correspond to tab switching, device wake, or debugger breakpoints
          if (delta > frameDropThresholdMs && delta < 1000) {
            const approximateFps = Math.max(1, Math.round(1000 / delta));
            const droppedFrames = Math.max(1, Math.round(delta / 16.67) - 1);

            console.warn(
              `%c[PerfMonitor] ⚠️ Frame Drop%c ${delta.toFixed(1)}ms (~${approximateFps} FPS, ~${droppedFrames} dropped frame${droppedFrames > 1 ? "s" : ""})`,
              "color: #f59e0b; font-weight: 700; background: #261f12; padding: 2px 6px; border-radius: 4px;",
              "color: #fde68a; font-weight: 500;",
              {
                durationMs: Number(delta.toFixed(2)),
                approximateFps,
                estimatedDroppedFrames: droppedFrames,
                timestamp: Number(now.toFixed(1)),
              }
            );
          }
        }
        lastTime = now;
        rafId = requestAnimationFrame(checkFrame);
      };

      rafId = requestAnimationFrame(checkFrame);
    }

    // 2. Long Task Detection via PerformanceObserver
    let longTaskObserver: PerformanceObserver | null = null;
    if (logLongTasks && typeof PerformanceObserver !== "undefined") {
      try {
        const supported = (PerformanceObserver as any).supportedEntryTypes;
        if (!supported || supported.includes("longtask")) {
          longTaskObserver = new PerformanceObserver((entryList) => {
            if (document.hidden) return;
            const entries = entryList.getEntries();
            for (const entry of entries) {
              if (entry.entryType === "longtask") {
                const duration = entry.duration;
                console.warn(
                  `%c[PerfMonitor] ⏱️ Long Task%c ${duration.toFixed(1)}ms blocking main thread`,
                  "color: #ef4444; font-weight: 700; background: #2b1414; padding: 2px 6px; border-radius: 4px;",
                  "color: #fca5a5; font-weight: 500;",
                  {
                    name: entry.name,
                    durationMs: Number(duration.toFixed(2)),
                    startTime: Number(entry.startTime.toFixed(2)),
                    attribution: (entry as any).attribution ?? [],
                  }
                );
              }
            }
          });

          longTaskObserver.observe({ entryTypes: ["longtask"] });
        }
      } catch (err) {
        // PerformanceObserver or 'longtask' type may not be supported in this environment
      }
    }

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (longTaskObserver) {
        longTaskObserver.disconnect();
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, frameDropThresholdMs, logFrameDrops, logLongTasks]);
}
