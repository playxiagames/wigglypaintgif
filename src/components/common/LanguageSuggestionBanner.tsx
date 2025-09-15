import React, { useState, useEffect } from 'react';
import { useLanguageContext } from '../../hooks/useLanguageContext';
import { detectUserLanguage, getLanguageDisplayName } from '../../utils/languageUtils';
import { DEFAULT_LANGUAGE } from '../../utils/constants';

/**
 * 语言建议横幅组件
 * 当检测到用户可能偏好其他语言时显示切换建议
 */
const LanguageSuggestionBanner: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguageContext();
  const [suggestedLanguage, setSuggestedLanguage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // 只在默认语言时检测
    if (currentLanguage !== DEFAULT_LANGUAGE) {
      return;
    }
    
    // 检测用户可能偏好的语言
    const detection = detectUserLanguage();
    
    // 如果检测到非默认语言且置信度足够，显示建议
    if (
      detection.detectedLanguage !== DEFAULT_LANGUAGE &&
      detection.confidence > 0.5 &&
      detection.source !== 'default'
    ) {
      setSuggestedLanguage(detection.detectedLanguage);
      setIsVisible(true);
    }
  }, [currentLanguage]);
  
  const handleAccept = () => {
    if (suggestedLanguage) {
      changeLanguage(suggestedLanguage as any, true);
    }
    setIsVisible(false);
  };
  
  const handleDismiss = () => {
    setIsVisible(false);
  };
  
  if (!isVisible || !suggestedLanguage) {
    return null;
  }
  
  return (
    <div className="bg-blue-50 border-b border-blue-200 p-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-blue-800">
            🌐 We detected you might prefer {getLanguageDisplayName(suggestedLanguage)}. 
          </span>
          <button
            onClick={handleAccept}
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Switch Language
          </button>
        </div>
        <button
          onClick={handleDismiss}
          className="text-blue-400 hover:text-blue-600"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default LanguageSuggestionBanner;