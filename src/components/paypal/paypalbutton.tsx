'use client';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {  toast } from 'sonner'
import { useRouter } from "next/navigation";
import { time } from "console";

export default function Suscripcion({ planId,userId }) {
  const router = useRouter();

  return (    
      <PayPalScriptProvider 
            options={{
        "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        vault: true,
        intent: "subscription", 
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        fundingSource="paypal"
        createSubscription={(data, actions) => {
            return actions.subscription.create({
            plan_id: planId,
            });
          }}          
          onApprove={async (data, actions) => {
          console.log("Suscripción creada:", data.subscriptionID);           
          // alert("Suscripción creada: " + data.subscriptionID);         
          // await fetch("/api/paypal/save-subscription", {
          //   method: "POST",
          //   body: JSON.stringify({
          //     subscriptionID: data.subscriptionID,
          //     userId: userId, 
          //     planId: planId, 
          //   }),
          // });
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
            }, 2000); // Redirige después de 2 segundos

          } catch (error: any) {
            console.error("Error al guardar la suscripción:", error);
            alert("Ocurrió un error: " + error.message);
            toast.error("Error al guardar la suscripción");
          }
        }}
      />
    </PayPalScriptProvider>
  );
}
