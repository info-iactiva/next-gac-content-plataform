"use client";
import { useState } from "react";
import { ContentInput } from "@/components/ContentInput";
import ContentResult from "@/components/ContentResult";
import { IPost } from "@/types/Post";
import { IContentInputValues } from "@/types/content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SpinnerOverlay } from "@/components/Spinner";
import { motion } from 'framer-motion';

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (values: IContentInputValues) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      console.log("Sending: ", values);
      const data = await res.json();
      console.log("Respuesta de la API:", data);
      setPosts(data.posts);
    } catch (err) {
      console.error("Error generando contenido:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPosts([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">

      <Card className="min-w-[400px] max-w-4xl relative ">
        <CardHeader className="relative flex flex-col items-center  p-0">
          <img className="w-[30%]" src="/logos/gacLogo.jpg" alt="" />
          <img className="absolute top-2 left-5 w-[15%]" src="/logos/logo.webp" alt="" />
        </CardHeader>
        <CardContent>
          {isLoading && (<SpinnerOverlay />)}
          {posts.length === 0 ? (
            <ContentInput onGenerate={handleGenerate} isLoading={isLoading} />
          ) : (
            <ContentResult posts={posts} onBack={handleReset} />
          )}
        </CardContent>

      </Card>

    </div>
  );
}
