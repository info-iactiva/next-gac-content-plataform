"use client";
import { Button } from "@/components/ui/button";import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from 'react';



export default function Home() {
    const router = useRouter();
     const planesRef = useRef<HTMLDivElement>(null);


    const handleLogin = () => {        
        router.push("/login");
    };


    const scrollToPlanes = () => {
        planesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <div className="flex flex-col items-center lg:gap-15">            

        <div className="flex justify-between w-full p-2 lg:p-5">
            <Image className=" w-[30%] md:w-[20%] lg:w-[15%]" src="/logos/logo.webp" alt="" width={200} height={200}/>       
            <Button type="submit"className=" w-[100px] text-xs lg:w-[150px] lg:text-sm"  onClick={()=> handleLogin()}> INICIAR SESIÓN</Button>

        </div>

        <div className="w-full flex items-center justify-center flex-col min-h-[500px] md:min-h-[300px] lg:min-h-[630px]">
            <div className="flex w-[80%] flex-col lg:flex-row md:flex-row mt-10 lg:mt-0 lg:gap-10 items-center md:justify-between">
                <Image className="w-[80%] md:w-[30%]" src="/logos/gacLogo.jpg" alt="" width={200} height={200}/>

                <div className="lg:w-[70%] w-full flex flex-col">
                    <p className="text-lg text-sm lg:text-2xl text-center md:text-left">
                        GAC es una herramienta inteligente diseñada para transformar tus ideas en contenido de alto impacto en segundos. Gracias a la inteligencia artificial, GAC crea textos personalizados, coherentes y optimizados, adaptados a tu marca, audiencia y objetivos.
                    </p>

                    <div className="flex w-full pt-2 pr-5 justify-end md:justify-start">
                        <span onClick={scrollToPlanes} className="text-sxs underline cursor-pointer lg:text-base hover:text-blue-500" >
                            Ver planes y precios
                        </span>
                    </div>
                </div>
            </div>
        </div>

               

        <div className="w-[80%] flex flex-col gap-5 lg:w-[80%] lg:mt-10 lg:gap-10 pb-10 ">
            <h3 className="font-bold lg:text-3xl" >Características destacadas:</h3>

            <ul  className="list-disc pl-5 text-sm md:text-base md:grid md:grid-cols-2  gap-4 lg:text-xl lg:gap-6">
                <li>Generación de contenido ultra personalizable</li>
                <li>Adaptación a diferentes públicos y estilos de comunicación</li>
                <li>Fácil de usar, sin necesidad de conocimientos técnicos</li>
                <li>Ideal para empresas, agencias, creadores de contenido y emprendedores</li>                

            </ul>
        </div>
       


        <div ref={planesRef} className="mt-20 mb-10  md:m-10  md:w-[80%] ">
            <h2 className="text-2xl font-bold mb-5 md:mb-0">Planes</h2>

            {/* <div className="overflow-x-auto w-full">
                <table className="min-w-full table-auto border-collapse text-white text-sm lg:text-base">
                    <thead>
                    <tr className="bg-gray-800 text-center">
                        <th className="py-4 px-2 bg-black text-left"> </th>
                        <th className="py-4 px-4 bg-[#114C50]">ESTÁNDAR CON ANUNCIOS<br /><span className="text-xs block mt-1">MXN 149/mes (final)</span></th>
                        <th className="py-4 px-4 bg-[#114C50]">ESTÁNDAR<br /><span className="text-xs block mt-1">MXN 249/mes (final)</span></th>
                        <th className="py-4 px-4 bg-cyan-500 relative">
                        <div className="absolute -top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded-full">Más popular</div>
                        PREMIUM<br /><span className="text-xs block mt-1">MXN 319/mes (final)</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                    <tr className="border-t border-gray-700">
                        <td className="text-left py-3 px-2 bg-black">El deporte de ESPN</td>
                        <td className="py-3 px-4">ESPN y ESPN3</td>
                        <td className="py-3 px-4">ESPN y ESPN3</td>
                        <td className="py-3 px-4">Todos los canales y +500 eventos</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                        <td className="text-left py-3 px-2 bg-black">Estrenos de películas, series originales y clásicos</td>
                        <td className="py-3 px-4">✔️</td>
                        <td className="py-3 px-4">✔️</td>
                        <td className="py-3 px-4">✔️</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                        <td className="text-left py-3 px-2 bg-black">Películas y series sin interrupciones publicitarias</td>
                        <td className="py-3 px-4">—</td>
                        <td className="py-3 px-4">✔️</td>
                        <td className="py-3 px-4">✔️</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                        <td className="text-left py-3 px-2 bg-black">Calidad de video hasta 4K UHD/HDR + Dolby Atmos</td>
                        <td className="py-3 px-4">—</td>
                        <td className="py-3 px-4">—</td>
                        <td className="py-3 px-4">✔️</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                        <td className="text-left py-3 px-2 bg-black">Dispositivos simultáneos</td>
                        <td className="py-3 px-4">2</td>
                        <td className="py-3 px-4">2</td>
                        <td className="py-3 px-4">4</td>
                    </tr>
                    </tbody>
                </table>
            </div> */}


            <div className="w-full text-white text-sm lg:text-base">
                {/* Mobile cards */}
                <div className="flex flex-col gap-6 md:hidden">
                    {/* Plan 1 */}
                    <div className="bg-gray-800 p-4 rounded-md">
                    <h3 className="text-lg font-bold text-center mb-2">Sencillo</h3>
                    <p className="text-center mb-4 text-gray-300">MXN 149/mes (final)</p>
                    <ul className="space-y-2 text-sm">
                        <li>✔️ 15 Tokens</li>
                        <li>✔️ Generacion de contenido en base a buyer persona</li>                                                
                    </ul>
                    </div>                  

                    {/* Plan 3 */}
                    <div className="bg-cyan-600 p-4 rounded-md relative">
                    <div className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded-full">Más popular</div>
                    <h3 className="text-lg font-bold text-center mb-2">PREMIUM</h3>
                    <p className="text-center mb-4 text-gray-100">MXN 319/mes (final)</p>
                    <ul className="space-y-2 text-sm">
                        <li>✔️ Ultra personalizado</li>
                        <li>✔️ Con mas de 30 tokens</li>
                        <li>✔️ Uso mensual</li>                        
                    </ul>
                    </div>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto mt-8">
                    <table className="min-w-full table-auto border-collapse text-white text-sm">
                    <thead>
                        <tr className="bg-gray-800 text-center">
                        <th className="py-4 px-2 bg-black text-left"> </th>
                        <th className="py-4 px-4 bg-[#114C50]">Sencillo<br /><span className="text-xs block mt-1">MXN 149/mes</span></th>                        
                        <th className="py-4 px-4 bg-cyan-500 relative">
                            <div className="absolute -top-1.5 right-1 bg-white text-black text-xs px-2 py-1 rounded-full">Más popular</div>
                            PREMIUM<br /><span className="text-xs block mt-1">MXN 319/mes</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody className="text-center">                        
                        <tr className="border-t border-gray-700">
                            <td className="text-left py-3 px-2 bg-black">Tokens limitados</td>
                            <td className="py-3 px-4">✔️</td>
                            <td className="py-3 px-4">✔️</td>                        
                        </tr>
                        <tr className="border-t border-gray-700">
                            <td className="text-left py-3 px-2 bg-black">Ultra personalizado</td>
                            <td className="py-3 px-4">✔️</td>
                            <td className="py-3 px-4">✔️</td>                        
                        </tr>  
                        <tr className="border-t border-gray-700">
                            <td className="text-left py-3 px-2 bg-black">Tokens ilimitados</td>
                            <td className="py-3 px-4">—</td>
                            <td className="py-3 px-4">✔️</td>                        
                        </tr>     
                        <tr className="border-t border-gray-700">
                            <td className="text-left py-3 px-2 bg-black">Acceso a todos los tipos datos</td>
                            <td className="py-3 px-4">—</td>
                            <td className="py-3 px-4">✔️</td>                        
                        </tr>   
               
                    </tbody>
                    </table>
                </div>
            </div>




        </div>


                                         
    </div>
  );
}


 
        {/* <button className="absolute top-3 right-5 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition-colors" onClick={(e) => alert("e")}>
            INICIAR SESIÓN
        </button> */}

        
          
      {/* <p className="text-lg mb-4">Crea contenido personalizado para tu empresa y audiencia.</p>    */}
