"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import { useLang } from "./LangProvider";
import { InkBackdrop } from "./InkBackdrop";
import { Steam } from "./Steam";
import { SmokeOverlay } from "./SmokeOverlay";

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const dishY = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);

  // pointer-based parallax for the hero dish
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const dishX = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), {
    stiffness: 60,
    damping: 18,
  });
  const dishTilt = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 60,
    damping: 18,
  });

  const onMouse = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMouse}
      className="relative grain flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Ink background with temple silhouettes */}
      <motion.div style={{ y: reduce ? 0 : yBg }} className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep via-ink to-ink" />
        <Image
          src="/images/venue/interior-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.12] mix-blend-luminosity grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/80 via-ink/70 to-ink" />
        <InkBackdrop variant="hero" />
        <SmokeOverlay opacity={0.18} />
      </motion.div>

      {/* Hero dragon (mono ink halo + smoke) — visible on every screen,
          sitting behind the text as an atmospheric element on mobile. */}
      <motion.div
        style={{ y: reduce ? 0 : dishY, x: reduce ? 0 : dishX }}
        className="pointer-events-none absolute -right-16 top-[14%] -z-10 opacity-40 sm:-right-6 sm:opacity-60 lg:right-[2%] lg:top-[34%] lg:-translate-y-1/2 lg:opacity-100"
      >
        <motion.div
          style={{ rotateX: reduce ? 0 : dishTilt }}
          className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-[20rem] lg:w-[20rem]"
        >
          {/* soft ink halo (mono) */}
          <div
            className="absolute inset-6 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(236,230,218,0.10), rgba(178,58,46,0.08) 45%, transparent 70%)",
              filter: "blur(28px)",
            }}
          />
          <Steam className="left-1/2 top-[20%] -translate-x-1/2" count={3} />
          <motion.div
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <Image
              src="/brand/dragon.png"
              alt=""
              fill
              priority
              className="object-contain drop-shadow-[0_20px_44px_rgba(0,0,0,0.7)]"
            />
          </motion.div>
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
            <span className="h-px w-8 bg-chilli" />
            {t.hero.kicker}
          </motion.span>

          <h1 className="heading-display mt-6 text-5xl text-cream sm:text-6xl lg:text-7xl">
            {t.hero.title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.35 + i * 0.08,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ transformOrigin: "bottom" }}
              >
                <span className={i % 3 === 2 ? "text-gold-grad" : ""}>{word}</span>
                &nbsp;
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#journey" className="btn-primary text-base">
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

          {/* trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-cream/50"
          >
            <Trust>Elite Smiley</Trust>
            <Trust>{t.hero.trustKitchens}</Trust>
            <Trust>Aarhus C · 1999</Trust>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue — a refined chevron, not a mouse shape */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <a
          href="#menu"
          aria-label={t.hero.scroll}
          className="group flex flex-col items-center gap-2 text-cream/45 transition-colors hover:text-cream/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-full p-1"
        >
          <span className="text-[10px] uppercase tracking-[0.35em]">
            {t.hero.scroll}
          </span>
          <motion.svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            animate={reduce ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </a>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}

function Trust({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap border-l border-cream/15 pl-3 first:border-0 first:pl-0">
      {children}
    </span>
  );
}
