import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getHrefLangLinks, extractLanguageFromPath, buildLanguagePath } from '../../utils/languageUtils';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  includeHrefLang?: boolean; // 是否包含hreflang标签
  schema?: Record<string, unknown> | Record<string, unknown>[]; // 本页专属 JSON-LD（如 BreadcrumbList、BlogPosting）
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  type = 'website',
  includeHrefLang = true,
  schema
}) => {
  const location = useLocation();
  const baseUrl = 'https://wigglypaintgif.com';
  // 序列化一次，作为 effect 依赖，避免 Gallery 等带状态的页面每次渲染都重建脚本
  const schemaJson = schema ? JSON.stringify(schema) : '';

  // 从当前路径提取语言信息
  const { language } = extractLanguageFromPath(location.pathname);

  // 生成正确的带语言前缀的canonical URL
  // 如果提供的canonical是相对路径，就用当前语言重新构建完整URL
  const languageCanonical = buildLanguagePath(canonical, language);
  const fullCanonical = `${baseUrl}${languageCanonical}`;
  const finalOgImage = ogImage || `${baseUrl}/og-image.png`;
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update canonical link
    let canonical_link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical_link) {
      canonical_link = document.createElement('link');
      canonical_link.rel = 'canonical';
      document.head.appendChild(canonical_link);
    }
    canonical_link.href = fullCanonical;

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'Wiggly Paint GIF Creator');

    // Open Graph tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullCanonical, true);
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:image', finalOgImage, true);
    updateMetaTag('og:site_name', 'Wiggly Paint GIF Creator', true);

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', fullCanonical, true);
    updateMetaTag('twitter:title', ogTitle || title, true);
    updateMetaTag('twitter:description', ogDescription || description, true);
    updateMetaTag('twitter:image', finalOgImage, true);

    // Hreflang tags
    if (includeHrefLang) {
      // 移除现有的hreflang标签
      const existingHrefLangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingHrefLangs.forEach(link => link.remove());

      try {
        // 生成新的hreflang标签
        const hrefLangLinks = getHrefLangLinks(location.pathname);
        
        hrefLangLinks.forEach(({ lang, href }) => {
          const hrefLangLink = document.createElement('link');
          hrefLangLink.rel = 'alternate';
          hrefLangLink.hreflang = lang;
          hrefLangLink.href = href;
          document.head.appendChild(hrefLangLink);
        });

        // 添加x-default标签，指向英语版本
        const xDefaultLink = document.createElement('link');
        xDefaultLink.rel = 'alternate';
        xDefaultLink.hreflang = 'x-default';
        xDefaultLink.href = `${baseUrl}/`;
        document.head.appendChild(xDefaultLink);
        
      } catch (error) {
        console.warn('无法生成hreflang标签:', error);
      }
    }

    // JSON-LD 结构化数据：
    // 子页面会从首页 shell 继承写死的 WebApplication（id=schema-webapp），
    // 但它语义上只属于首页，因此非首页时移除它，并注入本页专属 schema。
    const isHome = location.pathname === '/' || location.pathname === '';
    if (!isHome) {
      document.getElementById('schema-webapp')?.remove();
    }
    document.getElementById('schema-page')?.remove();
    if (schemaJson) {
      const ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = 'schema-page';
      ld.textContent = schemaJson;
      document.head.appendChild(ld);
    }

  }, [title, description, fullCanonical, ogTitle, ogDescription, finalOgImage, type, includeHrefLang, location.pathname, schemaJson]);

  return null;
};

export default SEOHead;