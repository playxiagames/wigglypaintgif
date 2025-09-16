import React, { useState } from 'react';
import LanguageLink from '../components/routing/LanguageLink';
import { useTranslation } from 'react-i18next';
import ToolEmbed from '../components/common/ToolEmbed';
import SEOHead from '../components/common/SEOHead';
import LanguageSuggestion from '../components/common/LanguageSuggestion';
import LanguageDetectionDebug from '../components/dev/LanguageDetectionDebug';
import { useSimpleGallery } from '../hooks/useSimpleGallery';
import { useLanguageDetection } from '../hooks/useLanguageDetection';
import { useLanguageRouter } from '../hooks/useLanguageRouter';
import { formatParagraph, formatListItem } from '../utils/textFormatter';
import { SupportedLanguage } from '../types';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { items, trackDownload } = useSimpleGallery(290);
  const [showLanguageSuggestion, setShowLanguageSuggestion] = useState(true);

  // 获取前18个GIF作为预览 (3行 x 6列)
  const previewGifs = items.slice(0, 18);

  // 智能语言检测
  const {
    suggestedLanguage,
    confidence,
    userCountry,
    shouldShowSuggestion,
  } = useLanguageDetection();

  // 语言路由系统
  const { changeLanguage } = useLanguageRouter();

  // 处理语言切换
  const handleLanguageAccept = async (language: string) => {
    try {
      // 使用正确的语言切换方法，会自动更新URL
      changeLanguage(language as SupportedLanguage);
      setShowLanguageSuggestion(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  // 处理语言建议忽略
  const handleLanguageDismiss = () => {
    setShowLanguageSuggestion(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Language Suggestion */}
      {shouldShowSuggestion &&
       showLanguageSuggestion &&
       suggestedLanguage && (
        <LanguageSuggestion
          suggestedLanguage={suggestedLanguage}
          confidence={confidence}
          userCountry={userCountry}
          onAccept={handleLanguageAccept}
          onDismiss={handleLanguageDismiss}
        />
      )}

      {/* Language Detection Debug Tool (Development Only) */}
      <LanguageDetectionDebug />

      <SEOHead
        title={t('home.title')}
        description={t('home.description')}
        canonical="/"
        ogTitle={t('home.title')}
        ogDescription={t('home.description')}
        type="website"
      />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('home.title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {t('home.subtitle')}
          </p>
        </div>
        
        {/* Wiggly Paint Tool Embed */}
        <div className="mb-16" id="wiggly-paint-tool">
          {/* <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6"> */}
            <ToolEmbed
              src="https://gifs.wigglypaintgif.com/WigglyPaint.html"
              title="Wiggly Paint - Animated GIF Creator"
              allowFullscreen={true}
              loadingTimeout={8000}
              onLoad={() => console.log('Wiggly Paint tool loaded')}
              onError={(error) => console.error('Wiggly Paint load error:', error)}
            />
          {/* </div> */}
        </div>

        {/* Gallery Preview */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t('home.gallery_preview_title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            {t('home.gallery_preview_subtitle')}
          </p>
        </div>

        {/* 首页预览图库 - 自定义网格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {previewGifs.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={`Wiggly Paint creation ${item.fileName}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                  loading="lazy"
                />

                {/* 下载悬浮层 */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
                  <button
                    onClick={() => {
                      // 创建下载链接
                      const a = document.createElement('a');
                      a.href = item.imageUrl;
                      a.download = item.fileName;
                      a.style.display = 'none';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);

                      // 记录下载统计
                      trackDownload(item);
                    }}
                    className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transform transition-all duration-200 hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t('home.download')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <LanguageLink
            to="/gallery"
            className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <span>{t('home.view_gallery')}</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LanguageLink>
        </div>

        {/* Introduction Content */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-16 max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            {t('home.what_is_title')}
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {formatParagraph(t('home.intro_paragraph'))}
            </p>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-6 sm:mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  {t('home.creative_features_title')}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>{formatListItem(t('home.creative_features.brushes'))}</li>
                  <li>{formatListItem(t('home.creative_features.animation'))}</li>
                  <li>{formatListItem(t('home.creative_features.sound'))}</li>
                  <li>{formatListItem(t('home.creative_features.export'))}</li>
                  <li>{formatListItem(t('home.creative_features.cropping'))}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  {t('home.user_experience_title')}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>{formatListItem(t('home.user_experience.no_registration'))}</li>
                  <li>{formatListItem(t('home.user_experience.privacy'))}</li>
                  <li>{formatListItem(t('home.user_experience.multi_platform'))}</li>
                  <li>{formatListItem(t('home.user_experience.offline'))}</li>
                  <li>{formatListItem(t('home.user_experience.unlimited'))}</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
              {t('home.how_to_use_title')}
            </h3>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>{formatListItem(t('home.how_to_use_steps.step1'))}</li>
                <li>{formatListItem(t('home.how_to_use_steps.step2'))}</li>
                <li>{formatListItem(t('home.how_to_use_steps.step3'))}</li>
                <li>{formatListItem(t('home.how_to_use_steps.step4'))}</li>
                <li>{formatListItem(t('home.how_to_use_steps.step5'))}</li>
              </ol>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
              {t('home.why_choose_title')}
            </h3>
            <p className="text-gray-700 mb-6">
              {t('home.why_choose_content')}
            </p>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-semibold text-blue-900 mb-3">
                {t('home.rating_title')}
              </h4>
              <p className="text-blue-800">
                {t('home.rating_content')}
              </p>
            </div>

            {/* FAQ Section */}
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
              {t('home.faq_title')}
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">{t('home.faq.free_title')}</h5>
                <p className="text-gray-700">{t('home.faq.free_content')}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">{t('home.faq.account_title')}</h5>
                <p className="text-gray-700">{t('home.faq.account_content')}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">{t('home.faq.privacy_title')}</h5>
                <p className="text-gray-700">{t('home.faq.privacy_content')}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">{t('home.faq.mobile_title')}</h5>
                <p className="text-gray-700">{t('home.faq.mobile_content')}</p>
              </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => {
                const toolElement = document.getElementById('wiggly-paint-tool');
                if (toolElement) {
                  toolElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="mr-2">🎨</span>
              {t('home.start_creating')}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;