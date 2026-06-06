'use client';

import React, { useState } from 'react';
import styles from './ResultsList.module.css';

interface StudentResult {
  id: string;
  studentName: string;
  examQualified: string;
  rankPosition: string;
  beforeStory: string;
  afterStory: string;
  imageUrl: string;
  createdAt: string;
}

interface ResultsListProps {
  initialResults: StudentResult[];
}

export default function ResultsList({ initialResults }: ResultsListProps) {
  const [results, setResults] = useState<StudentResult[]>(initialResults);
  const [search, setSearch] = useState('');
  const [filterExam, setFilterExam] = useState('all');
  const [activeStory, setActiveStory] = useState<StudentResult | null>(null);

  const filteredResults = results.filter((res) => {
    const matchesSearch = res.studentName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterExam === 'all' || 
      (filterExam === 'army' && res.examQualified.toLowerCase().includes('army')) ||
      (filterExam === 'police' && res.examQualified.toLowerCase().includes('police')) ||
      (filterExam === 'ssc' && res.examQualified.toLowerCase().includes('ssc')) ||
      (filterExam === 'officer' && (res.examQualified.toLowerCase().includes('cds') || res.examQualified.toLowerCase().includes('capf') || res.examQualified.toLowerCase().includes('ssb')));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className={styles.controls}>
        {/* Search Input */}
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search student name..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <div className={styles.filterBox}>
          <select
            className="form-control"
            style={{ backgroundColor: 'hsl(var(--card-bg))' }}
            value={filterExam}
            onChange={(e) => setFilterExam(e.target.value)}
          >
            <option value="all">All Selections</option>
            <option value="army">Indian Army</option>
            <option value="police">Police Bharti</option>
            <option value="ssc">SSC GD</option>
            <option value="officer">Officer Entries (CDS/SSB)</option>
          </select>
        </div>
      </div>

      {filteredResults.length === 0 ? (
        <div className={styles.noResults}>
          <p>No selected students match your search criteria.</p>
        </div>
      ) : (
        <div className="grid-3">
          {filteredResults.map((student) => (
            <div 
              key={student.id} 
              className={styles.card} 
              onClick={() => setActiveStory(student)}
              title="Click to read full journey"
            >
              <div className={styles.imgWrapper}>
                <img src={student.imageUrl} alt={student.studentName} className={styles.img} />
                <span className={styles.badge}>{student.rankPosition}</span>
              </div>
              <div className={styles.info}>
                <h3>{student.studentName}</h3>
                <span className={styles.exam}>{student.examQualified}</span>
                <p className={styles.previewText}>
                  {student.beforeStory.substring(0, 80)}...
                </p>
                <button className={styles.readMoreBtn}>
                  Read Journey Story →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Story Lightbox Modal */}
      {activeStory && (
        <div className={styles.modalOverlay} onClick={() => setActiveStory(null)}>
          <div className={`${styles.modal} animate-fade-in`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setActiveStory(null)}>×</button>
            
            <div className={styles.modalGrid}>
              <div className={styles.modalImgContainer}>
                <img src={activeStory.imageUrl} alt={activeStory.studentName} className={styles.modalImg} />
                <div className={styles.modalRank}>{activeStory.rankPosition}</div>
              </div>
              
              <div className={styles.modalContent}>
                <h2>{activeStory.studentName}</h2>
                <span className={styles.modalExam}>{activeStory.examQualified}</span>
                
                <div className={styles.storyBlock}>
                  <div className={styles.storySubtitle}>
                    <span className={styles.iconRed}>●</span>
                    <h3>Before Joining Still Fitness Academy</h3>
                  </div>
                  <p>{activeStory.beforeStory}</p>
                </div>
                
                <div className={styles.storyBlock} style={{ marginTop: '1.5rem' }}>
                  <div className={styles.storySubtitle}>
                    <span className={styles.iconGreen}>●</span>
                    <h3>The Transformation & Success</h3>
                  </div>
                  <p>{activeStory.afterStory}</p>
                </div>

                <div className={styles.successMessage}>
                  "Dedication on the ground leads to determination in the exam, resulting in success in the uniform."
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
