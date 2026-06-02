"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { useLang } from "./LangProvider";
import { SpiceMeter } from "./SpiceMeter";
import { Steam } from "./Steam";

/** A normalized item the modal can display (dish, drink or wine). */
export interface ModalItem {
  kind: "dish" | "wine" | "drink";
  id: string;
  img?: string; // full image path
  number?: string; // menu number badge
  category?: string; // small label above the title
  name: string;
  price?: number;
  desc?: string;
  spice?: number;
  veg?: boolean;
  vegan?: boolean;
  isNew?: boolean;
  allergens?: string;
  options?: string[]; // for drinks
  type?: string; // wine type
}

export function ItemModal({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: ModalItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null && index >= 0 && index < items.length;
  const item = open ? items[index] : null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      const n = (index + dir + items.length) % items.length;
      onIndex(n);
    },
    [index, items.length, onIndex]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
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
  }, [open, onClose, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 80 || info.velocity.x > 400) go(-1);
  };

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={item.name}
        >
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={onClose} />

          {/* side nav arrows (desktop) */}
          <button
            onClick={() => go(-1)}
            aria-label={t.menu.prev}
            className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-ink/60 text-cream backdrop-blur transition-colors hover:border-cream hover:bg-ink lg:flex"
          >
            <Arrow dir="left" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label={t.menu.nextDish}
            className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-ink/60 text-cream backdrop-blur transition-colors hover:border-cream hover:bg-ink lg:flex"
          >
            <Arrow dir="right" />
          </button>

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="relative z-10 max-h-[92vh] w-full max-w-xl touch-pan-y overflow-y-auto overflow-x-hidden rounded-t-3xl border border-white/10 bg-gradient-to-b from-ink-700 to-ink-800 shadow-2xl sm:rounded-3xl"
          >
            {/* Stage — bigger image, swaps per item */}
            <div className="relative h-80 overflow-hidden sm:h-96">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(178,58,46,0.22),transparent_70%)]" />
              {item.number && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[11rem] font-bold leading-none text-white/[0.04]"
                >
                  {item.number}
                </span>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.92, x: -30 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex h-full items-center justify-center"
                >
                  <motion.div
                    className="absolute h-60 w-60 rounded-full sm:h-72 sm:w-72"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(178,58,46,0.26), rgba(236,230,218,0.16), rgba(178,58,46,0.26), rgba(236,230,218,0.16))",
                      filter: "blur(30px)",
                    }}
                    animate={reduce ? undefined : { rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  {item.kind === "dish" && !reduce && (
                    <Steam className="left-1/2 top-8 -translate-x-1/2" count={3} />
                  )}
                  {item.img ? (
                    <motion.div
                      animate={reduce ? undefined : { y: [0, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className={`relative ${
                        item.kind === "wine" ? "h-72 w-28 sm:h-80 sm:w-32" : "h-64 w-64 sm:h-80 sm:w-80"
                      }`}
                    >
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 640px"
                        className="object-contain drop-shadow-[0_24px_44px_rgba(0,0,0,0.6)]"
                      />
                    </motion.div>
                  ) : (
                    <Placeholder label={t.menu.noImage} />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="absolute left-5 top-5 flex items-center gap-2">
                {item.number && (
                  <span className="rounded-full bg-chilli px-3 py-1 text-sm font-bold text-cream shadow-lg">
                    #{item.number}
                  </span>
                )}
                {item.isNew && (
                  <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                    {t.menu.newLabel}
                  </span>
                )}
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-cream backdrop-blur transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={t.menu.close}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink-800 to-transparent" />
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${item.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {(item.category || item.type) && (
                      <span className="text-xs uppercase tracking-widest text-gold">
                        {item.category ?? item.type}
                      </span>
                    )}
                    <h3 className="heading-display mt-1 text-2xl text-cream">{item.name}</h3>
                  </div>
                  {item.price != null && (
                    <span className="shrink-0 font-display text-2xl font-bold text-gold-grad">
                      {item.price},-
                    </span>
                  )}
                </div>

                {item.desc && (
                  <p className="mt-3 leading-relaxed text-cream/70">{item.desc}</p>
                )}

                {item.options && item.options.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.options.map((o) => (
                      <li key={o} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-cream/65">
                        {o}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {item.spice ? (
                    <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-cream/70">
                      {t.menu.spice}: <SpiceMeter level={item.spice} />
                    </span>
                  ) : null}
                  {item.veg && (
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-300">
                      🌱 {t.menu.vegLabel}
                    </span>
                  )}
                  {item.vegan && (
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-300">
                      {t.menu.veganLabel}
                    </span>
                  )}
                </div>

                {item.allergens && (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-cream/50">
                      {t.menu.allergens}
                    </span>
                    <p className="mt-1 text-sm text-cream/70">{item.allergens}</p>
                  </div>
                )}

                {/* swipe hint + position */}
                <div className="mt-6 flex items-center justify-between text-xs text-cream/40">
                  <span>{t.menu.swipeHint}</span>
                  <span className="font-mono">
                    {index! + 1} / {items.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}
    >
      <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 text-cream/30">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
        <path d="M3 7a2 2 0 0 1 2-2h2l1-2h8l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12.5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="text-xs uppercase tracking-widest">{label}</span>
    </div>
  );
}
