"use client";
import { useState } from "react";
import { ContentInput } from "@/components/ContentInput";
import ContentResult from "@/components/ContentResult";
import { IPost } from "@/types/Post";
import { IContentInputValues } from "@/types/content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SpinnerOverlay } from "@/components/Spinner";
import Image from "next/image";
import { Protected } from "@/components/protected/protected";
import { useRouter } from "next/navigation";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<IContentInputValues>({
      nombre_empresa: "",
      nombre_corto_empresa: "",
      web_site: "",
      desc_empresa: "",
      nombre_personaje: "",
      descripcion_personaje: "",
      ultra_personalizado: "No",
      segmento_audiencia: "A/B",
      descripcion_audiencia: "",
      nombre_empresa_target: "",
      web_site_empresa_target: "",
      descripcion_empresa_target: "",
      nombre_buyer_persona: "",
      descripcion_buyer_persona: "",
      url_linkedIn_buyer_persona: "",
      objetivo_publicacion: "Promocionar",      
      tono_publicacion: "Experto",
      texto_insp_ref: "",
      ia_estilo_autor: "",
      extension: "Corta",                             
      idioma: "Español (Latinoamérica)",
      contenido: "",
  });
  const router = useRouter();

  const handleGenerate = async (values: IContentInputValues) => {
    setFormValues(values)    
    setIsLoading(true);
    console.log("here")
    
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


const handlelogout = (e:React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  localStorage.removeItem("token");  
  setIsLoading(true);

  setTimeout(() => { 
    setIsLoading(false);     
    router.push('/login'); 
  }, 2000);  
}

return (

// <Protected> 
  
 <div className="min-h-screen flex items-center justify-center p-6 ">

      <Card className="lg:min-w-[1000px] lg:max-w-4xl relative  md:min-w-[650px] md:max-w-2xl min-w-[350px]  ">
        <CardHeader className="relative flex flex-col items-center  p-0">
          <Image className="w-[30%]" src="/logos/gacLogo.jpg" alt=""   width={200} height={200}/>
          <Image className="absolute top-2 left-5 w-[15%]" src="/logos/logo.webp" alt="" width={200} height={200}/>
          {/* <button className="absolute top-3 right-5 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition-colors" onClick={(e) => handlelogout(e)}> */}
            {/* Cerrar sesión             */}
          {/* </button> */}
        </CardHeader>
        <CardContent>
          

          {isLoading && (<SpinnerOverlay />)}
          {posts.length === 0 ? (
            <ContentInput onGenerate={(handleGenerate)} prevdata={formValues} />
          ) : (
            <ContentResult posts={posts} onBack={handleReset} />
          )}
        </CardContent>

      </Card>

    </div>
  
// </Protected>
   
  );
}
