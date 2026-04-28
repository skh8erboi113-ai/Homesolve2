import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://studio-4450623487-72853.web.app';

  // Base routes
  const routes = [
    '',
    '/about',
    '/properties',
    '/list-property',
    '/investor-join',
    '/pricing',
    '/privacy',
    '/terms',
    '/contact',
    '/auth',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Note: For a real production app, you would fetch all active property IDs
  // from Firestore here and map them to /properties/[id] URLs.

  return [...routes];
}
