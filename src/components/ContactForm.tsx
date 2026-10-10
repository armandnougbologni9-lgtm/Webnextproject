'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';
import { COCKTAILS } from '../data/cocktails';

interface FormData {
  nom: string;
  telephone: string;
  email: string;
  cocktail: string;
  quantite: number;
  date: string;
  isEventOrSpaceRental: boolean;
  message: string;
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedCocktail = searchParams.get('cocktail') || '';
  const isProSpace = searchParams.get('espace') === 'pro';

  const [formData, setFormData] = useState<FormData>({
    nom: '',
    telephone: '',
    email: '',
    cocktail: preselectedCocktail,
    quantite: 1,
    date: '',
    isEventOrSpaceRental: isProSpace,
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (preselectedCocktail) {
      setFormData((prev) => ({ ...prev, cocktail: preselectedCocktail }));
    }
    if (isProSpace) {
      setFormData((prev) => ({ ...prev, isEventOrSpaceRental: true }));
    }
  }, [preselectedCocktail, isProSpace]);

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!formData.nom.trim()) errs.nom = 'Veuillez renseigner votre nom.';
    if (!formData.telephone.trim()) errs.telephone = 'Veuillez indiquer un numéro de téléphone.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Veuillez saisir une adresse email valide.';
    }
    if (formData.quantite < 1) errs.quantite = 'La quantité minimale est de 1.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      // Simulation d'envoi réseau
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      telephone: '',
      email: '',
      cocktail: '',
      quantite: 1,
      date: '',
      isEventOrSpaceRental: false,
      message: '',
    });
    setStatus('idle');
    setErrors({});
  };

  if (status === 'success') {
    return (
      <div className="contact-success-card" role="status">
        <CheckCircle2 size={48} className="text-sea" />
        <h3 className="success-heading">Votre message a été transmis avec soin</h3>
        <p className="success-text text-center-readable">
          Merci {formData.nom}. Notre équipe au bord de l’eau prendra contact avec vous très rapidement pour confirmer votre commande ou votre projet d’événement.
        </p>
        <button type="button" onClick={resetForm} className="btn-secondary">
          Envoyer une autre demande
        </button>

        <style jsx>{`
          .contact-success-card {
            background-color: #FFFFFF;
            border: 1px solid rgba(14, 116, 144, 0.12);
            border-radius: 32px;
            padding: 80px 48px;
            text-align: center;
            max-width: 680px;
            margin: 0 auto;
            box-shadow: 0 16px 40px -12px rgba(15, 23, 42, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .success-heading {
            font-family: var(--font-serif);
            font-size: 2rem;
            color: var(--color-sea-dark);
            font-weight: 400;
          }
          .success-text {
            color: var(--color-text-muted);
            line-height: var(--line-height-body);
            margin-bottom: 12px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="contact-form-card">
      <form onSubmit={handleSubmit} noValidate>
        {/* LIGNE 1 : NOM & TÉLÉPHONE */}
        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="nom" className="form-label">
              Nom complet <span className="req">*</span>
            </label>
            <input
              id="nom"
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              placeholder="ex. Éléonore Kpadonou"
              className={`form-input ${errors.nom ? 'input-err' : ''}`}
              required
            />
            {errors.nom && <span className="error-note"><AlertCircle size={14} /> {errors.nom}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telephone" className="form-label">
              Numéro de téléphone <span className="req">*</span>
            </label>
            <input
              id="telephone"
              type="tel"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              placeholder="ex. +229 97 12 34 56"
              className={`form-input ${errors.telephone ? 'input-err' : ''}`}
              required
            />
            {errors.telephone && <span className="error-note"><AlertCircle size={14} /> {errors.telephone}</span>}
          </div>
        </div>

        {/* LIGNE 2 : EMAIL & DATE */}
        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Adresse email <span className="req">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="ex. eleonore@domaine.com"
              className={`form-input ${errors.email ? 'input-err' : ''}`}
              required
            />
            {errors.email && <span className="error-note"><AlertCircle size={14} /> {errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date souhaitée
            </label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="form-input"
            />
          </div>
        </div>

        {/* LIGNE 3 : COCKTAIL CHOISI & QUANTITÉ */}
        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="cocktail" className="form-label">
              Cocktail souhaité (ou choix à la carte)
            </label>
            <select
              id="cocktail"
              value={formData.cocktail}
              onChange={(e) => setFormData({ ...formData, cocktail: e.target.value })}
              className="form-select"
            >
              <option value="">Sélectionner un cocktail (optionnel)</option>
              {COCKTAILS.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} — ({c.price} {c.currency})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantite" className="form-label">
              Nombre de verres / Invités
            </label>
            <input
              id="quantite"
              type="number"
              min={1}
              value={formData.quantite}
              onChange={(e) => setFormData({ ...formData, quantite: parseInt(e.target.value) || 1 })}
              className={`form-input ${errors.quantite ? 'input-err' : ''}`}
            />
            {errors.quantite && <span className="error-note"><AlertCircle size={14} /> {errors.quantite}</span>}
          </div>
        </div>

        {/* OPTION ÉVÉNEMENT / LOCATION D'ESPACE */}
        <div className="pro-space-box">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.isEventOrSpaceRental}
              onChange={(e) => setFormData({ ...formData, isEventOrSpaceRental: e.target.checked })}
              className="checkbox-input"
            />
            <div className="checkbox-text-wrap">
              <span className="checkbox-title">
                <Building2 size={16} />
                Événement privé ou location de l’espace professionnel
              </span>
              <span className="checkbox-sub">
                Cochez cette option si vous souhaitez privatiser notre salle face à l’océan ou réserver la plage pour votre groupe.
              </span>
            </div>
          </label>
        </div>

        {/* MESSAGE */}
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Précisions ou demandes particulières
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Dites-nous vos envies, allergies éventuelles ou l’ambiance recherchée..."
            className="form-textarea"
          />
        </div>

        {status === 'error' && (
          <div className="general-err-msg">
            <AlertCircle size={18} />
            <span>Une erreur est survenue lors de l’envoi. Veuillez réessayer ou nous joindre directement par téléphone.</span>
          </div>
        )}

        {/* BOUTON D'ENVOI AÉRÉ */}
        <div className="form-submit-row">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full-mobile"
          >
            {status === 'loading' ? (
              <span className="spinner" />
            ) : (
              <>
                <Send size={16} />
                <span>Envoyer ma demande</span>
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .contact-form-card {
          max-width: 820px;
          margin: 0 auto;
          background: #FFFFFF;
          border: 1px solid rgba(14, 116, 144, 0.12);
          border-radius: 32px;
          padding: 64px 56px;
          box-shadow: 0 16px 48px -12px rgba(15, 23, 42, 0.05);
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 28px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 28px;
        }

        .form-label {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--color-sea-dark);
          margin-bottom: 8px;
        }

        .req {
          color: var(--color-sea-blue);
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          background-color: var(--color-bg-warm);
          border: 1px solid rgba(14, 116, 144, 0.16);
          border-radius: 14px;
          padding: 14px 18px;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-text-main);
          outline: none;
          transition: all 300ms ease;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: var(--color-sea-blue);
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
          background-color: #FFFFFF;
        }

        .input-err {
          border-color: #DC2626 !important;
        }

        .error-note {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #DC2626;
          margin-top: 6px;
        }

        .pro-space-box {
          background-color: var(--color-sky-soft);
          border: 1px solid rgba(14, 116, 144, 0.15);
          border-radius: 18px;
          padding: 20px 24px;
          margin-bottom: 32px;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          cursor: pointer;
        }

        .checkbox-input {
          width: 20px;
          height: 20px;
          accent-color: var(--color-sea-blue);
          margin-top: 2px;
        }

        .checkbox-text-wrap {
          display: flex;
          flex-direction: column;
        }

        .checkbox-title {
          font-weight: 500;
          color: var(--color-sea-dark);
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .checkbox-sub {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-top: 4px;
          line-height: 1.5;
        }

        .form-submit-row {
          display: flex;
          justify-content: center;
          margin-top: 16px;
        }

        .general-err-msg {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: #FEF2F2;
          border: 1px solid #FCA5A5;
          color: #B91C1C;
          padding: 12px 18px;
          border-radius: 12px;
          font-size: 0.88rem;
          margin-bottom: 24px;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: spin 700ms linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .contact-form-card {
            padding: 40px 20px;
          }
          .form-grid-2 {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .w-full-mobile {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
