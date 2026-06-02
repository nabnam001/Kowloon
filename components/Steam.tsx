"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Reusable rising-steam wisps. Decorative; disabled for reduced-motion. */
export function Steam({
  className = "",
  count = 3,
}: {
  className?: string;
  count?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute block h-24 w-2.5 rounded-full bg-cream/25 blur-md"
          style={{ left: (i - (count - 1) / 2) * 20 }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [0, -90],
            scaleX: [1, 1.9],
            x: [0, i % 2 ? 8 : -8],
          }}
          transition={{
            duration: 3.6 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.9,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
