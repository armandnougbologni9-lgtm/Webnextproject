'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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

  // Empêcher le défilement du corps quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`site-header cloud-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-cloud-mist" aria-hidden="true" />

      <div className="container header-container">
        {/* LOGO AVEC MONOGRAMME OFFICIEL CB */}
        <Link href="/" className="logo-link" aria-label="Cóctel Bonerris — Accueil">
          <div className="logo-brand-wrap">
            <div className="logo-badge-icon">
              <Image
                src="/logo-cb.png"
                alt="Logo Monogramme Cóctel Bonerris"
                width={40}
                height={40}
                className="logo-img"
                priority
              />
            </div>
            <div className="logo-text-col">
              <span className="logo-text">Cóctel Bonerris</span>
              <span className="logo-sub">Lounge • Bord de Mer</span>
            </div>
          </div>
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
            href="/cocktails"
            className={`nav-link ${pathname === '/cocktails' ? 'active' : ''}`}
          >
            Cocktails
          </Link>
          <Link
            href="/barmen"
            className={`nav-link ${pathname === '/barmen' ? 'active' : ''}`}
          >
            Nos Barmen
          </Link>
          <Link
            href="/entreprises"
            className={`nav-link ${pathname === '/entreprises' ? 'active' : ''}`}
          >
            Entreprises & Événements
          </Link>
          <Link
            href="/#notre-espace"
            className="nav-link"
          >
            Notre espace
          </Link>
          <Link
            href="/contact"
            className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* ACTIONS HEADER : PAIEMENT FEDAPAY OBLIGATOIRE */}
        <div className="header-actions">
          <a
            href="https://me.fedapay.com/Cocktails"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-order-header"
            title="Commander et payer vos cocktails directement sur FedaPay"
          >
            Commander (FedaPay)
          </a>

          {/* BOUTON MENU MOBILE OPTIMISÉ POUR SMARTPHONE */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu de navigation'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* TIROIR MOBILE PLEIN ÉCRAN FLUIDE SANS DÉBORDEMENT */}
      {mobileMenuOpen && (
        <div className="mobile-drawer cloud-drawer" role="dialog" aria-modal="true" aria-label="Menu mobile">
          <div className="mobile-drawer-content">
            <nav className="mobile-nav">
              <Link href="/" className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`}>
                Accueil
              </Link>
              <Link href="/cocktails" className={`mobile-nav-link ${pathname === '/cocktails' ? 'active' : ''}`}>
                Cocktails (35 créations)
              </Link>
              <Link href="/barmen" className={`mobile-nav-link ${pathname === '/barmen' ? 'active' : ''}`}>
                Nos Barmen & Signatures
              </Link>
              <Link href="/entreprises" className={`mobile-nav-link ${pathname === '/entreprises' ? 'active' : ''}`}>
                Entreprises & Événements
              </Link>
              <Link href="/#notre-espace" className="mobile-nav-link">
                Notre espace
              </Link>
              <Link href="/contact" className={`mobile-nav-link ${pathname === '/contact' ? 'active' : ''}`}>
                Contact
              </Link>
            </nav>

            <div className="mobile-drawer-footer">
              <a
                href="https://me.fedapay.com/Cocktails"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center"
              >
                Payer un cocktail (FedaPay)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
