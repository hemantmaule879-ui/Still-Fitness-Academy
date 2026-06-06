import React from 'react';
import { db } from '@/lib/db';
import GalleryLightbox from '@/components/GalleryLightbox';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function ClassroomTrainingPage() {
  // Fetch classroom training photos
  const classroomPhotos = db.getGallery().filter(item => item.category === 'classroom');

  const classroomFeatures = [
    {
      title: 'Daily Lectures',
      desc: '3 to 4 hours of daily intense classroom sessions explaining key concepts in Marathi Grammar, Math shortcuts, English, and GK.',
      icon: '👨‍🏫'
    },
    {
      title: 'Mock Tests (OMR & CBT)',
      desc: 'Weekly offline OMR-based examinations simulating state police recruitment and computer-based online test setups mimicking SSC/CDS environments.',
      icon: '📝'
    },
    {
      title: 'Study Material',
      desc: 'Comprehensive printed books, topic worksheets, GK reference notes, and exam answer-key booklets customized by our experienced faculty.',
      icon: '📚'
    },
    {
      title: 'Doubt Solving Sessions',
      desc: 'Post-lecture one-on-one personal interactions with instructors to resolve difficult problems and clarify conceptual queries.',
      icon: '❓'
    },
    {
      title: 'Current Affairs Digest',
      desc: 'Daily blackboard updates on national/international news and weekly current affairs sheets focusing specifically on Indian defense events.',
      icon: '📰'
    },
    {
      title: 'Online Test Series',
      desc: 'Full-access credentials to our online student exam portal, allowing practice on thousands of exam questions from the hostel library.',
      icon: '💻'
    }
  ];

  const academicSchedule = [
    { time: '09:30 AM - 10:00 AM', subject: 'Current Affairs & Daily Defence News Briefing' },
    { time: '10:00 AM - 11:30 AM', subject: 'Mathematics: Quantitative aptitude & calculation shortcuts' },
    { time: '11:30 AM - 01:00 PM', subject: 'Logical Reasoning & Intellectual Ability lectures' },
    { time: '01:00 PM - 02:00 PM', subject: 'Lunch Break & Relax' },
    { time: '02:00 PM - 03:30 PM', subject: 'General Knowledge (Science/History/Polity) OR Marathi Grammar' },
    { time: '03:30 PM - 04:30 PM', subject: 'One-on-One Doubt Clearance & Silent Library Study Hour' }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Page Header */}
      <section className={styles.headerBanner} style={{ backgroundImage: `linear-gradient(to right, rgba(10, 35, 66, 0.9), rgba(9, 11, 14, 0.95)), url('/images/hero_bg.png')` }}>
        <div className="container">
          <span className={styles.subtitle}>Academic Coaching</span>
          <h1 className={styles.title}>Classroom Training</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">Academic Core</span>
              <h2 className="section-title">Classroom Excellence</h2>
              <p className={styles.introText}>
                While physical strength qualifies you on the field, academic score determines your position in the final merit selection list. Still Fitness Academy provides high-discipline classroom coaching to help you master competitive subjects.
              </p>
              <p className={styles.introText} style={{ marginTop: '1rem' }}>
                Our classes feature digital displays, conceptual simplification guides, daily practice problems, and an environment of focused study. We monitor each student's progress report card and adjust coaching routines accordingly.
              </p>
            </div>
            <div>
              <img src="/images/classroom_training_1.png" alt="Aspirants inside classroom" className={styles.introImg} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">The Study Features</span>
            <h2 className="section-title">Academic Highlights</h2>
          </div>

          <div className="grid-3">
            {classroomFeatures.map((feat, idx) => (
              <div key={idx} className={`${styles.featCard} glass-panel`}>
                <div className={styles.featIcon}>{feat.icon}</div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Table */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Timings</span>
            <h2 className="section-title">Daily Classroom Schedule</h2>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.scheduleTable}>
              <thead>
                <tr>
                  <th>Time Slot</th>
                  <th>Coaching / Subject Description</th>
                </tr>
              </thead>
              <tbody>
                {academicSchedule.map((row, idx) => (
                  <tr key={idx}>
                    <td className={styles.timeCol}>{row.time}</td>
                    <td className={styles.activityCol}>{row.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Classroom Gallery */}
      <section className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Study Environment</span>
            <h2 className="section-title">Classroom Gallery</h2>
          </div>
          <GalleryLightbox items={classroomPhotos} />
        </div>
      </section>
    </div>
  );
}
