"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { dishes, CUISINE_LABELS, type Cuisine, type Dish } from "@/data/menu";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { DishCard } from "./DishCard";
import { DishModal } from "./DishModal";

type DietFilter = "all" | "veg" | "vegan" | "new" | "spicy";

const cuisineOrder: (Cuisine | "all")[] = [
  "all",
  "forret",
  "kina",
  "thailand",
  "vietnam",
  "vegetar",
  "grill",
  "dessert",
];

const cuisineGlow: Record<Cuisine | "all", string> = {
  all: "rgba(178,58,46,0.10)",
  forret: "rgba(236,230,218,0.06)",
  kina: "rgba(178,58,46,0.12)",
  thailand: "rgba(236,230,218,0.07)",
  vietnam: "rgba(178,58,46,0.10)",
  vegetar: "rgba(52,211,153,0.08)",
  grill: "rgba(236,230,218,0.06)",
  dessert: "rgba(236,230,218,0.07)",
};

export function Menu() {
  const { t, lang } = useLang();
  const [cuisine, setCuisine] = useState<Cuisine | "all">("all");
  const [diet, setDiet] = useState<DietFilter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Dish | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dishes.filter((d) => {
      if (cuisine !== "all" && d.cuisine !== cuisine) return false;
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
  }, [cuisine, diet, query]);

  const dietChips: { id: DietFilter; label: string }[] = [
    { id: "all", label: t.menu.filters.all },
    { id: "veg", label: t.menu.filters.veg },
    { id: "vegan", label: t.menu.filters.vegan },
    { id: "new", label: t.menu.filters.new },
    { id: "spicy", label: t.menu.filters.spicy },
  ];

  return (
    <section id="menu" className="relative scroll-mt-24 py-20 sm:py-28">
      {/* ambient glow shifts with the selected cuisine */}
      <motion.div
        key={cuisine}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: cuisineGlow[cuisine] }}
      />

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker justify-center">
            <span className="h-px w-8 bg-gold" />
            {t.menu.kicker}
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="heading-display mt-4 text-4xl text-cream sm:text-5xl">
            {t.menu.title}
          </h2>
          <p className="mt-4 text-cream/60">{t.menu.subtitle}</p>
        </Reveal>

        {/* Controls */}
        <div className="sticky top-[68px] z-30 mt-10 -mx-5 px-5 py-3 sm:mx-0 sm:rounded-2xl sm:px-4">
          <div className="rounded-2xl glass p-3 sm:p-4">
            {/* Cuisine tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {cuisineOrder.map((c) => {
                const label =
                  c === "all"
                    ? t.menu.filters.all
                    : CUISINE_LABELS[c][lang];
                const isActive = cuisine === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCuisine(c)}
                    aria-pressed={isActive}
                    className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                      isActive
                        ? "text-ink"
                        : "text-cream/70 hover:text-cream"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="cuisine-pill"
                        className="absolute inset-0 rounded-full bg-cream"
                        transition={{ type: "spring", damping: 28, stiffness: 320 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                );
              })}
              {/* jump to drinks & wine */}
              <a
                href="#drinks"
                className="ml-1 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-cream/15 px-4 py-2 text-sm font-semibold text-cream/70 transition-colors hover:border-cream/40 hover:text-cream"
              >
                {t.drinks.tabDrinks} & {t.drinks.tabWine}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Diet chips + search */}
            <div className="mt-3 flex flex-col gap-3 border-t border-white/5 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {dietChips.map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setDiet(chip.id)}
                    aria-pressed={diet === chip.id}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                      diet === chip.id
                        ? "bg-chilli text-white"
                        : "bg-white/5 text-cream/70 hover:bg-white/10 hover:text-cream"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              <div className="relative sm:w-64">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cream/40"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="m20 20-3-3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
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
        </div>

        {/* Count */}
        <p className="mt-6 text-center text-sm text-cream/60" aria-live="polite">
          {t.menu.count(filtered.length)}
        </p>

        {/* Grid */}
        <motion.div
          layout
          className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((dish) => (
              <DishCard key={dish.id} dish={dish} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-cream/50">{t.menu.empty}</p>
        )}
      </div>

      <DishModal dish={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
