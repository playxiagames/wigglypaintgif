import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/common/SEOHead';

const Privacy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={t('privacy.title')}
        description={t('privacy.description')}
        canonical="/privacy/"
        ogTitle={t('privacy.title')}
        ogDescription={t('privacy.description')}
        type="article"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: September 14, 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            {/* Introduction */}
            <div className="mb-8 bg-green-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-900 mb-3 flex items-center">
                <span className="mr-2">🔒</span>
                Privacy-First Approach
              </h2>
              <p className="text-green-800 text-lg">
                <strong>Your privacy is our priority.</strong> Wiggly Paint is designed with privacy in mind. 
                Your drawings and creations never leave your device, and we collect minimal data to provide our service.
              </p>
            </div>

            {/* 1. Information We DON'T Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We DON'T Collect</h2>
              <p className="mb-4">Wiggly Paint is designed to protect your privacy. We do NOT collect:</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-green-700">
                <li><strong>Your artwork or drawings</strong> - All creations remain on your device</li>
                <li><strong>Personal information</strong> - No names, emails, or personal details required</li>
                <li><strong>Account data</strong> - No registration or login required</li>
                <li><strong>Location data</strong> - We don't track your geographic location</li>
                <li><strong>Biometric data</strong> - No fingerprints, face scans, or similar data</li>
                <li><strong>Device identifiers</strong> - No unique device tracking</li>
              </ul>
            </section>

            {/* 2. Information We DO Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We DO Collect</h2>
              <p className="mb-4">To provide and improve our service, we may collect limited, anonymized data:</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Usage Analytics (Optional)</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Page views and general navigation patterns</li>
                <li>Browser type and version (for compatibility)</li>
                <li>General geographic region (country/state level only)</li>
                <li>Download statistics (which GIFs are popular)</li>
                <li>Error logs to fix technical issues</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Local Storage</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Download preferences and statistics (stored on your device only)</li>
                <li>Language preferences</li>
                <li>Tool settings and preferences</li>
              </ul>
            </section>

            {/* 3. How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Information</h2>
              <p className="mb-4">Any data we collect is used solely to:</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Improve website performance and user experience</li>
                <li>Fix technical issues and bugs</li>
                <li>Understand which features are most popular</li>
                <li>Ensure compatibility across different devices and browsers</li>
              </ul>
              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                <strong>Note:</strong> All analytics data is aggregated and anonymized. 
                We cannot identify individual users or link data back to specific people.
              </p>
            </section>

            {/* 4. Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Services</h2>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Google Analytics (Optional)</h3>
              <p className="mb-4">
                We may use Google Analytics to understand website usage patterns. This service:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Collects anonymized usage data</li>
                <li>Does not identify individual users</li>
                <li>Can be disabled in your browser settings</li>
                <li>Follows Google's privacy policies</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Cloudflare CDN</h3>
              <p className="mb-4">
                Our website and GIF files are served through Cloudflare for improved performance and security.
                Cloudflare may collect basic technical data like IP addresses for security purposes.
              </p>
            </section>

            {/* 5. Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
              <p className="mb-4">
                Since we don't collect personal data, there's minimal data to retain. Any technical logs 
                or analytics data is automatically deleted after:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Analytics data:</strong> 26 months (Google Analytics default)</li>
                <li><strong>Error logs:</strong> 30 days</li>
                <li><strong>Local storage:</strong> Remains on your device until you clear it</li>
              </ul>
            </section>

            {/* 6. Your Rights and Control */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Control</h2>
              <p className="mb-4">You have full control over your data:</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Browser Controls</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Disable analytics tracking in your browser</li>
                <li>Clear local storage and cookies</li>
                <li>Use private/incognito browsing mode</li>
                <li>Block third-party tracking</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Data Requests</h3>
              <p className="mb-4">
                Since we don't collect personal data, there's typically no personal data to access, 
                modify, or delete. However, if you have concerns, contact us at support@wigglypaintgif.com
              </p>
            </section>

            {/* 7. Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
              <p className="mb-4">
                Wiggly Paint is safe for children to use. We don't collect personal information from anyone, 
                including children under 13. The tool works entirely in the browser without requiring 
                any personal data.
              </p>
            </section>

            {/* 8. International Users */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Users</h2>
              <p className="mb-4">
                Wiggly Paint is accessible worldwide. Since your artwork never leaves your device, 
                there are no international data transfer concerns. Any analytics data follows 
                standard international privacy practices.
              </p>
            </section>

            {/* 9. Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this privacy policy to reflect changes in our practices or legal requirements. 
                Updates will be posted on this page with a new "Last updated" date.
              </p>
            </section>

            {/* 10. Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="mb-4">
                If you have questions about this privacy policy or our privacy practices, contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold">Email: support@wigglypaintgif.com</p>
                <p className="text-sm text-gray-600 mt-2">
                  We'll respond to privacy inquiries within 48 hours.
                </p>
              </div>
            </section>

            {/* Footer Note */}
            <div className="border-t border-gray-200 pt-8 mt-12 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                🛡️ Our Commitment to Your Privacy
              </h3>
              <p className="text-blue-800">
                Privacy isn't just a policy for us—it's a core design principle. Wiggly Paint was built 
                to let you create freely without worrying about data collection or privacy invasion. 
                Your creativity is yours alone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;