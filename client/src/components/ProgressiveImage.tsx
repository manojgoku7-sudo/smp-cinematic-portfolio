import { useEffect, useRef, useState } from "react";

export interface ProgressiveImageProps {
  /** The full-resolution image asset URL */
  src: string;
  /** Low-resolution base64 data URI or small blurred asset */
  placeholderSrc: string;
  /** Accessible alt text for the image */
  alt: string;
  /** Container CSS classes */
  className?: string;
  /** Custom class for the placeholder img */
  placeholderClassName?: string;
  /** Custom class for the full image */
  fullImageClassName?: string;
  /** Root margin for IntersectionObserver triggering */
  rootMargin?: string;
  /** Intersection threshold */
  threshold?: number | number[];
  /** Callback when the full-resolution image has finished loading */
  onLoad?: () => void;
  /** Whether reduced motion / motion paused is active */
  motionPaused?: boolean;
}

/**
 * ProgressiveImage provides silky-smooth progressive image loading.
 * Displays a blurred base64 placeholder instantly with zero network latency,
 * and seamlessly cross-fades into the full-resolution asset once triggered
 * by an IntersectionObserver.
 */
export function ProgressiveImage({
  src,
  placeholderSrc,
  alt,
  className = "",
  placeholderClassName = "",
  fullImageClassName = "",
  rootMargin = "180px 0px",
  threshold = 0.01,
  onLoad,
  motionPaused = false,
}: ProgressiveImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullImageRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Observe intersection with viewport
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  // 2. Check if the full image is already cached/complete once in view
  useEffect(() => {
    if (isInView && fullImageRef.current) {
      if (fullImageRef.current.complete && fullImageRef.current.naturalWidth > 0) {
        setIsLoaded(true);
        onLoad?.();
      }
    }
  }, [isInView, onLoad]);

  const handleFullImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div
      ref={containerRef}
      className={`progressive-image-container ${className}`}
    >
      {/* 1. Low-res blurred placeholder (instantly rendered via inline base64) */}
      <img
        src={placeholderSrc}
        alt=""
        aria-hidden="true"
        role="presentation"
        className={`progressive-placeholder ${isLoaded ? "is-loaded" : ""} ${placeholderClassName}`}
        style={motionPaused ? { transition: "none" } : undefined}
      />

      {/* 2. Full-resolution image triggered by IntersectionObserver */}
      {isInView && (
        <img
          ref={fullImageRef}
          src={src}
          alt={alt}
          onLoad={handleFullImageLoad}
          className={`progressive-full-image ${isLoaded ? "is-loaded" : ""} ${fullImageClassName}`}
          decoding="async"
          loading="lazy"
          style={motionPaused ? { transition: "none" } : undefined}
        />
      )}
    </div>
  );
}

export default ProgressiveImage;
