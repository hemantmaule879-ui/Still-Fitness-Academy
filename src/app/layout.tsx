import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import BackgroundAnimations from '@/components/BackgroundAnimations';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: 'Still Fitness Academy - Transform Your Dream Into a Uniform',
  description: 'India\'s Premier Training Institute preparing candidates for the Indian Defence Forces and Government Competitive Examinations (Army, Police, PSI, SSC GD, CDS, CAPF, CPO & SSB).',
  keywords: 'Army Coaching Institute, Police Bharti Training, PSI Coaching, CDS Coaching, CAPF Coaching, SSB Training, Government Exam Coaching, Defence Academy, Still Fitness Academy',
  authors: [{ name: 'Still Fitness Academy' }],
  robots: 'index, follow'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BackgroundAnimations />
        <Navbar />
        <main style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        <Footer />
        <FloatingElements />
      </body>
    </html>
  );
}
