
import type { Metadata } from 'next';
import { asset } from '../lib/site';
import '@fontsource-variable/manrope/wght.css';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kineli-3d.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: 'SPGGnehQ6qE5FDkV9HfMon2D6GBirOLwmaCb5_dykhk',
  },
  title: 'Kineli | Kinesiología y Psicología',
  description: 'Conoce las especialidades de Kineli y solicita atención por WhatsApp.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Kineli',
    images: [asset('apertura-kineli.webp')],
  },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL">
      <body>{children}</body>
    </html>
  );
}

