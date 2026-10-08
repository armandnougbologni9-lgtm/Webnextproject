import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Truck, Banknote, PhoneCall, ArrowRight, Home } from 'lucide-react';
import styles from './confirmation.module.css';

export const metadata = {
  title: 'Confirmation de Commande & Livraison — Cocktail House',
  description: 'Votre paiement a été validé avec succès. Découvrez les détails de votre livraison de cocktails.',
};

export default function ConfirmationLivraisonPage() {
  return (
    <main className={styles.container}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <CheckCircle2 size={44} />
        </div>

        <div className={styles.badge}>
          Paiement Confirmé avec Succès
        </div>

        <h1 className={styles.title}>Merci pour Votre Commande !</h1>
        <p className={styles.subtitle}>
          Votre règlement via FedaPay a bien été enregistré. Notre barman mixologue prépare actuellement vos cocktails avec des ingrédients 100% frais et de première qualité.
        </p>

        {/* Encadré d'information sur la livraison et frais payés à la réception */}
        <div className={styles.deliveryNoticeBox}>
          <div className={styles.noticeItem}>
            <Truck size={24} className={styles.noticeIcon} />
            <div>
              <div className={styles.noticeTitle}>Expédition & Acheminement Express</div>
              <div className={styles.noticeText}>
                Votre colis sera expédié très rapidement à l&apos;adresse que vous avez indiquée lors de votre commande. Nos bouteilles et flacons sont conditionnés sous température contrôlée pour préserver toutes leurs saveurs aromatiques.
              </div>
            </div>
          </div>

          <div className={styles.noticeItem}>
            <Banknote size={24} className={styles.noticeIcon} />
            <div>
              <div className={styles.noticeTitle}>Règlement des Frais de Livraison</div>
              <div className={styles.noticeText}>
                <span className={styles.deliveryFeeHighlight}>
                  Important : Les frais de livraison sont à régler directement à la réception dès que le colis vous est livré.
                </span>{' '}
                Le livreur vous remettra votre commande contre le paiement des frais de coursier.
              </div>
            </div>
          </div>

          <div className={styles.noticeItem}>
            <PhoneCall size={24} className={styles.noticeIcon} />
            <div>
              <div className={styles.noticeTitle}>Contact Livreur & Suivi</div>
              <div className={styles.noticeText}>
                Le coursier vous contactera par téléphone ou WhatsApp quelques minutes avant son arrivée pour convenir de la remise en main propre.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.primaryBtn}>
            <Home size={18} />
            <span>Retourner à l&apos;accueil</span>
          </Link>

          <Link href="/commander" className={styles.secondaryBtn}>
            <span>Passer une autre commande</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
