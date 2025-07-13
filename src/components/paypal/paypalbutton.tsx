'use client';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {  toast } from 'sonner'
import { useRouter } from "next/navigation";

export default function Suscripcion({ planId,userId }) {
  const router = useRouter();      

  return (    
    <div>
       <PayPalScriptProvider options={{
        "clientId":process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        "enable-funding": "card",
        components: "buttons",
        vault: true,
        "data-sdk-integration-source": "developer-studio",
        "data-page-type": "product-details",
      }}        
      >
        <PayPalButtons                    
            style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}           
          createSubscription={(data, actions) => actions.subscription.create({plan_id: planId })}

          onApprove={async (data, actions) => {
            console.log("Suscripción creada:", data.subscriptionID);           
            console.log(userId, planId);

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
                  console.error("Error al guardar la suscripción:", errorData);
                  throw new Error(errorData.error || "Error al guardar la suscripción");
                }

                toast.success("Pago realizado con éxito");

                setTimeout(() => {
                  router.push("/login"); 
                }, 2000); 

              } catch (error: any) {
                console.error("Error al guardar la suscripción:", error);
                alert("Ocurrió un error: " + error.message);
                toast.error("Error al guardar la suscripción");
              }

          }}
        />        
      </PayPalScriptProvider> 

    </div>     
  );
}

