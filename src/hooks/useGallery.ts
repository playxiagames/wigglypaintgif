import { useState, useEffect, useMemo } from 'react';
import { GalleryItem } from '../types';
import galleryData from '../data/gallery.json';

export const useGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [items] = useState<GalleryItem[]>(galleryData);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(items.map(item => item.category)));
    return ['all', ...uniqueCategories];
  }, [items]);

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    return filtered;
  }, [items, searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return {
    items: filteredItems,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    totalItems: items.length,
    filteredCount: filteredItems.length,
    hasFilters: searchTerm.trim() !== '' || selectedCategory !== 'all',
    clearFilters
  };
};