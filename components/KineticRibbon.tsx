"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "./LangProvider";

/**
 * An oversized kinetic wordmark ribbon — a hallmark of bold, award-winning
 * restaurant sites. Big outlined display type scrolls horizontally, with the
 * brand words alternating filled and outlined for rhythm.
 */
export function KineticRibbon() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const words = t.ribbon.words;

  // build a long enough sequence to loop seamlessly
  const sequence = [...words, ...words, ...words, ...words];

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/5 bg-gradient-to-b from-ink via-indigo-deep/30 to-ink py-8 sm:py-12"
    >
      <motion.div
        className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {sequence.map((word, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={
                i % 2 === 0
                  ? "font-display text-5xl font-bold tracking-tight text-cream sm:text-7xl"
                  : "font-display text-5xl font-bold tracking-tight text-transparent sm:text-7xl [-webkit-text-stroke:1px_rgba(232,184,115,0.7)]"
              }
            >
              {word}
            </span>
            <span className="text-2xl text-chilli sm:text-3xl">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
