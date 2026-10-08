import React from 'react';
import { Star } from 'lucide-react';
import styles from './Testimonials.module.css';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sophie Valmont',
    role: 'Organisatrice de Mariage & Réceptions',
    quote: '« Cocktail House a sublimé notre vin d’honneur avec le Smoking Old Fashioned et le Velvet Passion. La mise en scène, le goût et l’amabilité du barman ont ébloui tous nos invités ! »',
    initials: 'SV',
  },
  {
    name: 'Marc-Antoine Delorme',
    role: 'Directeur Général — Agence Aura',
    quote: '« Pour notre soirée de fin d’année à Paris, le bar éphémère et les créations sur-mesure ont créé une atmosphère festive et très haut de gamme. Ponctualité et professionnalisme irréprochables. »',
    initials: 'MD',
  },
  {
    name: 'Éléonore & Julien',
    role: 'Clients particuliers — Anniversaire privé',
    quote: '« Les cocktails arrivent parfaitement équilibrés, avec les garnitures fraîches et les fiches dégustation. Un vrai bar de palace directement dans son salon. Nous recommandons les yeux fermés ! »',
    initials: 'EJ',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className={styles.section} id="temoignages" aria-label="Témoignages de nos clients">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>Retours d&apos;Expérience</span>
          <h2 className={styles.title}>Ce que Nos Clients en Disent</h2>
          <p className={styles.description}>
            Particuliers exigeants ou organisateurs d&apos;événements prestigieux, ils partagent leurs moments de dégustation avec Cocktail House.
          </p>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.stars} aria-label="Note : 5 étoiles sur 5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" stroke="none" />
                ))}
              </div>

              <blockquote className={styles.quote}>{item.quote}</blockquote>

              <div className={styles.author}>
                <div className={styles.avatar} aria-hidden="true">
                  {item.initials}
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{item.name}</span>
                  <span className={styles.authorRole}>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
