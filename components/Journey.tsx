"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cuisineThemes, type JourneyKey } from "@/data/cuisineThemes";
import { dishes as allDishes, type Dish } from "@/data/menu";
import { useLang } from "./LangProvider";
import { DishTurntable } from "./DishTurntable";
import { DishModal } from "./DishModal";
import { AsiaMap } from "./AsiaMap";
import { SceneParticles } from "./SceneParticles";
import { InkBackdrop } from "./InkBackdrop";
import { SmokeOverlay } from "./SmokeOverlay";
import { useSound } from "./SoundProvider";

export function Journey() {
  const { t, lang } = useLang();
  const { play } = useSound();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [selected, setSelected] = useState<Dish | null>(null);

  const theme = cuisineThemes[idx];

  const sigDishes = useMemo(() => {
    return theme.signatures
      .map((id) => allDishes.find((d) => d.id === id))
      .filter((d): d is Dish => Boolean(d && d.hasImage));
  }, [theme]);

  // keyboard arrows fly between destinations when the section is in view
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let inView = false;
    const obs = new IntersectionObserver(
      ([e]) => (inView = e.isIntersecting),
      { threshold: 0.4 }
    );
    obs.observe(el);
    const onKey = (e: KeyboardEvent) => {
      if (!inView) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") fly(idx + 1);
      if (e.key === "ArrowLeft") fly(idx - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      obs.disconnect();
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const fly = (next: number) => {
    setDir(next > idx ? 1 : -1);
    setIdx((next + cuisineThemes.length) % cuisineThemes.length);
    play("flight");
  };

  const flyToKey = (key: JourneyKey) => {
    const next = cuisineThemes.findIndex((c) => c.key === key);
    if (next >= 0 && next !== idx) fly(next);
  };

  const openDish = (d: Dish) => {
    play("open");
    setSelected(d);
  };

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
    >
      {/* Animated themed background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 -z-10"
          style={{ background: theme.bg }}
        />
      </AnimatePresence>

      {/* temple silhouettes */}
      <InkBackdrop variant="soft" />
      {/* atmospheric smoke haze */}
      <SmokeOverlay opacity={0.12} />
      {/* drifting cultural motifs */}
      <Motifs themeKey={theme.key} accent={theme.accentSoft} />
      {/* per-destination ambient particles */}
      <SceneParticles themeKey={theme.key} accent={theme.accentSoft} />

      <div className="container-x relative">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="kicker justify-center">
            <span className="h-px w-8 bg-gold" />
            {t.journey.kicker}
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="heading-display mt-4 text-4xl text-cream sm:text-5xl">
            {t.journey.title}
          </h2>
          <p className="mt-4 text-cream/60">{t.journey.subtitle}</p>
        </div>

        {/* Boarding-pass destination switcher */}
        <div className="mt-10 flex justify-center">
          <div className="flex gap-2 rounded-2xl glass p-2">
            {cuisineThemes.map((c, i) => {
              const isActive = i === idx;
              return (
                <button
                  key={c.key}
                  onClick={() => fly(i)}
                  aria-pressed={isActive}
                  className="relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
                  style={{ color: isActive ? "#0B0A14" : "rgba(247,241,230,0.7)" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="journey-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: c.accentSoft }}
                      transition={{ type: "spring", damping: 26, stiffness: 300 }}
                    />
                  )}
                  <span className="relative text-base">{c.flag}</span>
                  <span className="relative hidden sm:inline">
                    {c.country[lang]}
                  </span>
                  <span className="relative font-mono text-xs opacity-70 sm:hidden">
                    {c.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The flight scene */}
        <div className="relative mt-12 min-h-[640px]">
          {/* Map + boarding pass row */}
          <div className="mb-10 grid items-center gap-8 lg:grid-cols-2">
            {/* Animated map of Asia (persists across destinations) */}
            <div className="order-2 lg:order-1">
              <AsiaMap activeKey={theme.key} onSelect={flyToKey} />
            </div>

            {/* Boarding pass (swaps per destination) */}
            <div className="order-1 lg:order-2" style={{ perspective: "1200px" }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={`${theme.key}-pass`}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 60, rotateY: dir * 12 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: dir * -60, rotateY: dir * -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-stretch overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
                >
                  <div
                    className="flex flex-col justify-center px-5 py-4"
                    style={{ background: `${theme.accent}22` }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cream/50">
                      {t.journey.boarding}
                    </span>
                    <span
                      className="font-display text-3xl font-bold"
                      style={{ color: theme.accentSoft }}
                    >
                      {theme.code}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{theme.flag}</span>
                      <h3 className="heading-display text-xl text-cream">
                        {theme.country[lang]}
                      </h3>
                    </div>
                    <p
                      className="mt-0.5 text-xs font-semibold uppercase tracking-wide"
                      style={{ color: theme.accentSoft }}
                    >
                      {theme.tagline[lang]}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-cream/60">
                      {theme.intro[lang]}
                    </p>
                  </div>
                  {/* perforation */}
                  <div className="relative w-6 border-l border-dashed border-white/15">
                    <span className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-ink" />
                    <span className="absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-ink" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Turntable (swaps per destination) */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={theme.key}
              custom={dir}
              variants={{
                enter: (d: number) => ({
                  opacity: 0,
                  x: d * 120,
                  scale: 0.92,
                }),
                center: { opacity: 1, x: 0, scale: 1 },
                exit: (d: number) => ({
                  opacity: 0,
                  x: d * -120,
                  scale: 0.92,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >

              {/* Turntable */}
              <DishTurntable
                dishes={sigDishes}
                accent={theme.accent}
                accentSoft={theme.accentSoft}
                glow={theme.glow}
                onOpen={openDish}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* link to full menu */}
        <div className="mt-10 text-center">
          <a href="#menu" className="btn-ghost">
            {t.journey.fullMenu}
          </a>
        </div>
      </div>

      <DishModal dish={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/** Subtle, drifting cultural motifs per destination */
function Motifs({ themeKey, accent }: { themeKey: JourneyKey; accent: string }) {
  const glyph =
    themeKey === "kina" ? "灯" : themeKey === "thailand" ? "✿" : "phở";
  const items = [
    { left: "6%", top: "20%", size: 70, dur: 13 },
    { left: "82%", top: "16%", size: 90, dur: 17 },
    { left: "70%", top: "70%", size: 60, dur: 15 },
    { left: "14%", top: "72%", size: 80, dur: 19 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {items.map((it, i) => (
        <motion.span
          key={i}
          className="absolute font-display font-bold"
          style={{ left: it.left, top: it.top, fontSize: it.size, color: accent, opacity: 0.06 }}
          animate={{ y: [0, -24, 0], rotate: [0, 6, 0] }}
          transition={{ duration: it.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.3 }}
        >
          {glyph}
        </motion.span>
      ))}
    </div>
  );
}
