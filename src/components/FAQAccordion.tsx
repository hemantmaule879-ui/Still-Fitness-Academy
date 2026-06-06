'use client';

import React, { useState } from 'react';
import styles from './FAQAccordion.module.css';

interface FAQ {
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  {
    question: 'What is the typical duration of courses at Still Fitness Academy?',
    answer: 'We offer short-term courses (3 months), medium-term courses (6 months), and full-year coaching. For state recruitment exams like Police Bharti, our batches remain active and training continues until the final exam dates are completed.'
  },
  {
    question: 'What is the fee structure for preparation?',
    answer: 'Fees vary depending on the target exam (Agniveer, Constable, PSI, CDS) and whether you choose the residential hostel package. We provide installment options and special merit scholarships for candidates with strong national achievements. Submit an enquiry to receive a detailed fee PDF.'
  },
  {
    question: 'How is physical training structured on the ground?',
    answer: 'Our ground training is held twice daily. The morning session (5:00 AM) focuses on endurance, 1600m timed track running, and obstacle scaling. The evening session (4:30 PM) targets technique refinement for high jump, long jump, and shot put throws.'
  },
  {
    question: 'Is hostel and residential accommodation available?',
    answer: 'Yes. We have fully-equipped hostel accommodations for outstation male and female candidates. The hostel environment features strict military-style discipline, roll calls, nutritious protein-rich meals, and 24/7 library access.'
  },
  {
    question: 'Do you provide guidance for SSB interviews and medical screenings?',
    answer: 'Yes. We run dedicated GTO training blocks and psychology prep for SSB exams. Additionally, we organize pre-medical camps with medical professionals to check flat feet, knock knees, eyesight, and chest expansions so candidates can correct issues early.'
  }
];

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className={styles.accordion}>
      {faqData.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className={`${styles.item} glass-panel`}>
            <button className={styles.header} onClick={() => toggle(idx)}>
              <h3>{item.question}</h3>
              <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>▼</span>
            </button>
            <div className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}>
              <div className={styles.contentInner}>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
