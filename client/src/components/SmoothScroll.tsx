import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __portfolioLenis?: Lenis;
  }
}

/** Adds gentle wheel easing while leaving touch scrolling native. */
export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    });
    window.__portfolioLenis = lenis;

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };
    frameId = window.requestAnimationFrame(raf);

    const stopForReducedMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        window.cancelAnimationFrame(frameId);
        lenis.destroy();
        delete window.__portfolioLenis;
      }
    };
    reducedMotion.addEventListener("change", stopForReducedMotion);

    return () => {
      reducedMotion.removeEventListener("change", stopForReducedMotion);
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      if (window.__portfolioLenis === lenis) {
        delete window.__portfolioLenis;
      }
    };
  }, []);

  return null;
}
