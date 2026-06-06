import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import HomeCtas from '@/components/HomeCtas';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import LeadForm from '@/components/LeadForm';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  // Fetch dynamic content on the server
  const latestBlogs = db.getBlogs().slice(0, 3);
  const successStudents = db.getResults().slice(0, 3);
  const galleryItems = db.getGallery().slice(0, 4);

  const stats = [
    { number: '5000+', label: 'Students Trained', icon: '🎓' },
    { number: '1000+', label: 'Govt Selections', icon: '🎖️' },
    { number: '10+', label: 'Years Experience', icon: '⭐' },
    { number: '20+', label: 'Expert Trainers', icon: '💪' }
  ];

  const coreCourses = [
    {
      id: 'army',
      title: 'Indian Army Preparation',
      desc: 'Rigorous coaching for CEE written exams and complete guidance on obstacle training, physical rallies, and medical standards.',
      bullets: ['1600m Running Drills', 'Written Common Entrance Prep', 'Medical Mock Inspections']
    },
    {
      id: 'police',
      title: 'Police Bharti Training',
      desc: 'Tailored physical coaching (1600m, 100m, Shot Put) and specialized academy lectures covering Marathi grammar and arithmetic.',
      bullets: ['Focused Physical Marks Prep', 'Marathi Grammar Classes', 'Regular OMR Mock Tests']
    },
    {
      id: 'psi',
      title: 'PSI Preparation',
      desc: 'Expert coaching for Police Sub-Inspector mains & prelims exams, physical endurance parameters, and personal interview bootcamps.',
      bullets: ['Prelims & Mains Lectures', 'Law & General Studies Notes', 'Interview Panel Mockups']
    },
    {
      id: 'ssc',
      title: 'SSC GD Coaching',
      desc: 'Comprehensive study courses for Staff Selection Commission General Duty examinations plus mandatory CAPF physical standards preparation.',
      bullets: ['CBT Exam Preparation', 'CAPF Physical Efficiency Test', 'hostel Study Environment']
    }
  ];

  return (
    <div className={styles.wrapper}>
      {/* 1. HERO SECTION */}
      <section className={styles.hero} style={{ backgroundImage: `linear-gradient(to bottom, rgba(10, 35, 66, 0.8), rgba(9, 11, 14, 0.95)), url('/images/hero_bg.png')` }}>
        <div className={`${styles.heroContainer} container`}>
          <div className={styles.heroContent}>
            <span className={styles.patrioticTag}>Jai Hind • Serving the Nation</span>
            <h1 className={`${styles.heroTitle} animate-fade-in`}>
              Transform Your <span className="text-saffron">Dream</span> Into a <span className="text-green">Uniform</span>
            </h1>
            <p className={styles.heroSubheadline}>
              India's Premier Academy for Army, Police, PSI, SSC, CDS, CAPF, CPO & SSB Preparation. Complete physical ground training and classroom coaching under one roof.
            </p>
            <HomeCtas className={styles.heroButtons} />
          </div>
        </div>
      </section>

      {/* 2. STATISTICS SECTION */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <div key={idx} className={`${styles.statCard} glass-panel`}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COURSES OVERVIEW SECTION */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Start Your Journey</span>
            <h2 className="section-title">Our Specialized Programs</h2>
          </div>

          <div className="grid-2">
            {coreCourses.map((course) => (
              <div key={course.id} className={`${styles.courseCard} glass-panel`}>
                <div className={styles.courseHeader}>
                  <h3>{course.title}</h3>
                  <span className={styles.courseBadge}>Bharti 2026</span>
                </div>
                <p>{course.desc}</p>
                <ul className={styles.courseBullets}>
                  {course.bullets.map((b, i) => (
                    <li key={i}>✓ {b}</li>
                  ))}
                </ul>
                <div className={styles.courseFooter}>
                  <Link href={`/courses#${course.id}`} className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                    View Syllabus & Criteria
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href="/courses" className="btn btn-primary">
              Explore All 8 Courses
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SUCCESS STORIES SECTION */}
      <section className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Our Pride</span>
            <h2 className="section-title">Success Stories & Selections</h2>
          </div>

          <div className="grid-3">
            {successStudents.map((student) => (
              <div key={student.id} className={styles.studentCard}>
                <div className={styles.studentImgWrapper}>
                  <img src={student.imageUrl} alt={student.studentName} className={styles.studentImg} />
                  <div className={styles.rankBadge}>{student.rankPosition}</div>
                </div>
                <div className={styles.studentContent}>
                  <h3>{student.studentName}</h3>
                  <span className={styles.studentExam}>{student.examQualified}</span>
                  <div className={styles.studentStory}>
                    <p><strong>Before:</strong> {student.beforeStory}</p>
                    <p style={{ marginTop: '0.5rem' }}><strong>After:</strong> {student.afterStory}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href="/results" className="btn btn-secondary">
              View All Qualified Cadets
            </Link>
          </div>
        </div>
      </section>

      {/* 5. STUDENT TESTIMONIALS */}
      <section className="section" style={{ background: 'linear-gradient(to bottom, rgba(9, 11, 14, 0.9), rgba(10, 35, 66, 0.3))' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Aspirants Voice</span>
            <h2 className="section-title">What Our Students Say</h2>
          </div>
          <TestimonialsSlider />
        </div>
      </section>

      {/* 6. GALLERY PREVIEW */}
      <section className="section" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Training Ground Sneak Peek</span>
            <h2 className="section-title">Academy in Action</h2>
          </div>

          <div className="grid-4">
            {galleryItems.map((item) => (
              <div key={item.id} className={styles.galleryCard}>
                <img src={item.imageUrl} alt={item.caption} className={styles.galleryImg} />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryTag}>{item.category}</span>
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href="/gallery" className="btn btn-primary">
              View Full Lightbox Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 7. LATEST UPDATES / BLOGS */}
      <section className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Bharti Alerts</span>
            <h2 className="section-title">Latest Updates & Notices</h2>
          </div>

          <div className="grid-3">
            {latestBlogs.map((blog) => (
              <div key={blog.id} className={`${styles.blogCard} glass-panel`}>
                <div className={styles.blogImgContainer}>
                  <img src={blog.imageUrl} alt={blog.title} className={styles.blogImg} />
                  <span className={styles.blogCategoryBadge}>{blog.category}</span>
                </div>
                <div className={styles.blogInfo}>
                  <span className={styles.blogDate}>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <h3>{blog.title}</h3>
                  <p>{blog.summary}</p>
                  <Link href={`/blog/${blog.id}`} className={styles.readMoreLink}>
                    Read Full Notice →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href="/blog" className="btn btn-secondary">
              Search All Recruitment News
            </Link>
          </div>
        </div>
      </section>

      {/* 8. REGISTRATION FORM SECTION */}
      <section className="section" style={{ background: 'linear-gradient(to bottom, rgba(9, 11, 14, 0.95), rgba(75, 83, 32, 0.2))', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="section-title-wrapper" style={{ marginBottom: '2.5rem' }}>
            <span className="section-subtitle">Enroll Today</span>
            <h2 className="section-title">Free Mock Class Registration</h2>
          </div>
          <LeadForm />
        </div>
      </section>
    </div>
  );
}
