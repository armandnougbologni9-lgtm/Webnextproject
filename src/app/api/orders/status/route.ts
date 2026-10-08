import { NextRequest, NextResponse } from 'next/server';
import { generateClientShippingEmail, sendEmail } from '@/lib/emailService';

/**
 * Route API pour notifier le client lors du changement de statut en direct
 * URL: /api/orders/status
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order, newStatus, clientEmail } = body;

    if (newStatus === 'En livraison' && clientEmail) {
      const email = generateClientShippingEmail(order, clientEmail);
      await sendEmail(email);
    }

    return NextResponse.json({ success: true, newStatus });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
