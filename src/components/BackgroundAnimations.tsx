'use client';

import React from 'react';
import styles from './BackgroundAnimations.module.css';

export default function BackgroundAnimations() {
  return (
    <div className={styles.bgWrapper} aria-hidden='true'>

      {/* Animated grid overlay */}
      <div className={styles.grid} />

      {/* Diagonal texture lines */}
      <div className={styles.diagonalLines} />

      {/* Glowing orbs - Saffron, Army Green, Navy Blue */}
      <div className={[styles.orb, styles.orbSaffron].join(' ')} />
      <div className={[styles.orb, styles.orbGreen].join(' ')} />
      <div className={[styles.orb, styles.orbNavy].join(' ')} />

      {/* Radar pulse - military sonar effect */}
      <div className={styles.radar}>
        <div className={styles.radarRing} />
        <div className={styles.radarRing} />
        <div className={styles.radarRing} />
        <div className={styles.radarRing} />
        <div className={styles.radarDot} />
      </div>

      {/* Rising particles - tricolor dots */}
      <div className={styles.particles}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>

      {/* Horizontal light streaks */}
      <div className={styles.streaks}>
        <div className={styles.streak} />
        <div className={styles.streak} />
        <div className={styles.streak} />
        <div className={styles.streak} />
        <div className={styles.streak} />
      </div>

    </div>
  );
}
