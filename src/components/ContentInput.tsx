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


const formSchema = z.object({
  businessName: z.string().min(1, "Campo requerido"),
  buyerPersona: z.string().min(1, "Campo requerido"),
  characterName: z.string().optional(),
  characterDescription: z.string().optional(),
  authorityVoice: z.enum(["Experto", "Amigo", "Mentor", "Compañero"]),
  url: z.string().optional(),
  topic: z.string().optional(),
}).refine((data) => data.url || data.topic, {
  message: "Debes proporcionar una URL o un tema base.",
});

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

    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);

    onGenerate(data as IContentInputValues);
  }

  return (
    <main className="w-full h-full">


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem >
                <Label htmlFor="businessName">Empresa o Producto</Label>

                <FormControl>
                  <Input
                    id="businessName"
                    type="text"
                    placeholder="Nombre de la empresa o producto"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buyerPersona"
            render={({ field }) => (
              <FormItem >
                <Label htmlFor="buyerPersona">Buyer Persona</Label>
                <FormControl>
                  <Input
                    id="buyerPersona"
                    type="text"
                    placeholder="Descripción del buyer persona"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="characterName"
            render={({ field }) => (
              <FormItem >
                <Label htmlFor="characterName">Nombre del Personaje</Label>
                <FormControl>
                  <Input
                    id="characterName"
                    type="text"
                    placeholder="Nombre del personaje (opcional)"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}

                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="characterDescription"
            render={({ field }) => (
              <FormItem >
                <Label htmlFor="characterDescription">Descripción del Personaje</Label>
                <FormControl>
                  <Input
                    id="characterDescription"
                    type="text"
                    placeholder="Descripción del personaje (opcional)"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )} 
          />

          <FormField
            control={form.control}
            name="authorityVoice"
            render={({ field }) => (
              <FormItem >
                <Label htmlFor="authorityVoice">Voz de Autoridad</Label>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecciona una voz de autoridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Experto">Experto</SelectItem>
                        <SelectItem value="Amigo">Amigo</SelectItem>
                        <SelectItem value="Mentor">Mentor</SelectItem>
                        <SelectItem value="Compañero">Compañero</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="topic"
            render={() => (
              <FormItem>
                <Label htmlFor="topicOrUrl">Idea clave o Noticia</Label>
                <FormControl>
                  <Input
                    id="topicOrUrl"
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
              </FormItem>
            )}
          />

          <Button type="submit">Generar contenido</Button>
        </form>
      </Form>

    </main>
  );
}