import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/common/SEOHead';
import { useSimpleGallery } from '../hooks/useSimpleGallery';
import SimpleGalleryGrid from '../components/gallery/SimpleGalleryGrid';

const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const { items, trackDownload, getTotalDownloads, totalItems } = useSimpleGallery(290);

  const totalDownloads = getTotalDownloads();

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t('gallery.title')}
        description={t('gallery.description')}
        canonical="/gallery/"
        ogTitle={t('gallery.title')}
        ogDescription={t('gallery.description')}
        type="website"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('gallery.title')}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            {t('gallery.subtitle')}
          </p>
          
          {/* 统计信息 */}
          <div className="flex justify-center gap-4 sm:gap-8 text-sm text-gray-500">
            <span>📁 {totalItems} {t('gallery.stats_gifs')}</span>
            {totalDownloads > 0 && (
              <span>📥 {totalDownloads} {t('gallery.stats_downloads')}</span>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        <SimpleGalleryGrid 
          items={items} 
          onDownload={trackDownload}
        />

      </div>
    </div>
  );
};

export default Gallery;