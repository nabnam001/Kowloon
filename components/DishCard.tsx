"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dish } from "@/data/menu";
import { useLang } from "./LangProvider";
import { SpiceMeter } from "./SpiceMeter";

export function DishCard({
  dish,
  onOpen,
}: {
  dish: Dish;
  onOpen: (d: Dish) => void;
}) {
  const { t } = useLang();
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      onClick={() => onOpen(dish)}
      aria-label={`${dish.name} — ${dish.price} kr. ${t.menu.details}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl glass text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-xl hover:shadow-chilli/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-indigo-deep/60 to-ink">
        {dish.hasImage ? (
          <Image
            src={`/images/dishes/${dish.id}.png`}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-2"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-cream/20">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 7a2 2 0 0 1 2-2h2l1-2h8l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle cx="12" cy="12.5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-bold text-gold backdrop-blur">
          #{dish.id}
        </span>

        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {dish.isNew && (
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
              {t.menu.newLabel}
            </span>
          )}
          {dish.veg && (
            <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
              🌱
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-800 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-snug text-cream line-clamp-2">
            {dish.name}
          </h3>
          <span className="shrink-0 font-display text-lg font-bold text-gold">
            {dish.price},-
          </span>
        </div>
        {dish.desc && (
          <p className="text-xs leading-relaxed text-cream/50 line-clamp-2">
            {dish.desc}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <SpiceMeter level={dish.spice ?? 0} />
          <span className="flex items-center gap-1 text-xs font-medium text-gold/70 transition-colors group-hover:text-gold">
            {t.menu.details}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d="M5 12h14m0 0-6-6m6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </motion.button>
  );
}
