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

      {/* coiling dragon (very faint, ink line) */}
      <svg
        className="absolute -right-10 top-1/4 hidden w-[640px] opacity-[0.06] lg:block"
        viewBox="0 0 600 400"
        fill="none"
        stroke="#ECE6DA"
        strokeWidth="2"
      >
        <path d="M40 220 C120 120 220 320 320 200 C400 110 470 180 540 120 C500 170 520 230 470 250 C520 250 540 290 500 320 C470 300 440 320 420 300 C440 340 400 360 370 340 C390 300 350 280 330 300 C300 250 250 270 230 240 C180 280 120 260 100 300 C120 250 80 240 40 220 Z" />
        {/* spine accents */}
        <path d="M320 200 l8 -22 M360 196 l10 -20 M400 186 l10 -20 M440 172 l10 -20" strokeWidth="1.5" />
        {/* eye */}
        <circle cx="528" cy="128" r="3" fill="#ECE6DA" stroke="none" />
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
