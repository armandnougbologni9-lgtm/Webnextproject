import React from 'react';
import Link from 'next/link';
import { GlassWater, Heart, Building, Check, ArrowRight, Sparkles } from 'lucide-react';
import styles from './EventsSection.module.css';

interface EventPackage {
  id: string;
  title: string;
  capacity: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  isFeatured?: boolean;
}

const PACKAGES: EventPackage[] = [
  {
    id: 'soiree-privee',
    title: 'Cocktail Party Privée',
    capacity: '10 à 35 Invités',
    description: 'Idéal pour anniversaires, pendaisons de crémaillère et réceptions intimistes à domicile.',
    icon: <GlassWater size={24} />,
    features: [
      '1 Barman mixologue dédié',
      '3 Recettes au choix (50 à 100 verres)',
      'Verrerie cristal & glace artisanale',
      'Installation et démontage inclus',
    ],
  },
  {
    id: 'mariage-celebration',
    title: 'Mariages & Grands Jours',
    capacity: '40 à 150 Invités',
    description: 'Une scénographie sur-mesure pour sublimer votre vin d’honneur et soirée dansante.',
    icon: <Heart size={24} />,
    features: [
      'Bar mobile illuminé haut de gamme',
      '2 Barmen mixologues certifiés',
      'Création d’un cocktail signature aux noms des mariés',
      'Menu cocktails imprimé personnalisé',
      'Option mocktails sans alcool d’exception',
    ],
    isFeatured: true,
  },
  {
    id: 'corporate-gala',
    title: 'Corporate & Soirées Gala',
    capacity: '100 à 500+ Invités',
    description: 'Pour vos lancements de produit, réceptions clients VIP et fêtes d’entreprise prestigieuses.',
    icon: <Building size={24} />,
    features: [
      'Plusieurs stations de bar coordonnées',
      'Équipe complète de barmen & serveurs',
      'Débit optimisé sans temps d’attente',
      'Personnalisation aux couleurs de votre marque',
      'Facturation professionnelle & devis express',
    ],
  },
];

export const EventsSection: React.FC = () => {
  return (
    <section className={styles.section} id="evenements" aria-label="Prestations événementielles et bar à cocktails">
      <div className={styles.glow} aria-hidden="true" />

      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>Prestations Privées & Professionnelles</span>
          <h2 className={styles.title}>Faites de Vos Événements un Moment Inoubliable</h2>
          <p className={styles.description}>
            Nos barmen mixologues se déplacent sur le lieu de votre choix avec bars mobiles design, verrerie haut de gamme et ingrédients d’élite pour régaler vos convives.
          </p>
        </div>

        <div className={styles.grid}>
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`${styles.card} ${pkg.isFeatured ? styles.featuredCard : ''}`}
            >
              {pkg.isFeatured && (
                <div className={styles.badgePopular}>
                  <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
                  Recommandé
                </div>
              )}

              <div>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>{pkg.icon}</div>
                  <h3 className={styles.cardTitle}>{pkg.title}</h3>
                  <div className={styles.cardCapacity}>{pkg.capacity}</div>
                  <p className={styles.cardDesc}>{pkg.description}</p>
                </div>

                <ul className={styles.featuresList} aria-label={`Inclus dans la formule ${pkg.title}`}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <Check size={16} className={styles.checkIcon} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/commander?type=evenement&formule=${pkg.id}`}
                className={styles.ctaBtn}
              >
                <span>Demander un devis pour cette formule</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        {/* Bandeau sur-mesure */}
        <div className={styles.banner}>
          <div className={styles.bannerText}>
            <h3 className={styles.bannerTitle}>Un projet particulier ou un grand effectif ?</h3>
            <p className={styles.bannerDesc}>
              Nous concevons des cartes de cocktails 100% sur-mesure selon votre thème, vos alcools préférés ou les contraintes de votre lieu de réception.
            </p>
          </div>

          <Link href="/commander?type=evenement" className={styles.bannerAction}>
            <span>Configurer mon événement</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
