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
      // Remonter doucement vers le haut du catalogue
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

      <style jsx>{`
        .cocktail-pager-wrapper {
          width: 100%;
          position: relative;
        }

        .magazine-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-xl);
          padding-bottom: var(--space-sm);
          border-bottom: 1px solid rgba(14, 116, 144, 0.1);
        }

        .magazine-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.86rem;
          color: var(--color-sea-blue);
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        .magazine-total-text {
          font-size: 0.88rem;
          color: var(--color-text-muted);
        }

        /* GRILLE DE 3 COCKTAILS TRÈS AÉRÉE */
        .cocktails-magazine-page {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          animation: magazinePageTurn 800ms var(--ease-wave);
        }

        @keyframes magazinePageTurn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* PAGINATION MAGAZINE */
        .magazine-pagination {
          margin-top: var(--space-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .page-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 9999px;
          background-color: #FFFFFF;
          border: 1px solid rgba(14, 116, 144, 0.18);
          color: var(--color-sea-dark);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 300ms ease;
        }

        .page-nav-btn:hover:not(:disabled) {
          background-color: var(--color-sky-soft);
          border-color: var(--color-sea-blue);
          color: var(--color-sea-blue);
          transform: translateY(-1px);
        }

        .page-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .page-numbers-list {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .page-num-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(14, 116, 144, 0.12);
          background-color: #FFFFFF;
          color: var(--color-text-main);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 300ms ease;
        }

        .page-num-btn:hover {
          border-color: var(--color-sea-blue);
          color: var(--color-sea-blue);
          background-color: var(--color-sky-soft);
        }

        .page-active {
          background-color: var(--color-sea-dark);
          color: #FFFFFF;
          border-color: var(--color-sea-dark);
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
        }

        @media (max-width: 1024px) {
          .cocktails-magazine-page {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .magazine-header-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .btn-label-desktop {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cocktails-magazine-page {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
