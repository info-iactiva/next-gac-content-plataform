import { NextRequest, NextResponse } from "next/server";
import { getPaypalAccessToken } from "../helpers/helper";
import { prisma } from '@/lib/prisma/prisma'

export async function POST(req: NextRequest) {
  const { subscriptionID, userId ,planId} = await req.json();

  const token = await getPaypalAccessToken();
  const base = process.env.PAYPAL_API_BASE!;

  const res = await fetch(`${base}/v1/billing/subscriptions/${subscriptionID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();  

  if (!res.ok) return NextResponse.json({ error: data }, { status: 400 });
  
  // Guardar en tu base de datos
  await prisma.subscription.create({
    data: {
      userId,
      paypalId: data.id,
      planId: data.plan_id,
      status: data.status,
      startDate: new Date(data.start_time),
      nextBillingDate: data.billing_info?.next_billing_time
        ? new Date(data.billing_info.next_billing_time)
        : null,
    },
  });

  await createPlanLocal(planId,userId)

  return NextResponse.json({ message: "Suscripción guardada", data });
}


const createPlanLocal = async (planId: string,idUser:number) => {
    const plan = await listPlanesPaypal(planId);

    if (plan.error) {
      return NextResponse.json({ error: "Plan No Encontrado" },{ status: 400 });
    }

    const planlocal = await getLocalPlanID(plan.plan.name)    

            
    const now = new Date()      

    const userobkect = await prisma.user.findUnique({
      where: { id: idUser },  
    });

    if (!userobkect) {
      return NextResponse.json({ error: "Usuario No Encontrado" },{ status: 400 });
    }

    await prisma.user.update({
      where: { id: idUser },
      data: {
        planId: planlocal.id,
        is_pagado: true,
        fechaPlanContratado: now,
        is_active: true,
      },
  });


    return true
}

const listPlanesPaypal = async (planId: string) => {
  try {
    const accessToken = await getPaypalAccessToken();
    const base = process.env.PAYPAL_API_BASE!;

    // Obtener directamente el plan por su ID
    const res = await fetch(`${base}/v1/billing/plans/${planId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {error: data,status: res.status}
    }

    return { plan: data }
  } catch (err: any) {
    return {
       error: err.message || "Internal Server Error" ,
       status: 500 
    }
  }
};



const getLocalPlanID  = async (planname:string) => {

    const planesRelations = {
      'Plan Básico Mensual': 'Básico',
      'Plan Pro Mensual': 'Pro',
      'Plan Pro Anual con Descuento':'Pro Con Descuento',
    }    

    const plan = await prisma.plan.findUnique({
      where: { nombre: planesRelations[planname] },
    })

    return plan

}