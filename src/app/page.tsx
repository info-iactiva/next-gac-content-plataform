"use client" 
import ContentInput from "@/components/ContentInput";
import { HeroUIProvider } from "@heroui/react";
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <HeroUIProvider>
        <ContentInput />
      </HeroUIProvider>
    </div>
  );
}
