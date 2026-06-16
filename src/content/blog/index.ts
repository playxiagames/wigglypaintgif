/**
 * 博客内容入口。
 *
 * 文章正文是「数据」而非「代码」：全部存放在 posts.json（单一数据源），
 * 应用、sitemap 生成、预渲染脚本都从它派生 —— 新增文章只需改 posts.json。
 */
import postsData from './posts.json';

export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string; // <title> 用，含品牌后缀
  h1: string; // 页面 H1
  description: string; // meta description
  date: string; // ISO 日期
  excerpt: string; // 列表页摘要
  sections: BlogSection[];
}

export const posts: BlogPost[] = postsData as BlogPost[];

export const getPost = (slug?: string): BlogPost | undefined =>
  posts.find((p) => p.slug === slug);
