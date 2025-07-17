'use client';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

export default function PagoUnico({ amount, userId, planId, savesuscription=false, resettokens=false}) {
  const router = useRouter();

  return (
    <div>
      <PayPalScriptProvider options={{
        "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        components: "buttons",
        "enable-funding": "card",
        "data-sdk-integration-source": "developer-studio",
        "currency": "MXN", // ✅ necesario para usar pesos mexicanos
      }}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE", 
              purchase_units: [
                {
                  amount: {
                    value: amount.toFixed(2), // ✅ importante usar toFixed(2)                    
                     currency_code: "MXN",
                  },
                  description: `Pago único para el plan Pro con descuento`,
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order?.capture();
            console.log("Pago aprobado:", details);

            if (savesuscription){
               try {
                  const res = await fetch("/api/paypal/save-subscription", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        subscriptionID: data.subscriptionID,
                        userId: parseInt(userId),
                        planId: planId,
                    }),
                  });

                  if (!res.ok) {
                    const errorData = await res.json();
                    console.error("Error al guardar el pago:", errorData);
                    throw new Error(errorData.error || "Error al guardar el pago");
                  }

                  toast.success("Pago realizado con éxito");

                  setTimeout(() => {
                    router.push("/login");
                  }, 2000);
                } catch (error: any) {
                  console.error("Error al guardar el pago:", error);
                  toast.error("Error al guardar el pago");
                }
            }

            if (resettokens){
              
              await fetch("/api/ressettokens", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ userid:parseInt(userId)}),
              })
              .then(async (res) => {
                console.log("Respuesta de la API:", res);
                if (!res.ok) {
                  const error = await res.json()
                  throw new Error(error.message || "Error al resetear tokens");
                }
                return res.json();
              })
              .then((data) => {
                console.log("Tokens reseteados:", data);
                toast.success(data.message || "Proceso completado con éxito");
              })
              .catch((error) => {
                console.error("Error en la solicitud:", error.message);
                toast.error(error.message || "Error en la solicitud");
              });      
            }           
          }}

          onError={(err) => {
            // console.error("Error en el pago:", err);
            toast.error("Error en el pago");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}


  // const apiressettokens = async (user_id) => {
   
  // }
