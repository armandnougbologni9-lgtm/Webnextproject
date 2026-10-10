import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/Header';
import BarmenSection from '../../components/BarmenSection';
import NewsletterForm from '../../components/NewsletterForm';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Nos Barmen & L’Artisanat au Rez-de-Chaussée — Cóctel Bonerris',
  description:
    'Au rez-de-chaussée, nos barmen vous accueillent en t-shirt avec le sourire, créant chaque cocktail avec minutie dans un calme absolu. Découvrez notre équipe et leurs signatures.',
};

export default function BarmenPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="barmen-page-main">
        <BarmenSection />

        <NewsletterForm />
      </main>

      <Footer />
    </>
  );
}
