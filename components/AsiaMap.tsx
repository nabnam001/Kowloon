"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cuisineThemes, type JourneyKey } from "@/data/cuisineThemes";
import { useLang } from "./LangProvider";

/**
 * Minimal ink route map. Shows the ACTIVE country's real SVG silhouette,
 * centered, with a flight path drawn from Denmark to it, traced by a single
 * glowing dot (no plane). Switching country is done via the tabs above; this
 * map reflects the active destination. Decorative.
 */
export function AsiaMap({ activeKey }: { activeKey: JourneyKey; onSelect?: (k: JourneyKey) => void }) {
  const reduce = useReducedMotion();
  const { lang } = useLang();
  const active = cuisineThemes.find((c) => c.key === activeKey)!;
  const ink = "#ECE6DA";

  // Fixed layout in the 480x420 viewBox: Aarhus origin → silhouette centre.
  const origin = { x: 64, y: 58 };
  const dest = { x: 280, y: 232 };
  const d = arc(origin, dest);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
      {/* active country silhouette, centred */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 0.16, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={active.mapSvg}
            alt=""
            width={340}
            height={340}
            className="h-[82%] w-auto object-contain [filter:brightness(0)_invert(1)]"
          />
        </motion.div>
      </AnimatePresence>

      <svg viewBox="0 0 480 420" className="relative h-full w-full">
        <defs>
          <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={active.accent} stopOpacity="0.55" />
            <stop offset="100%" stopColor={active.accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* graticule grid */}
        <g stroke={ink} strokeOpacity="0.04" strokeWidth="1">
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
          r="70"
          fill="url(#map-glow)"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* flight path */}
        <motion.path
          key={`${activeKey}-path`}
          d={d}
          fill="none"
          stroke={active.accentSoft}
          strokeWidth="1.6"
          strokeDasharray="2 7"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: reduce ? 0.01 : 1.1, ease: "easeInOut" }}
        />

        {/* traveling dot (no plane) */}
        {!reduce && (
          <g key={`${activeKey}-dot`}>
            <circle r="4.5" fill={active.accentSoft}>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="1.3s" fill="freeze" />
              <animateMotion dur="1.3s" fill="freeze" path={d} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.42 0 0.58 1" />
            </circle>
            <circle r="9" fill="none" stroke={active.accentSoft} strokeOpacity="0.4" strokeWidth="1">
              <animate attributeName="opacity" values="0;0.6;0.6;0" keyTimes="0;0.12;0.88;1" dur="1.3s" fill="freeze" />
              <animateMotion dur="1.3s" fill="freeze" path={d} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.42 0 0.58 1" />
            </circle>
          </g>
        )}

        {/* pulsing destination marker */}
        {!reduce && (
          <motion.circle
            cx={dest.x}
            cy={dest.y}
            r="7"
            fill="none"
            stroke={active.accentSoft}
            strokeWidth="2"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: [1, 2.8], opacity: [0.8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            style={{ transformOrigin: `${dest.x}px ${dest.y}px` }}
          />
        )}
        <circle cx={dest.x} cy={dest.y} r="6" fill={active.accentSoft} stroke="#0B0B0C" strokeWidth="1.5" />
        <text
          x={dest.x}
          y={dest.y + 24}
          fill={ink}
          fontSize="13"
          fontWeight={700}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          style={{ letterSpacing: "0.12em" }}
        >
          {active.country[lang].toUpperCase()}
        </text>

        {/* origin: Denmark */}
        <circle cx={origin.x} cy={origin.y} r="3.5" fill={ink} />
        <circle cx={origin.x} cy={origin.y} r="7" fill="none" stroke={ink} strokeOpacity="0.4" />
        <text x={origin.x + 12} y={origin.y + 4} fill={ink} fillOpacity="0.7" fontSize="11" fontFamily="var(--font-sans)">
          Aarhus
        </text>
      </svg>
    </div>
  );
}

function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - 70;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}
