"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  dishesAt,
  CUISINE_LABELS,
  type Cuisine,
  type Dish,
  type LocationId,
} from "@/data/menu";
import { drinks, wines, houseWine } from "@/data/drinks";
import { locations } from "@/data/site";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { DishModal } from "./DishModal";
import { DietBadge } from "./DietBadge";
import { SpiceMeter } from "./SpiceMeter";

type DietFilter = "all" | "veg" | "vegan" | "new" | "spicy";

const sectionOrder: Cuisine[] = [
  "forret",
  "kina",
  "thailand",
  "vietnam",
  "vegetar",
  "grill",
  "dessert",
];

// Kanji label per section for the Raku-style bilingual header
const sectionKanji: Record<Cuisine, string> = {
  forret: "前菜",
  kina: "中華",
  thailand: "タイ",
  vietnam: "越南",
  vegetar: "野菜",
  grill: "焼き",
  dessert: "甘味",
};

export function Menu() {
  const { t, lang } = useLang();
  const [loc, setLoc] = useState<LocationId>("frederiksgade");
  const [diet, setDiet] = useState<DietFilter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Dish | null>(null);

  const shopDishes = useMemo(() => dishesAt(loc), [loc]);
  const currentLoc = useMemo(
    () => locations.find((l) => l.id === (loc as string)),
    [loc]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return shopDishes.filter((d) => {
      if (diet === "veg" && !d.veg) return false;
      if (diet === "vegan" && !d.vegan) return false;
      if (diet === "new" && !d.isNew) return false;
      if (diet === "spicy" && (d.spice ?? 0) < 2) return false;
      if (q) {
        const hay = `${d.id} ${d.name} ${d.desc ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [shopDishes, diet, query]);

  const grouped = useMemo(() => {
    return sectionOrder
      .map((c) => ({ cuisine: c, items: filtered.filter((d) => d.cuisine === c) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const dietChips: { id: DietFilter; label: string }[] = [
    { id: "all", label: t.menu.filters.all },
    { id: "veg", label: t.menu.filters.veg },
    { id: "vegan", label: t.menu.filters.vegan },
    { id: "new", label: t.menu.filters.new },
    { id: "spicy", label: t.menu.filters.spicy },
  ];

  return (
    <section id="menu" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker justify-center">
            <span className="h-px w-8 bg-chilli" />
            {t.menu.kicker}
            <span className="h-px w-8 bg-chilli" />
          </span>
          <h2 className="heading-display mt-4 text-4xl text-cream sm:text-5xl">
            {t.menu.title}
          </h2>
          <p className="mt-4 text-cream/60">{t.menu.locationSubtitle}</p>
        </Reveal>

        {/* Location switcher — choose a shop, see what it serves */}
        <div className="mt-10 flex justify-center">
          <div className="grid w-full max-w-2xl grid-cols-2 gap-3">
            {locations.map((l) => {
              const isActive = l.id === (loc as string);
              return (
                <button
                  key={l.id}
                  onClick={() => setLoc(l.id as LocationId)}
                  aria-pressed={isActive}
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all ${
                    isActive
                      ? "border-chilli/60 bg-chilli/10"
                      : "border-cream/12 bg-ink-800/50 hover:border-cream/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isActive ? "bg-chilli" : "bg-cream/30"
                      }`}
                    />
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-cream/50">
                      {l.city}
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-lg font-semibold text-cream">
                    {l.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-cream/50">{l.address}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Diet chips + search */}
        <div className="sticky top-[64px] z-30 mx-auto mt-6 max-w-3xl">
          <div className="flex flex-col gap-3 rounded-2xl border border-cream/10 bg-ink-deep/80 p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {dietChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setDiet(chip.id)}
                  aria-pressed={diet === chip.id}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    diet === chip.id
                      ? "bg-chilli text-cream"
                      : "bg-white/5 text-cream/70 hover:bg-white/10 hover:text-cream"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
            <div className="relative sm:w-56">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cream/40"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.menu.search}
                className="w-full rounded-full border border-white/10 bg-ink/60 py-2 pl-9 pr-4 text-sm text-cream placeholder:text-cream/40 focus:border-gold/50 focus:outline-none"
                aria-label={t.menu.search}
              />
            </div>
          </div>
        </div>

        {/* legend */}
        <div className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-cream/45">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-4 items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 text-emerald-300">V</span>
            {t.menu.vegLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-4 items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 text-emerald-300">VG</span>
            {t.menu.veganLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <SpiceMeter level={2} /> {t.menu.spice}
          </span>
        </div>

        {/* Menu list grouped by section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={loc}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mx-auto mt-12 max-w-3xl"
          >
            {grouped.map((group) => (
              <div key={group.cuisine} className="mb-14 scroll-mt-32">
                {/* bilingual section header */}
                <div className="mb-6 flex items-end justify-between gap-4 border-b border-cream/10 pb-3">
                  <div className="flex items-baseline gap-3">
                    <h3 className="heading-display text-2xl text-cream sm:text-3xl">
                      {CUISINE_LABELS[group.cuisine][lang]}
                    </h3>
                    <span className="font-display text-lg text-cream/35">
                      {sectionKanji[group.cuisine]}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-cream/35">
                    {group.items.length}
                  </span>
                </div>

                <ul className="divide-y divide-cream/[0.06]">
                  {group.items.map((dish) => (
                    <li key={dish.id}>
                      <button
                        onClick={() => setSelected(dish)}
                        className="group flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-cream/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:gap-5 sm:rounded-xl sm:px-3"
                      >
                        {/* thumbnail */}
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-ink-700 sm:h-20 sm:w-20">
                          {dish.hasImage ? (
                            <Image
                              src={`/images/dishes/${dish.id}.png`}
                              alt={dish.name}
                              fill
                              sizes="80px"
                              className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-cream/20">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 7a2 2 0 0 1 2-2h2l1-2h8l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.4" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* text */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-cream/35">
                              {dish.id}
                            </span>
                            <h4 className="truncate font-display text-base font-semibold text-cream">
                              {dish.name}
                            </h4>
                            {dish.isNew && (
                              <span className="rounded-full bg-cream px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ink">
                                {t.menu.newLabel}
                              </span>
                            )}
                            <DietBadge dish={dish} />
                            {dish.spice ? <SpiceMeter level={dish.spice} /> : null}
                          </div>
                          {dish.desc && (
                            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-cream/55">
                              {dish.desc}
                            </p>
                          )}
                        </div>

                        {/* price */}
                        <div className="shrink-0 text-right">
                          <span className="font-display text-lg font-bold text-gold">
                            {dish.price},-
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Drinks section */}
            {(diet === "all") && !query && (
              <div className="mb-14 scroll-mt-32">
                <div className="mb-6 flex items-end justify-between gap-4 border-b border-cream/10 pb-3">
                  <div className="flex items-baseline gap-3">
                    <h3 className="heading-display text-2xl text-cream sm:text-3xl">
                      {t.drinks.tabDrinks}
                    </h3>
                    <span className="font-display text-lg text-cream/35">飲み物</span>
                  </div>
                </div>
                <ul className="divide-y divide-cream/[0.06]">
                  {drinks.map((d) => (
                    <li key={d.name} className="flex items-center gap-4 py-4 sm:gap-5 sm:px-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-ink-700 sm:h-20 sm:w-20">
                        {d.img && (
                          <Image
                            src={`/images/drinks/${d.img}.png`}
                            alt={d.name}
                            fill
                            sizes="80px"
                            className="object-contain p-1.5"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-display text-base font-semibold text-cream">
                            {d.name}
                          </h4>
                          {d.price && (
                            <span className="shrink-0 font-display text-lg font-bold text-gold">
                              {d.price},-
                            </span>
                          )}
                        </div>
                        {d.options && (
                          <p className="mt-1 text-sm text-cream/55">
                            {d.options.join(" · ")}
                          </p>
                        )}
                        {d.lines && (
                          <ul className="mt-1 space-y-0.5">
                            {d.lines.map((l) => (
                              <li key={l.label} className="flex justify-between text-sm text-cream/55">
                                <span>{l.label}</span>
                                <span className="text-cream/80">{l.price},-</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Wine section — Frederiksgade only */}
            {currentLoc?.hasWine && diet === "all" && !query && (
              <div className="mb-14 scroll-mt-32">
                <div className="mb-6 flex items-end justify-between gap-4 border-b border-cream/10 pb-3">
                  <div className="flex items-baseline gap-3">
                    <h3 className="heading-display text-2xl text-cream sm:text-3xl">
                      {t.drinks.tabWine}
                    </h3>
                    <span className="font-display text-lg text-cream/35">ワイン</span>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-cream/35">
                    {wines.length + 1}
                  </span>
                </div>
                <ul className="divide-y divide-cream/[0.06]">
                  {[houseWine, ...wines].map((w) => (
                    <li key={w.id} className="flex items-center gap-4 py-4 sm:gap-5 sm:px-3">
                      <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-ink-700 sm:h-20 sm:w-14">
                        {w.img ? (
                          <Image
                            src={`/images/wine/${w.img}.${w.ext ?? "png"}`}
                            alt={w.name}
                            fill
                            sizes="56px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xl">🍷</div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-display text-base font-semibold text-cream">
                            {w.name}
                          </h4>
                          <span className="shrink-0 font-display text-lg font-bold text-gold">
                            {w.price},-
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs uppercase tracking-wide text-chilli/80">
                          {w.type}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-cream/55">{w.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-cream/50">{t.menu.empty}</p>
        )}
      </div>

      <DishModal dish={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
