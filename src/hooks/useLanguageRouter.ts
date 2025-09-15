import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  SupportedLanguage, 
  LanguageDetection,
  LanguageRouterContext 
} from '../types';
import { 
  extractLanguageFromPath, 
  buildLanguagePath, 
  detectUserLanguage, 
  saveLanguagePreference,
  isSupportedLanguage,
  getLanguageSwitchPath
} from '../utils/languageUtils';
import { 
  DEFAULT_LANGUAGE, 
  SUPPORTED_LANGUAGES,
  LANGUAGE_DETECTION_DISABLED_KEY
} from '../utils/constants';

/**
 * 语言路由Hook - 处理URL语言路由和自动检测
 */
export function useLanguageRouter(): LanguageRouterContext {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();
  
  // 当前语言状态
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    const { language } = extractLanguageFromPath(location.pathname);
    return language;
  });
  
  // 检测到的语言建议
  const [languageDetection, setLanguageDetection] = useState<LanguageDetection | null>(null);
  const [showLanguageSuggestion, setShowLanguageSuggestion] = useState(false);

  /**
   * 切换语言
   */
  const changeLanguage = useCallback((targetLang: SupportedLanguage, preservePath = true) => {
    if (!isSupportedLanguage(targetLang)) {
      console.warn(`不支持的语言: ${targetLang}`);
      return;
    }
    
    // 更新i18next语言
    i18n.changeLanguage(targetLang);
    
    // 保存用户偏好
    saveLanguagePreference(targetLang);
    
    // 更新状态
    setCurrentLanguage(targetLang);
    setShowLanguageSuggestion(false);
    
    if (preservePath) {
      // 构建新路径并导航
      const newPath = getLanguageSwitchPath(location.pathname, targetLang);
      navigate(newPath, { replace: true });
    }
  }, [i18n, location.pathname, navigate]);

  /**
   * 获取本地化路径
   */
  const getLocalizedPath = useCallback((path: string, lang?: SupportedLanguage): string => {
    const targetLanguage = lang || currentLanguage;
    return buildLanguagePath(path, targetLanguage);
  }, [currentLanguage]);


  /**
   * 处理URL变化时的语言同步
   */
  useEffect(() => {
    const { language } = extractLanguageFromPath(location.pathname);
    
    if (language !== currentLanguage) {
      setCurrentLanguage(language);
      i18n.changeLanguage(language);
      
      // 保存用户选择的语言偏好
      saveLanguagePreference(language);
    }
  }, [location.pathname, currentLanguage, i18n]);

  /**
   * 初始化语言检测 - 已移至LanguageSuggestionBanner组件
   */
  // useEffect 已被移除，语言检测现在由LanguageSuggestionBanner处理

  /**
   * 处理无效语言路径的重定向
   */
  useEffect(() => {
    const urlLang = params.lang;
    if (urlLang && !isSupportedLanguage(urlLang)) {
      // 无效的语言代码，重定向到默认语言
      const { pathWithoutLanguage } = extractLanguageFromPath(location.pathname);
      const fallbackPath = buildLanguagePath(pathWithoutLanguage, DEFAULT_LANGUAGE);
      navigate(fallbackPath, { replace: true });
    }
  }, [params.lang, location.pathname, navigate]);

  return {
    currentLanguage,
    availableLanguages: SUPPORTED_LANGUAGES,
    changeLanguage,
    getLocalizedPath,
    isDefaultLanguage: currentLanguage === DEFAULT_LANGUAGE,
    
    // 语言检测相关
    languageDetection,
    showLanguageSuggestion,
    dismissLanguageSuggestion: () => setShowLanguageSuggestion(false),
    disableLanguageDetection: () => {
      try {
        localStorage.setItem(LANGUAGE_DETECTION_DISABLED_KEY, 'true');
      } catch (error) {
        console.warn('无法保存语言检测设置:', error);
      }
      setShowLanguageSuggestion(false);
    }
  } as LanguageRouterContext & {
    languageDetection: LanguageDetection | null;
    showLanguageSuggestion: boolean;
    dismissLanguageSuggestion: () => void;
    disableLanguageDetection: () => void;
  };
}

/**
 * 简化版的语言路由Hook，只提供基本功能
 */
export function useSimpleLanguageRouter() {
  const location = useLocation();
  const { currentLanguage, changeLanguage, getLocalizedPath } = useLanguageRouter();
  
  return {
    currentLanguage,
    changeLanguage,
    getLocalizedPath,
    pathWithoutLanguage: extractLanguageFromPath(location.pathname).pathWithoutLanguage
  };
}