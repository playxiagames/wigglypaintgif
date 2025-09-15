import React from 'react';
import LanguageLink from '../components/routing/LanguageLink';
import { useTranslation } from 'react-i18next';
import ToolEmbed from '../components/common/ToolEmbed';
import SEOHead from '../components/common/SEOHead';
import { useSimpleGallery } from '../hooks/useSimpleGallery';
import LazyImage from '../components/gallery/LazyImage';
import { formatParagraph, formatListItem } from '../utils/textFormatter';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { items } = useSimpleGallery(250);
  
  // 获取前24个GIF作为预览
  const previewGifs = items.slice(0, 24);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
        
        {/* WigglyPaint Tool Embed */}
        <div className="mb-16">
          {/* <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6"> */}
            <ToolEmbed
              src="https://gifs.wigglypaintgif.com/WigglyPaint.html"
              title="WigglyPaint - Animated GIF Creator"
              allowFullscreen={true}
              loadingTimeout={8000}
              onLoad={() => console.log('WigglyPaint tool loaded')}
              onError={(error) => console.error('WigglyPaint load error:', error)}
            />
          {/* </div> */}
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

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4 mb-8">
          {previewGifs.map((gif) => (
            <div key={gif.id} className="aspect-square bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <LazyImage
                src={gif.imageUrl}
                alt={`WigglyPaint creation ${gif.fileName}`}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
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
      </div>
    </div>
  );
};

export default Home;