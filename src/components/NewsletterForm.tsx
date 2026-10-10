'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export async function submitNewsletterSubscription(email: string): Promise<{ success: boolean; message?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Veuillez saisir une adresse email valide.' };
  }
  return { success: true };
}

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Veuillez entrer une adresse email valide.');
      return;
    }

    setStatus('loading');
    try {
      const res = await submitNewsletterSubscription(email);
      if (res.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(res.message || 'Une erreur est survenue.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Impossible d’enregistrer votre inscription pour le moment.');
    }
  };

  return (
    <section className="newsletter-section" aria-label="Abonnement aux actualités">
      <div className="container">
        <div className="newsletter-card text-center">
          <span className="badge-sea">Douceur & Nouveautés</span>
          <h3 className="newsletter-title">Restez au frais</h3>
          <p className="newsletter-desc text-center-readable">
            Recevez nos offres et nos nouveaux cocktails directement dans votre boîte de réception.
          </p>

          {status === 'success' ? (
            <div className="newsletter-success-state" role="status">
              <CheckCircle2 size={24} className="text-sea" />
              <p className="success-msg">Merci, à bientôt ! Votre inscription a bien été enregistrée.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Votre adresse email..."
                  className={`newsletter-input ${status === 'error' ? 'input-error' : ''}`}
                  required
                  aria-label="Votre adresse email pour la newsletter"
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  className="newsletter-submit-btn"
                  disabled={status === 'loading'}
                  aria-label="S’abonner à la newsletter"
                >
                  {status === 'loading' ? (
                    <span className="spinner" />
                  ) : (
                    <>
                      <span>S’abonner</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <div className="newsletter-error-state" role="alert">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <p className="spam-notice">
                Pas de spam, désinscription possible à tout moment en un clic.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
