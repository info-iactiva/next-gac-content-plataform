import { z } from "zod";

export const formSchemahomepage = z.object({
  nombre: z.string().min(1, "Campo requerido"),
  email: z.string().email("Email inválido").min(1, "Campo requerido"),
  comentarios: z.string().min(1, "Campo requerido"),
})