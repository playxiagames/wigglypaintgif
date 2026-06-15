import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入翻译资源
import enTranslations from '../locales/en/common';

// 从URL检测语言
const detectLanguageFromURL = (): string => {
  // SSR/预渲染环境无 window，直接回退默认语言
  if (typeof window === 'undefined') {
    return 'en';
  }

  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // 支持的语言列表（当前仅英文）
  const supportedLanguages = ['en'];

  if (firstSegment && supportedLanguages.includes(firstSegment)) {
    return firstSegment;
  }

  return 'en'; // 默认语言
};

const resources = {
  en: {
    common: enTranslations
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