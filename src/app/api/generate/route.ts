import { NextResponse } from "next/server";
import OpenAI from "openai";
import { extractTextFromURL } from "@/lib/extract";
import { buildPrompt } from "@/lib/prompts";
import { buildPromptDOS } from "@/lib/promptsdos";
import { buildPrompttres } from "@/lib/prompttres";
import { prisma } from '@/lib/prisma/prisma'
import { registerUserDailyRequest } from "../requestdaily/localsaver";
import { is } from "cheerio/dist/commonjs/api/traversing";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const socialTargets = ["Facebook", "Instagram", "X","Blog","LinkedIn","Email","WhatsApp"] as const;

const maxTokensByNetwork: Record<(typeof socialTargets)[number], number> = {
  Facebook:  4096,
  Instagram:  4096,
  X:  4096,
  Blog:  4096,
  LinkedIn:  4096,
  Email:  4096,
  // DirectMessage: 300,
  WhatsApp:  4096,
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
      contenido,
      ia_potente,
      userid,
      isadmin,
  } = await req.json();

      
  let articleContent = "";
  let title = "";

  const esadmin = isadmin || false;

  if (!esadmin) {
    console.log("no es admin");

    const user = await getUserById(parseInt(userid))

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    if (user.used_tokens > user.plan.tokens) {
      return NextResponse.json({ error: "Límite de tokens alcanzado" }, { status: 403 });
    }

    await updateuserToken(user.id,user.used_tokens);
        
    await registerUserDailyRequest(user.id);

  }
    let filteredTargets = [];

    if (ultra_personalizado === "No") {
        filteredTargets = ["Facebook", "Instagram", "X", "Blog","LinkedIn"];

    }else{
      filteredTargets = ["WhatsApp", "Email", "LinkedIn"];
    }


    let version_ia = 'gpt-3.5-turbo'
    if (ia_potente){
      version_ia ='gpt-4o'
    }
    
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }


async function generateWithRetries(network) {
  const MAX_RETRIES = 20;
  const RETRY_DELAY_MS = 1000;
  
  let attempt = 0;
  while (attempt < MAX_RETRIES) {
    try {
      attempt++;

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

      const completion = await withTimeout(
        openai.chat.completions.create({            
          model: version_ia,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: maxTokensByNetwork[network],
        }),
        10000
      );        

      const raw = completion.choices[0]?.message?.content || "";

      if (!raw.trim()) throw new Error("Respuesta vacía");

      const cuerpoIndex = raw.search(/CUERPO:/i);

      let title = "";
      let content = "";

      if (cuerpoIndex !== -1) {
        const tituloMatch = raw.match(/T[IÍ]TULO:\s*([\s\S]*?)\n\s*CUERPO:/i);
        title = tituloMatch?.[1]?.trim() || "";
        content = raw.slice(cuerpoIndex + 7).trim();
      } else {
        const tituloMatch = raw.match(/T[IÍ]TULO:\s*(.*)/i);
        title = tituloMatch?.[1]?.trim() || "";
        content = raw;
      }

      if (!title || !content) throw new Error("Contenido generado inválido");

      title = title.replace(/\[.*?\]/g, "").trim();
      content = content.replace(/\[.*?\]/g, "").trim();
      content = content.replace(/^Meta descripción:\s*/i, "");

      return {
        title,
        network,
        content,
      };

    } catch (error) {
      console.error(`❌ Intento ${attempt} fallido para ${network}:`, error);
      await delay(RETRY_DELAY_MS);
    }
  }

  // Si llega aquí tras 20 intentos, lanza error general
  // throw new Error(`❌ No se pudo generar contenido para ${network} tras ${MAX_RETRIES} intentos.`);
  console.error(`❌ No se pudo generar contenido para ${network} tras ${MAX_RETRIES} intentos.`);
  return null;
}


const posts = await Promise.all(
  filteredTargets.map((network) => generateWithRetries(network))
);

const successfulPosts = posts.filter(Boolean);


return NextResponse.json({ posts: successfulPosts });

}






function isValidURL(content: string) {
  try {
    new URL(content);
    return true;
  } catch {
    return false;
  }
}



const getUserById = async (userid: number) => {
  const user = await prisma.user.findUnique({ 
    where: { id: userid },  
    include: {        
        plan: true 
      },
  });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  return user;
}

const updateuserToken = async (userid: number,tokensnumber:number) => {
   await prisma.user.update({
        where: { id: userid },
        data: {                    
          used_tokens: tokensnumber+1          
        }
      });    
}