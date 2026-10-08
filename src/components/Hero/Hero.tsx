import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, GlassWater, Award, Clock } from 'lucide-react';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero} id="accueil" aria-label="Présentation principale">
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroGlowSecondary} aria-hidden="true" />

      <div className="container">
        <div className={styles.heroGrid}>
          {/* Contenu textuel */}
          <div className={styles.textContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span>Mixologie & Créations Signatures</span>
            </div>

            <h1 className={styles.title}>
              L&apos;élégance des cocktails d&apos;exception <span className={styles.titleGradient}>à portée de main.</span>
            </h1>

            <p className={styles.description}>
              Sublimez vos soirées privées et événements avec nos cocktails artisanaux haut de gamme, élaborés à la commande avec des spiritueux d&apos;élite et des ingrédients ultra-frais.
            </p>

            <div className={styles.actions}>
              <Link href="/commander" className={styles.primaryCta}>
                <span>Commander maintenant</span>
                <ArrowRight size={18} />
              </Link>

              <a href="#cocktails" className={styles.secondaryCta}>
                <span>Découvrir nos cocktails</span>
              </a>
            </div>

            <div className={styles.trustPoints}>
              <div className={styles.trustItem}>
                <span className={styles.trustNumber}>100%</span>
                <span className={styles.trustLabel}>Frais & Fait Maison</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustNumber}>+25</span>
                <span className={styles.trustLabel}>Recettes Signatures</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustNumber}>4.9/5</span>
                <span className={styles.trustLabel}>Avis Clients</span>
              </div>
            </div>
          </div>

          {/* Colonne Visuelle */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageFrame}>
              <Image
                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80"
                alt="Cocktail artisanal signature servi dans un verre cristallin"
                width={700}
                height={875}
                priority
                className={styles.heroImage}
              />
            </div>

            {/* Badge flottant */}
            <div className={styles.floatingTag}>
              <div className={styles.floatingTagIcon}>
                <Award size={20} />
              </div>
              <div className={styles.floatingTagText}>
                <span className={styles.floatingTagTitle}>Barman Certifié</span>
                <span className={styles.floatingTagSub}>Livraison & Dégustation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
