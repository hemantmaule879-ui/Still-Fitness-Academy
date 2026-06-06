import React from 'react';
import ContactForm from '@/components/ContactForm';
import FAQAccordion from '@/components/FAQAccordion';
import styles from './page.module.css';

export default function ContactPage() {
  const contactInfo = [
    {
      title: 'Academy Training Ground',
      value: 'Still Fitness Academy Ground, VIP Road, Near Parade Ground, Pune, Maharashtra - 411001',
      icon: '📍'
    },
    {
      title: 'Admission Helplines',
      value: '+91 98765 43210 / +91 98765 43211',
      icon: '📞',
      link: 'tel:+919876543210'
    },
    {
      title: 'Official Email Support',
      value: 'info@stillfitnessacademy.in',
      icon: '✉️',
      link: 'mailto:info@stillfitnessacademy.in'
    }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Page Header */}
      <section className={styles.headerBanner} style={{ backgroundImage: `linear-gradient(to right, rgba(10, 35, 66, 0.9), rgba(9, 11, 14, 0.95)), url('/images/hero_bg.png')` }}>
        <div className="container">
          <span className={styles.subtitle}>Get in Touch</span>
          <h1 className={styles.title}>Contact Us</h1>
        </div>
      </section>

      {/* Contact Form and Details */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            {/* Left Column: Coordinates */}
            <div className={styles.infoColumn}>
              <span className="section-subtitle">Reach Us Direct</span>
              <h2 className="section-title" style={{ display: 'block', width: 'fit-content' }}>Our Head Office</h2>
              <p className={styles.introText}>
                We are open 7 days a week. Candidates and parents are welcome to visit our coaching office and inspect the training track under appointment.
              </p>

              <div className={styles.cards}>
                {contactInfo.map((info, idx) => (
                  <div key={idx} className={`${styles.infoCard} glass-panel`}>
                    <span className={styles.cardIcon}>{info.icon}</span>
                    <div className={styles.cardText}>
                      <h3>{info.title}</h3>
                      {info.link ? (
                        <a href={info.link}>{info.value}</a>
                      ) : (
                        <p>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct WhatsApp Button */}
              <div style={{ marginTop: '2.5rem' }}>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Still%20Fitness%20Academy%2C%20I%20want%20to%20enquire%20about%20admissions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-saffron"
                  style={{ gap: '0.75rem', display: 'inline-flex' }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.233-1.371a9.946 9.946 0 004.777 1.216h.005c5.505 0 9.989-4.478 9.99-9.984a9.98 9.98 0 00-9.993-9.861zm0 18.286c-1.637 0-3.222-.44-4.604-1.268l-.33-.195-3.424.897.915-3.333-.215-.341a8.27 8.27 0 01-1.266-4.394c.001-4.567 3.72-8.281 8.289-8.281a8.276 8.276 0 018.285 8.289c-.001 4.568-3.72 8.282-8.289 8.282zm4.542-6.195c-.249-.124-1.472-.724-1.699-.806-.226-.083-.391-.124-.555.124-.165.247-.638.805-.783.971-.144.165-.289.186-.538.062a6.764 6.764 0 01-1.997-1.228 7.458 7.458 0 01-1.383-1.718c-.144-.247-.015-.38.11-.504.112-.112.248-.289.372-.434.124-.144.165-.248.248-.413.082-.165.041-.31-.021-.433-.062-.124-.555-1.339-.76-1.833-.199-.481-.401-.416-.554-.424-.144-.007-.31-.007-.476-.007a.916.916 0 00-.66.309c-.227.248-.867.846-.867 2.062s.888 2.392.986 2.52c.1.13 1.747 2.658 4.233 3.722.592.253 1.053.405 1.412.518.594.189 1.134.162 1.562.099.476-.072 1.472-.601 1.678-1.178.207-.577.207-1.073.144-1.178-.062-.103-.226-.165-.475-.29z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Integration */}
      <section className={styles.mapSection}>
        <div className="container">
          <div className="section-title-wrapper" style={{ marginBottom: '2.5rem' }}>
            <span className="section-subtitle">Location Map</span>
            <h2 className="section-title">Find Us on Google Maps</h2>
          </div>
          
          <div className={styles.mapBox}>
            <iframe
              title="Still Fitness Academy Pune Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m18!1m2!1s0x3bc2c14041d8e137%3A0x8e8334a1b0be2ee5!2sPune%2C%20Maharashtra!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion />
        </div>
      </section>
    </div>
  );
}
