"use client";

import Image from "next/image";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { locations } from "@/data/site";

export function Locations() {
  const { t, lang } = useLang();
  const photos: Record<string, string> = {
    frederiksgade: "/images/venue/front.png",
    banegaardsgade: "/images/venue/banegaardsgade-front.jpg",
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

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {locations.map((loc, i) => (
            <Reveal key={loc.id} delay={i * 0.1} as="article">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass transition-all duration-500 hover:border-gold/30">
                {/* Photo header */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={photos[loc.id]}
                    alt={loc.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/30 to-transparent" />
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-ink/60 px-3 py-1.5 text-gold backdrop-blur">
                    <PinIcon small />
                    <span className="text-xs font-semibold uppercase tracking-widest">
                      {loc.city}
                    </span>
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col p-7">
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-chilli/10 blur-3xl transition-opacity duration-700 group-hover:bg-chilli/20" />

                  <div className="relative">
                    <h3 className="heading-display text-2xl text-cream">
                      {loc.name}
                    </h3>
                    <p className="mt-1 text-sm text-gold/80">{loc.tagline[lang]}</p>
                    <p className="mt-4 text-cream/70">{loc.blurb[lang]}</p>

                    <dl className="mt-6 space-y-2 text-sm">
                      <div className="flex items-center gap-3 text-cream/80">
                        <PinIcon small />
                        <span>
                          {loc.address}, {loc.city}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-cream/80">
                        <PhoneIcon />
                        <a
                          href={loc.phoneHref}
                          className="transition-colors hover:text-gold"
                        >
                          {loc.phone}
                        </a>
                      </div>
                    </dl>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <a href={loc.phoneHref} className="btn-primary text-sm">
                        <PhoneIcon />
                        {t.locations.call}
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
