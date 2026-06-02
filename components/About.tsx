"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { contact } from "@/data/site";

export function About() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="about" ref={ref} className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image collage */}
        <div className="relative order-2 h-[26rem] lg:order-1 sm:h-[32rem]">
          {/* Main interior photo */}
          <motion.div
            style={{ y: y1 }}
            className="absolute left-0 top-4 h-64 w-52 overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-80 sm:w-64"
          >
            <Image
              src="/images/venue/interior-1.jpg"
              alt="Restaurant Kowloon indenfor"
              fill
              sizes="280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </motion.div>
          {/* Signature dish overlapping */}
          <motion.div
            style={{ y: y2 }}
            className="absolute right-2 top-24 h-60 w-48 overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-chilli/20 to-indigo/30 p-4 sm:right-6 sm:h-72 sm:w-60"
          >
            <Image
              src="/images/dishes/40.png"
              alt="Phat thai"
              fill
              sizes="240px"
              className="object-contain p-3"
            />
          </motion.div>
          {/* Second interior / kitchen */}
          <motion.div
            style={{ y: y1 }}
            className="absolute bottom-0 left-8 h-44 w-36 overflow-hidden rounded-3xl border border-white/10 shadow-xl sm:left-16 sm:h-52 sm:w-44"
          >
            <Image
              src="/images/venue/interior-3.jpg"
              alt="Stemning i restauranten"
              fill
              sizes="180px"
              className="object-cover"
            />
          </motion.div>

          {/* Years badge */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 12, delay: 0.3 }}
            className="absolute bottom-8 right-0 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-chilli text-center shadow-xl shadow-chilli/40 sm:h-32 sm:w-32"
          >
            <span className="font-display text-3xl font-bold text-white sm:text-4xl">
              {new Date().getFullYear() - contact.since}+
            </span>
            <span className="text-[10px] uppercase tracking-wider text-white/80">
              år i Aarhus
            </span>
          </motion.div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="kicker">
              <span className="h-px w-8 bg-gold" />
              {t.about.kicker}
            </span>
            <h2 className="heading-display mt-4 text-3xl text-cream sm:text-4xl lg:text-5xl">
              {t.about.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-cream/70">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="#menu" className="btn-primary mt-8">
              {t.hero.ctaMenu}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
