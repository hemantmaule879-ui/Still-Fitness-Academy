'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Ground Training', href: '/ground-training' },
    { label: 'Classroom Coaching', href: '/classroom-training' },
    { label: 'Results & Ranks', href: '/results' },
    { label: 'Photo Gallery', href: '/gallery' },
    { label: 'Updates & Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' }
  ];

  const coursesList = [
    { label: 'Indian Army Preparation', href: '/courses#army' },
    { label: 'Police Bharti Preparation', href: '/courses#police' },
    { label: 'PSI Training', href: '/courses#psi' },
    { label: 'SSC GD Coaching', href: '/courses#ssc' },
    { label: 'CDS Preparation', href: '/courses#cds' },
    { label: 'SSB Interview Guidance', href: '/courses#ssb' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.footerGrid}>
          {/* Column 1: Brand Info */}
          <div className={styles.columnBrand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoStill}>STILL</span>
              <span className={styles.logoFitness}>FITNESS</span>
              <span className={styles.logoAcademy}>ACADEMY</span>
            </Link>
            <p className={styles.tagline}>
              "Discipline. Dedication. Determination. Success."
            </p>
            <p className={styles.brandDesc}>
              India's premier training institute preparing students for the Indian Defence Forces and Government Competitive Examinations. We build physical power and academic strength.
            </p>
            
            {/* Social Links */}
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <span>FB</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <span>IG</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">
                <span>YT</span>
              </a>
              <a href="https://wa.me/919876543210" className={styles.socialLink} aria-label="WhatsApp">
                <span>WA</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.columnLinks}>
            <h3>Quick Links</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Courses */}
          <div className={styles.columnLinks}>
            <h3>Our Courses</h3>
            <ul className={styles.linksList}>
              {coursesList.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details & Google Maps */}
          <div className={styles.columnContact}>
            <h3>Contact Info</h3>
            <ul className={styles.contactDetails}>
              <li>
                <strong>Address:</strong> Still Fitness Academy ground, VIP Road, Near Parade Ground, Pune, Maharashtra - 411001
              </li>
              <li>
                <strong>Call Now:</strong> <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
              <li>
                <strong>Email:</strong> <a href="mailto:info@stillfitnessacademy.in">info@stillfitnessacademy.in</a>
              </li>
            </ul>

            {/* Google Map Embedded Iframe */}
            <div className={styles.mapContainer}>
              <iframe
                title="Still Fitness Academy Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m18!1m2!1s0x3bc2c14041d8e137%3A0x8e8334a1b0be2ee5!2sPune%2C%20Maharashtra!5m2!1sen!2sin"
                width="100%"
                height="120"
                style={{ border: 0, borderRadius: 'var(--radius-sm)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright bar */}
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} Still Fitness Academy. All Rights Reserved.</p>
          <div className={styles.bottomBarLinks}>
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms & Conditions</a>
            <span>|</span>
            <Link href="/admin">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
