'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * Fonction d'envoi isolée, facilement connectable plus tard à Mailchimp, Resend, Brevo ou une API interne.
 */
export async function submitNewsletterSubscription(email: string): Promise<{ success: boolean; message?: string }> {
  // Simulation d'une requête réseau (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Validation minimale
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Veuillez saisir une adresse email valide.' };
  }

  // Succès
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

      <style jsx>{`
        .newsletter-section {
          padding-top: var(--space-2xl);
          padding-bottom: var(--space-2xl);
          background-color: var(--color-bg-warm);
        }

        .newsletter-card {
          max-width: 680px;
          margin: 0 auto;
          background: #FFFFFF;
          border: 1px solid rgba(14, 116, 144, 0.12);
          border-radius: 28px;
          padding: 64px 48px;
          box-shadow: 0 16px 40px -12px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .newsletter-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3.2vw, 2.5rem);
          color: var(--color-sea-dark);
          font-weight: 400;
          margin-bottom: 8px;
        }

        .newsletter-desc {
          font-size: 1rem;
          color: var(--color-text-muted);
          line-height: var(--line-height-body);
          margin-bottom: 36px;
        }

        .newsletter-form {
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .input-group {
          width: 100%;
          display: flex;
          align-items: center;
          background-color: var(--color-bg-warm);
          border: 1px solid rgba(14, 116, 144, 0.18);
          border-radius: 9999px;
          padding: 6px;
          transition: all 300ms ease;
        }

        .input-group:focus-within {
          border-color: var(--color-sea-blue);
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
          background-color: #FFFFFF;
        }

        .newsletter-input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 12px 20px;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-text-main);
          outline: none;
        }

        .newsletter-input::placeholder {
          color: var(--color-text-light);
        }

        .input-error {
          color: #DC2626;
        }

        .newsletter-submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--color-sea-dark);
          color: #FFFFFF;
          border: none;
          border-radius: 9999px;
          padding: 12px 24px;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 300ms ease;
        }

        .newsletter-submit-btn:hover:not(:disabled) {
          background-color: var(--color-sea-blue);
          transform: translateY(-1px);
        }

        .newsletter-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spam-notice {
          font-size: 0.8rem;
          color: var(--color-text-light);
          margin-top: 14px;
        }

        .newsletter-success-state {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 28px;
          background-color: var(--color-sky-soft);
          border: 1px solid rgba(14, 116, 144, 0.15);
          border-radius: 9999px;
          color: var(--color-sea-blue);
          font-size: 0.95rem;
          font-weight: 500;
        }

        .newsletter-error-state {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #DC2626;
          font-size: 0.85rem;
          margin-top: 12px;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: spin 700ms linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .newsletter-card {
            padding: 44px 24px;
          }
          .input-group {
            flex-direction: column;
            border-radius: 20px;
            padding: 12px;
            gap: 12px;
          }
          .newsletter-input {
            width: 100%;
            text-align: center;
          }
          .newsletter-submit-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
