import React from 'react';
import Image from 'next/image';
import { Sparkles, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';
import styles from './AboutSection.module.css';

export const AboutSection: React.FC = () => {
  return (
    <section className={styles.section} id="a-propos" aria-label="À propos de Cocktail House">
      <div className={styles.glow} aria-hidden="true" />

      <div className="container">
        <div className={styles.grid}>
          {/* Composition visuelle */}
          <div className={styles.visualWrapper}>
            <div className={styles.imageFrame}>
              <Image
                src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80"
                alt="Barman mixologue préparant un cocktail artisanal"
                width={700}
                height={875}
                className={styles.image}
              />
            </div>

            <div className={styles.floatingExperience}>
              <span className={styles.experienceNumber}>10+</span>
              <span className={styles.experienceText}>
                Années de passion &<br />mixologie haute couture
              </span>
            </div>
          </div>

          {/* Présentation & Piliers d'excellence */}
          <div className={styles.textContent}>
            <span className={styles.subtitle}>Notre Histoire & Philosophie</span>
            <h2 className={styles.title}>L&apos;Art du Cocktail Porté à son Apogée</h2>
            <p className={styles.description}>
              Fondée par des passionnés de haute mixologie, Cocktail House réinvente l&apos;expérience du bar à domicile et sur événement. Chaque élixir est pensé comme un voyage sensoriel raffiné, alliant équilibre millimétré, alcools d&apos;exception et fraîcheur botanique.
            </p>

            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}>
                  <Sparkles size={20} />
                </div>
                <h3 className={styles.pillarTitle}>Savoir-Faire Signé</h3>
                <p className={styles.pillarDesc}>
                  Techniques de mixologie avancée : clarifications au lait, fumages au bois de hêtre et infusions sous vide.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}>
                  <Leaf size={20} />
                </div>
                <h3 className={styles.pillarTitle}>Ingrédients 100% Frais</h3>
                <p className={styles.pillarDesc}>
                  Fruits du marché, herbes aromatiques fraîches, sirops et cordials faits maison sans aucun arôme artificiel.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}>
                  <ShieldCheck size={20} />
                </div>
                <h3 className={styles.pillarTitle}>Spiritueux Sélectionnés</h3>
                <p className={styles.pillarDesc}>
                  Rhum de mélasse, gin d&apos;alambic et single malts sourcés auprès de distilleries artisanales prestigieuses.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}>
                  <HeartHandshake size={20} />
                </div>
                <h3 className={styles.pillarTitle}>Service Clé en Main</h3>
                <p className={styles.pillarDesc}>
                  Du flacon livré à température idéale jusqu&apos;à l&apos;animation par un barman privé pour vos réceptions d&apos;envergure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
