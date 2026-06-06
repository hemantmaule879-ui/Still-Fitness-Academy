'use client';

import React, { useState } from 'react';
import styles from './LeadForm.module.css';

export default function LeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [city, setCity] = useState('');
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
          course,
          city,
          type: 'demo'
        })
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setName('');
        setPhone('');
        setCourse('');
        setCity('');
      } else {
        setError(data.error || 'Failed to submit form. Please check input values.');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      {success ? (
        <div className={styles.successState}>
          <div className={styles.successIcon}>✓</div>
          <h3>Registration Successful!</h3>
          <p>Jai Hind! We have reserved your seat for the next Free Demo Batch.</p>
          <p>Our team will call you within 24 hours with schedule details.</p>
          <button className="btn btn-saffron" onClick={() => setSuccess(false)}>
            Register Another Candidate
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3 className={styles.formTitle}>Book Your Free Demo Class</h3>
          <p className={styles.formSubtitle}>Experience our ground & classroom sessions live</p>
          
          {error && <div className={styles.errorText}>{error}</div>}

          <div className={styles.formGrid}>
            <div className="form-group">
              <label className="form-label" htmlFor="lead-name">Candidate Name *</label>
              <input
                id="lead-name"
                type="text"
                className="form-control"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lead-phone">Mobile Number *</label>
              <input
                id="lead-phone"
                type="tel"
                className="form-control"
                placeholder="10-digit phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lead-course">Select Target Course *</label>
              <select
                id="lead-course"
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
              <label className="form-label" htmlFor="lead-city">City / Location *</label>
              <input
                id="lead-city"
                type="text"
                className="form-control"
                placeholder="Your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-saffron" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Processing Registration...' : 'Register Now'}
          </button>
        </form>
      )}
    </div>
  );
}
