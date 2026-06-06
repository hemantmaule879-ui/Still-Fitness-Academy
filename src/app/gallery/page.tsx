import React from 'react';
import { db } from '@/lib/db';
import GalleryList from '@/components/GalleryList';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function GalleryPage() {
  // Fetch all gallery items from local db on the server
  const allGalleryItems = db.getGallery();

  return (
    <div className={styles.wrapper}>
      {/* Page Header */}
      <section className={styles.headerBanner} style={{ backgroundImage: `linear-gradient(to right, rgba(10, 35, 66, 0.9), rgba(9, 11, 14, 0.95)), url('/images/hero_bg.png')` }}>
        <div className="container">
          <span className={styles.subtitle}>Academy Photos</span>
          <h1 className={styles.title}>Photo Gallery</h1>
        </div>
      </section>

      {/* Gallery Showcase Section */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Moments in Still Academy</span>
            <h2 className="section-title">Life In Uniform Training</h2>
          </div>
          <GalleryList initialItems={allGalleryItems as any} />
        </div>
      </section>
    </div>
  );
}
