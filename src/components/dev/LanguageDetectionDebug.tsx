import React, { useState } from 'react';
import { useLanguageDetection, clearLanguageSuggestionDismissals } from '../../hooks/useLanguageDetection';
import { useLanguageRouter } from '../../hooks/useLanguageRouter';
import { useLocation } from 'react-router-dom';

// 仅在开发环境下显示的调试工具
const LanguageDetectionDebug: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const detection = useLanguageDetection();
  const { changeLanguage, currentLanguage } = useLanguageRouter();
  const location = useLocation();

  // 模拟不同国家的测试
  const simulateCountry = (country: string) => {
    // 这里可以通过修改 localStorage 来模拟不同的地理位置
    localStorage.setItem('debug-simulated-country', country);
    window.location.reload();
  };

  // 直接测试语言切换
  const testLanguageSwitch = (language: string) => {
    changeLanguage(language as any);
  };

  const clearSimulation = () => {
    localStorage.removeItem('debug-simulated-country');
    clearLanguageSuggestionDismissals();
    window.location.reload();
  };

  // 只在开发环境显示
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className={`bg-gray-900 text-white rounded-lg shadow-lg transition-all duration-300 ${
        isExpanded ? 'w-80 p-4' : 'w-12 h-12 p-2'
      }`}>
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full h-full flex items-center justify-center text-green-400 hover:text-green-300"
            title="打开语言检测调试工具"
          >
            🔧
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-green-400">语言检测调试</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-gray-800 p-2 rounded">
                <div className="font-medium text-green-300 mb-1">检测结果:</div>
                <div>建议语言: {detection.suggestedLanguage || '无'}</div>
                <div>置信度: {Math.round(detection.confidence * 100)}%</div>
                <div>用户国家: {detection.userCountry || '未知'}</div>
                <div>浏览器语言: {detection.browserLanguage}</div>
                <div>显示建议: {detection.shouldShowSuggestion ? '是' : '否'}</div>
              </div>

              <div className="bg-gray-800 p-2 rounded">
                <div className="font-medium text-blue-300 mb-1">当前状态:</div>
                <div>当前语言: {currentLanguage}</div>
                <div>当前路径: {location.pathname}</div>
              </div>

              <div className="bg-gray-800 p-2 rounded">
                <div className="font-medium text-blue-300 mb-2">模拟测试:</div>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => simulateCountry('KR')}
                    className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                  >
                    🇰🇷 韩国
                  </button>
                  <button
                    onClick={() => simulateCountry('JP')}
                    className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                  >
                    🇯🇵 日本
                  </button>
                  <button
                    onClick={() => simulateCountry('CN')}
                    className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                  >
                    🇨🇳 中国
                  </button>
                  <button
                    onClick={() => simulateCountry('TH')}
                    className="bg-orange-600 hover:bg-orange-700 px-2 py-1 rounded text-xs"
                  >
                    🇹🇭 泰国
                  </button>
                  <button
                    onClick={() => simulateCountry('US')}
                    className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
                  >
                    🇺🇸 美国
                  </button>
                  <button
                    onClick={() => simulateCountry('FR')}
                    className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded text-xs"
                  >
                    🇫🇷 法国
                  </button>
                </div>
                <button
                  onClick={clearSimulation}
                  className="w-full mt-2 bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded text-xs"
                >
                  清除模拟 & 重置
                </button>
              </div>

              <div className="bg-gray-800 p-2 rounded">
                <div className="font-medium text-purple-300 mb-2">直接切换语言:</div>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => testLanguageSwitch('ko')}
                    className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded text-xs"
                  >
                    🇰🇷 한국어
                  </button>
                  <button
                    onClick={() => testLanguageSwitch('ja')}
                    className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded text-xs"
                  >
                    🇯🇵 日本語
                  </button>
                  <button
                    onClick={() => testLanguageSwitch('zh')}
                    className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded text-xs"
                  >
                    🇨🇳 中文
                  </button>
                  <button
                    onClick={() => testLanguageSwitch('en')}
                    className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded text-xs"
                  >
                    🇺🇸 English
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 p-2 rounded">
                <div className="font-medium text-yellow-300 mb-1">推荐逻辑:</div>
                <div className="text-gray-300 text-xs">
                  • 🇰🇷 韩国：90% 推荐韩语<br />
                  • 🇯🇵 日本：85% 推荐日语<br />
                  • 🇨🇳 中国/台湾/香港：80% 推荐中文<br />
                  • 🇹🇭 泰国/🇺🇸 美国/🇫🇷 法国等：60% 推荐英语<br />
                  • 7天内忽略的建议不会再显示
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageDetectionDebug;