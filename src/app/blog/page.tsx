import React from 'react';
import { db } from '@/lib/db';
import BlogList from '@/components/BlogList';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function BlogPage() {
  // Fetch all blogs from local db on the server
  const allBlogs = db.getBlogs();

  return (
    <div className={styles.wrapper}>
      {/* Page Header */}
      <section className={styles.headerBanner} style={{ backgroundImage: `linear-gradient(to right, rgba(10, 35, 66, 0.9), rgba(9, 11, 14, 0.95)), url('/images/hero_bg.png')` }}>
        <div className="container">
          <span className={styles.subtitle}>Bharti News & Alerts</span>
          <h1 className={styles.title}>Blog & Academy Updates</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Recruitment Notifications</span>
            <h2 className="section-title">Latest Updates</h2>
          </div>
          <BlogList initialBlogs={allBlogs} />
        </div>
      </section>
    </div>
  );
}
