import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageDetectionResult {
  suggestedLanguage: string | null;
  confidence: number;
  userCountry: string | null;
  browserLanguage: string;
  shouldShowSuggestion: boolean;
}

interface GeoLocation {
  country: string;
  timezone: string;
}

// 语言映射配置
const LANGUAGE_CONFIG = {
  // 高优先级国家（搜索量大的地区）
  highPriorityCountries: {
    'KR': { lang: 'ko', confidence: 0.9 }, // 韩国
    'JP': { lang: 'ja', confidence: 0.85 }, // 日本
    'CN': { lang: 'zh', confidence: 0.8 }, // 中国
    'TW': { lang: 'zh', confidence: 0.8 }, // 台湾
    'HK': { lang: 'zh', confidence: 0.8 }, // 香港
    // 暂时只支持4种语言，其他地区不在高优先级列表
  },
  // 支持的语言列表（实际项目只支持这4种）
  supportedLanguages: ['en', 'ko', 'ja', 'zh'],
  // 浏览器语言到应用语言的映射
  browserLangMap: {
    // 韩语
    'ko': 'ko',
    'ko-KR': 'ko',
    'ko-kr': 'ko',
    // 日语
    'ja': 'ja',
    'ja-JP': 'ja',
    'ja-jp': 'ja',
    // 中文
    'zh': 'zh',
    'zh-CN': 'zh',
    'zh-TW': 'zh',
    'zh-HK': 'zh',
    'zh-cn': 'zh',
    'zh-tw': 'zh',
    'zh-hk': 'zh',
    // 英语
    'en': 'en',
    'en-US': 'en',
    'en-GB': 'en',
    'en-CA': 'en',
    'en-AU': 'en',
    'en-us': 'en',
    'en-gb': 'en',
    // 其他语言映射到英文
    'th': 'en', // 泰语 → 英语
    'th-TH': 'en',
    'vi': 'en', // 越南语 → 英语
    'vi-VN': 'en',
    'ms': 'en', // 马来语 → 英语
    'ms-MY': 'en',
    'es': 'en', // 西班牙语 → 英语
    'es-ES': 'en',
    'fr': 'en', // 法语 → 英语
    'de': 'en', // 德语 → 英语
    'it': 'en', // 意大利语 → 英语
    'pt': 'en', // 葡萄牙语 → 英语
    'ru': 'en', // 俄语 → 英语
    'ar': 'en', // 阿拉伯语 → 英语
  } as Record<string, string>
};

