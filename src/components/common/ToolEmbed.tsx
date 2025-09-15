import React, { useState, useEffect, useRef } from 'react';

interface ToolEmbedProps {
  src?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  allowFullscreen?: boolean;
  sandbox?: string;
  className?: string;
  loadingTimeout?: number;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

const ToolEmbed: React.FC<ToolEmbedProps> = ({
  src = "https://gifs.wigglypaintgif.com/WigglyPaint.html",
  title = "WigglyPaint Tool",
  width = "100%",
  height = "600px",
  allowFullscreen = true,
  sandbox = "allow-scripts allow-same-origin allow-forms allow-popups allow-presentation",
  className = "",
  loadingTimeout = 10000,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    setErrorMessage("");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    onLoad?.();
  };

  const handleError = (error: string) => {
    setIsLoading(false);
    setHasError(true);
    setErrorMessage(error);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onError?.(error);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage("");
    setRetryCount(prev => prev + 1);
    
    if (iframeRef.current) {
      iframeRef.current.src = src;
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      timeoutRef.current = window.setTimeout(() => {
        handleError("Loading timeout - the external tool may be unavailable");
      }, loadingTimeout);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading, loadingTimeout, retryCount]);

  const openInNewTab = () => {
    window.open(src, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''} ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
          {src && (
            <button
              onClick={openInNewTab}
              className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {hasError && (
            <button
              onClick={handleRetry}
              className="px-2 py-1 text-xs bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-1"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retry
            </button>
          )}
          
          {allowFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900"
            >
              {isFullscreen ? (
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l6 6m0-6l-6 6" />
                </svg>
              ) : (
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div 
        className={`${isFullscreen ? 'relative' : 'tool-embed-container'}`}
        style={{ 
          height: isFullscreen ? 'calc(100vh - 57px)' : undefined,
          overflow: 'hidden'
        }}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mb-2"></div>
            <p className="text-sm text-gray-600">Loading WigglyPaint tool...</p>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-white">
            <div className="max-w-md text-center">
              <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load tool</h3>
              <p className="text-sm text-gray-600 mb-4">{errorMessage}</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-1"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </button>
                <button
                  onClick={openInNewTab}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center gap-1"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open Direct
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Iframe */}
        {src && (
          <iframe
            ref={iframeRef}
            src={src}
            title={title}
            width={width}
            height={height}
            sandbox={sandbox}
            allowFullScreen={allowFullscreen}
            onLoad={handleLoad}
            onError={() => handleError("Failed to load the WigglyPaint tool")}
            className={`border-0 tool-embed-iframe ${isLoading || hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            style={{
              display: 'block',
              border: 'none',
              outline: 'none'
            }}
          />
        )}

        {/* Mobile Overlay */}
        <div className="absolute bottom-2 right-2 md:hidden">
          <button
            onClick={openInNewTab}
            className="px-3 py-1 bg-gray-900/80 text-white rounded text-xs flex items-center gap-1 shadow-lg"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolEmbed;