import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cóctel Bonerris — Bar & Créations de Cocktails au Bord de la Mer',
  description: 'Maison de cocktails artisanaux au bord de l’océan. Paix, brise marine, légèreté et saveurs authentiques bercées par le chant des vagues.',
  keywords: ['cocktails bord de mer', 'Cóctel Bonerris', 'bar à cocktails', 'mixologie', 'événement plage', 'lounge'],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
