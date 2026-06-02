"use client";

import Image from "next/image";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { contact } from "@/data/site";

const icons = [
  // experience
  <path
    key="x"
    d="M12 8v4l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
  />,
  // kitchens
  <path
    key="k"
    d="M3 11h18M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M6 11v8m12-8v8M4 19h16"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  // smiley (rendered separately as image)
  null,
  // box
  <path
    key="b"
    d="M3 7.5 12 3l9 4.5M3 7.5 12 12m-9-4.5V16.5L12 21m0-9 9-4.5M12 12v9m9-13.5V16.5L12 21"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
];

export function Highlights() {
  const { t } = useLang();
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker justify-center">
            <span className="h-px w-8 bg-gold" />
            {t.highlights.title}
            <span className="h-px w-8 bg-gold" />
          </span>
          <h2 className="heading-display mt-4 text-3xl text-cream sm:text-4xl">
            {t.highlights.subtitle}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.highlights.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.1} as="article">
              <a
                href={i === 2 ? contact.eliteSmiley : "#menu"}
                target={i === 2 ? "_blank" : undefined}
                rel={i === 2 ? "noopener noreferrer" : undefined}
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-chilli/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0" />
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-soft/30 to-chilli/20 text-gold">
                  {i === 2 ? (
                    <Image
                      src="/brand/elite-smiley.png"
                      alt="Elite Smiley"
                      width={40}
                      height={40}
                      className="h-9 w-9 object-contain"
                    />
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      {icons[i]}
                    </svg>
                  )}
                </div>
                <h3 className="font-display text-xl font-semibold text-cream">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-cream/60">
                  {item.text}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
