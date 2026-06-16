import React from 'react';
import type { BlogSection } from '../../content/blog';

interface BlogArticleProps {
  sections: BlogSection[];
}

/**
 * 把结构化的文章数据渲染成语义化 HTML（h2 / p / ul），
 * 与具体文章内容解耦：内容来自 posts.json，渲染逻辑只此一处。
 */
const BlogArticle: React.FC<BlogArticleProps> = ({ sections }) => (
  <div className="prose prose-lg max-w-none text-gray-700">
    {sections.map((section, i) => (
      <section key={i} className="mb-8">
        {section.heading && (
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{section.heading}</h2>
        )}
        {section.paragraphs?.map((p, j) => (
          <p key={j} className="mb-4 leading-relaxed">{p}</p>
        ))}
        {section.list && (
          <ul className="list-disc pl-6 space-y-2 mb-4">
            {section.list.map((item, k) => (
              <li key={k}>{item}</li>
            ))}
          </ul>
        )}
      </section>
    ))}
  </div>
);

export default BlogArticle;
