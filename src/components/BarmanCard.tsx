'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Sparkles, Maximize2 } from 'lucide-react';
import { Barman } from '../data/barmen';

interface BarmanCardProps {
  barman: Barman;
  index: number;
  onOpenPhoto?: (index: number) => void;
}

export default function BarmanCard({ barman, index, onOpenPhoto }: BarmanCardProps) {
  const isEven = index % 2 === 1;

  return (
    <article
      className={`barman-presentation-card ${isEven ? 'card-reverse' : ''}`}
      aria-label={`Présentation de ${barman.name}`}
    >
      {/* 1. PHOTO DU BARMAN SERVANT UN CLIENT */}
      <div className="barman-photo-wrapper">
        <div
          className="barman-img-box"
          onClick={() => onOpenPhoto && onOpenPhoto(index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && onOpenPhoto) {
              e.preventDefault();
              onOpenPhoto(index);
            }
          }}
          aria-label={`Agrandir la photo de ${barman.name} servant un client`}
        >
          <Image
            src={barman.image}
            alt={barman.alt}
            width={720}
            height={520}
            className="barman-photo"
            priority={index === 0}
          />
          <div className="barman-photo-tag">En service au rez-de-chaussée</div>
          <div className="barman-expand-badge" title="Agrandir en plein écran">
            <Maximize2 size={16} />
            <span>Plein écran</span>
          </div>
        </div>
      </div>

      {/* 2. DÉTAILS, PHILOSOPHIE & DESCRIPTION */}
      <div className="barman-content-wrapper">
        <div className="barman-header-meta">
          <span className="barman-role-pill">{barman.role}</span>
          <h2 className="barman-name">{barman.name}</h2>
          <p className="barman-tagline">« {barman.tagline} »</p>
        </div>

        {/* DESCRIPTION DU BARMAN (ACCUEIL EN T-SHIRT, SOURIRE, CALME ET MINUTIE) */}
        <p className="barman-description text-readable">
          {barman.description}
        </p>

        {/* 3. SIGNATURE OFFICIELLE SOUS LA DESCRIPTION */}
        <div className="barman-signature-container">
          <div className="signature-header-label">
            <Sparkles size={14} className="gold-sparkle" />
            <span>Signature du Mixologue</span>
          </div>

          <div className="signature-graphic-row">
            {/* TRACÉ CALLIGRAPHIQUE DE LA SIGNATURE */}
            <div className="signature-svg-wrapper" aria-hidden="true">
              {index === 0 && (
                <svg viewBox="0 0 240 70" className="signature-svg" fill="none">
                  <path
                    d="M15 45 C25 20, 35 15, 45 42 C50 55, 58 48, 65 32 C72 18, 80 40, 92 42 C105 45, 115 25, 128 38 C140 48, 155 30, 170 35 C185 40, 205 32, 225 36"
                    stroke="var(--color-sand-gold)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M30 25 L48 20 M18 52 C50 56, 120 54, 210 50"
                    stroke="var(--color-sand-gold)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              )}

              {index === 1 && (
                <svg viewBox="0 0 240 70" className="signature-svg" fill="none">
                  <path
                    d="M18 52 C22 25, 28 12, 38 48 C45 20, 52 14, 60 45 C70 52, 85 28, 98 42 C112 55, 125 32, 142 36 C160 40, 180 20, 195 44 C205 28, 220 38, 230 42"
                    stroke="var(--color-sand-gold)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 58 C60 62, 140 58, 225 54"
                    stroke="var(--color-sand-gold)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              )}

              {index === 2 && (
                <svg viewBox="0 0 240 70" className="signature-svg" fill="none">
                  <path
                    d="M25 45 C15 32, 22 18, 38 22 C55 26, 42 55, 62 48 C75 42, 82 22, 95 38 C108 52, 122 34, 138 40 C155 45, 172 24, 188 38 C202 50, 218 36, 230 40"
                    stroke="var(--color-sand-gold)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 56 C70 60, 150 55, 220 52"
                    stroke="var(--color-sand-gold)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              )}
            </div>

            <div className="signature-name-text">
              <span className="signer-name">{barman.signatureName}</span>
              <span className="signer-title">{barman.signatureTitle}</span>
            </div>
          </div>

          {/* CRÉATION COCKTAIL ASSOCIÉE À SA SIGNATURE */}
          <div className="signature-cocktail-card">
            <div className="sig-cocktail-header">
              <div>
                <span className="sig-cocktail-tag">Recette fétiche :</span>
                <h3 className="sig-cocktail-name">{barman.signatureCocktail.name}</h3>
              </div>
              <span className="sig-cocktail-price">{barman.signatureCocktail.price}</span>
            </div>

            <p className="sig-cocktail-desc">
              {barman.signatureCocktail.description}
            </p>

            <div className="sig-ingredients-pills">
              {barman.signatureCocktail.ingredients.map((ing, i) => (
                <span key={i} className="sig-pill">
                  {ing}
                </span>
              ))}
            </div>

            <a
              href="https://me.fedapay.com/Cocktails"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-order-signature"
              title={`Commander et payer en ligne ${barman.signatureCocktail.name} sur FedaPay`}
            >
              <ShoppingBag size={16} />
              <span>Commander & Payer sur FedaPay ({barman.signatureCocktail.price})</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
