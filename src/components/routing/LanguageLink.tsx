import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { extractLanguageFromPath, buildLanguagePath } from '../../utils/languageUtils';
import { SupportedLanguage } from '../../types';

interface LanguageLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  language?: string; // 可选：指定特定语言
}

/**
 * 语言感知的Link组件
 * 自动添加当前语言前缀到目标路径
 */
const LanguageLink: React.FC<LanguageLinkProps> = ({ 
  to, 
  language, 
  children, 
  ...props 
}) => {
  const location = useLocation();
  
  // 尝试使用语言上下文，如果不可用则从URL提取
  let currentLanguage: SupportedLanguage;
  let getLocalizedPath: (path: string, lang?: SupportedLanguage) => string;
  
  try {
    const context = useLanguageContext();
    currentLanguage = context.currentLanguage;
    getLocalizedPath = context.getLocalizedPath;
  } catch (error) {
    // 如果上下文不可用，从URL提取语言信息
    const { language: urlLang } = extractLanguageFromPath(location.pathname);
    currentLanguage = urlLang;
    getLocalizedPath = (path: string, lang?: SupportedLanguage) => {
      return buildLanguagePath(path, lang || currentLanguage);
    };
  }
  
  // 使用指定语言或当前语言
  const targetLanguage = (language as SupportedLanguage) || currentLanguage;
  
  // 构建本地化路径
  const localizedPath = getLocalizedPath(to, targetLanguage);
  
  return (
    <Link to={localizedPath} {...props}>
      {children}
    </Link>
  );
};

export default LanguageLink;