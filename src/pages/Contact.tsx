import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/common/SEOHead';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t('contact.title')}
        description={t('contact.description')}
        canonical="/contact/"
        ogTitle={t('contact.title')}
        ogDescription={t('contact.description')}
        type="website"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('contact.hero_title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contact.hero_subtitle')}
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-1 gap-8 mb-12">
            {/* Email Support */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl mb-6">
                📧
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('contact.email_title')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('contact.email_description')}
              </p>
              <a 
                href="mailto:support@wigglypaintgif.com"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-lg"
              >
                {t('contact.email_address')}
              </a>
              <p className="text-sm text-gray-500 mt-4">
                {t('contact.response_time')}
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('contact.common_questions')}
            </h2>
            
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('contact.faq_free')}
                </h3>
                <p className="text-gray-600">
                  {t('contact.faq_free_answer')}
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('contact.faq_account')}
                </h3>
                <p className="text-gray-600">
                  {t('contact.faq_account_answer')}
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('contact.faq_privacy')}
                </h3>
                <p className="text-gray-600">
                  {t('contact.faq_privacy_answer')}
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('contact.faq_mobile')}
                </h3>
                <p className="text-gray-600">
                  {t('contact.faq_mobile_answer')}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-12 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
            <div className="flex items-start">
              <div className="text-2xl mr-3">💡</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Need More Help?
                </h3>
                <p className="text-blue-800">
                  Visit our <a href="/about" className="underline hover:text-blue-600">About page</a> to learn more about WigglyPaint features, 
                  or check the <a href="/gallery" className="underline hover:text-blue-600">Gallery</a> for inspiration and examples.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;