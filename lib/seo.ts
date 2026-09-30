import type { Metadata } from 'next';
import {
  contactConfig,
  findArticle,
  findDeveloper,
  findLocation,
  findProject,
  findPropertyType,
  seedCmsData,
} from '@/lib/cms-data';

const title = 'Golden Leaf Properties | Your Gateway to India’s Finest Real Estate';
const description =
  'Discover curated luxury homes, villas, plots, second homes and investment opportunities across India’s most promising property markets.';

function canonicalFor(slug: string[]) {
  const path = slug.length > 0 ? `/${slug.join('/')}` : '/';
  return new URL(path, contactConfig.domain).toString();
}

export function buildMetadataForSlug(slug: string[] = []): Metadata {
  const path = slug.join('/');
  let pageTitle = title;
  let pageDescription = description;
  let image =
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80';

  if (slug[0] === 'projects' && slug[1]) {
    const project = findProject(seedCmsData, slug[1]);
    if (project) {
      pageTitle = project.seoTitle;
      pageDescription = project.seoDescription;
      image = project.heroImage;
    }
  } else if (slug[0] === 'properties' && slug[1]) {
    const location = findLocation(seedCmsData, slug[1]);
    if (location) {
      pageTitle = location.seoTitle;
      pageDescription = location.seoDescription;
      image = location.image;
    }
  } else if (slug[0] === 'developers' && slug[1]) {
    const developer = findDeveloper(seedCmsData, slug[1]);
    if (developer) {
      pageTitle = developer.seoTitle;
      pageDescription = developer.seoDescription;
    }
  } else if (slug[0] === 'insights' && slug[1]) {
    const article = findArticle(seedCmsData, slug[1]);
    if (article) {
      pageTitle = article.seoTitle;
      pageDescription = article.seoDescription;
      image = article.image;
    }
  } else if (slug.length === 1) {
    const propertyType = findPropertyType(seedCmsData, slug[0]);
    if (propertyType) {
      pageTitle = propertyType.seoTitle;
      pageDescription = propertyType.seoDescription;
      image = propertyType.image;
    }
  }

  if (path === 'projects') {
    pageTitle = 'Curated Property Projects | Golden Leaf Properties';
    pageDescription =
      'Browse premium apartments, villas, plots, second homes and destination properties curated by Golden Leaf Properties.';
  }

  if (path === 'locations') {
    pageTitle = 'Premium Property Locations | Golden Leaf Properties';
    pageDescription =
      'Explore selected Indian property markets including Goa, Dholera, Dehradun, Jewar, Noida, Gurgaon and Delhi NCR.';
  }

  if (path === 'developers') {
    pageTitle = 'Developer Directory | Golden Leaf Properties';
    pageDescription =
      'View CMS-managed developer pages with public authorization badges controlled by Golden Leaf administrators.';
  }

  if (path === 'trust') {
    pageTitle = 'Trust Centre | Golden Leaf Properties';
    pageDescription =
      'Review Golden Leaf company information, compliance controls, RERA handling, privacy, disclaimers and verification workflows.';
  }

  if (path === 'admin') {
    pageTitle = 'Admin Preview | Golden Leaf Properties';
    pageDescription =
      'A local admin preview for project management, lead CRM, media, homepage control and compliance workflows.';
  }

  return {
    metadataBase: new URL(contactConfig.domain),
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalFor(slug),
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalFor(slug),
      siteName: 'Golden Leaf Properties',
      images: [{ url: image, width: 1200, height: 630, alt: pageTitle }],
      locale: 'en_IN',
      type: slug[0] === 'insights' && slug[1] ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
  };
}
