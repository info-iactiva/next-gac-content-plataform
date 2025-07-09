'use client';
import { useSearchParams } from 'next/navigation';

import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { FormProvider } from "react-hook-form";
import {  FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { SpinnerOverlay } from "@/components/Spinner";
import {  toast } from 'sonner'
import { formSchemaRegister } from "../register/zod.validation";
import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";
import { TermsModal } from '../register/terminos';
import { PrivacyModal } from "../register/privacidad";
import Register from '../register/page';
import Suscripcion from '@/components/paypal/paypalbutton';

export default function ContratacionPage() {
    const searchParams = useSearchParams();
    const plansaved  = searchParams.get('plan');
    const idplan  = searchParams.get('idplan');
    const router = useRouter();
    
    const [registrado,setRegistrado] = useState(false);
    const [mostrarCodigo, setMostrarCodigo] = useState(false);

    
    return (

      <>
       <div className="w-full md:max-w-[80%] mx-auto px-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 text-center md:text-left">
            Sección de Contratación
          </h1>

          <button
                  onClick={() => router.push('/')}
                  className={`inline-block mt-3  bg-green-600 hover:bg-green-700 text-white font-bold  px-3 py-1 rounded-lg transition  `}
                >
                Regresar
              </button>   
        </div>

        <div className="min-h-screen flex flex-col lg:flex-row-reverse items-start p-6 gap-6 w-full md:max-w-[80%] mx-auto">
        


        <Register                
        idplan={idplan ? idplan : ''}
        nameplan={plansaved ? plansaved : ''}
      ></Register>       

       <div className="w-full lg:w-1/2 flex items-center justify-center">

            <div className="grid grid-cols-1 w-full">
                {[
                {
                    nombre: "Básico",
                    precio: "12 meses a $99 cada uno",
                    detalles: [
                    "Configuración completa de tu empresa o marca",
                    "Segmentación básica del público objetivo",
                    "Generación de publicaciones con tono, idioma y extensión definidos",
                    "Hasta 45 publicaciones mensuales",
                    "Nivel de IA: Básica",
                    "Suscripción anual incluida: 1ª gratuita",                    
                    ],
                    extras: [],                    
                },                
                {
                    nombre: "Pro",
                    precio: "12 meses a $349 cada uno",
                    detalles: [
                    "Configuración completa de tu empresa o marca",
                    "Segmentación básica del público objetivo",
                    "Generación de publicaciones con tono, idioma y extensión definidos",
                    "Hasta 100 publicaciones mensuales",
                    "Inspiración con textos o autores famosos",
                    "Comunicación  ultra personalizada",
                    "Nivel de IA: Básica y Potente",
                    "Suscripción anual: $500 / año",                    
                    ],
                    extras: [],                    
                },                        
                 {
                    nombre: "Pro Con Descuento",
                    precio: "",
                    detalles: [
                    "Configuración completa de tu empresa o marca",
                    "Segmentación básica del público objetivo",
                    "Generación de publicaciones con tono, idioma y extensión definidos",
                    "Publicaciones ilimitadas*",
                    "Inspiración con textos o autores famosos",
                    "Segmentación  ultra personalizada",
                    "Nivel de IA: Básica y Potente",                    
                    ],
                    extras: [],                    
                },               
                ].map((plan) => (
                <div
                    key={plan.nombre}
                    className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hidden"
                    style={plan.nombre == plansaved ? {  display:'Block' , border:'2px solid #4ade80'} : {}}
                >
                    <div>
                    <h3 className="text-xl font-bold text-green-700 mb-2">{plan.nombre}</h3>
                    <p className="text-lg font-semibold text-gray-900 mb-4">{plan.precio}</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                        {plan.detalles.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>{d}</span>
                            
                        </li>
                        ))}
                    </ul>                                             
                       
                    {
                       plansaved === 'Pro Con Descuento' && (
                        <ul className="space-y-2 text-sm text-gray-700 mt-1">
                            <li className="flex items-start gap-2">   
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Primer pago anual de <strong>$4,230.40</strong> </span>                                
                            </li>
                            <li className="flex items-start gap-2">   
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Incluye 20% de descuento</span>                                
                            </li>
                            <li className="flex items-start gap-2">   
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Pagos anuales después del primer año a: <strong>$3,830.40</strong> </span>                                
                            </li>
                        </ul>    
                        )
                    }

                    </div>    
                </div>
                ))}

                
                <div className='w-[60%] mx-auto mt-4'>

                    <button
                    onClick={() => setMostrarCodigo(!mostrarCodigo)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-2 rounded-lg transition"
                    >
                        Obten tu codigo de descuento
                        </button>

                    {mostrarCodigo && (
                        <div className="mt-3 p-4 border border-green-400 bg-green-50 rounded-lg text-green-800">
                            ✅ Tu código es <strong>lanzamientogac</strong>. Ingresalo en el formulario de registro.
                        </div>
                        )}
                </div>
                 


            </div>

        </div>

    </div>          

      </>
                   
    );
}
