import type { Metadata, Viewport } from 'next';
import {
  DM_Serif_Display,
  Plus_Jakarta_Sans,
  Space_Mono,
  Bai_Jamjuree,
  Trirong,
  IBM_Plex_Sans_Thai,
} from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AppSearch } from '@/components/layout/AppSearch';
import { PwaInstallPrompt } from '@/components/pwa/PwaInstallPrompt';
import { BackToTop } from '@/components/ui/BackToTop';
import { getAllProjects, getAllPosts } from '@/lib/content';
import type { SearchableItem } from '@/lib/search';
import './globals.css';

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

const baiJamjuree = Bai_Jamjuree({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  variable: '--font-bai-jamjuree',
  display: 'swap',
});

const trirong = Trirong({
  weight: ['400', '600', '700'],
  subsets: ['latin', 'thai'],
  variable: '--font-trirong',
  display: 'swap',
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  variable: '--font-ibm-plex-sans-thai',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Nxt2Pat — Systems & Creative Web Engineering',
    template: '%s | Nxt2Pat',
  },
  description: 'Personal engineering portfolio and technical devlogs by Nxt2Pat. Specializing in embedded IoT telemetry, lightweight desktop tools, and zero-database PWA architecture.',
  metadataBase: new URL('https://nxt2pat.dev'),
  keywords: ['Nxt2Pat', 'Systems Engineer', 'PWA', 'Next.js', 'Bun', 'Neutralino', 'Rust', 'ESP32', 'IoT', 'Portfolio'],
  authors: [{ name: 'Nxt2Pat', url: 'https://nxt2pat.dev' }],
  creator: 'Nxt2Pat',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Nxt2Pat',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nxt2pat.dev',
    title: 'Nxt2Pat — Systems & Creative Web Engineering',
    description: 'High-performance portfolio & engineering devlogs. Zero database, sub-100ms speed, and offline capability.',
    siteName: 'Nxt2Pat',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nxt2Pat — Systems & Creative Web Engineering',
    description: 'High-performance portfolio & engineering devlogs. Zero database, sub-100ms speed, and offline capability.',
    creator: '@nxt2pat',
  },
};

export const viewport: Viewport = {
  themeColor: '#6B5EE4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = getAllProjects();
  const posts = getAllPosts();
  const searchItems: SearchableItem[] = [
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      title: p.title,
      subtitle: p.tagline,
      url: `/projects/${p.slug}`,
      type: 'project' as const,
      category: p.category,
      tags: p.techStack,
    })),
    ...posts.map((p) => ({
      id: `post-${p.slug}`,
      title: p.title,
      subtitle: p.excerpt,
      url: `/blog/${p.slug}`,
      type: 'devlog' as const,
      category: p.category,
      tags: p.tags,
    })),
  ];

  return (
    <html
      lang="th"
      className={`${dmSerif.variable} ${plusJakarta.variable} ${spaceMono.variable} ${baiJamjuree.variable} ${trirong.variable} ${ibmPlexSansThai.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cosmos text-deep selection:bg-ink/20 selection:text-ink">
        <Navbar />
        <AppSearch items={searchItems} />
        <main className="flex-1">{children}</main>
        <PwaInstallPrompt />
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
