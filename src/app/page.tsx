"use client";
import Image from "next/image";
import { useRef } from 'react';
import { useRouter } from "next/navigation";
import DemoSection from "./home/demosection";
import { Divide } from "lucide-react";

export default function PricingPage() {


  const planesRef = useRef<HTMLDivElement>(null);

   const scrollToPlanes = () => {
        planesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const router = useRouter();

      const handleLogin = () => {        
        router.push("/login");
    };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      
{/*         
<header className="bg-gray-900 text-white py-4 px-4 w-full">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:items-center relative">    
    <div className="sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2 mb-4 sm:mb-0 w-full sm:w-auto flex justify-center sm:justify-start">
      <Image
        src="/logos/logo.webp"
        alt="Logo izquierda"
        width={80}
        height={80}
        className="h-8 md:h-12 w-auto object-contain"
        priority
      />
    </div>
    
    <div className="flex-1 flex justify-center px-4 text-center">
      <div className="max-w-lg">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-1 leading-tight">
          Conquista las redes sociales con el GAC de iActiva
        </h1>
        <p className="text-xs sm:text-sm md:text-base">
          Genera contenido potente y profesional con ayuda de nuestra IA
        </p>
      </div>
    </div>
  </div>
</header> */}
 {/* <header className="bg-gray-900 text-white py-6 px-4 w-full"> */}
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

            {/* <div className="text-center md:text-left flex flex-col justify-center">
              <p className="text-base md:text-lg text-gray-700  max-w-6xl ">
                Ya seas emprendedor, PYME o gran empresa, el{" "}
                <strong className="text-black">
                  Generador Automático de Contenido (GAC)
                </strong>{" "}
                de iActiva te ayuda a comunicar con claridad, frecuencia y
                creatividad. Elige el paquete que se ajuste a tus necesidades y
                empieza a publicar en minutos.
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&to=info@iactiva.ai&su=Solicitud%20de%20demo%20GAC%20iActiva&body=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20demo%20gratuita%20del%20Generador%20Autom%C3%A1tico%20de%20Contenido%20(GAC).%20Gracias."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition self-center md:self-start"
              >
                Solicita tu demo gratuita
              </a>
            </div> */}

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
            classNameButton="self-center !important lg:self-start"
            />
          </div>
        </section>
      {/* Pricing Table */}
     {/* <div className="w-full px-4 py-6 overflow-x-auto relative">
  <div className="text-xs text-gray-500 mb-2 block md:hidden">
    🔄 Desliza horizontalmente para ver todos los planes
  </div>
  <div className="min-w-[600px] md:min-w-full">
    <table className="w-full max-w-7xl mx-auto bg-white border border-gray-300 text-sm md:text-base rounded-xl overflow-hidden">
      <thead>
        <tr className="bg-green-600 text-white">
          <th className="p-3 border border-gray-300 text-left">Características</th>
          <th className="p-3 border border-gray-300">Básico</th>
          <th className="p-3 border border-gray-300">Pro</th>
          <th className="p-3 border border-gray-300">Premium</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {[
          ["Configuración completa de tu empresa o marca", "Sí", "Sí", "Sí"],
          ["Segmentación básica del público objetivo", "Sí", "Sí", "Sí"],
          ["Generación de publicaciones con tono, idioma y extensión definidos", "Sí", "Sí", "Sí"],
          ["Cantidad de publicaciones mensuales", "Hasta 45", "Ilimitadas*", "Según contrato"],
          ["Inspiración con textos o autores famosos", "No", "Sí", "Sí"],
          ["Segmentación ultrapersonalizada (Buyer Persona, LinkedIn)", "No", "Sí", "Sí"],
          ["Nivel de IA disponible: Básica", "Sí", "Sí", "Sí"],
          ["Nivel de IA disponible: Potente", "No", "Sí", "Sí"],
          ["Suscripción anual incluida", "1ª gratuita", "$500 / año", "Cotización"],
          ["Mensualidad", "$99 / mes", "$299 / mes", "Cotización"],
          ["Pago anual anticipado (Bundle)", "No disponible", "$3,270.40", "Cotización"],
          ["Renovación automática con beneficio", "Sí: 1 año gratis", "Sí: 1 año gratis", "Sí: 1 año gratis"],
          ["Integración con sistemas internos", "No", "No", "Sí"],
          ["Workflows personalizados", "No", "No", "Sí"],
          ["Soporte y capacitación avanzada", "No", "No", "Sí"],
        ].map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
            {row.map((cell, j) => (
              <td
                key={j}
                className={`p-3 border border-gray-300 ${j === 0 ? "text-left font-medium text-gray-700" : ""}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div> */}


<section ref={planesRef}  className="px-4 py-8 max-w-6xl mx-auto">
  <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
    Comparación de planes
  </h2>

  {/* Versión mobile: cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      {
        nombre: "Básico",
        precio: "$99 / mes",
        detalles: [
          "Configuración completa de tu empresa o marca",
          "Segmentación básica del público objetivo",
          "Generación de publicaciones con tono, idioma y extensión definidos",
          "Hasta 45 publicaciones mensuales",
          "Nivel de IA: Básica",
          "Suscripción anual incluida: 1ª gratuita",
          "Renovación automática: 1 año gratis",
        ],
        extras: [],
      },
      {
        nombre: "Pro",
        precio: "$299 / mes",
        detalles: [
          "Configuración completa de tu empresa o marca",
          "Segmentación básica del público objetivo",
          "Generación de publicaciones con tono, idioma y extensión definidos",
          "Publicaciones ilimitadas*",
          "Inspiración con textos o autores famosos",
          "Segmentación ultrapersonalizada",
          "Nivel de IA: Básica y Potente",
          "Suscripción anual: $500 / año",
          "Pago anticipado: $3,270.40 (ahorra 20%)",
          "Renovación automática: 1 año gratis",
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
          "Segmentación ultrapersonalizada",
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
    ].map((plan) => (
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
        </div>
        <div className="mt-6">
          {/* <a
            href="https://mail.google.com/mail/?view=cm&to=info@iactiva.ai&su=Interesado%20en%20plan%20GAC%20-%20"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Contactar por este plan
          </a> */}
        </div>
      </div>
    ))}
  </div>
</section>




      {/* Dudas Section - Mejorada */}
      <section className="py-8 px-4 flex justify-center w-full ">
        {/* <div className="bg-white rounded-2xl shadow-md p-6 md:p-10  max-w-4xl w-full  text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
            ¿Tienes dudas o necesitas una solución a medida?
          </h2>
          <p className="text-gray-700 mb-6">
            Contáctanos y te ayudamos a construir el paquete perfecto para tu negocio.
          </p>
        <a
        href="https://mail.google.com/mail/?view=cm&to=info@iactiva.ai&su=Consulta%20sobre%20GAC%20iActiva&body=Hola%2C%20tengo%20algunas%20dudas%20y%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20las%20opciones%20que%20ofrecen%20con%20el%20GAC.%20Gracias."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition"
      >
        Escríbenos ahora
      </a>


        </div> */}

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
            classNameForm="lg:w-[100%]"
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
