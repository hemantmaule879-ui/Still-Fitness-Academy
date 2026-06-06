import React from 'react';
import CoursesList from '@/components/CoursesList';
import styles from './page.module.css';

export default function CoursesPage() {
  return (
    <div className={styles.wrapper}>
      {/* Page Header */}
      <section className={styles.headerBanner} style={{ backgroundImage: `linear-gradient(to right, rgba(10, 35, 66, 0.9), rgba(9, 11, 14, 0.95)), url('/images/hero_bg.png')` }}>
        <div className="container">
          <span className={styles.subtitle}>Our Training Programs</span>
          <h1 className={styles.title}>Defence & Police Coaching</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Eligibility & Syllabus</span>
            <h2 className="section-title">Explore Course Details</h2>
          </div>
          <CoursesList />
        </div>
      </section>
    </div>
  );
}
