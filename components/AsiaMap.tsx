"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cuisineThemes, type JourneyKey } from "@/data/cuisineThemes";

/**
 * A stylised map of East/Southeast Asia. The active destination pulses and an
 * animated dashed flight path connects to it. Decorative — hidden from a11y tree.
 */
export function AsiaMap({
  activeKey,
  onSelect,
}: {
  activeKey: JourneyKey;
  onSelect: (k: JourneyKey) => void;
}) {
  const reduce = useReducedMotion();
  const active = cuisineThemes.find((c) => c.key === activeKey)!;
  // Aarhus origin point (top-left "home")
  const origin = { x: 70, y: 70 };
  const dest = active.mapPoint;

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <svg viewBox="0 0 400 300" className="h-auto w-full">
        <defs>
          <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={active.accent} stopOpacity="0.5" />
            <stop offset="100%" stopColor={active.accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(247,241,230,0.10)" />
            <stop offset="100%" stopColor="rgba(247,241,230,0.04)" />
          </linearGradient>
        </defs>

        {/* glow behind the active destination */}
        <motion.circle
          key={`${activeKey}-glow`}
          cx={dest.x}
          cy={dest.y}
          r="70"
          fill="url(#map-glow)"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* stylised Asia landmass (abstract, not geographically exact) */}
        <path
          d="M120 60 Q170 40 220 55 Q280 72 300 60 Q330 78 320 110 Q345 130 320 160 Q300 200 260 210 Q250 240 270 260 Q230 255 220 230 Q190 235 175 215 Q140 220 120 195 Q95 170 110 140 Q90 120 105 95 Q108 72 120 60 Z"
          fill="url(#land)"
          stroke="rgba(247,241,230,0.12)"
          strokeWidth="1"
        />
        {/* a couple of islands for flavour */}
        <path
          d="M300 215 Q318 210 322 228 Q314 244 298 238 Q292 224 300 215 Z"
          fill="url(#land)"
          stroke="rgba(247,241,230,0.10)"
          strokeWidth="1"
        />

        {/* flight path from origin to active destination */}
        <motion.path
          key={`${activeKey}-path`}
          d={arc(origin, dest)}
          fill="none"
          stroke={active.accentSoft}
          strokeWidth="1.5"
          strokeDasharray="4 5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: reduce ? 0.01 : 1, ease: "easeInOut" }}
        />

        {/* flying plane marker — SMIL animateMotion re-runs on key change */}
        {!reduce && (
          <g key={`${activeKey}-plane`}>
            <text fontSize="15" textAnchor="middle" opacity="0">
              ✈️
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.15;0.85;1"
                dur="1.2s"
                begin="0s"
                fill="freeze"
              />
              <animateMotion
                dur="1.2s"
                begin="0s"
                fill="freeze"
                rotate="auto"
                path={arc(origin, dest)}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.42 0 0.58 1"
              />
            </text>
          </g>
        )}

        {/* origin: Aarhus */}
        <g>
          <circle cx={origin.x} cy={origin.y} r="4" fill="#F7F1E6" />
          <text
            x={origin.x}
            y={origin.y - 12}
            fill="rgba(247,241,230,0.7)"
            fontSize="11"
            textAnchor="middle"
            fontFamily="var(--font-sans)"
          >
            Aarhus
          </text>
        </g>

        {/* destination markers */}
        {cuisineThemes.map((c) => {
          const isActive = c.key === activeKey;
          return (
            <g
              key={c.key}
              onClick={() => onSelect(c.key)}
              style={{ cursor: "pointer" }}
            >
              {isActive && !reduce && (
                <motion.circle
                  cx={c.mapPoint.x}
                  cy={c.mapPoint.y}
                  r="6"
                  fill="none"
                  stroke={c.accentSoft}
                  strokeWidth="2"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: [1, 2.6], opacity: [0.8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  style={{ transformOrigin: `${c.mapPoint.x}px ${c.mapPoint.y}px` }}
                />
              )}
              <circle
                cx={c.mapPoint.x}
                cy={c.mapPoint.y}
                r={isActive ? 6 : 4}
                fill={isActive ? c.accentSoft : "rgba(247,241,230,0.4)"}
                stroke={isActive ? "#0B0A14" : "transparent"}
                strokeWidth="1.5"
              />
              <text
                x={c.mapPoint.x}
                y={c.mapPoint.y + 20}
                fill={isActive ? c.accentSoft : "rgba(247,241,230,0.45)"}
                fontSize="11"
                fontWeight={isActive ? 700 : 400}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
              >
                {c.flag}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** quadratic arc path string between two points, bowed upward */
function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - 50;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}
