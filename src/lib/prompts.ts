export function buildPrompt({
  content,
  authorityVoice,
  buyerPersona,
  businessName,
  website,
  shortName,
  network,
  characterName,
  characterDescription,
}: {
  content: string;
  authorityVoice: string;
  buyerPersona: string;
  businessName: string;
  website: string;
  shortName?: string;
  network: "Facebook" | "Instagram" | "X";
  characterName?: string;
  characterDescription?: string;
}) {
  const networkInstructions: Record<typeof network, string> = {
    Facebook:
      "Máximo 300 palabras. Comienza con una frase llamativa. Usa párrafos cortos para facilitar la lectura. Incluye llamados a la acción claros (CTA) y, si aplica, enlaces. Mantén un tono profesional pero cercano, orientado a resolver dudas o presentar beneficios concretos.",

    Instagram:
      "Máximo 2200 caracteres. Inicia con una frase atractiva o una pregunta. Usa emojis para transmitir emoción y facilitar la lectura. Incluye entre 5 y 10 hashtags populares y específicos al final. Usa un tono amistoso, visual y emocional. Si es posible, sugiere una interacción en los comentarios o una acción a seguir.",

    X: "Máximo 280 caracteres. Sé directo y creativo desde el primer carácter. Usa una frase de impacto o una opinión que invite a compartir. Incluye 1-2 hashtags estratégicos y una mención si aplica. El tono debe ser ingenioso, actual y fácil de retuitear o dar like.",
  };

  const lines = [
    `Crea un post para la red social: ${network}.`,
    "",
    `▶ Marca / Empresa: ${businessName}`,
    `▶ Sitio web: ${website}`,
    "",
    characterName && characterDescription
      ? `▶ Utiliza un personaje llamado "${characterName}" (${characterDescription}) para comunicar el mensaje.`
      : null,
    "",
    `▶ Contenido base:\n${content}`,
    "",
    `▶ Voz de autoridad: ${authorityVoice}`,
    `▶ Buyer Persona objetivo: ${buyerPersona}`,
    "",
    `▶ Instrucciones específicas para ${network}:`,
    networkInstructions[network],
    "",
    `✅ Devuelve la respuesta iniciando con: "TÍTULO: ..." seguido de una línea en blanco, y luego "CUERPO: ..." con el contenido del post.`,
    `🛑 No uses comillas, etiquetas HTML ni formato JSON.`,
  ];

  return lines.filter(Boolean).join("\n");
}
