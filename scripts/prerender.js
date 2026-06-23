#!/usr/bin/env node
/**
 * 构建后预渲染（Phase 1：仅首页）
 *
 * 目的：把 CSR React 应用渲染后的 HTML 写回 dist，让搜索引擎首轮抓取就能拿到
 * 正文 + meta，而不依赖 JS 渲染。
 *
 * 安全设计（首页排名优先）：
 *  - 内容断言：抓不到关键正文/标题时「保留原文件、不覆盖、不让构建失败」。
 *  - 屏蔽 GA / pageview 统计请求，避免 CI 预渲染污染分析数据。
 *  - 仅在装有 puppeteer 的环境（CI ubuntu）运行；本地默认 build 不触发。
 *
 * Phase 2 扩展：往 ROUTES 里追加子页面路径即可。
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '../dist');
const PORT = Number(process.env.PRERENDER_PORT) || 4178;
const HOST = '127.0.0.1';

// 路由与断言全部从单一数据源派生（与 sitemap 对齐，全部生成实体 200 文件）：
//  - 各语言首页：从 src/locales/languages.json 派生（含该语言独有断言片段，
//    防止漏改导致把英文 shell 静默烘焙到 /de/ 等语言路径）。
//  - 英文子页：仅英文本地化，断言为各页专属 H1/正文。
//  - 博客文章：从 src/content/blog/posts.json 派生（断言用各文章 H1）。
const ROUTES = [];
const ASSERTIONS = {};

// 各语言首页（默认语言 → '/'，其余 → '/<prefix>/'）
const langsPath = path.join(__dirname, '../src/locales/languages.json');
JSON.parse(fs.readFileSync(langsPath, 'utf-8')).forEach((lang) => {
  const home = lang.urlPrefix ? `${lang.urlPrefix}/` : '/';
  ROUTES.push(home);
  ASSERTIONS[home] = [lang.homeAssertion];
});

// 英文子页（仅英文本地化）
const EN_SUBPAGE_ASSERTIONS = {
  '/gallery/': ['Wiggly Paint Gallery'],
  '/about/': ['About Wiggly Paint'],
  '/stats/': ['Wiggly Paint Stats'],
  '/blog/': ['Wiggly Paint Blog'],
  '/terms/': ['Terms of Service'],
  '/privacy/': ['Privacy Policy'],
};
for (const [route, needles] of Object.entries(EN_SUBPAGE_ASSERTIONS)) {
  ROUTES.push(route);
  ASSERTIONS[route] = needles;
}

// 博客文章：从单一数据源 posts.json 派生路由与断言（断言用各文章 H1）
const postsPath = path.join(__dirname, '../src/content/blog/posts.json');
JSON.parse(fs.readFileSync(postsPath, 'utf-8')).forEach((post) => {
  const route = `/blog/${post.slug}/`;
  ROUTES.push(route);
  ASSERTIONS[route] = [post.h1];
});

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

// 极简静态服务器：命中文件就返回，否则回退到 index.html（SPA fallback）
function startServer() {
  const server = http.createServer((req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      let filePath = path.join(DIST, urlPath);
      if (urlPath.endsWith('/')) filePath = path.join(filePath, 'index.html');

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        // 资源不存在 → SPA fallback 到 index.html
        filePath = path.join(DIST, 'index.html');
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } catch (err) {
      res.writeHead(500);
      res.end(String(err));
    }
  });
  return new Promise((resolve) => server.listen(PORT, HOST, () => resolve(server)));
}

async function main() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('[prerender] dist/index.html 不存在，请先执行 vite build');
    process.exit(1);
  }

  let puppeteer;
  try {
    puppeteer = (await import('puppeteer')).default;
  } catch {
    console.warn('[prerender] 未安装 puppeteer，跳过预渲染（保留 CSR 产物）');
    return; // 不中断构建
  }

  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let ok = 0;
  let failed = 0;
  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();

      // 屏蔽分析/统计请求，避免预渲染产生假流量
      await page.setRequestInterception(true);
      page.on('request', (r) => {
        const u = r.url();
        if (u.includes('googletagmanager.com') || u.includes('google-analytics.com') ||
            u.includes('pageview.click') || u.includes('ipapi.co') || u.includes('country.is')) {
          return r.abort();
        }
        return r.continue();
      });

      const url = `http://${HOST}:${PORT}${route}`;
      const needles = ASSERTIONS[route] || [];
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        // 子路由借用的 shell 是已预渲染的首页（已含 H1），不能只等 h1，
        // 必须等到「该路由专属标记」出现，确认 React 已路由并渲染目标页。
        if (needles[0]) {
          await page.waitForFunction(
            (n) => (document.body && document.body.innerText.includes(n)) || document.title.includes(n),
            { timeout: 15000 }, needles[0]
          );
        } else {
          await page.waitForSelector('#root h1', { timeout: 15000 });
        }
        // 给 SEOHead 的 useEffect（title/canonical/meta 更新）和图库渲染留时间
        await new Promise((r) => setTimeout(r, 1000));

        const html = '<!doctype html>\n' + (await page.content()).replace(/^<!DOCTYPE html>/i, '');
        const title = await page.title();

        // 内容断言：needles（本页专属 H1/正文）+ root 有实质内容 + 标题非空。
        // 不再要求标题含品牌名——博客文章标题可能不含 "Wiggly Paint"，
        // 而 needles 已强力保证渲染的是正确页面（错页/空壳会因缺 needle 被拦）。
        const missing = needles.filter((n) => !html.includes(n));
        const rootHasContent = /<div id="root">[\s\S]{200,}<\/div>/.test(html);

        if (missing.length || !rootHasContent || !title.trim()) {
          failed++;
          console.warn(`[prerender] ✗ ${route} 断言失败，保留原文件。` +
            ` missing=${JSON.stringify(missing)} rootHasContent=${rootHasContent} title="${title}"`);
          await page.close();
          continue;
        }

        // 写回 dist：'/' → dist/index.html，'/foo/' → dist/foo/index.html
        const outDir = route === '/' ? DIST : path.join(DIST, route);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html);
        ok++;
        console.log(`[prerender] ✓ ${route} (${(html.length / 1024).toFixed(1)} KB) title="${title}"`);
      } catch (err) {
        failed++;
        console.warn(`[prerender] ✗ ${route} 渲染异常，保留原文件：${err.message}`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`[prerender] 完成：成功 ${ok} / 失败 ${failed} / 共 ${ROUTES.length}`);
  // 注意：即使有失败也以 0 退出，避免阻断部署（降级为 CSR 产物）
}

main().catch((err) => {
  console.warn('[prerender] 顶层异常，跳过预渲染（保留 CSR 产物）：', err.message);
  process.exit(0);
});
