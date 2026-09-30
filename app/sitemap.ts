import type { MetadataRoute } from 'next';
import { contactConfig, seedCmsData } from '@/lib/cms-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = contactConfig.domain;
  const staticRoutes = [
    '',
    '/projects',
    '/locations',
    '/developers',
    '/insights',
    '/about',
    '/trust',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
  ];
  const urls = [
    ...staticRoutes,
    ...seedCmsData.projects.map((project) => `/projects/${project.slug}`),
    ...seedCmsData.locations.map((location) => `/properties/${location.slug}`),
    ...seedCmsData.developers.map((developer) => `/developers/${developer.slug}`),
    ...seedCmsData.propertyTypes.map((type) => `/${type.slug}`),
    ...seedCmsData.articles.map((article) => `/insights/${article.slug}`),
  ];

  return urls.map((url) => ({
    url: `${base}${url}`,
    lastModified: new Date('2026-09-22'),
    changeFrequency: url === '' ? 'daily' : 'weekly',
    priority: url === '' ? 1 : 0.72,
  }));
}
