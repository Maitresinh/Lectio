import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lectio - Plateforme de lecture collaborative',
  description: 'Une alternative open source aux plateformes comme Glose',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}