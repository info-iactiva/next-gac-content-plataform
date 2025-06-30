"use client";
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
import { formSchemaRegister } from "./zod.validation";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import { Eye, EyeOff } from "lucide-react";
import { TermsModal } from "./terminos";
import { PrivacyModal } from "./privacidad";
import { ContractModal } from "./contrato";


export default function Register() {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);



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


    return <
    >
        <Card className=" relative  md:min-w-[450px] md:max-w-xl min-w-[300px]  flex  flex-col  p-0 m-0">
        <CardHeader className="relative flex flex-col items-center  p-0">          
          <Image className="absolute top-2 left-5 w-[15%]" src="/logos/logo.webp" alt="" width={200} height={200}/>
        </CardHeader>
        <CardContent>
            
        <div className="w-full h-full flex items-center justify-center md:p-6 pt-3  flex-col gap-2 ">
          <span className="text-black text-xl md:text-2xl font-bold lg:text-3xl" >Crear cuenta</span>        
        {isLoading && (<SpinnerOverlay />)}

        <FormProvider {...form}>
          <form  onSubmit={form.handleSubmit(handleLogin)} className="w-full max-w-7xl p-5 flex lg:gap-7 lg:p-12 rounded-2xl flex-col  gap-5 md:p-8 " >

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
                        El uso del servicio implica tu aceptación plena y sin reservas del{" "}
                         <button
                          type="button"
                          onClick={() => setIsContactModalOpen(true)}
                          className="underline text-blue-600"
                        >
                          contrato
                        </button>.
                         de prestación de servicios correspondiente, que se considera celebrado en la Ciudad de México.
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
            <ContractModal  isOpen={isContactModalOpen} onClose={()=> setIsContactModalOpen(false)}/>


             <Button type="submit" disabled={!form.watch("acceptTerms") || isLoading}>
              Ingresar
            </Button>
                      
          </form>
            
        </FormProvider>


        </div>
        </CardContent>

      </Card>

    </>        

}
      
