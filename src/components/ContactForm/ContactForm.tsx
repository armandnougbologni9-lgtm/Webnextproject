'use client';

import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Wine,
  Hash,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { COCKTAILS } from '@/data/cocktails';
import styles from './ContactForm.module.css';

interface FormData {
  nom: string;
  telephone: string;
  email: string;
  cocktail: string;
  quantite: number;
  date: string;
  message: string;
}

interface FormErrors {
  nom?: string;
  telephone?: string;
  email?: string;
  cocktail?: string;
  quantite?: string;
  date?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    telephone: '',
    email: '',
    cocktail: COCKTAILS[0]?.name || 'Le Smoking Old Fashioned',
    quantite: 1,
    date: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Veuillez renseigner votre nom complet.';
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit comporter au moins 2 caractères.';
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Veuillez saisir votre numéro de téléphone.';
    } else if (!/^[0-9+\s().-]{8,20}$/.test(formData.telephone.trim())) {
      newErrors.telephone = 'Format de téléphone invalide.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Veuillez renseigner votre adresse email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Veuillez saisir une adresse email valide.';
    }

    if (!formData.cocktail) {
      newErrors.cocktail = 'Veuillez choisir un cocktail.';
    }

    if (!formData.quantite || formData.quantite < 1) {
      newErrors.quantite = 'La quantité minimale est de 1.';
    }

    if (!formData.date) {
      newErrors.date = 'Veuillez sélectionner la date souhaitée.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantite' ? Number(value) : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    // Simulation de l'envoi asynchrone (aucun service externe connecté)
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      nom: '',
      telephone: '',
      email: '',
      cocktail: COCKTAILS[0]?.name || '',
      quantite: 1,
      date: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <section className={styles.section} id="contact" aria-label="Commander des cocktails ou nous contacter">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Prise de Commande & Contact</span>
          <h2 className={styles.title}>Réservez Vos Cocktails Signatures</h2>
          <p className={styles.description}>
            Indiquez vos envies et la date de votre dégustation. Notre barman mixologue prépare votre commande sur mesure avec le plus grand soin.
          </p>
        </div>

        <div className={styles.formCard}>
          {isSuccess ? (
            <div className={styles.successCard} role="status" aria-live="polite">
              <div className={styles.successIconWrapper}>
                <CheckCircle2 size={36} />
              </div>
              <h3 className={styles.successTitle}>Demande reçue avec succès !</h3>
              <p className={styles.successText}>
                Merci <strong>{formData.nom}</strong>. Votre demande de commande pour{' '}
                <strong>
                  {formData.quantite}x {formData.cocktail}
                </strong>{' '}
                le <strong>{formData.date}</strong> a bien été enregistrée. Nous vous contacterons sous 24h à <strong>{formData.email}</strong>.
              </p>
              <button type="button" className={styles.resetBtn} onClick={handleReset}>
                Passer une autre commande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.grid}>
                {/* Nom */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="nom" className={styles.label}>
                    <span>
                      Nom complet <span className={styles.requiredMark}>*</span>
                    </span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <User size={18} className={styles.inputIcon} />
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Ex: Armand Dupont"
                      className={`${styles.input} ${errors.nom ? styles.inputError : ''}`}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  {errors.nom && (
                    <span className={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {errors.nom}
                    </span>
                  )}
                </div>

                {/* Téléphone */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="telephone" className={styles.label}>
                    <span>
                      Téléphone <span className={styles.requiredMark}>*</span>
                    </span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Phone size={18} className={styles.inputIcon} />
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="Ex: 06 12 34 56 78"
                      className={`${styles.input} ${errors.telephone ? styles.inputError : ''}`}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  {errors.telephone && (
                    <span className={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {errors.telephone}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.label}>
                    <span>
                      Adresse Email <span className={styles.requiredMark}>*</span>
                    </span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nom@exemple.fr"
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  {errors.email && (
                    <span className={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Cocktail souhaité */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="cocktail" className={styles.label}>
                    <span>
                      Cocktail souhaité <span className={styles.requiredMark}>*</span>
                    </span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Wine size={18} className={styles.inputIcon} />
                    <select
                      id="cocktail"
                      name="cocktail"
                      value={formData.cocktail}
                      onChange={handleChange}
                      className={`${styles.select} ${errors.cocktail ? styles.inputError : ''}`}
                      disabled={isLoading}
                      required
                    >
                      {COCKTAILS.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name} ({c.price} €)
                        </option>
                      ))}
                      <option value="Création personnalisée sur-mesure">
                        Création personnalisée sur-mesure
                      </option>
                    </select>
                  </div>
                  {errors.cocktail && (
                    <span className={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {errors.cocktail}
                    </span>
                  )}
                </div>

                {/* Quantité */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="quantite" className={styles.label}>
                    <span>
                      Quantité de verres <span className={styles.requiredMark}>*</span>
                    </span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Hash size={18} className={styles.inputIcon} />
                    <input
                      type="number"
                      id="quantite"
                      name="quantite"
                      min={1}
                      max={100}
                      value={formData.quantite}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.quantite ? styles.inputError : ''}`}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  {errors.quantite && (
                    <span className={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {errors.quantite}
                    </span>
                  )}
                </div>

                {/* Date souhaitée */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="date" className={styles.label}>
                    <span>
                      Date souhaitée <span className={styles.requiredMark}>*</span>
                    </span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Calendar size={18} className={styles.inputIcon} />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  {errors.date && (
                    <span className={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {errors.date}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                  <label htmlFor="message" className={styles.label}>
                    <span>Message / Précisions particulières (allergies, glaçons, etc.)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Indiquez ici vos souhaits d'horaire, préférences gustatives ou toute précision..."
                    className={styles.textarea}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isLoading}
                aria-label="Envoyer ma demande de commande"
              >
                {isLoading ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    <span>Traitement en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Envoyer ma demande</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
