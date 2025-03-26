"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { ContentInputValues, GenerateResponse } from "@/types/content";
import { FormFields } from "./FormFields";
import { GeneratedContentCard } from "./GeneratedContentCard";
import { PostCard } from "./PostCard";

export default function ContentInput() {
  const [values, setValues] = useState<ContentInputValues>({
    url: "",
    topic: "",
    focus: "",
    buyerPersona: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<Post[]>([]);

  type Post = {
    title: string;
    network: string;
    content: string;
  };

  type TResponse = {
    posts: Post[];
  }

  const handleChange = (key: keyof ContentInputValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    // setGeneratedContent("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: TResponse = await res.json();
      console.log(data)
      setGeneratedPosts(data.posts);

    } catch (error) {
      console.error("Error generando contenido:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPosts.map(post => post.content).join("\n\n"));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-muted p-6 space-y-8">
      <Card className="w-full max-w-4xl p-6 shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2">
          <h1 className="text-3xl font-semibold">Generador de Contenido</h1>
          <h4 className="text-sm text-muted-foreground text-center max-w-lg">
            Proporciona una liga de noticia o un tema para generar contenido
          </h4>
        </CardHeader>
        <CardBody className="space-y-6">
          <FormFields
            values={values}
            isLoading={isLoading}
            onChange={handleChange}
          />

          <Button
            onPress={handleGenerate}
            disabled={isLoading || (!values.url && !values.topic)}
            className="w-full text-base py-3"
          >
            {isLoading ? "Generando..." : "Generar Contenido"}
          </Button>
        </CardBody>
      </Card>

      {generatedPosts.length > 0 && (
        <section className="w-full max-w-6xl mt-10">
          <h2 className="text-xl font-semibold mb-4">Resultados Generados</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {generatedPosts.map((post, i) => (
              <PostCard
                key={`${post.network}-${i}`}
                title={post.title}
                network={post.network}
                content={post.content}
                onCopy={() => navigator.clipboard.writeText(post.content)}
              />
            ))}
          </div>
        </section>
      )}

    </main>
  );
}
