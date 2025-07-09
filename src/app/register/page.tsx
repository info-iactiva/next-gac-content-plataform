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
import { useRef, useState } from "react";
import { SpinnerOverlay } from "@/components/Spinner";
import {  toast } from 'sonner'
import { formSchemaRegister } from "./zod.validation";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import { Eye, EyeOff, Info } from "lucide-react";
import { TermsModal } from "./terminos";
import { PrivacyModal } from "./privacidad";
import { ContractModal } from "./contrato";
import Suscripcion from "@/components/paypal/paypalbutton";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SECTORES } from "./sectores";


type RegisterProps = {    
  children?: React.ReactNode;  
  idplan?: string;  
  nameplan?: string;
}


export default function Register({ children,idplan,nameplan}: RegisterProps) {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [check,setCheck] = useState(true);  
  const [idUser,setIdUser] = useState('');
  const pagarRef = useRef<HTMLHeadingElement>(null);
  
  const ordenarSectores = (sectores: string[]): string[] => {
    return [...sectores].sort((a, b) => a.localeCompare(b));
  };

  const sectoresOrdenados = ordenarSectores(SECTORES);





const hanleonregister = async (data: z.infer<typeof formSchemaRegister>) => {
          
          const { email, password,nombre,apellidos ,nombre_empresa,numero_empleados,sector} = data;
          setIsLoading(true);          
  
  
        await fetch('/api/register', {
          method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email, password,nameplan,nombre,apellidos,nombre_empresa,numero_empleados,sector}),
                })
            .then(async (res) => {                        
  
              if (!res.ok) {
                const errorData = await res.json();
                // console.error('Error al crear la cuenta:', errorData);
                
                if (errorData.pagado == false) {
                  setIdUser(errorData.user.userid);
                  setCheck(false)
                  scrollToPagar();
                  throw new Error('No ha pagado la suscripción, por favor pague para continuar');                                    
                }

                if (errorData.error) {
                  // console.error('hay error.error');
                  throw new Error(errorData.error || 'Error desconocido');
                }                                                
                
              }
              
              const data = await res.json();              
              scrollToPagar();

              setIdUser(data.user.id);
              setIsLoading(false);               
              setCheck(false)
            })
            .catch((error) => {    
              setIsLoading(false);               
              toast.error(error.message)              
            }) 
    }

      const form = useForm<z.infer<typeof formSchemaRegister>>({
        resolver: zodResolver(formSchemaRegister),
        defaultValues: {
          email: "",
          password: "",
          nombre: "",
          apellidos: "",
          nombre_empresa: "",
          numero_empleados: "",
          sector: "", 
          codigo:" "
        },
      });

    const [isLoading, setIsLoading] = useState(false);         
      
    const scrollToPagar = () => {
        pagarRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
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
          <form  onSubmit={form.handleSubmit(hanleonregister)} className="w-full max-w-7xl p-5 flex lg:gap-7 lg:p-12 rounded-2xl flex-col  gap-5 md:p-8 " >


            <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (                
              <FormItem >
                <div className="flex items-center gap-2 ">                
                <Label htmlFor="nombre" className="text-xs lg:text-base " >Nombre</Label>
              </div>
                <FormControl>
                  <Input
                    id="nombre"
                    type="nombre"
                    placeholder="Ingresa tu nombre"
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
            name="apellidos"
            render={({ field }) => (                
              <FormItem >
                <div className="flex items-center gap-2 ">                
                <Label htmlFor="apellidos" className="text-xs lg:text-base " >Apellidos</Label>
              </div>
                <FormControl>
                  <Input
                    id="apellidos"
                    type="apellidos"
                    placeholder="Ingresa tus apellidos"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="lg:text-sm text-xs"
                  />                  
                </FormControl>

                {form.formState.errors.apellidos && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.apellidos.message as string}
                  </span>
                )}
              </FormItem>
            )}/>   


              <FormField
            control={form.control}
            name="nombre_empresa"
            render={({ field }) => (                
              <FormItem >
                <div className="flex items-center gap-2 ">                
                <Label htmlFor="nombre_empresa" className="text-xs lg:text-base " >Nombre de la empresa</Label>
              </div>
                <FormControl>
                  <Input
                    id="nombre_empresa"
                    type="nombre_empresa"
                    placeholder="Ingresa el nombre de tu empresa"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="lg:text-sm text-xs"
                  />                  
                </FormControl>

                {form.formState.errors.nombre_empresa && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.nombre_empresa.message as string}
                  </span>
                )}
              </FormItem>
            )}/>   


            
              <FormField
            control={form.control}
            name="numero_empleados"
            render={({ field }) => (                
              <FormItem >
                <div className="flex items-center gap-2 ">                
                <Label htmlFor="numero_empleados" className="text-xs lg:text-base " >Número de empleados</Label>
              </div>
                <FormControl>
                  <Input
                    id="numero_empleados"
                    type="numero_empleados"
                    placeholder="Ingresa el nombre de tu empresa"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="lg:text-sm text-xs"
                  />                  
                </FormControl>

                {form.formState.errors.numero_empleados && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.numero_empleados.message as string}
                  </span>
                )}
              </FormItem>
            )}/>   



                    <FormField
                        control={form.control}
                        name="sector"
                        render={({ field }) => (
                          <FormItem >
                            <div className="flex items-center gap-2">
                            <Label htmlFor="sector"  className="text-xs lg:text-base">Sector</Label>                             
                          </div>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <SelectTrigger className="">
                                  <SelectValue placeholder="Sector" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {
                                      sectoresOrdenados.map((sector) => (
                                        <SelectItem key={sector} value={sector}>
                                          {sector}
                                        </SelectItem>
                                      ))
                                    }
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                             {form.formState.errors.sector && (
                                <span className="text-red-500 text-xs">
                                  {form.formState.errors.sector.message as string}
                                </span>
                              )}
                          </FormItem>
                        )}
                      /> 


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

            {
              nameplan !== 'Pro Con Descuento' && (     
                  <FormField
                  control={form.control}
                  name="codigo"
                  render={({ field }) => (                
                    <FormItem >
                      <div className="flex items-center gap-2 ">                
                      <Label htmlFor="codigo" className="text-xs lg:text-base " >Código de descuento </Label>
                    </div>
                      <FormControl>
                        <Input
                          id="codigo"
                          type="text"
                          placeholder="Ingresa tu codigo"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="lg:text-sm text-xs"
                        />                  
                      </FormControl>

                      {form.formState.errors.codigo && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.codigo.message as string}
                        </span>
                      )}
                    </FormItem>
                  )}/>  
                
              )
            }


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
                        onChange={(e) => {
                          field.onChange(e.target.checked)

                        }}
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

            {children}



            <div  className={`rounded-2xl w-[100%] p-6 lg:w-[70%]${check ? ' hidden' : ''}`}>
                <h1 className='text-center text-xl font-bold mb-5'>Pagar:</h1>
                <Suscripcion planId={idplan} userId={idUser}/>                
            </div>

            <h3  ref={pagarRef}>Se puede pagar con tarjeta de crédito o débito</h3>
        </div>
        </CardContent>

      </Card>

    </>        

}
      
