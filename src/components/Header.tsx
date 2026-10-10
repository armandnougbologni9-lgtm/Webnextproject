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
      setScrolled(window.scrollY > 20);
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
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
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

      {/* TIROIR MOBILE */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu mobile">
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

      <style jsx>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background-color: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(14, 116, 144, 0.08);
          transition: all 400ms var(--ease-wave);
          padding: 24px 0;
        }

        .header-scrolled {
          padding: 16px 0;
          background-color: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .logo-link {
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }

        .logo-text {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--color-sea-dark);
          line-height: 1.1;
        }

        .logo-sub {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-sand-gold);
          margin-top: 3px;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 36px;
        }

        .nav-link {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 400;
          color: var(--color-text-main);
          text-decoration: none;
          position: relative;
          padding: 6px 0;
          transition: color 300ms ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--color-sea-blue);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1.5px;
          background-color: var(--color-sea-blue);
          transition: width 350ms var(--ease-wave);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-order-header {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 24px;
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 500;
          background-color: var(--color-sea-dark);
          color: #FFFFFF;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 400ms var(--ease-wave);
        }

        .btn-order-header:hover {
          background-color: var(--color-sea-blue);
          transform: translateY(-1px);
        }

        .mobile-toggle-btn {
          display: none;
          background: transparent;
          border: none;
          color: var(--color-sea-dark);
          cursor: pointer;
          padding: 6px;
        }

        /* TIROIR MOBILE */
        .mobile-drawer {
          position: fixed;
          top: 73px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          z-index: 99;
          display: flex;
          flex-direction: column;
          padding: 48px 32px;
          animation: fadeIn 300ms ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 28px;
          align-items: center;
          margin-top: 24px;
        }

        .mobile-nav-link {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--color-sea-dark);
          text-decoration: none;
          transition: color 300ms ease;
        }

        .mobile-nav-link.active,
        .mobile-nav-link:hover {
          color: var(--color-sea-blue);
        }

        .mobile-drawer-footer {
          margin-top: auto;
          padding-top: 32px;
          width: 100%;
        }

        .w-full {
          width: 100%;
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle-btn {
            display: flex;
            align-items: center;
          }
          .btn-order-header {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
