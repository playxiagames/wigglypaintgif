// 简化的GIF数据结构
export interface SimpleGifItem {
  id: string;
  fileName: string; // 如: "1.gif"
  imageUrl: string; // 完整URL
  fileSize?: number; // 可选，字节数
  dimensions?: {
    width: number;
    height: number;
  };
}

// 生成简化的GIF数据的工具函数
export const generateSimpleGifData = (totalCount: number = 290): SimpleGifItem[] => {
  const baseUrl = "https://gifs.wigglypaintgif.com/gifs";

  return Array.from({ length: totalCount }, (_, index) => {
    const id = (totalCount - index).toString(); // 从大到小倒序
    return {
      id,
      fileName: `${id.padStart(3, '0')}.gif`, // 更新文件名格式
      imageUrl: `${baseUrl}/${id.padStart(3, '0')}.gif`,
      // 默认估算的文件大小和尺寸
      fileSize: 200000 + Math.random() * 300000, // 200KB-500KB 随机
      dimensions: {
        width: 512,
        height: 342
      }
    };
  });
};