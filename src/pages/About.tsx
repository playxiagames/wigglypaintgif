import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/common/SEOHead';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={t('about.title')}
        description={t('about.description')}
        canonical="/about/"
        ogTitle={t('about.title')}
        ogDescription={t('about.description')}
        type="article"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            {t('about.title')}
          </h1>
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about_content.hero_subtitle')}
            </p>
          </div>

          {/* What is Wiggly Paint */}
          <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {t('about_content.what_is_title')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('about_content.what_is_content')}
            </p>
          </div>

          {/* Mission */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              {t('about_content.mission_title')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              {t('about_content.mission_content')}
            </p>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('about_content.features_title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('about_content.feature_brushes')}
                </h3>
                <p className="text-gray-600">
                  {t('about_content.feature_brushes_desc')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">🔊</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('about_content.feature_sound')}
                </h3>
                <p className="text-gray-600">
                  {t('about_content.feature_sound_desc')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('about_content.feature_export')}
                </h3>
                <p className="text-gray-600">
                  {t('about_content.feature_export_desc')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('about_content.feature_privacy')}
                </h3>
                <p className="text-gray-600">
                  {t('about_content.feature_privacy_desc')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('about_content.feature_crossplatform')}
                </h3>
                <p className="text-gray-600">
                  {t('about_content.feature_crossplatform_desc')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">🆓</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('about_content.feature_free')}
                </h3>
                <p className="text-gray-600">
                  {t('about_content.feature_free_desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Technology */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {t('about_content.technology_title')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('about_content.technology_content')}
            </p>
          </div>

          {/* Community */}
          <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              {t('about_content.community_title')}
            </h2>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              {t('about_content.community_content')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;