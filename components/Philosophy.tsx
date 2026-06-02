"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useLang } from "./LangProvider";

/**
 * An editorial, gallery-style philosophy band inspired by world-class fine-dining
 * sites (Mujō, Atelier Crenn): oversized flowing serif, generous negative space,
 * a signature concept line that reveals word-by-word as it scrolls into view.
 */
export function Philosophy() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  const words = t.philosophy.statement.split(" ");

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-28 sm:py-40"
      aria-label={t.philosophy.label}
    >
      {/* faint oversized backdrop character */}
      <motion.span
        style={{ y: reduce ? 0 : y }}
        aria-hidden
        className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display text-[40vw] leading-none text-white/[0.025] sm:text-[30vw]"
      >
        味
      </motion.span>

      <div className="container-x relative">
        <div className="mx-auto max-w-4xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="kicker"
          >
            <span className="h-px w-8 bg-gold" />
            {t.philosophy.kicker}
          </motion.span>

          <h2 className="heading-display mt-8 text-3xl leading-[1.25] text-cream sm:text-5xl sm:leading-[1.2]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.12 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.04 }}
                className="inline-block"
              >
                {word}
                {"\u00A0"}
              </motion.span>
            ))}
          </h2>

          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-cream/60">{t.philosophy.body}</p>
            <span className="font-display text-lg italic text-gold-grad">
              {t.philosophy.signature}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
