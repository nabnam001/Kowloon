"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Dish } from "@/data/menu";
import { CUISINE_LABELS } from "@/data/menu";
import { useLang } from "./LangProvider";
import { SpiceMeter } from "./SpiceMeter";

export function DishModal({
  dish,
  onClose,
}: {
  dish: Dish | null;
  onClose: () => void;
}) {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (dish) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      // Move focus into the dialog for keyboard/screen-reader users
      const id = window.setTimeout(() => closeRef.current?.focus(), 50);
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
        window.clearTimeout(id);
      };
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [dish, onClose]);

  return (
    <AnimatePresence>
      {dish && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={dish.name}
        >
          <div
            className="absolute inset-0 bg-ink/85 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-3xl border border-white/10 bg-gradient-to-b from-ink-700 to-ink-800 shadow-2xl sm:rounded-3xl"
          >
            {/* Hero plate stage */}
            <div className="relative h-72 overflow-hidden">
              {/* ambient backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(178,58,46,0.25),transparent_70%)]" />
              {/* oversized dish-number watermark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[10rem] font-bold leading-none text-white/[0.04]"
              >
                {dish.id}
              </span>

              {dish.hasImage ? (
                <div className="relative flex h-full items-center justify-center">
                  {/* rotating halo */}
                  <motion.div
                    className="absolute h-52 w-52 rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(178,58,46,0.28), rgba(236,230,218,0.18), rgba(178,58,46,0.28), rgba(236,230,218,0.18))",
                      filter: "blur(28px)",
                    }}
                    animate={reduce ? undefined : { rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  />
                  {/* steam */}
                  {!reduce && <Steam />}
                  {/* floating dish */}
                  <motion.div
                    animate={reduce ? undefined : { y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative h-56 w-56"
                  >
                    <Image
                      src={`/images/dishes/${dish.id}.png`}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 512px"
                      className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                    />
                  </motion.div>
                </div>
              ) : (
                <Placeholder label={t.menu.noImage} />
              )}

              <div className="absolute left-5 top-5 flex items-center gap-2">
                <span className="rounded-full bg-chilli px-3 py-1 text-sm font-bold text-white shadow-lg">
                  #{dish.id}
                </span>
                {dish.isNew && (
                  <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                    {t.menu.newLabel}
                  </span>
                )}
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-cream backdrop-blur transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={t.menu.close}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="m6 6 12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* fade into content */}
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink-800 to-transparent" />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-gold">
                    {CUISINE_LABELS[dish.cuisine][lang]}
                  </span>
                  <h3 className="heading-display mt-1 text-2xl text-cream">
                    {dish.name}
                  </h3>
                </div>
                <span className="shrink-0 font-display text-2xl font-bold text-gold-grad">
                  {dish.price},-
                </span>
              </div>

              {dish.desc && (
                <p className="mt-3 leading-relaxed text-cream/70">{dish.desc}</p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {dish.spice ? (
                  <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-cream/70">
                    {t.menu.spice}: <SpiceMeter level={dish.spice} />
                  </span>
                ) : null}
                {dish.veg && (
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-300">
                    🌱 {t.menu.vegLabel}
                  </span>
                )}
                {dish.vegan && (
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-300">
                    {t.menu.veganLabel}
                  </span>
                )}
              </div>

              {dish.allergens && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="text-xs font-semibold uppercase tracking-wide text-cream/50">
                    {t.menu.allergens}
                  </span>
                  <p className="mt-1 text-sm text-cream/70">{dish.allergens}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Steam() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute block h-20 w-2 rounded-full bg-white/20 blur-md"
          style={{ left: (i - 1) * 22 }}
          animate={{ opacity: [0, 0.5, 0], y: [-6, -70], scaleX: [1, 1.7] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-cream/30">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 7a2 2 0 0 1 2-2h2l1-2h8l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="12" cy="12.5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="text-xs uppercase tracking-widest">{label}</span>
    </div>
  );
}
