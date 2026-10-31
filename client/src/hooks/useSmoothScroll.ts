import { useEffect } from "react";
import Lenis from "lenis";

export interface UseSmoothScrollOptions {
  enabled?: boolean;
  lerp?: number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

let activeLenisInstance: Lenis | null = null;

/**
 * Returns the currently active global Lenis smooth scroll instance, if available.
 */
export function getLenis(): Lenis | null {
  if (typeof window !== "undefined" && window.__portfolioLenis) {
    return window.__portfolioLenis;
  }
  return activeLenisInstance;
}

/**
 * Obsidian Studio Lenis Inertial Smooth Scroll Hook
 * Tuned for effortless, silky fluid momentum:
 * - Reuses `window.__portfolioLenis` when mounted by `<SmoothScroll />` so only a single Lenis instance runs.
 * - Synchronizes with programmatic section navigation and sticky headers.
 */
export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const {
    enabled = true,
    lerp = 0.28,
    wheelMultiplier = 0.92,
    touchMultiplier = 1.5,
  } = options;

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) return;

    // If SmoothScroll component already mounted a global Lenis instance, reuse it
    // instead of creating a competing second instance.
    if (window.__portfolioLenis) {
      activeLenisInstance = window.__portfolioLenis;
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarseTouch =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      (window.innerWidth < 768 && "ontouchstart" in window);

    if (prefersReducedMotion || isCoarseTouch) {
      activeLenisInstance = null;
      return;
    }

    const lenis = new Lenis({
      lerp,
      wheelMultiplier,
      touchMultiplier,
      smoothWheel: true,
      syncTouch: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
      autoRaf: true,
      respectReducedMotion: true,
      prevent: (node) => {
        return (
          node.hasAttribute("data-lenis-prevent") ||
          node.hasAttribute("data-lenis-prevent-wheel") ||
          Boolean(node.closest("[data-lenis-prevent]")) ||
          Boolean(node.closest("[data-lenis-prevent-wheel]")) ||
          Boolean(node.closest("[role='dialog']")) ||
          Boolean(node.closest(".mobile-drawer-glass"))
        );
      },
    });

    activeLenisInstance = lenis;
    window.__portfolioLenis = lenis;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      }
      lenis.destroy();
      if (activeLenisInstance === lenis) {
        activeLenisInstance = null;
      }
      if (window.__portfolioLenis === lenis) {
        delete window.__portfolioLenis;
      }
    };
  }, [enabled, lerp, wheelMultiplier, touchMultiplier]);

  return getLenis();
}

/**
 * Programmatically scrolls to an ID, CSS selector, HTMLElement, or numeric offset with
 * Lenis inertial physics or graceful native fallback, factoring in sticky navbar clearance.
 */
export function scrollToElement(
  target: string | HTMLElement | number,
  offset = -84
) {
  if (typeof window === "undefined") return;

  const isReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const lenisInstance = getLenis();

  // Use active Lenis instance if available
  if (lenisInstance) {
    const scrollOptions = {
      offset,
      immediate: isReduced,
      duration: isReduced ? 0 : 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    };

    if (typeof target === "number") {
      lenisInstance.scrollTo(target, {
        ...scrollOptions,
        offset: 0,
      });
      return;
    }

    if (typeof target === "string") {
      const cleanId = target.replace(/^#/, "");
      if (cleanId === "top" || target === "top") {
        lenisInstance.scrollTo(0, {
          ...scrollOptions,
          offset: 0,
        });
        return;
      }

      const element =
        document.getElementById(cleanId) || document.querySelector(target);
      if (element instanceof HTMLElement) {
        lenisInstance.scrollTo(element, scrollOptions);
        return;
      }

      // If neither was found, try passing target string selector directly
      try {
        lenisInstance.scrollTo(`#${cleanId}`, scrollOptions);
        return;
      } catch {
        // Fall back below
      }
    }

    if (target instanceof HTMLElement) {
      lenisInstance.scrollTo(target, scrollOptions);
      return;
    }
  }

  // Fallback if Lenis is not running
  if (typeof target === "number") {
    window.scrollTo({
      top: target,
      behavior: isReduced ? "auto" : "smooth",
    });
    return;
  }

  if (typeof target === "string") {
    const cleanId = target.replace(/^#/, "");
    if (cleanId === "top" || target === "top") {
      window.scrollTo({
        top: 0,
        behavior: isReduced ? "auto" : "smooth",
      });
      return;
    }

    const el =
      document.getElementById(cleanId) ||
      (document.querySelector(target) as HTMLElement | null);
    if (el) {
      const top =
        el.getBoundingClientRect().top +
        (window.scrollY ?? window.pageYOffset ?? 0) +
        offset;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: isReduced ? "auto" : "smooth",
      });
    }
    return;
  }

  if (target instanceof HTMLElement) {
    const top =
      target.getBoundingClientRect().top +
      (window.scrollY ?? window.pageYOffset ?? 0) +
      offset;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: isReduced ? "auto" : "smooth",
    });
  }
}
