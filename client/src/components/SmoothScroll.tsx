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
    const isCoarseTouch =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      (window.innerWidth < 768 && "ontouchstart" in window);

    if (reducedMotion.matches || isCoarseTouch) return;

    const lenis = new Lenis({
      // Lerp mode reacts immediately to each wheel event and avoids the long
      // ease-out that can feel delayed on a long, animation-heavy page.
      // A slightly higher lerp keeps wheel motion fluid on long pages without
      // creating the low-frame, delayed feeling of an overly soft ease.
      lerp: 0.28,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
      overscroll: false,
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
    window.__portfolioLenis = lenis;

    const root = document.documentElement;
    let idleTimer = 0;
    const pauseDecorativeMotion = () => {
      root.classList.add("is-scroll-active");
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        root.classList.remove("is-scroll-active");
      }, 180);
    };
    const unsubscribeScroll = lenis.on("scroll", pauseDecorativeMotion);

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };
    frameId = window.requestAnimationFrame(raf);

    const stopForReducedMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        window.cancelAnimationFrame(frameId);
        unsubscribeScroll();
        window.clearTimeout(idleTimer);
        root.classList.remove("is-scroll-active");
        lenis.destroy();
        delete window.__portfolioLenis;
      }
    };
    reducedMotion.addEventListener("change", stopForReducedMotion);

    return () => {
      reducedMotion.removeEventListener("change", stopForReducedMotion);
      window.cancelAnimationFrame(frameId);
      unsubscribeScroll();
      window.clearTimeout(idleTimer);
      root.classList.remove("is-scroll-active");
      lenis.destroy();
      if (window.__portfolioLenis === lenis) {
        delete window.__portfolioLenis;
      }
    };
  }, []);

  return null;
}

