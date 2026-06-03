"use client";

import type { Dish } from "@/data/menu";
import { useLang } from "./LangProvider";

/**
 * Small leaf badge marking vegetarian / vegan dishes. Rendered in a muted
 * sage tone that sits inside the sumi-e palette (no neon green) while keeping
 * the universal "leaf = plant-based" affordance and high contrast on ink.
 */
export function DietBadge({ dish }: { dish: Dish }) {
  const { t } = useLang();
  if (!dish.veg && !dish.vegan) return null;
  const label = dish.vegan ? t.menu.veganLabel : t.menu.vegLabel;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-sage/40 bg-sage/10 px-2 py-0.5 text-[10px] font-semibold text-sage"
      title={label}
    >
      <LeafIcon />
      {dish.vegan ? "VG" : "V"}
    </span>
  );
}

export function LeafIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19c0-7 5-12 14-13 0 9-5 14-12 14-1 0-2 0-2-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 15c2-2 4-3 7-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** A small filled star marking house favourites. */
export function StarIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 3 2.6 5.7 6.2.6-4.7 4.1 1.4 6.1L12 16.9 6.5 19.6l1.4-6.1L3.2 9.3l6.2-.6L12 3Z" />
    </svg>
  );
}

/** Favourite/"house favourite" badge using the seal-red accent. */
export function PopularBadge() {
  const { t } = useLang();
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-chilli/50 bg-chilli/15 px-2 py-0.5 text-[10px] font-semibold text-chilli-glow"
      title={t.menu.popularLabel}
    >
      <StarIcon />
      {t.menu.popularLabel}
    </span>
  );
}
