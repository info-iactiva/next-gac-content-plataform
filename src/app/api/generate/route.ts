import { NextResponse } from "next/server";
import OpenAI from "openai";
import { extractTextFromURL } from "@/lib/extract";
import { buildPrompt } from "@/lib/prompts";
import { buildPromptDOS } from "@/lib/promptsdos";
import { buildPrompttres } from "@/lib/prompttres";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const socialTargets = ["Facebook", "Instagram", "X","Blog","LinkedIn","Email","WhatsApp"] as const;

const maxTokensByNetwork: Record<(typeof socialTargets)[number], number> = {
  Facebook: 700,
  Instagram: 750,
  X: 350,
  Blog: 1500,
  LinkedIn: 1000,
  Email: 400,
  // DirectMessage: 300,
  WhatsApp: 400,
};

// Utilidad con timeout
async function withTimeout<T>(promise: Promise<T>, ms = 10000): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Timeout exceeded")), ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() =>
    clearTimeout(timeoutId)
  );
}

export async function POST(req: Request) {
  const {
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
      contenido
  } = await req.json();

  

  let articleContent = "";
  let title = "";



    let  filteredTargets = []

    if (ultra_personalizado === "No") {
        filteredTargets = ["Facebook", "Instagram", "X", "Blog","LinkedIn"];

    }else{
      filteredTargets = ["WhatsApp", "Email", "LinkedIn"];
    }

    // console.log("Filtered targets:", filteredTargets);
    const posts = await Promise.all(
    filteredTargets.map(async (network: "Facebook" | "Instagram" | "X" | "Blog"  | "LinkedIn"| "Email"| "DirectMessage"| "WhatsApp") => {
      try {
        const prompt = buildPrompttres({       
        content:contenido,
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
        idioma,
        });
        // gpt-4.o modelo potente IA
        // no: gpt-3.5-turbo  normal IA
        const completion = await withTimeout(
          openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: maxTokensByNetwork[network],
          }),
          10000
        );        


        const raw = completion.choices[0]?.message?.content || "⚠️ No se generó contenido.";
        // console.log("Contenido crudo:", raw);
        // Busca el índice de "CUERPO:"
        const cuerpoIndex = raw.search(/CUERPO:/i);

        let title = "";
        let content = "";

        if (cuerpoIndex !== -1) {
          // Extrae el título entre "TÍTULO:" y "CUERPO:"
          const tituloMatch = raw.match(/T[IÍ]TULO:\s*([\s\S]*?)\n\s*CUERPO:/i);
          title = tituloMatch?.[1]?.trim() || "";

          // Extrae el cuerpo después de "CUERPO:"
          content = raw.slice(cuerpoIndex + 7).trim();
        } else {
          // Si no encuentra "CUERPO:", intenta extraer solo el título
          const tituloMatch = raw.match(/T[IÍ]TULO:\s*(.*)/i);
          title = tituloMatch?.[1]?.trim() || "";
          content = raw;
        }

        // Si aún no hay título, usa el valor por defecto
        if (!title) title = "Sin título";
        if (!content) content = raw;
        
        title = title.replace(/\[.*?\]/g, "").trim();
        content = content.replace(/\[.*?\]/g, "").trim();
        content = content.replace(/^Meta descripción:\s*/i, "");

        return {
          title,
          network,
          content,
        };
      } catch (error) {
        console.error(`❌ Error generando para ${network}:`, error);
        return {
          title,
          network,
          content: `❌ Error generando contenido para ${network}.`,
          error: true,
        };
      }
    })
  );




  return NextResponse.json({ posts });
}



function isValidURL(content: string) {
  try {
    new URL(content);
    return true;
  } catch {
    return false;
  }
}

