import { LanguageOption, SupportedLanguage, LanguageRoute } from '../types';

// 当前启用英文 + 西班牙语。后续新增语言（ru/pt/de）时在此各处补回对应条目。
export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' }
];

// 语言路由配置
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'es'];

export const LANGUAGE_ROUTES: LanguageRoute[] = [
  { language: 'en', path: '', isDefault: true }, // 默认语言使用空路径
  { language: 'es', path: '/es' }
];

// 各语言「已实际翻译」的路径白名单（不含语言前缀，'' = 首页）。
// 仅这些路径会生成该语言前缀 URL 与 hreflang；其余回退英文，
// 避免出现「有 /es/ URL 但无实体文件/无翻译」的页面（对 Googlebot 是 404 或重复内容）。
// 今后翻译了某子页，把其路径段（如 'gallery'）加进对应语言数组即可。
export const LOCALIZED_ROUTES: Record<SupportedLanguage, string[]> = {
  en: ['', 'gallery', 'about', 'stats', 'contact', 'terms', 'privacy', 'blog'],
  es: [''] // 西语目前仅首页落地页
};

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
  // 西语变体（detectUserLanguage 会 toLowerCase 后查表，故 key 用小写）
  'es': 'es',
  'es-es': 'es',
  'es-mx': 'es',
  'es-ar': 'es',
  'es-co': 'es',
  'es-419': 'es'
};

export const R2_CDN_BASE_URL = 'https://gifs.wigglypaintgif.com';

// 站点根 URL（canonical/hreflang/绝对链接用）。
// 必须用固定值，不能用 window.location.origin——否则预渲染会烘焙成 127.0.0.1。
export const SITE_URL = 'https://wigglypaintgif.com';