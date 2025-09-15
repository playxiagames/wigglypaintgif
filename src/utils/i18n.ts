import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入翻译资源
import enTranslations from '../locales/en/common';
import zhTranslations from '../locales/zh/common';
import jaTranslations from '../locales/ja/common';
import koTranslations from '../locales/ko/common';

const resources = {
  en: {
    common: enTranslations
  },
  zh: {
    common: zhTranslations
  },
  ja: {
    common: jaTranslations
  },
  ko: {
    common: koTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    
    defaultNS: 'common',
    ns: ['common'],
    
    interpolation: {
      escapeValue: false
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18n;