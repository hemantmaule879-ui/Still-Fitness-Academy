import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import styles from './page.module.css';

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

// Inline renderer to parse basic Markdown strings into JSX
function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className={styles.detailList}>
          {listItems.map((item, i) => (
            <li key={i}>{parseInlineFormatting(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('- ')) {
      inList = true;
      listItems.push(line.substring(2));
    } else {
      if (inList) {
        flushList(i);
      }

      if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className={styles.detailH3}>{line.substring(4)}</h3>);
      } else if (line.startsWith('#### ')) {
        elements.push(<h4 key={i} className={styles.detailH4}>{line.substring(5)}</h4>);
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(<p key={i} className={styles.detailBoldPara}>{line.replace(/\*\*/g, '')}</p>);
      } else if (line !== '') {
        elements.push(<p key={i} className={styles.detailPara}>{parseInlineFormatting(line)}</p>);
      }
    }
  }

  if (inList) {
    flushList(lines.length);
  }

  return elements;
}

// Parse bold markdown tags inside sentences
function parseInlineFormatting(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className={styles.strongAccent}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export const dynamic = 'force-dynamic';

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const blog = db.getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className={styles.wrapper}>
      {/* Blog Hero Banner */}
      <section 
        className={styles.banner} 
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(10, 35, 66, 0.85), rgba(9, 11, 14, 0.98)), url(${blog.imageUrl})` }}
      >
        <div className="container">
          <div className={styles.bannerContent}>
            <Link href="/blog" className={styles.backBtn}>
              ← Back to Updates
            </Link>
            <span className={styles.categoryBadge}>{blog.category}</span>
            <h1 className={styles.title}>{blog.title}</h1>
            <div className={styles.metaRow}>
              <span>Published: {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>•</span>
              <span>By Academy Admin</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Article */}
            <article className={`${styles.article} glass-panel`}>
              <div className={styles.summaryBox}>
                <p>{blog.summary}</p>
              </div>
              <div className={styles.contentBody}>
                {renderMarkdown(blog.content)}
              </div>
            </article>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={`${styles.sidebarCard} glass-panel`}>
                <h3>Need Admission Guidance?</h3>
                <p>Register for our next classroom demo batches and get physical fitness checkups from instructors.</p>
                <Link href="/contact" className="btn btn-saffron" style={{ width: '100%', marginTop: '1rem', display: 'flex' }}>
                  Register for Demo Class
                </Link>
              </div>
              
              <div className={`${styles.sidebarCard} glass-panel`} style={{ marginTop: '1.5rem' }}>
                <h3>Recruitment Helplines</h3>
                <p>Call Still Academy Admission cell directly for free counseling on uniform entries:</p>
                <div className={styles.helplinePhone}>
                  <a href="tel:+919876543210">📞 +91 98765 43210</a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
