'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import SoundToggle from './SoundToggle';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors d'un changement d'URL
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Fermer au clavier (Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className={`site-header cloud-header ${scrolled ? 'header-scrolled' : ''}`}>
      {/* Voeu de brume nuageuse en arrière-plan */}
      <div className="header-cloud-mist" aria-hidden="true" />

      <div className="container header-container">
        {/* LOGO */}
        <Link href="/" className="logo-link" aria-label="Cóctel Bonerris — Accueil">
          <span className="logo-text">Cóctel Bonerris</span>
          <span className="logo-sub">Lounge & Cocktails • Bord de Mer</span>
        </Link>

        {/* NAVIGATION DESKTOP */}
        <nav className="desktop-nav" aria-label="Navigation principale">
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
          >
            Accueil
          </Link>
          <Link
            href="/#notre-espace"
            className="nav-link"
          >
            Notre espace
          </Link>
          <Link
            href="/cocktails"
            className={`nav-link ${pathname === '/cocktails' ? 'active' : ''}`}
          >
            Cocktails
          </Link>
          <Link
            href="/contact"
            className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* ACTIONS HEADER */}
        <div className="header-actions">
          <SoundToggle />
          <Link href="/contact" className="btn-order-header">
            Commander
          </Link>
          
          {/* BOUTON MENU MOBILE */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu de navigation'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* TIROIR MOBILE NUAGEUX */}
      {mobileMenuOpen && (
        <div className="mobile-drawer cloud-drawer" role="dialog" aria-modal="true" aria-label="Menu mobile">
          <div className="mobile-drawer-content">
            <nav className="mobile-nav">
              <Link href="/" className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`}>
                Accueil
              </Link>
              <Link href="/#notre-espace" className="mobile-nav-link">
                Notre espace
              </Link>
              <Link href="/cocktails" className={`mobile-nav-link ${pathname === '/cocktails' ? 'active' : ''}`}>
                Cocktails
              </Link>
              <Link href="/contact" className={`mobile-nav-link ${pathname === '/contact' ? 'active' : ''}`}>
                Contact & Commande
              </Link>
            </nav>

            <div className="mobile-drawer-footer">
              <Link href="/contact" className="btn-primary w-full text-center">
                Commander maintenant
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
