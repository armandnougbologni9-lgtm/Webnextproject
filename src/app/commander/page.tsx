'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Wine,
  Sparkles,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Users,
  Send,
  AlertCircle,
  Hash,
  CreditCard,
  Truck,
  ExternalLink,
} from 'lucide-react';
import { COCKTAILS, Cocktail } from '@/data/cocktails';
import styles from './commander.module.css';

const FEDAPAY_PAYMENT_URL = 'https://me.fedapay.com/MjEZRb7k';

function CommanderContent() {
  const searchParams = useSearchParams();
  const cocktailParam = searchParams.get('cocktail');
  const typeParam = searchParams.get('type');
  const formuleParam = searchParams.get('formule');

  // Onglet : 'cocktails' ou 'evenement'
  const [activeTab, setActiveTab] = useState<'cocktails' | 'evenement'>(
    typeParam === 'evenement' ? 'evenement' : 'cocktails'
  );

  // Cocktail sélectionné
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail>(() => {
    if (cocktailParam) {
      const found = COCKTAILS.find(
        (c) => c.id === cocktailParam || c.name.toLowerCase() === cocktailParam.toLowerCase()
      );
      if (found) return found;
    }
    return COCKTAILS[0];
  });

  // Quantité et calcul de prix
  const [quantite, setQuantite] = useState<number>(1);

  // Formulaire Cocktails
  const [cocktailForm, setCocktailForm] = useState({
    nom: '',
    telephone: '',
    email: '',
    date: '',
    adresse: '',
    message: '',
  });

  // Formulaire Événements
  const [eventForm, setEventForm] = useState({
    nom: '',
    entreprise: '',
    telephone: '',
    email: '',
    formule: formuleParam || 'mariage-celebration',
    nbInvites: 50,
    date: '',
    ville: '',
    barmanInclus: 'oui',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [todayString, setTodayString] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTodayString(today);
  }, []);

  useEffect(() => {
    if (cocktailParam) {
      const found = COCKTAILS.find(
        (c) => c.id === cocktailParam || c.name.toLowerCase() === cocktailParam.toLowerCase()
      );
      if (found) {
        setSelectedCocktail(found);
        setActiveTab('cocktails');
      }
    }
    if (typeParam === 'evenement') {
      setActiveTab('evenement');
    }
  }, [cocktailParam, typeParam]);

  const handleCocktailFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCocktailForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleEventFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({
      ...prev,
      [name]: name === 'nbInvites' ? Number(value) : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (activeTab === 'cocktails') {
      if (!cocktailForm.nom.trim()) errs.nom = 'Nom complet requis.';
      if (!cocktailForm.telephone.trim()) errs.telephone = 'Numéro de téléphone requis.';
      if (!cocktailForm.email.trim() || !cocktailForm.email.includes('@'))
        errs.email = 'Adresse email valide requise.';
      if (!cocktailForm.date) errs.date = 'Date de dégustation requise.';
      if (!cocktailForm.adresse.trim()) errs.adresse = 'Adresse de livraison requise.';
    } else {
      if (!eventForm.nom.trim()) errs.nom = 'Nom de contact requis.';
      if (!eventForm.telephone.trim()) errs.telephone = 'Téléphone requis.';
      if (!eventForm.email.trim() || !eventForm.email.includes('@'))
        errs.email = 'Adresse email valide requise.';
      if (!eventForm.date) errs.date = 'Date de l’événement requise.';
      if (!eventForm.ville.trim()) errs.ville = 'Ville ou commune requise.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (activeTab === 'cocktails') {
      // Sauvegarder les détails de commande
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(
          'cocktail_order',
          JSON.stringify({
            cocktail: selectedCocktail.name,
            quantite,
            total: totalPrice,
            client: cocktailForm,
          })
        );
      }

      setIsRedirecting(true);
      // Redirection vers le lien FedaPay fourni
      setTimeout(() => {
        window.location.href = FEDAPAY_PAYMENT_URL;
      }, 900);
    } else {
      // Pour les événements (demande de devis)
      setIsRedirecting(true);
      setTimeout(() => {
        window.location.href = '/confirmation-livraison';
      }, 900);
    }
  };

  const totalPrice = selectedCocktail.price * quantite;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className="container">
        {/* Barre de retour */}
        <div className={styles.topBar}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={18} />
            <span>Retour à l&apos;accueil & nos cocktails</span>
          </Link>
        </div>

        {/* En-tête de la page */}
        <header className={styles.pageHeader}>
          <span className={styles.subtitle}>Espace Commande & Réservation</span>
          <h1 className={styles.title}>
            {activeTab === 'cocktails' ? 'Votre Commande de Cocktails' : 'Devis Prestation Événementielle'}
          </h1>
          <p className={styles.description}>
            {activeTab === 'cocktails'
              ? 'Sélectionnez vos cocktails artisanaux (tarif unique de 200 FCFA par verre), renseignez votre adresse puis procédez au règlement sécurisé via FedaPay.'
              : 'Privatisez un bar à cocktails et nos barmen mixologues pour votre réception privée, mariage ou gala.'}
          </p>
        </header>

        {/* Sélecteur d'onglets */}
        <div className={styles.tabsContainer} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'cocktails'}
            className={`${styles.tabBtn} ${activeTab === 'cocktails' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('cocktails')}
          >
            <Wine size={18} />
            <span>Cocktails à l&apos;unité & Packs (200 FCFA)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'evenement'}
            className={`${styles.tabBtn} ${activeTab === 'evenement' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('evenement')}
          >
            <Sparkles size={18} />
            <span>Bar pour Événement & Barmen Privés</span>
          </button>
        </div>

        {activeTab === 'cocktails' ? (
          /* Mode Cocktails avec récapitulatif visuel */
          <div className={styles.orderLayout}>
            {/* Colonne Récapitulatif Visuel du Cocktail choisi */}
            <aside className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <h2 className={styles.summaryTitle}>Votre Sélection</h2>
                <span className={styles.previewPrice}>{selectedCocktail.price} FCFA / verre</span>
              </div>

              <div className={styles.selectedCocktailPreview}>
                <div className={styles.previewImageFrame}>
                  <Image
                    src={selectedCocktail.image}
                    alt={selectedCocktail.name}
                    width={180}
                    height={180}
                    className={styles.previewImage}
                  />
                </div>
                <div className={styles.previewDetails}>
                  <h3 className={styles.previewName}>{selectedCocktail.name}</h3>
                  <span className={styles.previewTagline}>{selectedCocktail.tagline}</span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
                    {selectedCocktail.ingredients.join(', ')}
                  </span>
                </div>
              </div>

              {/* Sélecteur rapide d'autres cocktails */}
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 10 }}>
                Changer de cocktail (200 FCFA chacun) :
              </p>
              <div className={styles.cocktailSelectorGrid}>
                {COCKTAILS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCocktail(c)}
                    className={`${styles.cocktailThumb} ${selectedCocktail.id === c.id ? styles.thumbSelected : ''}`}
                  >
                    <div className={styles.thumbName}>{c.name}</div>
                    <div className={styles.thumbPrice}>{c.price} FCFA</div>
                  </button>
                ))}
              </div>

              {/* Calcul dynamique du prix */}
              <div className={styles.pricingBreakdown}>
                <div className={styles.pricingRow}>
                  <span>Prix unitaire</span>
                  <span>{selectedCocktail.price} FCFA</span>
                </div>
                <div className={styles.pricingRow}>
                  <span>Quantité sélectionnée</span>
                  <span>{quantite} verre{quantite > 1 ? 's' : ''}</span>
                </div>
                <div className={styles.pricingRow}>
                  <span>Paiement en ligne</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>FedaPay Sécurisé</span>
                </div>
                <div className={styles.pricingRow}>
                  <span>Frais de livraison</span>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Payés dès réception</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Total Cocktail</span>
                  <span className={styles.totalPrice}>{totalPrice} FCFA</span>
                </div>
              </div>

              {/* Note information livraison */}
              <div style={{ marginTop: 20, padding: 14, background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid var(--color-border)', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--color-primary)' }}>📦 Information importante :</strong> Le paiement du cocktail ({totalPrice} FCFA) s&apos;effectue immédiatement par FedaPay. Les frais de livraison seront à régler directement au livreur dès la réception de votre colis.
              </div>
            </aside>

            {/* Formulaire de livraison / commande */}
            <div className={styles.formCard}>
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.formGrid}>
                  {/* Quantité */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="quantite">
                      Nombre de cocktails <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <Hash size={18} className={styles.inputIcon} />
                      <input
                        type="number"
                        id="quantite"
                        min={1}
                        max={100}
                        value={quantite}
                        onChange={(e) => setQuantite(Math.max(1, Number(e.target.value)))}
                        className={styles.input}
                        required
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="date">
                      Date de livraison / dégustation <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <Calendar size={18} className={styles.inputIcon} />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        min={todayString}
                        value={cocktailForm.date}
                        onChange={handleCocktailFormChange}
                        className={`${styles.input} ${errors.date ? styles.error : ''}`}
                        required
                      />
                    </div>
                    {errors.date && <span className={styles.errorText}><AlertCircle size={14} />{errors.date}</span>}
                  </div>

                  {/* Nom */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="nom">
                      Nom complet <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <User size={18} className={styles.inputIcon} />
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={cocktailForm.nom}
                        onChange={handleCocktailFormChange}
                        placeholder="Ex: Armand Dupont"
                        className={`${styles.input} ${errors.nom ? styles.error : ''}`}
                        required
                      />
                    </div>
                    {errors.nom && <span className={styles.errorText}><AlertCircle size={14} />{errors.nom}</span>}
                  </div>

                  {/* Téléphone */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="telephone">
                      Numéro de téléphone (pour livraison) <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <Phone size={18} className={styles.inputIcon} />
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={cocktailForm.telephone}
                        onChange={handleCocktailFormChange}
                        placeholder="Ex: +229 97 00 00 00"
                        className={`${styles.input} ${errors.telephone ? styles.error : ''}`}
                        required
                      />
                    </div>
                    {errors.telephone && <span className={styles.errorText}><AlertCircle size={14} />{errors.telephone}</span>}
                  </div>

                  {/* Email */}
                  <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="email">
                      Adresse Email <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <Mail size={18} className={styles.inputIcon} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={cocktailForm.email}
                        onChange={handleCocktailFormChange}
                        placeholder="votre-email@exemple.com"
                        className={`${styles.input} ${errors.email ? styles.error : ''}`}
                        required
                      />
                    </div>
                    {errors.email && <span className={styles.errorText}><AlertCircle size={14} />{errors.email}</span>}
                  </div>

                  {/* Adresse */}
                  <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="adresse">
                      Adresse ou quartier de livraison <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <MapPin size={18} className={styles.inputIcon} />
                      <input
                        type="text"
                        id="adresse"
                        name="adresse"
                        value={cocktailForm.adresse}
                        onChange={handleCocktailFormChange}
                        placeholder="Ex: Cotonou, Haie Vive, Rue 312 ou quartier..."
                        className={`${styles.input} ${errors.adresse ? styles.error : ''}`}
                        required
                      />
                    </div>
                    {errors.adresse && <span className={styles.errorText}><AlertCircle size={14} />{errors.adresse}</span>}
                  </div>

                  {/* Message */}
                  <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="message">
                      Précisions particulières (heure souhaitée, glaçons, allergies)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={cocktailForm.message}
                      onChange={handleCocktailFormChange}
                      placeholder="Indiquez ici vos souhaits particuliers..."
                      className={styles.textarea}
                    />
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isRedirecting}>
                  {isRedirecting ? (
                    <span>Redirection vers FedaPay en cours...</span>
                  ) : (
                    <>
                      <CreditCard size={18} />
                      <span>Payer {totalPrice} FCFA sur FedaPay</span>
                      <ExternalLink size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Mode Événement */
          <div className={styles.singleColumn}>
            <div className={styles.formCard}>
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.formGrid}>
                  {/* Formule souhaitée */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="formule">
                      Formule événementielle souhaitée
                    </label>
                    <select
                      id="formule"
                      name="formule"
                      value={eventForm.formule}
                      onChange={handleEventFormChange}
                      className={styles.select}
                    >
                      <option value="soiree-privee">Cocktail Party Privée (10 - 35 invités)</option>
                      <option value="mariage-celebration">Mariages & Grands Jours (40 - 150 invités)</option>
                      <option value="corporate-gala">Corporate & Soirées Gala (100 - 500+ invités)</option>
                      <option value="sur-mesure">Projet 100% sur-mesure</option>
                    </select>
                  </div>

                  {/* Nombre d'invités */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="nbInvites">
                      Nombre d&apos;invités estimé
                    </label>
                    <div className={styles.inputWrapper}>
                      <Users size={18} className={styles.inputIcon} />
                      <input
                        type="number"
                        id="nbInvites"
                        name="nbInvites"
                        min={5}
                        max={1000}
                        value={eventForm.nbInvites}
                        onChange={handleEventFormChange}
                        className={styles.input}
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="eventDate">
                      Date de l&apos;événement <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <Calendar size={18} className={styles.inputIcon} />
                      <input
                        type="date"
                        id="eventDate"
                        name="date"
                        min={todayString}
                        value={eventForm.date}
                        onChange={handleEventFormChange}
                        className={`${styles.input} ${errors.date ? styles.error : ''}`}
                        required
                      />
                    </div>
                    {errors.date && <span className={styles.errorText}><AlertCircle size={14} />{errors.date}</span>}
                  </div>

                  {/* Ville */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="ville">
                      Lieu / Ville de réception <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <MapPin size={18} className={styles.inputIcon} />
                      <input
                        type="text"
                        id="ville"
                        name="ville"
                        value={eventForm.ville}
                        onChange={handleEventFormChange}
                        placeholder="Ex: Cotonou, Calavi, Ouidah..."
                        className={`${styles.input} ${errors.ville ? styles.error : ''}`}
                        required
                      />
                    </div>
                    {errors.ville && <span className={styles.errorText}><AlertCircle size={14} />{errors.ville}</span>}
                  </div>

                  {/* Nom contact */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="eventNom">
                      Nom & Prénom <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <User size={18} className={styles.inputIcon} />
                      <input
                        type="text"
                        id="eventNom"
                        name="nom"
                        value={eventForm.nom}
                        onChange={handleEventFormChange}
                        placeholder="Ex: Sophie Martin"
                        className={`${styles.input} ${errors.nom ? styles.error : ''}`}
                        required
                      />
                    </div>
                    {errors.nom && <span className={styles.errorText}><AlertCircle size={14} />{errors.nom}</span>}
                  </div>

                  {/* Entreprise éventuelle */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="entreprise">
                      Entreprise / Organisation (facultatif)
                    </label>
                    <input
                      type="text"
                      id="entreprise"
                      name="entreprise"
                      value={eventForm.entreprise}
                      onChange={handleEventFormChange}
                      placeholder="Ex: Agence Média SARL"
                      className={styles.input}
                    />
                  </div>

                  {/* Téléphone */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="eventTelephone">
                      Téléphone <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <Phone size={18} className={styles.inputIcon} />
                      <input
                        type="tel"
                        id="eventTelephone"
                        name="telephone"
                        value={eventForm.telephone}
                        onChange={handleEventFormChange}
                        placeholder="Ex: +229 97 00 00 00"
                        className={`${styles.input} ${errors.telephone ? styles.error : ''}`}
                        required
                      />
                    </div>
                    {errors.telephone && <span className={styles.errorText}><AlertCircle size={14} />{errors.telephone}</span>}
                  </div>

                  {/* Email */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="eventEmail">
                      Email <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                      <Mail size={18} className={styles.inputIcon} />
                      <input
                        type="email"
                        id="eventEmail"
                        name="email"
                        value={eventForm.email}
                        onChange={handleEventFormChange}
                        placeholder="sophie@evenement.com"
                        className={`${styles.input} ${errors.email ? styles.error : ''}`}
                        required
                      />
                    </div>
                    {errors.email && <span className={styles.errorText}><AlertCircle size={14} />{errors.email}</span>}
                  </div>

                  {/* Message & Détails */}
                  <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="eventMessage">
                      Détails de votre réception (thématique, créneau horaire, cocktails favoris)
                    </label>
                    <textarea
                      id="eventMessage"
                      name="message"
                      value={eventForm.message}
                      onChange={handleEventFormChange}
                      placeholder="Décrivez votre événement, vos attentes, l'ambiance recherchée..."
                      className={styles.textarea}
                    />
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isRedirecting}>
                  {isRedirecting ? (
                    <span>Génération de votre devis...</span>
                  ) : (
                    <>
                      <span>Recevoir mon devis personnalisé</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommanderPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chargement...</div>}>
      <CommanderContent />
    </Suspense>
  );
}
