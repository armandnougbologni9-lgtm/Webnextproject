import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '../../components/Header';
import EnterpriseEventForm from '../../components/EnterpriseEventForm';
import NewsletterForm from '../../components/NewsletterForm';
import Footer from '../../components/Footer';
import {
  GlassWater,
  Building2,
  Sparkles,
  Users,
  ShieldCheck,
  CheckCircle,
  CreditCard,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Entreprises & Grands Événements — Cocktails en Nombre & Location Espace | Cóctel Bonerris',
  description:
    'Commandez des cocktails artisanaux en grand volume ou privatisez notre espace d’exception au bord de l’eau pour vos séminaires, soirées et ateliers professionnels.',
};

export default function EntreprisesPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="corporate-page-main">
        {/* HERO DE L'ESPACE ENTREPRISES */}
        <section className="site-section corporate-hero-section" aria-label="Espace Entreprises et Grands Événements">
          <div className="container">
            <div className="section-header text-center">
              <span className="badge-sea">Solutions Entreprises & B2B</span>
              <h1 className="section-title">Cocktails en Volume & Privatisation d’Espace</h1>
              <p className="section-subtitle text-center-readable">
                Offrez à vos équipes et partenaires une expérience inoubliable bercée par la brise marine, alliant mixologie d’exception et sérénité absolue.
              </p>
            </div>

            {/* LES 2 OFFRES PHARES EN CARTES VITRINES */}
            <div className="corporate-offers-grid">
              <div className="corporate-offer-card">
                <div className="offer-image-container">
                  <Image
                    src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
                    alt="Barmen préparant des cocktails en grand nombre pour un événement d’entreprise"
                    width={560}
                    height={340}
                    className="offer-image"
                  />
                  <div className="offer-badge-pill">Grands Volumes</div>
                </div>

                <div className="offer-content">
                  <div className="offer-icon-wrapper">
                    <GlassWater size={26} />
                  </div>
                  <h2 className="offer-title">Commandes de Cocktails en Grand Nombre</h2>
                  <p className="offer-desc text-readable">
                    Packs sur-mesure à partir de 25, 50, 100 à plus de 500 cocktails. Bouteilles scellées avec soin, glaçons purs et garnitures fraîches fournis.
                  </p>

                  <ul className="offer-features-list">
                    <li>
                      <CheckCircle size={16} className="feature-check-icon" />
                      <span>Formules avec barmen en t-shirt sur votre site</span>
                    </li>
                    <li>
                      <CheckCircle size={16} className="feature-check-icon" />
                      <span>Cocktails avec alcool et mocktails d’artisan</span>
                    </li>
                    <li>
                      <CheckCircle size={16} className="feature-check-icon" />
                      <span>Dégustation préalable offerte dès 80 verres</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="corporate-offer-card">
                <div className="offer-image-container">
                  <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                    alt="Espace professionnel privatisable avec vue panoramique sur l’océan pour séminaires d’entreprise"
                    width={560}
                    height={340}
                    className="offer-image"
                  />
                  <div className="offer-badge-pill">Privatisation Complète</div>
                </div>

                <div className="offer-content">
                  <div className="offer-icon-wrapper">
                    <Building2 size={26} />
                  </div>
                  <h2 className="offer-title">Location de l’Espace Pro (Vue Mer)</h2>
                  <p className="offer-desc text-readable">
                    Une salle d’exception baignée de lumière naturelle au bord de l’eau pour vos séminaires, lancements de produit, réceptions et assemblées générales.
                  </p>

                  <ul className="offer-features-list">
                    <li>
                      <CheckCircle size={16} className="feature-check-icon" />
                      <span>Vue panoramique sur l’océan & terrasse privative</span>
                    </li>
                    <li>
                      <CheckCircle size={16} className="feature-check-icon" />
                      <span>Wifi fibre, écran de projection et sonorisation</span>
                    </li>
                    <li>
                      <CheckCircle size={16} className="feature-check-icon" />
                      <span>Accès exclusif à la plage privée Cóctel Bonerris</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION FORMULAIRE DÉDIÉ */}
        <section className="site-section corporate-form-section" aria-label="Formulaire de demande de devis entreprise">
          <div className="container">
            <EnterpriseEventForm />
          </div>
        </section>

        {/* SECTION PAIEMENT FEDAPAY SÉCURISÉ */}
        <section className="site-section corporate-fedapay-section" aria-label="Modalités de paiement sécurisé">
          <div className="container">
            <div className="fedapay-highlight-card text-center">
              <div className="fedapay-badge">
                <CreditCard size={20} />
                <span>Passerelle Officielle FedaPay</span>
              </div>
              <h2 className="fedapay-card-title">Règlement Simplifié & Sécurisé</h2>
              <p className="fedapay-card-desc text-center-readable">
                Pour le règlement immédiat de cocktails à l’unité, d’acomptes ou de commandes validées, vous pouvez effectuer votre paiement sécurisé directement via le lien officiel ci-dessous.
              </p>
              <div className="fedapay-btn-row">
                <a
                  href="https://me.fedapay.com/Cocktails"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <CreditCard size={18} />
                  <span>Accéder à la page de paiement FedaPay</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <NewsletterForm />
      </main>

      <Footer />
    </>
  );
}
