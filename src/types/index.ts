export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  category: string;
  createdAt: string;
  author?: string;
  downloads: number;
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

// 语言路由相关类型
// 与 src/locales/languages.json 的 code 保持一致（JSON 无法派生字面量类型，故此处手动同步）
export type SupportedLanguage = 'en' | 'es' | 'de' | 'fr' | 'pt' | 'ru';

export interface LanguageRoute {
  language: SupportedLanguage;
  path: string;
  isDefault?: boolean;
}

export interface LanguageDetection {
  detectedLanguage: SupportedLanguage;
  confidence: number;
  source: 'url' | 'localStorage' | 'navigator' | 'timezone' | 'default';
}

export interface LanguageRouterContext {
  currentLanguage: SupportedLanguage;
  availableLanguages: SupportedLanguage[];
  changeLanguage: (lang: SupportedLanguage, preservePath?: boolean) => void;
  getLocalizedPath: (path: string, lang?: SupportedLanguage) => string;
  isDefaultLanguage: boolean;
}

// 导出简化的类型
export * from './simple';