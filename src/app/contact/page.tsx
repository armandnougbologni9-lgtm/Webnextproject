import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Header from '../../components/Header';
import SectionTitle from '../../components/SectionTitle';
import ContactForm from '../../components/ContactForm';
import NewsletterForm from '../../components/NewsletterForm';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Contact & Commande — Cóctel Bonerris',
  description: 'Commandez vos cocktails artisanaux, réservez une table face à l’océan ou privatisez notre espace professionnel au bord de la mer.',
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="contact-page-main">
        <section className="site-section contact-section" aria-label="Formulaire de contact et commande">
          <div className="container">
            {/* TITRE AÉRÉ DANS LE MÊME STYLE QUE L'ACCUEIL */}
            <SectionTitle
              badge="À Votre Écoute"
              title="Commander & Nous Contacter"
              subtitle="Que ce soit pour déguster un verre les pieds dans le sable, organiser un événement privé ou réserver l’espace professionnel, écrivez-nous en toute simplicité."
            />

            {/* FORMULAIRE DE CONTACT AVEC SUSPENSE POUR SEARCH PARAMS */}
            <Suspense fallback={<div className="contact-loading">Préparation du formulaire...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </section>

        {/* ABONNEMENT NEWSLETTER AVANT LE FOOTER */}
        <NewsletterForm />
      </main>

      <Footer />
    </>
  );
}
