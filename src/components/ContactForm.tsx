'use client';

import React, { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
          message,
          type: 'enquiry'
        })
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setName('');
        setPhone('');
        setEmail('');
        setCourse('');
        setMessage('');
      } else {
        setError(data.error || 'Failed to submit enquiry. Please verify details.');
      }
    } catch (err) {
      setError('Connection failed. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.formCard} glass-panel`}>
      {success ? (
        <div className={styles.successState}>
          <div className={styles.successIcon}>✓</div>
          <h3>Message Sent!</h3>
          <p>Jai Hind! Your enquiry has been recorded in our database.</p>
          <p>Our academic counselor will contact you via phone or email shortly.</p>
          <button className="btn btn-saffron" onClick={() => setSuccess(false)}>
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3>Send Us a Message</h3>
          <p className={styles.subtitle}>Get in touch for admissions, syllabus, or hostel queries</p>
          
          {error && <div className={styles.errorText}>{error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">Your Full Name *</label>
            <input
              id="contact-name"
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.row}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label" htmlFor="contact-phone">Mobile Number *</label>
              <input
                id="contact-phone"
                type="tel"
                className="form-control"
                placeholder="10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label" htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-course">Course Interested In *</label>
            <select
              id="contact-course"
              className="form-control"
              style={{ backgroundColor: 'hsl(var(--card-bg))' }}
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            >
              <option value="">Choose Course</option>
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

          <div className="form-group">
            <label className="form-label" htmlFor="contact-msg">Message / Detail Query *</label>
            <textarea
              id="contact-msg"
              className="form-control"
              placeholder="Describe your query or physical condition details..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Sending Message...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}
