'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formSchemahomepage } from "./zod.validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { SpinnerOverlay } from "@/components/Spinner";
import {  toast } from 'sonner'
import { set } from "mongoose";
import emailjs from '@emailjs/browser';


    
type FormData = {
    nombre: string; 
    correo: string;
    comentarios: string;
}

type FormContactprops = {
    setShowForm: Dispatch<SetStateAction<boolean>>      
}


export default function FormContact( {setShowForm} : FormContactprops) {
  const form = useForm<z.infer<typeof formSchemahomepage>>({
        resolver: zodResolver(formSchemahomepage),
        defaultValues: {      
          email: "",
          nombre: "",
          comentarios: "",
        },
    });

const [isLoading, setIsLoading] = useState(false);    

const handleSubmitData = async (data: z.infer<typeof formSchemahomepage>) => {
        console.log("Datos enviados:", data);
    
        window.scrollTo({ top: 0, behavior: 'smooth' });
    
        setIsLoading(true);            
    
        try {
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            {
              nombre:data.nombre,
              email:data.email,
              comentarios:data.comentarios,
            },
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID
          );      
          toast.success("Correo enviado exitosamente");
          setShowForm(false);          
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.error("Error al enviar el correo:", err);      
          toast.error(err.text || "Error desconocido");      
        }
    
      };

    return (

<FormProvider {...form}>
            <form  onSubmit={form.handleSubmit(handleSubmitData)} className={`w-[80%%] lg:w-[100%]  p-5 flex lg:gap-7 lg:p-12 rounded-2xl flex-col  gap-5 md:p-8 `} >
            
              {isLoading && (<SpinnerOverlay />)}
            
             <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (                
                <FormItem >
                    <div className="flex items-center gap-2 ">                
                    <Label htmlFor="email" className="text-xs lg:text-base ">Nombre Completo</Label>
                </div>
                    <FormControl>
                    <Input
                        id="nombre"
                        type="nombre"
                        placeholder="Ingresa tu Nombre Completo"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="lg:text-sm text-xs"
                    />                  
                    </FormControl>

                    {form.formState.errors.nombre && (
                    <span className="text-red-500 text-xs">
                        {form.formState.errors.nombre.message as string}
                    </span>
                    )}
                </FormItem>
            )}/>              

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (                
                <FormItem >
                    <div className="flex items-center gap-2 ">                
                    <Label htmlFor="email" className="text-xs lg:text-base ">Correo</Label>
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
                name="comentarios"
                render={({ field }) => (                
                <FormItem >
                    <div className="flex items-center gap-2 ">                
                    <Label htmlFor="email" className="text-xs lg:text-base ">Comentarios</Label>
                    </div>
                <FormControl>
                        <Textarea
                            id="comentarios"
                            placeholder="Ingresa tus Comentarios"
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                e.target.style.height = "auto";
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                            className="w-full border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-sm text-xs"
                            rows={5}
                            />

                </FormControl>

                    {form.formState.errors.comentarios && (
                    <span className="text-red-500 text-xs">
                        {form.formState.errors.comentarios.message as string}
                    </span>
                    )}
                </FormItem>
            )}/>    

            
            <div className="col-span-3 flex justify-center">            
                <Button type="submit">Enviar</Button>
            </div>

            </form>        
        </FormProvider>
    )

}
