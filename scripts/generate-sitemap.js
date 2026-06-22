#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置信息
// 多语言：在页面的 languages 中列出已翻译的语言（缺省为 ['en']）。
// 必须与 src/utils/constants.ts 的 LOCALIZED_ROUTES 保持一致。
const config = {
  baseUrl: 'https://wigglypaintgif.com',
  pages: [
    { path: '', priority: '1.0', changefreq: 'weekly', languages: ['en', 'es'] },
    { path: 'gallery', priority: '0.9', changefreq: 'daily' },
    { path: 'about', priority: '0.7', changefreq: 'monthly' },
    { path: 'stats', priority: '0.6', changefreq: 'weekly' },
    { path: 'terms', priority: '0.4', changefreq: 'yearly' },
    { path: 'privacy', priority: '0.4', changefreq: 'yearly' },
    { path: 'blog', priority: '0.5', changefreq: 'weekly' }
  ]
};

// 语言 → URL 前缀（默认语言 en 无前缀）
const LANG_PREFIX = { en: '', es: '/es' };

// 博客文章：从单一数据源 posts.json 派生（仅英文）
const postsPath = path.join(__dirname, '../src/content/blog/posts.json');
const blogPosts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
blogPosts.forEach(post => {
  config.pages.push({ path: `blog/${post.slug}`, priority: '0.6', changefreq: 'monthly' });
});

// 构造某页某语言的绝对 URL（统一以 / 结尾）
function buildUrl(pagePath, lang) {
  const prefix = LANG_PREFIX[lang] || '';
  if (!pagePath) return `${config.baseUrl}${prefix}/`;
  return `${config.baseUrl}${prefix}/${pagePath}/`;
}

// 为一个页面生成 <url> 条目：多语言页面会为每个语言各出一条，并互相标注 hreflang
function generateUrlEntries(page, lastmod) {
  const langs = page.languages || ['en'];

  return langs.map(lang => {
    const loc = buildUrl(page.path, lang);

    let alternates = '';
    if (langs.length > 1) {
      alternates = langs
        .map(l => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${buildUrl(page.path, l)}"/>`)
        .join('');
      // x-default 指向英文版
      alternates += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${buildUrl(page.path, 'en')}"/>`;
    }

    return `  <url>
    <loc>${loc}</loc>${alternates}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join('\n');
}

// 生成完整的 sitemap
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  config.pages.forEach(page => {
    sitemap += generateUrlEntries(page, today) + '\n';
  });

  sitemap += '</urlset>\n';
  return sitemap;
}

// 写入文件
function writeSitemap() {
  const sitemap = generateSitemap();
  const publicDir = path.join(__dirname, '../public');
  const distDir = path.join(__dirname, '../dist');

  // 确保目录存在
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 写入 public 目录
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated in public/sitemap.xml');

  // 如果 dist 目录存在，也写入
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap copied to dist/sitemap.xml');
  }

  // 统计 URL 数量（多语言页面按语言数计）
  const totalUrls = config.pages.reduce((n, p) => n + (p.languages || ['en']).length, 0);
  console.log(`📊 Generated sitemap with ${totalUrls} URLs (${config.pages.length} pages)`);
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  writeSitemap();
}

export { generateSitemap, writeSitemap, config };
