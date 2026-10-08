'use client';

import React, { useState, useEffect } from 'react';
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
  { label: 'Contact', href: '#contact' },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} id="header">
      <a href="#contenu-principal" className={styles.skipLink}>
        Passer au contenu principal
      </a>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="#accueil" className={styles.logo} onClick={closeMenu}>
          <div className={styles.logoIcon}>
            <Wine size={22} strokeWidth={2.2} />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Cocktail House</span>
            <span className={styles.logoSub}>Mixologie d'Exception</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Navigation principale">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className={styles.headerActions}>
          <a href="#contact" className={styles.ctaButton}>
            <span>Commander</span>
            <ArrowRight size={16} />
          </a>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!isOpen}
      >
        <ul className={styles.mobileNavList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a href={item.href} className={styles.mobileNavLink} onClick={closeMenu}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={`${styles.ctaButton} ${styles.mobileCta}`}
          onClick={closeMenu}
        >
          <span>Commander</span>
          <ArrowRight size={18} />
        </a>
      </div>
    </header>
  );
};

export default Header;
