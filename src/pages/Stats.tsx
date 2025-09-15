import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/common/SEOHead';
import { useSimpleGallery } from '../hooks/useSimpleGallery';

const Stats: React.FC = () => {
  const { t } = useTranslation();
  const { getPopularDownloads, getTotalDownloads, totalItems } = useSimpleGallery(250);
  
  const popularGifs = getPopularDownloads(20); // 显示前20名
  const totalDownloads = getTotalDownloads();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t('stats.title')}
        description={t('stats.description')}
        canonical="/stats/"
        ogTitle={t('stats.title')}
        ogDescription={t('stats.description')}
        type="website"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('stats.title')}
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            {t('stats.subtitle')}
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{totalItems}</div>
            <div className="text-gray-600">Total GIFs</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{totalDownloads}</div>
            <div className="text-gray-600">Total Downloads</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{popularGifs.length}</div>
            <div className="text-gray-600">GIFs Downloaded</div>
          </div>
        </div>

        {/* Popular Downloads */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              🏆 Most Popular Downloads
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Ranked by number of downloads
            </p>
          </div>

          {popularGifs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preview
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Downloads
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Downloaded
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {popularGifs.map((entry, index) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 
                            index === 2 ? 'bg-yellow-600' : 
                            'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={entry.item?.imageUrl}
                            alt={entry.item?.fileName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {entry.item?.fileName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {entry.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-semibold text-blue-600">
                          {entry.count}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(entry.lastDownload)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a
                          href={entry.item?.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View
                        </a>
                        <a
                          href={entry.item?.imageUrl}
                          download={entry.item?.fileName}
                          className="text-green-600 hover:text-green-900"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 text-4xl mb-4">📈</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No downloads yet</h3>
              <p className="text-gray-500">
                Download statistics will appear here once users start downloading GIFs.
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>📝 Note:</strong> This statistics page shows local download data stored in your browser. 
                For comprehensive analytics across all users, integrate with Google Analytics and check your GA dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;