"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight viewport observer used to PAUSE expensive animations when a
 * section scrolls off-screen. Continuously-running motion (particles, smoke,
 * marquees) is the main battery/CPU drain on this site, so every heavy
 * decorative layer is gated behind this hook and only animates while visible.
 */
export function useInViewport<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "200px"
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
