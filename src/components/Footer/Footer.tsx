import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Logo from '@/components/Logo/Logo';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.glow} aria-hidden="true" />

      <div className="container">
        <div className={styles.topGrid}>
          {/* Logo & Présentation */}
          <div className={styles.brandCol}>
            <Link href="#accueil" className={styles.logoLink} aria-label="Retour en haut Cocktail House">
              <Logo variant="footer" />
            </Link>

            <p className={styles.presentation}>
              Maison artisanale de mixologie haut de gamme. Nous créons des expériences gustatives mémorables pour vos célébrations, mariages, soirées privées et événements corporatifs.
            </p>

            <div className={styles.socials} aria-label="Réseaux sociaux">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram Cocktail House"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook Cocktail House"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn Cocktail House"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="/#accueil" className={styles.link}>
                  Accueil
                </a>
              </li>
              <li>
                <a href="/#cocktails" className={styles.link}>
                  Nos Cocktails
                </a>
              </li>
              <li>
                <a href="/#barmen" className={styles.link}>
                  Nos Barmen & Mixologues
                </a>
              </li>
              <li>
                <a href="/#evenements" className={styles.link}>
                  Événements & Bars Mobiles
                </a>
              </li>
              <li>
                <a href="/#a-propos" className={styles.link}>
                  L&apos;Atelier & Savoir-faire
                </a>
              </li>
              <li>
                <Link href="/commander" className={styles.link}>
                  Commander en ligne
                </Link>
              </li>
              <li>
                <Link href="/commander?type=evenement" className={styles.link}>
                  Devis Événementiel
                </Link>
              </li>
            </ul>
          </div>

          {/* Cocktails Vedettes */}
          <div>
            <h4 className={styles.colTitle}>Nos Signatures</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#cocktail-old-fashioned" className={styles.link}>
                  Smoking Old Fashioned
                </a>
              </li>
              <li>
                <a href="#cocktail-passion-velvet" className={styles.link}>
                  Velvet Passion
                </a>
              </li>
              <li>
                <a href="#cocktail-emerald-basil" className={styles.link}>
                  Émeraude Basil Smash
                </a>
              </li>
              <li>
                <a href="#cocktail-espresso-imperial" className={styles.link}>
                  Espresso Martini Impérial
                </a>
              </li>
              <li>
                <a href="#cocktail-hibiscus-paloma" className={styles.link}>
                  Hibiscus Paloma Rosé
                </a>
              </li>
            </ul>
          </div>

          {/* Coordonnées */}
          <div>
            <h4 className={styles.colTitle}>Coordonnées</h4>
            <ul className={styles.contactItems}>
              <li className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} />
                <span>18 Rue des Alambics, 75003 Paris, France</span>
              </li>
              <li className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                <a href="tel:+33142689000" className={styles.link}>
                  +33 1 42 68 90 00
                </a>
              </li>
              <li className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                <a href="mailto:contact@cocktailhouse.fr" className={styles.link}>
                  contact@cocktailhouse.fr
                </a>
              </li>
              <li className={styles.contactItem}>
                <Clock size={18} className={styles.contactIcon} />
                <span>Mardi – Dimanche : 15h00 – 02h00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Cocktail House. Tous droits réservés.
          </p>

          <span className={styles.disclaimer}>
            L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
          </span>

          <ul className={styles.legalLinks}>
            <li>
              <a href="#mentions" className={styles.legalLink}>
                Mentions Légales
              </a>
            </li>
            <li>
              <a href="#confidentialite" className={styles.legalLink}>
                Confidentialité
              </a>
            </li>
            <li>
              <a href="#cgv" className={styles.legalLink}>
                CGV & Vente d'alcool
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
