'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface Inquiry {
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

interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

interface GalleryItem {
  id: string;
  category: 'ground' | 'classroom' | 'celebrations' | 'events' | 'seminars';
  imageUrl: string;
  caption: string;
  createdAt: string;
}

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

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'blogs' | 'results' | 'gallery'>('inquiries');

  // Dashboard Data List states
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // UI loading states
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackErr, setFeedbackErr] = useState('');

  // Form states - Blogs
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('Army');
  const [blogImageUrl, setBlogImageUrl] = useState('/images/hero_bg.png');

  // Form states - Results
  const [editingResult, setEditingResult] = useState<StudentResult | null>(null);
  const [resName, setResName] = useState('');
  const [resExam, setResExam] = useState('');
  const [resRank, setResRank] = useState('');
  const [resBefore, setResBefore] = useState('');
  const [resAfter, setResAfter] = useState('');
  const [resImageUrl, setResImageUrl] = useState('/images/cadet_uniform_1.png');

  // Form states - Gallery
  const [galCategory, setGalCategory] = useState<'ground' | 'classroom' | 'celebrations' | 'events' | 'seminars'>('ground');
  const [galCaption, setGalCaption] = useState('');
  const [galImageUrl, setGalImageUrl] = useState('/images/ground_training_1.png');

  // 1. Verify Authentication on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/login');
        if (res.ok) {
          setAuthorized(true);
          loadTabContent('inquiries');
        } else {
          router.push('/');
        }
      } catch (err) {
        router.push('/');
      }
    };
    checkAuth();
  }, [router]);

  // Load content whenever tab switches
  const handleTabChange = (tabName: 'inquiries' | 'blogs' | 'results' | 'gallery') => {
    setActiveTab(tabName);
    loadTabContent(tabName);
    // Clear notifications and editing states
    setFeedbackMsg('');
    setFeedbackErr('');
    resetForms();
  };

  const resetForms = () => {
    setEditingBlog(null);
    setBlogTitle('');
    setBlogSummary('');
    setBlogContent('');
    setBlogCategory('Army');
    setBlogImageUrl('/images/hero_bg.png');

    setEditingResult(null);
    setResName('');
    setResExam('');
    setResRank('');
    setResBefore('');
    setResAfter('');
    setResImageUrl('/images/cadet_uniform_1.png');

    setGalCategory('ground');
    setGalCaption('');
    setGalImageUrl('/images/ground_training_1.png');
  };

  // 2. Fetch specific tab contents
  const loadTabContent = async (tabName: string) => {
    setLoading(true);
    setFeedbackErr('');
    try {
      if (tabName === 'inquiries') {
        const res = await fetch('/api/admin/inquiries');
        const data = await res.json();
        if (data.success) setInquiries(data.inquiries);
      } else if (tabName === 'blogs') {
        const res = await fetch('/api/admin/blogs');
        const data = await res.json();
        if (data.success) setBlogs(data.blogs);
      } else if (tabName === 'results') {
        const res = await fetch('/api/admin/results');
        const data = await res.json();
        if (data.success) setResults(data.results);
      } else if (tabName === 'gallery') {
        const res = await fetch('/api/admin/gallery');
        const data = await res.json();
        if (data.success) setGallery(data.gallery);
      }
    } catch (err) {
      setFeedbackErr(`Failed to load ${tabName}. Connection error.`);
    } finally {
      setLoading(false);
    }
  };

  // 3. Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetType: 'blog' | 'result' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setActionLoading(true);
    setFeedbackMsg('Uploading image...');
    setFeedbackErr('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg('Image uploaded successfully!');
        if (targetType === 'blog') setBlogImageUrl(data.imageUrl);
        else if (targetType === 'result') setResImageUrl(data.imageUrl);
        else if (targetType === 'gallery') setGalImageUrl(data.imageUrl);
      } else {
        setFeedbackErr(data.error || 'Failed to upload image.');
      }
    } catch (err) {
      setFeedbackErr('Network upload failure.');
    } finally {
      setActionLoading(false);
    }
  };

  // 4. CRUD operations - INQUIRIES
  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this candidate inquiry?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedbackMsg('Inquiry deleted successfully.');
        setInquiries(inquiries.filter(i => i.id !== id));
      }
    } catch (err) {
      setFeedbackErr('Failed to delete inquiry.');
    } finally {
      setActionLoading(false);
    }
  };

  // 5. CRUD operations - BLOGS
  const saveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setFeedbackMsg('');
    setFeedbackErr('');

    const payload = {
      title: blogTitle,
      summary: blogSummary,
      content: blogContent,
      category: blogCategory,
      imageUrl: blogImageUrl
    };

    try {
      let res;
      if (editingBlog) {
        res = await fetch('/api/admin/blogs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, id: editingBlog.id, createdAt: editingBlog.createdAt })
        });
      } else {
        res = await fetch('/api/admin/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedbackMsg(editingBlog ? 'Blog updated successfully.' : 'New blog published.');
        resetForms();
        loadTabContent('blogs');
      } else {
        setFeedbackErr(data.error || 'Failed to save blog post.');
      }
    } catch (err) {
      setFeedbackErr('Connection error. Failed to save.');
    } finally {
      setActionLoading(false);
    }
  };

  const selectBlogForEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setBlogTitle(blog.title);
    setBlogSummary(blog.summary);
    setBlogContent(blog.content);
    setBlogCategory(blog.category);
    setBlogImageUrl(blog.imageUrl);
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedbackMsg('Blog post deleted.');
        setBlogs(blogs.filter(b => b.id !== id));
      }
    } catch (err) {
      setFeedbackErr('Failed to delete blog.');
    } finally {
      setActionLoading(false);
    }
  };

  // 6. CRUD operations - RESULTS
  const saveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setFeedbackMsg('');
    setFeedbackErr('');

    const payload = {
      studentName: resName,
      examQualified: resExam,
      rankPosition: resRank,
      beforeStory: resBefore,
      afterStory: resAfter,
      imageUrl: resImageUrl
    };

    try {
      let res;
      if (editingResult) {
        res = await fetch('/api/admin/results', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, id: editingResult.id, createdAt: editingResult.createdAt })
        });
      } else {
        res = await fetch('/api/admin/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedbackMsg(editingResult ? 'Student result updated.' : 'New result added successfully.');
        resetForms();
        loadTabContent('results');
      } else {
        setFeedbackErr(data.error || 'Failed to save student record.');
      }
    } catch (err) {
      setFeedbackErr('Connection error. Failed to save result.');
    } finally {
      setActionLoading(false);
    }
  };

  const selectResultForEdit = (result: StudentResult) => {
    setEditingResult(result);
    setResName(result.studentName);
    setResExam(result.examQualified);
    setResRank(result.rankPosition);
    setResBefore(result.beforeStory);
    setResAfter(result.afterStory);
    setResImageUrl(result.imageUrl);
  };

  const deleteResult = async (id: string) => {
    if (!confirm('Are you sure you want to delete this result?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/results?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedbackMsg('Student result deleted.');
        setResults(results.filter(r => r.id !== id));
      }
    } catch (err) {
      setFeedbackErr('Failed to delete student result.');
    } finally {
      setActionLoading(false);
    }
  };

  // 7. CRUD operations - GALLERY
  const saveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setFeedbackMsg('');
    setFeedbackErr('');

    const payload = {
      category: galCategory,
      imageUrl: galImageUrl,
      caption: galCaption
    };

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedbackMsg('Gallery image added successfully.');
        resetForms();
        loadTabContent('gallery');
      } else {
        setFeedbackErr(data.error || 'Failed to save gallery item.');
      }
    } catch (err) {
      setFeedbackErr('Connection error. Failed to save gallery item.');
    } finally {
      setActionLoading(false);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery photo?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedbackMsg('Gallery photo deleted.');
        setGallery(gallery.filter(g => g.id !== id));
      }
    } catch (err) {
      setFeedbackErr('Failed to delete gallery item.');
    } finally {
      setActionLoading(false);
    }
  };

  // 8. LOGOUT
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' });
      router.push('/');
    } catch (err) {
      setFeedbackErr('Failed to logout.');
    }
  };

  if (!authorized) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner}></div>
        <p>Loading Administrator Command Panel...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>STILL FITNESS</h3>
          <span>COMMAND PANEL</span>
        </div>
        <nav className={styles.navMenu}>
          <button 
            className={`${styles.navBtn} ${activeTab === 'inquiries' ? styles.navActive : ''}`}
            onClick={() => handleTabChange('inquiries')}
          >
            📥 Lead Inquiries
          </button>
          <button 
            className={`${styles.navBtn} ${activeTab === 'blogs' ? styles.navActive : ''}`}
            onClick={() => handleTabChange('blogs')}
          >
            📰 Manage Blogs
          </button>
          <button 
            className={`${styles.navBtn} ${activeTab === 'results' ? styles.navActive : ''}`}
            onClick={() => handleTabChange('results')}
          >
            🏆 Student Results
          </button>
          <button 
            className={`${styles.navBtn} ${activeTab === 'gallery' ? styles.navActive : ''}`}
            onClick={() => handleTabChange('gallery')}
          >
            🖼️ Manage Gallery
          </button>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            🚪 Logout Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainArea}>
        <header className={styles.mainHeader}>
          <h2>{activeTab.toUpperCase()} MANAGER</h2>
          <div className={styles.headerUser}>
            <span>Welcome, Administrator</span>
          </div>
        </header>

        {/* Global Notifications */}
        {feedbackMsg && <div className={styles.successBanner}>{feedbackMsg}</div>}
        {feedbackErr && <div className={styles.errorBanner}>{feedbackErr}</div>}

        {loading ? (
          <div className={styles.tabLoading}>
            <div className={styles.spinner}></div>
            <p>Loading database entries...</p>
          </div>
        ) : (
          <div className={styles.tabContent}>
            
            {/* TAB 1: INQUIRIES VIEW */}
            {activeTab === 'inquiries' && (
              <div className={styles.inquiriesContainer}>
                <h3>Admission Inquiries & Demo Class Registrations ({inquiries.length})</h3>
                
                {inquiries.length === 0 ? (
                  <p className={styles.emptyMsg}>No inquiries recorded in the database yet.</p>
                ) : (
                  <div className={styles.tableWrap}>
                    <table className={styles.adminTable}>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Candidate</th>
                          <th>Contact Details</th>
                          <th>Target Course</th>
                          <th>City / Message</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.map((inq) => (
                          <tr key={inq.id}>
                            <td>{new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                            <td>
                              <span className={`${styles.typeBadge} ${inq.type === 'demo' ? styles.badgeDemo : styles.badgeEnquiry}`}>
                                {inq.type}
                              </span>
                            </td>
                            <td><strong>{inq.name}</strong></td>
                            <td>
                              <div>📞 {inq.phone}</div>
                              {inq.email && <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>✉️ {inq.email}</div>}
                            </td>
                            <td>{inq.course}</td>
                            <td>
                              {inq.type === 'demo' ? (
                                <span>🌆 {inq.city}</span>
                              ) : (
                                <span style={{ fontSize: '0.85rem' }}>{inq.message || '-'}</span>
                              )}
                            </td>
                            <td>
                              <button onClick={() => deleteInquiry(inq.id)} className={styles.deleteBtn} disabled={actionLoading}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: BLOGS MANAGER */}
            {activeTab === 'blogs' && (
              <div className={styles.blogsGrid}>
                {/* Blog Editor Form */}
                <div className={`${styles.editorCard} glass-panel`}>
                  <h3>{editingBlog ? 'Edit Blog Post' : 'Publish New Recruitment Alert'}</h3>
                  <form onSubmit={saveBlog} className={styles.form}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="blog-title">Blog Title *</label>
                      <input
                        id="blog-title"
                        type="text"
                        className="form-control"
                        placeholder="Enter blog heading"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label" htmlFor="blog-summary">Summary *</label>
                      <input
                        id="blog-summary"
                        type="text"
                        className="form-control"
                        placeholder="Brief summary sentence"
                        value={blogSummary}
                        onChange={(e) => setBlogSummary(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.row}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="blog-cat">Category *</label>
                        <select
                          id="blog-cat"
                          className="form-control"
                          style={{ backgroundColor: 'hsl(var(--card-bg))' }}
                          value={blogCategory}
                          onChange={(e) => setBlogCategory(e.target.value)}
                        >
                          <option value="Army">Army Bharti</option>
                          <option value="Police">Police Bharti</option>
                          <option value="SSC">SSC GD / CPO</option>
                          <option value="CDS">CDS / Officer</option>
                        </select>
                      </div>

                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="blog-img">Featured Image (Upload) *</label>
                        <input
                          id="blog-img"
                          type="file"
                          accept="image/*"
                          className="form-control"
                          onChange={(e) => handleImageUpload(e, 'blog')}
                        />
                        <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: 0.7 }}>
                          Current: {blogImageUrl.substring(0, 30)}...
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="blog-content">Post Content (Supports Heading Markdown: ### ) *</label>
                      <textarea
                        id="blog-content"
                        className="form-control"
                        placeholder="Write blog body content here..."
                        rows={10}
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.formActions}>
                      <button type="submit" className="btn btn-saffron" disabled={actionLoading}>
                        {editingBlog ? 'Update Blog' : 'Publish Blog'}
                      </button>
                      {editingBlog && (
                        <button type="button" className="btn btn-secondary" onClick={resetForms}>
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Published Blogs List */}
                <div className={styles.listCard}>
                  <h3>Published Blogs ({blogs.length})</h3>
                  <div className={styles.itemList}>
                    {blogs.map((b) => (
                      <div key={b.id} className={styles.listItem}>
                        <div className={styles.itemThumb} style={{ backgroundImage: `url(${b.imageUrl})` }}></div>
                        <div className={styles.itemInfo}>
                          <h4>{b.title}</h4>
                          <span>Category: {b.category} | Date: {new Date(b.createdAt).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className={styles.itemActions}>
                          <button onClick={() => selectBlogForEdit(b)} className={styles.editBtn}>Edit</button>
                          <button onClick={() => deleteBlog(b.id)} className={styles.deleteBtn} disabled={actionLoading}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: STUDENT RESULTS MANAGER */}
            {activeTab === 'results' && (
              <div className={styles.blogsGrid}>
                {/* Result Form */}
                <div className={`${styles.editorCard} glass-panel`}>
                  <h3>{editingResult ? 'Edit Selection Record' : 'Add Qualified Candidate'}</h3>
                  <form onSubmit={saveResult} className={styles.form}>
                    <div className={styles.row}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="res-name">Student Name *</label>
                        <input
                          id="res-name"
                          type="text"
                          className="form-control"
                          placeholder="e.g. Rohan Deshmukh"
                          value={resName}
                          onChange={(e) => setResName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="res-exam">Exam Qualified *</label>
                        <input
                          id="res-exam"
                          type="text"
                          className="form-control"
                          placeholder="e.g. Indian Army Agniveer"
                          value={resExam}
                          onChange={(e) => setResExam(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.row}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="res-rank">Rank / Position *</label>
                        <input
                          id="res-rank"
                          type="text"
                          className="form-control"
                          placeholder="e.g. Selected (GD) or Rank 12"
                          value={resRank}
                          onChange={(e) => setResRank(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="res-file">Student Profile Picture (Upload) *</label>
                        <input
                          id="res-file"
                          type="file"
                          accept="image/*"
                          className="form-control"
                          onChange={(e) => handleImageUpload(e, 'result')}
                        />
                        <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: 0.7 }}>
                          Current: {resImageUrl.substring(0, 30)}...
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="res-before">Before Joining Journey *</label>
                      <textarea
                        id="res-before"
                        className="form-control"
                        placeholder="Describe candidate's struggle, stamina parameters or academic status before Academy..."
                        rows={3}
                        value={resBefore}
                        onChange={(e) => setResBefore(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="res-after">After Academy Transformation *</label>
                      <textarea
                        id="res-after"
                        className="form-control"
                        placeholder="Describe physical upgrades, exam scores, and selection details..."
                        rows={3}
                        value={resAfter}
                        onChange={(e) => setResAfter(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.formActions}>
                      <button type="submit" className="btn btn-saffron" disabled={actionLoading}>
                        {editingResult ? 'Update Result' : 'Save Selection'}
                      </button>
                      {editingResult && (
                        <button type="button" className="btn btn-secondary" onClick={resetForms}>
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Selections List */}
                <div className={styles.listCard}>
                  <h3>Selection Records ({results.length})</h3>
                  <div className={styles.itemList}>
                    {results.map((r) => (
                      <div key={r.id} className={styles.listItem}>
                        <div className={styles.itemThumb} style={{ backgroundImage: `url(${r.imageUrl})` }}></div>
                        <div className={styles.itemInfo}>
                          <h4>{r.studentName}</h4>
                          <span>{r.examQualified} | {r.rankPosition}</span>
                        </div>
                        <div className={styles.itemActions}>
                          <button onClick={() => selectResultForEdit(r)} className={styles.editBtn}>Edit</button>
                          <button onClick={() => deleteResult(r.id)} className={styles.deleteBtn} disabled={actionLoading}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: GALLERY MANAGER */}
            {activeTab === 'gallery' && (
              <div className={styles.blogsGrid}>
                {/* Gallery Upload Form */}
                <div className={`${styles.editorCard} glass-panel`}>
                  <h3>Upload New Academy Photo</h3>
                  <form onSubmit={saveGalleryItem} className={styles.form}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="gal-caption">Photo Caption / Title *</label>
                      <input
                        id="gal-caption"
                        type="text"
                        className="form-control"
                        placeholder="e.g. Daily sprint trials on track"
                        value={galCaption}
                        onChange={(e) => setGalCaption(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.row}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="gal-cat">Gallery Category *</label>
                        <select
                          id="gal-cat"
                          className="form-control"
                          style={{ backgroundColor: 'hsl(var(--card-bg))' }}
                          value={galCategory}
                          onChange={(e) => setGalCategory(e.target.value as any)}
                        >
                          <option value="ground">Ground Training</option>
                          <option value="classroom">Classroom Sessions</option>
                          <option value="celebrations">Selection Celebrations</option>
                          <option value="events">Events</option>
                          <option value="seminars">Motivational Seminars</option>
                        </select>
                      </div>

                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="gal-file">Upload Photo *</label>
                        <input
                          id="gal-file"
                          type="file"
                          accept="image/*"
                          className="form-control"
                          onChange={(e) => handleImageUpload(e, 'gallery')}
                          required
                        />
                        <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: 0.7 }}>
                          Current URL: {galImageUrl.substring(0, 30)}...
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-saffron" disabled={actionLoading}>
                      Add Photo to Gallery
                    </button>
                  </form>
                </div>

                {/* Photo List */}
                <div className={styles.listCard}>
                  <h3>Gallery Photos ({gallery.length})</h3>
                  <div className={styles.itemList}>
                    {gallery.map((g) => (
                      <div key={g.id} className={styles.listItem}>
                        <div className={styles.itemThumb} style={{ backgroundImage: `url(${g.imageUrl})` }}></div>
                        <div className={styles.itemInfo}>
                          <h4>{g.caption || 'No caption'}</h4>
                          <span>Category: {g.category}</span>
                        </div>
                        <div className={styles.itemActions}>
                          <button onClick={() => deleteGalleryItem(g.id)} className={styles.deleteBtn} disabled={actionLoading}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
