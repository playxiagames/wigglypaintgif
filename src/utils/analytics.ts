// Google Analytics 工具函数

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// 初始化 Google Analytics
export const initializeGA = (measurementId: string) => {
  // 添加 GA script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // 初始化 gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  });

  console.log('Google Analytics initialized with ID:', measurementId);
};

// 追踪下载事件
export const trackDownloadEvent = (gifId: string, fileName: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'download', {
      event_category: 'gif_download',
      event_label: fileName,
      gif_id: gifId,
      custom_parameter_1: 'wiggly_paint_gallery'
    });
    
    console.log(`GA Event tracked: download - ${fileName}`);
  } else {
    console.warn('Google Analytics not initialized');
  }
};

// 追踪页面访问
export const trackPageView = (path: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

// 追踪自定义事件
export const trackCustomEvent = (
  eventName: string, 
  parameters: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, parameters);
  }
};

// 获取或设置用户ID（用于统计分析）
export const getUserId = (): string => {
  let userId = localStorage.getItem('wiggly_paint_user_id');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('wiggly_paint_user_id', userId);
  }
  return userId;
};