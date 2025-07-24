"use client";
import { use, useEffect, useState } from "react";
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
  const [tokensRestantes, setTokensRestantes] = useState<number>(0);
  
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
      ia_potente: false, 
      isadmin: false,
  });
  const router = useRouter();

  const handleGenerate = async (values: IContentInputValues) => {
    setFormValues(values)    
    setIsLoading(true);
        
    values.userid = user.id;
    values.isadmin = false;
    console.log("Valores enviados:", values);
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
        if (user?.id) {
          fetchTokens();
        }
      }, [posts]);


  
    const fetchTokens = async () => {
      console.log("Fetching tokens...");
      if (user) {
        try {
          const response = await fetch("/api/gettokesn", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid: parseInt(user.id )}),
          });
          const data = await response.json();
          console.log("Tokens restantes:", data.tokens_restantes);
          setTokensRestantes(data.tokens_restantes);
        } catch (error) {
          console.error("Error fetching tokens:", error);
        }
      }
    };

    
    useEffect(() => {      
      const storedUser = localStorage.getItem("user");
          
      if (storedUser) {        
        const parsedUser: UserProtected = JSON.parse(storedUser);
        setUser(parsedUser);                  
        
      }       
      
    }, []);


    useEffect(() => {
      if (user?.id) {
      fetchTokens();
      }
    }, [user]);



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
  
 <div className="min-h-screen flex items-center justify-center p-6 relative">
      


      <Card className="lg:min-w-[1000px] lg:max-w-4xl relative  md:min-w-[650px] md:max-w-2xl min-w-[350px]  ">
        <CardHeader className="relative flex flex-col items-center p-0 ">
              <Image className="w-[30%]" src="/logos/gacLogo.jpg" alt="" width={200} height={200} />
              <Image className="absolute top-2 left-5 w-[15%]" src="/logos/logo.webp" alt="" width={200} height={200} />
              {/* Contenedor de botones arriba a la derecha */}
              <div className="absolute top-3 right-4 flex flex-col gap-2 lg:gap-5 w-[30%] lg:w-auto">          
                <button
                  className="border border-gray-300 bg-white text-gray-700 
                    px-0 py-0 text-[10px]
                    md:px-4 md:py-2 md:text-sm 
                    rounded hover:bg-gray-100 transition"
                  onClick={handlelogout}
                >
                  Cerrar sesión
                </button>
                <button
                  className="border border-green-500 text-green-700 bg-white 
                    px-0 py-0 text-[10px]
                    md:px-4 md:py-2 md:text-sm 
                    rounded hover:bg-green-50 transition"
                  onClick={() => router.push("/manual")}
                >Manual de uso</button>
                
                
                {tokensRestantes !== null ? (
                  <span  className="text-[10px] md:text-sm text-gray-60 md:text-xl">Tokens restantes: {tokensRestantes}</span>
                ) : (
                  <span className="text-[10px] md:text-sm text-gray-600">Cargando...</span>
                )}
              
              
              {
                  tokensRestantes <= 0 && (
                    <button className="border border-red-500 text-red-700 bg-white
                      px-0 py-0 text-[10px]
                      md:px-4 md:py-2 md:text-sm
                      rounded hover:bg-red-50 transition"
                      onClick={() => router.push("/comprartokens")}
                    >
                      Comprar tokens
                    </button>                      
                        
                  )
                }

              </div>
            </CardHeader>

        <CardContent>
          
            
          {isLoading && (<SpinnerOverlay />)}
          {posts.length === 0 ? (
            <ContentInput onGenerate={(handleGenerate)} prevdata={formValues} tokensRestantes={tokensRestantes} />
          ) : (
            <ContentResult posts={posts} onBack={handleReset} />
          )}
        </CardContent>

      </Card>

    </div>
  
 </Protected>
   
  );
}
