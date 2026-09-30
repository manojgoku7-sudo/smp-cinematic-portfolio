import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Code2,
  Sparkles,
  Layers3,
  Activity,
  CheckCircle2,
  MousePointerClick,
  Info,
} from "lucide-react";

export interface ExperienceConnectionMapProps {
  activeExperience: number;
  onSelectExperience?: (index: number) => void;
  motionPaused: boolean;
}

interface SkillNode {
  id: string;
  name: string;
  category: string;
  angleDeg: number;
  cx: number;
  cy: number;
  primaryInRoles: number[]; // indices of roles where this is active
  roleContributions: Record<number, string>;
}

// 8 radial skill nodes arranged symmetrically in SVG space (Center: 230, 195 | Radius: 138)
const SKILL_NODES: SkillNode[] = [
  {
    id: "java",
    name: "Java SE / EE",
    category: "Core Language",
    angleDeg: 270,
    cx: 230,
    cy: 56,
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
    cx: 334,
    cy: 98,
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
    cx: 368,
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
    cx: 334,
    cy: 292,
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
    cy: 334,
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
    cx: 126,
    cy: 292,
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
    cx: 92,
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
    cx: 126,
    cy: 98,
    primaryInRoles: [1, 2],
    roleContributions: {
      0: "Standardized error messages and status payload formats for frontend widgets.",
      1: "Engineered modular card patterns, input fields, and dynamic modal overlays.",
      2: "Shipped library of 20+ reusable components accelerating screen delivery by 30%.",
    },
  },
];

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
    tagline: "Dynamic carpooling platform engineered with Java, Spring Boot, and normalized MySQL schemas.",
    impactSignal: "8+ Shipped REST APIs · High-Throughput Routing",
    activeSkillIds: ["java", "spring-boot", "rest-apis", "mysql"],
    icon: Code2,
    themeColor: "#a78bfa",
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
    tagline: "Designed 10+ mobile & web screens in Figma across 3 iterative testing cycles, cutting handoff time by 25%.",
    impactSignal: "3 Review Cycles · 10+ Shipped Screens · 25% Faster Handoff",
    activeSkillIds: ["figma", "usability", "components", "mobile-flows"],
    icon: Sparkles,
    themeColor: "#38bdf8",
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
    tagline: "Standardized a 20+ component library adhering to Material Design for Android, cutting design time by 30%.",
    impactSignal: "20+ Modular Components · 30% Design Acceleration",
    activeSkillIds: ["figma", "components", "mobile-flows"],
    icon: Layers3,
    themeColor: "#f472b6",
    themeRgb: "244, 114, 182",
    beamGradientId: "beam-gradient-systems",
  },
];

