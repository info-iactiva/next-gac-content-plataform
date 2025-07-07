// import { NextRequest, NextResponse } from "next/server";
// import { getPaypalAccessToken } from "../helpers/helper";

// const base = process.env.PAYPAL_API_BASE!;

// async function createProduct(token: string) {
//   const res = await fetch(`${base}/v1/catalogs/products`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name:"Suscripción",
//       description: "Planes de suscripción de contenido con IA",
//       type: "SERVICE",
//       category: "SOFTWARE"
//     }),
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error("Error creando producto: " + JSON.stringify(data));
//   return data.id;
// }

// async function createPlan(token: string, productId: string, plan: any) {
//   const res = await fetch(`${base}/v1/billing/plans`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ ...plan, product_id: productId, status: "ACTIVE" }),
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error("Error creando plan: " + JSON.stringify(data));
//   return data;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const token = await getPaypalAccessToken();
//     const productId = await createProduct(token);

//     // Plan Básico mensual
//     const basicPlan = await createPlan(token, productId, {
//       name: "Plan Básico Mensual",
//       description: "Suscripción mensual básica",
//       billing_cycles: [
//           // Ciclo mensual
//           {
//             frequency: { interval_unit: "MONTH", interval_count: 1 },
//             tenure_type: "REGULAR",
//             sequence: 1,
//             total_cycles: 0, // Ciclos infinitos
//             pricing_scheme: {
//               fixed_price: { value: "99.00", currency_code: "MXN" },
//             },
//           },
//           // Primer año de la cuota anual es gratis
//           {
//             frequency: { interval_unit: "YEAR", interval_count: 1 },
//             tenure_type: "TRIAL",
//             sequence: 2,
//             total_cycles: 1,
//             pricing_scheme: {
//               fixed_price: { value: "0.00", currency_code: "MXN" },
//             },
//           },
//           // A partir del segundo año se cobra la cuota anual
//           {
//             frequency: { interval_unit: "YEAR", interval_count: 1 },
//             tenure_type: "REGULAR",
//             sequence: 3,
//             total_cycles: 0,
//             pricing_scheme: {
//               fixed_price: { value: "300.00", currency_code: "MXN" },
//             },
//           }
//         ],
//       // billing_cycles: [
//       //   {
//       //     frequency: { interval_unit: "MONTH", interval_count: 1 },
//       //     tenure_type: "REGULAR",
//       //     sequence: 1,
//       //     total_cycles: 0,
//       //     pricing_scheme: {
//       //       fixed_price: { value: "99.00", currency_code: "MXN" },
//       //     },
//       //   },        
//       // ],
//       payment_preferences: {
//         auto_bill_outstanding: true,
//         setup_fee_failure_action: "CONTINUE",
//         payment_failure_threshold: 3,
//       },
//     });

//     // Plan Pro mensual
//     const proPlan = await createPlan(token, productId, {
//       name: "Plan Pro Mensual",
//       description: "Suscripción mensual Pro",
//       billing_cycles: [
//           // Cobro mensual de 349 MXN
//           {
//             frequency: { interval_unit: "MONTH", interval_count: 1 },
//             tenure_type: "REGULAR",
//             sequence: 1,
//             total_cycles: 0,
//             pricing_scheme: {
//               fixed_price: { value: "349.00", currency_code: "MXN" },
//             },
//           },
//           // Cobro anual de 500 MXN (comienza en el primer mes y se repite cada año)
//           {
//             frequency: { interval_unit: "YEAR", interval_count: 1 },
//             tenure_type: "REGULAR",
//             sequence: 2,
//             total_cycles: 0,
//             pricing_scheme: {
//               fixed_price: { value: "500.00", currency_code: "MXN" },
//             },
//           },
//         ],
//       // billing_cycles: [
//       //   {
//       //     frequency: { interval_unit: "MONTH", interval_count: 1 },
//       //     tenure_type: "REGULAR",
//       //     sequence: 1,
//       //     total_cycles: 0,
//       //     pricing_scheme: {
//       //       fixed_price: { value: "849.00", currency_code: "MXN" },
//       //     },
//       //   },
//       //    {
//       //     frequency: { interval_unit: "MONTH", interval_count: 1 },
//       //     tenure_type: "REGULAR",
//       //     sequence: 1,
//       //     total_cycles: 0,
//       //     pricing_scheme: {
//       //       fixed_price: { value: "349.00", currency_code: "MXN" },
//       //     },
//       //   },
//       // ],
//       payment_preferences: {
//         auto_bill_outstanding: true,
//         setup_fee_failure_action: "CONTINUE",
//         payment_failure_threshold: 3,
//       },
//     });

//     // Plan Pro con Descuento
//     const proDiscountPlan = await createPlan(token, productId, {
//       name: "Plan Pro Anual con Descuento",
//       description: "Primer año con descuento, luego tarifa anual",
//       // billing_cycles: [
//       //   {
//       //     frequency: { interval_unit: "YEAR", interval_count: 1 },
//       //     tenure_type: "TRIAL",
//       //     sequence: 1,
//       //     total_cycles: 1,
//       //     pricing_scheme: {
//       //       fixed_price: { value: "4230.40", currency_code: "MXN" },
//       //     },
//       //   },
//       //   {
//       //     frequency: { interval_unit: "YEAR", interval_count: 1 },
//       //     tenure_type: "REGULAR",
//       //     sequence: 2,
//       //     total_cycles: 0,
//       //     pricing_scheme: {
//       //       fixed_price: { value: "3830.40", currency_code: "MXN" },
//       //     },
//       //   },
//       // ],
//       billing_cycles: [
//         {
//           frequency: { interval_unit: "YEAR", interval_count: 1 },
//           tenure_type: "REGULAR",
//           sequence: 1,
//           total_cycles: 1,
//           pricing_scheme: {
//             fixed_price: { value: "4230.40", currency_code: "MXN" },
//           },
//         },
//         {
//           frequency: { interval_unit: "YEAR", interval_count: 1 },
//           tenure_type: "REGULAR",
//           sequence: 2,
//           total_cycles: 0,
//           pricing_scheme: {
//             fixed_price: { value: "3830.40", currency_code: "MXN" },
//           },
//         },
//       ],
//       payment_preferences: {
//         auto_bill_outstanding: true,
//         setup_fee_failure_action: "CONTINUE",
//         payment_failure_threshold: 3,
//       },
//     });

//     return NextResponse.json({
//       message: "Planes creados exitosamente",
//       product_id: productId,
//       basicPlan,
//       proPlan,
//       proDiscountPlan,
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message || "Error al crear los planes" },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { getPaypalAccessToken } from "../helpers/helper";

const base = process.env.PAYPAL_API_BASE!;

// async function createProduct(token: string) {
//   const res = await fetch(`${base}/v1/catalogs/products`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name:"Suscripción",
//       description: "Planes de suscripción de contenido con IA",
//       type: "SERVICE",
//       category: "SOFTWARE"
//     }),
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error("Error creando producto: " + JSON.stringify(data));
//   return data.id;
// }
async function getOrCreateProduct(token: string): Promise<string> {
  const existingId = await findProductIdByName(token, "Suscripción");
  if (existingId) {
    console.log("Producto ya existe:", existingId);
    return existingId;
  }

  console.log("Producto no existe. Creando nuevo...");
  return await createProduct(token);
}

async function findProductIdByName(token: string, name: string): Promise<string | null> {
  let page = 1;
  const pageSize = 20;
  while (true) {
    const res = await fetch(`${base}/v1/catalogs/products?page_size=${pageSize}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Error consultando productos: ${res.status}`);
    }
    const data = await res.json();
    const products = data.products || [];
    const match = products.find((p: any) => p.name === name);
    if (match) {
      return match.id;
    }
    if (!data.links || !data.links.find((l: any) => l.rel === "next")) {
      break;  // No hay más páginas
    }
    page++;
  }
  return null;
}

async function createProduct(token: string): Promise<string> {
  const res = await fetch(`${base}/v1/catalogs/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Suscripción",
      description: "Planes de suscripción de contenido con IA",
      type: "SERVICE",
      category: "SOFTWARE"
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error("Error creando producto: " + JSON.stringify(data));
  }
  return data.id;
}

async function createPlan(token: string, productId: string, plan: any) {
  const res = await fetch(`${base}/v1/billing/plans`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...plan, product_id: productId, status: "ACTIVE" }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Error creando plan: " + JSON.stringify(data));
  return data;
}

export async function POST(req: NextRequest) {
  try {
    const token = await getPaypalAccessToken();
    const productId = await getOrCreateProduct(token);
    
    //plan basico
    const basicPlan = await createPlan(token, productId, {
      name: "Plan Básico Mensual",
      description: "Suscripción mensual básica",
      billing_cycles: [          
          {
            frequency: { interval_unit: "MONTH", interval_count: 1 },
            tenure_type: "REGULAR",
            sequence: 1,
            total_cycles: 12, 
            pricing_scheme: {
              fixed_price: { value: "99.00", currency_code: "MXN" },
            },
          },        
        ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3,
      },
    });

    // Plan Pro mensual
    const proPlan = await createPlan(token, productId, {
      name: "Plan Pro Mensual",
      description: "Suscripción mensual Pro",
      billing_cycles: [         
          {
            frequency: { interval_unit: "MONTH", interval_count: 1 },
            tenure_type: "REGULAR",
            sequence: 1,
            total_cycles: 12,
            pricing_scheme: {
              fixed_price: { value: "349.00", currency_code: "MXN" },
            },
          },        
        ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3,
      },
    });

    // Plan Pro con Descuento
    const proDiscountPlan = await createPlan(token, productId, {
      name: "Plan Pro Anual con Descuento",
      description: "Primer año con descuento, luego tarifa anual",
      billing_cycles: [
        {
          frequency: { interval_unit: "YEAR", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 1,
          pricing_scheme: {
            fixed_price: { value: "4230.40", currency_code: "MXN" }
          }
        }
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3,
      },
    });


    return NextResponse.json({
      message: "Planes creados exitosamente",
      product_id: productId,
      basicPlan,
      proPlan,
      proDiscountPlan,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al crear los planes" },
      { status: 500 }
    );
  }
}


