"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A sumi-e (ink wash) backdrop: layered temple/pagoda silhouettes, distant
 * mountains, a rising sun disc and a faint coiling dragon — rendered in pure
 * ink tones for a black-and-white Asian × Scandinavian aesthetic.
 * Purely decorative.
 */
export function InkBackdrop({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "hero" | "soft";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const sunOpacity = variant === "hero" ? 0.14 : 0.07;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* rising-sun / moon disc */}
      <motion.div
        className="absolute left-1/2 top-[18%] -translate-x-1/2 rounded-full"
        style={{
          width: "min(60vh, 560px)",
          height: "min(60vh, 560px)",
          background: `radial-gradient(circle, rgba(236,230,218,${sunOpacity}) 0%, rgba(236,230,218,${sunOpacity * 0.5}) 38%, transparent 62%)`,
        }}
        animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* flowing cloud / wave motif (seigaiha-inspired), faint ink */}
      <svg
        className="absolute -right-8 top-[22%] hidden w-[460px] opacity-[0.06] lg:block"
        viewBox="0 0 400 200"
        fill="none"
        stroke="#ECE6DA"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M10 120 Q40 80 70 120 T130 120 T190 120 T250 120 T310 120 T370 120" />
        <path d="M10 150 Q40 110 70 150 T130 150 T190 150 T250 150 T310 150 T370 150" opacity="0.7" />
        <path d="M40 90 Q70 50 100 90 T160 90 T220 90 T280 90 T340 90" opacity="0.5" />
      </svg>

      {/* enso (zen circle) — single calligraphic brush ring */}
      <svg
        className="absolute left-[6%] top-[30%] hidden w-44 opacity-[0.05] lg:block"
        viewBox="0 0 120 120"
        fill="none"
        stroke="#ECE6DA"
        strokeWidth="6"
        strokeLinecap="round"
      >
        <path d="M88 30 A44 44 0 1 0 96 70" />
      </svg>

      {/* distant mountain ridge */}
      <svg
        className="absolute inset-x-0 bottom-[24%] w-full opacity-[0.05]"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        fill="#ECE6DA"
      >
        <path d="M0 200 L120 110 L240 170 L380 70 L520 160 L660 90 L820 175 L980 80 L1140 165 L1300 100 L1440 180 L1440 200 Z" />
      </svg>

      {/* temple / pagoda skyline silhouette */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full opacity-[0.09]"
        viewBox="0 0 1440 260"
        preserveAspectRatio="xMidYMax meet"
        fill="#ECE6DA"
      >
        {/* left pagoda */}
        <g transform="translate(120 40)">
          <Pagoda />
        </g>
        {/* center grand temple */}
        <g transform="translate(620 0) scale(1.25)">
          <Pagoda />
        </g>
        {/* right pagoda */}
        <g transform="translate(1140 60) scale(0.85)">
          <Pagoda />
        </g>
        {/* ground line */}
        <rect x="0" y="244" width="1440" height="16" />
      </svg>
    </div>
  );
}

/** A single multi-tier pagoda silhouette (origin at its base, ~200px tall). */
function Pagoda() {
  return (
    <g>
      {/* finial */}
      <rect x="96" y="6" width="8" height="26" />
      <circle cx="100" cy="6" r="5" />
      {/* roof tiers (wide, upturned eaves) */}
      <path d="M40 40 Q100 14 160 40 L140 52 Q100 36 60 52 Z" />
      <path d="M30 78 Q100 48 170 78 L148 92 Q100 70 52 92 Z" />
      <path d="M20 120 Q100 86 180 120 L154 136 Q100 108 46 136 Z" />
      <path d="M10 166 Q100 128 190 166 L160 184 Q100 150 40 184 Z" />
      {/* body tiers */}
      <rect x="74" y="52" width="52" height="26" />
      <rect x="64" y="92" width="72" height="28" />
      <rect x="54" y="136" width="92" height="30" />
      <rect x="44" y="184" width="112" height="60" />
      {/* door */}
      <path d="M86 244 v-34 a14 14 0 0 1 28 0 v34 Z" fill="#0B0B0C" />
    </g>
  );
}
