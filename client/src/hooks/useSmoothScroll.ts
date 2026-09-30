export interface UseSmoothScrollOptions {
  enabled?: boolean;
  paused?: boolean;
}

/**
 * Obsidian Studio Smooth Scroll Utility
 * Uses native GPU-composited smooth scrolling for natural 60fps/120fps physics
 * without JavaScript wheel hijacking or main-thread scroll lockups.
 */
export function useSmoothScroll(_options: UseSmoothScrollOptions = {}) {
  // Native compositor scrolling is preserved for zero-latency, stutter-free movement
  return null;
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

  if (typeof target === "number") {
    window.scrollTo({
      top: target,
      behavior: isReduced ? "auto" : "smooth",
    });
    return;
  }

  if (typeof target === "string") {
    const cleanId = target.replace(/^#/, "");
    if (cleanId === "top") {
      window.scrollTo({
        top: 0,
        behavior: isReduced ? "auto" : "smooth",
      });
      return;
    }

    const el = document.getElementById(cleanId);
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

