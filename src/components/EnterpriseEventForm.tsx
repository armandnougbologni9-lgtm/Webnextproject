'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Calendar,
  Users,
  GlassWater,
  Sparkles,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  CreditCard,
  MapPin,
  Clock,
} from 'lucide-react';

export default function EnterpriseEventForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    serviceType: 'both', // 'cocktails_bulk' | 'space_rental' | 'both'
    eventDate: '',
    guestsCount: '30-60',
    cocktailVolume: '100',
    eventLocation: 'coctel_bonerris', // 'coctel_bonerris' | 'on_site'
    duration: 'soiree',
    withBartenders: true,
    withMixologyWorkshop: false,
    withMocktails: true,
    estimatedBudget: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi et génération de référence de devis B2B
    setTimeout(() => {
      const randomRef = `CB-CORP-${Math.floor(1000 + Math.random() * 9000)}`;
      setQuoteReference(randomRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  if (isSubmitted) {
    return (
      <div className="corporate-success-box text-center">
        <div className="success-icon-badge">
          <CheckCircle2 size={56} className="text-sea-blue" />
        </div>
        <span className="badge-sea">Demande transmise avec succès</span>
        <h2 className="success-heading">Merci pour votre confiance</h2>
        <p className="success-reference">
          Dossier Événement B2B Référence : <strong>{quoteReference}</strong>
        </p>
        <p className="success-message text-center-readable">
          Notre équipe événementielle étudie vos besoins pour <strong>{formData.companyName}</strong>. Un responsable vous contactera sous 24 heures ouvrées pour vous transmettre une proposition sur-mesure et organiser une dégustation privée.
        </p>

        <div className="success-actions-row">
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="btn-secondary"
          >
            Nouvelle demande
          </button>
          <a
            href="https://me.fedapay.com/Cocktails"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <CreditCard size={18} />
            <span>Payer un acompte via FedaPay</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="corporate-form-card" onSubmit={handleSubmit}>
      <div className="form-header text-center">
        <span className="badge-sea">Devis Sur-Mesure sous 24h</span>
        <h2 className="form-main-title">Réservation Corporate & Grands Volumes</h2>
        <p className="form-sub-desc text-center-readable">
          Commandez vos cocktails en grande quantité ou privatisez notre espace d’exception au bord de l’eau pour vos séminaires, soirées et réceptions.
        </p>
      </div>

      {/* SÉLECTEUR VISUEL DU TYPE DE PRESTATION */}
      <div className="service-type-selector">
        <label className="service-type-label">Choisissez votre formule principale :</label>
        <div className="service-options-grid">
          <button
            type="button"
            className={`service-option-card ${formData.serviceType === 'both' ? 'service-active' : ''}`}
            onClick={() => setFormData((prev) => ({ ...prev, serviceType: 'both' }))}
          >
            <div className="service-card-icon">
              <Sparkles size={24} />
            </div>
            <div className="service-card-title">Formule Intégrale</div>
            <div className="service-card-desc">Espace privatisé vue mer + Cocktails & Barmen sur place</div>
          </button>

          <button
            type="button"
            className={`service-option-card ${formData.serviceType === 'cocktails_bulk' ? 'service-active' : ''}`}
            onClick={() => setFormData((prev) => ({ ...prev, serviceType: 'cocktails_bulk' }))}
          >
            <div className="service-card-icon">
              <GlassWater size={24} />
            </div>
            <div className="service-card-title">Cocktails en Grand Nombre</div>
            <div className="service-card-desc">À partir de 25, 50, 100 à 500+ cocktails artisanaux</div>
          </button>

          <button
            type="button"
            className={`service-option-card ${formData.serviceType === 'space_rental' ? 'service-active' : ''}`}
            onClick={() => setFormData((prev) => ({ ...prev, serviceType: 'space_rental' }))}
          >
            <div className="service-card-icon">
              <Building2 size={24} />
            </div>
            <div className="service-card-title">Privatisation de l’Espace Pro</div>
            <div className="service-card-desc">Salle de séminaire panoramique, terrasse et plage privée</div>
          </button>
        </div>
      </div>

      {/* 1. COORDONNÉES DE L'ENTREPRISE */}
      <div className="form-section-block">
        <h3 className="section-block-title">
          <Building2 size={18} />
          <span>1. Informations sur votre entreprise</span>
        </h3>

        <div className="form-grid-2">
          <div className="input-field-group">
            <label htmlFor="companyName" className="input-label">
              Nom de l’entreprise / Organisation *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              placeholder="Ex: Société Océanique SAS"
              value={formData.companyName}
              onChange={handleChange}
              className="styled-input"
            />
          </div>

          <div className="input-field-group">
            <label htmlFor="contactName" className="input-label">
              Nom & Prénom du responsable *
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              required
              placeholder="Ex: Sarah Johnson"
              value={formData.contactName}
              onChange={handleChange}
              className="styled-input"
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="input-field-group">
            <label htmlFor="email" className="input-label">
              Email professionnel *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="contact@votre-entreprise.com"
              value={formData.email}
              onChange={handleChange}
              className="styled-input"
            />
          </div>

          <div className="input-field-group">
            <label htmlFor="phone" className="input-label">
              Téléphone / WhatsApp direct *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="+229 97 00 00 00"
              value={formData.phone}
              onChange={handleChange}
              className="styled-input"
            />
          </div>
        </div>
      </div>

      {/* 2. DÉTAILS DE L'ÉVÉNEMENT */}
      <div className="form-section-block">
        <h3 className="section-block-title">
          <Calendar size={18} />
          <span>2. Format & Dimensionnement de l’événement</span>
        </h3>

        <div className="form-grid-3">
          <div className="input-field-group">
            <label htmlFor="eventDate" className="input-label">
              Date souhaitée *
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              required
              value={formData.eventDate}
              onChange={handleChange}
              className="styled-input"
            />
          </div>

          <div className="input-field-group">
            <label htmlFor="guestsCount" className="input-label">
              Nombre d’invités estimé
            </label>
            <select
              id="guestsCount"
              name="guestsCount"
              value={formData.guestsCount}
              onChange={handleChange}
              className="styled-input"
            >
              <option value="10-25">10 à 25 personnes</option>
              <option value="25-50">25 à 50 personnes</option>
              <option value="50-100">50 à 100 personnes</option>
              <option value="100-200">100 à 200 personnes</option>
              <option value="200+">Plus de 200 personnes</option>
            </select>
          </div>

          <div className="input-field-group">
            <label htmlFor="cocktailVolume" className="input-label">
              Volume de cocktails souhaité
            </label>
            <select
              id="cocktailVolume"
              name="cocktailVolume"
              value={formData.cocktailVolume}
              onChange={handleChange}
              className="styled-input"
            >
              <option value="50">Pack 50 cocktails</option>
              <option value="100">Pack 100 cocktails</option>
              <option value="200">Pack 200 cocktails</option>
              <option value="350">Pack 350 cocktails</option>
              <option value="500+">500+ cocktails sur-mesure</option>
              <option value="none">Espace seul (sans cocktails)</option>
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="input-field-group">
            <label htmlFor="eventLocation" className="input-label">
              Lieu souhaité de la prestation
            </label>
            <select
              id="eventLocation"
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleChange}
              className="styled-input"
            >
              <option value="coctel_bonerris">Dans notre espace Cóctel Bonerris (au bord de l’océan)</option>
              <option value="on_site">Sur votre site d’entreprise / Autre lieu privatisé</option>
            </select>
          </div>

          <div className="input-field-group">
            <label htmlFor="duration" className="input-label">
              Durée / Format du créneau
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="styled-input"
            >
              <option value="demi_journee">Demi-journée (matin ou après-midi)</option>
              <option value="journee_complete">Journée complète (Séminaire & Réunion)</option>
              <option value="soiree">Soirée cocktail d’entreprise (Coucher de soleil)</option>
              <option value="multi_jours">Format multi-jours</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. OPTIONS SUR-MESURE & BARMEN */}
      <div className="form-section-block">
        <h3 className="section-block-title">
          <Sparkles size={18} />
          <span>3. Services & Options d’accompagnement</span>
        </h3>

        <div className="checkboxes-list">
          <label className="checkbox-custom-item">
            <input
              type="checkbox"
              name="withBartenders"
              checked={formData.withBartenders}
              onChange={handleChange}
              className="checkbox-input"
            />
            <span className="checkbox-text">
              <strong>Présence de nos barmen en t-shirt décontracté</strong> — Service minute, sourire et calme absolu assurés sur place.
            </span>
          </label>

          <label className="checkbox-custom-item">
            <input
              type="checkbox"
              name="withMixologyWorkshop"
              checked={formData.withMixologyWorkshop}
              onChange={handleChange}
              className="checkbox-input"
            />
            <span className="checkbox-text">
              <strong>Atelier d’initiation à la mixologie marine</strong> — Animation team-building conviviale animée par nos chefs barmen.
            </span>
          </label>

          <label className="checkbox-custom-item">
            <input
              type="checkbox"
              name="withMocktails"
              checked={formData.withMocktails}
              onChange={handleChange}
              className="checkbox-input"
            />
            <span className="checkbox-text">
              <strong>Sélection équilibrée de mocktails sans alcool</strong> — Nectars de fruits tropicaux et eaux botaniques.
            </span>
          </label>
        </div>

        <div className="input-field-group mt-4">
          <label htmlFor="notes" className="input-label">
            Précisions sur votre événement, préférences et contraintes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Décrivez vos attentes : thème, cocktails préférés, organisation des prises de parole, régimes alimentaires..."
            value={formData.notes}
            onChange={handleChange}
            className="styled-input styled-textarea"
          />
        </div>
      </div>

      {/* NOTE PAIEMENT FEDAPAY */}
      <div className="fedapay-notice-banner">
        <ShieldCheck size={22} className="banner-icon" />
        <div className="banner-content">
          <strong>Paiement sécurisé FedaPay disponible</strong>
          <p>
            Pour les commandes confirmées ou le règlement des acomptes, Cóctel Bonerris utilise la passerelle sécurisée FedaPay accessible à l’adresse officielle{' '}
            <a
              href="https://me.fedapay.com/Cocktails"
              target="_blank"
              rel="noopener noreferrer"
              className="banner-link"
            >
              https://me.fedapay.com/Cocktails
            </a>.
          </p>
        </div>
      </div>

      {/* BOUTON D'ENVOI */}
      <div className="form-submit-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary btn-submit-corporate"
        >
          {isSubmitting ? (
            <>
              <div className="spinner-border" />
              <span>Génération de votre dossier...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Recevoir notre proposition d’événement (Devis gratuit)</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
