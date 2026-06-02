"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SoundName = "flight" | "tick" | "open" | "chime";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

/**
 * A tasteful, fully-synthesized sound layer (Web Audio API — no audio files).
 * Off by default; users opt in. Sounds are short, soft and musical.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("kowloon-sound");
    if (saved === "on") setEnabled(true);
  }, []);

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      const ctx = new AC();
      const master = ctx.createGain();
      master.gain.value = 0.18;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const tone = useCallback(
    (
      freq: number,
      start: number,
      dur: number,
      type: OscillatorType = "sine",
      peak = 1
    ) => {
      const ctx = ctxRef.current;
      const master = masterRef.current;
      if (!ctx || !master) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      const t = ctx.currentTime + start;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(peak, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain);
      gain.connect(master);
      osc.start(t);
      osc.stop(t + dur + 0.05);
    },
    []
  );

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      const ctx = ensureCtx();
      if (!ctx) return;
      switch (name) {
        case "flight":
          // gentle ascending arpeggio — a "boarding" chime
          tone(523.25, 0, 0.5, "sine", 0.9); // C5
          tone(659.25, 0.12, 0.5, "sine", 0.8); // E5
          tone(783.99, 0.24, 0.7, "sine", 0.7); // G5
          tone(1046.5, 0.38, 0.9, "triangle", 0.5); // C6
          break;
        case "chime":
          tone(880, 0, 0.6, "sine", 0.7);
          tone(1318.5, 0.08, 0.8, "sine", 0.4);
          break;
        case "open":
          tone(440, 0, 0.25, "triangle", 0.6);
          tone(660, 0.06, 0.3, "sine", 0.4);
          break;
        case "tick":
          tone(900, 0, 0.08, "square", 0.25);
          break;
      }
    },
    [enabled, ensureCtx, tone]
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      window.localStorage.setItem("kowloon-sound", next ? "on" : "off");
      if (next) {
        // unlock + confirm with a soft chime on the enabling gesture
        const ctx = ensureCtx();
        if (ctx) {
          const osc = ctxRef.current!.createOscillator();
          const g = ctxRef.current!.createGain();
          osc.type = "sine";
          osc.frequency.value = 880;
          const t = ctxRef.current!.currentTime;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.18, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
          osc.connect(g);
          g.connect(masterRef.current!);
          osc.start(t);
          osc.stop(t + 0.55);
        }
      }
      return next;
    });
  }, [ensureCtx]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    // graceful no-op if used outside provider
    return { enabled: false, toggle: () => {}, play: () => {} };
  }
  return ctx;
}
