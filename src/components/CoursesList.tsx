'use client';

import React, { useState } from 'react';
import styles from './CoursesList.module.css';
import EnquiryModal from './EnquiryModal';

interface Course {
  id: string;
  category: 'defence' | 'police' | 'officer';
  title: string;
  eligibility: string;
  duration: string;
  syllabus: string[];
  process: string[];
  tagline: string;
}

const coursesData: Course[] = [
  {
    id: 'army',
    category: 'defence',
    title: 'Indian Army Preparation',
    tagline: 'Join as Agniveer GD, Technical, Clerk, or Tradesman',
    eligibility: '10th / 12th Pass (Minimum 45% aggregate), Age: 17.5 – 21 Years.',
    duration: '3 Months / 6 Months Intensive Batch',
    syllabus: [
      'General Knowledge (Indian History, Geography, Sports, Awards)',
      'General Science (Physics, Chemistry, Biology basics)',
      'Elementary Mathematics (Arithmetic, Algebra, Geometry)',
      'Logical Reasoning & Verbal Aptitude'
    ],
    process: [
      'Daily 1600m running drills targeting sub-5:30 time',
      'Beam (Pull-ups) training and 9-feet ditch jump practice',
      'Daily morning lectures + weekly offline mock tests',
      'Medical inspection checks matching military recruitment standards'
    ]
  },
  {
    id: 'police',
    category: 'police',
    title: 'Police Bharti Preparation',
    tagline: 'Become a Police Constable or Driver in Maharashtra Police',
    eligibility: '12th Pass, Age: 18 – 28 Years (Relaxation for reserved categories).',
    duration: '4 Months / Regular Batch till Recruitment Exams',
    syllabus: [
      'Marathi Grammar (Detailed syntax, vocabulary, idioms)',
      'Arithmetic & Quantitative Aptitude (Shortcut formulas)',
      'Intellectual Test & Reasoning (Logical deductions)',
      'General Knowledge & Current Affairs (Focus on Maharashtra Geo & History)'
    ],
    process: [
      'Scientific running coaching for 1600m (males) and 800m (females)',
      '100m sprint start block drills and technique improvement',
      'Shot Put (Gola Fek) technique coaching for maximum distance',
      'Weekly full-length OMR sheets-based mock examinations'
    ]
  },
  {
    id: 'psi',
    category: 'police',
    title: 'PSI Preparation',
    tagline: 'Direct entry as Sub-Inspector via MPSC State Exam',
    eligibility: 'Graduate in any discipline, Age: 19 – 31 Years.',
    duration: '6 Months / 1 Year Comprehensive Batch',
    syllabus: [
      'Prelims: General Ability, Mental Aptitude, Current Affairs',
      'Mains Paper 1: Marathi Grammar & English Language Skills',
      'Mains Paper 2: General Studies (Indian Constitution, Law, History, Geography)',
      'PSI Personal Interview Grooming'
    ],
    process: [
      'Academic coaching matching MPSC standards by expert faculty',
      'Targeted physical training for the MPSC physical qualifying test',
      'Special sessions on Law, Human Rights, and Criminal Procedure Code',
      'Mock interview panels with retired administrative and police officers'
    ]
  },
  {
    id: 'ssc',
    category: 'defence',
    title: 'SSC GD Preparation',
    tagline: 'Enter BSF, CISF, CRPF, SSB, ITBP, or AR forces',
    eligibility: '10th Pass, Age: 18 – 23 Years.',
    duration: '4 Months CBT Coaching & Training',
    syllabus: [
      'General Intelligence & Reasoning (Visual memory, analogies)',
      'General Knowledge & General Awareness (Current events)',
      'Elementary Mathematics (Ratio, Averages, Profit & Loss)',
      'English / Hindi Basic Grammar & Comprehension'
    ],
    process: [
      'CBT (Computer Based Test) simulation software practice',
      'Endurance running training to clear 5 Km (males) / 1.6 Km (females) criteria',
      'Detailed study notes, question banks, and offline OMR practice sheets',
      'Hostel residential facility with mandatory morning/evening physicals'
    ]
  },
  {
    id: 'officer',
    category: 'officer',
    title: 'CDS Preparation (UPSC)',
    tagline: 'Enter IMA, OTA, INA, or Air Force Academy as an Officer',
    eligibility: 'Graduate (Unmarried), Age: 19 – 24 Years.',
    duration: '6 Months Academic & SSB Foundation Program',
    syllabus: [
      'English (Reading comprehension, vocabulary, paragraph structure)',
      'General Knowledge (Deep science, polity, history, current defence updates)',
      'Elementary Mathematics (Advanced Algebra, Trigonometry, Geometry, Mensuration)'
    ],
    process: [
      'Deep conceptual lectures by subject matter experts',
      'Daily worksheet solving and section-wise mock tests',
      'GTO physical test preview on our custom obstacle field',
      'Introductory SSB classes covering screening and psychological testing'
    ]
  },
  {
    id: 'officer',
    category: 'officer',
    title: 'CAPF Assistant Commandant',
    tagline: 'Direct Assistant Commandant entry in Central Armed Police Forces',
    eligibility: 'Graduate in any stream, Age: 20 – 25 Years.',
    duration: '6 Months Mains & Physical Program',
    syllabus: [
      'Paper I: General Ability & Intelligence (Multiple Choice)',
      'Paper II: General Studies, Essay writing & Comprehension (Descriptive)'
    ],
    process: [
      'Descriptive essay writing practice and personal evaluation checks',
      'Physical Standard Test (PST) drill (Running, Long Jump, High Jump)',
      'Current national security topics and strategic reviews classroom discussion',
      'Mock interviews simulating actual UPSC personality boards'
    ]
  },
  {
    id: 'officer',
    category: 'officer',
    title: 'CPO Preparation (SSC Sub-Inspector)',
    tagline: 'Become Sub-Inspector in Delhi Police, CAPF, and CISF',
    eligibility: 'Graduate in any stream, Age: 20 – 25 Years.',
    duration: '4 Months Academic and Field Program',
    syllabus: [
      'Paper I: General Intelligence, GK, Quantitative Aptitude, English',
      'Paper II: English Language & Comprehension (Detailed Grammar & vocabulary)'
    ],
    process: [
      'Advanced reasoning and English vocabulary study sessions',
      'Physical Endurance Test (PET) drills (1.6 km run, high jump, long jump, shot put)',
      'Topic-wise online mock test series for Paper I and Paper II',
      'Interview guidelines and document verification mock tests'
    ]
  },
  {
    id: 'officer',
    category: 'officer',
    title: 'SSB Interview Preparation',
    tagline: '15-Days Intensive bootcamp for recommended officer candidates',
    eligibility: 'Aspirants who cleared CDS, AFCAT, NDA, or NCC direct entries.',
    duration: '15 Days Residential Intensive Bootcamp',
    syllabus: [
      'Screening Tests (OIR ratings, PP&DT writing & discussion)',
      'Psychology Battery (TAT, WAT, SRT, SD tests and profiling)',
      'GTO tasks (Progressive Group Tasks, command tasks, lecturette)',
      'Personal Interview tips and Mock SSB boards'
    ],
    process: [
      'Simulated GTO ground tasks on standard academy equipment',
      'Personal psychology report evaluation by defense experts',
      'Simulated board interview under retired colonel presidents',
      'Hostel residential facility with group discussion groups'
    ]
  }
];

