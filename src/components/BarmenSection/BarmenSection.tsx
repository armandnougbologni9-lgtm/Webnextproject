'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Sparkles, GlassWater, ArrowRight, Star } from 'lucide-react';
import styles from './BarmenSection.module.css';

interface Barman {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  quote: string;
  bio: string;
  specialties: string[];
  signatureCocktail: {
    name: string;
    id: string;
  };
}

const BARMEN: Barman[] = [
  {
    id: 'armand',
    name: 'Armand Nougbologni',
    role: 'Chef Mixologue & Fondateur',
    experience: '12 ans d’artisanat',
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80',
    quote: '« Un grand cocktail est une symphonie où chaque goutte doit susciter une émotion inoubliable. »',
    bio: 'Formé auprès des maîtres distillateurs et palaces parisiens, Armand conçoit nos infusions secrètes, nos fumages au bois de chêne et veille à l’excellence de chaque recette de notre carte de 35 nectars.',
    specialties: ['Vieillissement en fût', 'Cocktails clarifiés', 'Équilibres d’amers'],
    signatureCocktail: {
      name: 'Le Smoking Old Fashioned',
      id: 'old-fashioned',
    },
  },
  {
    id: 'malik',
    name: 'Malik Alami',
    role: 'Maître Flair Bartender & Alchimiste',
    experience: '8 ans de show & scène',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    quote: '« Le cocktail est un spectacle vivant : l’élégance du geste décuple la magie de la dégustation. »',
    bio: 'Virtuose du shaker et champion de Flair Bartending, Malik donne vie aux comptoirs avec une énergie scénique vibrante. Il excelle dans les émulsions veloutées et les accords tropicaux intenses.',
    specialties: ['Flair bartending', 'Textures veloutées', 'Alchimie tropicale'],
    signatureCocktail: {
      name: 'Le Velvet Passion',
      id: 'passion-velvet',
    },
  },
  {
    id: 'chloe',
    name: 'Chloé Laurent',
    role: 'Mixologue Botaniste & Cheffe Mocktails',
    experience: '7 ans de recherche sensorielle',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    quote: '« La richesse de la flore offre une infinité de nuances pour sublimer les créations sans alcool. »',
    bio: 'Herboriste de formation et passionnée de botanique, Chloé distille ses propres hydrolats floraux, sirops d’herbes fraîches et kombuchas pour hisser les mocktails au rang de haute gastronomie.',
    specialties: ['Distillation botanique', 'Mocktails 0% Gastronomiques', 'Infusions à froid'],
    signatureCocktail: {
      name: 'L’Émeraude Basil Smash',
      id: 'basil-smash',
    },
  },
];

export const BarmenSection: React.FC = () => {
  return (
    <section className={styles.section} id="barmen" aria-label="Les maîtres mixologues de Cocktail House">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className="container">
        {/* En-tête de section */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Award size={15} />
            <span>Les Visages de l&apos;Excellence</span>
          </div>
          <h2 className={styles.title}>Rencontrez Nos Trois Maîtres Barmen</h2>
          <p className={styles.description}>
            Derrière chacune de nos 35 créations se cache une complicité d&apos;artistes passionnés. Trois personnalités complémentaires unies par le même culte du détail, de l&apos;accueil et de l&apos;artisanat liquide.
          </p>
        </div>

        {/* Grille des 3 barmen */}
        <div className={styles.grid}>
          {BARMEN.map((barman) => (
            <article key={barman.id} className={styles.card}>
              {/* Conteneur photo de profil avec lueur dorée */}
              <div className={styles.imageWrapper}>
                <Image
                  src={barman.image}
                  alt={`Portrait de ${barman.name}, ${barman.role}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                  className={styles.image}
                />
                <div className={styles.imageOverlay} />
                <div className={styles.experienceTag}>
                  <Star size={12} fill="#D4AF37" color="#D4AF37" />
                  <span>{barman.experience}</span>
                </div>
              </div>

              {/* Contenu textuel */}
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.barmanName}>{barman.name}</h3>
                  <span className={styles.barmanRole}>{barman.role}</span>
                </div>

                <blockquote className={styles.quote}>
                  {barman.quote}
                </blockquote>

                <p className={styles.bio}>
                  {barman.bio}
                </p>

                {/* Spécialités */}
                <div className={styles.specialties}>
                  <span className={styles.specialtiesLabel}>Savoir-faire clé :</span>
                  <div className={styles.tags}>
                    {barman.specialties.map((spec) => (
                      <span key={spec} className={styles.tag}>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cocktail Fétiche & Lien de commande */}
                <div className={styles.signatureBox}>
                  <div className={styles.signatureInfo}>
                    <span className={styles.signatureSub}>Création fétiche :</span>
                    <strong className={styles.signatureTitle}>
                      {barman.signatureCocktail.name}
                    </strong>
                  </div>
                  <Link
                    href={`/commander?cocktail=${barman.signatureCocktail.id}`}
                    className={styles.orderSignatureBtn}
                    aria-label={`Déguster la création de ${barman.name}`}
                  >
                    <span>Déguster (200 F)</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bannière d'invitation à l'atelier */}
        <div className={styles.teamBanner}>
          <div className={styles.bannerContent}>
            <div className={styles.bannerIcon}>
              <GlassWater size={28} />
            </div>
            <div>
              <h4 className={styles.bannerTitle}>Envie d&apos;une masterclass privée ou d&apos;un bar animé ?</h4>
              <p className={styles.bannerText}>
                Nos trois barmen se déplacent avec leur bar mobile sur mesure pour vos mariages, réceptions VIP et événements d&apos;entreprise.
              </p>
            </div>
          </div>
          <Link href="/commander?type=evenement" className={styles.bannerCta}>
            <span>Réserver notre équipe</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BarmenSection;
