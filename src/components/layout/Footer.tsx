import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageLink from '../routing/LanguageLink';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🎨</div>
              <span className="text-2xl font-bold">Wiggly Paint</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
            <div className="mt-4 text-xs text-gray-400">
              <p>4.9/5 {t('footer.rating')}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-200">
              {t('footer.explore')}
            </h3>
            <nav className="space-y-2">
              <LanguageLink to="/" className="block text-gray-300 hover:text-white text-sm transition-colors">
                {t('navigation.home')}
              </LanguageLink>
              <LanguageLink to="/gallery" className="block text-gray-300 hover:text-white text-sm transition-colors">
                {t('navigation.gallery')}
              </LanguageLink>
              <LanguageLink to="/about" className="block text-gray-300 hover:text-white text-sm transition-colors">
                {t('navigation.about')}
              </LanguageLink>
              <LanguageLink to="/stats" className="block text-gray-300 hover:text-white text-sm transition-colors">
                {t('navigation.stats')}
              </LanguageLink>
            </nav>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-200">
              {t('footer.support')}
            </h3>
            <nav className="space-y-2">
              <LanguageLink to="/terms" className="block text-gray-300 hover:text-white text-sm transition-colors">
                {t('footer.terms')}
              </LanguageLink>
              <LanguageLink to="/privacy" className="block text-gray-300 hover:text-white text-sm transition-colors">
                {t('footer.privacy')}
              </LanguageLink>
              <LanguageLink to="/blog" className="block text-gray-300 hover:text-white text-sm transition-colors">
                {t('footer.blog')}
              </LanguageLink>
              <LanguageLink 
                to="/contact" 
                className="block text-gray-300 hover:text-white text-sm transition-colors"
              >
                {t('footer.contact')}
              </LanguageLink>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-xs text-gray-500">
                {t('footer.powered_by')}
              </span>
              <div className="flex space-x-4">
                <a 
                  href="https://internet-janitor.itch.io/wigglypaint" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-xs transition-colors"
                >
                  {t('footer.original_tool')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;