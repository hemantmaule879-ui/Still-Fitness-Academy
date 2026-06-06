'use client';

import React, { useState, useEffect } from 'react';
import styles from './EnquiryModal.module.css';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
  type?: 'enquiry' | 'demo';
}

export default function EnquiryModal({ isOpen, onClose, defaultCourse = '', type = 'enquiry' }: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState(defaultCourse);
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultCourse) {
      setCourse(defaultCourse);
    }
  }, [defaultCourse]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          course,
          city,
          message,
          type
        })
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        // Reset form
        setName('');
        setPhone('');
        setEmail('');
        setCity('');
        setMessage('');
      } else {
        setError(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      setError('A network error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} animate-fade-in`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">×</button>
        
        {success ? (
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>✓</div>
            <h3>Jai Hind!</h3>
            <p>Your admission enquiry has been submitted successfully.</p>
            <p>Our training advisors will contact you shortly to schedule your session.</p>
            <button className="btn btn-primary" onClick={() => { setSuccess(false); onClose(); }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.header}>
              <h2>{type === 'demo' ? 'Register for Demo Class' : 'Admission Enquiry'}</h2>
              <p>Prepare for Indian Defence Forces & Gov Exams</p>
            </div>

            {error && <div className={styles.errorAlert}>{error}</div>}

            <div className="form-group">
              <label className="form-label" htmlFor="enq-name">Full Name *</label>
              <input
                id="enq-name"
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="enq-phone">Mobile Number *</label>
              <input
                id="enq-phone"
                type="tel"
                className="form-control"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="enq-email">Email Address</label>
              <input
                id="enq-email"
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="enq-course">Course Interested In *</label>
              <select
                id="enq-course"
                className="form-control"
                style={{ backgroundColor: 'hsl(var(--card-bg))' }}
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              >
                <option value="">Select Course</option>
                <option value="Indian Army Preparation">Indian Army Preparation</option>
                <option value="Police Bharti Preparation">Police Bharti Preparation</option>
                <option value="PSI Preparation">PSI Preparation</option>
                <option value="SSC Preparation">SSC Preparation</option>
                <option value="CDS Preparation">CDS Preparation</option>
                <option value="CAPF Preparation">CAPF Preparation</option>
                <option value="CPO Preparation">CPO Preparation</option>
                <option value="SSB Interview Preparation">SSB Interview Preparation</option>
              </select>
            </div>

            {type === 'demo' ? (
              <div className="form-group">
                <label className="form-label" htmlFor="enq-city">Your City *</label>
                <input
                  id="enq-city"
                  type="text"
                  className="form-control"
                  placeholder="Enter your current city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label" htmlFor="enq-msg">Message / Query</label>
                <textarea
                  id="enq-msg"
                  className="form-control"
                  placeholder="Write your query here..."
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            )}

            <button type="submit" className="btn btn-saffron" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
