import {
  createElement,
  ImgHTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Global set of image URLs that have already been fetched & decoded in this session.
 * Allows instant rendering without fade-in delay when the same project artwork
 * appears in the Orbit Selector, Selected Work card, or Project Brief dialog.
 */
const decodedImageCache = new Set<string>();

/** Minimal zero-network obsidian SVG data URI used before an off-screen image enters the viewport */
export const OBSIDIAN_LAZY_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'%3E%3Crect width='16' height='10' fill='%230b0815'/%3E%3C/svg%3E";

export interface UseLazyImageOptions {
  /** Target high-resolution image URL */
  src: string;
  /** Optional low-res base64/SVG placeholder before intersection */
  placeholderSrc?: string;
  /** Optional external boolean to control when loading is permitted */
  enabled?: boolean;
  /** IntersectionObserver rootMargin (default: "280px 0px" to pre-fetch just ahead of scroll) */
  rootMargin?: string;
  /** IntersectionObserver threshold (default: 0.01) */
  threshold?: number | number[];
  /** Optional callback invoked once the image is fetched and off-thread decoded */
  onLoad?: () => void;
}

export interface UseLazyImageReturn<T extends HTMLElement = HTMLElement> {
  /** Attach to a wrapper element if observing a container */
  containerRef: React.RefObject<T | null>;
  /** Attach to the actual <img> element */
  imgRef: React.RefObject<HTMLImageElement | null>;
  /** The active src attribute to pass to <img> (placeholder or undefined until in view) */
  currentSrc: string | undefined;
  /** Whether the element has entered the IntersectionObserver region */
  isIntersecting: boolean;
  /** Whether the full-resolution image has completed loading and off-thread decoding */
  isLoaded: boolean;
  /** Attach to the <img> onLoad prop */
  handleLoad: () => void;
}

/**
 * Custom Intersection Observer hook for lazy-loading project showcase images.
 * - Defers network requests for off-screen project artwork until the card approaches the viewport.
 * - Decodes image bitmaps off the main thread (`img.decode()`) before marking as loaded so
 *   scrolling remains at a locked 60fps with zero main-thread texture upload jank.
 */
export function useLazyImage<T extends HTMLElement = HTMLDivElement>({
  src,
  placeholderSrc,
  enabled = true,
  rootMargin = "280px 0px",
  threshold = 0.01,
  onLoad,
}: UseLazyImageOptions): UseLazyImageReturn<T> {
  const alreadyCached = Boolean(src && decodedImageCache.has(src));
  const containerRef = useRef<T | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(alreadyCached);
  const [isLoaded, setIsLoaded] = useState<boolean>(alreadyCached);
  const decodeInFlightRef = useRef(false);
  const prevSrcRef = useRef(src);

  // Reset state cleanly if the `src` prop changes dynamically (e.g. ProjectOrbitSelector switcher)
  if (prevSrcRef.current !== src) {
    prevSrcRef.current = src;
    const cached = Boolean(src && decodedImageCache.has(src));
    decodeInFlightRef.current = false;
    if (cached && !isLoaded) {
      setIsLoaded(true);
    } else if (!cached && isLoaded) {
      setIsLoaded(false);
    }
  }

  useEffect(() => {
    if (!enabled) return;

    if (src && decodedImageCache.has(src)) {
      setIsIntersecting(true);
      setIsLoaded(true);
      return;
    }

    if (isIntersecting) return;

    const targetEl = containerRef.current ?? imgRef.current;
    if (!targetEl) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(targetEl);

    return () => {
      observer.disconnect();
    };
  }, [enabled, isIntersecting, rootMargin, src, threshold]);

  const finalizeDecode = useCallback(
    (img: HTMLImageElement) => {
      if (!src) return;
      if (decodedImageCache.has(src)) {
        if (!isLoaded) {
          setIsLoaded(true);
          onLoad?.();
        }
        return;
      }
      if (decodeInFlightRef.current) return;
      decodeInFlightRef.current = true;

      const markReady = () => {
        decodeInFlightRef.current = false;
        decodedImageCache.add(src);
        setIsLoaded(true);
        onLoad?.();
      };

      if (typeof img.decode === "function") {
        img.decode().then(markReady).catch(markReady);
      } else {
        markReady();
      }
    },
    [isLoaded, onLoad, src]
  );

  // Check if browser already has the image complete in cache once intersection triggers
  useEffect(() => {
    if (!enabled || !isIntersecting || isLoaded) return;
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      finalizeDecode(img);
    }
  }, [enabled, finalizeDecode, isIntersecting, isLoaded, src]);

  const handleLoad = useCallback(() => {
    if (!enabled || !isIntersecting) return;
    const img = imgRef.current;
    if (img) {
      finalizeDecode(img);
    } else {
      if (src) decodedImageCache.add(src);
      setIsLoaded(true);
      onLoad?.();
    }
  }, [enabled, finalizeDecode, isIntersecting, onLoad, src]);

  const shouldActivateSrc = enabled && isIntersecting;
  const currentSrc = shouldActivateSrc ? src : placeholderSrc;

  return {
    containerRef,
    imgRef,
    currentSrc,
    isIntersecting: shouldActivateSrc,
    isLoaded,
    handleLoad,
  };
}

export function markImagePredecoded(src: string): void {
  if (src) {
    decodedImageCache.add(src);
  }
}

export interface LazyProjectImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "onLoad"> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
  onImageLoaded?: () => void;
}

/**
 * Drop-in lazy-loaded project showcase image component powered by `useLazyImage`.
 * Defers off-screen network fetches using `IntersectionObserver` and performs
 * asynchronous off-thread bitmap decoding before smoothly revealing the artwork.
 */
export const LazyProjectImage = memo(function LazyProjectImage({
  src,
  alt,
  placeholderSrc = OBSIDIAN_LAZY_PLACEHOLDER,
  rootMargin = "280px 0px",
  threshold = 0.01,
  enabled = true,
  onImageLoaded,
  className = "",
  style,
  ...rest
}: LazyProjectImageProps) {
  const { imgRef, currentSrc, isIntersecting, isLoaded, handleLoad } =
    useLazyImage<HTMLImageElement>({
      src,
      placeholderSrc,
      enabled,
      rootMargin,
      threshold,
      onLoad: onImageLoaded,
    });

  return createElement("img", {
    ...rest,
    ref: imgRef,
    src: currentSrc,
    alt,
    loading: "lazy",
    decoding: "async",
    onLoad: isIntersecting ? handleLoad : undefined,
    "data-lazy-loaded": isLoaded ? "true" : "false",
    className: `${className} ${isLoaded ? "is-lazy-loaded" : "is-lazy-pending"}`.trim(),
    style,
  });
});

