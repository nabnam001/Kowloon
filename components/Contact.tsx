"use client";

import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { contact, hours } from "@/data/site";

export function Contact() {
  const { t, lang } = useLang();

  // Highlight today's row (0 = Sunday in JS)
  const jsDay = new Date().getDay();
  const todayIndex = jsDay === 0 ? 6 : jsDay - 1; // map to Mon..Sun order
  const hoursRows = hours[lang];
  const hoursNotes = hours.notes[lang];

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker justify-center">
            <span className="h-px w-8 bg-gold" />
            {t.contact.kicker}
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="heading-display mt-4 text-3xl text-cream sm:text-4xl">
            {t.contact.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Hours */}
          <Reveal>
            <div className="h-full rounded-3xl glass p-7">
              <h3 className="font-display text-xl font-semibold text-gold">
                {t.contact.hours}
              </h3>
              <ul className="mt-5 space-y-1">
                {hoursRows.map((h, i) => (
                  <li
                    key={h.day}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      i === todayIndex
                        ? "bg-gold/10 text-gold"
                        : "text-cream/70"
                    }`}
                  >
                    <span className="font-medium">{h.day}</span>
                    <span className={h.closed ? "text-chilli-glow" : ""}>
                      {h.value}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-xs text-cream/60">
                {hoursNotes.map((n) => (
                  <p key={n}>• {n}</p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Booking note */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl border border-gold/20 bg-gradient-to-br from-chilli/15 to-indigo/20 p-7">
              <h3 className="font-display text-xl font-semibold text-cream">
                {t.contact.bookTitle}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/70">
                {t.contact.bookText}
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href="tel:+4586191998"
                  className="btn-primary w-full text-sm"
                >
                  Frederiksgade · 86 19 19 98
                </a>
                <a
                  href="tel:+4586194211"
                  className="btn-ghost w-full text-sm"
                >
                  Banegårdsgade · 86 19 42 11
                </a>
              </div>
            </div>
          </Reveal>

          {/* Reach / follow */}
          <Reveal delay={0.2}>
            <div className="h-full rounded-3xl glass p-7">
              <h3 className="font-display text-xl font-semibold text-gold">
                {t.contact.reach}
              </h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-cream/40">E-mail</dt>
                  <dd>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-cream transition-colors hover:text-gold"
                    >
                      {contact.email}
                    </a>
                    <p className="mt-0.5 text-xs text-cream/60">
                      {contact.emailNote}
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="text-cream/40">CVR</dt>
                  <dd className="text-cream/80">{contact.cvr}</dd>
                </div>
              </dl>

              <h4 className="mt-6 text-sm font-semibold text-cream">
                {t.contact.follow}
              </h4>
              <div className="mt-3 flex gap-3">
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full glass text-cream transition-all hover:bg-gold hover:text-ink"
                  aria-label="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
                  </svg>
                </a>
                <a
                  href={contact.eliteSmiley}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center gap-2 rounded-full glass px-4 text-xs text-cream transition-all hover:bg-gold hover:text-ink"
                >
                  Elite Smiley
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
