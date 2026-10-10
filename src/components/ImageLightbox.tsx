'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export interface LightboxImageItem {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  tag?: string;
  description?: string;
  alt: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: LightboxImageItem[];
  currentIndex: number;
  onIndexChange?: (index: number) => void;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onIndexChange,
}: ImageLightboxProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [internalIndex, setInternalIndex] = useState(currentIndex);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronisation de l'index quand currentIndex change de l'extérieur
  useEffect(() => {
    setInternalIndex(currentIndex);
    setIsZoomed(false);
  }, [currentIndex]);

  // Gestion du montage avec animation d'ouverture
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
      setIsZoomed(false);
      document.body.style.overflow = 'hidden';
    } else if (isMounted) {
      triggerClose();
    }
    return () => {
      document.body.style.overflow = '';
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, [isOpen]);

  const triggerClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setIsZoomed(false);
    closeTimeoutRef.current = setTimeout(() => {
      setIsMounted(false);
      setIsClosing(false);
      document.body.style.overflow = '';
      onClose();
    }, 280);
  }, [isClosing, onClose]);

  const total = items.length;
  const currentItem = items[internalIndex] || items[0];

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setIsZoomed(false);
      const nextIdx = (internalIndex + 1) % total;
      setInternalIndex(nextIdx);
      if (onIndexChange) onIndexChange(nextIdx);
    },
    [internalIndex, total, onIndexChange]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setIsZoomed(false);
      const prevIdx = (internalIndex - 1 + total) % total;
      setInternalIndex(prevIdx);
      if (onIndexChange) onIndexChange(prevIdx);
    },
    [internalIndex, total, onIndexChange]
  );

  // Raccourcis clavier
  useEffect(() => {
    if (!isMounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '+' || e.key === '=') {
        setIsZoomed(true);
      } else if (e.key === '-') {
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMounted, triggerClose, handleNext, handlePrev]);

  if (!isMounted && !isOpen) return null;

  return (
    <div
      className={`lightbox-backdrop ${isClosing ? 'lightbox-backdrop-closing' : 'lightbox-backdrop-active'}`}
      onClick={triggerClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse d'image en plein écran"
    >
      {/* BARRE D'OUTILS SUPÉRIEURE */}
      <div className="lightbox-topbar" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-counter-badge">
          <span className="counter-digits">
            {String(internalIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          {currentItem?.tag && <span className="counter-tag">• {currentItem.tag}</span>}
        </div>

        <div className="lightbox-actions-group">
          {/* BOUTON BASCULE DU ZOOM */}
          <button
            type="button"
            className={`lightbox-icon-btn ${isZoomed ? 'lightbox-btn-active' : ''}`}
            onClick={() => setIsZoomed((prev) => !prev)}
            aria-label={isZoomed ? 'Réduire le zoom' : 'Agrandir l’image'}
            title={isZoomed ? 'Réduire (Zoom -)' : 'Agrandir (Zoom +)'}
          >
            {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
          </button>

          {/* BOUTON FERMER */}
          <button
            type="button"
            className="lightbox-icon-btn lightbox-btn-close"
            onClick={triggerClose}
            aria-label="Fermer la visionneuse (Échap)"
            title="Fermer (Échap)"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* BOUTON PRÉCÉDENT */}
      {total > 1 && (
        <button
          type="button"
          className="lightbox-nav-btn lightbox-nav-prev"
          onClick={handlePrev}
          aria-label="Image précédente"
          title="Précédente (Flèche gauche)"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* CONTENEUR DE L'IMAGE AVEC OUVERTURE/FERMETURE EN FONDU ET ZOOM */}
      <div
        className={`lightbox-stage ${isClosing ? 'lightbox-stage-closing' : 'lightbox-stage-active'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`lightbox-img-wrapper ${isZoomed ? 'lightbox-img-zoomed' : ''}`}
          onClick={() => setIsZoomed((prev) => !prev)}
          title={isZoomed ? 'Cliquer pour dézoomer' : 'Cliquer pour zoomer davantage'}
        >
          <Image
            src={currentItem.image}
            alt={currentItem.alt || currentItem.title}
            width={1600}
            height={1100}
            className="lightbox-main-img"
            priority
          />
        </div>

        {/* LÉGENDE DU LIEU / PHOTO */}
        <div className="lightbox-caption-panel">
          {currentItem.subtitle && (
            <span className="lightbox-caption-sub">{currentItem.subtitle}</span>
          )}
          <h3 className="lightbox-caption-title">{currentItem.title}</h3>
          {currentItem.description && (
            <p className="lightbox-caption-desc">{currentItem.description}</p>
          )}
        </div>
      </div>

      {/* BOUTON SUIVANT */}
      {total > 1 && (
        <button
          type="button"
          className="lightbox-nav-btn lightbox-nav-next"
          onClick={handleNext}
          aria-label="Image suivante"
          title="Suivante (Flèche droite)"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
}
