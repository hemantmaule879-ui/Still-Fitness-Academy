'use client';

import React, { useState } from 'react';
import GalleryLightbox from './GalleryLightbox';
import styles from './GalleryList.module.css';

interface GalleryItem {
  id: string;
  category: 'ground' | 'classroom' | 'celebrations' | 'events' | 'seminars';
  imageUrl: string;
  caption: string;
  createdAt: string;
}

interface GalleryListProps {
  initialItems: GalleryItem[];
}

export default function GalleryList({ initialItems }: GalleryListProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<'all' | 'ground' | 'classroom' | 'celebrations' | 'events' | 'seminars'>('all');

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'ground', label: 'Ground Training' },
    { value: 'classroom', label: 'Classroom' },
    { value: 'celebrations', label: 'Selections' },
    { value: 'events', label: 'Academy Events' },
    { value: 'seminars', label: 'Seminars' }
  ];

  const filteredItems = activeTab === 'all'
    ? items
    : items.filter(item => item.category === activeTab);

  return (
    <div className={styles.container}>
      {/* Category Tabs */}
      <div className={styles.tabs}>
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`${styles.tabBtn} ${activeTab === cat.value ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(cat.value as any)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lightbox Photo Grid */}
      <GalleryLightbox items={filteredItems} />
    </div>
  );
}
