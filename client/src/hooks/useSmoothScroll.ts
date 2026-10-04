import type Lenis from "lenis";

declare global {
  interface Window {
    __portfolioLenis?: Lenis;
  }
}

export interface UseSmoothScrollOptions {
  enabled?: boolean;
  paused?: boolean;
}

/**
 * Obsidian Studio Smooth Scroll Utility
 * Lenis is mounted once at the application root. This hook remains available
 * for existing call sites that need the shared scrolling instance.
 */
export function useSmoothScroll(_options: UseSmoothScrollOptions = {}) {
  return typeof window === "undefined" ? null : window.__portfolioLenis ?? null;
}

/**
 * Programmatically scrolls to an ID, HTMLElement, or numeric offset with
 * smooth native easing and sticky navbar clearance.
 */
export function scrollToElement(
  target: string | HTMLElement | number,
  offset = -84
) {
  if (typeof window === "undefined") return;

  const isReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const scrollTo = (top: number) => {
    if (!isReduced && window.__portfolioLenis) {
      window.__portfolioLenis.scrollTo(top);
      return;
    }
    window.scrollTo({ top, behavior: isReduced ? "auto" : "smooth" });
  };

  if (typeof target === "number") {
    scrollTo(target);
    return;
  }

  if (typeof target === "string") {
    const cleanId = target.replace(/^#/, "");
    if (cleanId === "top") {
      scrollTo(0);
      return;
    }

    const el = document.getElementById(cleanId);
    if (el) {
      const top =
        el.getBoundingClientRect().top +
        (window.scrollY ?? window.pageYOffset ?? 0) +
        offset;
      scrollTo(Math.max(0, top));
    }
    return;
  }

  if (target instanceof HTMLElement) {
    const top =
      target.getBoundingClientRect().top +
      (window.scrollY ?? window.pageYOffset ?? 0) +
      offset;
    scrollTo(Math.max(0, top));
  }
}
