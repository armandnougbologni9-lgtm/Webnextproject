'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Wine, Menu, X, ArrowRight } from 'lucide-react';
import styles from './Header.module.css';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Cocktails', href: '#cocktails' },
  { label: 'À propos', href: '#a-propos' },
  { label: 'Témoignages', href: '#temoignages' },
  { label: 'Contact', href: '#contact' },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Effet d'élévation au défilement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermeture du menu
  const closeMenu = () => setIsOpen(false);

  // Verrouillage du scroll en arrière-plan quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Fermeture à la touche Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Navigation avec smooth scroll et fermeture du menu
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeMenu();
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      id="header"
    >
      {/* Lien d'évitement d'accessibilité */}
      <a href="#contenu-principal" className={styles.skipLink}>
        Passer au contenu principal
      </a>

      <div className={styles.inner}>
        {/* Logo */}
        <Link
          href="#accueil"
          className={styles.logo}
          onClick={(e) => handleNavClick(e, '#accueil')}
        >
          <div className={styles.logoIcon}>
            <Wine size={22} strokeWidth={2.2} />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Cocktail House</span>
            <span className={styles.logoSub}>Mixologie d'Exception</span>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className={styles.nav} aria-label="Navigation principale">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Desktop & Bouton Hamburger Mobile */}
        <div className={styles.headerActions}>
          <a
            href="#contact"
            className={styles.ctaButton}
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <span>Commander</span>
            <ArrowRight size={16} />
          </a>

          {/* Bouton Hamburger accessible */}
          <button
            id="mobile-menu-toggle"
            type="button"
            className={styles.mobileToggle}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Backdrop sombre (clic à l'extérieur pour fermer) */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Menu déroulant Mobile & Tablette (< 768px) */}
      <nav
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Navigation mobile"
        aria-hidden={!isOpen}
      >
        <ul className={styles.mobileNavList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={styles.mobileNavLink}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action principale dans le menu mobile */}
        <a
          href="#contact"
          className={`${styles.ctaButton} ${styles.mobileCta}`}
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          <span>Commander</span>
          <ArrowRight size={18} />
        </a>
      </nav>
    </header>
  );
};

export default Header;
