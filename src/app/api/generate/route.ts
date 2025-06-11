import { NextResponse } from "next/server";
import OpenAI from "openai";
import { extractTextFromURL } from "@/lib/extract";
import { buildPrompt } from "@/lib/prompts";
import { buildPromptDOS } from "@/lib/promptsdos";
import { buildPrompttres } from "@/lib/prompttres";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const socialTargets = ["Facebook", "Instagram", "X","Blog","LinkedIn","Email","DirectMessage","WhatsApp"] as const;

const maxTokensByNetwork: Record<(typeof socialTargets)[number], number> = {
  Facebook: 700,
  Instagram: 750,
  X: 300,
  Blog: 1500,
  LinkedIn: 300,
  Email: 300,
  DirectMessage: 300,
  WhatsApp: 300,
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

  // if (!url && !topic) {
  //   return NextResponse.json(
  //     { error: "Debes proporcionar una URL o un tema base." },
  //     { status: 400 }
  //   );
  // }

  let articleContent = "";
  let title = "";

  // try {
  //   if (url) {
  //     articleContent = await extractTextFromURL(url);
  //     title = new URL(url).hostname.replace("www.", "");
  //   } else {
  //     articleContent = topic;
  //     title = topic.slice(0, 40).replace(/[^a-zA-Z0-9 ]/g, "") || "post";
  //   }
  // } catch (error) {
  //   console.error("Error extrayendo contenido:", error);
  //   return NextResponse.json(
  //     { error: "No se pudo extraer el contenido de la URL." },
  //     { status: 500 }
  //   );
  // }

  // const posts = await Promise.all(
  //   socialTargets.map(async (network: "Facebook" | "Instagram" | "X" | "Blog"  | "LinkedIn"| "Email"| "DirectMessage"| "WhatsApp") => {
  //     try {
  //       const prompt = buildPrompt({          
  //         network,  
  //         content: articleContent,
  //         authorityVoice,
  //         buyerPersona,
  //         businessName,
  //         website: web_site,          
  //         characterName,
  //         characterDescription,
  //         businessDescription: desc_empresa,
  //         businessShortName: nombre_corto_empresa,        
  //         buyerPersonaURL: url_linkedIn,
  //         objective: objetivo_publicacion,
  //         exampleText: texto_insp_ref,       
  //         intention:  objetivo_publicacion,
  //         idioma
  //       });

  //       const completion = await withTimeout(
  //         openai.chat.completions.create({
  //           model: "gpt-3.5-turbo",
  //           messages: [{ role: "user", content: prompt }],
  //           temperature: 0.7,
  //           max_tokens: maxTokensByNetwork[network],
  //         }),
  //         10000
  //       );        

  //       // const raw =
  //       //   completion.choices[0]?.message?.content ||
  //       //   "⚠️ No se generó contenido.";

  //       // const titleMatch = raw.match(/T[IÍ]TULO:\s*(.*)/i);
  //       // const bodyMatch = raw.match(/CUERPO:\s*([\s\S]*)/i);

  //       // return {
  //       //   title: titleMatch?.[1]?.trim() || title,
  //       //   network,
  //       //   content: bodyMatch?.[1]?.trim() || raw,
  //       // };


  //       const raw = completion.choices[0]?.message?.content || "⚠️ No se generó contenido.";
  //       // console.log("Contenido crudo:", raw);
  //       // Busca el índice de "CUERPO:"
  //       const cuerpoIndex = raw.search(/CUERPO:/i);

  //       let title = "";
  //       let content = "";

  //       if (cuerpoIndex !== -1) {
  //         // Extrae el título entre "TÍTULO:" y "CUERPO:"
  //         const tituloMatch = raw.match(/T[IÍ]TULO:\s*([\s\S]*?)\n\s*CUERPO:/i);
  //         title = tituloMatch?.[1]?.trim() || "";

  //         // Extrae el cuerpo después de "CUERPO:"
  //         content = raw.slice(cuerpoIndex + 7).trim();
  //       } else {
  //         // Si no encuentra "CUERPO:", intenta extraer solo el título
  //         const tituloMatch = raw.match(/T[IÍ]TULO:\s*(.*)/i);
  //         title = tituloMatch?.[1]?.trim() || "";
  //         content = raw;
  //       }

  //       // Si aún no hay título, usa el valor por defecto
  //       if (!title) title = "Sin título";
  //       if (!content) content = raw;
        
  //       title = title.replace(/\[.*?\]/g, "").trim();
  //       content = content.replace(/\[.*?\]/g, "").trim();

  //       return {
  //         title,
  //         network,
  //         content,
  //       };
  //     } catch (error) {
  //       console.error(`❌ Error generando para ${network}:`, error);
  //       return {
  //         title,
  //         network,
  //         content: `❌ Error generando contenido para ${network}.`,
  //         error: true,
  //       };
  //     }
  //   })
  // );


  let filteredTargets: string[] = Array.from(socialTargets);
  console.log(ultra_personalizado)

    if (ultra_personalizado == "No") {
      filteredTargets = filteredTargets.filter(
        t => !["LinkedIn", "DirectMessage", "WhatsApp"].includes(t)
      );
    } else {
      filteredTargets = filteredTargets.filter(
        t => !["Facebook", "Instagram", "X", "Blog", "Email"].includes(t)        
      );
    }

    console.log("Filtered targets:", filteredTargets);
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

        const completion = await withTimeout(
          openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: maxTokensByNetwork[network],
          }),
          10000
        );        

        // const raw =
        //   completion.choices[0]?.message?.content ||
        //   "⚠️ No se generó contenido.";

        // const titleMatch = raw.match(/T[IÍ]TULO:\s*(.*)/i);
        // const bodyMatch = raw.match(/CUERPO:\s*([\s\S]*)/i);

        // return {
        //   title: titleMatch?.[1]?.trim() || title,
        //   network,
        //   content: bodyMatch?.[1]?.trim() || raw,
        // };


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


// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import { extractTextFromURL } from "@/lib/extract";
// import { buildPrompt } from "@/lib/prompts";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const socialTargets = ["Facebook", "Instagram", "X"] as const;

// const maxTokensByNetwork: Record<(typeof socialTargets)[number], number> = {
//   Facebook: 700,
//   Instagram: 900,
//   X: 200,
// };

// // Utilidad con timeout
// async function withTimeout<T>(promise: Promise<T>, ms = 9000): Promise<T> {
//   let timeoutId: NodeJS.Timeout;
//   const timeoutPromise = new Promise<never>((_, reject) => {
//     timeoutId = setTimeout(() => reject(new Error("Timeout exceeded")), ms);
//   });

//   return Promise.race([promise, timeoutPromise]).finally(() =>
//     clearTimeout(timeoutId)
//   );
// }

// export async function POST(req: Request) {
//   const {
//     url,
//     topic,
//     authorityVoice,
//     buyerPersona,
//     businessName,
//     characterName,
//     characterDescription,
//     nombre_empresa,
//     nombre_corto_empresa,
//     objetivo_publicacion,
//     web_site,
//     url_linkedIn,
//     desc_empresa,
//     texto_insp_ref,
//     idioma,
//   } = await req.json();

//   if (!url && !topic) {
//     return NextResponse.json(
//       { error: "Debes proporcionar una URL o un tema base." },
//       { status: 400 }
//     );
//   }

//   let articleContent = "";
//   let title = "";

//   try {
//     if (url) {
//       articleContent = await extractTextFromURL(url);
//       title = new URL(url).hostname.replace("www.", "");
//     } else {
//       articleContent = topic;
//       title = topic.slice(0, 40).replace(/[^a-zA-Z0-9 ]/g, "") || "post";
//     }
//   } catch (error) {
//     console.error("Error extrayendo contenido:", error);
//     return NextResponse.json(
//       { error: "No se pudo extraer el contenido de la URL." },
//       { status: 500 }
//     );
//   }

//    const prompt = buildPrompt({
//           content: articleContent,
//           authorityVoice,
//           buyerPersona,
//           businessName,
//           website: url,          
//           characterName,
//           characterDescription,
//           businessDescription: desc_empresa,
//           businessShortName: nombre_empresa,
//           buyerPersonaURL: url_linkedIn,
//           objective: objetivo_publicacion,
//           exampleText: texto_insp_ref,       
//            intention:  objetivo_publicacion
//     });

//     var completion
//     try {       
        
//         const completion = await withTimeout(
//           openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: "user", content: prompt }],
//             temperature: 0.7,
//             max_tokens:15000,
//           }),
//           9000
//         );  
        
//         console.log(completion)          
//       } catch (error) {
//         console.error(`❌ Error generando`, error);
//         return {
//           title,          
//           content: `❌ Error generando contenido`,
//           error: true,
//         };
//       }

  

//   return NextResponse.json({ completion });

//   // const posts = [
//   //   {
//   //     title: "Como hacer un buen café",
//   //     network: "Facebook",
//   //     content:
//   //       "¿Quieres aprender a hacer un buen café en casa? ¡Te tenemos cubierto! En Bloomi Coffee te compartimos los secretos para preparar la taza perfecta. Desde la elección del grano hasta la temperatura del agua, cada detalle cuenta. Sigue nuestras recomendaciones y disfruta de un café delicioso en la comodidad de tu hogar. ☕️ #BloomiCoffee #CaféEnCasa #BaristaEnEntrenamiento",
//   //   },
//   //   {
//   //     title: "Como hacer un buen café",
//   //     network: "Instagram",
//   //     content:
//   //       "¡Hola amantes del café! ☕️ Hoy les traigo unos consejos para hacer un café delicioso en casa. 🌟\n1. Comienza con café de calidad. 🌿 Utiliza granos frescos y de buena procedencia.\n2. Muele los granos justo antes de preparar tu café. El aroma será incomparable. 💨\n3. Utiliza agua de calidad. El 98% de tu café es agua, así que asegúrate de que sea buena. 💧\n4. Controla el tiempo de preparación. No dejes que el café se sobreextraiga. ⏳\n5. Experimenta con diferentes métodos de preparación: french press, aeropress, chemex, etc. 🔄\n¡Ahora sí, a disfrutar de una taza perfecta de café! ☕️ #BloomiCoffee #CaféDeCalidad #BaristaEnCasa",
//   //   },
//   //   {
//   //     title: "Como hacer un buen café",
//   //     network: "X",
//   //     content:
//   //       "¡Descubre cómo hacer un buen café con Bloomi Coffee! ☕️ Sigue estos sencillos pasos para disfrutar de una deliciosa taza de café en casa. #BloomiCoffee #CaféPerfecto",
//   //   },
//   // ];

// }
