"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated smoke using the real smoke texture. Two layers of the texture drift
 * and breathe slowly, screen-blended over dark scenes for an atmospheric haze.
 * Decorative; mostly static for reduced-motion.
 */
export function SmokeOverlay({
  className = "",
  opacity = 0.22,
}: {
  className?: string;
  opacity?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-[-20%] bg-cover bg-center mix-blend-screen"
        style={{
          backgroundImage: "url(/images/venue/smoke.jpg)",
          opacity,
        }}
        animate={
          reduce
            ? undefined
            : { x: ["-3%", "3%", "-3%"], y: ["0%", "-4%", "0%"], scale: [1.05, 1.12, 1.05] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-[-25%] bg-cover bg-center mix-blend-screen"
        style={{
          backgroundImage: "url(/images/venue/smoke.jpg)",
          opacity: opacity * 0.6,
          transform: "scaleX(-1)",
        }}
        animate={
          reduce
            ? undefined
            : { x: ["4%", "-4%", "4%"], y: ["-2%", "3%", "-2%"], scale: [1.1, 1.04, 1.1] }
        }
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
