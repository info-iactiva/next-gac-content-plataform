import { NextRequest, NextResponse } from "next/server";
import { getPaypalAccessToken } from "../helpers/helper";

export async function POST(req: NextRequest) {
  try {
    const accessToken = await getPaypalAccessToken();
    const base = process.env.PAYPAL_API_BASE!;

    if (!accessToken) {
      return NextResponse.json({ error: "No access token" }, { status: 500 });
    }

    // 1. Obtener todos los planes (máximo 20)
    const resPlans = await fetch(`${base}/v1/billing/plans?page_size=20`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!resPlans.ok) {
      const error = await resPlans.json();
      return NextResponse.json({ error }, { status: resPlans.status });
    }

    const dataPlans = await resPlans.json();

    if (!dataPlans.plans || dataPlans.plans.length === 0) {
      return NextResponse.json({ message: "No hay planes para procesar" });
    }

    // 2. Filtrar solo planes activos
    const activePlans = dataPlans.plans.filter((plan: any) => plan.status === "ACTIVE");

    if (activePlans.length === 0) {
      return NextResponse.json({ message: "No hay planes activos para desactivar" });
    }

    // 3. Desactivar cada plan activo
    const results = await Promise.all(
      activePlans.map(async (plan: any) => {
        try {
          const resDeactivate = await fetch(`${base}/v1/billing/plans/${plan.id}/deactivate`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          if (!resDeactivate.ok) {
            const errorResponse = await resDeactivate.json();
            return {
              planId: plan.id,
              statusBefore: plan.status,
              error: errorResponse,
            };
          }

          return {
            planId: plan.id,
            statusBefore: plan.status,
            statusAfter: "INACTIVE",
          };
        } catch (err: any) {
          return {
            planId: plan.id,
            statusBefore: plan.status,
            error: err.message || err.toString(),
          };
        }
      })
    );

    return NextResponse.json({ results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
