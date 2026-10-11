import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Lang, type Translations } from "./translations";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "portfolio_lang";

const safeGetStorage = (key: string): string | null => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch {
    // localStorage is disabled, blocked in private mode, or sandboxed
  }
  return null;
};

const safeSetStorage = (key: string, value: string): void => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Silently ignore storage quota or permission errors
  }
};

const getInitialLang = (): Lang => {
  const saved = safeGetStorage(STORAGE_KEY) || safeGetStorage("lang");
  if (saved === "ar" || saved === "en") return saved;

  if (typeof navigator !== "undefined" && navigator.language) {
    const navLang = navigator.language.toLowerCase();
    if (navLang.startsWith("ar")) return "ar";
    if (navLang.startsWith("en")) return "en";
  }

  return "ar";
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.lang = lang;
      root.dir = lang === "ar" ? "rtl" : "ltr";
      document.title = translations[lang].meta.title;
    } catch {
      // DOM attribute updates fallback
    }
    safeSetStorage(STORAGE_KEY, lang);
    safeSetStorage("lang", lang);
  }, [lang]);

  const setLang = (next: Lang) => setLangState(next);

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
};
