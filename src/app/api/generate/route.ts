import { NextResponse } from "next/server";
import OpenAI from "openai";
import { extractTextFromURL } from "@/lib/extract";
import { buildPrompt } from "@/lib/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const socialTargets = ["Facebook", "Instagram", "X"] as const;
const maxTokensByNetwork: Record<string, number> = {
  Facebook: 700,
  Instagram: 900,
  X: 200,
};

// Función con timeout manual
async function withTimeout<T>(promise: Promise<T>, ms = 9000): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("Timeout exceeded"));
    }, ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
}

export async function POST(req: Request) {
  const { url, topic, focus, buyerPersona } = await req.json();

  let articleContent = "";
  let title = "";

  if (url) {
    try {
      articleContent = await extractTextFromURL(url);
      title = new URL(url).hostname.replace("www.", "");
    } catch (error) {
      console.error("Error extrayendo texto de la URL:", error);
    }
  } else {
    articleContent = topic;
    title = topic.slice(0, 40).replace(/[^a-zA-Z0-9 ]/g, "") || "post";
  }

  const posts = await Promise.all(
    socialTargets.map(async (network) => {
      try {
        const prompt = buildPrompt({
          content: articleContent,
          focus,
          buyerPersona,
          network,
        });

        const completion = await withTimeout(
          openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: maxTokensByNetwork[network],
          }),
          9000 // 9 segundos de timeout individual
        );

        return {
          title,
          network,
          content: completion.choices[0]?.message?.content || "No content generated.",
        };
      } catch (error) {
        console.error(`Error generando para ${network}:`, error);
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
