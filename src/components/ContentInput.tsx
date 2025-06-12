"use client";
import { FC } from "react";
import { IContentInputValues } from "@/types/content";
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue, SelectTrigger } from "./ui/select";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { FormProvider } from "react-hook-form";
import { IDIOMAS, IdiomaType } from "@/const/lenguajes";


const formSchema = z.object({
  // businessName: z.string().min(1, "Campo requerido"),
  //datos empresa
  nombre_empresa: z.string().min(1,"Campo requerido"),
  nombre_corto_empresa: z.string().optional(),
  web_site: z.string().optional(),
  desc_empresa: z.string().optional(),
  nombre_personaje: z.string().optional(),
  descripcion_personaje: z.string().optional(),  


  // target
  ultra_personalizado : z.enum(["Si", "No",""]).optional(),  
  segmento_audiencia: z.enum(["A/B", "C+", "C", "D+", "D", "E"]),
  descripcion_audiencia: z.string().optional(),  
  nombre_empresa_target: z.string().optional(),  
  web_site_empresa_target: z.string().optional(),  
  descripcion_empresa_target: z.string().optional(),  
  nombre_buyer_persona: z.string().optional(),
  descripcion_buyer_persona: z.string().optional(),
  url_linkedIn_buyer_persona: z.string().optional(),
  
  //mensaje
  objetivo_publicacion: z.enum(["Promocionar", "Educar", "Inspirar", "Entretener","Compartir testimonio",""]).optional(),
  tono_publicacion: z.enum(["Experto", "Amigo", "Mentor", "Compañero", "Amigable", "Profesional", "Inspiradora", "Técnica", "Informativa"]),
  texto_insp_ref : z.string().optional(),
  ia_estilo_autor : z.string().optional(),
  extension : z.enum(["Corta", "Media", "Inglés", "Larga"]).optional(),
  // idioma: z.enum(["Español (Latinoamérica)", "Español (España)", "Inglés", "Francés","Alemán","Japonés","","Mandarín","hindi"]).optional(),      
  idioma: z.custom<IdiomaType>((val) => IDIOMAS.includes(val as IdiomaType), {
  message: "Idioma no válido",  
}),
  contenido : z.string().min(1,"Campo requerido"),
})
// .refine((data) => data.url || data.topic || data.web_site, {
//   message: "Debes proporcionar una URL o un tema base.",
//   path: ["url"],
// });

type TPropsContentInputProps = {
  onGenerate: (values: IContentInputValues) => void;
};

