// import { z } from "zod";

// export const formSchemaRegister= z.object({
//   password: z.string().min(1, "Campo requerido"),
//   email: z.string().email("Email inválido").min(1, "Campo requerido"),
// })


import { z } from "zod";


export const formSchemaRegister = z.object({
  email: z.string().email("Email inválido").min(1, "Campo requerido"),
  password: z.string()
    .min(10, "Debe tener al menos 10 caracteres")
    .regex(/[a-z]/, "Debe tener al menos una letra minúscula")
    .regex(/[A-Z]/, "Debe tener al menos una letra mayúscula")
    .regex(/[0-9]/, "Debe tener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe tener al menos un carácter especial"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar los Términos y Condiciones" }),
  }),
});

