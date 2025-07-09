import { useState } from "react";
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
import { useRouter } from "next/navigation";

type DemoSectionProps = {
    textfirstbutton: string;
    refdirectemail:string;
    children?: React.ReactNode;
    maintitle?: string;
    classNameButton?: string;
    classNameForm?: string;
    showsecondbutton?: boolean;
      
}
    
type FormData = {
    nombre: string; 
    correo: string;
    comentarios: string;
}



export default function DemoSection({ textfirstbutton, refdirectemail,children ,maintitle,classNameButton,classNameForm,showsecondbutton=false}: DemoSectionProps) {

  const [showOptions, setShowOptions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

    const form = useForm<z.infer<typeof formSchemahomepage>>({
        resolver: zodResolver(formSchemahomepage),
        defaultValues: {      
          email: "",
          nombre: "",
          comentarios: "",
        },
    });

  // const handleSubmitData = async (data: z.infer<typeof formSchemahomepage>) => {
  //   console.log("Datos enviados:", data);
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  //   setIsLoading(true);
  //   await fetch('/api/emailsender', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //       body: JSON.stringify({ email: data.email, nombre:data.nombre, comentarios:data.comentarios }),
  //   })
  //   .then(async (res) => {                
  //    if (!res.ok) {
  //     const errorData = await res.json();
  //     throw new Error(errorData.error || 'Error desconocido');
  //   }

  //   const data = await res.json();
  //   toast.success(data.message || 'Correo enviado correctamente');
  //   form.reset();
  //   setShowForm(false);
  //   setShowOptions(false);
  //   })
  // .catch((error) => {    
  //   toast.error(error.error || 'Error al enviar el correo');
  //   console.log(error.message)
  // }).finally(() => {
  //   setIsLoading(false);
  //   })
  // };


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
      setShowOptions(false);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error("Error al enviar el correo:", err);      
      toast.error(err.text || "Error desconocido");      
    }

  };





  const [isLoading, setIsLoading] = useState(false);    


  return (
    <div className="text-center md:text-left flex flex-col justify-center">
    {
        maintitle && (
        <h2 className="text-2xl font-bold mb-4">
            {maintitle}
        </h2>)
    }

  {isLoading && (<SpinnerOverlay />)}

    {children && ( children)}
  {!showOptions ? (
    <div className="flex flex-col items-center md:items-start lg:flex-row  md:items-center lg:gap-5">

 <button
      onClick={() => setShowOptions(true)}
      className={`inline-block mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition${classNameButton}`}
    >
        {textfirstbutton}
      
    </button>

    {
      showsecondbutton &&(
         <button 
        onClick={() => router.push('/funcion')}
         className={`inline-block mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition `}>
          Descubre cómo funciona el GAC
        </button>
      )
    }
   
    


    </div>
   
  ) : (
    <div className="mt-6 flex flex-col gap-4">
      {/* Botones */}
      <div className="flex flex-col md:flex-row md:gap-4 md:items-center">
        <a

          href={refdirectemail}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition self-center md:self-start"
        >
          Enviar correo directo
        </a>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition self-center md:self-start mt-4 md:mt-0"
        >
          {showForm ? "Ocultar formulario" : "Llenar formulario"}
        </button>

      <button
      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition self-center"
      aria-label="Cerrar"
      onClick={() => {
        setShowOptions(false)
        setShowForm(false);
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

      </div>

      {/* Formulario */}
      {showForm && (

        <FormProvider {...form}>
            <form  onSubmit={form.handleSubmit(handleSubmitData)} className={`w-[80%%] lg:w-[70%]  p-5 flex lg:gap-7 lg:p-12 rounded-2xl flex-col  gap-5 md:p-8 ${classNameForm} `} >
                
            
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
        // <form
        //   onSubmit={handleSubmit}
        //   className="bg-gray-100 p-4 rounded-lg w-full md:w-[80%] shadow m-auto"
        // >
        //   <input
        //     type="text"
        //     name="nombre"
        //     placeholder="Nombre"
        //     value={formData.nombre}
        //     onChange={handleInputChange}
        //     required
        //     className="w-full mb-3 px-4 py-2 border rounded"
        //   />
        //   <input
        //     type="email"
        //     name="correo"
        //     placeholder="Correo electrónico"
        //     value={formData.correo}
        //     onChange={handleInputChange}
        //     required
        //     className="w-full mb-3 px-4 py-2 border rounded"
        //   />
        //   <textarea
        //     name="comentarios"
        //     placeholder="Comentarios"
        //     value={formData.comentarios}
        //     onChange={handleInputChange}
        //     required
        //     className="w-full mb-3 px-4 py-2 border rounded resize-none"
        //     rows={4}
        //   ></textarea>
        //   <button
        //     type="submit"
        //     className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded"
        //   >
        //     Enviar solicitud
        //   </button>
        // </form>
      )}
    </div>
  )}
</div>

  );
}