export default function CoursesList() {
  const [activeTab, setActiveTab] = useState<'all' | 'defence' | 'police' | 'officer'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const filteredCourses = activeTab === 'all' 
    ? coursesData 
    : coursesData.filter(c => c.category === activeTab);

  const triggerInquiry = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Navigation Tabs */}
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'all' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Courses
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'defence' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('defence')}
          >
            Defence Forces
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'police' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('police')}
          >
            Police Bharti
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'officer' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('officer')}
          >
            Officer Entries
          </button>
        </div>

        {/* Courses Cards Grid */}
        <div className={styles.grid}>
          {filteredCourses.map((course) => (
            <div key={course.id} id={course.id} className={`${styles.courseCard} glass-panel`}>
              <div className={styles.cardHeader}>
                <span className={styles.categoryBadge}>{course.category}</span>
                <h2>{course.title}</h2>
                <p className={styles.tagline}>{course.tagline}</p>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.detailBlock}>
                  <strong>Eligibility:</strong>
                  <p>{course.eligibility}</p>
                </div>
                <div className={styles.detailBlock}>
                  <strong>Duration:</strong>
                  <p>{course.duration}</p>
                </div>

                <div className={styles.columns}>
                  <div className={styles.columnBlock}>
                    <strong>Syllabus Highlights:</strong>
                    <ul>
                      {course.syllabus.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.columnBlock}>
                    <strong>Ground & Classroom Training:</strong>
                    <ul>
                      {course.process.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <button 
                  onClick={() => triggerInquiry(course.title)}
                  className="btn btn-saffron"
                  style={{ width: '100%' }}
                >
                  Fee Structure Inquiry
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultCourse={selectedCourse}
        type="enquiry"
      />
    </>
  );
}
