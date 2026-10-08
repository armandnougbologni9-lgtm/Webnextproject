'use client';

import React, { useState } from 'react';
import { COCKTAILS, Cocktail } from '@/data/cocktails';
import CocktailCard from '@/components/CocktailCard/CocktailCard';
import styles from './CocktailsSection.module.css';

export const CocktailsSection: React.FC = () => {
  const [filter, setFilter] = useState<'Tous' | 'Signature' | 'Classique' | 'Fraîcheur'>('Tous');

  const filteredCocktails =
    filter === 'Tous'
      ? COCKTAILS
      : COCKTAILS.filter((c) => c.category === filter);

  return (
    <section className={styles.section} id="cocktails" aria-label="Notre carte de cocktails">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>Carte Mixologique</span>
          <h2 className={styles.title}>Nos Créations Signatures & Classiques</h2>
          <p className={styles.description}>
            Chaque recette est préparée artisanalement avec des infusions maison, des agrumes pressés minute et des spiritueux haut de gamme pour une expérience gustative inoubliable.
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className={styles.filters} role="tablist" aria-label="Filtrer les cocktails">
          {(['Tous', 'Signature', 'Classique', 'Fraîcheur'] as const).map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille de cartes réutilisables */}
        <div className={styles.grid}>
          {filteredCocktails.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CocktailsSection;
