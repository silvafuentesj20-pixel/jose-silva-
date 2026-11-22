import type { Metadata } from 'next';
import { asset } from '../lib/site';
import '@fontsource-variable/manrope/wght.css';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title: 'Kineli | Kinesiología y Psicología',
  description: 
verification: {
  google: 'SPGGnehQ6qE5FDkV9HfMon2D6GBirOLwmaCb5_dykhk',
},
'Conoce las especialidades de Kineli y solicita atención por WhatsApp.',
  robots: siteUrl ? { index: true, follow: true } : { index: false, follow: false },
  ...(siteUrl ? {
    metadataBase: new URL(siteUrl),
    alternates: { canonical: siteUrl },
    openGraph: { type: 'website', locale: 'es_CL', siteName: 'Kineli', images: [asset('apertura-kineli.webp')] },
  } : {}),
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-CL"><body>{children}</body></html>;
}
