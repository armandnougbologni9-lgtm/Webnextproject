import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cocktail House — Vente & Création de Cocktails d’Exception',
  description: 'Découvrez nos cocktails artisanaux haut de gamme pour vos soirées, événements privés et livraisons gourmandes.',
  keywords: ['cocktails', 'mixologie', 'bar à cocktail', 'commande cocktail', 'événement'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
