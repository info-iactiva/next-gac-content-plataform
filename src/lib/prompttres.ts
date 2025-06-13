// export function buildPrompttres({
//   content,
//   network,
//   nombre_empresa,
//   nombre_corto_empresa,
//   web_site,
//   desc_empresa,
//   nombre_personaje,
//   descripcion_personaje,
//   ultra_personalizado,
//   segmento_audiencia,
//   descripcion_audiencia,
//   nombre_empresa_target,
//   web_site_empresa_target,
//   descripcion_empresa_target,
//   nombre_buyer_persona,
//   descripcion_buyer_persona,
//   url_linkedIn_buyer_persona,
//   objetivo_publicacion,
//   tono_publicacion,
//   texto_insp_ref,
//   ia_estilo_autor,
//   extension,
//   idioma,
// }: {
//   content: string;
//   network: "Facebook" | "Instagram" | "X" | "Blog" | "LinkedIn" | "Email" | "DirectMessage" | "WhatsApp";
//   nombre_empresa: string;
//   nombre_corto_empresa?: string;
//   web_site?: string;
//   desc_empresa?: string;
//   nombre_personaje?: string;
//   descripcion_personaje?: string;
//   ultra_personalizado: "Sí" | "No";
//   segmento_audiencia?: string;
//   descripcion_audiencia?: string;
//   nombre_empresa_target?: string;
//   web_site_empresa_target?: string;
//   descripcion_empresa_target?: string;
//   nombre_buyer_persona?: string;
//   descripcion_buyer_persona?: string;
//   url_linkedIn_buyer_persona?: string;
//   objetivo_publicacion?: string;
//   tono_publicacion?: string;
//   texto_insp_ref?: string;
//   ia_estilo_autor?: string;
//   extension?: string;
//   idioma?: string;
// }) {
//   const responseInstructions = {
//     Blog:
//       "Longitud ideal: 300 a 600 palabras. Redacción clara, fluida y útil. Incluir subtítulos, estructura SEO optimizada y llamadas a la acción con enlaces al sitio web. Reforzar ideas clave y adaptarse al buyer persona. Incluir una meta descripción al inicio.",
//     Facebook:
//       "Máximo 150 caracteres. Frase directa, amigable y con un llamado a la acción. Acompañar con un enlace si aplica.",
//     Instagram:
//       `Máximo 200 caracteres. Comienza con una pregunta o frase atractiva. Usa emojis estratégicamente. Incluye de 5 a 10 hashtags, uno de ellos debe ser #${nombre_corto_empresa || "TuMarca"}. Estilo visual, cercano y emocional.`,
//     X:
//       `Máximo 280 caracteres. Tono ingenioso, actual y fácil de compartir. Comienza con frase de impacto. 1 o 2 hashtags relevantes incluyendo #${nombre_corto_empresa || "TuMarca"}.`,
//     LinkedIn:
//       "Máximo 200 caracteres. Tono profesional, motivador y estratégico. Incluir llamada a la acción y sitio web.",
//     Email:
//       `Genera un breve correo que salude al buyer persona y presente el contenido de manera directa. Incluye una llamada a la acción y enlace a ${web_site || "tu sitio web"}.`,
//     DirectMessage:
//       `Genera un mensaje directo (Messenger o LinkedIn) saludando al buyer persona${url_linkedIn_buyer_persona ? ` en ${url_linkedIn_buyer_persona}` : ""}. Sé cortés y directo, invita a conocer la propuesta en ${web_site || "tu sitio web"}.`,
//     WhatsApp:
//       `Redacta un mensaje breve y directo para WhatsApp, saludando al buyer persona${url_linkedIn_buyer_persona ? ` en ${url_linkedIn_buyer_persona}` : ""}, presentando la propuesta con claridad e incluyendo el link: ${web_site || "tu sitio web"}.`,
//   };

