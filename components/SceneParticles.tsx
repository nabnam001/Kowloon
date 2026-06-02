"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { JourneyKey } from "@/data/cuisineThemes";

/**
 * Ambient, per-destination particles layered into each journey scene.
 * - China  → floating lantern embers rising warm
 * - Thailand → drifting herb/spice flecks
 * - Vietnam → soft rising steam columns
 * Purely decorative; disabled for reduced-motion.
 */
export function SceneParticles({
  themeKey,
  accent,
}: {
  themeKey: JourneyKey;
  accent: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden" aria-hidden>
      {themeKey === "kina" && <Embers accent={accent} />}
      {themeKey === "thailand" && <Spices accent={accent} />}
      {themeKey === "vietnam" && <Steam />}
    </div>
  );
}

function Embers({ accent }: { accent: string }) {
  const items = Array.from({ length: 16 });
  return (
    <>
      {items.map((_, i) => {
        const left = (i * 61) % 100;
        const size = 3 + (i % 3) * 2;
        const dur = 9 + (i % 5) * 2;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              bottom: -12,
              width: size,
              height: size,
              background: accent,
              boxShadow: `0 0 8px ${accent}`,
            }}
            animate={{
              y: [0, -460],
              x: [0, i % 2 ? 36 : -36],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              delay: (i % 7) * 1.1,
              ease: "easeOut",
            }}
          />
        );
      })}
    </>
  );
}

function Spices({ accent }: { accent: string }) {
  const items = Array.from({ length: 14 });
  return (
    <>
      {items.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const size = 4 + (i % 3) * 2;
        const dur = 11 + (i % 4) * 3;
        return (
          <motion.span
            key={i}
            className="absolute rounded-[2px]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size * 0.5,
              background: accent,
              opacity: 0.5,
            }}
            animate={{
              x: [0, 40, -10, 0],
              y: [0, 30, 60],
              rotate: [0, 180, 360],
              opacity: [0, 0.55, 0],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              delay: (i % 6) * 1.3,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );
}

function Steam() {
  const columns = [18, 38, 58, 78];
  return (
    <>
      {columns.map((left, i) => (
        <div key={i} className="absolute bottom-0" style={{ left: `${left}%` }}>
          {[0, 1, 2].map((j) => (
            <motion.span
              key={j}
              className="absolute block rounded-full bg-white/15 blur-xl"
              style={{ width: 40, height: 120, left: (j - 1) * 14 }}
              animate={{
                y: [40, -240],
                opacity: [0, 0.35, 0],
                scaleX: [1, 1.8],
              }}
              transition={{
                duration: 7 + j,
                repeat: Infinity,
                delay: i * 1.4 + j * 0.8,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
}
