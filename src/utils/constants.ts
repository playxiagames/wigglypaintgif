import { LanguageOption, SupportedLanguage, LanguageRoute } from '../types';

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' }
];

// 语言路由配置
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'zh', 'ja', 'ko'];

export const LANGUAGE_ROUTES: LanguageRoute[] = [
  { language: 'en', path: '', isDefault: true }, // 默认语言使用空路径
  { language: 'zh', path: '/zh' },
  { language: 'ja', path: '/ja' },
  { language: 'ko', path: '/ko' }
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
  'en-CA': 'en',
  'zh': 'zh',
  'zh-CN': 'zh',
  'zh-TW': 'zh',
  'zh-HK': 'zh',
  'ja': 'ja',
  'ja-JP': 'ja',
  'ko': 'ko',
  'ko-KR': 'ko'
};

export const R2_CDN_BASE_URL = 'https://gifs.wigglypaintgif.com';