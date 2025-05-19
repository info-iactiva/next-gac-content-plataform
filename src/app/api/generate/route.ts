import { NextResponse } from "next/server";
import OpenAI from "openai";
import { extractTextFromURL } from "@/lib/extract";
import { buildPrompt } from "@/lib/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const socialTargets = ["Facebook", "Instagram", "X"] as const;

const maxTokensByNetwork: Record<(typeof socialTargets)[number], number> = {
  Facebook: 700,
  Instagram: 900,
  X: 200,
};

// Utilidad con timeout
async function withTimeout<T>(promise: Promise<T>, ms = 9000): Promise<T> {
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
    url,
    topic,
    authorityVoice,
    buyerPersona,
    businessName,
    characterName,
    characterDescription,
  } = await req.json();

  if (!url && !topic) {
    return NextResponse.json(
      { error: "Debes proporcionar una URL o un tema base." },
      { status: 400 }
    );
  }

  let articleContent = "";
  let title = "";

  try {
    if (url) {
      articleContent = await extractTextFromURL(url);
      title = new URL(url).hostname.replace("www.", "");
    } else {
      articleContent = topic;
      title = topic.slice(0, 40).replace(/[^a-zA-Z0-9 ]/g, "") || "post";
    }
  } catch (error) {
    console.error("Error extrayendo contenido:", error);
    return NextResponse.json(
      { error: "No se pudo extraer el contenido de la URL." },
      { status: 500 }
    );
  }

  const posts = await Promise.all(
    socialTargets.map(async (network) => {
      try {
        const prompt = buildPrompt({
          content: articleContent,
          authorityVoice,
          buyerPersona,
          businessName,
          website: url,
          network,
          characterName,
          characterDescription,
        });

        const completion = await withTimeout(
          openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: maxTokensByNetwork[network],
          }),
          9000
        );

        const raw =
          completion.choices[0]?.message?.content ||
          "⚠️ No se generó contenido.";

        const titleMatch = raw.match(/T[IÍ]TULO:\s*(.*)/i);
        const bodyMatch = raw.match(/CUERPO:\s*([\s\S]*)/i);

        return {
          title: titleMatch?.[1]?.trim() || title,
          network,
          content: bodyMatch?.[1]?.trim() || raw,
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

  // const posts = [
  //   {
  //     title: "Como hacer un buen café",
  //     network: "Facebook",
  //     content:
  //       "¿Quieres aprender a hacer un buen café en casa? ¡Te tenemos cubierto! En Bloomi Coffee te compartimos los secretos para preparar la taza perfecta. Desde la elección del grano hasta la temperatura del agua, cada detalle cuenta. Sigue nuestras recomendaciones y disfruta de un café delicioso en la comodidad de tu hogar. ☕️ #BloomiCoffee #CaféEnCasa #BaristaEnEntrenamiento",
  //   },
  //   {
  //     title: "Como hacer un buen café",
  //     network: "Instagram",
  //     content:
  //       "¡Hola amantes del café! ☕️ Hoy les traigo unos consejos para hacer un café delicioso en casa. 🌟\n1. Comienza con café de calidad. 🌿 Utiliza granos frescos y de buena procedencia.\n2. Muele los granos justo antes de preparar tu café. El aroma será incomparable. 💨\n3. Utiliza agua de calidad. El 98% de tu café es agua, así que asegúrate de que sea buena. 💧\n4. Controla el tiempo de preparación. No dejes que el café se sobreextraiga. ⏳\n5. Experimenta con diferentes métodos de preparación: french press, aeropress, chemex, etc. 🔄\n¡Ahora sí, a disfrutar de una taza perfecta de café! ☕️ #BloomiCoffee #CaféDeCalidad #BaristaEnCasa",
  //   },
  //   {
  //     title: "Como hacer un buen café",
  //     network: "X",
  //     content:
  //       "¡Descubre cómo hacer un buen café con Bloomi Coffee! ☕️ Sigue estos sencillos pasos para disfrutar de una deliciosa taza de café en casa. #BloomiCoffee #CaféPerfecto",
  //   },
  // ];
  console.log("Posts generados:", posts);

  return NextResponse.json({ posts });
}
