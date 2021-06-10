import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.js';
import buildYupLocale from './locales/yupRu.js';

const options = {
  debug: false,
  lng: 'ru',
  resources: {
    ru,
    en: {
      translation: {

      },
    },
  },
  fallbackLng: 'ru',
};

const initI18n = () => {
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init(options, buildYupLocale);
};

export default initI18n;
