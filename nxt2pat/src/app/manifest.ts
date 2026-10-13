import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nxt2Pat — Systems & Creative Web Software',
    short_name: 'Nxt2Pat',
    description: 'High-performance offline-first portfolio and technical engineering devlogs by Nxt2Pat.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F6FF',
    theme_color: '#6B5EE4',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['portfolio', 'technology', 'developer', 'productivity'],
  };
}
