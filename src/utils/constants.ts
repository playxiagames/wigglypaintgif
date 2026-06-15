import { LanguageOption, SupportedLanguage, LanguageRoute } from '../types';

// 当前仅启用英文。后续新增语言（es/ru/pt/de）时在此各处补回对应条目。
export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' }
];

// 语言路由配置
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en'];

export const LANGUAGE_ROUTES: LanguageRoute[] = [
  { language: 'en', path: '', isDefault: true } // 默认语言使用空路径
];

// 语言检测和存储相关常量
export const LANGUAGE_STORAGE_KEY = 'wigglyPaint_language_preference';
export const LANGUAGE_DETECTION_DISABLED_KEY = 'wigglyPaint_language_detection_disabled';

// 支持的浏览器语言到我们语言的映射
export const BROWSER_LANGUAGE_MAP: Record<string, SupportedLanguage> = {
  'en': 'en',
  'en-US': 'en',
  'en-GB': 'en',
  'en-AU': 'en',
  'en-CA': 'en'
};

export const R2_CDN_BASE_URL = 'https://gifs.wigglypaintgif.com';