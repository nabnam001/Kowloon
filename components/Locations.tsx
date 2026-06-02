"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { locations } from "@/data/site";

export function Locations() {
  const { t, lang } = useLang();

  // interior photo strips per shop (from the real venue photography)
  const galleries: Record<string, string[]> = {
    frederiksgade: [
      "/images/venue/interior-1.jpg",
      "/images/venue/interior-2.jpg",
      "/images/venue/interior-3.jpg",
    ],
    banegaardsgade: [
      "/images/venue/banegaardsgade-interior-1.jpg",
      "/images/venue/banegaardsgade-interior-2.jpg",
      "/images/venue/banegaardsgade-dishes.jpg",
    ],
  };

  return (
    <section
      id="locations"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-indigo-deep/30 to-ink" />
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker justify-center">
            <span className="h-px w-8 bg-gold" />
            {t.locations.kicker}
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="heading-display mt-4 text-3xl text-cream sm:text-4xl">
            {t.locations.title}
          </h2>
          <p className="mt-4 text-cream/60">{t.locations.subtitle}</p>
        </Reveal>

        {/* "vs" comparison layout */}
        <div className="relative mt-14 grid gap-6 lg:grid-cols-2">
          {/* center VS badge */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-ink text-sm font-bold uppercase tracking-widest text-gold shadow-xl">
              {lang === "da" ? "vs" : "vs"}
            </div>
          </div>

          {locations.map((loc, i) => (
            <Reveal key={loc.id} delay={i * 0.12} as="article">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass transition-all duration-500 hover:border-gold/40 hover:shadow-2xl hover:shadow-chilli/10">
                {/* Photo header */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={loc.photo}
                    alt={loc.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/40 to-transparent" />
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-ink/60 px-3 py-1.5 text-gold backdrop-blur">
                    <PinIcon small />
                    <span className="text-xs font-semibold uppercase tracking-widest">
                      {loc.city}
                    </span>
                  </div>

                  {/* floating stats */}
                  <div className="absolute inset-x-5 bottom-4 flex justify-between">
                    {loc.stats.map((s) => (
                      <div key={s.label.en} className="text-center">
                        <div className="font-display text-2xl font-bold text-cream">
                          {s.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-wide text-cream/60">
                          {s.label[lang]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col p-7">
                  <div className="relative">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="heading-display text-2xl text-cream">
                        {loc.name}
                      </h3>
                      <span className="shrink-0 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
                        {loc.tagline[lang]}
                      </span>
                    </div>
                    <p className="mt-4 text-cream/70">{loc.blurb[lang]}</p>

                    {/* interior photo strip */}
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {galleries[loc.id].map((src, gi) => (
                        <div
                          key={src}
                          className="relative aspect-[4/3] overflow-hidden rounded-lg"
                        >
                          <Image
                            src={src}
                            alt={`${loc.name} ${gi + 1}`}
                            fill
                            sizes="(max-width: 1024px) 33vw, 16vw"
                            className="object-cover transition-transform duration-700 hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Feature checklist */}
                    <ul className="mt-6 grid gap-2">
                      {loc.features.map((f, fi) => (
                        <motion.li
                          key={f.en}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.05 * fi }}
                          className={`flex items-center gap-3 text-sm ${
                            f.has ? "text-cream/80" : "text-cream/35"
                          }`}
                        >
                          {f.has ? <CheckIcon /> : <CrossIcon />}
                          <span className={f.has ? "" : "line-through"}>
                            {f[lang]}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* hours + contact */}
                    <div className="mt-6 grid gap-4 border-t border-cream/10 pt-5 sm:grid-cols-2">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
                          {t.contact.hours}
                        </h4>
                        <ul className="mt-2 space-y-0.5 text-xs text-cream/70">
                          {loc.hours[lang].map((h) => (
                            <li key={h.day} className="flex justify-between gap-3">
                              <span>{h.day}</span>
                              <span className={h.closed ? "text-chilli-glow" : ""}>
                                {h.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 text-[11px] text-cream/45">
                          {loc.hoursNote[lang]}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">
                          {t.contact.reach}
                        </h4>
                        <dl className="mt-2 space-y-1.5 text-xs text-cream/70">
                          <div>
                            <a href={loc.phoneHref} className="transition-colors hover:text-gold">
                              {loc.phone}
                            </a>
                          </div>
                          <div>
                            <a
                              href={`mailto:${loc.email}`}
                              className="break-all transition-colors hover:text-gold"
                            >
                              {loc.email}
                            </a>
                          </div>
                          <div className="flex gap-3 pt-1">
                            <a
                              href={loc.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors hover:text-gold"
                            >
                              Facebook
                            </a>
                            <a
                              href={loc.eliteSmiley}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors hover:text-gold"
                            >
                              Elite Smiley
                            </a>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <a href={loc.phoneHref} className="btn-primary text-sm">
                        <PhoneIcon />
                        {loc.phone}
                      </a>
                      <a
                        href={loc.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost text-sm"
                      >
                        {t.locations.directions}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="m5 13 4 4L19 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CrossIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-cream/40">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path
          d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function PinIcon({ small }: { small?: boolean }) {
  const s = small ? 16 : 18;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L17 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 1-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
