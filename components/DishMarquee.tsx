"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { dishes } from "@/data/menu";
import { useLang } from "./LangProvider";
import { useInViewport } from "./useInViewport";

/**
 * An infinite horizontal ribbon of dish photos that drifts across the screen,
 * tying sections together with motion. Two rows scroll in opposite directions.
 * Animation pauses while the band is off-screen to save CPU/battery.
 */
export function DishMarquee() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewport<HTMLElement>("100px");

  const withImages = dishes.filter((d) => d.hasImage);
  const rowA = withImages.slice(0, 14);
  const rowB = withImages.slice(14, 28);
  const animate = !reduce && inView;

  return (
    <section
      ref={ref}
      aria-label={t.marquee.label}
      className="relative overflow-hidden border-y border-white/5 bg-gradient-to-b from-ink via-indigo-deep/20 to-ink py-12"
    >
      {/* center caption */}
      <div className="container-x relative z-10 mb-10 text-center">
        <span className="kicker justify-center">
          <span className="h-px w-8 bg-gold" />
          {t.marquee.kicker}
          <span className="h-px w-8 bg-gold" />
        </span>
        <h2 className="heading-display mt-3 text-2xl text-cream sm:text-3xl">
          {t.marquee.title}
        </h2>
      </div>

      <MarqueeRow dishes={rowA} direction={1} animate={animate} />
      <div className="h-5" />
      <MarqueeRow dishes={rowB} direction={-1} animate={animate} />

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </section>
  );
}

function MarqueeRow({
  dishes: row,
  direction,
  animate,
}: {
  dishes: typeof dishes;
  direction: 1 | -1;
  animate: boolean;
}) {
  // duplicate the row so the loop is seamless
  const loop = [...row, ...row];
  return (
    <div className="relative flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-5 pr-5"
        animate={animate ? { x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] } : undefined}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((dish, i) => (
          <div
            key={`${dish.id}-${i}`}
            className="group relative h-24 w-24 shrink-0 sm:h-28 sm:w-28"
          >
            <div className="absolute inset-0 rounded-full bg-white/[0.03] blur-md transition-colors group-hover:bg-chilli/20" />
            <Image
              src={`/images/dishes/${dish.id}.png`}
              alt=""
              fill
              sizes="112px"
              loading="lazy"
              className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
