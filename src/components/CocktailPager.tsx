'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { COCKTAILS } from '../data/cocktails';
import CocktailCard from './CocktailCard';

const ITEMS_PER_PAGE = 3;

export default function CocktailPager() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = COCKTAILS.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCocktails = COCKTAILS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      const catalogEl = document.getElementById('catalogue-top');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="cocktail-pager-wrapper" id="catalogue-top">
      {/* INDICATEUR MAGAZINE EN TÊTE */}
      <div className="magazine-header-bar">
        <div className="magazine-badge">
          <BookOpen size={16} />
          <span>Édition de la Mer • Page {currentPage} sur {totalPages}</span>
        </div>
        <p className="magazine-total-text">
          {totalItems} créations artisanales au bord de l’océan
        </p>
      </div>

      {/* GRILLE DES 3 COCKTAILS AVEC TRANSITION DOUCE STYLE MAGAZINE */}
      <div key={currentPage} className="cocktails-magazine-page">
        {currentCocktails.map((cocktail, index) => (
          <CocktailCard
            key={cocktail.id}
            cocktail={cocktail}
            priority={index === 0}
          />
        ))}
      </div>

      {/* CONTRÔLES DE PAGINATION MAGAZINE */}
      <nav className="magazine-pagination" aria-label="Pagination de la carte des cocktails">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-nav-btn"
          aria-label="Feuilleter la page précédente"
        >
          <ChevronLeft size={18} />
          <span className="btn-label-desktop">Page précédente</span>
        </button>

        <div className="page-numbers-list">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => goToPage(num)}
              className={`page-num-btn ${num === currentPage ? 'page-active' : ''}`}
              aria-current={num === currentPage ? 'page' : undefined}
              aria-label={`Aller à la page ${num}`}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-nav-btn"
          aria-label="Feuilleter la page suivante"
        >
          <span className="btn-label-desktop">Page suivante</span>
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  );
}
