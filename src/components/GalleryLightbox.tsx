'use client';

import React, { useState } from 'react';
import styles from './GalleryLightbox.module.css';

interface GalleryItem {
  id: string;
  category: string;
  imageUrl: string;
  caption: string;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
}

export default function GalleryLightbox({ items }: GalleryLightboxProps) {
  const [index, setIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => {
    setIndex(idx);
  };

  const closeLightbox = () => {
    setIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === null) return;
    setIndex((index + 1) % items.length);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === null) return;
    setIndex((index - 1 + items.length) % items.length);
  };

  if (items.length === 0) {
    return (
      <div className={styles.noImages}>
        <p>No images found in this category.</p>
      </div>
    );
  }

  return (
    <>
      {/* Grid Display */}
      <div className={styles.grid}>
        {items.map((item, idx) => (
          <div key={item.id} className={styles.card} onClick={() => openLightbox(idx)}>
            <div className={styles.imgWrapper}>
              <img src={item.imageUrl} alt={item.caption} className={styles.img} />
              <div className={styles.overlay}>
                <span className={styles.zoomIcon}>🔍</span>
                <p className={styles.cardCaption}>{item.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {index !== null && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Close Lightbox">×</button>
          
          <button className={`${styles.navBtn} ${styles.prev}`} onClick={showPrev} aria-label="Previous Image">
            ‹
          </button>
          
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            <img 
              src={items[index].imageUrl} 
              alt={items[index].caption} 
              className={`${styles.lightboxImg} animate-fade-in`} 
            />
            <div className={styles.captionBar}>
              <span className={styles.counter}>{index + 1} / {items.length}</span>
              <p className={styles.lightboxCaption}>{items[index].caption}</p>
            </div>
          </div>
          
          <button className={`${styles.navBtn} ${styles.next}`} onClick={showNext} aria-label="Next Image">
            ›
          </button>
        </div>
      )}
    </>
  );
}
