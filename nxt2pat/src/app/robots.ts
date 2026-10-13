import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/draft'], // Keep local authoring studio private from search indexing
    },
    sitemap: 'https://nxt2pat.dev/sitemap.xml',
  };
}
