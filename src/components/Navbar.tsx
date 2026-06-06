'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import EnquiryModal from './EnquiryModal';
import LoginModal from './LoginModal';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/admin/login');
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push('/admin');
    } else {
      setLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    router.push('/admin');
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Courses', href: '/courses' },
    { label: 'Ground Training', href: '/ground-training' },
    { label: 'Classroom', href: '/classroom-training' },
    { label: 'Results', href: '/results' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  if (isLoggedIn) {
    navLinks.push({ label: 'Admin Panel', href: '/admin' });
  }

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`${styles.navContainer} container`}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoStill}>STILL</span>
            <span className={styles.logoFitness}>FITNESS</span>
            <span className={styles.logoAcademy}>ACADEMY</span>
          </Link>

          <nav className={styles.desktopNav}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className={styles.headerCta}>
            <button
              onClick={() => setEnquiryOpen(true)}
              className="btn btn-saffron"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.95rem', marginRight: '1rem' }}
            >
              Join Now
            </button>

            <button
              onClick={handleProfileClick}
              className={`${styles.profileBtn} ${isLoggedIn ? styles.profileLoggedIn : ''}`}
              title={isLoggedIn ? 'Go to Admin Panel' : 'Admin Login'}
              aria-label="Admin Login"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </button>
          </div>

          <button
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isLoggedIn) router.push('/admin');
                else setLoginOpen(true);
              }}
              className={`${styles.mobileProfileBtn} ${isLoggedIn ? styles.mobileProfileLoggedIn : ''}`}
            >
              {isLoggedIn ? '🛡️ Admin Panel' : '🔐 Admin Login'}
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); setEnquiryOpen(true); }}
              className="btn btn-saffron"
              style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
            >
              Join Now
            </button>
          </nav>
        </div>
      </header>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        type="enquiry"
      />

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
