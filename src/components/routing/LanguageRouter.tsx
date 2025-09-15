import React from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';
import { useLanguageRouter } from '../../hooks/useLanguageRouter';
import { LanguageRouterContextProvider } from '../../hooks/useLanguageContext';
import { LanguageRouterContext } from '../../types';
import { isSupportedLanguage } from '../../utils/languageUtils';

/**
 * 语言路由包装组件
 * 处理URL中的语言参数，提供语言上下文
 */
const LanguageRouter: React.FC = () => {
  const params = useParams<{ lang?: string }>();
  
  try {
    const languageRouterHook = useLanguageRouter();
    const { currentLanguage, changeLanguage, getLocalizedPath, isDefaultLanguage } = languageRouterHook;
    
    // 验证URL中的语言参数
    const urlLanguage = params.lang;
    
    // 如果URL中有语言参数但不是支持的语言，重定向到默认语言
    if (urlLanguage && !isSupportedLanguage(urlLanguage)) {
      return <Navigate to="/" replace />;
    }
    
    const contextValue: LanguageRouterContext = {
      currentLanguage,
      availableLanguages: languageRouterHook.availableLanguages,
      changeLanguage,
      getLocalizedPath,
      isDefaultLanguage
    };

    return (
      <LanguageRouterContextProvider.Provider value={contextValue}>
        <Outlet />
      </LanguageRouterContextProvider.Provider>
    );
  } catch (error) {
    console.error('LanguageRouter error:', error);
    // 如果语言路由失败，直接渲染子组件
    return <Outlet />;
  }
};

export default LanguageRouter;