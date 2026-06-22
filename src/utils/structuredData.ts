/**
 * 结构化数据（JSON-LD）生成工具。
 *
 * 首页的 WebApplication 直接写死在 index.html（不依赖 JS，最稳）。
 * 子页面的 schema 由 SEOHead 在运行时注入（预渲染时会被烘焙进静态 HTML）。
 */

const SITE_URL = 'https://wigglypaintgif.com';

/**
 * 两级面包屑（Home > 当前页）。
 * 站点结构扁平，所有子页面都直挂在首页下，故统一用这一种。
 */
export const breadcrumbSchema = (name: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
  ],
});

interface BlogPostMeta {
  slug: string;
  h1: string;
  description: string;
  date: string;
}

/**
 * 博客文章的结构化数据：三级面包屑（Home > Blog > 文章）+ BlogPosting。
 * 返回数组，SEOHead 会作为一个 JSON-LD 节点数组整体注入。
 */
export const blogPostSchema = (post: BlogPostMeta) => {
  const url = `${SITE_URL}/blog/${post.slug}/`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
        { '@type': 'ListItem', position: 3, name: post.h1, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.h1,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Organization', name: 'Wiggly Paint' },
      publisher: { '@type': 'Organization', name: 'Wiggly Paint' },
      image: `${SITE_URL}/og-image.png`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
  ];
};

interface WebAppMeta {
  url: string;
  description: string;
  inLanguage: string;
}

/**
 * 首页 WebApplication，仅供非英语首页使用（英语首页用 index.html 写死的版本）。
 * 字段与 index.html 的英文版对齐，url/description/语言按当前语言本地化。
 */
export const webApplicationSchema = (meta: WebAppMeta) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Wiggly Paint',
  alternateName: 'WigglyPaint',
  url: meta.url,
  description: meta.description,
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Any (web browser)',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  inLanguage: meta.inLanguage,
});
