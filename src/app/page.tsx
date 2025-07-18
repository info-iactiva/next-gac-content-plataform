"use client";
import Image from "next/image";
import { use, useRef, useState,useEffect } from 'react';
import { useRouter } from "next/navigation";
import DemoSection from "./home/demosection";
import { Divide } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormContact from "./home/form.contact";
import CarouselB2F from "./home/carrusel/Carrusel";
import Link from "next/link";
import { PLANES } from "@/const/planes"; 
import { set } from "mongoose";
export default function PricingPage() {


  const planesRef = useRef<HTMLDivElement>(null);
  const [planes,setPlanes] = useState([]);

  useEffect(() => {

    const getplanes = async () => {
           try {
              const res = await fetch("/api/paypal/list-plans", {
                method: "GET",
                headers: { "Content-Type": "application/json" },                
              });              
              const data = await res.json();
              setPlanes(data.plans);
              console.log("Respuesta de la API:", data);              
            } catch (err) {
              console.log("Error generando contenido:", err);
            }
          }

        getplanes();
  },[])

   const scrollToPlanes = () => {
        planesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const router = useRouter();

      const handleLogin = () => {        
        router.push("/login");
    };

  
    const handleClick = (text:string,idplan:string) => {    
    // router.push(`/contratar?plan=${encodeURIComponent(text)}`);
    router.push(`/contratar?plan=${encodeURIComponent(text)}&idplan=${encodeURIComponent(idplan)}`);

    };

    const [showForm, setShowForm] = useState(false);

  function getPlanIdByName( nameToFind: string): string | null {
  const plan = planes.find(plan => plan.name === nameToFind);
  return plan ? plan.id : null;
}



  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
          
    <header className="bg-white text-gray-900 py-6 px-4 w-full shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/logos/logo.webp"
                alt="Logo izquierda"
                width={80}
                height={80}
                className="h-10 md:h-12 w-auto object-contain"
                priority
              />
            </div>

            {/* Texto */}
            <div className="text-center lg:text-left max-w-2xl px-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Conquista las redes sociales con el GAC de iActiva
              </h1>
              <p className="text-sm sm:text-base mt-1">
                Genera contenido potente y profesional con ayuda de nuestra IA
              </p>
            </div>

            {/* Botones */}
            <div className="flex justify-center lg:justify-end gap-2 sm:gap-3">
              <button
                onClick={() => handleLogin()}
                className="bg-black text-white px-3 py-1 text-xs sm:text-sm sm:px-4 sm:py-2 rounded hover:bg-gray-800 transition"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => scrollToPlanes()}
                className="bg-transparent border border-black text-black px-3 py-1 text-xs sm:text-sm sm:px-4 sm:py-2 rounded hover:bg-black hover:text-white transition"
              >
                Crear cuenta
              </button>
            </div>
          </div>
        </header>

      

        {/* Intro Section - Mejorada */}
        <section className="py-8 px-4 flex justify-center ">
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-10  max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start gap-6">
            
            {/* Imagen */}
            <div className="flex-shrink-0 w-48 md:w-56">
              <Image
                src="/logos/gacLogo.jpg"
                alt="GAC Logo"
                width={224}   // 56 * 4 (tailwind spacing)
                height={224}
                className="rounded-xl object-contain"
              />
            </div>
            {/* GET PLAN */}
            {/* <button onClick={ async () => {  
               try {
              const res = await fetch("/api/paypal/list-plans", {
                method: "GET",
                headers: { "Content-Type": "application/json" },                
              });              
              const data = await res.json();
              console.log("Respuesta de la API:", data);              
            } catch (err) {
              console.log("Error generando contenido:", err);
            }
            }}>
              get planes
            </button> */}
            {/* CREAR PLAN */}
              {/* <button onClick={ async () => {  
               try {
              const res = await fetch("/api/paypal/create-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },                
              });              
              const data = await res.json();
              console.log("Respuesta de la API:", data);              
            } catch (err) {
              console.log("Error generando contenido:", err);
            }
            }}>
              crear planes
            </button> */}
            

                  <DemoSection textfirstbutton="Solicita tu demo gratuita"
                refdirectemail="https://mail.google.com/mail/?view=cm&to=info@iactiva.ai&su=Solicitud%20de%20demo%20GAC%20iActiva&body=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20demo%20gratuita%20del%20Generador%20Autom%C3%A1tico%20de%20Contenido%20(GAC).%20Gracias."
                children={
                  
                    <p className="text-base md:text-lg text-gray-700 max-w-6xl">
                    Ya seas emprendedor, PYME o gran empresa, el{" "}
                    <strong className="text-black">
                      Generador Automático de Contenido (GAC)
                    </strong>{" "}
                    de iActiva te ayuda a comunicar con claridad, frecuencia y creatividad.
                    Elige el paquete que se ajuste a tus necesidades y empieza a publicar en minutos.
                  </p>
                }
                showsecondbutton={true}
                classNameButton="self-center !important "
                
                />
                         

          

   
          </div>
      </section>    



<CarouselB2F/>
<section>        

  <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 max-w-6xl mx-auto text-center flex flex-col items-center gap-4">
    
        <span className="text-2xl">
          <strong>Recursos de interés</strong>          
        </span>
                  
        <span>         
          ¡Accede <Link href="/blog" className="text-blue-600 hover:underline">aquí</Link> a información que aumentará tus conocimientos para incrementar las ventas de tu negocio!
        </span>
  </div>

    
</section>


<section ref={planesRef} id="planes" className="px-4 py-8 max-w-6xl mx-auto">
  <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 ">
    Comparación de planes
  </h2>

             
 
  {/* Versión mobile: cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* {[
      {
        nombre: "Básico",
        precio: "12 meses a $99 cada uno",
        detalles: [
          "Configuración completa de tu empresa o marca",
          "Segmentación básica del público objetivo",
          "Generación de publicaciones con tono, idioma y extensión definidos",
          "Hasta 45 publicaciones mensuales",
          "Nivel de IA: Básica",
          "Suscripción anual incluida: 1ª gratuita",
          // "Renovación despues del año: $300",
        ],
        extras: [],
      },
      {
        nombre: "Pro",
        precio: "12 meses a $349 cada uno",
        detalles: [
          "Configuración completa de tu empresa o marca",
          "Segmentación básica del público objetivo",
          "Generación de publicaciones con tono, idioma y extensión definidos",
          "Hasta 100 publicaciones mensuales",
          "Inspiración con textos o autores famosos",
          "Segmentación  ultra personalizada",
          "Nivel de IA: Básica y Potente",
          "Suscripción anual: $500 / año",
          "Pago anticipado: $3,270.40 (ahorra 20%)",          
          // "Renovación despues del año: $300",
        ],
        extras: [],
      },
      {
        nombre: "Premium (A medida)",
        precio: "Cotización",
        detalles: [
          "Configuración completa de tu empresa o marca",
          "Segmentación básica del público objetivo",
          "Generación de publicaciones con tono, idioma y extensión definidos",
          "Publicaciones: Según contrato",
          "Inspiración con textos o autores famosos",
          "Segmentación ultra personalizada",
          "Nivel de IA: Básica y Potente",
          "Suscripción anual: Cotización",
          "Pago anticipado: Cotización",
          "Renovación automática: 1 año gratis",
          "Integración con sistemas internos",
          "Workflows personalizados",
          "Soporte y capacitación avanzada",
        ],
        extras: [],
      },
    ] 
     */}
      {PLANES.map((plan) => (
      <div
        key={plan.nombre}
        className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
      >
        <div>
          <h3 className="text-xl font-bold text-green-700 mb-2">{plan.nombre}</h3>
          <p className="text-lg font-semibold text-gray-900 mb-4">{plan.precio}</p>
          <ul className="space-y-2 text-sm text-gray-700">
            {plan.detalles.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>{d}</span>
                
              </li>
            ))}
          </ul>
            
            
            {plan.nombre === "Premium (A medida)" && (           
              <div className="w-full  mt-4">
                <button
                  onClick={() => {
                    if (!showForm) {
                      setShowForm(true);
                    }else {
                      setShowForm(false);
                    }
                  }}
                  className={`inline-block mt-6 bg-green-600 hover:bg-green-700 text-white font-bold  px-3 py-1  rounded-lg transition`}
                >
                  Contactar                  
                </button>

                 {
                    showForm && (
                        <div>
                          <FormContact setShowForm={setShowForm}></FormContact>
                        </div>              
                    )
                  }


              </div>              
            )}


           

            {plan.nombre === "Básico" || plan.nombre === "Pro" ? (           
              <div key={plan.nombre} className="w-full  mt-5">
                 <button
                  onClick={() => handleClick(plan.nombre,getPlanIdByName(plan.namekey))}
                  className={`inline-block  bg-green-600 hover:bg-green-700 text-white font-bold  px-3 py-1 rounded-lg transition `}
                >
                  Contratar                  
                </button>
              </div>              
            ) : null          
          }
      


        {plan.nombre === "Pro" && (
          <>           
         <div className="mt-5">
  <h3 className="text-xl font-bold text-green-700 mb-2 flex items-center gap-2">
    Pro Con Descuento
    <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
      Más popular
    </span>
  </h3>
   
  <ul className="space-y-2 text-sm text-gray-700">
    <li className="flex items-start gap-2">   
      <span className="text-green-600 font-bold">✓</span>
      <span>Primer pago anual de <strong>$4,230.40</strong> </span>                                
    </li>
    <li className="flex items-start gap-2">   
      <span className="text-green-600 font-bold">✓</span>
      <span>Incluye 20% de descuento</span>                                
    </li>
    <li className="flex items-start gap-2">   
      <span className="text-green-600 font-bold">✓</span>
      <span>Pagos anuales después del primer año a: <strong>$3,830.40</strong> </span>                                
    </li>
  </ul>    
  <button
    onClick={() => handleClick("Pro Con Descuento", getPlanIdByName('Plan Pro Anual con Descuento'))}
    className="inline-block mt-3 bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-1 rounded-lg transition"
  >
    Contratar Pro Con Descuento
  </button>    
</div>

          </>
          
        )}


        </div>    
      </div>
    ))}
  </div>

   <h2 className=" col-span-5 lg:text-base mt-4 text-[10px] md:text-xs text-gray-500 text-center">
          Todos los planes son ajustables por inflación.
  </h2>
</section>




      {/* Dudas Section - Mejorada */}
      <section className="py-8 px-4 flex justify-center w-full ">

        <div className="bg-white rounded-2xl shadow-md p-6 md:p-10  max-w-4xl w-full  flex flex-col items-center  text-center">
  
        
        <DemoSection
         textfirstbutton=" Escríbenos ahora"
            refdirectemail="https://mail.google.com/mail/?view=cm&to=info@iactiva.ai&su=Consulta%20sobre%20GAC%20iActiva&body=Hola%2C%20tengo%20algunas%20dudas%20y%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20las%20opciones%20que%20ofrecen%20con%20el%20GAC.%20Gracias."
            children={
               <>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
                    ¿Tienes dudas o necesitas una solución a medida?
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Contáctanos y te ayudamos a construir el paquete perfecto para tu negocio.
                  </p>
               </>
            }
            classNameButton="self-center !important"
            classNameForm="lg:w-full !important"
            />

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 text-sm mt-auto">
        &copy; 2025 iActiva. Todos los derechos reservados.
      </footer>
    </div>
  );
}
