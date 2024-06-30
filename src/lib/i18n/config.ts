import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json' with { type: 'json' };

const defaultLanguage = 'en';

export const defaultNamespace = 'default';

export const resources = {
  en: {
    [defaultNamespace]: en,
  },
};

i18n.use(initReactI18next).init({
  defaultNS: defaultNamespace,
  ns: [defaultNamespace],
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
