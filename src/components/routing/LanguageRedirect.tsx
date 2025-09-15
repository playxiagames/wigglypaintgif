import React from 'react';

interface LanguageRedirectProps {
  children: React.ReactNode;
}

/**
 * 语言重定向组件
 * 在应用启动时检测用户语言并重定向到相应的语言版本
 */
const LanguageRedirect: React.FC<LanguageRedirectProps> = ({ children }) => {
  // 禁用自动重定向，只提供用户手动选择语言的功能
  // 默认显示英文，通过LanguageSuggestionBanner提示用户切换
  return <>{children}</>;
};

export default LanguageRedirect;