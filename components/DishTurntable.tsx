"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { Dish } from "@/data/menu";
import { SpiceMeter } from "./SpiceMeter";
import { useLang } from "./LangProvider";

/**
 * A 3D carousel / "lazy Susan" of dishes. Drag horizontally (or use arrows /
 * arrow keys) to spin the table. The dish at the front is highlighted with its
 * name, price and details. Built for touch, mouse and keyboard.
 */
export function DishTurntable({
  dishes,
  accent,
  accentSoft,
  glow,
  onOpen,
}: {
  dishes: Dish[];
  accent: string;
  accentSoft: string;
  glow: string;
  onOpen: (d: Dish) => void;
}) {
  const { t } = useLang();
  const count = dishes.length;
  const step = 360 / Math.max(count, 1);
  // radius scales with how many dishes so they don't overlap
  const radius = Math.round(150 + count * 14);

  const rotation = useMotionValue(0);
  const [active, setActive] = useState(0);

  // Which dish faces the viewer for a given rotation
  const indexFromRotation = (r: number) => {
    const norm = ((-r % 360) + 360) % 360;
    return Math.round(norm / step) % count;
  };

  useEffect(() => {
    const unsub = rotation.on("change", (r) => {
      const idx = indexFromRotation(r);
      setActive((prev) => (prev === idx ? prev : idx));
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, step]);

  const goTo = (idx: number) => {
    // shortest path to face dish `idx`
    const current = rotation.get();
    const target = -idx * step;
    let delta = ((target - current) % 360 + 540) % 360 - 180;
    animate(rotation, current + delta, {
      type: "spring",
      stiffness: 80,
      damping: 16,
    });
  };

  const spin = (dir: 1 | -1) => goTo((active + dir + count) % count);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const current = rotation.get();
    const velocity = info.velocity.x;
    const momentum = velocity * 0.08;
    const projected = current + momentum;
    const snapped = Math.round(projected / step) * step;
    animate(rotation, snapped, {
      type: "spring",
      stiffness: 70,
      damping: 14,
    });
  };

  const activeDish = dishes[active];

  return (
    <div className="flex w-full flex-col items-center">
      {/* Stage */}
      <div
        className="relative h-[300px] w-full select-none sm:h-[360px]"
        style={{ perspective: "1400px" }}
      >
        {/* Floor glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-[58%] h-40 w-[80%] -translate-x-1/2 rounded-[100%] blur-2xl"
          style={{ background: glow }}
        />

        <motion.div
          className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotation,
            // tilt the table slightly so it reads as 3D
            rotateX: 8,
          }}
          drag="x"
          dragElastic={0.06}
          dragMomentum={false}
          onDrag={(_, info) => rotation.set(rotation.get() + info.delta.x * 0.35)}
          onDragEnd={onDragEnd}
        >
          {dishes.map((dish, i) => (
            <Plate
              key={dish.id}
              dish={dish}
              angle={i * step}
              radius={radius}
              rotation={rotation}
              isActive={i === active}
              accent={accent}
              onOpen={onOpen}
            />
          ))}
        </motion.div>
      </div>

      {/* Active dish details */}
      <div className="relative mt-2 flex min-h-[150px] w-full max-w-md flex-col items-center text-center">
        {activeDish && (
          <motion.div
            key={activeDish.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
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
                <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                  {t.menu.newLabel}
                </span>
              )}
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
              <span
                className="font-display text-2xl font-bold"
                style={{ color: accentSoft }}
              >
                {activeDish.price},-
              </span>
              <button
                onClick={() => onOpen(activeDish)}
                className="rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors"
                style={{ borderColor: accent, color: accentSoft }}
              >
                {t.menu.details}
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center gap-5">
        <button
          onClick={() => spin(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full glass text-cream transition-transform hover:scale-110 active:scale-95"
          aria-label="Forrige ret"
          style={{ borderColor: accent }}
        >
          <Arrow dir="left" />
        </button>

        {/* dots */}
        <div className="flex max-w-[180px] flex-wrap justify-center gap-1.5">
          {dishes.map((d, i) => (
            <button
              key={d.id}
              onClick={() => goTo(i)}
              aria-label={`${d.name}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === active ? 22 : 8,
                background: i === active ? accentSoft : "rgba(247,241,230,0.25)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => spin(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full glass text-cream transition-transform hover:scale-110 active:scale-95"
          aria-label="Næste ret"
          style={{ borderColor: accent }}
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

function Plate({
  dish,
  angle,
  radius,
  rotation,
  isActive,
  accent,
  onOpen,
}: {
  dish: Dish;
  angle: number;
  radius: number;
  rotation: ReturnType<typeof useMotionValue<number>>;
  isActive: boolean;
  accent: string;
  onOpen: (d: Dish) => void;
}) {
  // counter-rotate each plate so the image always faces the viewer (billboard)
  const counter = useTransform(rotation, (r) => -r);
  const transform = useMemo(
    () => `rotateY(${angle}deg) translateZ(${radius}px)`,
    [angle, radius]
  );

  return (
    <motion.button
      className="absolute left-1/2 top-1/2 h-44 w-44 sm:h-52 sm:w-52"
      style={{
        transformStyle: "preserve-3d",
        transform,
        x: "-50%",
        y: "-50%",
      }}
      onClick={() => isActive && onOpen(dish)}
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
    >
      <motion.div
        style={{ rotateY: counter }}
        className="relative h-full w-full"
        animate={{
          scale: isActive ? 1.12 : 0.82,
          opacity: isActive ? 1 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        {/* plate ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: isActive
              ? `radial-gradient(circle at 50% 38%, ${accent}33, transparent 70%)`
              : "transparent",
          }}
        />
        <div className="absolute inset-[14%] rounded-full bg-gradient-to-br from-white/10 to-white/[0.02] shadow-2xl backdrop-blur-sm" />
        <div
          className="absolute inset-[14%] rounded-full border"
          style={{ borderColor: isActive ? `${accent}66` : "rgba(255,255,255,0.08)" }}
        />
        {dish.hasImage && (
          <Image
            src={`/images/dishes/${dish.id}.png`}
            alt={dish.name}
            fill
            sizes="208px"
            className="object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]"
          />
        )}
      </motion.div>
    </motion.button>
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
