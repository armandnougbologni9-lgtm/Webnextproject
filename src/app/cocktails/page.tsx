import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/Header';
import SectionTitle from '../../components/SectionTitle';
import CocktailPager from '../../components/CocktailPager';
import NewsletterForm from '../../components/NewsletterForm';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'La Carte des Cocktails (35 Créations) — Cóctel Bonerris',
  description: 'Découvrez notre collection complète de 35 cocktails artisanaux inspirés de l’océan. Présentation magazine aérée, 3 verres par page.',
};

export default function CocktailsPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="cocktails-page-main sky-clouds-mobile">
        <section className="site-section cocktails-catalog-section" aria-label="Carte des cocktails">
          <div className="container">
            {/* TITRE AÉRÉ DANS LE MÊME STYLE QUE L'ACCUEIL */}
            <SectionTitle
              badge="La Collection Complète"
              title="Nos Créations Artisanales"
              subtitle="Une sélection de 35 nectars pensés pour éveiller les sens au murmure de l’océan. Feuilletez notre carte comme un magazine d’art."
            />

            {/* CATALOGUE MAGAZINE : 3 COCKTAILS PAR PAGE */}
            <CocktailPager />
          </div>
        </section>

        {/* ABONNEMENT NEWSLETTER AVANT LE FOOTER */}
        <NewsletterForm />
      </main>

      <Footer />
    </>
  );
}
