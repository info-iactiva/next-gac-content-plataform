"use client";
import { useEffect, useState } from "react";
import { ContentInput } from "@/components/ContentInput";
import ContentResult from "@/components/ContentResult";
import { IPost } from "@/types/Post";
import { IContentInputValues } from "@/types/content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SpinnerOverlay } from "@/components/Spinner";
import Image from "next/image";
import { Protected } from "@/components/protected/protected";
import { useRouter } from "next/navigation";
import { UserProtected } from "@/types/user.protected";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserProtected | null>(null);

  
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


  
    useEffect(() => {      
      const storedUser = localStorage.getItem("user");
          
      if (storedUser) {        
        const parsedUser: UserProtected = JSON.parse(storedUser);
        setUser(parsedUser);                  
      }  
      
    }, []);
  



const handlelogout = (e:React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  localStorage.removeItem("token");  
  localStorage.removeItem("user");  
  setIsLoading(true);

  setTimeout(() => { 
    setIsLoading(false);     
    router.push('/login'); 
  }, 2000);  
}

return (

<Protected> 
  
 <div className="min-h-screen flex items-center justify-center p-6 ">

      <Card className="lg:min-w-[1000px] lg:max-w-4xl relative  md:min-w-[650px] md:max-w-2xl min-w-[350px]  ">
        <CardHeader className="relative flex flex-col items-center p-0">
              <Image className="w-[30%]" src="/logos/gacLogo.jpg" alt="" width={200} height={200} />
              <Image className="absolute top-2 left-5 w-[15%]" src="/logos/logo.webp" alt="" width={200} height={200} />

              {/* Contenedor de botones arriba a la derecha */}
              <div className="absolute top-3 right-4 flex flex-col md:flex-row gap-2">
                {user?.rol === "admin" && (
                  <button
                    className="border border-blue-500 text-blue-700 bg-white 
                      px-2 py-1 text-xs 
                      md:px-4 md:py-2 md:text-sm 
                      rounded hover:bg-blue-50 transition"
                    onClick={() => router.push("/admin")}
                  >
                    Administración
                  </button>
                )}

                <button
                  className="border border-gray-300 bg-white text-gray-700 
                    px-2 py-1 text-xs 
                    md:px-4 md:py-2 md:text-sm 
                    rounded hover:bg-gray-100 transition"
                  onClick={handlelogout}
                >
                  Cerrar sesión
                </button>
              </div>
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
  
 </Protected>
   
  );
}
