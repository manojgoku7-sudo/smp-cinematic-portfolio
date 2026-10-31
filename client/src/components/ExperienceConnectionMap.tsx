import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Code2,
  Sparkles,
  Layers3,
  CheckCircle2,
  MousePointerClick,
  Info,
} from "lucide-react";

export interface ExperienceConnectionMapProps {
  initialRoleIndex?: number;
  motionPaused: boolean;
}

interface SkillNode {
  id: string;
  name: string;
  category: string;
  angleDeg: number;
  cx: number;
  cy: number;
  primaryInRoles: number[];
  roleContributions: Record<number, string>;
}

const CENTER_X = 230;
const CENTER_Y = 195;
const CORE_OUTER_R = 55;
const BADGE_W = 116;
const BADGE_H = 34;

// 8 radial skill nodes arranged symmetrically in SVG space (Center: 230, 195 | ViewBox: 460 x 390)
const SKILL_NODES: SkillNode[] = [
  {
    id: "java",
    name: "Java SE / EE",
    category: "Core Language",
    angleDeg: 270,
    cx: 230,
    cy: 48,
    primaryInRoles: [0],
    roleContributions: {
      0: "Engineered core backend business logic, validation rules, and transaction handlers.",
      1: "Referenced for backend API compatibility during design-to-code reviews.",
      2: "Used as the structural data model reference for UI state management.",
    },
  },
  {
    id: "spring-boot",
    name: "Spring Boot",
    category: "Microservices",
    angleDeg: 315,
    cx: 342,
    cy: 95,
    primaryInRoles: [0],
    roleContributions: {
      0: "Created high-throughput REST controllers, dependency injection modules, and security filters.",
      1: "Informed API contract mockups for seamless client-server handoff.",
      2: "Aligned server data models with mobile component state.",
    },
  },
  {
    id: "rest-apis",
    name: "RESTful APIs",
    category: "Architecture",
    angleDeg: 0,
    cx: 380,
    cy: 195,
    primaryInRoles: [0],
    roleContributions: {
      0: "Designed and shipped 8+ REST endpoints for authentication, rides, and route tracking.",
      1: "Drafted user journey specs mapped to asynchronous API payloads.",
      2: "Ensured payload consistency with client-side component architectures.",
    },
  },
  {
    id: "mysql",
    name: "MySQL Engine",
    category: "Relational DB",
    angleDeg: 45,
    cx: 342,
    cy: 295,
    primaryInRoles: [0],
    roleContributions: {
      0: "Structured normalized relational schemas, foreign-key relations, and indexed queries.",
      1: "Modeled relational user data paths for dashboard views.",
      2: "Informed tabular UI components and data density specifications.",
    },
  },
  {
    id: "mobile-flows",
    name: "Mobile UX Flows",
    category: "User Journeys",
    angleDeg: 90,
    cx: 230,
    cy: 342,
    primaryInRoles: [1, 2],
    roleContributions: {
      0: "Mapped endpoint response formats to mobile rider and driver screens.",
      1: "Architected end-to-end task workflows, reducing friction across critical user journeys.",
      2: "Designed fluid mobile screen transitions following Android Material guidelines.",
    },
  },
  {
    id: "figma",
    name: "Figma Systems",
    category: "Vector Design",
    angleDeg: 135,
    cx: 118,
    cy: 295,
    primaryInRoles: [1, 2],
    roleContributions: {
      0: "Used for reviewing UI mockups against backend service boundaries.",
      1: "Designed 10+ interactive responsive screens and functional micro-prototypes.",
      2: "Built scalable UI kit with unified color tokens, typographic hierarchy, and auto-layout.",
    },
  },
  {
    id: "usability",
    name: "Usability Testing",
    category: "User Research",
    angleDeg: 180,
    cx: 80,
    cy: 195,
    primaryInRoles: [1],
    roleContributions: {
      0: "Benchmarked API response latency against perceived user task completion time.",
      1: "Led 3 iterative test cycles with qualitative heuristics, cutting handoff lag by 25%.",
      2: "Validated component accessibility, contrast ratios, and touch target sizes.",
    },
  },
  {
    id: "components",
    name: "UI Components",
    category: "Design System",
    angleDeg: 225,
    cx: 118,
    cy: 95,
    primaryInRoles: [1, 2],
    roleContributions: {
      0: "Standardized error messages and status payload formats for frontend widgets.",
      1: "Engineered modular card patterns, input fields, and dynamic modal overlays.",
      2: "Shipped library of 20+ reusable components accelerating screen delivery by 30%.",
    },
  },
];

