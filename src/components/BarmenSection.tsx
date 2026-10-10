'use client';

import React, { useState } from 'react';
import { BARMEN_TEAM } from '../data/barmen';
import BarmanCard from './BarmanCard';
import ImageLightbox, { LightboxImageItem } from './ImageLightbox';
import { Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function BarmenSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const lightboxItems: LightboxImageItem[] = BARMEN_TEAM.map((b) => ({
    id: b.id,
    image: b.image,
    title: `${b.name} — ${b.role}`,
    subtitle: 'En service au rez-de-chaussée de Cóctel Bonerris',
    tag: b.role,
    description: b.description,
    alt: b.alt,
  }));

  const handleOpenPhoto = (index: number) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* SECTION PRÉSENTATION DU REZ-DE-CHAUSSÉE */}
      <section className="site-section barmen-hero-section" aria-label="Présentation du rez-de-chaussée et de nos barmen">
        <div className="container">
          <div className="barmen-hero-intro text-center">
            <span className="badge-sea">L’Artisanat au Rez-de-Chaussée</span>
            <h1 className="barmen-hero-title">
              Nos Barmen & L’Âme du Lieu
            </h1>
            <div className="presentation-divider" aria-hidden="true" />

            <p className="barmen-hero-lead text-center-readable">
              Au rez-de-chaussée, nos barmen vous accueillent en t-shirt avec le sourire, créant chaque cocktail avec minutie dans un calme absolu.
            </p>

            <p className="barmen-hero-subtext text-center-readable">
              L’étage supérieur demeure un havre discret, réservé à l’équipe qui veille au soin et à l’harmonie de notre maison. Au rez-de-chaussée, face à la brise marine, notre comptoir est un sanctuaire de convivialité décontractée où chaque client est reçu comme un ami précieux.
            </p>

            {/* TROIS PILIERS DE L'EXPÉRIENCE AU COMPTOIR */}
            <div className="barmen-pillars-grid">
              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <HeartHandshake size={24} />
                </div>
                <h3 className="pillar-title">Tenue décontractée & Sourire</h3>
                <p className="pillar-desc">
                  Nos barmen en t-shirt en lin naturel brisent toute froideur pour vous offrir un accueil chaleureux et sincère.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <Sparkles size={24} />
                </div>
                <h3 className="pillar-title">Minutie & Calme Absolu</h3>
                <p className="pillar-desc">
                  Chaque zeste taillé, chaque glaçon cristallin et chaque goutte infusée sont travaillés avec un soin d’horloger.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="pillar-title">Étage Privé Préservé</h3>
                <p className="pillar-desc">
                  Le calme règne au rez-de-chaussée car l’étage supérieur abrite discrètement la logistique et le repos de notre équipe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION LISTE DES BARMEN AVEC LEURS SIGNATURES */}
      <section className="site-section barmen-list-section" aria-label="Nos barmen et leurs signatures">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge-sea">Maîtres du Verre</span>
            <h2 className="section-title">Rencontrez Notre Équipe</h2>
            <p className="section-subtitle text-center-readable">
              Chaque barman apporte sa touche poétique et signe une création emblématique sous sa description.
            </p>
          </div>

          <div className="barmen-cards-stack">
            {BARMEN_TEAM.map((barman, index) => (
              <BarmanCard
                key={barman.id}
                barman={barman}
                index={index}
                onOpenPhoto={handleOpenPhoto}
              />
            ))}
          </div>
        </div>
      </section>

      {/* VISIONNEUSE PLEIN ÉCRAN AVEC FONDU ET ZOOM */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={lightboxItems}
        currentIndex={activePhotoIndex}
        onIndexChange={setActivePhotoIndex}
      />
    </>
  );
}
