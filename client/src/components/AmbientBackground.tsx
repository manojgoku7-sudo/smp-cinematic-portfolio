import React, { useEffect, useRef } from "react";

interface AmbientBackgroundProps {
  motionPaused?: boolean;
  reduceMotion?: boolean;
  lowDataMode?: boolean;
}

export function AmbientBackground({
  motionPaused = false,
  reduceMotion = false,
  lowDataMode = false,
}: AmbientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetPercentX = useRef(50);
  const targetPercentY = useRef(50);
  const currentPercentX = useRef(50);
  const currentPercentY = useRef(50);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion || lowDataMode) {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--bg-shift-x", "0px");
        containerRef.current.style.setProperty("--bg-shift-y", "0px");
        containerRef.current.style.setProperty("--cursor-pos-x", "50%");
        containerRef.current.style.setProperty("--cursor-pos-y", "50%");
      }
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize cursor coordinate from -1 to 1 relative to screen center
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const normX = (e.clientX / width) * 2 - 1;
      const normY = (e.clientY / height) * 2 - 1;

      // Subtle, elegant displacement range in pixels
      targetX.current = normX * 38;
      targetY.current = normY * 30;

      targetPercentX.current = (e.clientX / width) * 100;
      targetPercentY.current = (e.clientY / height) * 100;
    };

    const handlePointerLeave = () => {
      // Smoothly re-center when mouse leaves viewport
      targetX.current = 0;
      targetY.current = 0;
      targetPercentX.current = 50;
      targetPercentY.current = 50;
    };

    let isRunning = true;
    let isLoopActive = false;

    const requestNextTick = () => {
      if (!isLoopActive && isRunning) {
        isLoopActive = true;
        animFrameId.current = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      if (!isRunning) {
        isLoopActive = false;
        return;
      }

      if (!motionPaused) {
        // Smooth exponential damping (lerp) for liquid-silk response
        const damping = 0.06;
        const diffX = targetX.current - currentX.current;
        const diffY = targetY.current - currentY.current;
        const diffPX = targetPercentX.current - currentPercentX.current;
        const diffPY = targetPercentY.current - currentPercentY.current;

        const isMoving =
          Math.abs(diffX) > 0.02 ||
          Math.abs(diffY) > 0.02 ||
          Math.abs(diffPX) > 0.02 ||
          Math.abs(diffPY) > 0.02;

        if (isMoving) {
          currentX.current += diffX * damping;
          currentY.current += diffY * damping;
          currentPercentX.current += diffPX * damping;
          currentPercentY.current += diffPY * damping;

          if (containerRef.current) {
            containerRef.current.style.setProperty(
              "--bg-shift-x",
              `${currentX.current.toFixed(2)}px`
            );
            containerRef.current.style.setProperty(
              "--bg-shift-y",
              `${currentY.current.toFixed(2)}px`
            );
            containerRef.current.style.setProperty(
              "--cursor-pos-x",
              `${currentPercentX.current.toFixed(2)}%`
            );
            containerRef.current.style.setProperty(
              "--cursor-pos-y",
              `${currentPercentY.current.toFixed(2)}%`
            );
          }
          animFrameId.current = requestAnimationFrame(animate);
          return;
        } else {
          // Settle precisely without continuous repaints
          currentX.current = targetX.current;
          currentY.current = targetY.current;
          currentPercentX.current = targetPercentX.current;
          currentPercentY.current = targetPercentY.current;

          if (containerRef.current) {
            containerRef.current.style.setProperty(
              "--bg-shift-x",
              `${currentX.current.toFixed(2)}px`
            );
            containerRef.current.style.setProperty(
              "--bg-shift-y",
              `${currentY.current.toFixed(2)}px`
            );
            containerRef.current.style.setProperty(
              "--cursor-pos-x",
              `${currentPercentX.current.toFixed(2)}%`
            );
            containerRef.current.style.setProperty(
              "--cursor-pos-y",
              `${currentPercentY.current.toFixed(2)}%`
            );
          }
        }
      }

      isLoopActive = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      handlePointerMove(e);
      requestNextTick();
    };

    const onPointerLeave = () => {
      handlePointerLeave();
      requestNextTick();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave, { passive: true });

    // Initial settle
    requestNextTick();

    return () => {
      isRunning = false;
      isLoopActive = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [motionPaused, reduceMotion, lowDataMode]);

  return (
    <div
      ref={containerRef}
      className={`ambient-cinematic-bg ${motionPaused ? "is-motion-paused" : ""} ${
        lowDataMode ? "is-low-data" : ""
      }`}
      aria-hidden="true"
    >
      <div className="ambient-orb ambient-orb-primary" />
      <div className="ambient-orb ambient-orb-secondary" />
      <div className="ambient-orb ambient-orb-tertiary" />
      <div className="ambient-orb ambient-orb-cursor" />
      <div className="ambient-vignette" />
    </div>
  );
}