export function ExperienceConnectionMap({
  activeExperience,
  onSelectExperience,
  motionPaused,
}: ExperienceConnectionMapProps) {
  const reduceMotion = useReducedMotion();
  const staticMotion = Boolean(reduceMotion || motionPaused);

  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  const safeIndex = Math.max(0, Math.min(activeExperience, ROLES_INFO.length - 1));
  const activeRole = ROLES_INFO[safeIndex];
  const RoleIcon = activeRole.icon;

  const activeSkillSet = useMemo(() => {
    return new Set(activeRole.activeSkillIds);
  }, [activeRole]);

  const activeCount = activeRole.activeSkillIds.length;
  const totalCount = SKILL_NODES.length;

  const hoveredNode = useMemo(() => {
    if (!hoveredSkillId) return null;
    return SKILL_NODES.find((node) => node.id === hoveredSkillId) || null;
  }, [hoveredSkillId]);

  return (
    <div
      id="skills-role-radar-card"
      className="experience-connection-map-redesign"
      aria-label="Interactive skills and role connection matrix"
    >
      {/* Top Header Row with Clear Breathing Room & Zero Clipping */}
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

        <div className="ecm-telemetry-badge" aria-live="polite">
          <Activity size={12} className="text-violet-300 animate-pulse" />
          <span className="ecm-telemetry-text">
            <b>{activeCount}</b> / {totalCount} Active Tools
          </span>
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
              onClick={() => onSelectExperience?.(index)}
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
            <radialGradient id="ecm-center-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={activeRole.themeColor} stopOpacity="0.28" />
              <stop offset="50%" stopColor={activeRole.themeColor} stopOpacity="0.08" />
              <stop offset="100%" stopColor="#080710" stopOpacity="0" />
            </radialGradient>

            {/* Radiant Vector Beams Gradients */}
            <linearGradient id="beam-gradient-backend" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#c4b5fd" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="beam-gradient-research" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#7dd3fc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="beam-gradient-systems" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#f472b6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#be185d" stopOpacity="0.45" />
            </linearGradient>

            {/* Sweeping Sonar Radar Gradient Cone */}
            <radialGradient id="ecm-sonar-cone" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={activeRole.themeColor} stopOpacity="0.2" />
              <stop offset="70%" stopColor={activeRole.themeColor} stopOpacity="0.04" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            {/* Beam Blur Filter */}
            <filter id="ecm-filter-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Photon Particle Glow Filter */}
            <filter id="ecm-particle-spark" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Radar Background Ambience */}
          <circle cx="230" cy="195" r="145" fill="url(#ecm-center-glow)" />

          {/* 2. Concentric Distance Rings & Crosshairs */}
          <g className="ecm-grid-geometry" opacity="0.45">
            {/* Axis Crosshairs */}
            <line
              x1="80"
              y1="195"
              x2="380"
              y2="195"
              stroke="rgba(196, 181, 253, 0.15)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            <line
              x1="230"
              y1="45"
              x2="230"
              y2="345"
              stroke="rgba(196, 181, 253, 0.15)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />

            {/* Outer Orbit (r: 138) */}
            <circle
              cx="230"
              cy="195"
              r="138"
              fill="none"
              stroke="rgba(196, 181, 253, 0.2)"
              strokeWidth="1"
              strokeDasharray="5 6"
              className={staticMotion ? "" : "ecm-spin-orbit-slow"}
            />

            {/* Mid Orbit (r: 96) */}
            <circle
              cx="230"
              cy="195"
              r="96"
              fill="none"
              stroke="rgba(196, 181, 253, 0.18)"
              strokeWidth="1"
              strokeDasharray="4 6"
              className={staticMotion ? "" : "ecm-spin-orbit-rev"}
            />

            {/* Inner Core Ring (r: 58) */}
            <circle
              cx="230"
              cy="195"
              r="58"
              fill="none"
              stroke="rgba(224, 212, 255, 0.28)"
              strokeWidth="1"
            />
          </g>

          {/* 3. Expanding Sonar Echo Waves */}
          {!staticMotion && (
            <>
              <circle
                cx="230"
                cy="195"
                r="56"
                fill="none"
                stroke={activeRole.themeColor}
                strokeWidth="1.5"
                className="ecm-sonar-wave-1"
              />
              <circle
                cx="230"
                cy="195"
                r="56"
                fill="none"
                stroke={activeRole.themeColor}
                strokeWidth="1"
                className="ecm-sonar-wave-2"
              />
            </>
          )}

          {/* 4. Precision Circuit Beams (Center -> Node Anchor) */}
          <g className="ecm-circuit-beams">
            {SKILL_NODES.map((node, i) => {
              const isActive = activeSkillSet.has(node.id);
              const isHovered = hoveredSkillId === node.id;
              const isEnergized = isActive || isHovered;

              return (
                <g key={`beam-${node.id}`}>
                  {/* Diffuse Underglow on Active Circuit */}
                  {isEnergized && (
                    <line
                      x1="230"
                      y1="195"
                      x2={node.cx}
                      y2={node.cy}
                      stroke={activeRole.themeColor}
                      strokeWidth="5"
                      strokeLinecap="round"
                      opacity={staticMotion ? 0.35 : 0.55}
                      filter="url(#ecm-filter-blur)"
                    />
                  )}

                  {/* Core Vector Conduit Line */}
                  <line
                    x1="230"
                    y1="195"
                    x2={node.cx}
                    y2={node.cy}
                    stroke={
                      isEnergized
                        ? `url(#${activeRole.beamGradientId})`
                        : "rgba(196, 181, 253, 0.16)"
                    }
                    strokeWidth={isEnergized ? 2.5 : 1}
                    strokeDasharray={isEnergized ? "none" : "3 5"}
                    strokeLinecap="round"
                    className={isEnergized ? "ecm-active-beam-path" : "ecm-idle-beam-path"}
                  />

                  {/* Anchor Terminal Socket on the Node */}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={isEnergized ? 4.5 : 3}
                    fill={isEnergized ? "#ffffff" : "#2a223e"}
                    stroke={isEnergized ? activeRole.themeColor : "rgba(196, 181, 253, 0.3)"}
                    strokeWidth={1.5}
                    filter={isEnergized ? "url(#ecm-particle-spark)" : undefined}
                  />

                  {/* Animated Traveling Photon Sparks along Active Lines */}
                  {isEnergized && !staticMotion && (
                    <circle r="3.2" fill="#ffffff" filter="url(#ecm-particle-spark)">
                      <animate
                        attributeName="cx"
                        values={`230;${node.cx}`}
                        dur="1.8s"
                        repeatCount="indefinite"
                        begin={`${i * 0.2}s`}
                      />
                      <animate
                        attributeName="cy"
                        values={`195;${node.cy}`}
                        dur="1.8s"
                        repeatCount="indefinite"
                        begin={`${i * 0.2}s`}
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        keyTimes="0;0.12;0.88;1"
                        dur="1.8s"
                        repeatCount="indefinite"
                        begin={`${i * 0.2}s`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </g>

          {/* 5. Center Core Node Hub (r: 54 | Clean Typography & Zero Word Truncation) */}
          <g
            className="ecm-center-hub-group"
            onClick={() => {
              const next = (safeIndex + 1) % ROLES_INFO.length;
              onSelectExperience?.(next);
            }}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            aria-label={`Active role: ${activeRole.role} at ${activeRole.company}. Click to switch role.`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const next = (safeIndex + 1) % ROLES_INFO.length;
                onSelectExperience?.(next);
              }
            }}
          >
            {/* Outer Orbit Accent Ring */}
            <circle
              cx="230"
              cy="195"
              r="54"
              fill="none"
              stroke="rgba(224, 212, 255, 0.45)"
              strokeWidth="1.5"
            />
            <circle
              cx="230"
              cy="195"
              r="57"
              fill="none"
              stroke={activeRole.themeColor}
              strokeWidth="1"
              strokeDasharray="4 6"
              className={staticMotion ? "" : "ecm-spin-orbit-slow"}
            />

            {/* Frosted Multi-Stop Core Sphere */}
            <circle
              cx="230"
              cy="195"
              r="52"
              fill="#0d091a"
              stroke={activeRole.themeColor}
              strokeWidth="1.5"
              filter="drop-shadow(0 0 16px rgba(139, 92, 246, 0.45))"
            />

            {/* Inner Backlight Radial */}
            <circle
              cx="230"
              cy="195"
              r="50"
              fill={`rgba(${activeRole.themeRgb}, 0.22)`}
            />

            {/* Center Hub Mode Subtitle */}
            <text
              x="230"
              y="166"
              textAnchor="middle"
              fill={activeRole.themeColor}
              fontSize="9"
              fontWeight="800"
              letterSpacing="0.16em"
              style={{ textTransform: "uppercase", fontFamily: "Space Grotesk, sans-serif" }}
            >
              {activeRole.disciplineTitle.split(" ")[0]}
            </text>

            {/* Center Role Focus Title - FULL WORDS, ZERO ELLIPSIS */}
            <text
              x="230"
              y="184"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="12.5"
              fontWeight="800"
              letterSpacing="0.04em"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {activeRole.focus.split(" ")[0]}
            </text>
            <text
              x="230"
              y="200"
              textAnchor="middle"
              fill="#f1ebfc"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.03em"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {activeRole.focus.split(" ").slice(1).join(" ")}
            </text>

            {/* Mode Switcher Indicator Tip */}
            <text
              x="230"
              y="218"
              textAnchor="middle"
              fill="rgba(196, 181, 253, 0.75)"
              fontSize="8.5"
              fontWeight="600"
              letterSpacing="0.08em"
              style={{ textTransform: "uppercase" }}
            >
              CYCLE MODE ↻
            </text>
          </g>

          {/* 6. Satellite Skill Nodes (Crisp SVG Badges, Exact Alignment) */}
          <g className="ecm-satellite-badges">
            {SKILL_NODES.map((node) => {
              const isActive = activeSkillSet.has(node.id);
              const isHovered = hoveredSkillId === node.id;
              const isEnergized = isActive || isHovered;

              // Node badge dimensions
              const badgeWidth = 104;
              const badgeHeight = 32;
              const badgeX = node.cx - badgeWidth / 2;
              const badgeY = node.cy - badgeHeight / 2;

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
                  {/* Outer Glow Halo on Active */}
                  {isEnergized && (
                    <rect
                      x={badgeX - 3}
                      y={badgeY - 3}
                      width={badgeWidth + 6}
                      height={badgeHeight + 6}
                      rx="10"
                      fill="none"
                      stroke={activeRole.themeColor}
                      strokeWidth="1.5"
                      opacity="0.6"
                      filter="url(#ecm-filter-blur)"
                    />
                  )}

                  {/* Badge Capsule Surface */}
                  <rect
                    x={badgeX}
                    y={badgeY}
                    width={badgeWidth}
                    height={badgeHeight}
                    rx="8"
                    fill={
                      isEnergized
                        ? `rgba(20, 15, 36, 0.96)`
                        : `rgba(12, 9, 22, 0.82)`
                    }
                    stroke={
                      isEnergized
                        ? activeRole.themeColor
                        : "rgba(196, 181, 253, 0.22)"
                    }
                    strokeWidth={isEnergized ? 1.5 : 1}
                    filter="drop-shadow(0 4px 12px rgba(0,0,0,0.6))"
                  />

                  {/* Status Indicator LED Dot */}
                  <circle
                    cx={badgeX + 11}
                    cy={node.cy}
                    r={3.2}
                    fill={isEnergized ? activeRole.themeColor : "#635875"}
                    filter={isEnergized ? "url(#ecm-particle-spark)" : undefined}
                  />

                  {/* Skill Name Text */}
                  <text
                    x={badgeX + 21}
                    y={node.cy - 1}
                    fill={isEnergized ? "#ffffff" : "#a89ebc"}
                    fontSize="10"
                    fontWeight={isEnergized ? "800" : "700"}
                    letterSpacing="0.02em"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {node.name}
                  </text>

                  {/* Skill Category Caption */}
                  <text
                    x={badgeX + 21}
                    y={node.cy + 9}
                    fill={isEnergized ? activeRole.themeColor : "#726787"}
                    fontSize="7.5"
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

      {/* 7. Lower Dynamic Intelligence Dossier (Full Words, Rich Context, No Truncation) */}
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
