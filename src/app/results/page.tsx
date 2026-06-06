import React from 'react';
import { db } from '@/lib/db';
import ResultsList from '@/components/ResultsList';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function ResultsPage() {
  // Fetch results dynamically on the server
  const allResults = db.getResults();

  const successCounts = [
    { count: '1000+', label: 'Total Selections', color: 'saffron' },
    { count: '500+', label: 'Indian Army GD/Tech', color: 'green' },
    { count: '350+', label: 'Police Constables', color: 'blue' },
    { count: '50+', label: 'PSI & Officer ranks', color: 'white' }
  ];

  const videos = [
    {
      title: 'How I cleared Police Physicals - Sachin Kadam',
      duration: '4m 32s',
      thumb: '/images/ground_training_1.png'
    },
    {
      title: 'My SSB recommendation journey - Capt. Harsh Vardhan',
      duration: '7m 15s',
      thumb: '/images/cadet_uniform_1.png'
    },
    {
      title: 'Written Exam Strategy for PSI - Sneha Patil',
      duration: '5m 48s',
      thumb: '/images/classroom_training_1.png'
    }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Page Header */}
      <section className={styles.headerBanner} style={{ backgroundImage: `linear-gradient(to right, rgba(10, 35, 66, 0.9), rgba(9, 11, 14, 0.95)), url('/images/hero_bg.png')` }}>
        <div className="container">
          <span className={styles.subtitle}>Selected Candidates</span>
          <h1 className={styles.title}>Results & Success Stories</h1>
        </div>
      </section>

      {/* Success Counter Section */}
      <section className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className={styles.counterGrid}>
            {successCounts.map((item, idx) => (
              <div key={idx} className={`${styles.counterCard} glass-panel`}>
                <div className={`${styles.count} text-${item.color}`}>{item.count}</div>
                <div className={styles.countLabel}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Students Gallery */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">The Hall of Fame</span>
            <h2 className="section-title">Selected Cadets</h2>
          </div>
          <ResultsList initialResults={allResults} />
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Vlog Stories</span>
            <h2 className="section-title">Video Testimonials</h2>
          </div>

          <div className="grid-3">
            {videos.map((vid, idx) => (
              <div key={idx} className={styles.videoCard}>
                <div className={styles.videoThumbWrapper}>
                  <img src={vid.thumb} alt={vid.title} className={styles.videoThumb} />
                  <div className={styles.playOverlay}>
                    <div className={styles.playBtn}>▶</div>
                  </div>
                  <span className={styles.durationBadge}>{vid.duration}</span>
                </div>
                <div className={styles.videoInfo}>
                  <h3>{vid.title}</h3>
                  <p>Watch full video interview about their selection strategy.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
