import { FC, useState, useRef, useEffect, useCallback, MouseEvent, FocusEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface MagneticNavProps {
  items: readonly (readonly [string, string])[] | [string, string][];
  activeId: string;
  onSelect: (id: string) => void;
  motionPaused?: boolean;
}

interface LineState {
  left: number;
  width: number;
  ready: boolean;
}

export const MagneticNav: FC<MagneticNavProps> = ({
  items,
  activeId,
  onSelect,
  motionPaused = false,
}) => {
  const prefersReduced = useReducedMotion();
  const shouldReduceMotion = prefersReduced || motionPaused;

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [lineState, setLineState] = useState<LineState>({
    left: 0,
    width: 0,
    ready: false,
  });

  // Calculate coordinates of a target item relative to the nav container
  const computePosition = useCallback(
    (targetId: string, extraX = 0) => {
      const navEl = navRef.current;
      const targetBtn = itemRefs.current[targetId];

      if (!navEl || !targetBtn) return null;

      const navRect = navEl.getBoundingClientRect();
      const btnRect = targetBtn.getBoundingClientRect();

      return {
        left: btnRect.left - navRect.left + extraX,
        width: btnRect.width,
        ready: true,
      };
    },
    []
  );

  // Position underline at activeId or hovered item
  const updateLine = useCallback(
    (targetId: string, extraX = 0) => {
      const pos = computePosition(targetId, extraX);
      if (pos) {
        setLineState(pos);
      }
    },
    [computePosition]
  );

  // When activeId changes or when hoveredId changes, update position
  useEffect(() => {
    const target = hoveredId || activeId;
    updateLine(target, hoveredId ? magneticOffset.x : 0);
  }, [activeId, hoveredId, updateLine, magneticOffset.x]);

  // Initial measurement and window resize listener
  useEffect(() => {
    const handleResize = () => {
      const target = hoveredId || activeId;
      updateLine(target, 0);
    };

    // Initial measure after mount/fonts loaded
    const timer = setTimeout(handleResize, 50);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeId, hoveredId, updateLine]);

  // Handle magnetic cursor pull on mouse move
  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    if (shouldReduceMotion) return;

    const btn = itemRefs.current[id];
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Fluid magnetic displacement towards cursor
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.18;

    const clampedX = Math.max(-6, Math.min(6, deltaX));
    const clampedY = Math.max(-3, Math.min(3, deltaY));

    setMagneticOffset({ x: clampedX, y: clampedY });
    updateLine(id, clampedX);
  };

  const handleMouseEnter = (id: string) => {
    setHoveredId(id);
    updateLine(id, 0);
  };

  const handleMouseLeaveNav = () => {
    // Snap back to active link
    setHoveredId(null);
    setMagneticOffset({ x: 0, y: 0 });
    updateLine(activeId, 0);
  };

  const handleFocus = (id: string) => {
    setHoveredId(id);
    setMagneticOffset({ x: 0, y: 0 });
    updateLine(id, 0);
  };

  const handleBlur = () => {
    setHoveredId(null);
    setMagneticOffset({ x: 0, y: 0 });
    updateLine(activeId, 0);
  };

  return (
    <nav
      ref={navRef}
      className="magnetic-nav hidden items-center gap-7 lg:flex"
      aria-label="Primary navigation"
      onMouseLeave={handleMouseLeaveNav}
    >
      {/* Fluid Magnetic Underline Indicator */}
      <motion.div
        className="magnetic-nav-track"
        initial={false}
        animate={{
          x: lineState.left,
          width: lineState.width,
          opacity: lineState.ready ? 1 : 0,
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : hoveredId
            ? {
                type: "spring",
                stiffness: 420,
                damping: 30,
                mass: 0.6,
              }
            : {
                // Snappy fluid snap-back to the active link
                type: "spring",
                stiffness: 480,
                damping: 26,
                mass: 0.7,
              }
        }
      >
        <div className="magnetic-nav-line" />
        <div className={`magnetic-nav-glow ${hoveredId ? "is-active" : ""}`} />
        <div className="magnetic-nav-spark" />
      </motion.div>

      {/* Nav Link Buttons with subtle magnetic attraction */}
      {items.map(([label, id]) => {
        const isActive = activeId === id;
        const isHovered = hoveredId === id;

        return (
          <motion.button
            key={id}
            ref={(el) => {
              itemRefs.current[id] = el;
            }}
            className={`nav-link ${isActive ? "is-active" : ""} ${isHovered ? "is-hovered" : ""}`}
            onClick={() => onSelect(id)}
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseMove={(e) => handleMouseMove(e, id)}
            onFocus={() => handleFocus(id)}
            onBlur={handleBlur}
            animate={{
              x: !shouldReduceMotion && isHovered ? magneticOffset.x * 0.45 : 0,
              y: !shouldReduceMotion && isHovered ? magneticOffset.y * 0.45 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.5,
            }}
          >
            {label}
          </motion.button>
        );
      })}
    </nav>
  );
};
