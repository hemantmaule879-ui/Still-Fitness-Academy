import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  city?: string;
  message?: string;
  type: 'enquiry' | 'demo';
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  category: 'ground' | 'classroom' | 'celebrations' | 'events' | 'seminars';
  imageUrl: string;
  caption: string;
  createdAt: string;
}

export interface StudentResult {
  id: string;
  studentName: string;
  examQualified: string;
  rankPosition: string;
  beforeStory: string;
  afterStory: string;
  imageUrl: string;
  createdAt: string;
}

// Ensure database directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Generic file helpers with locking / safety checks
function readDataFile<T>(filename: string, defaultData: T[]): T[] {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaultData;
  }
}

function writeDataFile<T>(filename: string, data: T[]) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  // Atomic write
  const tempPath = `${filePath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, filePath);
}

// Seed Data definition
const seedBlogs: Blog[] = [
  {
    id: 'b1',
    title: 'Indian Army Agniveer Bharti 2026: Dates, Eligibility & Preparation',
    summary: 'A complete walkthrough of the upcoming Army recruitment rally. Get physical fitness parameters and syllabus guidelines.',
    content: `### Indian Army Agniveer 2026 Recruitment Rally

The Indian Army has announced the registration window for the next batch of Agniveers. Male and female candidates between **17.5 and 21 years of age** are eligible to apply.

#### Key Selection Stages:
1. **Common Entrance Examination (CEE)** - Written Test
2. **Physical Fitness Test (PFT)** - 1.6 Km Run, Pull-ups, Zig-Zag Balance, 9-Feet Ditch
3. **Medical Examination**

At **Still Fitness Academy**, we run dedicated batches for both the written exam and physical ground tests under expert trainers.

#### Still Academy Training Routine:
- Daily 1600m timed track running
- Pull-ups and obstacle course practice
- Weekly offline Mock Tests on the military syllabus
- Regular health check-ups and medical guidance`,
    category: 'Army',
    imageUrl: '/images/hero_bg.png',
    createdAt: new Date('2026-05-15').toISOString()
  },
  {
    id: 'b2',
    title: 'Maharashtra Police Bharti 2026: Syllabus and Physical Test Marks',
    summary: 'A detailed breakdown of the police constable and PSI physical scoring and written syllabus.',
    content: `### Clear Maharashtra Police Bharti on Your First Attempt

Cracking the Police Bharti requires an equal balance of academic excellence and physical fitness. The selection relies heavily on your scores in both stages.

#### Physical Test Marks Allocation (Male Candidates):
- **1600m Run**: 20 Marks (Target time: under 5m 10s)
- **100m Run**: 15 Marks
- **Shot Put (Gola Fek)**: 15 Marks
- **Total Physical Score**: 50 Marks

#### Written Examination Syllabus:
1. **Marathi Grammar** (25 Marks)
2. **Arithmetic & Maths** (25 Marks)
3. **Intellectual Test / Reasoning** (25 Marks)
4. **General Knowledge & Current Affairs** (25 Marks)

Join Still Fitness Academy to gain access to our custom study booklets, mock test Series, and specialized ground trainers.`,
    category: 'Police',
    imageUrl: '/images/ground_training_1.png',
    createdAt: new Date('2026-05-28').toISOString()
  },
  {
    id: 'b3',
    title: 'SSC GD Constable 2026: 40,000+ Vacancies Announced',
    summary: 'Staff Selection Commission releases huge recruitment opportunities in CAPFs (BSF, CISF, CRPF, SSB).',
    content: `### Huge SSC GD Recruitment for BSF, CISF, CRPF, ITBP, SSB

The Staff Selection Commission (SSC) has launched the recruitment notification for General Duty (GD) Constables. If you are 10th pass and aged between 18-23, this is your chance.

#### Selection Process:
1. **Computer Based Test (CBT)**: 80 Questions, 160 Marks testing Reasoning, GK, Mathematics, and English/Hindi language skills.
2. **Physical Efficiency Test (PET)**: 5 Km Run in 24 mins for males; 1.6 Km Run in 8.5 mins for females.

