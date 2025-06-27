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
import { useState } from "react";
import { SpinnerOverlay } from "@/components/Spinner";
import {  toast } from 'sonner'
import { formSchemaRegister } from "../register/zod.validation";
import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";
import { TermsModal } from '../register/terminos';
import { PrivacyModal } from "../register/privacidad";

export default function ContratacionPage() {
    const searchParams = useSearchParams();
    const plansaved  = searchParams.get('plan');
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);



    const form = useForm<z.infer<typeof formSchemaRegister>>({
          resolver: zodResolver(formSchemaRegister),
          defaultValues: {      
            email: "",
            password: "",       
          },
        });
    
        const [isLoading, setIsLoading] = useState(false);    
          
        const handleLogin = async (data: z.infer<typeof formSchemaRegister>) => {
        setIsLoading(true);
        const { email, password } = data;
        
        console.log("Email:", email);
        console.log("Password:", password);       
    
    
      await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      .then(async (res) => {            
        setIsLoading(false);
    
         if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Error desconocido');
        }
    
        const data = await res.json();
        console.log('Login exitoso:', data);    
        toast.success("Cuenta creada exitosamente");    
        
        
        setTimeout(() => {                        
          setIsLoading(true);
        }, 1000);    
    
    
        setTimeout(() => {
          setIsLoading(false);
          router.push('/login');
        }, 2600);
    
      })
      .catch((error) => {    
        toast.error(error.message)
      }) 
      }
    
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
             
        <div className="w-full lg:w-1/2">
        <Card  className="relative flex flex-col p-0 m-0">
        <CardHeader className="relative flex flex-col items-center  p-0">          
          <Image className="absolute top-2 left-5 w-[15%]" src="/logos/logo.webp" alt="" width={200} height={200}/>
        </CardHeader>
        <CardContent>
            
        <div className="w-full h-full flex items-center justify-center md:p-6 pt-3  flex-col gap-2 ">
          <span className="text-black text-xl md:text-2xl font-bold lg:text-3xl" >Crear cuenta</span>        
        {isLoading && (<SpinnerOverlay />)}

        <FormProvider {...form}>
          <form  onSubmit={form.handleSubmit(handleLogin)} className="w-full max-w-3xl p-5 flex lg:gap-7 lg:p-12 rounded-2xl flex-col  gap-5 md:p-8 " >

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (                
              <FormItem >
                <div className="flex items-center gap-2 ">                
                <Label htmlFor="email" className="text-xs lg:text-base " >Correo</Label>
              </div>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ingresa tu correo"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="lg:text-sm text-xs"
                  />                  
                </FormControl>

                {form.formState.errors.email && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.email.message as string}
                  </span>
                )}
              </FormItem>
            )}/>        

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="password" className="text-xs lg:text-base">Contraseña</Label>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="lg:text-sm text-xs pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  {form.formState.errors.password && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.password.message as string}
                    </span>
                  )}
                </FormItem>
              )}
            />

            <div className="max-w-[100%] m-auto">

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <label className="flex items-start gap-2 text-xs md:text-xs">
                      <input
                        type="checkbox"
                        checked={field.value || false}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="w-4 h-4 mt-1"
                      />
                      <span >
                        Al registrarte y utilizar los servicios del Generador Automático de Contenido (GAC) de iActiva, reconoces haber leído y aceptado expresamente nuestros{" "}
                        <button
                          type="button"
                          onClick={() => setIsTermsModalOpen(true)}
                          className="underline text-blue-600"
                        >
                          Términos y Condiciones
                        </button>{" "}
                        y nuestro{" "}
                        <button
                          type="button"
                          onClick={() => setIsPrivacyModalOpen(true)}
                          className="underline text-blue-600"
                        >
                          Aviso de Privacidad
                        </button>.
                        El uso del servicio implica tu aceptación plena y sin reservas del contrato de prestación de servicios correspondiente, que se considera celebrado en la Ciudad de México.
                      </span>
                    </label>
                    {form.formState.errors.acceptTerms && (
                      <span className="text-red-500 text-xs">
                        {form.formState.errors.acceptTerms.message as string}
                      </span>
                    )}
                  </FormItem>
                )}
              />



            </div>
              


            {/* <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} /> */}
            <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
            <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />



             <Button type="submit" disabled={!form.watch("acceptTerms") || isLoading}>
              Ingresar
            </Button>
                      
          </form>
            
        </FormProvider>                          

        </div>       
        </CardContent>
        
      </Card>
        </div>
      

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
                    // "Renovación despues del año: $300",
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
                    "Segmentación  ultra personalizada",
                    "Nivel de IA: Básica y Potente",
                    "Suscripción anual: $500 / año",
                    "Pago anticipado: $3,270.40 (ahorra 20%)",          
                    // "Renovación despues del año: $300",  
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
                            <span>20% de descuento</span>                                
                            </li>
                            <li className="flex items-start gap-2">   
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Pagos después del primer año a: <strong>$3,830.40</strong> </span>                                
                            </li>
                        </ul>    
                        )
                    }
{/* 
                {
                    plansaved == "Basico renovación automática" && (
                           <ul className="space-y-2 text-sm text-gray-700 mt-1">
                            <li className="flex items-start gap-2">   
                            <span className="text-green-600 font-bold">✓</span>
                            <span>No se te cobrara la renovacion de fin de año</span>                                
                            </li>
                        </ul>    
                    )
                } */}

                    </div>    
                </div>
                ))}
            </div>

        </div>

    </div>          

      </>
                   
    );
}
