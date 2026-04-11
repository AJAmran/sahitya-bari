import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.APP_URL || 'https://sahitya-bari.com';
  
  // In a real app, you'd fetch dynamic routes (blogs, videos) from your DB here
  // For now, providing static routes.
  
  const routes = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/videos',
    '/videos/popular',
    '/videos/upcoming',
    '/videos/featured',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
