import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-container">
        {/* COLONNE 1 : LOGO & PRÉSENTATION */}
        <div className="footer-col brand-col">
          <Link href="/" className="footer-logo">
            <div className="logo-brand-wrap">
              <div className="logo-badge-icon">
                <Image
                  src="/logo-cb.png"
                  alt="Logo Monogramme Cóctel Bonerris"
                  width={44}
                  height={44}
                  className="logo-img"
                />
              </div>
              <div className="logo-text-col">
                <span className="logo-main">Cóctel Bonerris</span>
                <span className="logo-sub">Lounge & Cocktails • Bord de Mer</span>
              </div>
            </div>
          </Link>
          <p className="footer-about text-readable">
            Une maison de mixologie artisanale face aux vagues. Nous cultivons la paix, la fraîcheur et la convivialité à travers des créations d’exception servies dans un esprit de pure sérénité.
          </p>
        </div>

        {/* COLONNE 2 : NAVIGATION */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li><Link href="/" className="footer-link">Accueil</Link></li>
            <li><Link href="/#notre-espace" className="footer-link">Notre espace au bord de l’eau</Link></li>
            <li><Link href="/cocktails" className="footer-link">Carte des cocktails (35 créations)</Link></li>
            <li><Link href="/contact" className="footer-link">Contact & Commande</Link></li>
            <li><Link href="/contact?espace=pro" className="footer-link">Privatisation & Espace pro</Link></li>
          </ul>
        </div>

        {/* COLONNE 3 : COORDONNÉES */}
        <div className="footer-col">
          <h4 className="footer-heading">Nous trouver</h4>
          <ul className="footer-contact-list">
            <li className="contact-item">
              <MapPin size={18} className="contact-icon" />
              <span>Boulevard du Rivage, Cotonou — Au bord de l’océan</span>
            </li>
            <li className="contact-item">
              <Phone size={18} className="contact-icon" />
              <span>+229 97 00 00 00</span>
            </li>
            <li className="contact-item">
              <Mail size={18} className="contact-icon" />
              <span>bonjour@coctelbonerris.com</span>
            </li>
          </ul>

          <div className="footer-socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* BAS DU FOOTER / MENTIONS LÉGALES */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright">
            © {new Date().getFullYear()} Cóctel Bonerris. Tous droits réservés. L’abus d’alcool est dangereux pour la santé, à consommer avec modération.
          </p>
          <div className="legal-links">
            <span className="legal-item">Mentions Légales</span>
            <span className="separator">•</span>
            <span className="legal-item">Politique de Confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
