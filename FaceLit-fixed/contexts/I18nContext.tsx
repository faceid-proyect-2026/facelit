// ─────────────────────────────────────────────
//  contexts/I18nContext.tsx
//  Selector de idioma global (ES / EN / DE / FR)
//  Persiste la selección en localStorage (web)
// ─────────────────────────────────────────────
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import '@/i18n/index';
import i18n from 'i18next';

export type Language = 'es' | 'en' | 'de' | 'fr';

export const LANGUAGE_LABELS: Record<Language, string> = {
  es: 'ES',
  en: 'EN',
  de: 'DE',
  fr: 'FR',
};

const LANG_STORAGE_KEY = 'facelit-lang';

interface I18nContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType>({
  language: 'es',
  changeLanguage: () => {},
});

function readSavedLanguage(): Language | null {
  if (typeof globalThis.localStorage === 'undefined') return null;
  const saved = globalThis.localStorage.getItem(LANG_STORAGE_KEY);
  return saved === 'es' || saved === 'en' || saved === 'de' || saved === 'fr'
    ? saved
    : null;
}

function saveLanguage(lang: Language) {
  if (typeof globalThis.localStorage === 'undefined') return;
  globalThis.localStorage.setItem(LANG_STORAGE_KEY, lang);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  // Carga el idioma guardado al iniciar
  useEffect(() => {
    const saved = readSavedLanguage();
    if (saved) {
      setLanguage(saved);
      i18n.changeLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    saveLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

/** Hook de acceso al idioma — usar en cualquier componente */
export function useLanguage(): I18nContextType {
  return useContext(I18nContext);
}