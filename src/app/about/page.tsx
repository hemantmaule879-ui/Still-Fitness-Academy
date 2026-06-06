import React from 'react';
import styles from './page.module.css';

export default function AboutPage() {
  const missionItems = [
    { title: 'Quality Education', desc: 'Comprehensive syllabus coverage, expert faculty notes, and regular exam simulations.', icon: '📚' },
    { title: 'Physical Excellence', desc: 'Scientific conditioning, endurance drills, and military-standard obstacle course training.', icon: '🏃‍♂️' },
    { title: 'Discipline & Leadership', desc: 'Character building, grooming, and mental toughness needed for uniform careers.', icon: '🫡' },
    { title: 'Career Success', desc: 'Guidance from forms submission to the final selection list, physicals, written & interview.', icon: '🏆' }
  ];

  const timelineEvents = [
    { year: '2015', title: 'Humble Beginnings', desc: 'Started in Pune with just 10 passionate candidates training on local grounds under Captain Still.' },
    { year: '2018', title: 'Dedicated Ground Setup', desc: 'Acquired a specialized outdoor training area equipped with standard army obstacles and a running track.' },
    { year: '2021', title: 'Classroom Integration', desc: 'Launched offline test series, Marathi Grammar bootcamps, and digital classroom study materials.' },
    { year: '2024', title: '1,000 Selections Milestone', desc: 'Proudly crossed 1,000 successful student selections across Maharashtra Police, Agniveer, and BSF.' },
    { year: '2026', title: 'Full Residential Facility', desc: 'Inaugurated full-capacity hostels, library access, and professional defense mock interview panels.' }
  ];

  const features = [
    { title: 'Expert Faculty', desc: 'Classes conducted by senior educators and retired defense personnel who understand the exams.' },
    { title: 'Physical Ground Training', desc: 'Scientific 1600m running strategies, long jump pits, high jump bars, and shot put drills.' },
    { title: 'Classroom Coaching', desc: 'Structured daily lectures, concept builders, current affairs sheets, and customized materials.' },
    { title: 'Mock Tests', desc: 'Weekly OMR-sheet mock exams mimicking real Bharti papers with immediate ranking results.' },
    { title: 'Interview Guidance', desc: 'Special personality grooming and speaking clinics for PSI and CPO exam rounds.' },
    { title: 'SSB Prep', desc: 'Comprehensive GTO tasks practice, psychology testing guidance, and one-on-one reviews.' }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Page Header */}
      <section className={styles.headerBanner} style={{ backgroundImage: `linear-gradient(to right, rgba(10, 35, 66, 0.9), rgba(9, 11, 14, 0.95)), url('/images/hero_bg.png')` }}>
        <div className="container">
          <span className={styles.subtitle}>About Our Academy</span>
          <h1 className={styles.title}>Dedicated to National Service</h1>
        </div>
      </section>

      {/* Institute Intro */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">Who We Are</span>
              <h2 className="section-title">Still Fitness Academy</h2>
              <p className={styles.introText}>
                Still Fitness Academy is India's premier residential coaching institute. Located in Pune, we specialize in grooming competitive aspirants for the Indian Armed Forces (Army, Navy, Air Force) and state police departments.
              </p>
              <p className={styles.introText} style={{ marginTop: '1rem' }}>
                We believe that clearing competitive examinations requires a dual commitment: **academic brilliance** to ace the written computer-based testing, and **extreme physical fitness** to qualify for police and military field standards. Our integrated training program provides both under one roof.
              </p>
            </div>
            <div className={styles.introImgContainer}>
              <img src="/images/ground_training_1.png" alt="Academy Ground Training" className={styles.introImg} />
              <div className={styles.experienceBadge}>
                <strong>10+</strong> Years of Glory
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className={styles.visionBox}>
            <span className={styles.visionLabel}>Our Vision</span>
            <h2>"To create disciplined, physically fit and academically strong candidates for India's Defence and Government Services."</h2>
          </div>

          <div className="section-title-wrapper" style={{ marginTop: '5rem', marginBottom: '3rem' }}>
            <span className="section-subtitle">The Pillars</span>
            <h2 className="section-title">Our Mission</h2>
          </div>

          <div className="grid-4">
            {missionItems.map((item, idx) => (
              <div key={idx} className={`${styles.missionCard} glass-panel`}>
                <span className={styles.missionIcon}>{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Journey Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Milestones</span>
            <h2 className="section-title">Our Journey Timeline</h2>
          </div>

          <div className={styles.timeline}>
            {timelineEvents.map((event, idx) => (
              <div key={idx} className={`${styles.timelineItem} ${idx % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}>
                <div className={`${styles.timelineContent} glass-panel`}>
                  <span className={styles.timelineYear}>{event.year}</span>
                  <h3>{event.title}</h3>
                  <p>{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div className={styles.directorImgContainer}>
              <img src="/images/cadet_uniform_1.png" alt="Director Captain Still" className={styles.directorImg} />
            </div>
            <div>
              <span className="section-subtitle">Leadership Word</span>
              <h2 className="section-title">Director's Message</h2>
              <blockquote className={styles.quoteBlock}>
                "Getting into uniform is not just a career milestone; it is a sacred commitment to serve the motherland. We at Still Fitness Academy do not just prepare students to pass exams—we forge character. Discipline is our foundation, sweating on the training track is our ritual, and academic excellence is our weapon. If you have the dream, we will provide the training to make it a reality. Jai Hind!"
              </blockquote>
              <div className={styles.directorSignature}>
                <strong>Captain Still (Retd.)</strong>
                <span>Director, Still Fitness Academy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Still Fitness Academy */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">The Advantage</span>
            <h2 className="section-title">Why Choose Still Fitness Academy?</h2>
          </div>

          <div className="grid-3">
            {features.map((feat, idx) => (
              <div key={idx} className={`${styles.featureCard} glass-panel`}>
                <div className={styles.featureTitleRow}>
                  <span className={styles.featureBullet}>★</span>
                  <h3>{feat.title}</h3>
                </div>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
