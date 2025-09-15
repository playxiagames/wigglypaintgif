import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageLink from '../routing/LanguageLink';
import LanguageSwitch from '../common/LanguageSwitch';
import { extractLanguageFromPath } from '../../utils/languageUtils';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: t('navigation.home'), path: '/' },
    { name: t('navigation.gallery'), path: '/gallery' },
    { name: t('navigation.about'), path: '/about' },
  ];

  // 在开发环境中添加统计页面
  if (import.meta.env.DEV) {
    navigation.push({ name: '📊 Stats', path: '/stats' });
  }

  const isActive = (path: string) => {
    // 提取不含语言前缀的路径进行比较
    const { pathWithoutLanguage } = extractLanguageFromPath(location.pathname);
    const normalizedPath = path === '/' ? '/' : path;
    return pathWithoutLanguage === normalizedPath;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <LanguageLink to="/" className="flex items-center space-x-2">
            <div className="text-2xl">🎨</div>
            <span className="text-xl font-bold text-gray-900">WigglyPaint</span>
          </LanguageLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <LanguageLink
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </LanguageLink>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <LanguageSwitch />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navigation.map((item) => (
              <LanguageLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </LanguageLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;