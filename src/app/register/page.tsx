"use client";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { FormProvider } from "react-hook-form";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {  FormControl, FormField, FormItem } from "@/components/ui/form";
import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SpinnerOverlay } from "@/components/Spinner";
import {  toast } from 'sonner'
import { formSchemaRegister } from "./zod.validation";
import { useRouter } from "next/navigation";
import { set } from "mongoose";


export default function Register() {

  const router = useRouter();

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

    // setTimeout(() => {                              
    // }, 2000);    



    setTimeout(() => {
      setIsLoading(false);
      router.push('/login');
    }, 2600);

  })
  .catch((error) => {    
    toast.error(error.message)
  }) 
  }


    return  <div className="min-h-screen flex items-center justify-center p-6 ">

      <Card className=" relative  md:min-w-[450px] md:max-w-2xl min-w-[300px]  flex  gap-10 flex-col">
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
              <FormItem >
                <div className="flex items-center gap-2 ">                
                <Label htmlFor="password" className="text-xs lg:text-base " >Contraseña</Label>
              </div>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="lg:text-sm text-xs"
                  />                  
                </FormControl>

                {form.formState.errors.password && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.password.message as string}
                  </span>
                )}
              </FormItem>
            )}/>        


             <div className="col-span-3 flex justify-center">            
                <Button type="submit">Ingresar</Button>
              </div>
                      
          </form>
            
        </FormProvider>


        </div>
        </CardContent>

      </Card>

    </div>

}
      