//   const lines = [
//     `Crea contenidos para los siguientes canales: ${network}.`,
//     ``,
//     `▶ Nombre de la empresa: ${nombre_empresa}`,
//     `▶ Nombre corto de la empresa: ${nombre_corto_empresa || "No especificado"}`,
//     `▶ Sitio web o landing page: ${web_site || "No especificado"}`,
//     `▶ Descripción de la empresa: ${desc_empresa || "No especificado"}`,
//     ``,
//     nombre_personaje && descripcion_personaje
//       ? `▶ Personaje comunicador: "${nombre_personaje}", descrito como: ${descripcion_personaje}.`
//       : null,
//     ``,
//     ultra_personalizado === "No"
//       ? [
//           `▶ Segmento socioeconómico de la audiencia (A/B, C+, C, D+, D, E): ${segmento_audiencia || "No especificado"}`,
//           `▶ Descripción general de la audiencia: ${descripcion_audiencia || "No especificado"}`,
//         ].join("\n")
//       : [
//           `▶ Empresa o marca del buyer persona: ${nombre_empresa_target || "No especificado"}`,
//           `▶ Web de la empresa: ${web_site_empresa_target || "No especificado"}`,
//           `▶ Descripción de la empresa: ${descripcion_empresa_target || "No especificado"}`,
//           `▶ Nombre del buyer persona: ${nombre_buyer_persona || "No especificado"}`,
//           `▶ Perfil del buyer persona: ${descripcion_buyer_persona || "No especificado"}`,
//           url_linkedIn_buyer_persona
//             ? `▶ LinkedIn del buyer persona: ${url_linkedIn_buyer_persona}`
//             : null,
//         ].filter(Boolean).join("\n"),
//     ``,
//     `▶ Objetivo de la publicación: ${objetivo_publicacion || "No especificado"}`,
//     `▶ Tono de la publicación: ${tono_publicacion || "No especificado"}`,
//     texto_insp_ref
//       ? `▶ Texto de referencia o inspiración:\n"${texto_insp_ref}"`
//       : null,
//     ia_estilo_autor
//       ? `▶ Inspirado en el estilo de: ${ia_estilo_autor}`
//       : null,
//     `▶ Extensión deseada: ${extension || "media"}`,
//     `▶ Idioma: ${idioma || "español"}`,
//     ``,
//     `▶ Contenido base para adaptar: ${content}`,
//     ``,
//     `▶ Instrucciones específicas para ${network}:`,
//     responseInstructions[network],
//     ``,
//     `✅ Incluir siempre al menos un llamado a la acción (CTA).`,
//     `✅ Siempre mencionar el sitio web: ${web_site || "tu sitio web"}`,
//     `🛑 No uses comillas ni etiquetas HTML. No usar formato JSON.`,
//     `✅ Devuelve SOLO el siguiente formato, sin agregar nada más:`,
//     `TÍTULO: [el título generado]`,
//     ``,
//     `CUERPO: [el cuerpo generado]`,
//     `✅ No agregues ningún texto antes o después, solo el formato solicitado.`,
//     `✅ No repitas instrucciones ni incluyas explicaciones.`,
//     `✅ No uses comillas ni etiquetas HTML. No usar formato JSON.`,
//     `🛑 No uses marcadores de posición como [Nombre], [Empresa], etc. Usa solo texto real en el resultado final.`,
//   ];

//   return lines.filter(Boolean).join("\n");
// }


