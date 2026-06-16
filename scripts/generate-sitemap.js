#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置信息
// 当前仅英文。新增语言（es/ru/pt/de）时在 languages 中追加，并恢复 hreflang 生成。
const config = {
  baseUrl: 'https://wigglypaintgif.com',
  languages: ['en'],
  pages: [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: 'gallery', priority: '0.9', changefreq: 'daily' },
    { path: 'about', priority: '0.7', changefreq: 'monthly' },
    { path: 'stats', priority: '0.6', changefreq: 'weekly' },
    { path: 'terms', priority: '0.4', changefreq: 'yearly' },
    { path: 'privacy', priority: '0.4', changefreq: 'yearly' },
    { path: 'blog', priority: '0.5', changefreq: 'weekly' }
  ]
};

// 博客文章：从单一数据源 posts.json 派生，避免在多处重复维护 slug
const postsPath = path.join(__dirname, '../src/content/blog/posts.json');
const blogPosts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
blogPosts.forEach(post => {
  config.pages.push({ path: `blog/${post.slug}`, priority: '0.6', changefreq: 'monthly' });
});

// 生成单个 URL 条目（仅英文，无需 hreflang）
function generateUrlEntry(page, lastmod) {
  const url = `${config.baseUrl}/${page.path}`;

  // 移除末尾的斜杠，但保留根路径的斜杠；所有页面统一以 / 结尾
  const cleanUrl = url.replace(/\/+$/, '') || config.baseUrl;
  const finalUrl = cleanUrl === config.baseUrl ? cleanUrl + '/' : cleanUrl + '/';

  return `  <url>
    <loc>${finalUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}

// 生成完整的 sitemap
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- English Pages -->`;

  config.pages.forEach(page => {
    sitemap += '\n' + generateUrlEntry(page, today);
  });

  sitemap += '\n</urlset>\n';

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

  // 统计页面数量
  const totalPages = config.languages.length * config.pages.length;
  console.log(`📊 Generated sitemap with ${totalPages} pages`);
  console.log(`🌍 Languages: ${config.languages.join(', ')}`);
  console.log(`📄 Pages per language: ${config.pages.length}`);
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  writeSitemap();
}

export { generateSitemap, writeSitemap, config };