import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Golden Leaf Properties | Your Gateway to India’s Finest Real Estate',
    template: '%s',
  },
  description:
    'Discover curated luxury homes, villas, plots, second homes and investment opportunities across India’s most promising property markets.',
  metadataBase: new URL('https://glfproperties.in'),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
