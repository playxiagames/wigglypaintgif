import { useState, useMemo } from 'react';
import { SimpleGifItem, generateSimpleGifData } from '../types/simple';
import { trackDownloadEvent, getUserId } from '../utils/analytics';

// 下载统计接口
interface DownloadStats {
  [gifId: string]: {
    count: number;
    lastDownload: string;
  };
}

export const useSimpleGallery = (totalGifs: number = 250) => {
  // 生成GIF数据
  const items = useMemo(() => generateSimpleGifData(totalGifs), [totalGifs]);
  
  // 下载统计（存储在localStorage）
  const [downloadStats, setDownloadStats] = useState<DownloadStats>(() => {
    try {
      const stored = localStorage.getItem('wiggly-paint-download-stats');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // 记录下载统计
  const trackDownload = (item: SimpleGifItem) => {
    const now = new Date().toISOString();
    const userId = getUserId();
    
    const newStats = {
      ...downloadStats,
      [item.id]: {
        count: (downloadStats[item.id]?.count || 0) + 1,
        lastDownload: now,
      }
    };
    
    setDownloadStats(newStats);
    
    // 保存到localStorage
    try {
      localStorage.setItem('wiggly-paint-download-stats', JSON.stringify(newStats));
    } catch (error) {
      console.error('Failed to save download stats:', error);
    }

    // Google Analytics事件跟踪
    trackDownloadEvent(item.id, item.fileName);
    
    console.log(`Download tracked: ${item.fileName} (User: ${userId})`);
  };

  // 获取热门下载
  const getPopularDownloads = (limit: number = 10) => {
    return Object.entries(downloadStats)
      .map(([id, stats]) => ({
        id,
        count: stats.count,
        lastDownload: stats.lastDownload,
        item: items.find(item => item.id === id)
      }))
      .filter(entry => entry.item)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  };

  // 获取总下载次数
  const getTotalDownloads = () => {
    return Object.values(downloadStats).reduce((total, stat) => total + stat.count, 0);
  };

  return {
    items,
    downloadStats,
    trackDownload,
    getPopularDownloads,
    getTotalDownloads,
    totalItems: items.length,
  };
};