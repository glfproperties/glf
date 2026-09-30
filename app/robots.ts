import type { MetadataRoute } from 'next';
import { contactConfig } from '@/lib/cms-data';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/campaign'],
      },
    ],
    sitemap: `${contactConfig.domain}/sitemap.xml`,
  };
}
