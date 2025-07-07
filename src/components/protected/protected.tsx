"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProtected } from "@/types/user.protected";

export function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProtected | null>(null);
  const [loading, setLoading] = useState(true);
  const [planes,setPlanes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    // console.log(storedUser);

    if (!token) {
      router.replace("/login");
      return;
    }

    if (storedUser) {
      try {
        const parsedUser: UserProtected = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error al parsear el usuario:", error);
      }
    }

    setLoading(false);
  }, [router]);

  const handleReturnToLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  };



  function getPlanIdByName( nameToFind: string): string | null {
    const plan = planes.find(plan => plan.name === nameToFind);
    return plan ? plan.id : null;
  }





  const handleGoToPayment = async () => {
  if (!user) return;

  try {
    const res = await fetch("/api/paypal/list-plans", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log('user', user);
    const planes = data.plans;
    const planesKeys = {
      'Básico': 'Plan Básico Mensual',
      'Pro': 'Plan Pro Mensual',
      'Pro Con Descuento': 'Plan Pro Anual con Descuento',
    };

    const userPlanName = planesKeys[user.plan];
    const selectedPlan = planes.find(plan => plan.name === userPlanName);

    if (!selectedPlan) {
      console.error("Plan no encontrado para el usuario.");
      return;
    }

    const idPlan = selectedPlan.id;

    router.replace(`/pagar?plan=${encodeURIComponent(user.plan)}&idplan=${encodeURIComponent(idPlan)}&iduser=${encodeURIComponent(user.id)}`);
  } catch (err) {
    console.error("Error obteniendo planes:", err);
  }
};



  // const handleGoToPayment = async () => {
  //     if (!user) return;
  //   await getplanes(); // Asegúrate de que los planes estén cargados antes de continuar
  //   const planesKes = {
  //     'Básico': 'Plan Básico Mensual',
  //     'Pro': 'Plan Pro Mensual',
  //     'Pro Con Descuento':'Plan Pro Anual con Descuento'
  //   }

  //   // router.replace("/pago"); // <-- ajusta esta ruta según tu sistema
  //   console.log("user.plan", user.plan);
  //   // router.replace(`/contratar?plan=${encodeURIComponent(user.plan)}&idplan=${encodeURIComponent(getPlanIdByName(planesKes[user.plan]))}`); // <-- ajusta esta ruta según tu sistema
  // };

   const getplanes = async () => {
           try {
              const res = await fetch("/api/paypal/list-plans", {
                method: "GET",
                headers: { "Content-Type": "application/json" },                
              });              
              const data = await res.json();
              setPlanes(data.plans);
              console.log("Respuesta de la API:", data);              
            } catch (err) {
              console.log("Error generando contenido:", err);
            }
    }


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  // Primero verifica si el usuario no ha pagado
  if (user && !user.is_pagado) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
        <div className="bg-white shadow-md rounded-2xl p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">
            Suscripción requerida
          </h2>
          <p className="text-gray-700 mb-4">
            Tu cuenta aún no tiene una suscripción activa. Por favor realiza el pago para continuar.
          </p>
          <button
            onClick={handleGoToPayment}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
          >
            Ir a pagar
          </button>
        </div>
      </div>
    );
  }

  // Luego verifica si está inactiva (pero ya pagó)
  if (user && !user.is_active) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
        <div className="bg-white shadow-md rounded-2xl p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Cuenta inactiva
          </h2>
          <p className="text-gray-700 mb-4">
            Tu cuenta está inactiva. Por favor contacta al administrador para más información.
          </p>
          <button
            onClick={handleReturnToLogin}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Volver al login
          </button>
        </div>
      </div>
    );
  }

  // Si todo está bien, muestra el contenido protegido
  return <>{children}</>;
}
