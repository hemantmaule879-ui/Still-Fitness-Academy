'use client';

import React, { useState } from 'react';
import styles from './FloatingElements.module.css';
import EnquiryModal from './EnquiryModal';

export default function FloatingElements() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.floatingContainer}>
        {/* WhatsApp Chat Button */}
        <a
          href="https://wa.me/919876543210?text=Jai%20Hind%20Still%20Fitness%20Academy%21%20I%20am%20interested%20in%20admission%20details%20for%20coaching."
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.floatingBtn} ${styles.whatsapp}`}
          title="Chat on WhatsApp"
        >
          {/* Custom SVG Icon for WhatsApp */}
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.233-1.371a9.946 9.946 0 004.777 1.216h.005c5.505 0 9.989-4.478 9.99-9.984a9.98 9.98 0 00-9.993-9.861zm0 18.286c-1.637 0-3.222-.44-4.604-1.268l-.33-.195-3.424.897.915-3.333-.215-.341a8.27 8.27 0 01-1.266-4.394c.001-4.567 3.72-8.281 8.289-8.281a8.276 8.276 0 018.285 8.289c-.001 4.568-3.72 8.282-8.289 8.282zm4.542-6.195c-.249-.124-1.472-.724-1.699-.806-.226-.083-.391-.124-.555.124-.165.247-.638.805-.783.971-.144.165-.289.186-.538.062a6.764 6.764 0 01-1.997-1.228 7.458 7.458 0 01-1.383-1.718c-.144-.247-.015-.38.11-.504.112-.112.248-.289.372-.434.124-.144.165-.248.248-.413.082-.165.041-.31-.021-.433-.062-.124-.555-1.339-.76-1.833-.199-.481-.401-.416-.554-.424-.144-.007-.31-.007-.476-.007a.916.916 0 00-.66.309c-.227.248-.867.846-.867 2.062s.888 2.392.986 2.52c.1.13 1.747 2.658 4.233 3.722.592.253 1.053.405 1.412.518.594.189 1.134.162 1.562.099.476-.072 1.472-.601 1.678-1.178.207-.577.207-1.073.144-1.178-.062-.103-.226-.165-.475-.29z"/>
          </svg>
        </a>

        {/* Call Now Button */}
        <a
          href="tel:+919876543210"
          className={`${styles.floatingBtn} ${styles.call}`}
          title="Call Still Fitness Academy"
        >
          {/* Custom SVG Icon for Telephone */}
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </a>

        {/* Enquiry Button */}
        <button
          onClick={() => setModalOpen(true)}
          className={`${styles.floatingBtn} ${styles.enquiry}`}
          title="Admission Enquiry"
          aria-label="Open admission enquiry form"
        >
          {/* Custom SVG Icon for Document/Pencil */}
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm0 8H7v-2h10v2z"/>
          </svg>
        </button>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type="enquiry"
      />
    </>
  );
}
