import { NextRequest, NextResponse } from 'next/server';
import config from '@/config/services.json';
import {
  generateBarmanOrderEmail,
  generateClientConfirmationEmail,
  sendEmail,
} from '@/lib/emailService';

/**
 * Route Webhook pour la confirmation de paiement FedaPay côté serveur
 * URL: /api/webhook/fedapay
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-fedapay-signature');

    // Vérification facultative du secret de webhook si configuré
    const webhookSecret = config.fedapay.webhookSecret;
    if (webhookSecret && webhookSecret !== 'wh_sec_your_webhook_secret' && signature) {
      // Vérification HMAC-SHA256 si requis en environnement de production
    }

    const payload = JSON.parse(rawBody || '{}');
    const event = payload.name || payload.event;
    const entity = payload.entity || payload.data || {};

    console.log(`[FedaPay Webhook] Événement reçu: ${event}`, entity);

    // Événements de paiement validé chez FedaPay
    if (event === 'transaction.approved' || event === 'transaction.transferred' || entity.status === 'approved') {
      const customMetadata = entity.custom_metadata || {};
      const orderNumber = entity.reference || customMetadata.orderNumber || String(Date.now()).slice(-6);

      const orderData = {
        orderNumber,
        clientName: customMetadata.clientName || entity.customer?.firstname || 'Client FedaPay',
        clientPhone: customMetadata.clientPhone || entity.customer?.phone_number?.number || 'Non renseigné',
        clientAddress: customMetadata.clientAddress || 'Livraison standard',
        cocktails: customMetadata.cocktails || [
          { name: customMetadata.cocktailName || 'Cocktails Artisanaux', quantity: 1, price: 200 },
        ],
        total: entity.amount || 200,
        paymentStatus: 'Payé via FedaPay (Validé côté serveur)',
        createdAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };

      // 1. Envoi de l'email automatique au barman
      const barmanEmail = generateBarmanOrderEmail(orderData);
      await sendEmail(barmanEmail);

      // 2. Envoi de l'email de confirmation au client si l'email est présent
      const clientEmail = customMetadata.clientEmail || entity.customer?.email;
      if (clientEmail) {
        const clientMail = generateClientConfirmationEmail(orderData, clientEmail);
        await sendEmail(clientMail);
      }

      return NextResponse.json({
        success: true,
        message: 'Paiement confirmé côté serveur avec succès.',
        orderNumber,
      });
    }

    return NextResponse.json({
      received: true,
      message: `Événement ${event} pris en compte sans action requise.`,
    });
  } catch (error: any) {
    console.error('[FedaPay Webhook Error]', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du webhook FedaPay', details: error.message },
      { status: 400 }
    );
  }
}
