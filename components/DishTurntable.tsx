"use client";

import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dish } from "@/data/menu";
import { SpiceMeter } from "./SpiceMeter";
import { DietBadge } from "./DietBadge";
import { Steam } from "./Steam";
import { useLang } from "./LangProvider";
import { useInViewport } from "./useInViewport";

/**
 * A clean "coverflow" presenter of signature dishes. One large center dish
 * (with rising steam) is flanked by smaller, dimmer neighbours — no overlap.
 * Drag, arrows, dots and arrow keys all cycle the selection. Auto-advances
 * gently until the user interacts.
 */
export function DishTurntable({
  dishes,
  accent,
  accentSoft,
  onOpen,
}: {
  dishes: Dish[];
  accent: string;
  accentSoft: string;
  glow?: string;
  onOpen: (d: Dish) => void;
}) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const count = dishes.length;
  const { ref: stageRef, inView } = useInViewport<HTMLDivElement>("0px");

  const [active, setActive] = useState(0);
  const interactedRef = useRef(false);

  const go = useCallback(
    (next: number) => {
      setActive(((next % count) + count) % count);
    },
    [count]
  );

  // reset when the destination changes
  useEffect(() => {
    interactedRef.current = false;
    setActive(0);
  }, [dishes]);

  // gentle auto-advance until interaction — only while on-screen
  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => {
      if (interactedRef.current) return;
      setActive((a) => (a + 1) % count);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduce, count, inView]);

  const mark = () => {
    interactedRef.current = true;
  };
  const next = () => {
    mark();
    go(active + 1);
  };
  const prev = () => {
    mark();
    go(active - 1);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    mark();
    if (info.offset.x < -60 || info.velocity.x < -300) next();
    else if (info.offset.x > 60 || info.velocity.x > 300) prev();
  };

  const activeDish = dishes[active];

  // relative offset of a dish from the active one, in range [-half, half]
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  return (
    <div className="flex w-full flex-col items-center">
      {/* Stage */}
      <motion.div
        ref={stageRef}
        className="relative h-[280px] w-full max-w-3xl cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[340px]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragStart={mark}
        onDragEnd={onDragEnd}
      >
        {/* soft ground line */}
        <div
          className="pointer-events-none absolute bottom-12 left-1/2 h-px w-[70%] -translate-x-1/2"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}33, transparent)`,
          }}
        />

        {dishes.map((dish, i) => {
          const off = offsetOf(i);
          const abs = Math.abs(off);
          if (abs > 2) return null; // only render the visible neighbourhood
          const isActive = off === 0;
          return (
            <motion.button
              key={dish.id}
              onClick={() => {
                mark();
                if (isActive) onOpen(dish);
                else go(i);
              }}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              className="absolute left-1/2 top-1/2"
              initial={false}
              animate={{
                x: `calc(-50% + ${off * 38}%)`,
                y: "-50%",
                scale: isActive ? 1 : 0.62 - (abs - 1) * 0.1,
                opacity: abs > 1 ? 0 : isActive ? 1 : 0.45,
                zIndex: 10 - abs,
                filter: isActive ? "blur(0px)" : "blur(1px)",
              }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
              style={{ width: "min(62vw, 280px)", height: "min(62vw, 280px)" }}
            >
              {/* spotlight pool */}
              <div
                className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: isActive
                    ? `radial-gradient(circle at 50% 42%, ${accent}33, transparent 68%)`
                    : "radial-gradient(circle at 50% 42%, rgba(236,230,218,0.05), transparent 66%)",
                }}
              />
              {/* contact shadow */}
              <div className="absolute bottom-[10%] left-1/2 h-4 w-[55%] -translate-x-1/2 rounded-[100%] bg-black/60 blur-md" />
              {/* steam on the active dish */}
              {isActive && (
                <Steam className="left-1/2 top-[14%] -translate-x-1/2" count={3} />
              )}
              {/* dish */}
              {dish.hasImage && (
                <div className="absolute inset-[7%]">
                  <Image
                    src={`/images/dishes/${dish.id}.png`}
                    alt={dish.name}
                    fill
                    sizes="280px"
                    className="object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,0.55)]"
                  />
                </div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Active dish details */}
      <div className="relative mt-2 flex min-h-[160px] w-full max-w-md flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {activeDish && (
            <motion.div
              key={activeDish.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-bold text-ink"
                  style={{ background: accentSoft }}
                >
                  #{activeDish.id}
                </span>
                {activeDish.isNew && (
                  <span className="rounded-full bg-cream px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                    {t.menu.newLabel}
                  </span>
                )}
                <DietBadge dish={activeDish} />
                {activeDish.spice ? <SpiceMeter level={activeDish.spice} /> : null}
              </div>
              <h3 className="heading-display mt-3 text-2xl text-cream sm:text-3xl">
                {activeDish.name}
              </h3>
              {activeDish.desc && (
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/60">
                  {activeDish.desc}
                </p>
              )}
              <div className="mt-4 flex items-center gap-4">
                <span className="font-display text-2xl font-bold text-cream">
                  {activeDish.price},-
                </span>
                <button
                  onClick={() => onOpen(activeDish)}
                  className="rounded-full border border-cream/30 px-4 py-1.5 text-xs font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/10"
                >
                  {t.menu.details}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center gap-5">
        <button
          onClick={prev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-cream hover:bg-cream/10"
          aria-label={t.menu.prev}
        >
          <Arrow dir="left" />
        </button>

        <div className="flex max-w-[180px] flex-wrap justify-center gap-1.5">
          {dishes.map((d, i) => (
            <button
              key={d.id}
              onClick={() => {
                mark();
                go(i);
              }}
              aria-label={d.name}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === active ? 22 : 8,
                background: i === active ? accentSoft : "rgba(236,230,218,0.25)",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-cream hover:bg-cream/10"
          aria-label={t.menu.nextDish}
        >
          <Arrow dir="right" />
        </button>
      </div>

      <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-cream/30">
        {t.journey.dragHint}
      </p>
    </div>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M5 12h14m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
