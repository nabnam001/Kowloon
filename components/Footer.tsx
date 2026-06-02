"use client";

import Image from "next/image";
import { useLang } from "./LangProvider";
import { contact } from "@/data/site";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-deep">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="container-x py-14">
        <div className="flex flex-col items-center gap-6 text-center">
          <Image
            src="/brand/logo.svg"
            alt="Kowloon"
            width={200}
            height={45}
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="max-w-md text-sm text-cream/50">{t.footer.tagline}</p>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-cream/60">
            <a href="#menu" className="transition-colors hover:text-gold">
              {t.nav.menu}
            </a>
            <a href="#about" className="transition-colors hover:text-gold">
              {t.nav.about}
            </a>
            <a href="#locations" className="transition-colors hover:text-gold">
              {t.nav.locations}
            </a>
            <a href="#contact" className="transition-colors hover:text-gold">
              {t.nav.contact}
            </a>
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              Facebook
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-cream/60 sm:flex-row">
          <p>
            © {year} Kowloon · CVR: {contact.cvr}
          </p>
          <p>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
