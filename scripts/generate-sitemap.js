#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置信息
const config = {
  baseUrl: 'https://wigglypaintgif.com',
  languages: ['en', 'zh', 'ja', 'ko'],
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

// 生成 hreflang 链接
function generateHreflangs(pagePath) {
  return config.languages.map(lang => {
    const href = lang === 'en'
      ? `${config.baseUrl}/${pagePath}`
      : `${config.baseUrl}/${lang}/${pagePath}`;
    const hreflang = lang === 'en' ? 'en' : lang;
    return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href.replace(/\/+$/, '') || config.baseUrl}/" />`;
  }).join('\n');
}

// 生成单个 URL 条目
function generateUrlEntry(lang, page, lastmod) {
  const isEnglish = lang === 'en';
  const url = isEnglish
    ? `${config.baseUrl}/${page.path}`
    : `${config.baseUrl}/${lang}/${page.path}`;

  // 移除末尾的斜杠，但保留根路径的斜杠
  const cleanUrl = url.replace(/\/+$/, '') || config.baseUrl;
  const finalUrl = cleanUrl === config.baseUrl ? cleanUrl + '/' : cleanUrl + '/';

  return `  <url>
    <loc>${finalUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${generateHreflangs(page.path)}
  </url>`;
}

// 生成完整的 sitemap
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // 为每个语言生成页面
  config.languages.forEach(lang => {
    const langComment = lang === 'en' ? 'English' :
                       lang === 'zh' ? 'Chinese' :
                       lang === 'ja' ? 'Japanese' : 'Korean';

    sitemap += `\n\n  <!-- ${langComment} Pages -->`;

    config.pages.forEach(page => {
      sitemap += '\n' + generateUrlEntry(lang, page, today);
    });
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