// Precompute exact core-perimeter start point and badge-edge docking port for each node
const NODE_GEOMETRY = SKILL_NODES.map((node) => {
  const dx = node.cx - CENTER_X;
  const dy = node.cy - CENTER_Y;
  const dist = Math.hypot(dx, dy) || 1;
  const startX = +(CENTER_X + (dx / dist) * CORE_OUTER_R).toFixed(2);
  const startY = +(CENTER_Y + (dy / dist) * CORE_OUTER_R).toFixed(2);

  // Ray from node center back toward radar center to find exact perimeter intersection on badge rect
  const ux = -dx;
  const uy = -dy;
  const hw = BADGE_W / 2;
  const hh = BADGE_H / 2;
  const tx = ux !== 0 ? hw / Math.abs(ux) : Infinity;
  const ty = uy !== 0 ? hh / Math.abs(uy) : Infinity;
  const t = Math.min(tx, ty);
  const portX = +(node.cx + ux * t).toFixed(2);
  const portY = +(node.cy + uy * t).toFixed(2);

  // Midpoint along the visible conduit segment
  const midX = +((startX + portX) / 2).toFixed(2);
  const midY = +((startY + portY) / 2).toFixed(2);

  return {
    ...node,
    startX,
    startY,
    portX,
    portY,
    midX,
    midY,
  };
});

// 36 azimuth ticks around r=128
const AZIMUTH_TICKS = Array.from({ length: 36 }, (_, idx) => {
  const deg = idx * 10;
  const rad = (deg * Math.PI) / 180;
  const isCardinal = deg % 90 === 0;
  const isMajor = deg % 45 === 0;
  const rInner = isCardinal ? 121 : isMajor ? 123.5 : 125.5;
  const rOuter = 128;
  return {
    deg,
    isMajor,
    x1: +(CENTER_X + rInner * Math.cos(rad)).toFixed(2),
    y1: +(CENTER_Y + rInner * Math.sin(rad)).toFixed(2),
    x2: +(CENTER_X + rOuter * Math.cos(rad)).toFixed(2),
    y2: +(CENTER_Y + rOuter * Math.sin(rad)).toFixed(2),
  };
});

const ROLES_INFO = [
  {
    id: "build",
    index: 0,
    tabNumber: "01",
    tabLabel: "Back-End Systems",
    disciplineTitle: "BACK-END ENGINEERING",
    role: "Project Intern",
    company: "Infosys Springboard",
    place: "Remote",
    period: "09/2025 — 11/2025",
    focus: "Java Service Delivery",
    tagline:
      "Dynamic carpooling platform engineered with Java, Spring Boot, and normalized MySQL schemas.",
    impactSignal: "8+ Shipped REST APIs · High-Throughput Routing",
    activeSkillIds: ["java", "spring-boot", "rest-apis", "mysql"],
    icon: Code2,
    themeColor: "#a78bfa",
    themeSecondary: "#c4b5fd",
    themeRgb: "167, 139, 250",
    beamGradientId: "beam-gradient-backend",
  },
  {
    id: "research",
    index: 1,
    tabNumber: "02",
    tabLabel: "Product Design",
    disciplineTitle: "RESEARCH & INTERACTION",
    role: "UI/UX Design Intern",
    company: "Fluezen Technology",
    place: "Chennai, India",
    period: "01/2024 — 03/2024",
    focus: "Usability & Iteration",
    tagline:
      "Designed 10+ mobile & web screens in Figma across 3 iterative testing cycles, cutting handoff time by 25%.",
    impactSignal: "3 Review Cycles · 10+ Shipped Screens · 25% Faster Handoff",
    activeSkillIds: ["figma", "usability", "components", "mobile-flows"],
    icon: Sparkles,
    themeColor: "#38bdf8",
    themeSecondary: "#bae6fd",
    themeRgb: "56, 189, 248",
    beamGradientId: "beam-gradient-research",
  },
  {
    id: "systems",
    index: 2,
    tabNumber: "03",
    tabLabel: "Design Systems",
    disciplineTitle: "SYSTEMS ARCHITECTURE",
    role: "UI/UX Design Intern",
    company: "Kaashiv Infotech",
    place: "Chennai, India",
    period: "06/2023 — 08/2023",
    focus: "Mobile UI Components",
    tagline:
      "Standardized a 20+ component library adhering to Material Design for Android, cutting design time by 30%.",
    impactSignal: "20+ Modular Components · 30% Design Acceleration",
    activeSkillIds: ["figma", "components", "mobile-flows"],
    icon: Layers3,
    themeColor: "#f472b6",
    themeSecondary: "#fbcfe8",
    themeRgb: "244, 114, 182",
    beamGradientId: "beam-gradient-systems",
  },
];

