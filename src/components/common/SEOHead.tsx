import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getHrefLangLinks } from '../../utils/languageUtils';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  includeHrefLang?: boolean; // 是否包含hreflang标签
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  type = 'website',
  includeHrefLang = true
}) => {
  const location = useLocation();
  const baseUrl = 'https://wigglypaintgif.com';
  const fullCanonical = `${baseUrl}${canonical}`;
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
    updateMetaTag('author', 'WigglyPaint GIF Creator');

    // Open Graph tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullCanonical, true);
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:image', finalOgImage, true);
    updateMetaTag('og:site_name', 'WigglyPaint GIF Creator', true);

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

  }, [title, description, fullCanonical, ogTitle, ogDescription, finalOgImage, type, includeHrefLang, location.pathname]);

  return null;
};

export default SEOHead;