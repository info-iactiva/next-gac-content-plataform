import * as cheerio from "cheerio";

export async function extractTextFromURL(url: string): Promise<string> {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  // Extraer el texto de los párrafos visibles
  let content = "";
  $("p").each((_, el) => {
    const text = $(el).text();
    if (text.length > 50) {
      content += text + "\n\n";
    }
  });

  return content.trim();
}
