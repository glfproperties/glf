import GoldenLeafApp from '@/components/glf/golden-leaf-app';
import { buildMetadataForSlug } from '@/lib/seo';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: PageProps) {
  const resolved = await params;
  return buildMetadataForSlug(resolved.slug ?? []);
}

export default async function RoutePage({ params }: PageProps) {
  const resolved = await params;
  return <GoldenLeafApp slug={resolved.slug ?? []} />;
}