export function ExperienceConnectionMap({
  initialRoleIndex = 0,
  motionPaused,
}: ExperienceConnectionMapProps) {
  const reduceMotion = useReducedMotion();
  const staticMotion = Boolean(reduceMotion || motionPaused);

  const [selectedRoleIndex, setSelectedRoleIndex] = useState(initialRoleIndex);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  const safeIndex = Math.max(0, Math.min(selectedRoleIndex, ROLES_INFO.length - 1));
  const activeRole = ROLES_INFO[safeIndex];

  const activeSkillSet = useMemo(() => {
    return new Set(activeRole.activeSkillIds);
  }, [activeRole]);

  const hoveredNode = useMemo(() => {
    if (!hoveredSkillId) return null;
    return NODE_GEOMETRY.find((node) => node.id === hoveredSkillId) || null;
  }, [hoveredSkillId]);

  // Polygon path connecting active docking ports + radar center to form a harmonic constellation sector
  const activeConstellationPoints = useMemo(() => {
    const activeNodes = NODE_GEOMETRY.filter((n) => activeSkillSet.has(n.id));
    if (activeNodes.length === 0) return "";
    const pts = [
      `${CENTER_X},${CENTER_Y}`,
      ...activeNodes.map((n) => `${n.portX},${n.portY}`),
    ];
    return pts.join(" ");
  }, [activeSkillSet]);

  return (
    <div
      id="skills-role-radar-card"
      className="experience-connection-map-redesign"
      aria-label="Interactive skills and role connection matrix"
    >
      {/* Top Header Row */}
      <div className="ecm-header-redesign">
        <div className="ecm-header-left">
          <div className="flex items-center gap-2">
            <span className="ecm-pulse-dot" aria-hidden="true" />
            <h4 className="ecm-main-heading">Skills & Role Radar</h4>
          </div>
          <p className="ecm-sub-heading">
            Trace active tools, architectures, and systems across verified production roles.
          </p>
        </div>
      </div>

      {/* 3-Tab Segmented Selector Dock */}
      <div className="ecm-tabs-row" role="tablist" aria-label="Experience production roles">
        {ROLES_INFO.map((role, index) => {
          const isSelected = index === safeIndex;
          return (
            <button
              key={role.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              id={`ecm-role-tab-${role.id}`}
              className={`ecm-tab-btn ${isSelected ? "is-selected" : ""}`}
              onClick={() => setSelectedRoleIndex(index)}
              style={
                isSelected
                  ? ({
                      "--tab-accent": role.themeColor,
                      "--tab-rgb": role.themeRgb,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <span className="ecm-tab-idx">{role.tabNumber}</span>
              <span className="ecm-tab-name">{role.tabLabel}</span>
              {isSelected && !staticMotion && (
                <motion.span
                  layoutId="ecm-active-tab-glow"
                  className="ecm-tab-glow-indicator"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Unified Precision SVG Radar Stage (Center: 230, 195 | Width: 460 | Height: 390) */}
      <div className="ecm-radar-stage" aria-live="polite">
        <svg
          className="ecm-radar-svg"
          viewBox="0 0 460 390"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Ambient Background Glow for Active Mode */}
            <radialGradient
              id="ecm-center-glow"
              cx="230"
              cy="195"
              r="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={activeRole.themeColor} stopOpacity="0.24" />
              <stop offset="52%" stopColor={activeRole.themeColor} stopOpacity="0.07" />
              <stop offset="100%" stopColor="#080710" stopOpacity="0" />
            </radialGradient>

            {/* UserSpaceOnUse Radial Beam Gradients so horizontal & vertical beams render with full intensity */}
            <radialGradient
              id="beam-gradient-backend"
              cx="230"
              cy="195"
              r="142"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="28%" stopColor="#ffffff" stopOpacity="0.98" />
              <stop offset="65%" stopColor="#c4b5fd" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.78" />
            </radialGradient>
            <radialGradient
              id="beam-gradient-research"
              cx="230"
              cy="195"
              r="142"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="28%" stopColor="#ffffff" stopOpacity="0.98" />
              <stop offset="65%" stopColor="#7dd3fc" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.78" />
            </radialGradient>
            <radialGradient
              id="beam-gradient-systems"
              cx="230"
              cy="195"
              r="142"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="28%" stopColor="#ffffff" stopOpacity="0.98" />
              <stop offset="65%" stopColor="#f472b6" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#db2777" stopOpacity="0.78" />
            </radialGradient>

            {/* Active Constellation Sector Fill */}
            <radialGradient
              id="ecm-constellation-fill"
              cx="230"
              cy="195"
              r="138"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={activeRole.themeColor} stopOpacity="0.18" />
              <stop offset="70%" stopColor={activeRole.themeColor} stopOpacity="0.06" />
              <stop offset="100%" stopColor={activeRole.themeColor} stopOpacity="0.01" />
            </radialGradient>

            {/* Revolving Radar Sweep Sector Gradient */}
            <linearGradient id="ecm-sweep-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={activeRole.themeColor} stopOpacity="0.22" />
              <stop offset="55%" stopColor={activeRole.themeColor} stopOpacity="0.05" />
              <stop offset="100%" stopColor={activeRole.themeColor} stopOpacity="0" />
            </linearGradient>

            {/* Beam Soft Glow Filter */}
            <filter id="ecm-filter-blur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Photon Particle Spark Filter */}
            <filter id="ecm-particle-spark" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Ambient Radial Field */}
          <circle cx={CENTER_X} cy={CENTER_Y} r="152" fill="url(#ecm-center-glow)" />

          {/* 2. Precision Telemetry Rings, Azimuth Ticks & Axis Hairlines */}
          <g className="ecm-grid-geometry">
            {/* Cardinal & Diagonal Reference Hairlines */}
            <line
              x1="92"
              y1={CENTER_Y}
              x2="368"
              y2={CENTER_Y}
              stroke="rgba(196, 181, 253, 0.11)"
              strokeWidth="1"
              strokeDasharray="2 5"
            />
            <line
              x1={CENTER_X}
              y1="62"
              x2={CENTER_X}
              y2="328"
              stroke="rgba(196, 181, 253, 0.11)"
              strokeWidth="1"
              strokeDasharray="2 5"
            />
            <line
              x1="136"
              y1="101"
              x2="324"
              y2="289"
              stroke="rgba(196, 181, 253, 0.07)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
            <line
              x1="324"
              y1="101"
              x2="136"
              y2="289"
              stroke="rgba(196, 181, 253, 0.07)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />

            {/* Outer Azimuth Telemetry Ring (r: 128) */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="128"
              fill="none"
              stroke="rgba(196, 181, 253, 0.14)"
              strokeWidth="1"
            />

            {/* 36 Azimuth Degree Ticks */}
            {AZIMUTH_TICKS.map((t) => (
              <line
                key={t.deg}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke={
                  t.isMajor
                    ? `rgba(${activeRole.themeRgb}, 0.38)`
                    : "rgba(196, 181, 253, 0.15)"
                }
                strokeWidth={t.isMajor ? "1.2" : "0.8"}
              />
            ))}

            {/* Counter-Rotating Outer Orbital Track (r: 112) */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="112"
              fill="none"
              stroke="rgba(196, 181, 253, 0.18)"
              strokeWidth="1"
              strokeDasharray="5 7"
              className={staticMotion ? "" : "ecm-spin-orbit-slow"}
            />

            {/* Mid Harmonic Ring (r: 86) */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="86"
              fill="none"
              stroke={`rgba(${activeRole.themeRgb}, 0.2)`}
              strokeWidth="1"
              strokeDasharray="3 6 12 6"
              className={staticMotion ? "" : "ecm-spin-orbit-rev"}
            />

            {/* Inner Core Perimeter Track (r: 62) */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="62"
              fill="none"
              stroke="rgba(224, 212, 255, 0.2)"
              strokeWidth="1"
            />
          </g>

          {/* 3. Revolving Radar Scanner Sector & Harmonic Constellation Mesh */}
          {activeConstellationPoints && (
            <polygon
              points={activeConstellationPoints}
              fill="url(#ecm-constellation-fill)"
              stroke={`rgba(${activeRole.themeRgb}, 0.22)`}
              strokeWidth="1"
              strokeDasharray="3 4"
              className="ecm-constellation-polygon"
            />
          )}

          {!staticMotion && (
            <g className="ecm-radar-sweep-group">
              {/* 55-degree radar scanner wedge */}
              <path
                d={`M ${CENTER_X} ${CENTER_Y} L ${CENTER_X} ${CENTER_Y - 126} A 126 126 0 0 1 ${
                  CENTER_X + 103.2
                } ${CENTER_Y - 72.3} Z`}
                fill="url(#ecm-sweep-grad)"
              />
              {/* Leading scanner laser line */}
              <line
                x1={CENTER_X}
                y1={CENTER_Y}
                x2={CENTER_X + 103.2}
                y2={CENTER_Y - 72.3}
                stroke={activeRole.themeColor}
                strokeWidth="1.2"
                strokeOpacity="0.55"
              />
            </g>
          )}

          {/* Soft Expanding Harmonic Pulse Ring */}
          {!staticMotion && (
            <>
              <circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r="55"
                fill="none"
                stroke={activeRole.themeColor}
                strokeWidth="1.2"
                className="ecm-sonar-wave-1"
              />
              <circle
                cx={CENTER_X}
                cy={CENTER_Y}
                r="55"
                fill="none"
                stroke={activeRole.themeColor}
                strokeWidth="0.9"
                className="ecm-sonar-wave-2"
              />
            </>
          )}

          {/* 4. Precision Circuit Conduits (Core Perimeter -> Badge Docking Port) */}
          <g className="ecm-circuit-beams">
            {NODE_GEOMETRY.map((node, i) => {
              const isActive = activeSkillSet.has(node.id);
              const isHovered = hoveredSkillId === node.id;
              const isEnergized = isActive || isHovered;
              const pathId = `ecm-conduit-${node.id}`;

              return (
                <g key={`beam-${node.id}`}>
                  {/* Diffuse Underglow on Active Conduit */}
                  {isEnergized && (
                    <line
                      x1={node.startX}
                      y1={node.startY}
                      x2={node.portX}
                      y2={node.portY}
                      stroke={activeRole.themeColor}
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      opacity={staticMotion ? 0.32 : 0.48}
                      filter="url(#ecm-filter-blur)"
                    />
                  )}

                  {/* Core Vector Conduit Path */}
                  <path
                    id={pathId}
                    d={`M ${node.startX} ${node.startY} L ${node.portX} ${node.portY}`}
                    fill="none"
                    stroke={
                      isEnergized
                        ? `url(#${activeRole.beamGradientId})`
                        : "rgba(196, 181, 253, 0.16)"
                    }
                    strokeWidth={isEnergized ? 2.2 : 1}
                    strokeDasharray={isEnergized ? "none" : "2.5 4.5"}
                    strokeLinecap="round"
                    className={isEnergized ? "ecm-active-beam-path" : "ecm-idle-beam-path"}
                  />

                  {/* Mid-Conduit Relay Node on Mid-Orbit */}
                  <circle
                    cx={node.midX}
                    cy={node.midY}
                    r={isEnergized ? 2 : 1.3}
                    fill={isEnergized ? activeRole.themeSecondary : "rgba(196, 181, 253, 0.25)"}
                  />

                  {/* Core Perimeter Launch Terminal */}
                  <circle
                    cx={node.startX}
                    cy={node.startY}
                    r={isEnergized ? 2.4 : 1.5}
                    fill={isEnergized ? "#ffffff" : "rgba(196, 181, 253, 0.28)"}
                  />

                  {/* Badge Perimeter Docking Socket */}
                  <circle
                    cx={node.portX}
                    cy={node.portY}
                    r={isEnergized ? 3.4 : 2.2}
                    fill={isEnergized ? "#ffffff" : "#1f1830"}
                    stroke={isEnergized ? activeRole.themeColor : "rgba(196, 181, 253, 0.28)"}
                    strokeWidth="1.4"
                    filter={isEnergized ? "url(#ecm-particle-spark)" : undefined}
                  />

                  {/* Bi-Directional Traveling Signal Packets along Active Conduits */}
                  {isEnergized && !staticMotion && (
                    <>
                      {/* Outbound Primary Telemetry Photon */}
                      <circle r="2.8" fill="#ffffff" filter="url(#ecm-particle-spark)">
                        <animateMotion
                          dur="1.75s"
                          repeatCount="indefinite"
                          begin={`${i * 0.18}s`}
                          path={`M ${node.startX} ${node.startY} L ${node.portX} ${node.portY}`}
                        />
                        <animate
                          attributeName="opacity"
                          values="0;1;1;0"
                          keyTimes="0;0.15;0.85;1"
                          dur="1.75s"
                          repeatCount="indefinite"
                          begin={`${i * 0.18}s`}
                        />
                      </circle>

                      {/* Inbound Harmonic Acknowledge Pulse */}
                      <circle r="1.8" fill={activeRole.themeSecondary}>
                        <animateMotion
                          dur="2.4s"
                          repeatCount="indefinite"
                          begin={`${i * 0.18 + 0.85}s`}
                          path={`M ${node.portX} ${node.portY} L ${node.startX} ${node.startY}`}
                        />
                        <animate
                          attributeName="opacity"
                          values="0;0.85;0.85;0"
                          keyTimes="0;0.2;0.8;1"
                          dur="2.4s"
                          repeatCount="indefinite"
                          begin={`${i * 0.18 + 0.85}s`}
                        />
                      </circle>
                    </>
                  )}
                </g>
              );
            })}
          </g>

          {/* 5. Center Core Node Hub (r: 54 | Clean Instrument Bezel & Typography) */}
          <g
            className="ecm-center-hub-group"
            onClick={() => {
              const next = (safeIndex + 1) % ROLES_INFO.length;
              setSelectedRoleIndex(next);
            }}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            aria-label={`Active role: ${activeRole.role} at ${activeRole.company}. Click to switch role.`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const next = (safeIndex + 1) % ROLES_INFO.length;
                setSelectedRoleIndex(next);
              }
            }}
          >
            {/* Outer Segmented Bezel Ring */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="55"
              fill="none"
              stroke={activeRole.themeColor}
              strokeWidth="1.2"
              strokeDasharray="10 5 3 5"
              strokeOpacity="0.7"
              className={staticMotion ? "" : "ecm-spin-orbit-slow"}
            />

            {/* Primary Core Housing Sphere */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="51"
              fill="#0b0816"
              stroke={activeRole.themeColor}
              strokeWidth="1.5"
            />

            {/* Subtle Inner Rim & Backlight */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="47"
              fill={`rgba(${activeRole.themeRgb}, 0.16)`}
              stroke="rgba(255, 255, 255, 0.14)"
              strokeWidth="0.75"
            />

            {/* Top & Bottom Precision Reticle Arcs inside Core */}
            <path
              d={`M ${CENTER_X - 24} ${CENTER_Y - 35} Q ${CENTER_X} ${CENTER_Y - 41} ${
                CENTER_X + 24
              } ${CENTER_Y - 35}`}
              fill="none"
              stroke={activeRole.themeColor}
              strokeWidth="1"
              strokeOpacity="0.55"
            />

            {/* Center Hub Mode Subtitle */}
            <text
              x={CENTER_X}
              y="167"
              textAnchor="middle"
              fill={activeRole.themeSecondary}
              fontSize="8.5"
              fontWeight="800"
              letterSpacing="0.16em"
              style={{ textTransform: "uppercase", fontFamily: "Space Grotesk, sans-serif" }}
            >
              {activeRole.disciplineTitle.split(" ")[0]}
            </text>

            {/* Center Role Focus Title */}
            <text
              x={CENTER_X}
              y="185"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="12.5"
              fontWeight="800"
              letterSpacing="0.03em"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {activeRole.focus.split(" ")[0]}
            </text>
            <text
              x={CENTER_X}
              y="200"
              textAnchor="middle"
              fill="#f3eeff"
              fontSize="10.5"
              fontWeight="700"
              letterSpacing="0.02em"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {activeRole.focus.split(" ").slice(1).join(" ")}
            </text>

            {/* Mode Switcher Indicator Tip */}
            <text
              x={CENTER_X}
              y="218"
              textAnchor="middle"
              fill="rgba(216, 204, 248, 0.78)"
              fontSize="7.8"
              fontWeight="700"
              letterSpacing="0.1em"
              style={{ textTransform: "uppercase" }}
            >
              CYCLE MODE ↻
            </text>
          </g>

          {/* 6. Satellite Skill Nodes (Balanced 116x34 Cards with Zero Text Clipping) */}
          <g className="ecm-satellite-badges">
            {NODE_GEOMETRY.map((node) => {
              const isActive = activeSkillSet.has(node.id);
              const isHovered = hoveredSkillId === node.id;
              const isEnergized = isActive || isHovered;

              const badgeX = node.cx - BADGE_W / 2;
              const badgeY = node.cy - BADGE_H / 2;

              return (
                <g
                  key={node.id}
                  className={`ecm-svg-node-badge ${isEnergized ? "is-active" : "is-idle"}`}
                  onMouseEnter={() => setHoveredSkillId(node.id)}
                  onMouseLeave={() => setHoveredSkillId(null)}
                  onFocus={() => setHoveredSkillId(node.id)}
                  onBlur={() => setHoveredSkillId(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${node.name} (${node.category}): ${
                    isActive ? "Active in current role" : "Secondary skill"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  {/* Soft Outer Glow Halo on Active / Hover */}
                  {isEnergized && (
                    <rect
                      x={badgeX - 2.5}
                      y={badgeY - 2.5}
                      width={BADGE_W + 5}
                      height={BADGE_H + 5}
                      rx="10.5"
                      fill="none"
                      stroke={activeRole.themeColor}
                      strokeWidth="1.4"
                      opacity="0.55"
                      filter="url(#ecm-filter-blur)"
                    />
                  )}

                  {/* Badge Capsule Surface */}
                  <rect
                    x={badgeX}
                    y={badgeY}
                    width={BADGE_W}
                    height={BADGE_H}
                    rx="8.5"
                    fill={isEnergized ? "rgba(21, 15, 38, 0.96)" : "rgba(11, 9, 20, 0.86)"}
                    stroke={
                      isEnergized ? activeRole.themeColor : "rgba(196, 181, 253, 0.2)"
                    }
                    strokeWidth={isEnergized ? 1.4 : 1}
                  />

                  {/* Subtle Top Specular Hairline */}
                  <line
                    x1={badgeX + 8}
                    y1={badgeY + 1}
                    x2={badgeX + BADGE_W - 8}
                    y2={badgeY + 1}
                    stroke={
                      isEnergized
                        ? "rgba(255, 255, 255, 0.28)"
                        : "rgba(255, 255, 255, 0.06)"
                    }
                    strokeWidth="0.8"
                  />

                  {/* Status Indicator LED Dot + Pulse Ring */}
                  {isEnergized && !staticMotion && (
                    <circle
                      cx={badgeX + 11.5}
                      cy={node.cy}
                      r="5.2"
                      fill="none"
                      stroke={activeRole.themeColor}
                      strokeWidth="0.9"
                      opacity="0.5"
                      className="ecm-node-led-halo"
                    />
                  )}
                  <circle
                    cx={badgeX + 11.5}
                    cy={node.cy}
                    r={isEnergized ? 3 : 2.5}
                    fill={isEnergized ? activeRole.themeColor : "#5e5373"}
                  />

                  {/* Skill Name Text */}
                  <text
                    x={badgeX + 20.5}
                    y={node.cy - 1.5}
                    fill={isEnergized ? "#ffffff" : "#a59bb9"}
                    fontSize="9.8"
                    fontWeight={isEnergized ? "800" : "700"}
                    letterSpacing="0.015em"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {node.name}
                  </text>

                  {/* Skill Category Caption */}
                  <text
                    x={badgeX + 20.5}
                    y={node.cy + 9}
                    fill={isEnergized ? activeRole.themeSecondary : "#6f6484"}
                    fontSize="7.2"
                    fontWeight="700"
                    letterSpacing="0.06em"
                    style={{ textTransform: "uppercase" }}
                  >
                    {node.category}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* 7. Lower Dynamic Intelligence Dossier */}
      <div className="ecm-footer-dossier" aria-live="polite">
        <AnimatePresence mode="wait">
          {hoveredNode ? (
            /* Hovered Tool Context Inspector */
            <motion.div
              key={`inspector-${hoveredNode.id}`}
              className="ecm-dossier-card is-inspector"
              initial={staticMotion ? false : { opacity: 0, y: 4 }}
              animate={staticMotion ? {} : { opacity: 1, y: 0 }}
              exit={staticMotion ? {} : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              <div className="ecm-dossier-meta">
                <span className="ecm-meta-pill inspector">
                  <Info size={11} className="shrink-0" />
                  TOOL INSPECTOR · {hoveredNode.category.toUpperCase()}
                </span>
                <span className="ecm-meta-company">
                  {hoveredNode.primaryInRoles.includes(safeIndex)
                    ? `CORE IN ${activeRole.company}`
                    : `CROSS-FUNCTIONAL PRACTICE`}
                </span>
              </div>
              <p className="ecm-dossier-headline">
                <b>{hoveredNode.name}</b>: {hoveredNode.roleContributions[safeIndex]}
              </p>
            </motion.div>
          ) : (
            /* Active Role Dossier */
            <motion.div
              key={`role-${activeRole.id}`}
              className="ecm-dossier-card is-role"
              initial={staticMotion ? false : { opacity: 0, y: 4 }}
              animate={staticMotion ? {} : { opacity: 1, y: 0 }}
              exit={staticMotion ? {} : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="ecm-dossier-meta">
                <span className="ecm-meta-pill role">
                  <CheckCircle2 size={11} className="shrink-0" />
                  {activeRole.disciplineTitle}
                </span>
                <span className="ecm-meta-company">
                  {activeRole.company} · {activeRole.place}
                </span>
                <span className="ecm-meta-period">{activeRole.period}</span>
              </div>
              <p className="ecm-dossier-headline">{activeRole.tagline}</p>
              <div className="ecm-dossier-sub">
                <span className="ecm-sub-signal">{activeRole.impactSignal}</span>
                <span className="ecm-sub-hint">
                  <MousePointerClick size={11} className="inline mr-1" />
                  Hover any node to inspect its architectural scope
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
