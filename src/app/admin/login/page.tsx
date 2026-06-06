'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // If already logged in, redirect to admin dashboard
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/login');
        if (res.ok) {
          router.push('/admin');
        }
      } catch (err) {
        // Safe to ignore
      }
    };
    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid administrator email or password.');
      }
    } catch (err) {
      setError('Connection failed. Please check your server status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} glass-panel animate-fade-in`}>
        <div className={styles.header}>
          <h2>STILL FITNESS ACADEMY</h2>
          <span>Admin Command Centre</span>
        </div>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Admin Email ID *</label>
            <input
              id="admin-email"
              type="email"
              className="form-control"
              placeholder="e.g. admin@stillfitnessacademy.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-pass">Access Password *</label>
            <input
              id="admin-pass"
              type="password"
              className="form-control"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-saffron" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Verifying Access...' : 'Login to Dashboard'}
          </button>
        </form>

        <div className={styles.backHome}>
          <a href="/">← Return to Homepage</a>
        </div>
      </div>
    </div>
  );
}
