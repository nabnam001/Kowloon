"use client";

import type { Dish } from "@/data/menu";
import { useLang } from "./LangProvider";

/** Small leaf icons marking vegetarian / vegan dishes. */
export function DietBadge({ dish }: { dish: Dish }) {
  const { t } = useLang();
  if (!dish.veg && !dish.vegan) return null;
  const label = dish.vegan ? t.menu.veganLabel : t.menu.vegLabel;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300"
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
