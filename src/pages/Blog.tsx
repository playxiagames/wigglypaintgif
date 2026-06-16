import React from 'react';
import LanguageLink from '../components/routing/LanguageLink';
import SEOHead from '../components/common/SEOHead';
import { posts } from '../content/blog';
import { breadcrumbSchema } from '../utils/structuredData';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Wiggly Paint Blog - GIF Drawing Tutorials & Ideas"
        description="Tutorials, tips and inspiration for creating animated wiggly GIFs. Learn how to turn your drawings into looping GIFs for free, right in your browser."
        canonical="/blog/"
        type="website"
        schema={breadcrumbSchema('Blog', '/blog/')}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Wiggly Paint Blog
            </h1>
            <p className="text-lg text-gray-600">
              Tutorials, tips and ideas for making animated wiggly GIFs.
            </p>
          </div>

          {/* Post list */}
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-6 sm:p-8"
              >
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  <LanguageLink to={`/blog/${post.slug}`} className="hover:text-blue-600">
                    {post.h1}
                  </LanguageLink>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <LanguageLink
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 font-semibold hover:underline"
                >
                  Read more &rarr;
                </LanguageLink>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">
              Try it yourself
            </h2>
            <p className="text-blue-800 mb-6">
              The best way to learn is to draw. Open the free canvas and make your first wiggly GIF.
            </p>
            <LanguageLink
              to="/"
              className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              Try Wiggly Paint Now
            </LanguageLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
