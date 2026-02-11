import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import esCommon from './locales/es/common.json';
import esUpload from './locales/es/upload.json';
import esResults from './locales/es/results.json';
import esSEO from './locales/es/seo.json';

import enCommon from './locales/en/common.json';
import enUpload from './locales/en/upload.json';
import enResults from './locales/en/results.json';
import enSEO from './locales/en/seo.json';

const resources = {
  es: {
    common: esCommon,
    upload: esUpload,
    results: esResults,
    seo: esSEO
  },
  en: {
    common: enCommon,
    upload: enUpload,
    results: enResults,
    seo: enSEO
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    resources,
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    
    // Namespace settings
    defaultNS: 'common',
    ns: ['common', 'upload', 'results', 'seo'],
    
    // Detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'voicetudu-language'
    },
    
    // Interpolation settings
    interpolation: {
      escapeValue: false // React already escapes values
    },
    
    // Debug in development
    debug: import.meta.env.DEV
  });

export default i18n;

// Helper function to change language
export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

// Helper to get current language
export const getCurrentLanguage = () => i18n.language;
