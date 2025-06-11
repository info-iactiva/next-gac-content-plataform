// export function buildPrompt({
//   content,
//   authorityVoice,
//   buyerPersona,
//   businessName,
//   website,
//   network,
//   characterName,
//   characterDescription,
// }: {
//   content: string;
//   authorityVoice: string;
//   buyerPersona: string;
//   businessName: string;
//   website: string;
//   network: "Facebook" | "Instagram" | "X";
//   characterName?: string;
//   characterDescription?: string;
// }) {
//   const networkInstructions: Record<typeof network, string> = {
//     Facebook:
//       "Máximo 300 palabras. Comienza con una frase llamativa. Usa párrafos cortos para facilitar la lectura. Incluye llamados a la acción claros (CTA) y, si aplica, enlaces. Mantén un tono profesional pero cercano, orientado a resolver dudas o presentar beneficios concretos.",

//     Instagram:
//       "Máximo 2200 caracteres. Inicia con una frase atractiva o una pregunta. Usa emojis para transmitir emoción y facilitar la lectura. Incluye entre 5 y 10 hashtags populares y específicos al final. Usa un tono amistoso, visual y emocional. Si es posible, sugiere una interacción en los comentarios o una acción a seguir.",

//     X: "Máximo 280 caracteres. Sé directo y creativo desde el primer carácter. Usa una frase de impacto o una opinión que invite a compartir. Incluye 1-2 hashtags estratégicos y una mención si aplica. El tono debe ser ingenioso, actual y fácil de retuitear o dar like.",
//   };

//   const lines = [
//     `Crea un post para la red social: ${network}.`,
//     "",
//     `▶ Marca / Empresa: ${businessName}`,
//     `▶ Sitio web: ${website}`,
//     "",
//     characterName && characterDescription
//       ? `▶ Utiliza un personaje llamado "${characterName}" (${characterDescription}) para comunicar el mensaje.`
//       : null,
//     "",
//     `▶ Contenido base:\n${content}`,
//     "",
//     `▶ Voz de autoridad: ${authorityVoice}`,
//     `▶ Buyer Persona objetivo: ${buyerPersona}`,
//     "",
//     `▶ Instrucciones específicas para ${network}:`,
//     networkInstructions[network],
//     "",
//     `✅ Devuelve la respuesta iniciando con: "TÍTULO: ..." seguido de una línea en blanco, y luego "CUERPO: ..." con el contenido del post.`,
//     `🛑 No uses comillas, etiquetas HTML ni formato JSON.`,
//   ];

//   return lines.filter(Boolean).join("\n");
// }


export function buildPrompt({
  
  network,
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
  idioma
  
}: {
      content: string;
      nombre_empresa:  string;
      nombre_corto_empresa?:  string;
      web_site?:  string;
      desc_empresa?:  string;
      nombre_personaje?:  string;
      descripcion_personaje?:  string;
      ultra_personalizado:  string;
      segmento_audiencia?:  string;
      descripcion_audiencia? :  string;
      nombre_empresa_target? :  string;
      web_site_empresa_target? :  string;
      descripcion_empresa_target? :  string;
      nombre_buyer_persona? :  string;
      descripcion_buyer_persona? :  string;
      url_linkedIn_buyer_persona? :  string;
      objetivo_publicacion? :  string;
      tono_publicacion? :  string;
      texto_insp_ref? :  string;
      ia_estilo_autor? :  string;
      extension? :  string;
      idioma? :  string;
  network: "Facebook" | "Instagram" | "X" | "Blog"  | "LinkedIn"| "Email"| "DirectMessage"| "WhatsApp"
}) {
  const responseInstructions = {
    Blog:
      "Longitud ideal: 300 a 600 palabras. Redacción clara, fluida y útil. Incluir subtítulos, estructura SEO optimizada y llamadas a la acción con enlaces al sitio web. Reforzar ideas clave y adaptarse al buyer persona. Incluir una meta descripción al inicio.",
    Facebook:
      "Máximo 150 caracteres. Frase directa, amigable y con un llamado a la acción. Acompañar con un enlace si aplica.",
    Instagram:
      "Máximo 200 caracteres. Comienza con una pregunta o frase atractiva. Usa emojis estratégicamente. Incluye de 5 a 10 hashtags, uno de ellos debe ser #" + businessShortName + ". Estilo visual, cercano y emocional.",
    X:
      "Máximo 280 caracteres. Tono ingenioso, actual y fácil de compartir. Comienza con frase de impacto. 1 o 2 hashtags relevantes incluyendo #" + businessShortName + ".",
    LinkedIn:
      "Máximo 200 caracteres. Tono profesional, motivador y estratégico. Incluir llamada a la acción y sitio web.",
    Email:
      `Genera un breve correo que salude al buyer persona y presente el contenido de manera directa. Incluye una llamada a la acción y enlace a ${website}.`,
    DirectMessage:
      `Genera un mensaje directo (Messenger o LinkedIn) saludando al buyer persona ${buyerPersonaURL ? ` en ${buyerPersonaURL}` : ""}. Sé cortés y directo, invita a conocer la propuesta en ${website}.`,
    WhatsApp:
      `Redacta un mensaje breve y directo para WhatsApp, saludando al buyer persona ${buyerPersonaURL ? ` en ${buyerPersonaURL}` : ""}, presentando la propuesta con claridad e incluyendo el link: ${website}.`,
  };
 
  const lines = [
    `Crea contenidos para los siguientes canales: ${network}.`,
    "",
    `▶ Nombre de la empresa: ${businessName}`,
    `▶ Nombre corto de la empresa: ${businessShortName}`,
    `▶ Sitio web o landing page: ${website}`,
    `▶ Descripción de la empresa: ${businessDescription}`,
    "",
    characterName && characterDescription
      ? `▶ Personaje comunicador: "${characterName}", descrito como: ${characterDescription}.`
      : null,
    "",
    exampleText
      ? `▶ Ejemplo de tono de publicación proporcionado por el usuario:\n"${exampleText}"`
      : null,
    "",
    `▶ Contenido base para adaptar: ${content}`,
    "",
    `▶ Voz de autoridad a usar: ${authorityVoice}`,
    `▶ Buyer Persona objetivo: ${buyerPersona}`,
    buyerPersonaURL
      ? `▶ URL del perfil del Buyer Persona: ${buyerPersonaURL}`
      : null,
    "",
    `▶ Objetivo del contenido: ${objective}`,
    `▶ Intención del contenido: ${intention}`,
    `▶ El contenido debe estar redactado en: ${idioma}.`,
    "",
    "",
    `▶ Indicaciones específicas por canal:`,
    "",
    `▶ Instrucciones específicas para ${network}:`,
        responseInstructions[network], 
    "",    
    `✅ Incluir siempre al menos un llamado a la acción (CTA).`,
    `✅ Siempre mencionar el sitio web: ${website}`,
    `🛑 No uses comillas ni etiquetas HTML. No usar formato JSON.`,
     `✅ Devuelve SOLO el siguiente formato, sin agregar nada más:`,
      `TÍTULO: [el título generado]`,
      ``,
      `CUERPO: [el cuerpo generado]`,
      `✅ No agregues ningún texto antes o después, solo el formato solicitado.`,
      `✅ No repitas instrucciones ni incluyas explicaciones.`,
      `✅ No uses comillas ni etiquetas HTML. No usar formato JSON.`,
      `🛑 No uses marcadores de posición como [Nombre], [Empresa], etc. Usa solo texto real en el resultado final.`
  ];
 
  return lines.filter(Boolean).join("\n");
}