export function buildPrompttres({
  content,
  nombre_empresa,
  nombre_corto_empresa,
  web_site,
  desc_empresa,
  nombre_personaje,
  descripcion_personaje,
  ultra_personalizado,
  segmento_audiencia,
  descripcion_audiencia,
  nombre_empresa_target,
  web_site_empresa_target,
  descripcion_empresa_target,
  nombre_buyer_persona,
  descripcion_buyer_persona,
  url_linkedIn_buyer_persona,
  objetivo_publicacion,
  tono_publicacion,
  texto_insp_ref,
  ia_estilo_autor,
  extension,
  idioma,
  network
}: {
  content: string;
  nombre_empresa: string;
  nombre_corto_empresa?: string;
  web_site?: string;
  desc_empresa?: string;
  nombre_personaje?: string;
  descripcion_personaje?: string;
  ultra_personalizado: "Si" | "No" | "";
  segmento_audiencia?: "A/B" | "C+" | "C" | "D+" | "D" | "E";
  descripcion_audiencia?: string;
  nombre_empresa_target?: string;
  web_site_empresa_target?: string;
  descripcion_empresa_target?: string;
  nombre_buyer_persona?: string;
  descripcion_buyer_persona?: string;
  url_linkedIn_buyer_persona?: string;
  objetivo_publicacion?: string;
  tono_publicacion?: string;
  texto_insp_ref?: string;
  ia_estilo_autor?: string;
  extension?: string;
  idioma?: string;
  network:
    | "Facebook"
    | "Instagram"
    | "X"
    | "Blog"
    | "LinkedIn"
    | "Email"
    | "DirectMessage"
    | "WhatsApp";
}) {
  const isUltra = ultra_personalizado === "Si";

  const resolvedNetwork =
    network === "LinkedIn"
      ? isUltra
        ? "Mensaje individual para LinkedIn"
        : "Artículo para LinkedIn"
      : network;

  const responseInstructions = {
    Blog:
      "Longitud ideal: 300 a 600 palabras. Redacción clara, fluida y útil. Incluir subtítulos, estructura SEO optimizada y llamadas a la acción con enlaces al sitio web. Reforzar ideas clave y adaptarse al buyer persona. Incluir una meta descripción al inicio.",
    Facebook:
      "Máximo 150 caracteres. Frase directa, amigable y con un llamado a la acción. Acompañar con un enlace si aplica.",
    Instagram:
      "Máximo 200 caracteres. Comienza con una pregunta o frase atractiva. Usa emojis estratégicamente. Incluye de 5 a 10 hashtags, uno de ellos debe ser #" +
      nombre_corto_empresa +
      ". Estilo visual, cercano y emocional.",
    X:
      "Máximo 280 caracteres. Tono ingenioso, actual y fácil de compartir. Comienza con frase de impacto. 1 o 2 hashtags relevantes incluyendo #" +
      nombre_corto_empresa +
      ".",
    "Artículo para LinkedIn":
      "Crea un artículo profesional para publicar en LinkedIn. Longitud recomendada: 400 a 800 palabras. Incluye título llamativo, introducción que conecte con la audiencia, desarrollo con datos o insights y una conclusión con llamada a la acción. Tono profesional, motivador y enfocado al crecimiento o aprendizaje.",
    "Mensaje individual para LinkedIn":
      `Escribe un mensaje directo personalizado para el buyer persona${
        url_linkedIn_buyer_persona ? ` en ${url_linkedIn_buyer_persona}` : ""
      }. Sé cordial, directo y menciona brevemente la propuesta de la empresa. Invita a continuar la conversación o agendar una llamada. Incluye el sitio web: ${web_site}.`,
    Email: `Genera un breve correo que salude al buyer persona y presente el contenido de manera directa. Incluye una llamada a la acción y enlace a ${web_site}.`,
    DirectMessage: `Genera un mensaje directo (Messenger o LinkedIn) saludando al buyer persona${
      url_linkedIn_buyer_persona ? ` en ${url_linkedIn_buyer_persona}` : ""
    }. Sé cortés y directo, invita a conocer la propuesta en ${web_site}.`,
    WhatsApp: `Redacta un mensaje breve y directo para WhatsApp, saludando al buyer persona${
      url_linkedIn_buyer_persona ? ` en ${url_linkedIn_buyer_persona}` : ""
    }, presentando la propuesta con claridad e incluyendo el link: ${web_site}.`,
  };

  const lines = [
    `Crea contenidos para los siguientes canales: ${resolvedNetwork}.`,
    "",
    `▶ Nombre de la empresa: ${nombre_empresa}`,
    `▶ Nombre corto de la empresa: ${nombre_corto_empresa || "No especificado"}`,
    `▶ Sitio web o landing page: ${web_site || "No especificado"}`,
    `▶ Descripción de la empresa: ${desc_empresa || "No especificado"}`,
    "",
    nombre_personaje && descripcion_personaje
      ? `▶ Personaje comunicador: "${nombre_personaje}", descrito como: ${descripcion_personaje}.`
      : null,
    "",
    !isUltra && segmento_audiencia
      ? `▶ Segmento socioeconómico de la audiencia: ${segmento_audiencia}. Este segmento representa el nivel de ingresos, educación y estilo de vida del público objetivo.`
      : null,
    !isUltra && descripcion_audiencia
      ? `▶ Descripción adicional de la audiencia: ${descripcion_audiencia}`
      : null,
    isUltra && nombre_empresa_target
      ? `▶ Empresa o marca objetivo del buyer persona: ${nombre_empresa_target}`
      : null,
    isUltra && web_site_empresa_target
      ? `▶ Sitio web de la empresa objetivo: ${web_site_empresa_target}`
      : null,
    isUltra && descripcion_empresa_target
      ? `▶ Descripción de la empresa objetivo: ${descripcion_empresa_target}`
      : null,
    isUltra && nombre_buyer_persona
      ? `▶ Nombre del buyer persona objetivo: ${nombre_buyer_persona}`
      : null,
    isUltra && descripcion_buyer_persona
      ? `▶ Perfil del buyer persona: ${descripcion_buyer_persona}`
      : null,
    isUltra && url_linkedIn_buyer_persona
      ? `▶ LinkedIn del buyer persona: ${url_linkedIn_buyer_persona}`
      : null,
    "",
    objetivo_publicacion
      ? `▶ Objetivo del contenido: ${objetivo_publicacion}`
      : null,
    tono_publicacion
      ? `▶ Tono del contenido: ${tono_publicacion}`
      : null,
    texto_insp_ref
      ? `▶ Texto inspirador o de referencia: "${texto_insp_ref}"`
      : null,
    ia_estilo_autor
      ? `▶ Estilo a imitar: ${ia_estilo_autor}`
      : null,
    extension
      ? `▶ Longitud estimada del contenido: ${extension}`
      : null,
    idioma ? `▶ El contenido debe estar redactado en: ${idioma}.` : null,
    "",
    `▶ Contenido base para adaptar: ${content}`,      
    `▶ Instrucciones específicas para ${resolvedNetwork}:`,
    responseInstructions[resolvedNetwork],
    
    "",
    `✅ Incluir siempre al menos un llamado a la acción (CTA).`,
    `✅ Siempre mencionar el sitio web: ${web_site || "No especificado"}`,
    `🛑 No uses comillas ni etiquetas HTML. No usar formato JSON.`,
    `✅ Devuelve SOLO el siguiente formato, sin agregar nada más:`,
    `TÍTULO: [el título generado]`,
    ``,
    `CUERPO: [el cuerpo generado]`,
    `✅ No agregues ningún texto antes o después, solo el formato solicitado.`,
    `✅ No repitas instrucciones ni incluyas explicaciones.`,
    `🛑 No uses marcadores de posición como [Nombre], [Empresa], etc. Usa solo texto real en el resultado final.`,
  ];

  return lines.filter(Boolean).join("\n");
}


