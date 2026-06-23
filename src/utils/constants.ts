import languagesData from '../locales/languages.json';
import { LanguageOption, SupportedLanguage, LanguageRoute } from '../types';

/**
 * 语言单一数据源：所有语言相关配置均从 src/locales/languages.json 派生。
 *
 * 新增语言只需三步：
 *  1) 在 languages.json 加一条（含 urlPrefix / localizedRoutes / browserVariants / homeAssertion / ogLocale）
 *  2) 新建 src/locales/<code>/common.ts 翻译
 *  3) 在 src/utils/i18n.ts 登记该翻译模块（1 行 import + 1 条映射）
 * constants / prerender.js / generate-sitemap.js 全部自动派生，无需逐处手改
 * （消除「加一个语言要改 6 文件 10 处」的霰弹式修改 / 僵化）。
 */
interface LanguageMeta {
  code: string;
  name: string;
  nativeName: string;
  urlPrefix: string;          // URL 前缀（默认语言为 ''）
  isDefault?: boolean;
  ogLocale: string;           // og:locale 值，如 'es_ES'
  localizedRoutes: string[];  // 该语言已翻译的路径段（'' = 首页）
  browserVariants: string[];  // navigator.language 变体（全小写），用于浏览器语言检测
  homeAssertion: string;      // 预渲染断言：该语言首页 HTML 必含的独有片段
}

const LANGS = languagesData as LanguageMeta[];

// UI 展示用语言列表（语言切换器等从此渲染）
export const LANGUAGES: LanguageOption[] = LANGS.map(({ code, name, nativeName }) => ({
  code,
  name,
  nativeName,
}));

export const DEFAULT_LANGUAGE: SupportedLanguage =
  (LANGS.find((l) => l.isDefault)?.code ?? 'en') as SupportedLanguage;

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = LANGS.map(
  (l) => l.code
) as SupportedLanguage[];

export const LANGUAGE_ROUTES: LanguageRoute[] = LANGS.map((l) => ({
  language: l.code as SupportedLanguage,
  path: l.urlPrefix,
  ...(l.isDefault ? { isDefault: true } : {}),
}));

// 各语言「已实际翻译」的路径白名单（不含语言前缀，'' = 首页）。
// 仅这些路径会生成该语言前缀 URL 与 hreflang；其余回退英文，
// 避免「有 URL 但无实体文件/无翻译」的页面（对 Googlebot 是 404 或重复内容）。
export const LOCALIZED_ROUTES = Object.fromEntries(
  LANGS.map((l) => [l.code, l.localizedRoutes])
) as Record<SupportedLanguage, string[]>;

// navigator.language（toLowerCase 后）→ 应用语言。
export const BROWSER_LANGUAGE_MAP = Object.fromEntries(
  LANGS.flatMap((l) => l.browserVariants.map((v) => [v, l.code]))
) as Record<string, SupportedLanguage>;

// 语言 → og:locale（社交分享 / SEO meta 用）。
export const OG_LOCALE_MAP = Object.fromEntries(
  LANGS.map((l) => [l.code, l.ogLocale])
) as Record<string, string>;

// 语言检测和存储相关常量
export const LANGUAGE_STORAGE_KEY = 'wigglyPaint_language_preference';
export const LANGUAGE_DETECTION_DISABLED_KEY = 'wigglyPaint_language_detection_disabled';

export const R2_CDN_BASE_URL = 'https://gifs.wigglypaintgif.com';

// 站点根 URL（canonical/hreflang/绝对链接用）。
// 必须用固定值，不能用 window.location.origin——否则预渲染会烘焙成 127.0.0.1。
export const SITE_URL = 'https://wigglypaintgif.com';
