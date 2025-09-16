import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dismissLanguageSuggestion } from '../../hooks/useLanguageDetection';

interface LanguageSuggestionProps {
  suggestedLanguage: string;
  confidence: number;
  userCountry: string | null;
  onAccept: (language: string) => void;
  onDismiss: () => void;
}

// 语言显示名称配置
const LANGUAGE_NAMES = {
  ko: { native: '한국어', english: 'Korean', flag: '🇰🇷' },
  ja: { native: '日本語', english: 'Japanese', flag: '🇯🇵' },
  zh: { native: '中文', english: 'Chinese', flag: '🇨🇳' },
  es: { native: 'Español', english: 'Spanish', flag: '🇪🇸' },
  th: { native: 'ไทย', english: 'Thai', flag: '🇹🇭' },
  vi: { native: 'Tiếng Việt', english: 'Vietnamese', flag: '🇻🇳' },
  ms: { native: 'Bahasa Malaysia', english: 'Malay', flag: '🇲🇾' },
  en: { native: 'English', english: 'English', flag: '🇺🇸' },
} as const;

// 国家名称配置
const COUNTRY_NAMES = {
  KR: '韩国',
  JP: '日本',
  CN: '中国',
  TW: '台湾',
  HK: '香港',
  TH: '泰国',
  VN: '越南',
  MY: '马来西亚',
  ES: '西班牙',
} as const;

const LanguageSuggestion: React.FC<LanguageSuggestionProps> = ({
  suggestedLanguage,
  confidence,
  userCountry,
  onAccept,
  onDismiss,
}) => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const languageInfo = LANGUAGE_NAMES[suggestedLanguage as keyof typeof LANGUAGE_NAMES];
  const countryName = userCountry ? COUNTRY_NAMES[userCountry as keyof typeof COUNTRY_NAMES] : null;

  if (!isVisible || !languageInfo) {
    return null;
  }

  const handleAccept = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onAccept(suggestedLanguage);
      setIsVisible(false);
    }, 150);
  };

  const handleDismiss = () => {
    setIsAnimating(true);
    setTimeout(() => {
      dismissLanguageSuggestion(suggestedLanguage);
      onDismiss();
      setIsVisible(false);
    }, 150);
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.8) return 'bg-green-50 border-green-200';
    if (confidence >= 0.6) return 'bg-blue-50 border-blue-200';
    return 'bg-yellow-50 border-yellow-200';
  };

  const getConfidenceText = (confidence: number): string => {
    if (confidence >= 0.9) return t('languageSuggestion.highConfidence');
    if (confidence >= 0.7) return t('languageSuggestion.recommend');
    return t('languageSuggestion.suggest');
  };

  const getCountryName = (countryCode: string): string => {
    return t(`languageSuggestion.countries.${countryCode}`, { defaultValue: COUNTRY_NAMES[countryCode as keyof typeof COUNTRY_NAMES] || countryCode });
  };

  return (
    <div
      className={`fixed top-4 right-4 sm:max-w-sm max-w-[calc(100vw-2rem)] sm:left-auto left-4 z-50 transition-all duration-300 ${
        isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}
    >
      <div
        className={`${getConfidenceColor(
          confidence
        )} border rounded-lg shadow-lg p-4 backdrop-blur-sm`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{languageInfo.flag}</span>
            <span className="text-sm font-medium text-gray-700">
              {getConfidenceText(confidence)}
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={t('languageSuggestion.close')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">
            {t('languageSuggestion.title', { language: languageInfo.native })}
          </h3>
          <p className="text-xs text-gray-600">
            {userCountry ? (
              t('languageSuggestion.detectedLocation', {
                country: getCountryName(userCountry),
                language: languageInfo.native
              })
            ) : (
              t('languageSuggestion.betterExperience', {
                language: languageInfo.native
              })
            )}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
          >
            {t('languageSuggestion.switchTo', { language: languageInfo.native })}
          </button>
          <button
            onClick={handleDismiss}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium rounded transition-colors"
          >
            {t('languageSuggestion.keepCurrent')}
          </button>
        </div>

        {/* Confidence indicator */}
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          {confidence >= 0.8 && (
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{t('languageSuggestion.highConfidenceIndicator')}</span>
            </div>
          )}
          {/* Debug info - only in development */}
          {typeof window !== 'undefined' && import.meta.env.DEV && (
            <span className="text-gray-400">
              {t('languageSuggestion.confidence')}: {Math.round(confidence * 100)}%
            </span>
          )}
        </div>
      </div>

      {/* Mobile responsive classes are handled by Tailwind */}
    </div>
  );
};

export default LanguageSuggestion;