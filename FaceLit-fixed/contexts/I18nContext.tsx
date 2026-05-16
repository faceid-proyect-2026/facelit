// ─────────────────────────────────────────────
//  contexts/I18nContext.tsx
//  Selector de idioma global (ES / EN / DE / FR)
//  No tiene ninguna dependencia de auth ni backend
// ─────────────────────────────────────────────
import React, { createContext, useContext, useState, ReactNode } from 'react';
import '@/i18n/index';          // inicializa i18next (side-effect)
import i18n from 'i18next';

export type Language = 'es' | 'en' | 'de' | 'fr';

export const LANGUAGE_LABELS: Record<Language, string> = {
  es: 'ES',
  en: 'EN',
  de: 'DE',
  fr: 'FR',
};

interface I18nContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType>({
  language: 'es',
  changeLanguage: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
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
