import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { LANGUAGES } from '../../utils/constants';
import { SupportedLanguage } from '../../types';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { extractLanguageFromPath, getLanguageSwitchPath, saveLanguagePreference } from '../../utils/languageUtils';

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // 尝试使用语言上下文，如果不可用则从URL获取
  let currentLanguage: SupportedLanguage;
  let contextChangeLanguage: ((lang: SupportedLanguage, preservePath?: boolean) => void) | null = null;
  
  try {
    const context = useLanguageContext();
    currentLanguage = context.currentLanguage;
    contextChangeLanguage = context.changeLanguage;
  } catch (error) {
    // 如果上下文不可用，从URL提取语言
    const { language } = extractLanguageFromPath(location.pathname);
    currentLanguage = language;
  }

  const handleLanguageChange = (languageCode: string) => {
    const targetLang = languageCode as SupportedLanguage;
    
    // 更新i18next语言
    i18n.changeLanguage(targetLang);
    document.documentElement.lang = targetLang;
    
    // 保存用户偏好
    saveLanguagePreference(targetLang);
    
    if (contextChangeLanguage) {
      // 如果有上下文，使用上下文的方法
      contextChangeLanguage(targetLang, true);
    } else {
      // 否则手动导航
      const newPath = getLanguageSwitchPath(location.pathname, targetLang);
      navigate(newPath, { replace: true });
    }
  };

  return (
    <div className="relative">
      <select
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
          <path d="M7 7l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitch;