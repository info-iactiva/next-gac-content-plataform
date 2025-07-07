// import { NextRequest, NextResponse } from "next/server";
// import { getPaypalAccessToken } from "../helpers/helper";

// export async function GET() {
//   const accessToken = await getPaypalAccessToken();
//   const base = process.env.PAYPAL_API_BASE!;
  
//   const res = await fetch(`${base}/v1/billing/plans?page_size=10`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${accessToken}`
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     return NextResponse.json({ error: data }, { status: 400 });
//   }

//   return NextResponse.json(data);
// }
import { NextRequest, NextResponse } from "next/server";
import { getPaypalAccessToken } from "../helpers/helper";

export async function GET() {
  try {
    const accessToken = await getPaypalAccessToken();
    const base = process.env.PAYPAL_API_BASE!;

    // 1. Obtener planes (hasta 10)
    const res = await fetch(`${base}/v1/billing/plans?page_size=10`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: res.status });
    }

    // 2. Filtrar solo planes activos
    const activePlans = (data.plans || []).filter((plan: any) => plan.status === "ACTIVE");

    return NextResponse.json({
      total: activePlans.length,
      plans: activePlans,
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
