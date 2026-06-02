"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  dishesAt,
  CUISINE_LABELS,
  localizeDish,
  type Cuisine,
  type LocationId,
} from "@/data/menu";
import { drinks, wines, houseWine } from "@/data/drinks";
import { locations } from "@/data/site";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { ItemModal, type ModalItem } from "./ItemModal";
import { dishToModal, drinkToModal, wineToModal } from "@/data/modalItems";
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
  const [modalIndex, setModalIndex] = useState<number | null>(null);

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
        const loc = localizeDish(d, lang);
        const hay = `${d.id} ${d.name} ${d.desc ?? ""} ${loc.name} ${loc.desc ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [shopDishes, diet, query, lang]);

  const grouped = useMemo(() => {
    return sectionOrder
      .map((c) => ({ cuisine: c, items: filtered.filter((d) => d.cuisine === c) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const showExtras = diet === "all" && !query;

  // The list of jump-targets shown in the rail (food + drinks + wine).
  const railSections = useMemo(() => {
    const list: { id: string; label: string; kanji: string }[] = grouped.map(
      (g) => ({
        id: `sec-${g.cuisine}`,
        label: CUISINE_LABELS[g.cuisine][lang],
        kanji: sectionKanji[g.cuisine],
      })
    );
    if (showExtras) {
      list.push({ id: "sec-drinks", label: t.drinks.tabDrinks, kanji: "飲み物" });
      if (currentLoc?.hasWine) {
        list.push({ id: "sec-wine", label: t.drinks.tabWine, kanji: "ワイン" });
      }
    }
    return list;
  }, [grouped, showExtras, currentLoc, lang, t.drinks.tabDrinks, t.drinks.tabWine]);

  const [activeSection, setActiveSection] = useState<string>("");

  // scroll-spy: highlight the section currently in view
  useEffect(() => {
    const ids = railSections.map((s) => s.id);
    if (ids.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [railSections]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Flat, ordered list of everything visible — powers the swipeable modal.
  const modalItems = useMemo<ModalItem[]>(() => {
    const list: ModalItem[] = [];
    grouped.forEach((g) => g.items.forEach((d) => list.push(dishToModal(d, lang))));
    if (showExtras) {
      drinks.forEach((d) => list.push(drinkToModal(d, t.drinks.tabDrinks)));
      if (currentLoc?.hasWine) {
        [houseWine, ...wines].forEach((w) => list.push(wineToModal(w, t.drinks.tabWine)));
      }
    }
    return list;
  }, [grouped, showExtras, currentLoc, lang, t.drinks.tabDrinks, t.drinks.tabWine]);

  const indexOf = (id: string) => modalItems.findIndex((m) => m.id === id);

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

        {/* Location switcher with shop exterior photos */}
        <div className="mt-10 grid w-full gap-4 sm:grid-cols-2">
          {locations.map((l) => {
            const isActive = l.id === (loc as string);
            const photo =
              l.id === "frederiksgade"
                ? "/images/venue/front.png"
                : "/images/venue/banegaardsgade-outside.jpg";
            return (
              <button
                key={l.id}
                onClick={() => {
                  setLoc(l.id as LocationId);
                  setDiet("all");
                  setQuery("");
                }}
                aria-pressed={isActive}
                className={`group relative overflow-hidden rounded-2xl border text-left transition-all ${
                  isActive
                    ? "border-chilli/60 ring-1 ring-chilli/40"
                    : "border-cream/12 hover:border-cream/30"
                }`}
              >
                {/* exterior photo */}
                <div className="relative h-40 overflow-hidden sm:h-44">
                  <Image
                    src={photo}
                    alt={l.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                      isActive ? "" : "grayscale"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  {isActive && (
                    <span className="absolute right-4 top-4 rounded-full bg-chilli px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cream">
                      {lang === "da" ? "Valgt" : "Selected"}
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                      {l.city}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-cream">
                      {l.name}
                    </h3>
                    <p className="text-xs text-cream/60">{l.address}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Filters + search */}
        <div className="sticky top-[64px] z-30 mx-auto mt-6 max-w-3xl">
          <div className="flex flex-col gap-3 rounded-2xl border border-cream/10 bg-ink-deep/80 p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {dietChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setDiet(chip.id)}
                  aria-pressed={diet === chip.id}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    diet === chip.id
                      ? "bg-chilli text-cream"
                      : "bg-white/5 text-cream/70 hover:bg-white/10 hover:text-cream"
                  }`}
                >
                  <FilterIcon id={chip.id} />
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

        {/* Mobile horizontal section rail */}
        {railSections.length > 0 && (
          <div className="sticky top-[124px] z-20 mx-auto mt-4 max-w-3xl lg:hidden">
            <div className="flex gap-2 overflow-x-auto rounded-full border border-cream/10 bg-ink-deep/80 p-1.5 backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {railSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => jumpTo(s.id)}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activeSection === s.id
                      ? "bg-cream text-ink"
                      : "text-cream/60 hover:text-cream"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Menu body: desktop rail + list */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[180px_1fr]">
          {/* Desktop section rail */}
          {railSections.length > 0 && (
            <aside className="hidden lg:block">
              <nav className="sticky top-[150px] flex flex-col gap-1" aria-label={t.menu.kicker}>
                {railSections.map((s) => {
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => jumpTo(s.id)}
                      className={`group flex items-center gap-3 border-l-2 py-1.5 pl-3 text-left text-sm transition-colors ${
                        isActive
                          ? "border-chilli text-cream"
                          : "border-cream/10 text-cream/45 hover:border-cream/40 hover:text-cream/80"
                      }`}
                    >
                      <span className="font-medium">{s.label}</span>
                      <span className="font-display text-xs text-cream/25">
                        {s.kanji}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </aside>
          )}

          {/* Menu list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${loc}-${diet}-${query}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="min-w-0"
            >
              {grouped.map((group) => (
                <Section
                  key={group.cuisine}
                  id={`sec-${group.cuisine}`}
                  title={CUISINE_LABELS[group.cuisine][lang]}
                  kanji={sectionKanji[group.cuisine]}
                  count={group.items.length}
                >
                  {group.items.map((dish) => {
                    const dl = localizeDish(dish, lang);
                    return (
                      <Row
                        key={dish.id}
                        onClick={() => setModalIndex(indexOf(`dish-${dish.id}`))}
                        img={dish.hasImage ? `/images/dishes/${dish.id}.png` : undefined}
                        number={dish.id}
                        name={dl.name}
                        desc={dl.desc}
                        price={dish.price}
                        badges={
                          <>
                            {dish.isNew && (
                              <span className="rounded-full bg-cream px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ink">
                                {t.menu.newLabel}
                              </span>
                            )}
                            <DietBadge dish={dish} />
                            {dish.spice ? <SpiceMeter level={dish.spice} /> : null}
                          </>
                        }
                      />
                    );
                  })}
                </Section>
              ))}

              {/* Drinks */}
              {showExtras && (
                <Section id="sec-drinks" title={t.drinks.tabDrinks} kanji="飲み物" count={drinks.length}>
                  {drinks.map((d) => (
                    <Row
                      key={d.name}
                      onClick={() => setModalIndex(indexOf(`drink-${d.name}`))}
                      img={d.img ? `/images/drinks/${d.img}.png` : undefined}
                      name={d.name}
                      desc={
                        d.options
                          ? d.options.join(" · ")
                          : d.lines?.map((l) => `${l.label} ${l.price},-`).join(" · ")
                      }
                      price={d.price}
                    />
                  ))}
                </Section>
              )}

              {/* Wine — Frederiksgade only */}
              {showExtras && currentLoc?.hasWine && (
                <Section id="sec-wine" title={t.drinks.tabWine} kanji="ワイン" count={wines.length + 1}>
                  {[houseWine, ...wines].map((w) => (
                    <Row
                      key={w.id}
                      onClick={() => setModalIndex(indexOf(`wine-${w.id}`))}
                      img={w.img ? `/images/wine/${w.img}.${w.ext ?? "png"}` : undefined}
                      narrow
                      name={w.name}
                      desc={w.desc}
                      price={w.price}
                      badges={
                        <span className="text-[10px] uppercase tracking-wide text-chilli/80">
                          {w.type}
                        </span>
                      }
                    />
                  ))}
                </Section>
              )}

              {filtered.length === 0 && (
                <p className="py-16 text-center text-cream/50">{t.menu.empty}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ItemModal
        items={modalItems}
        index={modalIndex}
        onClose={() => setModalIndex(null)}
        onIndex={setModalIndex}
      />
    </section>
  );
}

function Section({
  id,
  title,
  kanji,
  count,
  children,
}: {
  id: string;
  title: string;
  kanji: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="mb-14 scroll-mt-32">
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-cream/10 pb-3">
        <div className="flex items-baseline gap-3">
          <h3 className="heading-display text-2xl text-cream sm:text-3xl">{title}</h3>
          <span className="font-display text-lg text-cream/35">{kanji}</span>
        </div>
        <span className="text-xs uppercase tracking-widest text-cream/35">{count}</span>
      </div>
      <ul className="divide-y divide-cream/[0.06]">{children}</ul>
    </div>
  );
}

function Row({
  onClick,
  img,
  number,
  name,
  desc,
  price,
  badges,
  narrow,
}: {
  onClick: () => void;
  img?: string;
  number?: string;
  name: string;
  desc?: string;
  price?: number;
  badges?: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="group flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-cream/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:gap-5 sm:rounded-xl sm:px-3"
      >
        <div
          className={`relative h-16 shrink-0 overflow-hidden rounded-xl bg-ink-700 sm:h-20 ${
            narrow ? "w-12 sm:w-14" : "w-16 sm:w-20"
          }`}
        >
          {img ? (
            <Image
              src={img}
              alt={name}
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

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {number && <span className="font-mono text-[11px] text-cream/35">{number}</span>}
            <h4 className="font-display text-base font-semibold text-cream">{name}</h4>
            {badges}
          </div>
          {desc && (
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-cream/55">{desc}</p>
          )}
        </div>

        {price != null && (
          <div className="shrink-0 text-right">
            <span className="font-display text-lg font-bold text-gold">{price},-</span>
          </div>
        )}
      </button>
    </li>
  );
}

function FilterIcon({ id }: { id: DietFilter }) {
  const common = { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none" as const };
  if (id === "veg" || id === "vegan")
    return (
      <svg {...common}>
        <path d="M5 19c0-7 5-12 14-13 0 9-5 14-12 14-1 0-2 0-2-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  if (id === "spicy")
    return (
      <svg {...common}>
        <path d="M8 20c6 0 10-5 10-11 0-1 1-3 2-4-3 0-4 2-5 3-2-2-5-2-7 0 2 0 3 1 3 3-3 1-5 4-3 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  if (id === "new")
    return (
      <svg {...common}>
        <path d="m12 3 2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
