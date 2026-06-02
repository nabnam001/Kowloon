"use client";

import Image from "next/image";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { contact } from "@/data/site";

/**
 * A quiet band of trust signals / accolades, inspired by how Mujō and other
 * world-class sites foreground their recognition. Uses only true facts.
 */
export function Accolades() {
  const { t } = useLang();
  const years = new Date().getFullYear() - contact.since;

  const items = [
    { stat: "★", label: t.accolades.elite, isImage: true },
    { stat: `${years}+`, label: t.accolades.years },
    { stat: "3", label: t.accolades.kitchens },
    { stat: "50+", label: t.accolades.dishes },
    { stat: "2", label: t.accolades.locations },
  ];

  return (
    <section className="relative border-y border-white/5 bg-ink-deep py-12 sm:py-16">
      <div className="container-x">
        <Reveal className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/70">
            {t.accolades.kicker}
          </span>
        </Reveal>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-2 text-center">
                {item.isImage ? (
                  <Image
                    src="/brand/elite-smiley.png"
                    alt="Elite Smiley"
                    width={48}
                    height={48}
                    className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                  />
                ) : (
                  <span className="font-display text-4xl font-bold text-gold-grad sm:text-5xl">
                    {item.stat}
                  </span>
                )}
                <span className="text-xs uppercase tracking-wide text-cream/60 sm:text-sm">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
