import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入翻译资源
import enTranslations from '../locales/en/common';
import zhTranslations from '../locales/zh/common';
import jaTranslations from '../locales/ja/common';
import koTranslations from '../locales/ko/common';

// 从URL检测语言
const detectLanguageFromURL = (): string => {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // 支持的语言列表
  const supportedLanguages = ['en', 'ko', 'ja', 'zh'];

  if (firstSegment && supportedLanguages.includes(firstSegment)) {
    return firstSegment;
  }

  return 'en'; // 默认语言
};

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

// 检测初始语言
const initialLanguage = detectLanguageFromURL();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage, // 使用从URL检测的语言
    fallbackLng: 'en',
    debug: import.meta.env.DEV, // 开发环境启用调试

    defaultNS: 'common',
    ns: ['common'],

    interpolation: {
      escapeValue: false
    },

    react: {
      useSuspense: false
    }
  });

// 调试输出
if (import.meta.env.DEV) {
  console.log(`i18n初始化语言: ${initialLanguage}, URL: ${window.location.pathname}`);
}

export default i18n;