export const useLanguageDetection = (): LanguageDetectionResult => {
  const { i18n } = useTranslation();
  const [result, setResult] = useState<LanguageDetectionResult>({
    suggestedLanguage: null,
    confidence: 0,
    userCountry: null,
    browserLanguage: 'en',
    shouldShowSuggestion: false,
  });

  // 获取用户地理位置
  const detectUserLocation = async (): Promise<GeoLocation | null> => {
    // 开发环境下检查是否有模拟的国家设置
    if (process.env.NODE_ENV === 'development') {
      const simulatedCountry = localStorage.getItem('debug-simulated-country');
      if (simulatedCountry) {
        return {
          country: simulatedCountry,
          timezone: '',
        };
      }
    }

    try {
      // 方法1: 使用免费的IP地理位置API
      const response = await fetch('https://ipapi.co/json/', {
        timeout: 3000,
      });

      if (response.ok) {
        const data = await response.json();
        return {
          country: data.country_code,
          timezone: data.timezone,
        };
      }
    } catch (error) {
      console.warn('Primary geolocation failed, trying backup:', error);
    }

    try {
      // 方法2: 备用API
      const response = await fetch('https://api.country.is/', {
        timeout: 3000,
      });

      if (response.ok) {
        const data = await response.json();
        return {
          country: data.country,
          timezone: '',
        };
      }
    } catch (error) {
      console.warn('Backup geolocation failed:', error);
    }

    // 方法3: 通过时区推测国家
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const countryGuess = guessCountryFromTimezone(timezone);
      if (countryGuess) {
        return {
          country: countryGuess,
          timezone,
        };
      }
    } catch (error) {
      console.warn('Timezone detection failed:', error);
    }

    return null;
  };

  // 通过时区推测国家
  const guessCountryFromTimezone = (timezone: string): string | null => {
    const timezoneCountryMap: Record<string, string> = {
      // 高优先级国家
      'Asia/Seoul': 'KR',
      'Asia/Tokyo': 'JP',
      'Asia/Shanghai': 'CN',
      'Asia/Taipei': 'TW',
      'Asia/Hong_Kong': 'HK',

      // 其他亚洲国家（会被推荐英语）
      'Asia/Bangkok': 'TH',
      'Asia/Ho_Chi_Minh': 'VN',
      'Asia/Kuala_Lumpur': 'MY',
      'Asia/Singapore': 'SG',
      'Asia/Jakarta': 'ID',
      'Asia/Manila': 'PH',

      // 英语国家
      'America/New_York': 'US',
      'America/Los_Angeles': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      'Europe/London': 'GB',
      'Australia/Sydney': 'AU',
      'Australia/Melbourne': 'AU',
      'America/Toronto': 'CA',

      // 其他主要国家（会被推荐英语）
      'Europe/Paris': 'FR',
      'Europe/Berlin': 'DE',
      'Europe/Rome': 'IT',
      'Europe/Madrid': 'ES',
      'Europe/Moscow': 'RU',
      'America/Sao_Paulo': 'BR',
    };

    return timezoneCountryMap[timezone] || null;
  };

  // 获取浏览器语言
  const detectBrowserLanguage = (): string => {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    return browserLang.toLowerCase();
  };

  // 计算语言推荐
  const calculateLanguageSuggestion = (
    country: string | null,
    browserLang: string
  ): { language: string | null; confidence: number } => {
    let maxConfidence = 0;
    let suggestedLang: string | null = null;

    // 1. 检查高优先级国家
    if (country && LANGUAGE_CONFIG.highPriorityCountries[country]) {
      const countryConfig = LANGUAGE_CONFIG.highPriorityCountries[country];
      if (countryConfig.confidence > maxConfidence) {
        maxConfidence = countryConfig.confidence;
        suggestedLang = countryConfig.lang;
      }
    }

    // 2. 检查浏览器语言
    const mappedBrowserLang = LANGUAGE_CONFIG.browserLangMap[browserLang] ||
                              LANGUAGE_CONFIG.browserLangMap[browserLang.split('-')[0]];

    if (mappedBrowserLang && LANGUAGE_CONFIG.supportedLanguages.includes(mappedBrowserLang)) {
      const browserConfidence = 0.7; // 浏览器语言的基础置信度
      if (browserConfidence > maxConfidence ||
          (suggestedLang === mappedBrowserLang && browserConfidence > 0.5)) {
        maxConfidence = Math.max(maxConfidence, browserConfidence);
        suggestedLang = mappedBrowserLang;
      }
    }

    // 3. 如果国家和浏览器语言一致，提升置信度
    if (country && suggestedLang &&
        LANGUAGE_CONFIG.highPriorityCountries[country]?.lang === mappedBrowserLang) {
      maxConfidence = Math.min(0.95, maxConfidence + 0.15);
    }

    // 4. 特殊处理：如果检测到的语言映射到了英语但用户当前不是英语，提供适度推荐
    if (mappedBrowserLang === 'en' && maxConfidence < 0.6) {
      // 对于英语国家或非支持语言用户，适度推荐英语
      maxConfidence = Math.max(maxConfidence, 0.6);
      suggestedLang = 'en';
    }

    return { language: suggestedLang, confidence: maxConfidence };
  };

  // 检查是否应该显示语言建议
  const shouldShowLanguageSuggestion = (
    suggestedLang: string | null,
    confidence: number,
    currentLang: string
  ): boolean => {
    // 不建议当前已选择的语言
    if (!suggestedLang || suggestedLang === currentLang) {
      return false;
    }

    // 置信度阈值
    if (confidence < 0.6) {
      return false;
    }

    // 检查是否已经忽略过此建议（使用localStorage）
    const dismissedKey = `language-suggestion-dismissed-${suggestedLang}`;
    const dismissed = localStorage.getItem(dismissedKey);
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      // 7天后再次显示建议
      if (daysSinceDismissed < 7) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    const performLanguageDetection = async () => {
      // 获取当前语言
      const currentLanguage = i18n.language || 'en';

      // 获取浏览器语言
      const browserLanguage = detectBrowserLanguage();

      // 获取用户位置
      const location = await detectUserLocation();

      // 计算语言建议
      const { language: suggestedLanguage, confidence } = calculateLanguageSuggestion(
        location?.country || null,
        browserLanguage
      );

      // 判断是否显示建议
      const shouldShow = shouldShowLanguageSuggestion(
        suggestedLanguage,
        confidence,
        currentLanguage
      );

      setResult({
        suggestedLanguage,
        confidence,
        userCountry: location?.country || null,
        browserLanguage,
        shouldShowSuggestion: shouldShow,
      });
    };

    performLanguageDetection();
  }, [i18n.language]);

  return result;
};

// 导出用于忽略语言建议的工具函数
export const dismissLanguageSuggestion = (language: string): void => {
  const dismissedKey = `language-suggestion-dismissed-${language}`;
  localStorage.setItem(dismissedKey, Date.now().toString());
};

// 导出用于清除忽略记录的工具函数
export const clearLanguageSuggestionDismissals = (): void => {
  const keys = Object.keys(localStorage).filter(key =>
    key.startsWith('language-suggestion-dismissed-')
  );
  keys.forEach(key => localStorage.removeItem(key));
};