import React from "react";
import { useGlobalPointer } from "@/hooks/useGlobalPointer";

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
  useGlobalPointer({
    paused: motionPaused,
    disabled: reduceMotion || lowDataMode,
  });

  return (
    <div
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
