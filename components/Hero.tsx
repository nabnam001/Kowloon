"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLang } from "./LangProvider";

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const dishY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative grain flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background gradient — Hong Kong night */}
      <motion.div style={{ y: reduce ? 0 : yBg }} className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep via-indigo-deep to-ink" />
        {/* Real restaurant interior, dimmed for cinematic depth */}
        <Image
          src="/images/venue/interior-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/80 via-indigo-deep/70 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(221,38,39,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(44,34,118,0.5),transparent_50%)]" />
      </motion.div>

      {/* Floating lantern glows */}
      <Lanterns reduce={!!reduce} />

      {/* Floating signature dish */}
      <motion.div
        style={{ y: reduce ? 0 : dishY }}
        className="pointer-events-none absolute right-[-6%] top-1/2 -z-10 hidden -translate-y-1/2 lg:block"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-[34rem] w-[34rem]"
        >
          <div className="absolute inset-0 rounded-full bg-chilli/20 blur-3xl" />
          <Image
            src="/images/dishes/47.png"
            alt=""
            fill
            priority
            className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: reduce ? 0 : yText, opacity }}
        className="container-x relative z-10 pt-24"
      >
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="kicker"
          >
            <span className="h-px w-8 bg-gold" />
            {t.hero.kicker}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="heading-display mt-6 text-5xl text-cream sm:text-6xl lg:text-7xl"
          >
            {t.hero.title.split(" ").map((word, i) => (
              <span key={i} className="inline-block">
                <span className={i % 3 === 2 ? "text-gold-grad" : ""}>
                  {word}
                </span>
                &nbsp;
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#menu" className="btn-primary text-base">
              {t.hero.ctaMenu}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m0 0-6-6m6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#locations" className="btn-ghost text-base">
              {t.hero.ctaBook}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-cream/50">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            {t.hero.scroll}
          </span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="flex h-9 w-5 items-start justify-center rounded-full border border-cream/30 p-1"
          >
            <span className="h-2 w-1 rounded-full bg-gold" />
          </motion.span>
        </div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}

function Lanterns({ reduce }: { reduce: boolean }) {
  const lanterns = [
    { left: "8%", top: "18%", size: 90, delay: 0 },
    { left: "22%", top: "60%", size: 60, delay: 1.5 },
    { left: "70%", top: "22%", size: 70, delay: 0.8 },
    { left: "85%", top: "70%", size: 110, delay: 2.2 },
    { left: "45%", top: "12%", size: 50, delay: 1.1 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      {lanterns.map((l, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-chilli/30 blur-2xl"
          style={{ left: l.left, top: l.top, width: l.size, height: l.size }}
          animate={reduce ? { opacity: 0.4 } : { opacity: [0.3, 0.7, 0.3], y: [0, -20, 0] }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: l.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
