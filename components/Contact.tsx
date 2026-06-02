"use client";

import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { locations } from "@/data/site";

export function Contact() {
  const { t, lang } = useLang();

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker justify-center">
            <span className="h-px w-8 bg-chilli" />
            {t.contact.kicker}
            <span className="h-px w-8 bg-chilli" />
          </span>
          <h2 className="heading-display mt-4 text-3xl text-cream sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-cream/60">{t.contact.bookText}</p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          {locations.map((loc, i) => (
            <Reveal key={loc.id} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-cream/10 bg-ink-800/50 p-6">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                  {loc.city}
                </span>
                <h3 className="mt-1 font-display text-xl font-semibold text-cream">
                  {loc.name}
                </h3>
                <p className="mt-0.5 text-sm text-cream/55">{loc.address}</p>

                <div className="mt-4 flex flex-col gap-2 text-sm">
                  <a
                    href={loc.phoneHref}
                    className="flex items-center gap-2 text-cream/80 transition-colors hover:text-gold"
                  >
                    <PhoneIcon />
                    {loc.phone}
                  </a>
                  <a
                    href={`mailto:${loc.email}`}
                    className="flex items-center gap-2 break-all text-cream/80 transition-colors hover:text-gold"
                  >
                    <MailIcon />
                    {loc.email}
                  </a>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={loc.phoneHref} className="btn-primary text-sm">
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
                  <a
                    href={loc.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-cream hover:text-gold"
                    aria-label="Facebook"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs text-cream/45">
          {lang === "da"
            ? "Bordbestilling og take-away klares over telefonen eller i restauranten — ikke via mail. Se åbningstider under “Find os”."
            : "Table booking and take-away are handled by phone or in the restaurant — not by email. See opening hours under “Find us”."}
        </p>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L17 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 1-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
