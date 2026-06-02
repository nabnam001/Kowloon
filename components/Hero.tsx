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

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const dishY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const dishRotate = useTransform(scrollYProgress, [0, 1], [0, 35]);

  // pointer-based parallax for the hero dish
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const dishX = useSpring(useTransform(mx, [-0.5, 0.5], [-24, 24]), {
    stiffness: 60,
    damping: 18,
  });
  const dishTilt = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
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
      {/* Background — Hong Kong night */}
      <motion.div style={{ y: reduce ? 0 : yBg }} className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep via-indigo-deep to-ink" />
        <Image
          src="/images/venue/interior-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/85 via-indigo-deep/70 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(221,38,39,0.28),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(44,34,118,0.55),transparent_50%)]" />
      </motion.div>

      {/* Floating lantern glows */}
      <Lanterns reduce={!!reduce} />
      {/* drifting embers */}
      <Embers reduce={!!reduce} />

      {/* Hero signature dish with layered glow + steam */}
      <motion.div
        style={{ y: reduce ? 0 : dishY, x: reduce ? 0 : dishX }}
        className="pointer-events-none absolute right-[-8%] top-1/2 -z-10 hidden -translate-y-1/2 lg:block"
      >
        <motion.div
          style={{ rotate: reduce ? 0 : dishRotate, rotateX: reduce ? 0 : dishTilt }}
          className="relative h-[40rem] w-[40rem]"
        >
          {/* rotating halo */}
          <motion.div
            className="absolute inset-8 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(221,38,39,0.25), rgba(232,184,115,0.2), rgba(44,34,118,0.25), rgba(221,38,39,0.25))",
              filter: "blur(40px)",
            }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <Steam reduce={!!reduce} />
          <motion.div
            animate={reduce ? undefined : { y: [0, -16, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <Image
              src="/images/dishes/47.png"
              alt=""
              fill
              priority
              className="object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
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
            <span className="h-px w-8 bg-gold" />
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
            <Trust>⭐ Elite Smiley</Trust>
            <Trust>🇨🇳 🇹🇭 🇻🇳 {t.hero.trustKitchens}</Trust>
            <Trust>📍 Aarhus C</Trust>
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

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}

function Trust({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap">{children}</span>
  );
}

function Steam({ reduce }: { reduce: boolean }) {
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute left-1/2 top-[18%] -z-0 -translate-x-1/2" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute block h-24 w-2 rounded-full bg-white/20 blur-md"
          style={{ left: (i - 1) * 26 }}
          animate={{ opacity: [0, 0.5, 0], y: [-10, -90], scaleX: [1, 1.8] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.9,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
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

function Embers({ reduce }: { reduce: boolean }) {
  if (reduce) return null;
  const embers = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {embers.map((_, i) => {
        const left = (i * 37) % 100;
        const size = 2 + (i % 3);
        const dur = 8 + (i % 5) * 2;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gold/60"
            style={{ left: `${left}%`, bottom: -10, width: size, height: size }}
            animate={{ y: [0, -600], opacity: [0, 0.8, 0], x: [0, (i % 2 ? 30 : -30)] }}
            transition={{
              duration: dur,
              repeat: Infinity,
              delay: (i % 7) * 1.2,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}
