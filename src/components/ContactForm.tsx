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
    </div>
  );
}