export const ContentInput: FC<TPropsContentInputProps> = ({ onGenerate }) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {      
      nombre_empresa: "",
      nombre_corto_empresa: "",
      web_site: "",
      desc_empresa: "",
      nombre_personaje: "",
      descripcion_personaje: "",
      ultra_personalizado: "No",
      segmento_audiencia: "A/B",
      descripcion_audiencia: "",
      nombre_empresa_target: "",
      web_site_empresa_target: "",
      descripcion_empresa_target: "",
      nombre_buyer_persona: "",
      descripcion_buyer_persona: "",
      url_linkedIn_buyer_persona: "",
      objetivo_publicacion: "Promocionar",      
      tono_publicacion: "Experto",
      texto_insp_ref: "",
      ia_estilo_autor: "",
      extension: "Corta",                             
      idioma: "Español (Latinoamérica)",
      contenido: "",
    },
  });
  
  const ultra = form.watch("ultra_personalizado");

  const onSubmit = (data: z.infer<typeof formSchema>) => {  
    // alert("Formulario enviado correctamente");
    console.log("Form submitted:", data);

    onGenerate(data as IContentInputValues);
  }

  return (
    // <main className="w-full h-full">
    <main className="w-full h-full flex items-center justify-center p-6">
      {/* <FormProvider {...form}>               */}

      <FormProvider {...form}>
        {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> */}
        <form  onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-7xl grid grid-cols-3 gap-10 bg-white p-12 rounded-2xl shadow-lg ">
        
        <div className="col-span-3 p-2 w-full h-full border-2 border-black rounded-lg relative">          
          <span className="absolute -top-3 left-4 bg-white px-2 text-sm font-bold ">
            DATOS DE TU EMPRESA
          </span>

          <div className="grid grid-cols-3 gap-6 p-3">
          <FormField
            control={form.control}
            name="nombre_empresa"
            render={({ field }) => (                
              <FormItem >
                <div className="flex items-center gap-2">
                {/* <Label htmlFor="nombre_empresa" className="text-xs font-bold">Tu Empresa o Producto</Label> */}
                <Label htmlFor="nombre_empresa" >Tu Empresa o Producto</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Nombre oficial o comercial de tu empresa o línea de productos.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="nombre_empresa"
                    type="text"
                    placeholder="Nombre de la empresa o producto"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
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
            name="nombre_corto_empresa"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="nombre_corto_empresa" >Nombre corto de la empresa</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Nombre breve o apodo de la empresa usado en redes o marketing.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="nombre_corto_empresa"
                    type="text"
                    placeholder="Nombre corto de la empresa o producto"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                  {form.formState.errors.nombre_corto_empresa && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.nombre_corto_empresa.message as string}
                    </span>
                  )}
              </FormItem>
            )} 
          />

          <FormField
            control={form.control}
            name="web_site"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="web_site">Web site de la empresa</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    URL principal del sitio web o landing page.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="web_site"
                    type="text"
                    placeholder="URL de la empresa o producto"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />                  
                </FormControl>
                  {form.formState.errors.web_site && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.web_site.message as string}
                    </span>
                  )}
              </FormItem>
            )} 
          /> 

        {/* </div> */}


        {/* <div className="grid grid-cols-3 gap-6 mt-5"> */}
             <FormField
            control={form.control}
            name="desc_empresa"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="desc_empresa">Descripción de la empresa </Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Resumen de lo que hace la empresa y su propuesta de valor.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="desc_empresa"
                    type="text"
                    placeholder="Descripción de la empresa (opcional)"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                  {form.formState.errors.desc_empresa && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.desc_empresa.message as string}
                    </span>
                  )}
              </FormItem>
            )} 
          /> 


          <FormField
            control={form.control}
            name="nombre_personaje"
            render={({ field }) => (
              <FormItem >

                <div className="flex items-center gap-2">
                  <Label htmlFor="nombre_personaje">Nombre del Personaje</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Nombre del vocero real o ficticio que representa la marca.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="nombre_personaje"
                    type="text"
                    placeholder="Nombre del personaje (opcional)"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                 {form.formState.errors.nombre_personaje && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.nombre_personaje.message as string}
                  </span>
                )}
              </FormItem>
            )}
          /> 

          <FormField
            control={form.control}
            name="descripcion_personaje"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="descripcion_personaje">Descripción del Personaje</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Breve descripción del personaje que comunica el mensaje.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="descripcion_personaje"
                    type="text"
                    placeholder="Descripción del personaje (opcional)"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                    {form.formState.errors.descripcion_personaje && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.descripcion_personaje.message as string}
                  </span>
                )}
              </FormItem>
            )} 
          /> 

        </div>

        </div>
        
        <div className="col-span-3 p-2 w-full h-full border-2 border-black rounded-lg relative">          
          <span className="absolute -top-3 left-4 bg-white px-2 text-sm font-bold">
            TARGET
          </span>
                    

          <div className="grid grid-cols-3 gap-6 p-3">    
            {/* FALATA NOMBRES */}
            <FormField
              control={form.control}
              name="ultra_personalizado"
              render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <Label htmlFor="ultra_personalizado">¿Ultra personalizado?</Label>
                  {/* Icono con tooltip  */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span tabIndex={0}>
                        <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      ¿El contenido debe estar extremadamente dirigido a una persona específica? (Sí/No)
                    </TooltipContent>
                  </Tooltip>
                </div>
               <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>                        
                        <SelectItem value="Si">Sí</SelectItem>
                        <SelectItem value="No">No</SelectItem>                        
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                
                  {form.formState.errors.ultra_personalizado && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.ultra_personalizado.message as string}
                    </span>
                  )}
              </FormItem>
            )}
          />
          
          {ultra == "No" && (

            <>
            
            
          <FormField
            control={form.control}
            name="segmento_audiencia"
            render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Label htmlFor="segmento_audiencia">Segmento de la audiencia</Label>
                {/* Icono con tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Los segmentos socioeconómicos agrupan a la población según su nivel de ingresos, educación, ocupación y estilo de vida, reflejando su poder adquisitivo. 
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Seleciona un segmento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="A/B">A/B - (Alto)</SelectItem>
                        <SelectItem value="C+">C+ - (Medio-Alto)</SelectItem>
                        <SelectItem value="C">C - (Medio)</SelectItem>                 
                        <SelectItem value="D+">D+ - (Medio-Bajo)</SelectItem>                 
                        <SelectItem value="D">D - (Bajo)</SelectItem>                 
                        <SelectItem value="E">E - (Muy Bajo)</SelectItem>                 
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              
                {form.formState.errors.segmento_audiencia && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.segmento_audiencia.message as string}
                  </span>
                )}
            </FormItem>
          )}
        /> 
        

         <FormField
            control={form.control}
            name="descripcion_audiencia"
            render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Label htmlFor="descripcion_audiencia">Descripcion de la audiencia</Label>
                {/* Icono con tooltip     */}

                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Descripción general de los intereses, problemas o perfil del público objetivo.
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  id="descripcion_audiencia"
                  type="text"
                  placeholder="Descripción de la audiencia"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              
                {form.formState.errors.descripcion_audiencia && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.descripcion_audiencia.message as string}
                  </span>
                )}
            </FormItem>
          )}
        />

        </>
        
        )}

        
        {ultra == "Si" && (
        <>
                <FormField
            control={form.control}
            name="nombre_empresa_target"
            render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Label htmlFor="nombre_empresa_target">Empresa o Producto</Label>
                {/* Icono con tooltip     */}

                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Empresa o marca que consume o representa el buyer persona (si aplica).
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  id="nombre_empresa_target"
                  type="text"
                  placeholder="Nombre de la empresa o producto"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              
                {form.formState.errors.nombre_empresa_target && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.nombre_empresa_target.message as string}
                  </span>
                )}
            </FormItem>
          )}
        />


                  <FormField
            control={form.control}
            name="web_site_empresa_target"
            render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Label htmlFor="web_site_empresa_target">Web site de la empresa</Label>
                {/* Icono con tooltip     */}

                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    URL del sitio web del buyer persona si está disponible.
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  id="web_site_empresa_target"
                  type="text"
                  placeholder="URL de la empresa o producto"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              
                {form.formState.errors.web_site_empresa_target && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.web_site_empresa_target.message as string}
                  </span>
                )}
            </FormItem>
          )}
        />



            
                  <FormField
            control={form.control}
            name="descripcion_empresa_target"
            render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Label htmlFor="descripcion_empresa_target">Descripción de la empresa</Label>
                {/* Icono con tooltip     */}

                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Descripción general de la empresa del buyer persona.
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  id="descripcion_empresa_target"
                  type="text"
                  placeholder="Descripción de la empresa"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              
                {form.formState.errors.descripcion_empresa_target && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.descripcion_empresa_target.message as string}
                  </span>
                )}
            </FormItem>
          )}
        />



          <FormField
            control={form.control}
            name="nombre_buyer_persona"
            render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Label htmlFor="nombre_buyer_persona">Nombre del Buyer Persona</Label>
                {/* Icono c on tooltip   */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Nombre del contacto al que se dirige la publicación.
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  id="nombre_buyer_persona"
                  type="text"
                  placeholder="Nombre del Buyer Persona"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              
                {form.formState.errors.nombre_buyer_persona && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.nombre_buyer_persona.message as string}
                  </span>
                )}
            </FormItem>
          )}
        /> 


          <FormField
            control={form.control}
            name="descripcion_buyer_persona"
            render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Label htmlFor="descripcion_buyer_persona">Descripción Buyer Persona</Label>
                {/* Icono c on tooltip   */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Breve perfil de la persona objetivo.s
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  id="descripcion_buyer_persona"
                  type="text"
                  placeholder="Descripción del Buyer Persona"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              
                {form.formState.errors.descripcion_buyer_persona && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.descripcion_buyer_persona.message as string}
                  </span>
                )}
            </FormItem>
          )}
        /> 


          <FormField
            control={form.control}
            name="url_linkedIn_buyer_persona"
            render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Label htmlFor="url_linkedIn_buyer_persona">URL de LinkedIn</Label>
                {/* Icono c on tooltip   */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Perfil profesional del buyer persona (LinkedIn).
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  id="url_linkedIn_buyer_persona"
                  type="text"
                  placeholder="URL de LinkedIn del Buyer Persona"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              
                {form.formState.errors.url_linkedIn_buyer_persona && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.url_linkedIn_buyer_persona.message as string}
                  </span>
                )}
            </FormItem>
          )}
        /> 
            </>
         )}
          </div>          
        </div>
          
          
        <div className="col-span-3 p-2 w-full h-full border-2 border-black rounded-lg relative">          
          <span className="absolute -top-3 left-4 bg-white px-2 text-sm font-bold">
            MENSAJE
          </span>

             <div className="grid grid-cols-3 gap-6 p-3"> 
            <FormField
            control={form.control}
            name="objetivo_publicacion"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="objetivo_publicacion">Objetivo de la publicación</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Propósito de la publicación (ej. promocionar, informar, educar, etc.).
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecciona un objetivo de la publicacion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Promocionar">Promocionar</SelectItem>
                        <SelectItem value="Educar">Educar</SelectItem>
                        <SelectItem value="Inspirar">Inspirar</SelectItem>
                        <SelectItem value="Entretener">Entretener</SelectItem>
                        <SelectItem value="Compartir testimonio">Compartir testimonio</SelectItem>                        
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                 {form.formState.errors.objetivo_publicacion && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.objetivo_publicacion.message as string}
                    </span>
                  )}
              </FormItem>
            )}
          />

           <FormField
            control={form.control}
            name="tono_publicacion"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="tono_publicacion">Tono de la publicacion</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                      Estilo comunicativo: profesional, técnico, persuasivo, etc.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecciona una tono de la publicacion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Experto">Experto</SelectItem>
                        <SelectItem value="Amigo">Amigo</SelectItem>
                        <SelectItem value="Mentor">Mentor</SelectItem>
                        <SelectItem value="Compañero">Compañero</SelectItem>
                        <SelectItem value="Amigable">Amigable</SelectItem>
                        <SelectItem value="Profesional">Profesional</SelectItem>
                        <SelectItem value="TécnicaTécnica">TécnicaTécnica</SelectItem>
                        <SelectItem value="Informativa">Informativa</SelectItem>                        
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                  {form.formState.errors.tono_publicacion && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.tono_publicacion.message as string}
                    </span>
                  )}
              </FormItem>
            )}
          /> 

          <FormField
            control={form.control}
            name="texto_insp_ref"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="texto_insp_ref"> Texto inspirador o de referencia</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Fragmento que sirva como guía de tono o estilo.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="texto_insp_ref"
                    type="text"
                    placeholder="Texto inspirador o de referencia"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                  {form.formState.errors.texto_insp_ref && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.texto_insp_ref.message as string}
                    </span>
                  )}
              </FormItem>
            )} 
          />


             <FormField
            control={form.control}
            name="ia_estilo_autor"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="ia_estilo_autor"> AI estilo de este autor</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Referencia opcional a un autor famoso cuyo estilo se desea imitar.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="ia_estilo_autor"
                    type="text"
                    placeholder="Menciona un autor famoso (opcional)"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                  {form.formState.errors.ia_estilo_autor && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.ia_estilo_autor.message as string}
                    </span>
                  )}
              </FormItem>
            )} 
          />


          
             <FormField
            control={form.control}
            name="extension"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="extension">Extensión</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Longitud estimada del contenido (corta, media, larga).
                  </TooltipContent>
                </Tooltip>
              </div>
               <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Seleciona la extension" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Corta">Corta</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                        <SelectItem value="Larga">Larga</SelectItem>                 
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                  {form.formState.errors.tono_publicacion && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.tono_publicacion.message as string}
                    </span>
                  )}
              </FormItem>
            )} 
          />



          <FormField
            control={form.control}
            name="idioma"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="idioma">Idioma</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Idioma en el que se desea el contenido.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {
                          IDIOMAS.map((idioma) => (
                            <SelectItem key={idioma} value={idioma}>
                              {idioma}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                 {form.formState.errors.idioma && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.idioma.message as string}
                    </span>
                  )}
              </FormItem>
            )}
          /> 


            <FormField
            control={form.control}
            name="contenido"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="contenido">Idea principal</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Idea principal o mensaje que se quiere transmitir en el contenido.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="contenido"
                    type="text"
                    placeholder="Idea de referencia o mensaje principal"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                  {form.formState.errors.contenido && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.contenido.message as string}
                    </span>
                  )}
              </FormItem>
            )} 
          />                       



          </div>

        </div>             
                                         
                                          
          <div className="col-span-3 flex justify-center">            
            <Button type="submit">Generar contenido</Button>
          </div>
          
        </form>
      </FormProvider>
      {/* </FormProvider> */}
    </main>
  );
}
