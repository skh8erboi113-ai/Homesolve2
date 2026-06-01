import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/messages/', '/api/'],
    },
    sitemap: 'https://equityarc-production.onrender.com/sitemap.xml',
  };
}
