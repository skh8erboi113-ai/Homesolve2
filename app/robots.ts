import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/messages/', '/api/'],
    },
    sitemap: 'https://studio-4450623487-72853.web.app/sitemap.xml',
  };
}
