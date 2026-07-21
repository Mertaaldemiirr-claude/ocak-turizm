"use client";

import { createContext, useContext, useEffect } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Locale = "tr" | "en" | "de" | "fr" | "es";

interface LocaleContextType {
  locale: Locale;
  dict: Dictionary;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useTranslation must be used within LocaleProvider");
  return ctx;
}

export function useLocalePath() {
  const { locale } = useTranslation();
  return (path: string) => `/${locale}${path}`;
}
