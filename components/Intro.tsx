"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * A short, cinematic brand reveal shown once per session.
 * Curtain wipes away to unveil the hero. Skips for reduced-motion users
 * and for return visits within the same tab session.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const seen = window.sessionStorage.getItem("kowloon-intro");
    if (seen || reduce) {
      setShow(false);
      return;
    }
    setShow(true);
    document.body.style.overflow = "hidden";
    const done = window.setTimeout(() => {
      setShow(false);
      window.sessionStorage.setItem("kowloon-intro", "1");
    }, 2600);
    return () => window.clearTimeout(done);
  }, [reduce]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink-deep"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => {
            setShow(false);
            window.sessionStorage.setItem("kowloon-intro", "1");
          }}
        >
          {/* ambient glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(178,58,46,0.18),transparent_60%)]" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(178,58,46,0.22), rgba(236,230,218,0.16), rgba(178,58,46,0.22), rgba(236,230,218,0.16))",
              filter: "blur(60px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* logo reveal */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/brand/logo.svg"
                alt="Kowloon"
                width={280}
                height={64}
                priority
                className="h-14 w-auto brightness-0 invert sm:h-16"
              />
            </motion.div>

            {/* gold underline sweep */}
            <motion.div
              className="mt-5 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            />

            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-5 text-xs uppercase tracking-[0.4em] text-gold/80"
            >
              Aarhus · 1999
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
