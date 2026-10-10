'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { COCKTAILS, Cocktail } from '../data/cocktails';

export default function HeroPinwheel() {
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

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextCocktail();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextCocktail]);

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
          <button
            type="button"
            className="pinwheel-arrow pinwheel-arrow-prev"
            onClick={prevCocktail}
            aria-label="Cocktail précédent"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="pinwheel-stage">
            {pinwheelCocktails.map((cocktail, i) => {
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

        {/* PROVERBE EN GRAND */}
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
    </section>
  );
}
