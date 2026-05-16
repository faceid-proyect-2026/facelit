// ─────────────────────────────────────────────
//  i18n/index.ts
//  Configuración de i18next para Expo / React Native
//  Importar este archivo como side-effect desde I18nContext
// ─────────────────────────────────────────────
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from '@/locales/es';
import en from '@/locales/en';
import de from '@/locales/de';
import fr from '@/locales/fr';

// Evita doble inicialización en hot-reload de Expo
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',   // requerido en React Native
      resources: {
        es: { translation: es },
        en: { translation: en },
        de: { translation: de },
        fr: { translation: fr },
      },
      lng: 'es',          // idioma inicial
      fallbackLng: 'es',  // fallback si falta una clave
      interpolation: {
        escapeValue: false, // React Native ya escapa los valores
      },
    });
}

export default i18n;
