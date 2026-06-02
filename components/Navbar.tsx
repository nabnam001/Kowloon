"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "./LangProvider";
import type { Lang } from "@/data/i18n";

const sections = ["home", "menu", "about", "locations", "contact"] as const;

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const navItems = sections.map((s) => ({ id: s, label: t.nav[s] }));

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink/85 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="container-x flex items-center justify-between">
          <a
            href="#home"
            className="relative z-10 flex items-center gap-3"
            aria-label="Kowloon — forside"
          >
            <Image
              src="/brand/logo.svg"
              alt="Kowloon"
              width={150}
              height={34}
              priority
              className="h-7 w-auto brightness-0 invert sm:h-8"
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active === item.id
                      ? "text-gold"
                      : "text-cream/70 hover:text-cream"
                  }`}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LangToggle lang={lang} setLang={setLang} />
            <a href="#locations" className="btn-primary hidden sm:inline-flex">
              {t.hero.ctaBook}
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full glass lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-5 bg-cream"
                />
                <motion.span
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-0.5 w-5 bg-cream"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-5 bg-cream"
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 flex h-full w-72 max-w-[80vw] flex-col gap-2 border-l border-white/10 bg-ink-800 px-6 pb-8 pt-24"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  className={`rounded-xl px-4 py-3 text-lg font-medium transition-colors ${
                    active === item.id
                      ? "bg-white/5 text-gold"
                      : "text-cream/80 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#locations"
                onClick={() => setOpen(false)}
                className="btn-primary mt-4"
              >
                {t.hero.ctaBook}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LangToggle({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="flex items-center rounded-full glass p-0.5 text-xs font-semibold">
      {(["da", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`relative rounded-full px-3 py-1.5 uppercase transition-colors ${
            lang === l ? "text-ink" : "text-cream/60 hover:text-cream"
          }`}
          aria-pressed={lang === l}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-gold"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            />
          )}
          <span className="relative">{l}</span>
        </button>
      ))}
    </div>
  );
}
