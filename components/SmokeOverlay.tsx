"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInViewport } from "./useInViewport";

/**
 * Animated smoke using the real smoke texture. Two layers of the texture drift
 * and breathe slowly, screen-blended over dark scenes for an atmospheric haze.
 * Decorative; pauses while off-screen and stays static for reduced-motion.
 */
export function SmokeOverlay({
  className = "",
  opacity = 0.22,
}: {
  className?: string;
  opacity?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewport<HTMLDivElement>("0px");
  const animate = !reduce && inView;

  return (
    <div
      ref={ref}
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
          animate
            ? { x: ["-3%", "3%", "-3%"], y: ["0%", "-4%", "0%"], scale: [1.05, 1.12, 1.05] }
            : undefined
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
          animate
            ? { x: ["4%", "-4%", "4%"], y: ["-2%", "3%", "-2%"], scale: [1.1, 1.04, 1.1] }
            : undefined
        }
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
