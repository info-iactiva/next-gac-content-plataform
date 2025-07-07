import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma/prisma'

export async function POST(req: NextRequest) {
  const body = await req.json();

  const eventType = body.event_type;
  const subscriptionId = body.resource?.id;
  const status = body.resource?.status;

  if (!subscriptionId) {
    return NextResponse.json({ error: "No subscription ID" }, { status: 400 });
  }

  // Ejemplos de eventos útiles:
  // - BILLING.SUBSCRIPTION.CANCELLED
  // - BILLING.SUBSCRIPTION.UPDATED
  // - PAYMENT.SALE.COMPLETED

  if (eventType.startsWith("BILLING.SUBSCRIPTION")) {
    await prisma.subscription.updateMany({
      where: { paypalId: subscriptionId },
      data: {
        status,
        nextBillingDate: body.resource?.billing_info?.next_billing_time
          ? new Date(body.resource.billing_info.next_billing_time)
          : null,
      },
    });
  }

  return NextResponse.json({ message: "Webhook recibido" });
}
