import { createContext, useContext } from 'react';
import { LanguageRouterContext } from '../types';

// 创建语言路由上下文
export const LanguageRouterContextProvider = createContext<LanguageRouterContext | null>(null);

/**
 * 语言路由Context Hook
 */
export function useLanguageContext(): LanguageRouterContext {
  const context = useContext(LanguageRouterContextProvider);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageRouter');
  }
  return context;
}