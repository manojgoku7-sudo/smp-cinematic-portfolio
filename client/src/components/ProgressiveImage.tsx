import { memo } from "react";
import { useLazyImage } from "@/hooks/useLazyImage";

export interface ProgressiveImageProps {
  /** The full-resolution image asset URL */
  src: string;
  /** Low-resolution base64 data URI or small blurred asset */
  placeholderSrc: string;
  /** Accessible alt text for the image */
  alt: string;
  /** Optional external viewport trigger (e.g. section-level IntersectionObserver) */
  shouldLoad?: boolean;
  /** Intrinsic image width to reserve layout space and prevent reflow */
  width?: number;
  /** Intrinsic image height to reserve layout space and prevent reflow */
  height?: number;
  /** Network fetch priority hint */
  fetchPriority?: "high" | "low" | "auto";
  /** Container CSS classes */
  className?: string;
  /** Custom class for the placeholder img */
  placeholderClassName?: string;
  /** Custom class for the full image */
  fullImageClassName?: string;
  /** Root margin for IntersectionObserver triggering when shouldLoad is not provided */
  rootMargin?: string;
  /** Intersection threshold */
  threshold?: number | number[];
  /** Callback when the full-resolution image has finished loading & decoding */
  onLoad?: () => void;
  /** Whether reduced motion / motion paused is active */
  motionPaused?: boolean;
}

/**
 * ProgressiveImage provides zero-reflow viewport-gated lazy loading and off-thread decoding
 * powered by `useLazyImage`:
 * - Renders an inline base64 LQIP placeholder immediately at zero network cost.
 * - Keeps the full-resolution <img> pre-mounted in the DOM with fixed width/height
 *   geometry so activating `src` never triggers a DOM node insertion layout shift.
 * - Uses HTMLImageElement.decode() off the main thread before cross-fading opacity.
 */
export const ProgressiveImage = memo(function ProgressiveImage({
  src,
  placeholderSrc,
  alt,
  shouldLoad,
  width = 1000,
  height = 1500,
  fetchPriority = "low",
  className = "",
  placeholderClassName = "",
  fullImageClassName = "",
  rootMargin = "220px 0px",
  threshold = 0.01,
  onLoad,
  motionPaused = false,
}: ProgressiveImageProps) {
  const { containerRef, imgRef, currentSrc, isIntersecting, isLoaded, handleLoad } =
    useLazyImage<HTMLDivElement>({
      src,
      enabled: typeof shouldLoad === "boolean" ? shouldLoad : true,
      rootMargin,
      threshold,
      onLoad,
    });

  return (
    <div
      ref={containerRef}
      className={`progressive-image-container ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* 1. Low-res blurred placeholder (instantly rendered via inline base64 with fixed dimensions) */}
      <img
        src={placeholderSrc}
        alt=""
        width={width}
        height={height}
        aria-hidden="true"
        role="presentation"
        decoding="async"
        className={`progressive-placeholder ${isLoaded ? "is-loaded" : ""} ${placeholderClassName}`}
        style={motionPaused ? { transition: "none" } : undefined}
      />

      {/* 2. Pre-mounted full-resolution image: src is only assigned once in viewport */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        fetchPriority={fetchPriority}
        referrerPolicy="no-referrer"
        onLoad={isIntersecting ? handleLoad : undefined}
        aria-hidden={!isLoaded}
        className={`progressive-full-image ${isLoaded ? "is-loaded" : ""} ${fullImageClassName}`}
        style={motionPaused ? { transition: "none" } : undefined}
      />
    </div>
  );
});

export default ProgressiveImage;

