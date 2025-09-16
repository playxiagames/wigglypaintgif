import React from 'react';
import LanguageLink from '../components/routing/LanguageLink';
import SEOHead from '../components/common/SEOHead';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Wiggly Paint Blog - Coming Soon"
        description="The Wiggly Paint blog is coming soon! Stay tuned for tutorials, tips, and inspiration for creating amazing animated GIFs."
        canonical="/blog/"
        type="website"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Wiggly Paint Blog
            </h1>
            <p className="text-lg text-gray-600">
              Coming Soon!
            </p>
          </div>

          {/* Coming Soon Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
            <div className="text-6xl mb-6">🚧</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Blog Under Construction
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're working on creating amazing content about animated GIF creation, 
              Wiggly Paint tutorials, and digital art inspiration. Stay tuned!
            </p>

            {/* What's Coming */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-semibold text-gray-900 mb-2">Tutorials</h3>
                <p className="text-sm text-gray-600">Step-by-step guides for creating amazing animations</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="font-semibold text-gray-900 mb-2">Tips & Tricks</h3>
                <p className="text-sm text-gray-600">Pro techniques for better GIF creation</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-semibold text-gray-900 mb-2">Inspiration</h3>
                <p className="text-sm text-gray-600">Showcase of amazing user creations</p>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <LanguageLink 
                to="/" 
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl mr-4"
              >
                Try Wiggly Paint Now
              </LanguageLink>
              <LanguageLink 
                to="/gallery" 
                className="inline-flex items-center px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Browse Gallery
              </LanguageLink>
            </div>
          </div>

          {/* Newsletter Signup Placeholder */}
          <div className="mt-12 bg-blue-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">
              📧 Stay Updated
            </h3>
            <p className="text-blue-800 mb-4">
              Want to be notified when we publish new blog posts and tutorials?
            </p>
            <p className="text-blue-700">
              Contact us at <a href="mailto:support@wigglypaintgif.com" className="underline font-semibold">support@wigglypaintgif.com</a> to join our newsletter!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;