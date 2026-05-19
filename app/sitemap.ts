import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://studio-4450623487-72853.web.app';

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

  return [...routes];
}
