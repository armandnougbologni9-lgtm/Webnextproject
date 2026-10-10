import React from 'react';
import Header from '../components/Header';
import HeroPinwheel from '../components/HeroPinwheel';
import SpaceGallery from '../components/SpaceGallery';
import TestimonialCard from '../components/TestimonialCard';
import NewsletterForm from '../components/NewsletterForm';
import Footer from '../components/Footer';
import { TESTIMONIALS } from '../data/testimonials';

export default function HomePage() {
  return (
    <>
      {/* 1. HEADER */}
      <Header />

      <main id="main-content">
        {/* 2. HERO — MOULIN À VENT */}
        <HeroPinwheel />

        {/* 3. PRÉSENTATION DE L'ENTREPRISE — TRÈS AÉRÉE */}
        <section className="site-section presentation-section" aria-label="À propos de Cóctel Bonerris">
          <div className="container">
            <div className="presentation-box text-center">
              <span className="badge-sea">Notre Philosophie</span>
              <h2 className="presentation-heading">
                Une parenthèse suspendue au bord de l’océan
              </h2>
              <div className="presentation-divider" aria-hidden="true" />
              <p className="presentation-text text-center-readable">
                Niché directement sur le rivage, Cóctel Bonerris est né d’un désir simple : offrir un refuge de paix où l’on prend le temps de vivre. Ici, pas de précipitation. Notre équipe souriante façonne chaque création avec des ingrédients frais et choisis avec amour. Laissez la brise marine caresser votre visage, écoutez le chant des vagues et savourez l’instant présent.
              </p>
            </div>
          </div>
        </section>

        {/* 4. NOTRE ESPACE — GALERIE EN MOULIN À VENT */}
        <SpaceGallery />

        {/* 5. TÉMOIGNAGES — ÉPURÉS ET SOBRES */}
        <section className="site-section testimonials-section" aria-label="Témoignages de nos hôtes">
          <div className="container">
            <div className="section-header text-center">
              <span className="badge-sea">Partages & Douceur</span>
              <h2 className="section-title">Ce que nos hôtes ressentent</h2>
              <p className="section-subtitle text-center-readable">
                Quelques mots glanés au crépuscule, lorsque la mer s’illumine d’or.
              </p>
            </div>

            <div className="testimonials-grid">
              {TESTIMONIALS.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>

        {/* 6. ABONNEMENT (NEWSLETTER) */}
        <NewsletterForm />
      </main>

      {/* 7. FOOTER */}
      <Footer />
    </>
  );
}
