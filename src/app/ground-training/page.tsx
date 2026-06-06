import React from 'react';
import { db } from '@/lib/db';
import GalleryLightbox from '@/components/GalleryLightbox';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function GroundTrainingPage() {
  // Fetch ground training photos
  const groundPhotos = db.getGallery().filter(item => item.category === 'ground');

  const trainingModules = [
    {
      title: 'Running Training',
      desc: 'Scientific pacing techniques, speed interval workouts, and stamina drills specifically targeting the 1600m run for boys and 800m run for girls.',
      bullets: ['Stamina Building (5km to 10km runs)', 'Pacing Strategy for Timing Trials', 'Interval Sprint Drills (100m, 200m, 400m)', 'Proper Running Posture & Breathing Checks']
    },
    {
      title: 'Long Jump',
      desc: 'Mastering the runway approach speed, takeoff board coordination, flight heights, and safe landing techniques in the sand pit.',
      bullets: ['Runway Acceleration Optimization', 'Takeoff Leg Explosive Power', 'Hitch-kick / Hang Flight Posture', 'Sand Landing Safety Guidelines']
    },
    {
      title: 'High Jump',
      desc: 'Building abdominal and core lift, mastering jump arches (Fosbury Flop and Scissor cuts), and building high vertical leap capacity.',
      bullets: ['Approach Arching Alignment', 'Core Muscle Lift Conditioning', 'Scissor Kick and Fosbury Methods', 'Soft Landing Mat Drills']
    },
    {
      title: 'Shot Put (Gola Fek)',
      desc: 'Developing shoulder power, core rotation, and release angles to throw the standard iron shot put beyond the maximum qualifying marks.',
      bullets: ['Glide and O\'Brien Techniques', 'Core & Shoulder Thrust Exercises', 'Optimal 45-Degree Release Practice', 'Grip & Balance Drills']
    },
    {
      title: 'Obstacle Training',
      desc: 'Simulated military training on our custom obstacle field to build body coordination, balance, and core strength.',
      bullets: ['9-Feet Ditch Jumping', 'Zig-Zag Balance Beam Walking', '10-Feet High Wall Climbing', 'Monkey Crawls & Rope Climbing']
    },
    {
      title: 'Endurance & Strength',
      desc: 'General body conditioning drills using weight sleds, tires, and bodyweight routines to prevent muscle fatigue.',
      bullets: ['Tire Pulling & Sledge Pushes', 'Planks, Push-ups & Burpees', 'Hill Running & Stairs Climbs', 'Joint Mobility & Stretching']
    }
  ];

  const schedule = [
    { time: '05:00 AM - 05:30 AM', activity: 'General Warm-up, Joint Mobilization & Dynamic Stretching' },
    { time: '05:30 AM - 06:30 AM', activity: 'Track Session: 1600m Timing Trials / Interval Sprint Workouts' },
    { time: '06:30 AM - 07:15 AM', activity: 'Field Events: Shot Put Throw Techniques & Long Jump / High Jump practice' },
    { time: '07:15 AM - 07:45 AM', activity: 'Obstacle Course: Wall scaling, balancing beam & rope climbs' },
    { time: '07:45 AM - 08:15 AM', activity: 'Cool-down, Core Abdominal Workout & Static Stretching' },
    { time: '04:30 PM - 06:00 PM', activity: 'Evening Session: Slow recovery jog, tire drags & lower body strengthening' }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Page Header */}
      <section className={styles.headerBanner} style={{ backgroundImage: `linear-gradient(to right, rgba(10, 35, 66, 0.9), rgba(9, 11, 14, 0.95)), url('/images/hero_bg.png')` }}>
        <div className="container">
          <span className={styles.subtitle}>Physical Fitness Ground</span>
          <h1 className={styles.title}>Ground Training Program</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">Forged in Mud</span>
              <h2 className="section-title">Field Performance Training</h2>
              <p className={styles.introText}>
                No candidate can clear the Indian Armed Forces or State Police recruitment without qualifying the physical efficiency tests. Still Fitness Academy features a custom-built outdoor training arena designed specifically to match competitive field regulations.
              </p>
              <p className={styles.introText} style={{ marginTop: '1rem' }}>
                Under the guidance of ex-defense instructors, our cadets undergo systematic, injury-free physical conditioning that covers endurance, agility, muscle explosive power, and tactical obstacle clearance.
              </p>
            </div>
            <div>
              <img src="/images/ground_training_1.png" alt="Aspirants scaling wall" className={styles.introImg} />
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">The Exercises</span>
            <h2 className="section-title">Physical Training Modules</h2>
          </div>

          <div className="grid-3">
            {trainingModules.map((mod, idx) => (
              <div key={idx} className={`${styles.moduleCard} glass-panel`}>
                <h3>{mod.title}</h3>
                <p>{mod.desc}</p>
                <ul>
                  {mod.bullets.map((b, i) => (
                    <li key={i}>✓ {b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Table */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Our Routine</span>
            <h2 className="section-title">Daily Ground Schedule</h2>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.scheduleTable}>
              <thead>
                <tr>
                  <th>Time Slot</th>
                  <th>Activity Description</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, idx) => (
                  <tr key={idx}>
                    <td className={styles.timeCol}>{row.time}</td>
                    <td className={styles.activityCol}>{row.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Ground Photos */}
      <section className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Live Action</span>
            <h2 className="section-title">Ground Gallery</h2>
          </div>
          <GalleryLightbox items={groundPhotos} />
        </div>
      </section>
    </div>
  );
}
