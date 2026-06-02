"use client";

import Image from "next/image";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { pricing, takeawayBoxes } from "@/data/site";
import { extras } from "@/data/menu";

export function Deals() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-indigo-deep/40 to-ink" />
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker justify-center">
            <span className="h-px w-8 bg-gold" />
            {t.deals.kicker}
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="heading-display mt-4 text-3xl text-cream sm:text-4xl">
            {t.deals.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* 2-course */}
          <Reveal>
            <DealCard
              title={t.deals.two}
              price={pricing.menu2}
              icons={["forret", "hovedret"]}
              labels={[t.deals.single.forret, t.deals.single.hovedret]}
            />
          </Reveal>
          {/* 3-course */}
          <Reveal delay={0.1}>
            <DealCard
              title={t.deals.three}
              price={pricing.menu3}
              icons={["forret", "hovedret", "dessert"]}
              labels={[
                t.deals.single.forret,
                t.deals.single.hovedret,
                t.deals.single.dessert,
              ]}
              featured
            />
          </Reveal>
        </div>

        {/* Single prices + note */}
        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-cream/70">
            <Pill label={t.deals.single.forret} price={pricing.forret} />
            <Pill label={t.deals.single.hovedret} price={pricing.hovedret} />
            <Pill label={t.deals.single.dessert} price={pricing.dessert} />
          </div>
          <p className="mt-4 text-center text-xs text-cream/40">
            {pricing.menuNote}
          </p>
        </Reveal>

        {/* Take-away + extras */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl glass p-7">
              <h3 className="font-display text-xl font-semibold text-gold">
                {t.deals.takeaway}
              </h3>
              <div className="mt-5 space-y-2">
                {takeawayBoxes.map((b) => (
                  <div
                    key={b.size}
                    className="flex items-center justify-between border-b border-white/5 pb-2 text-cream/80"
                  >
                    <span>{b.size}</span>
                    <span className="font-semibold text-cream">{b.price},-</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl glass p-7">
              <h3 className="font-display text-xl font-semibold text-gold">
                {t.deals.extras}
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {extras.map((e) => (
                  <div
                    key={e.name}
                    className="flex items-center justify-between border-b border-white/5 pb-1.5 text-cream/70"
                  >
                    <span className="truncate pr-2">{e.name}</span>
                    <span className="shrink-0 font-medium text-cream">
                      {e.price},-
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DealCard({
  title,
  price,
  icons,
  labels,
  featured,
}: {
  title: string;
  price: number;
  icons: string[];
  labels: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full flex-col items-center overflow-hidden rounded-3xl p-8 text-center transition-transform duration-500 hover:-translate-y-1 ${
        featured
          ? "border border-gold/40 bg-gradient-to-br from-indigo/40 to-chilli/20 shadow-2xl shadow-chilli/20"
          : "glass"
      }`}
    >
      {featured && (
        <span className="absolute right-5 top-5 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
          Populær
        </span>
      )}
      <h3 className="font-display text-2xl font-semibold text-cream">{title}</h3>

      <div className="mt-8 flex items-center justify-center gap-3 sm:gap-5">
        {icons.map((ic, i) => (
          <div key={ic} className="flex items-center gap-3 sm:gap-5">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
                <Image
                  src={`/brand/${ic}.svg`}
                  alt=""
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain brightness-0 invert"
                />
              </div>
              <span className="text-xs text-cream/60">{labels[i]}</span>
            </div>
            {i < icons.length - 1 && (
              <span className="text-2xl font-light text-gold">+</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-baseline gap-1">
        <span className="font-display text-5xl font-bold text-gold-grad">
          {price}
        </span>
        <span className="text-xl text-cream/60">kr.</span>
      </div>
    </div>
  );
}

function Pill({ label, price }: { label: string; price: number }) {
  return (
    <span className="rounded-full glass px-4 py-2">
      {label} <span className="font-semibold text-gold">{price},-</span>
    </span>
  );
}
