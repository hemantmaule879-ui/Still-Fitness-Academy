'use client';

import React, { useState, useEffect } from 'react';
import styles from './TestimonialsSlider.module.css';

interface Testimonial {
  id: number;
  name: string;
  post: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sachin Kadam',
    post: 'Selected, Maharashtra Police Constable',
    text: 'Still Fitness Academy changed my life. The physical ground training is highly scientific, and the daily classroom test papers helped me secure 94/100 in the final written exam.',
    image: '/images/cadet_uniform_1.png'
  },
  {
    id: 2,
    name: 'Capt. Harsh Vardhan',
    post: 'Indian Army (IMA Selected)',
    text: 'The GTO obstacle training ground and mock interviews for SSB are unmatched. The retired Colonel\'s personal mentoring gave me the exact leadership mindset needed to get recommended.',
    image: '/images/cadet_uniform_1.png'
  },
  {
    id: 3,
    name: 'Priyanka Patil',
    post: 'Selected, PSI (Sub-Inspector)',
    text: 'Having separate batches for girls and dedicated female physical trainers made a huge difference. The training was challenging but designed to prevent injuries while maximizing running speed.',
    image: '/images/cadet_uniform_1.png'
  },
  {
    id: 4,
    name: 'Rahul Shinde',
    post: 'Selected, SSC GD (CISF)',
    text: 'The academic environment here is top-notch. With 24/7 library access, study groups, and weekly offline OMR tests, clearing the written round was a breeze.',
    image: '/images/cadet_uniform_1.png'
  }
];

export default function TestimonialsSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slideWrapper}>
        {testimonials.map((t, idx) => {
          const isActive = idx === active;
          return (
            <div
              key={t.id}
              className={`${styles.slide} ${isActive ? styles.activeSlide : ''}`}
              style={{ display: isActive ? 'block' : 'none' }}
            >
              <div className={styles.quoteIcon}>“</div>
              <p className={styles.text}>{t.text}</p>
              <div className={styles.profile}>
                <div
                  className={styles.avatar}
                  style={{ backgroundImage: `url(${t.image})` }}
                />
                <div className={styles.info}>
                  <h4 className={styles.name}>{t.name}</h4>
                  <span className={styles.post}>{t.post}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.dots}>
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${idx === active ? styles.activeDot : ''}`}
            onClick={() => setActive(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
