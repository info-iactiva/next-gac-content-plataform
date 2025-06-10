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



const formSchema = z.object({
  businessName: z.string().min(1, "Campo requerido"),
  buyerPersona: z.string().min(1, "Campo requerido"),
  characterName: z.string().optional(),
  characterDescription: z.string().optional(),
  web_site: z.string().optional(),
  nombre_empresa: z.string().optional(),
  nombre_corto_empresa: z.string().optional(),
  authorityVoice: z.enum(["Experto", "Amigo", "Mentor", "Compañero", "Amigable", "Profesional", "Inspiradora", "Técnica", "Informativa"]),
  objetivo_publicacion: z.enum(["Promocionar", "Educar", "Inspirar", "Entretener","Compartir testimonio",""]).optional(),
  url: z.string().optional(),
  topic: z.string(),  
  url_linkedIn :z.string(),  
  desc_empresa: z.string().optional(),
  texto_insp_ref : z.string().optional(),
  idioma: z.enum(["Español (Latinoamérica)", "Español (España)", "Inglés", "Francés","Alemán","Japonés","","Mandarín","hindi"]).optional(),
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
      businessName: "",
      buyerPersona: "",
      characterName: "",
      characterDescription: "",
      authorityVoice: "Experto",
      topic: "",
      url: "",
      web_site: "",
      nombre_empresa: "",
      nombre_corto_empresa: "",
      objetivo_publicacion: "",
      url_linkedIn : "",
      desc_empresa: "",
      texto_insp_ref: "",
      idioma: "Español (Latinoamérica)",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {  
    // alert("Formulario enviado correctamente");
    console.log("Form submitted:", data);

    onGenerate(data as IContentInputValues);
  }

  return (
    // <main className="w-full h-full">
    <main className="">
      {/* <FormProvider {...form}>               */}

      <FormProvider {...form}>
        {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> */}
        <form  onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-7xl grid grid-cols-3 gap-10 bg-white p-12 rounded-2xl shadow-lg ">
        
        
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (                
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="businessName">Empresa o Producto</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Tipo de empresa.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="businessName"
                    type="text"
                    placeholder="Nombre de la empresa o producto"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />                  
                </FormControl>

                {form.formState.errors.businessName && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.businessName.message as string}
                  </span>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buyerPersona"
            render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Label htmlFor="buyerPersona">Buyer Persona</Label>
                {/* Icono con tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Ejemplo: “Directora de Comunicación en una empresa B2B tecnológica”. 
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  id="buyerPersona"
                  type="text"
                  placeholder="Descripción del buyer persona"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              
                {form.formState.errors.buyerPersona && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.buyerPersona.message as string}
                  </span>
                )}
            </FormItem>
          )}
        />

          <FormField
            control={form.control}
            name="characterName"
            render={({ field }) => (
              <FormItem >

                <div className="flex items-center gap-2">
                  <Label htmlFor="characterName">Nombre del Personaje</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Ejemplo: mickey mouse
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="characterName"
                    type="text"
                    placeholder="Nombre del personaje (opcional)"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                 {form.formState.errors.characterName && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.characterName.message as string}
                  </span>
                )}
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="characterDescription"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="characterDescription">Descripción del Personaje</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Ejemplo: “Mariana es una estratega digital experta en automatización de contenidos”. 
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="characterDescription"
                    type="text"
                    placeholder="Descripción del personaje (opcional)"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                    {form.formState.errors.characterDescription && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.characterDescription.message as string}
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
                    Ejemplo: www.iactiva.ai 
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

          <FormField
            control={form.control}
            name="nombre_empresa"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="nombre_empresa">Nombre de la empresa</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Nombre de la empresa o producto que se utilizará en el contenido.
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="nombre_empresa"
                    type="text"
                    placeholder="Nombre de la empresa"
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
            )} 
          />

          <FormField
            control={form.control}
            name="nombre_corto_empresa"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="nombre_corto_empresa">Nombre corto de la empresa</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Ejemplo: iActiva 
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
                    Ejemplo: “iActiva GenAI Solutions S.A. de C.V. ofrece soluciones inteligentes de automatización de contenido.” 
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
            name="url_linkedIn"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="url_linkedIn">URL de LinkedIn</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Ejemplo: https://www.linkedin.com/in/ana-directora-b2b 
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="url_linkedIn"
                    type="text"
                    placeholder="URL de LinkedIn del Buyer Persona (opcional)"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                  {form.formState.errors.url_linkedIn && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.url_linkedIn.message as string}
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
                    Ejemplo: “Nos emociona compartir esta novedad con nuestra comunidad…” 
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
            name="authorityVoice"
            render={({ field }) => (
              <FormItem >
                <div className="flex items-center gap-2">
                <Label htmlFor="authorityVoice">Tono de la publicacion</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                      Ejemplos: Amigable, Profesional, Inspiradora, Técnica, Informativa
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
                  {form.formState.errors.authorityVoice && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.authorityVoice.message as string}
                    </span>
                  )}
              </FormItem>
            )}
          />


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
                    Selecciona una o varias: Promocionar, Educar, Informar, Inspirar, Entretener, Compartir testimonio 
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
                    Selecciona el idioma en el que quieres generar el contenido.
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
                        <SelectItem value="Español (Latinoamérica)">Español (Latinoamérica)</SelectItem>
                        <SelectItem value="Español (España)">Español (España)</SelectItem>
                        <SelectItem value="Inglés">Inglés</SelectItem>
                        <SelectItem value="Francés">Francés</SelectItem>
                        <SelectItem value="Alemán">Alemán</SelectItem>
                        <SelectItem value="Mandarín">Mandarín</SelectItem>
                        <SelectItem value="hindi">hindi</SelectItem>
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
            name="topic"
            render={() => (
              <FormItem>
                <div className="flex items-center gap-2">
                <Label htmlFor="topicOrUrl">Idea clave o Noticia</Label>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Describe brevemente el tema que quieres comunicar. Ejemplo: “Nueva regulación de IA en México y cómo afecta a las empresas tecnológicas”. 
                  </TooltipContent>
                </Tooltip>
              </div>
                <FormControl>
                  <Input
                    id="topic"
                    type="text"
                    placeholder="URL de la noticia o tema"
                    value={
                      form.getValues("url") || form.getValues("topic") || ""
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      const isUrl = /^https?:\/\/.+/i.test(value);
                      form.setValue("url", isUrl ? value : "");
                      form.setValue("topic", !isUrl ? value : "");
                    }}
                  />
                </FormControl>
                 {form.formState.errors.topic && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.topic.message as string}
                    </span>
                  )}                
              </FormItem>
            )}
          />

          <div className="col-span-3 flex justify-center">            
            <Button type="submit">Generar contenido</Button>
          </div>
          
        </form>
      </FormProvider>
      {/* </FormProvider> */}
    </main>
  );
}
