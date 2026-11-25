import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@frontend/components/layout/Navbar';
import Footer from '@frontend/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Traverse BD — Journeys Across Bangladesh',
  description:
    'Discover Bangladesh’s premier destinations and curated tour packages with Traverse BD. Explore Cox’s Bazar, Sajek Valley, Sreemangal, Sundarbans and beyond.',
  keywords: [
    'Bangladesh Tourism',
    'Tour Packages Bangladesh',
    'Coxs Bazar',
    'Sajek Valley',
    'Sundarbans Safari',
    'Traverse BD',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-on-surface min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
