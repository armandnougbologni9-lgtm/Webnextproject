'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { COCKTAILS, Cocktail } from '../data/cocktails';

export default function HeroPinwheel() {
  // Sélection de 5 cocktails signatures pour le moulin à vent
  const pinwheelCocktails: Cocktail[] = COCKTAILS.slice(0, 5);
  const total = pinwheelCocktails.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const nextCocktail = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCocktail = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Rotation automatique douce (toutes les 6 secondes), pause au survol/toucher
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextCocktail();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextCocktail]);

  // Gestion du swipe tactile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartXRef.current - touchEndX;
      if (diff > 50) {
        nextCocktail();
      } else if (diff < -50) {
        prevCocktail();
      }
    }
    touchStartXRef.current = null;
    setIsPaused(false);
  };

  return (
    <section
      className="hero-section"
      aria-label="Présentation des créations — Moulin à vent"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container hero-container">
        {/* Titre discret de bienvenue */}
        <div className="hero-eyebrow">
          <span className="badge-sea">Maison de Cocktails • Bord de Mer</span>
          <h1 className="hero-brand">Cóctel Bonerris</h1>
        </div>

        {/* PINWHEEL / MOULIN À VENT */}
        <div className="pinwheel-viewport">
          {/* Bouton Précédent */}
          <button
            type="button"
            className="pinwheel-arrow pinwheel-arrow-prev"
            onClick={prevCocktail}
            aria-label="Cocktail précédent"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Scène circulaire */}
          <div className="pinwheel-stage">
            {pinwheelCocktails.map((cocktail, i) => {
              // Calcul de la position relative par rapport au cocktail actif
              const offset = (i - currentIndex + total) % total;
              let positionClass = 'pinwheel-slot-hidden';

              if (offset === 0) positionClass = 'pinwheel-slot-active';
              else if (offset === 1) positionClass = 'pinwheel-slot-right-1';
              else if (offset === 2) positionClass = 'pinwheel-slot-right-2';
              else if (offset === total - 2) positionClass = 'pinwheel-slot-left-2';
              else if (offset === total - 1) positionClass = 'pinwheel-slot-left-1';

              const isActive = offset === 0;

              return (
                <div
                  key={cocktail.id}
                  className={`pinwheel-card ${positionClass}`}
                  onClick={() => setCurrentIndex(i)}
                  role={isActive ? 'article' : 'button'}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={cocktail.name}
                >
                  <div className="card-image-wrapper">
                    <Image
                      src={cocktail.image}
                      alt={cocktail.name}
                      width={420}
                      height={480}
                      className="cocktail-img"
                      priority={i === 0}
                    />
                    <div className="card-overlay" />
                  </div>

                  {isActive && (
                    <div className="active-card-details">
                      <span className="cocktail-tag">{cocktail.tagline}</span>
                      <h3 className="cocktail-name">{cocktail.name}</h3>
                      <p className="cocktail-desc text-center-readable">{cocktail.description}</p>
                      <span className="cocktail-price">{cocktail.price} {cocktail.currency}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bouton Suivant */}
          <button
            type="button"
            className="pinwheel-arrow pinwheel-arrow-next"
            onClick={nextCocktail}
            aria-label="Cocktail suivant"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Indicateurs de points */}
        <div className="pinwheel-dots" role="tablist" aria-label="Sélection du cocktail">
          {pinwheelCocktails.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Voir ${c.name}`}
              className={`dot-btn ${idx === currentIndex ? 'dot-active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>

        {/* PROVERBE EN GRAND, AÉRÉ, EN ITALIchannelsIQUE ÉLÉGANT */}
        <div className="proverb-wrapper">
          <blockquote className="hero-proverb">
            « La saveur d’un verre ne se regarde pas, elle se vit. »
          </blockquote>
          <p className="proverb-sub">
            Le goût d’un cocktail ne s’explique pas, il se savoure au rythme de la brise marine.
          </p>
        </div>

        {/* DEUX BOUTONS AÉRÉS */}
        <div className="hero-cta-group">
          <Link href="/contact" className="btn-primary">
            Commander maintenant
          </Link>
          <Link href="/cocktails" className="btn-secondary">
            Découvrir nos cocktails
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          padding-top: var(--space-2xl);
          padding-bottom: var(--space-3xl);
          position: relative;
          background: linear-gradient(180deg, #FFFFFF 0%, var(--color-bg-warm) 100%);
          overflow: hidden;
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-eyebrow {
          margin-bottom: var(--space-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-brand {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 5.5vw, 4.2rem);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--color-sea-dark);
          margin-top: 12px;
        }

        /* SCÈNE MOULIN À VENT */
        .pinwheel-viewport {
          position: relative;
          width: 100%;
          max-width: 980px;
          height: 540px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pinwheel-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pinwheel-card {
          position: absolute;
          width: 320px;
          height: 440px;
          border-radius: 28px;
          background-color: #FFFFFF;
          box-shadow: 0 16px 40px -12px rgba(15, 23, 42, 0.08);
          border: 1px solid rgba(14, 116, 144, 0.12);
          overflow: hidden;
          cursor: pointer;
          transition: transform 900ms var(--ease-wave), opacity 900ms var(--ease-wave), filter 900ms var(--ease-wave);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* POSITIONS DU MOULIN À VENT EN ARC CIRCULAIRE */
        .pinwheel-slot-active {
          transform: translate3d(0, 0, 0) scale(1.05) rotate(0deg);
          opacity: 1;
          filter: blur(0px);
          z-index: 10;
          cursor: default;
          box-shadow: 0 24px 56px -12px rgba(14, 116, 144, 0.18);
        }

        .pinwheel-slot-right-1 {
          transform: translate3d(240px, -15px, 0) scale(0.82) rotate(12deg);
          opacity: 0.55;
          filter: blur(1px);
          z-index: 5;
        }

        .pinwheel-slot-right-2 {
          transform: translate3d(380px, -45px, 0) scale(0.68) rotate(22deg);
          opacity: 0.25;
          filter: blur(2px);
          z-index: 2;
        }

        .pinwheel-slot-left-1 {
          transform: translate3d(-240px, -15px, 0) scale(0.82) rotate(-12deg);
          opacity: 0.55;
          filter: blur(1px);
          z-index: 5;
        }

        .pinwheel-slot-left-2 {
          transform: translate3d(-380px, -45px, 0) scale(0.68) rotate(-22deg);
          opacity: 0.25;
          filter: blur(2px);
          z-index: 2;
        }

        .pinwheel-slot-hidden {
          transform: translate3d(0, -60px, 0) scale(0.5) rotate(0deg);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          background-color: var(--color-sky-soft);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 60%, rgba(255, 255, 255, 0.95) 100%);
        }

        .cocktail-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1200ms var(--ease-wave);
        }

        .pinwheel-slot-active:hover .cocktail-img {
          transform: scale(1.04);
        }

        .active-card-details {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        .cocktail-tag {
          font-size: 0.76rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-sand-gold);
          font-weight: 500;
          margin-bottom: 4px;
        }

        .cocktail-name {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--color-sea-dark);
          font-weight: 500;
          margin-bottom: 8px;
        }

        .cocktail-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cocktail-price {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--color-sea-blue);
          font-weight: 500;
        }

        /* FLÈCHES DE NAVIGATION */
        .pinwheel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(14, 116, 144, 0.15);
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
          color: var(--color-sea-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 300ms ease;
        }

        .pinwheel-arrow:hover {
          background-color: var(--color-sky-soft);
          color: var(--color-sea-blue);
          border-color: var(--color-sea-blue);
          transform: translateY(-50%) scale(1.08);
        }

        .pinwheel-arrow-prev {
          left: 12px;
        }

        .pinwheel-arrow-next {
          right: 12px;
        }

        /* POINTS INDICATEURS */
        .pinwheel-dots {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: var(--space-md);
        }

        .dot-btn {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(14, 116, 144, 0.2);
          border: none;
          cursor: pointer;
          transition: all 400ms var(--ease-wave);
          padding: 0;
        }

        .dot-active {
          width: 28px;
          border-radius: 9999px;
          background-color: var(--color-sea-blue);
        }

        /* PROVERBE EN GRAND, AÉRÉ */
        .proverb-wrapper {
          margin-top: var(--space-xl);
          margin-bottom: var(--space-xl);
          max-width: 760px;
          padding: 0 16px;
        }

        .hero-proverb {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(1.6rem, 3.2vw, 2.4rem);
          line-height: 1.4;
          color: var(--color-sea-dark);
          margin-bottom: 16px;
        }

        .proverb-sub {
          font-family: var(--font-sans);
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
          color: var(--color-text-muted);
          line-height: var(--line-height-body);
        }

        /* GROUPE DE BOUTONS CTA */
        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }

        /* ADAPTATION MOBILE */
        @media (max-width: 768px) {
          .pinwheel-viewport {
            height: 480px;
          }
          .pinwheel-card {
            width: 280px;
            height: 400px;
          }
          .card-image-wrapper {
            height: 200px;
          }
          .pinwheel-slot-right-1 {
            transform: translate3d(140px, -10px, 0) scale(0.8) rotate(8deg);
            opacity: 0.35;
          }
          .pinwheel-slot-left-1 {
            transform: translate3d(-140px, -10px, 0) scale(0.8) rotate(-8deg);
            opacity: 0.35;
          }
          .pinwheel-slot-right-2,
          .pinwheel-slot-left-2 {
            display: none;
          }
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
          }
          .hero-cta-group :global(.btn-primary),
          .hero-cta-group :global(.btn-secondary) {
            width: 100%;
          }
        }

        /* Respect prefers-reduced-motion : remplacement de la rotation par un fondu doux */
        @media (prefers-reduced-motion: reduce) {
          .pinwheel-card {
            transform: none !important;
            transition: opacity 600ms ease !important;
          }
          .pinwheel-slot-active {
            opacity: 1 !important;
            position: relative;
          }
          .pinwheel-slot-right-1,
          .pinwheel-slot-right-2,
          .pinwheel-slot-left-1,
          .pinwheel-slot-left-2,
          .pinwheel-slot-hidden {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
