'use client';

import React, { useState, useMemo } from 'react';
import { COCKTAILS, Cocktail } from '@/data/cocktails';
import CocktailCard from '@/components/CocktailCard/CocktailCard';
import { Sparkles, Search, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './CocktailsSection.module.css';

type CategoryFilter = 'Tous' | 'Signature' | 'Classique' | 'Fraîcheur' | 'Exotique' | 'Mocktail';

const CATEGORIES: { label: string; value: CategoryFilter }[] = [
  { label: 'Tous (35)', value: 'Tous' },
  { label: 'Signatures (7)', value: 'Signature' },
  { label: 'Classiques (7)', value: 'Classique' },
  { label: 'Fraîcheur (7)', value: 'Fraîcheur' },
  { label: 'Exotiques (7)', value: 'Exotique' },
  { label: 'Mocktails 0% (7)', value: 'Mocktail' },
];

const INITIAL_VISIBLE_COUNT = 12;

export const CocktailsSection: React.FC = () => {
  const [filter, setFilter] = useState<CategoryFilter>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  // Filtrage combiné par catégorie et recherche
  const filteredCocktails = useMemo(() => {
    return COCKTAILS.filter((cocktail) => {
      const matchesCategory = filter === 'Tous' || cocktail.category === filter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cocktail.name.toLowerCase().includes(q) ||
        cocktail.tagline.toLowerCase().includes(q) ||
        cocktail.description.toLowerCase().includes(q) ||
        cocktail.ingredients.some((ing) => ing.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  // Cocktails actuellement affichés
  const visibleCocktails = showAll
    ? filteredCocktails
    : filteredCocktails.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMore = filteredCocktails.length > INITIAL_VISIBLE_COUNT;

  return (
    <section className={styles.section} id="cocktails" aria-label="Notre carte de 35 cocktails">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>Collection Complète — 35 Cocktails d&apos;Auteur</span>
          </div>
          <h2 className={styles.title}>Notre Carte Complète de 35 Cocktails</h2>
          <p className={styles.description}>
            De nos créations fumées signatures aux grands classiques parisiens, en passant par nos trésors exotiques et mocktails botaniques. Tous nos cocktails sont confectionnés minute au tarif unique et privilégié de <strong className={styles.priceHighlight}>200 FCFA</strong>.
          </p>
        </div>

        {/* Barre d'outils : Recherche et Filtres */}
        <div className={styles.toolbar}>
          {/* Recherche */}
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher un cocktail, ingrédient (rhum, passion, basilic...)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAll(true); // ouvre l'affichage en cas de recherche
              }}
              className={styles.searchInput}
              aria-label="Rechercher parmi les 35 cocktails"
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setSearchQuery('')}
                aria-label="Effacer la recherche"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtres par catégorie */}
          <div className={styles.filters} role="tablist" aria-label="Filtrer par catégorie de cocktail">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                role="tab"
                aria-selected={filter === cat.value}
                className={`${styles.filterBtn} ${filter === cat.value ? styles.activeFilter : ''}`}
                onClick={() => {
                  setFilter(cat.value);
                  setShowAll(false);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Compteur de résultats */}
        <div className={styles.resultsMeta}>
          <span>
            Affichage de <strong>{visibleCocktails.length}</strong> sur <strong>{filteredCocktails.length}</strong> cocktail{filteredCocktails.length > 1 ? 's' : ''} {filter !== 'Tous' && `dans la catégorie ${filter}`}
          </span>
        </div>

        {/* Grille de cartes réutilisables */}
        {filteredCocktails.length > 0 ? (
          <div className={styles.grid}>
            {visibleCocktails.map((cocktail) => (
              <CocktailCard key={cocktail.id} cocktail={cocktail} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Aucun cocktail ne correspond à votre recherche &ldquo;{searchQuery}&rdquo;.</p>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => {
                setSearchQuery('');
                setFilter('Tous');
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Bouton Voir Plus / Voir Moins */}
        {hasMore && (
          <div className={styles.loadMoreContainer}>
            <button
              type="button"
              className={styles.loadMoreBtn}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  <ChevronUp size={18} />
                  <span>Réduire la sélection</span>
                </>
              ) : (
                <>
                  <ChevronDown size={18} />
                  <span>Découvrir toute la carte (voir les {filteredCocktails.length} cocktails)</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CocktailsSection;
