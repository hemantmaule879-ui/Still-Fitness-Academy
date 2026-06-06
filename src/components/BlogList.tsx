'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './BlogList.module.css';

interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

interface BlogListProps {
  initialBlogs: Blog[];
}

export default function BlogList({ initialBlogs }: BlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Updates' },
    { value: 'Army', label: 'Army Bharti' },
    { value: 'Police', label: 'Police Bharti' },
    { value: 'SSC', label: 'SSC GD / CPO' },
    { value: 'CDS', label: 'CDS / Officer' }
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase()) || 
                          blog.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || blog.category.toLowerCase() === category.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.container}>
      {/* Controls: Search and Filter Tabs */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search notices & updates..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className={styles.tabs}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`${styles.tabBtn} ${category === cat.value ? styles.activeTab : ''}`}
              onClick={() => setCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredBlogs.length === 0 ? (
        <div className={styles.noBlogs}>
          <p>No recruitment notifications match your search query.</p>
        </div>
      ) : (
        <div className="grid-3">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className={`${styles.card} glass-panel`}>
              <div className={styles.imgContainer}>
                <img src={blog.imageUrl} alt={blog.title} className={styles.img} />
                <span className={styles.categoryBadge}>{blog.category}</span>
              </div>
              <div className={styles.content}>
                <span className={styles.date}>
                  {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
                <h3>{blog.title}</h3>
                <p>{blog.summary}</p>
                <Link href={`/blog/${blog.id}`} className={styles.readMoreLink}>
                  Read Full Notice →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
