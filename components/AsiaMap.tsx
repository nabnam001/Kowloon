"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cuisineThemes, type JourneyKey } from "@/data/cuisineThemes";

/**
 * Minimal ink route map. We no longer draw a landmass (the active country's
 * real SVG silhouette is shown). A flight path is drawn from Denmark to the
 * active destination, traced by a single glowing dot (no plane). Decorative.
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
  const origin = { x: 60, y: 54 };
  const dest = active.mapPoint;
  const ink = "#ECE6DA";

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      {/* active country silhouette, faint behind the route */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 0.14, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={active.mapSvg}
            alt=""
            width={300}
            height={300}
            className="h-[78%] w-auto object-contain [filter:brightness(0)_invert(1)]"
          />
        </motion.div>
      </AnimatePresence>

      <svg viewBox="0 0 480 420" className="relative h-auto w-full">
        <defs>
          <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={active.accent} stopOpacity="0.5" />
            <stop offset="100%" stopColor={active.accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* graticule grid */}
        <g stroke={ink} strokeOpacity="0.045" strokeWidth="1">
          {[60, 120, 180, 240, 300, 360].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="480" y2={y} />
          ))}
          {[60, 120, 180, 240, 300, 360, 420].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="420" />
          ))}
        </g>

        {/* glow behind destination */}
        <motion.circle
          key={`${activeKey}-glow`}
          cx={dest.x}
          cy={dest.y}
          r="60"
          fill="url(#map-glow)"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* flight path */}
        <motion.path
          key={`${activeKey}-path`}
          d={arc(origin, dest)}
          fill="none"
          stroke={active.accentSoft}
          strokeWidth="1.5"
          strokeDasharray="2 7"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: reduce ? 0.01 : 1.1, ease: "easeInOut" }}
        />

        {/* traveling dot (replaces the plane) */}
        {!reduce && (
          <g key={`${activeKey}-dot`}>
            <circle r="4" fill={active.accentSoft}>
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
                path={arc(origin, dest)}
                calcMode="spline"
                keyPoints="0;1"
                keyTimes="0;1"
                keySplines="0.42 0 0.58 1"
              />
            </circle>
            {/* soft trailing halo on the dot */}
            <circle r="8" fill="none" stroke={active.accentSoft} strokeOpacity="0.4" strokeWidth="1">
              <animate
                attributeName="opacity"
                values="0;0.6;0.6;0"
                keyTimes="0;0.12;0.88;1"
                dur="1.3s"
                fill="freeze"
              />
              <animateMotion
                dur="1.3s"
                fill="freeze"
                path={arc(origin, dest)}
                calcMode="spline"
                keyPoints="0;1"
                keyTimes="0;1"
                keySplines="0.42 0 0.58 1"
              />
            </circle>
          </g>
        )}

        {/* origin: Denmark */}
        <g>
          <circle cx={origin.x} cy={origin.y} r="3.5" fill={ink} />
          <circle cx={origin.x} cy={origin.y} r="7" fill="none" stroke={ink} strokeOpacity="0.4" />
          <text x={origin.x + 12} y={origin.y + 4} fill={ink} fillOpacity="0.7" fontSize="11" fontFamily="var(--font-sans)">
            Aarhus
          </text>
        </g>

        {/* destination markers */}
        {cuisineThemes.map((c) => {
          const isActive = c.key === activeKey;
          return (
            <g key={c.key} onClick={() => onSelect(c.key)} style={{ cursor: "pointer" }}>
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

function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - 70;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}
