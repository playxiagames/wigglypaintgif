import React, { useState, useEffect, useRef } from 'react';
import { SimpleGifItem } from '../../types/simple';

interface SimpleGalleryGridProps {
  items: SimpleGifItem[];
  className?: string;
  onDownload?: (item: SimpleGifItem) => void;
}

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative bg-gray-100 ${className}`}>
      {isInView && !hasError && (
        <>
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </>
      )}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
          <div className="text-xl mb-1">🖼️</div>
          <span className="text-xs">Failed to load</span>
        </div>
      )}
    </div>
  );
};

const SimpleGalleryCard: React.FC<{ item: SimpleGifItem; onDownload?: (item: SimpleGifItem) => void }> = ({ 
  item, 
  onDownload 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // CDN 已配置强制下载，直接创建链接即可
    const a = document.createElement('a');
    a.href = item.imageUrl;
    a.download = item.fileName;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // 记录下载统计
    onDownload?.(item);
    
    // 重置下载状态
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  // const formatFileSize = (bytes?: number) => {
  //   if (!bytes) return 'Unknown size';
  //   if (bytes === 0) return '0 B';
  //   const k = 1024;
  //   const sizes = ['B', 'KB', 'MB', 'GB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  // };

  return (
    <div
      className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <LazyImage
          src={item.imageUrl}
          alt={item.fileName}
          className="w-full h-48 rounded-t-lg"
        />
        
        {(isHovered || isDownloading) && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transform transition-all duration-200 ${
                isDownloading 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
              } text-white`}
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Downloading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* <div className="p-3">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm">
          {item.fileName}
        </h3>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{formatFileSize(item.fileSize)}</span>
          <span>
            {item.dimensions ? `${item.dimensions.width}×${item.dimensions.height}` : '512×342'}
          </span>
        </div>
      </div> */}

    </div>
  );
};

const SimpleGalleryGrid: React.FC<SimpleGalleryGridProps> = ({ items, className = '', onDownload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 36; // 每页显示36个
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`w-full ${className}`}>
      {/* 页面信息 */}
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, items.length)} of {items.length} GIFs
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* 图片网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 mb-8">
        {currentItems.map((item) => (
          <SimpleGalleryCard key={item.id} item={item} onDownload={onDownload} />
        ))}
      </div>

      {/* 分页控件 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {/* 上一页 */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
          >
            Previous
          </button>

          {/* 页码 */}
          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
            let pageNum;
            if (totalPages <= 10) {
              pageNum = i + 1;
            } else if (currentPage <= 5) {
              pageNum = i + 1;
            } else if (currentPage > totalPages - 5) {
              pageNum = totalPages - 9 + i;
            } else {
              pageNum = currentPage - 4 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-3 py-2 text-sm rounded-md ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* 下一页 */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SimpleGalleryGrid;