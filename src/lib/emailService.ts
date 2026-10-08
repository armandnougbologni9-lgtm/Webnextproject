// Service d'envoi d'emails transactionnels (Resend / EmailJS / SendGrid)
// Utilisable côté serveur et compatible avec le fichier config-services.json

import config from '@/config/services.json';

export interface EmailOrderPayload {
  orderNumber: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  cocktails: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  paymentStatus: string;
  createdAt: string;
}

export interface EmailQuotePayload {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  eventType: string;
  eventDate: string;
  guestsCount: number;
  message: string;
  createdAt: string;
}

/**
 * 1. Email au Barman lors d'une commande payée
 */
export function generateBarmanOrderEmail(order: EmailOrderPayload) {
  const cocktailLines = order.cocktails
    .map((c) => `- ${c.quantity}x ${c.name} (${c.price * c.quantity} FCFA)`)
    .join('\n');

  return {
    to: config.emailService.barmanEmail,
    subject: `Nouvelle commande n°${order.orderNumber} – ${order.total} FCFA`,
    text: `Bonjour l'équipe,\n\nUne nouvelle commande vient d'être réglée avec succès via FedaPay !\n\n` +
      `DÉTAILS DE LA COMMANDE :\n` +
      `• Numéro : #${order.orderNumber}\n` +
      `• Client : ${order.clientName}\n` +
      `• Téléphone : ${order.clientPhone}\n` +
      `• Adresse de livraison : ${order.clientAddress}\n` +
      `• Heure de commande : ${order.createdAt}\n` +
      `• Statut FedaPay : ${order.paymentStatus}\n\n` +
      `COCKTAILS À PRÉPARER :\n${cocktailLines}\n\n` +
      `TOTAL : ${order.total} FCFA\n\n` +
      `Accéder directement à la commande dans l'espace barman : http://localhost:3001/admin.html#order-${order.orderNumber}\n\n` +
      `À vos shakers !`,
  };
}

/**
 * 2. Email au Barman lors d'une demande de devis événement
 */
export function generateBarmanQuoteEmail(quote: EmailQuotePayload) {
  return {
    to: config.emailService.barmanEmail,
    subject: `Nouvelle demande de devis – ${quote.eventType}`,
    text: `Bonjour l'équipe,\n\nUn client vient de solliciter un devis pour une prestation événementielle :\n\n` +
      `• Client : ${quote.clientName}\n` +
      `• Téléphone : ${quote.clientPhone}\n` +
      `• Email : ${quote.clientEmail}\n` +
      `• Type d'événement : ${quote.eventType}\n` +
      `• Date prévue : ${quote.eventDate}\n` +
      `• Nombre d'invités : ${quote.guestsCount}\n` +
      `• Message / Souhaits particuliers : ${quote.message || 'Aucun message spécifique'}\n\n` +
      `Retrouvez cette demande dans l'espace barman : http://localhost:3001/admin.html#devis`,
  };
}

/**
 * 3. Email au Client après paiement confirmé
 */
export function generateClientConfirmationEmail(order: EmailOrderPayload, clientEmail: string) {
  const cocktailLines = order.cocktails
    .map((c) => `• ${c.quantity}x ${c.name}`)
    .join('\n');

  return {
    to: clientEmail,
    subject: `Merci pour votre commande n°${order.orderNumber} – Cocktail House`,
    text: `Bonjour ${order.clientName},\n\n` +
      `Nous vous remercions chaleureusement pour votre commande !\n` +
      `Votre règlement de ${order.total} FCFA a été validé avec succès par FedaPay.\n\n` +
      `RÉCAPITULATIF :\n${cocktailLines}\n\n` +
      `• Adresse de livraison : ${order.clientAddress}\n` +
      `• Frais de livraison : À régler directement au coursier à la réception.\n` +
      `• Glaçons purs et froid protecteur : Offerts avec votre commande.\n\n` +
      `DÉLAI DE PRÉPARATION ESTIMÉ :\n` +
      `Nos barmen préparent vos verres minute. Votre commande vous sera livrée sous 30 à 45 minutes.\n\n` +
      `Pour toute question ou consigne au coursier : +229 01 02 03 04 (ou WhatsApp direct).\n\n` +
      `Bonne dégustation,\nL'Atelier Cocktail House`,
  };
}

/**
 * 4. Email au Client quand le statut passe à « En livraison »
 */
export function generateClientShippingEmail(order: EmailOrderPayload, clientEmail: string) {
  return {
    to: clientEmail,
    subject: `Votre commande n°${order.orderNumber} est en route ! – Cocktail House`,
    text: `Bonjour ${order.clientName},\n\n` +
      `Excellente nouvelle : votre commande n°${order.orderNumber} vient de quitter notre comptoir.\n` +
      `Notre coursier est en route vers votre adresse (${order.clientAddress}) avec vos cocktails hermétiquement scellés et parfaitement glacés.\n\n` +
      `Le livreur vous contactera par téléphone ou WhatsApp dans quelques instants à son arrivée.\n\n` +
      `Rappel : les frais de coursier sont à lui régler directement en main propre.\n\n` +
      `À tout de suite !\nCocktail House`,
  };
}

/**
 * Fonction universelle d'envoi d'email
 */
export async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
  const apiKey = config.emailService.resendApiKey;

  // Si une clé Resend est configurée
  if (apiKey && apiKey.startsWith('re_') && !apiKey.includes('your_api_key')) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: config.emailService.senderEmail,
          to,
          subject,
          text,
        }),
      });
      return { success: res.ok, status: res.status };
    } catch (err) {
      console.error('[EmailService] Erreur lors de l\'envoi Resend:', err);
    }
  }

  // Fallback de journalisation (logs)
  console.log(`[EmailService - Simulation Envoi]\nÀ: ${to}\nObjet: ${subject}\nCorps:\n${text}\n-------------------`);
  return { success: true, simulated: true };
}
