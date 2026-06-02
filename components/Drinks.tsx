"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { drinks, wines, houseWine, type Wine } from "@/data/drinks";

const wineTypeColor: Record<Wine["type"], string> = {
  Hvidvin: "text-amber-200",
  Rødvin: "text-chilli-glow",
  Rosévin: "text-pink-300",
  "Mousserende vin": "text-yellow-200",
  "Husets vin": "text-gold",
};

export function Drinks() {
  const { t } = useLang();
  const [tab, setTab] = useState<"drinks" | "wine">("drinks");

  return (
    <section id="drinks" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker justify-center">
            <span className="h-px w-8 bg-gold" />
            {t.drinks.kicker}
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="heading-display mt-4 text-3xl text-cream sm:text-4xl">
            {t.drinks.title}
          </h2>
        </Reveal>

        {/* Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="flex rounded-full glass p-1">
            {(["drinks", "wine"] as const).map((tb) => (
              <button
                key={tb}
                onClick={() => setTab(tb)}
                aria-pressed={tab === tb}
                className={`relative rounded-full px-6 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                  tab === tb ? "text-ink" : "text-cream/70 hover:text-cream"
                }`}
              >
                {tab === tb && (
                  <motion.span
                    layoutId="drink-tab"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: "spring", damping: 26, stiffness: 300 }}
                  />
                )}
                <span className="relative">
                  {tb === "drinks" ? t.drinks.tabDrinks : t.drinks.tabWine}
                </span>
              </button>
            ))}
          </div>
        </div>

        {tab === "drinks" ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {drinks.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.05}>
                <div className="flex h-full gap-4 rounded-3xl glass p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30">
                  {d.img && (
                    <div className="relative h-24 w-20 shrink-0">
                      <Image
                        src={`/images/drinks/${d.img}.png`}
                        alt={d.name}
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-cream">
                        {d.name}
                      </h3>
                      {d.price && (
                        <span className="shrink-0 font-display font-bold text-gold">
                          {d.price},-
                        </span>
                      )}
                    </div>
                    {d.options && (
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {d.options.map((o) => (
                          <li
                            key={o}
                            className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-cream/60"
                          >
                            {o}
                          </li>
                        ))}
                      </ul>
                    )}
                    {d.lines && (
                      <ul className="mt-2 space-y-1">
                        {d.lines.map((l) => (
                          <li
                            key={l.label}
                            className="flex justify-between text-sm text-cream/70"
                          >
                            <span>{l.label}</span>
                            <span className="font-medium text-cream">
                              {l.price},-
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-12">
            {/* House wine highlight */}
            <Reveal>
              <div className="mb-6 flex items-center gap-5 rounded-3xl border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent p-6">
                <div className="relative h-28 w-16 shrink-0">
                  <Image
                    src={`/images/wine/${houseWine.img}.png`}
                    alt={houseWine.name}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-xl font-semibold text-gold">
                      {houseWine.name}
                    </h3>
                    <span className="font-display text-lg font-bold text-cream">
                      {houseWine.price},-
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-cream/60">{houseWine.desc}</p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {wines.map((w, i) => (
                <Reveal key={w.id} delay={(i % 3) * 0.05}>
                  <div className="flex h-full gap-4 rounded-3xl glass p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30">
                    <div className="relative h-32 w-14 shrink-0">
                      {w.img ? (
                        <Image
                          src={`/images/wine/${w.img}.${w.ext ?? "png"}`}
                          alt={w.name}
                          fill
                          sizes="56px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center rounded-lg bg-white/5 text-2xl">
                          🍷
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase tracking-widest text-cream/40">
                        #{w.id}
                      </span>
                      <h3 className="font-display text-base font-semibold leading-snug text-cream">
                        {w.name}
                      </h3>
                      <div className="mt-1 flex items-center justify-between">
                        <span
                          className={`text-xs font-medium ${wineTypeColor[w.type]}`}
                        >
                          {w.type}
                        </span>
                        <span className="font-display font-bold text-gold">
                          {w.price},-
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-cream/50 line-clamp-3">
                        {w.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
