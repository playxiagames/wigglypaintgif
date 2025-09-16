import { 
  SupportedLanguage, 
  LanguageDetection 
} from '../types';
import { 
  DEFAULT_LANGUAGE, 
  SUPPORTED_LANGUAGES, 
  LANGUAGE_ROUTES, 
  BROWSER_LANGUAGE_MAP,
  LANGUAGE_STORAGE_KEY
} from './constants';

/**
 * 从URL路径中提取语言代码
 */
export function extractLanguageFromPath(pathname: string): {
  language: SupportedLanguage;
  pathWithoutLanguage: string;
} {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  // 检查第一个路径段是否为支持的语言
  if (firstSegment && SUPPORTED_LANGUAGES.includes(firstSegment as SupportedLanguage)) {
    return {
      language: firstSegment as SupportedLanguage,
      pathWithoutLanguage: '/' + segments.slice(1).join('/')
    };
  }
  
  // 默认语言
  return {
    language: DEFAULT_LANGUAGE,
    pathWithoutLanguage: pathname
  };
}

/**
 * 构建带语言前缀的路径
 */
export function buildLanguagePath(path: string, language: SupportedLanguage): string {
  // 确保路径以 / 开头
  let normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // 确保非根路径以 / 结尾（SEO最佳实践）
  if (normalizedPath !== '/' && !normalizedPath.endsWith('/')) {
    normalizedPath += '/';
  }

  // 如果是默认语言，不添加前缀
  if (language === DEFAULT_LANGUAGE) {
    return normalizedPath;
  }

  // 其他语言添加前缀
  const languagePrefix = LANGUAGE_ROUTES.find(route => route.language === language)?.path || `/${language}`;

  if (normalizedPath === '/') {
    return languagePrefix + '/';
  }

  return `${languagePrefix}${normalizedPath}`;
}

/**
 * 获取语言切换后的目标路径
 */
export function getLanguageSwitchPath(currentPath: string, targetLanguage: SupportedLanguage): string {
  const { pathWithoutLanguage } = extractLanguageFromPath(currentPath);
  return buildLanguagePath(pathWithoutLanguage, targetLanguage);
}

/**
 * 检测用户的首选语言
 */
export function detectUserLanguage(): LanguageDetection {
  // 1. 检查本地存储的语言偏好
  try {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage as SupportedLanguage)) {
      return {
        detectedLanguage: storedLanguage as SupportedLanguage,
        confidence: 0.9,
        source: 'localStorage'
      };
    }
  } catch (error) {
    console.warn('无法访问localStorage:', error);
  }
  
  // 2. 检查浏览器语言设置
  const browserLanguages = navigator.languages || [navigator.language];
  
  for (const browserLang of browserLanguages) {
    const normalizedLang = browserLang.toLowerCase();
    const mappedLanguage = BROWSER_LANGUAGE_MAP[normalizedLang] || BROWSER_LANGUAGE_MAP[normalizedLang.split('-')[0]];
    
    if (mappedLanguage) {
      return {
        detectedLanguage: mappedLanguage,
        confidence: 0.7,
        source: 'navigator'
      };
    }
  }
  
  // 3. 基于时区的简单推断（可选）
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.includes('Asia/Shanghai') || timezone.includes('Asia/Beijing')) {
      return {
        detectedLanguage: 'zh',
        confidence: 0.3,
        source: 'timezone'
      };
    } else if (timezone.includes('Asia/Tokyo')) {
      return {
        detectedLanguage: 'ja',
        confidence: 0.3,
        source: 'timezone'
      };
    } else if (timezone.includes('Asia/Seoul')) {
      return {
        detectedLanguage: 'ko',
        confidence: 0.3,
        source: 'timezone'
      };
    }
  } catch (error) {
    console.warn('无法获取时区信息:', error);
  }
  
  // 4. 默认语言
  return {
    detectedLanguage: DEFAULT_LANGUAGE,
    confidence: 0.1,
    source: 'default'
  };
}

/**
 * 保存用户语言偏好
 */
export function saveLanguagePreference(language: SupportedLanguage): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn('无法保存语言偏好:', error);
  }
}

/**
 * 获取所有可用语言的hreflang链接
 */
export function getHrefLangLinks(currentPath: string): Array<{ lang: string; href: string }> {
  const { pathWithoutLanguage } = extractLanguageFromPath(currentPath);
  
  return LANGUAGE_ROUTES.map(route => ({
    lang: route.language === 'en' ? 'en' : route.language,
    href: `${window.location.origin}${buildLanguagePath(pathWithoutLanguage, route.language)}`
  }));
}

/**
 * 检查是否为支持的语言
 */
export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

/**
 * 获取语言的本地化显示名称
 */
export function getLanguageDisplayName(language: SupportedLanguage): string {
  const languageMap: Record<SupportedLanguage, string> = {
    'en': 'English',
    'zh': '中文',
    'ja': '日本語',
    'ko': '한국어'
  };
  
  return languageMap[language] || language;
}