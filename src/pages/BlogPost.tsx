import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import LanguageLink from '../components/routing/LanguageLink';
import BlogArticle from '../components/blog/BlogArticle';
import { getPost } from '../content/blog';
import { blogPostSchema } from '../utils/structuredData';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const post = getPost(slug);

  // 未知 slug → 回到博客首页（避免渲染空白页被收录）
  if (!post) {
    return <Navigate to="/blog/" replace />;
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={post.title}
        description={post.description}
        canonical={`/blog/${post.slug}/`}
        ogTitle={post.h1}
        ogDescription={post.description}
        type="article"
        schema={blogPostSchema(post)}
      />

      <div className="container mx-auto px-4 py-16">
        <article className="max-w-3xl mx-auto">
          {/* 面包屑（可见，与 BreadcrumbList 结构化数据呼应） */}
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <LanguageLink to="/" className="hover:text-blue-600">Home</LanguageLink>
            <span className="mx-2">/</span>
            <LanguageLink to="/blog" className="hover:text-blue-600">Blog</LanguageLink>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{post.h1}</h1>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </header>

          <BlogArticle sections={post.sections} />

          {/* 内链导流到工具与图库 */}
          <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">Ready to make your own?</h2>
            <p className="text-blue-800 mb-6">Open the free Wiggly Paint canvas and start drawing - no download, no sign-up.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <LanguageLink
                to="/"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
              >
                Try Wiggly Paint
              </LanguageLink>
              <LanguageLink
                to="/gallery"
                className="inline-flex items-center px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
              >
                Browse Gallery
              </LanguageLink>
            </div>
          </div>

          <div className="mt-8">
            <LanguageLink to="/blog" className="text-blue-600 hover:underline">&larr; Back to all posts</LanguageLink>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
