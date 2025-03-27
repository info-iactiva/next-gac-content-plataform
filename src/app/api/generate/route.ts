import { NextResponse } from "next/server";
import OpenAI from "openai";
import { extractTextFromURL } from "@/lib/extract";
import { buildPrompt } from "@/lib/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const socialTargets = ["Facebook", "Instagram", "X"] as const;
const maxTokensByNetwork: Record<string, number> = {
  Facebook: 700, // 2800 caracteres aprox
  Instagram: 900, // 3600 caracteres aprox
  X: 200, // 800 caracteres (bastante seguro)
};

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

  const results = [];

  for (const network of socialTargets) {
    const prompt = buildPrompt({
      content: articleContent,
      focus,
      buyerPersona,
      network,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: maxTokensByNetwork[network],
    
    });

    results.push({
      title,
      network,
      content: completion.choices[0].message.content,
    });
  }

  return NextResponse.json({ posts: results });
}
