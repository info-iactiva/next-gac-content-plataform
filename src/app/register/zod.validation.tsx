// import { z } from "zod";

// export const formSchemaRegister= z.object({
//   password: z.string().min(1, "Campo requerido"),
//   email: z.string().email("Email inválido").min(1, "Campo requerido"),
// })


// import { z } from "zod";

// export const formSchemaRegister = z.object({
//   email: z.string().email("Email inválido").min(1, "Campo requerido"),
//   password: z.string()
//     .min(10, "Debe tener al menos 10 caracteres")
//     .regex(/[a-z]/, "Debe tener al menos una letra minúscula")
//     .regex(/[A-Z]/, "Debe tener al menos una letra mayúscula")
//     .regex(/[0-9]/, "Debe tener al menos un número")
//     .regex(/[^A-Za-z0-9]/, "Debe tener al menos un carácter especial"),
//   acceptTerms: z.literal(true, {
//     errorMap: () => ({ message: "Debes aceptar los Términos y Condiciones" }),
//   }),
//   nombre: z.string().min(1, "Campo requerido"),
//   apellidos: z.string().min(1, "Campo requerido"),
//   nombre_empresa: z.string().min(1, "Campo requerido"),
//   numero_empleados: z.string().min(1, "Campo requerido"),
//   sector: z.preprocess((val) => (val === "" ? undefined : val), z.enum(["Corta", "Media", "Inglés", "Larga"])).refine((val) => !!val, { message: "Debes seleccionar una opción válida" }),

// });



// schema.ts
import { z } from "zod";
import { SECTORES } from "./sectores"; // Assuming you have a file that exports the SECTORES array
const CODES = [
  'GACLANZAMIENTO',
  " "
]

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
  nombre: z.string().min(1, "Campo requerido"),
  codigo: z.string().refine((val) => CODES.includes(val), { message: "Código inválido" }),
  apellidos: z.string().min(1, "Campo requerido"),
  nombre_empresa: z.string().min(1, "Campo requerido"),
  numero_empleados: z.string().min(1, "Campo requerido"),
  sector: z.string().min(1, "Campo requerido").refine((val) => SECTORES.includes(val), { message: "Debes seleccionar una opción válida" }),
});
