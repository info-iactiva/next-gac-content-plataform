export function buildPrompt({
    content,
    focus,
    buyerPersona,
    network,
  }: {
    content: string;
    focus: string;
    buyerPersona: string;
    network: "Facebook" | "Instagram" | "X";
  }) {
    const networkInstructions: Record<typeof network, string> = {
      Facebook: "hasta 300 palabras, tono profesional y claro.",
      Instagram: "hasta 2200 caracteres, con emojis y hashtags sugeridos.",
      X: "hasta 280 caracteres, conciso, con 1-2 hashtags.",
    };
  
    return `
  Crea un post para ${network} con base en el siguiente contenido:
  
  Contenido base:
  ${content}
  
  Enfoque (voz de autoridad): ${focus}
  Buyer Persona: ${buyerPersona}
  
  Instrucciones específicas:
  ${networkInstructions[network]}
  
  Solo regresa el texto del post, sin etiquetas ni formato JSON.
  `.trim();
  }
  