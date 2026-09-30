import GoldenLeafApp from '@/components/glf/golden-leaf-app';
import { buildMetadataForSlug } from '@/lib/seo';

export const metadata = buildMetadataForSlug([]);

export default function Home() {
  return <GoldenLeafApp slug={[]} />;
}
