"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang, type Dict } from "@/data/i18n";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("da");

  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem("kowloon-lang")) as Lang | null;
    if (saved === "da" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("kowloon-lang", l);
      document.documentElement.lang = l;
    }
  };

  const value: LangContextValue = {
    lang,
    setLang,
    t: translations[lang] as Dict,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
