import { z } from "zod";

export const formSchemaLogin = z.object({
  password: z.string().min(1, "Campo requerido"),
  email: z.string().email("Email inválido").min(1, "Campo requerido"),
})