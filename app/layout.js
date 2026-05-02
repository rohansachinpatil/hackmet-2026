import { Geist_Mono } from 'next/font/google';
import './globals.css';

const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'HACK::MET 2026 — E-Cell MET Hackathon',
  description:
    '48 hours. 500+ hackers. ₹1,15,000+ in prizes. Join the biggest student innovation sprint in Maharashtra. HACK::MET 2026 by E-Cell MET Institute of Engineering, Nashik.',
  keywords: 'hackathon, MET, Nashik, E-Cell, HACK MET, innovation, 2026',
  openGraph: {
    title: 'HACK::MET 2026 — E-Cell MET Hackathon',
    description: '48 hours. 500+ hackers. ₹1,15,000+ in prizes.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={geistMono.variable}>{children}</body>
    </html>
  );
}
