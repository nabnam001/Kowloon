"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A subtle custom cursor — a small gold dot with a trailing ring that expands
 * over interactive elements. Only enabled for fine pointers (desktop) and when
 * the user hasn't requested reduced motion. Purely decorative enhancement.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      const interactive = el.closest(
        'a, button, [role="button"], input, [data-cursor="hover"]'
      );
      setHovering(Boolean(interactive));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.style.cursor = "";
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[150] hidden lg:block" aria-hidden="true">
      {/* trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute -left-4 -top-4"
      >
        <motion.div
          animate={{
            scale: hovering ? 1.8 : down ? 0.7 : 1,
            opacity: hovering ? 0.9 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="h-8 w-8 rounded-full border border-gold"
        />
      </motion.div>
      {/* center dot */}
      <motion.div
        style={{ x, y }}
        className="absolute -left-1 -top-1"
      >
        <motion.div
          animate={{ scale: down ? 1.6 : 1, opacity: hovering ? 0 : 1 }}
          className="h-2 w-2 rounded-full bg-gold"
        />
      </motion.div>
    </div>
  );
}
