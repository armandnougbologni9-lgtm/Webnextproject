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
    </section>
  );
}
