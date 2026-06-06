'use client';

import React, { useState, useEffect } from 'react';
import styles from './LoginModal.module.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isOpen) { setEmail(''); setPassword(''); setError(''); setLoading(false); }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) { onLoginSuccess(); onClose(); }
      else setError(data.error || 'Incorrect email or password. Please try again.');
    } catch { setError('Connection error. Please try again.'); }
    finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.logoMark}>
            <span className={styles.logoS}>S</span>
            <span className={styles.logoF}>F</span>
            <span className={styles.logoA}>A</span>
          </div>
          <h2 className={styles.modalTitle}>Welcome Back</h2>
          <p className={styles.modalSubtitle}>Sign in to Still Fitness Academy</p>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label='Close'>&#x2715;</button>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorBox}>{error}</div>}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor='login-email'>Email Address</label>
            <input id='login-email' type='email' className={styles.input}
              placeholder='Enter your email address'
              value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor='login-password'>Password</label>
            <div className={styles.inputWrap}>
              <input id='login-password' type={showPassword ? 'text' : 'password'}
                className={styles.input} placeholder='Enter your password'
                value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type='button' className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label='Toggle password'>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type='submit' className={styles.submitBtn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className={styles.hint}>Your credentials are encrypted and secure</p>
      </div>
    </div>
  );
}
