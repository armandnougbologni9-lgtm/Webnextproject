'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { SPACE_PHOTOS } from '../data/spacePhotos';

export default function SpaceGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const total = SPACE_PHOTOS.length;

  const nextPhoto = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevPhoto = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextPhoto();
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, nextPhoto]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartXRef.current - touchEndX;
      if (diff > 50) nextPhoto();
      else if (diff < -50) prevPhoto();
    }
    touchStartXRef.current = null;
    setIsPaused(false);
  };

  const activeItem = SPACE_PHOTOS[currentIndex];

  return (
    <section
      id="notre-espace"
      className="site-section space-section"
      aria-label="Notre espace — Galerie en moulin à vent"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container">
        {/* EN-TÊTE AÉRÉ */}
        <div className="section-header text-center">
          <span className="badge-sea">Lieu de vie & Horizon</span>
          <h2 className="section-title">Notre Espace au Bord de l’Eau</h2>
          <p className="section-subtitle text-center-readable">
            Un vaste rez-de-chaussée où le temps ralentit, pensé pour la sérénité et le partage, face au grand large.
          </p>
        </div>

        {/* CARROUSEL CIRCULAIRE PINWHEEL DES 5 PHOTOS */}
        <div className="space-pinwheel-wrapper">
          <button
            type="button"
            className="pinwheel-nav-arrow arrow-prev"
            onClick={prevPhoto}
            aria-label="Photo précédente"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="space-pinwheel-stage">
            {SPACE_PHOTOS.map((photo, i) => {
              const offset = (i - currentIndex + total) % total;
              let slotClass = 'slot-hidden';

              if (offset === 0) slotClass = 'slot-active';
              else if (offset === 1) slotClass = 'slot-right-1';
              else if (offset === 2) slotClass = 'slot-right-2';
              else if (offset === total - 2) slotClass = 'slot-left-2';
              else if (offset === total - 1) slotClass = 'slot-left-1';

              const isActive = offset === 0;

              return (
                <div
                  key={photo.id}
                  className={`space-card ${slotClass}`}
                  onClick={() => setCurrentIndex(i)}
                  role={isActive ? 'figure' : 'button'}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={photo.title}
                >
                  <div className="space-img-container">
                    <Image
                      src={photo.image}
                      alt={photo.alt}
                      width={640}
                      height={440}
                      className="space-img"
                      priority={i === 0}
                    />
                    <div className="space-tag-badge">{photo.tag}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="pinwheel-nav-arrow arrow-next"
            onClick={nextPhoto}
            aria-label="Photo suivante"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* INDICATEURS DE POINTS */}
        <div className="space-dots" role="tablist" aria-label="Choisir une photo">
          {SPACE_PHOTOS.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Afficher ${p.title}`}
              className={`space-dot ${idx === currentIndex ? 'space-dot-active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>

        {/* DÉTAILS DE LA PHOTO ACTIVE — AÉRÉS ET DÉGAGÉS */}
        <div className="active-space-desc text-center">
          <span className="space-active-subtitle">{activeItem.subtitle}</span>
          <h3 className="space-active-title">{activeItem.title}</h3>
          <p className="space-active-body text-center-readable">{activeItem.description}</p>
          
          <div className="space-cta-row">
            <Link href="/contact" className="btn-primary">
              <Sparkles size={18} />
              Louer l’espace pro
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .space-section {
          background-color: #FFFFFF;
        }

        .section-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: var(--space-xl);
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.8vw, 3rem);
          font-weight: 400;
          color: var(--color-sea-dark);
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .section-subtitle {
          font-size: 1.05rem;
          color: var(--color-text-muted);
        }

        /* SCÈNE MOULIN À VENT DU LIEU */
        .space-pinwheel-wrapper {
          position: relative;
          width: 100%;
          max-width: 1000px;
          height: 480px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .space-pinwheel-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .space-card {
          position: absolute;
          width: 440px;
          height: 340px;
          border-radius: 24px;
          background-color: #FFFFFF;
          border: 1px solid rgba(14, 116, 144, 0.1);
          box-shadow: 0 16px 36px -12px rgba(15, 23, 42, 0.08);
          overflow: hidden;
          cursor: pointer;
          transition: transform 900ms var(--ease-wave), opacity 900ms var(--ease-wave), filter 900ms var(--ease-wave);
        }

        .space-img-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .space-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1200ms var(--ease-wave);
        }

        .slot-active:hover .space-img {
          transform: scale(1.03);
        }

        .space-tag-badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          padding: 6px 14px;
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border-radius: 9999px;
          font-size: 0.76rem;
          font-weight: 500;
          color: var(--color-sea-dark);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        /* ROTATION CIRCULAIRE SUR LES 5 SLOTS */
        .slot-active {
          transform: translate3d(0, 0, 0) scale(1.08) rotate(0deg);
          opacity: 1;
          filter: blur(0px);
          z-index: 10;
          cursor: default;
          box-shadow: 0 24px 60px -15px rgba(14, 116, 144, 0.18);
        }

        .slot-right-1 {
          transform: translate3d(260px, -15px, 0) scale(0.82) rotate(10deg);
          opacity: 0.45;
          filter: blur(1px);
          z-index: 5;
        }

        .slot-right-2 {
          transform: translate3d(400px, -40px, 0) scale(0.68) rotate(20deg);
          opacity: 0.2;
          filter: blur(2px);
          z-index: 2;
        }

        .slot-left-1 {
          transform: translate3d(-260px, -15px, 0) scale(0.82) rotate(-10deg);
          opacity: 0.45;
          filter: blur(1px);
          z-index: 5;
        }

        .slot-left-2 {
          transform: translate3d(-400px, -40px, 0) scale(0.68) rotate(-20deg);
          opacity: 0.2;
          filter: blur(2px);
          z-index: 2;
        }

        .slot-hidden {
          transform: translate3d(0, -60px, 0) scale(0.5);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
        }

        /* BOUTONS FLÈCHES */
        .pinwheel-nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 25;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(14, 116, 144, 0.15);
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
          color: var(--color-sea-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 300ms ease;
        }

        .pinwheel-nav-arrow:hover {
          background-color: var(--color-sky-soft);
          color: var(--color-sea-blue);
          border-color: var(--color-sea-blue);
          transform: translateY(-50%) scale(1.08);
        }

        .arrow-prev { left: 16px; }
        .arrow-next { right: 16px; }

        /* DOTS */
        .space-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: var(--space-md);
        }

        .space-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(14, 116, 144, 0.2);
          border: none;
          cursor: pointer;
          transition: all 400ms var(--ease-wave);
          padding: 0;
        }

        .space-dot-active {
          width: 32px;
          border-radius: 9999px;
          background-color: var(--color-sea-blue);
        }

        /* TEXTE DÉGAGE */
        .active-space-desc {
          margin-top: var(--space-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .space-active-subtitle {
          font-size: 0.82rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-sand-gold);
          font-weight: 500;
          margin-bottom: 6px;
        }

        .space-active-title {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          color: var(--color-sea-dark);
          font-weight: 400;
          margin-bottom: 16px;
        }

        .space-active-body {
          font-size: 1rem;
          color: var(--color-text-muted);
          line-height: var(--line-height-body);
          margin-bottom: var(--space-lg);
        }

        .space-cta-row {
          margin-top: var(--space-sm);
        }

        /* ADAPTATION MOBILE */
        @media (max-width: 768px) {
          .space-pinwheel-wrapper {
            height: 360px;
          }
          .space-card {
            width: 300px;
            height: 240px;
          }
          .slot-right-1 {
            transform: translate3d(140px, -10px, 0) scale(0.8) rotate(8deg);
            opacity: 0.35;
          }
          .slot-left-1 {
            transform: translate3d(-140px, -10px, 0) scale(0.8) rotate(-8deg);
            opacity: 0.35;
          }
          .slot-right-2,
          .slot-left-2 {
            display: none;
          }
          .space-cta-row :global(.btn-primary) {
            width: 100%;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .space-card {
            transform: none !important;
            transition: opacity 600ms ease !important;
          }
          .slot-active {
            opacity: 1 !important;
            position: relative;
          }
          .slot-right-1, .slot-right-2, .slot-left-1, .slot-left-2, .slot-hidden {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