#### Preparation at Still Fitness:
We host intensive CBT preparation classes, daily computer mock tests, and systematic endurance training on the track to ensure you clear the 5km test comfortably.`,
    category: 'SSC',
    imageUrl: '/images/classroom_training_1.png',
    createdAt: new Date('2026-06-02').toISOString()
  },
  {
    id: 'b4',
    title: 'UPSC CDS 2026: Section-Wise Preparation Strategy',
    summary: 'How to approach English, General Knowledge, and Mathematics sections for IMA, OTA, INA, and AFA entries.',
    content: `### UPSC Combined Defence Services (CDS) Preparation

The UPSC CDS written exam requires a highly strategic approach to qualify for the SSB Interview round. Unlike police exams, CDS focuses on deep concept-based testing.

#### Section Breakdown:
- **English**: Grammar, Reading Comprehension, Sentence Rearrangement, Synonyms/Antonyms.
- **General Knowledge**: Emphasis on General Science (Physics, Chemistry, Biology), History, Geography, Indian Constitution, and Defense News.
- **Elementary Mathematics**: Algebra, Trigonometry, Geometry, Arithmetic, and Mensuration.

*Still Fitness Academy offers structured classroom study, doubt-solving bootcamps, and hostel facilities with dedicated study hours.*`,
    category: 'CDS',
    imageUrl: '/images/cadet_uniform_1.png',
    createdAt: new Date('2026-06-04').toISOString()
  }
];

const seedGallery: GalleryItem[] = [
  {
    id: 'g1',
    category: 'ground',
    imageUrl: '/images/ground_training_1.png',
    caption: 'Cadets practicing morning sprint and endurance drill',
    createdAt: new Date('2026-05-10').toISOString()
  },
  {
    id: 'g2',
    category: 'ground',
    imageUrl: '/images/hero_bg.png',
    caption: 'Weekly physical agility and obstacle clearing drill',
    createdAt: new Date('2026-05-12').toISOString()
  },
  {
    id: 'g3',
    category: 'classroom',
    imageUrl: '/images/classroom_training_1.png',
    caption: 'Classroom coaching for GK, Math, and Marathi Grammar',
    createdAt: new Date('2026-05-14').toISOString()
  },
  {
    id: 'g4',
    category: 'celebrations',
    imageUrl: '/images/cadet_uniform_1.png',
    caption: 'Felicitation ceremony for selected cadets entering Uniform Services',
    createdAt: new Date('2026-05-20').toISOString()
  },
  {
    id: 'g5',
    category: 'events',
    imageUrl: '/images/hero_bg.png',
    caption: 'Motivational seminar led by retired officers on life in the Armed Forces',
    createdAt: new Date('2026-05-22').toISOString()
  },
  {
    id: 'g6',
    category: 'seminars',
    imageUrl: '/images/classroom_training_1.png',
    caption: 'Interactive doubt clearing and strategy planning sessions',
    createdAt: new Date('2026-05-25').toISOString()
  }
];

const seedResults: StudentResult[] = [
  {
    id: 'r1',
    studentName: 'Rohan Deshmukh',
    examQualified: 'Indian Army Agniveer',
    rankPosition: 'Selected (GD) - Army Rally 2025',
    beforeStory: 'Rohan was unable to complete the 1.6km running course under 7 minutes and struggled with academic discipline.',
    afterStory: 'Under the physical instructors at Still Academy, Rohan brought his running time down to 5:12, got full physical marks, and easily cleared the written exam.',
    imageUrl: '/images/cadet_uniform_1.png',
    createdAt: new Date('2025-11-20').toISOString()
  },
  {
    id: 'r2',
    studentName: 'Sneha Patil',
    examQualified: 'Maharashtra Police Bharti',
    rankPosition: 'PSI (Sub-Inspector) - Rank 14',
    beforeStory: 'Sneha faced issues with shot put technique and lacked structured practice resources for Marathi grammar.',
    afterStory: 'Weekly mock tests and customized ground instruction helped her score 47/50 in the physical test and clear the written test with flying colors.',
    imageUrl: '/images/cadet_uniform_1.png',
    createdAt: new Date('2025-12-15').toISOString()
  },
  {
    id: 'r3',
    studentName: 'Amit Verma',
    examQualified: 'SSC GD Constable',
    rankPosition: 'BSF Selected (Rank 482)',
    beforeStory: 'Amit lacked proper guidance and resources in his hometown, leading to low confidence in competitive exams.',
    afterStory: 'Utilizing our hostel facility, structured 24/7 library, and daily practice sessions, Amit cleared the computer-based exam and BSF physical standards.',
    imageUrl: '/images/cadet_uniform_1.png',
    createdAt: new Date('2026-01-10').toISOString()
  },
  {
    id: 'r4',
    studentName: 'Vikram Singh',
    examQualified: 'CDS (UPSC)',
    rankPosition: 'IMA Selected (152 Course)',
    beforeStory: 'Vikram struggled with general knowledge and was screened out during previous SSB interviews.',
    afterStory: 'With intensive SSB guidance, mock interviews, and GTO practice, Vikram got recommended by the SSB and joined the Indian Military Academy.',
    imageUrl: '/images/cadet_uniform_1.png',
    createdAt: new Date('2026-02-18').toISOString()
  }
];

// DB Implementation
export const db = {
  // Inquiries
  getInquiries(): Inquiry[] {
    return readDataFile<Inquiry>('contacts.json', []).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  createInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Inquiry {
    const list = this.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiry,
      id: 'inq_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    list.push(newInquiry);
    writeDataFile('contacts.json', list);
    return newInquiry;
  },
  deleteInquiry(id: string) {
    const list = this.getInquiries();
    const filtered = list.filter(x => x.id !== id);
    writeDataFile('contacts.json', filtered);
  },

  // Blogs
  getBlogs(): Blog[] {
    return readDataFile<Blog>('blogs.json', seedBlogs).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  getBlogById(id: string): Blog | undefined {
    return this.getBlogs().find(x => x.id === id);
  },
  createBlog(blog: Omit<Blog, 'id' | 'createdAt'>): Blog {
    const list = this.getBlogs();
    const newBlog: Blog = {
      ...blog,
      id: 'blog_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    list.push(newBlog);
    writeDataFile('blogs.json', list);
    return newBlog;
  },
  updateBlog(blog: Blog): boolean {
    const list = this.getBlogs();
    const idx = list.findIndex(x => x.id === blog.id);
    if (idx === -1) return false;
    list[idx] = { ...blog };
    writeDataFile('blogs.json', list);
    return true;
  },
  deleteBlog(id: string) {
    const list = this.getBlogs();
    const filtered = list.filter(x => x.id !== id);
    writeDataFile('blogs.json', filtered);
  },

  // Gallery
  getGallery(): GalleryItem[] {
    return readDataFile<GalleryItem>('gallery.json', seedGallery).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  createGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt'>): GalleryItem {
    const list = this.getGallery();
    const newItem: GalleryItem = {
      ...item,
      id: 'gal_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    list.push(newItem);
    writeDataFile('gallery.json', list);
    return newItem;
  },
  deleteGalleryItem(id: string) {
    const list = this.getGallery();
    const filtered = list.filter(x => x.id !== id);
    writeDataFile('gallery.json', filtered);
  },

  // Results
  getResults(): StudentResult[] {
    return readDataFile<StudentResult>('results.json', seedResults).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  getResultById(id: string): StudentResult | undefined {
    return this.getResults().find(x => x.id === id);
  },
  createResult(result: Omit<StudentResult, 'id' | 'createdAt'>): StudentResult {
    const list = this.getResults();
    const newResult: StudentResult = {
      ...result,
      id: 'res_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    list.push(newResult);
    writeDataFile('results.json', list);
    return newResult;
  },
  updateResult(result: StudentResult): boolean {
    const list = this.getResults();
    const idx = list.findIndex(x => x.id === result.id);
    if (idx === -1) return false;
    list[idx] = { ...result };
    writeDataFile('results.json', list);
    return true;
  },
  deleteResult(id: string) {
    const list = this.getResults();
    const filtered = list.filter(x => x.id !== id);
    writeDataFile('results.json', filtered);
  }
};
