import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/common/SEOHead';

const Terms: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={t('terms.title')}
        description={t('terms.description')}
        canonical="/terms/"
        ogTitle={t('terms.title')}
        ogDescription={t('terms.description')}
        type="article"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: September 14, 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-lg leading-relaxed">
                Welcome to WigglyPaint GIF Creator. By using our service, you agree to these terms. 
                Please read them carefully as they govern your use of our animated GIF creation tool.
              </p>
            </div>

            {/* 1. Service Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Service Description</h2>
              <p className="mb-4">
                WigglyPaint is a free online drawing tool that allows users to create animated GIFs with unique wiggling effects. 
                Our service includes:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Access to the WigglyPaint drawing tool</li>
                <li>8 unique animated brushes with sound effects</li>
                <li>GIF export functionality</li>
                <li>Gallery of user-created content</li>
                <li>Download statistics and analytics</li>
              </ul>
            </section>

            {/* 2. User Responsibilities */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. User Responsibilities</h2>
              <p className="mb-4">When using WigglyPaint, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Use the service for lawful purposes only</li>
                <li>Not create content that is offensive, harmful, or violates others' rights</li>
                <li>Not attempt to reverse engineer or hack the service</li>
                <li>Respect intellectual property rights</li>
                <li>Not use the service to distribute malware or spam</li>
              </ul>
            </section>

            {/* 3. Content and Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Content and Privacy</h2>
              <p className="mb-4">
                <strong>Your Privacy:</strong> Your drawings and creations remain on your device. 
                We do not store, collect, or have access to your artwork.
              </p>
              <p className="mb-4">
                <strong>Content Ownership:</strong> You retain full ownership of any content you create using WigglyPaint.
              </p>
              <p className="mb-4">
                <strong>Usage Analytics:</strong> We may collect anonymized usage statistics to improve our service, 
                but this does not include your actual artwork or personal information.
              </p>
            </section>

            {/* 4. Service Availability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Service Availability</h2>
              <p className="mb-4">
                We strive to maintain high service availability but cannot guarantee uninterrupted access. 
                The service is provided "as is" and we reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Perform maintenance and updates</li>
                <li>Modify or discontinue features</li>
                <li>Suspend service for technical reasons</li>
              </ul>
            </section>

            {/* 5. Disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Disclaimer of Warranties</h2>
              <p className="mb-4">
                WigglyPaint is provided free of charge "as is" without warranties of any kind. 
                We do not guarantee that the service will meet your requirements or be error-free.
              </p>
            </section>

            {/* 6. Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, we shall not be liable for any indirect, 
                incidental, special, or consequential damages arising from your use of WigglyPaint.
              </p>
            </section>

            {/* 7. Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Services</h2>
              <p className="mb-4">
                WigglyPaint is based on the original tool created by Internet Janitor. 
                We are grateful for their contribution to the creative community. 
                Our service may integrate with third-party analytics services to improve user experience.
              </p>
            </section>

            {/* 8. Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to These Terms</h2>
              <p className="mb-4">
                We may update these terms from time to time. Changes will be posted on this page 
                with an updated "Last modified" date. Continued use of the service constitutes acceptance of new terms.
              </p>
            </section>

            {/* 9. Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
              <p className="mb-4">
                If you have questions about these terms, please contact us at:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold">Email: support@wigglypaintgif.com</p>
              </div>
            </section>

            {/* Footer Note */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-center text-gray-500 text-sm">
                By using WigglyPaint, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;