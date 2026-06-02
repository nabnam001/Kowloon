"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cuisineThemes, type JourneyKey } from "@/data/cuisineThemes";

/**
 * A stylised ink map of East & Southeast Asia (China + the Indochina
 * peninsula). The active destination pulses and an animated flight path is
 * drawn from Denmark. Recognisable but artistic — decorative, aria-hidden.
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
  const origin = { x: 60, y: 54 }; // Denmark, off to the NW
  const dest = active.mapPoint;

  const ink = "#ECE6DA";

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <svg viewBox="0 0 480 420" className="h-auto w-full">
        <defs>
          <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={active.accent} stopOpacity="0.5" />
            <stop offset="100%" stopColor={active.accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* graticule grid — nautical chart feel */}
        <g stroke={ink} strokeOpacity="0.05" strokeWidth="1">
          {[60, 120, 180, 240, 300, 360, 420].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="480" y2={y} />
          ))}
          {[60, 120, 180, 240, 300, 360, 420].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="420" />
          ))}
        </g>

        {/* glow behind active destination */}
        <motion.circle
          key={`${activeKey}-glow`}
          cx={dest.x}
          cy={dest.y}
          r="64"
          fill="url(#map-glow)"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* China + East Asia mainland */}
        <path
          d="M150 96
             C 180 74, 250 70, 312 84
             C 348 92, 388 96, 410 120
             C 420 134, 404 150, 416 166
             C 410 188, 372 196, 360 214
             L 352 232
             C 344 226, 336 214, 330 222
             C 300 214, 268 220, 250 206
             C 224 210, 198 216, 178 202
             C 150 196, 126 180, 120 152
             C 112 132, 132 116, 124 100
             C 126 92, 138 92, 150 96 Z"
          fill={ink}
          fillOpacity="0.07"
          stroke={ink}
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />

        {/* Indochina peninsula (Thailand + Vietnam) */}
        <path
          d="M330 222
             C 344 246, 338 272, 348 296
             C 352 312, 344 330, 332 346
             C 326 332, 326 314, 320 302
             C 312 312, 300 326, 296 314
             C 290 298, 300 282, 292 268
             C 282 262, 276 248, 282 234
             C 298 226, 314 222, 330 222 Z"
          fill={ink}
          fillOpacity="0.07"
          stroke={ink}
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />

        {/* island flecks (Hainan / archipelago) */}
        <circle cx="372" cy="250" r="5" fill={ink} fillOpacity="0.08" stroke={ink} strokeOpacity="0.18" />
        <circle cx="402" cy="300" r="3" fill={ink} fillOpacity="0.07" stroke={ink} strokeOpacity="0.16" />
        <circle cx="416" cy="278" r="2.4" fill={ink} fillOpacity="0.07" stroke={ink} strokeOpacity="0.16" />

        {/* flight path */}
        <motion.path
          key={`${activeKey}-path`}
          d={arc(origin, dest)}
          fill="none"
          stroke={active.accentSoft}
          strokeWidth="1.5"
          strokeDasharray="3 6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: reduce ? 0.01 : 1.1, ease: "easeInOut" }}
        />

        {/* flying plane */}
        {!reduce && (
          <g key={`${activeKey}-plane`}>
            <g opacity="0">
              <path
                d="M0 -5 L9 0 L0 5 L2 0 Z"
                fill={ink}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.12;0.88;1"
                dur="1.3s"
                fill="freeze"
              />
              <animateMotion
                dur="1.3s"
                fill="freeze"
                rotate="auto"
                path={arc(origin, dest)}
                calcMode="spline"
                keyPoints="0;1"
                keyTimes="0;1"
                keySplines="0.42 0 0.58 1"
              />
            </g>
          </g>
        )}

        {/* origin: Denmark */}
        <g>
          <circle cx={origin.x} cy={origin.y} r="3.5" fill={ink} />
          <circle cx={origin.x} cy={origin.y} r="7" fill="none" stroke={ink} strokeOpacity="0.4" />
          <text
            x={origin.x + 12}
            y={origin.y + 4}
            fill={ink}
            fillOpacity="0.7"
            fontSize="11"
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
                  animate={{ scale: [1, 2.8], opacity: [0.8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  style={{ transformOrigin: `${c.mapPoint.x}px ${c.mapPoint.y}px` }}
                />
              )}
              <circle
                cx={c.mapPoint.x}
                cy={c.mapPoint.y}
                r={isActive ? 5.5 : 3.5}
                fill={isActive ? c.accentSoft : "rgba(236,230,218,0.45)"}
                stroke={isActive ? "#0B0B0C" : "transparent"}
                strokeWidth="1.5"
              />
              <text
                x={c.mapPoint.x}
                y={c.mapPoint.y + 20}
                fill={isActive ? ink : "rgba(236,230,218,0.5)"}
                fontSize="10"
                fontWeight={isActive ? 700 : 400}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                style={{ letterSpacing: "0.08em" }}
              >
                {c.country.en.toUpperCase()}
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
  const my = Math.min(a.y, b.y) - 70;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}
