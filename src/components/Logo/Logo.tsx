import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  variant?: 'header' | 'footer' | 'large';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'header',
  showSubtitle = true,
}) => {
  return (
    <div className={`${styles.logoContainer} ${styles[variant]}`} aria-label="Cocktail House — Maison de Haute Mixologie">
      {/* Emblème visuel stylisé avec Shaker & Verre en cristal taillé */}
      <div className={styles.emblem} aria-hidden="true">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.emblemSvg}
        >
          <defs>
            {/* Dégradé or impérial */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#AA7C11" />
              <stop offset="100%" stopColor="#F5D77F" />
            </linearGradient>
            <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(212, 175, 55, 0.4)" />
              <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
            </linearGradient>
          </defs>

          {/* Anneau extérieur octogonal / royal */}
          <circle
            cx="24"
            cy="24"
            r="22"
            stroke="url(#goldGradient)"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            opacity="0.7"
          />
          <circle
            cx="24"
            cy="24"
            r="19.5"
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
          />

          {/* Fond d'emblème */}
          <circle
            cx="24"
            cy="24"
            r="18"
            fill="#120E08"
          />

          {/* Coupe de cocktail stylisée et shaker */}
          {/* Coupe martini / coupe de cristal */}
          <path
            d="M15 15L24 26L33 15H15Z"
            stroke="url(#goldGradient)"
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill="url(#goldGlow)"
          />
          {/* Ligne liquide intérieure */}
          <path
            d="M17.5 18H30.5"
            stroke="#FFF2B2"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Pied du verre */}
          <line
            x1="24"
            y1="26"
            x2="24"
            y2="33"
            stroke="url(#goldGradient)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Base du verre */}
          <line
            x1="18.5"
            y1="33"
            x2="29.5"
            y2="33"
            stroke="url(#goldGradient)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Étoile scintillante / étincelle d'excellence au dessus */}
          <path
            d="M24 8L25 11L28 12L25 13L24 16L23 13L20 12L23 11L24 8Z"
            fill="url(#goldGradient)"
          />
        </svg>
      </div>

      {/* Typographie de marque */}
      <div className={styles.brandText}>
        <div className={styles.titleRow}>
          <span className={styles.brandName}>COCKTAIL HOUSE</span>
        </div>
        {showSubtitle && (
          <span className={styles.tagline}>
            MAISON DE HAUTE MIXOLOGIE
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
