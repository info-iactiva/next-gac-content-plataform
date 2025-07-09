'use client';
import { useRouter } from "next/navigation";

import React from "react";

export default function GACPresentation() {
  const router = useRouter();

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-8 text-gray-800 relative">
      <header className="text-center space-y-2">
        <h1 className="text-3xl md:text-5xl font-bold">Generador Automático de Contenido</h1>
        <p className="text-xl font-semibold">(GAC)</p>
        <img src={'/assets/white/image1.jpeg'} alt="" className="md:w-[70%] m-auto" />

        <p className="italic">Un producto de iActiva</p>
        <p className="text-sm text-gray-600">Primavera - Verano 2025</p>
        <a href={'/assets/white/WhitePaper_GAC_iActiva_COMPLETO_VF.pdf'} download>
        <button className="mt-3  bg-green-600 hover:bg-green-700 text-white font-bold  px-3 py-1 rounded-lg transition ">Descargar PDF</button>
        </a>
        
      </header>


        <button
        onClick={() => {
            router.push('/#planes');
        }}
        className="fixed top-20 right-4 z-50 md:top-32 md:right-10 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg shadow-lg transition"
      >
        Comprar
      </button>



      <section>
        <h2 className="text-2xl font-bold">1. Introducción: El desafío de generar contenido a escala</h2>
        <p>
          En el panorama actual del marketing digital, crear contenido relevante, personalizado y constante es una exigencia ineludible.
          Agencias, departamentos de comunicación y pequeñas empresas se enfrentan a una sobrecarga de tareas creativas que consumen
          tiempo y recursos, sin garantía de impacto. Publicar de forma efectiva requiere mucho más que redactar: exige adaptar el
          mensaje a cada red social, considerar el perfil del lector ideal y mantener un estilo que conecte con la audiencia… todos los días.
        </p>
        <p>
          Ante esta necesidad creciente, en iActiva desarrollamos el GAC: una plataforma que integra IA generativa con una lógica modular
          basada en tres componentes —Emisor, Target y Mensaje—, permitiendo generar contenido adaptable al contexto, al canal y al
          público, desde campañas amplias hasta mensajes ultrapersonalizados.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold">2. El problema: tiempo limitado, creatividad agotada</h2>
        <div className="flex flex-col gap-4 mt-5 md:flex-row items-center">
          <div className="flex flex-col items-start space-y-4 md:w-[50%] lg:w-[60%]">
           <h3>¿Te identificas con alguno de estos puntos?:</h3>
            <ul className="list-disc ml-6">
              <li>Tu equipo no da abasto para generar contenido diario en múltiples plataformas.</li>
              <li>El engagement en redes sociales es bajo a pesar del esfuerzo invertido.</li>
              <li>Tienes ideas y noticias valiosas, pero se quedan en el tintero por falta de ejecución.</li>
            </ul>
            <p>
              El problema no es solo falta de tiempo: muchas herramientas existentes no permiten estructurar mensajes por niveles de audiencia o
              controlar el tono de voz por canal. Por eso, los esfuerzos de contenido suelen ser ineficientes, impersonales o poco estratégicos.
            </p>
          </div>
          <img src={'assets/white/image2.jpeg'} alt="" className="w-[70%] m-auto md:w-[50%] lg:w-[40%]" />
        </div>
       
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">3. ¿Cómo funciona?</h2>
        <p>
          El Generador Automático de Contenido (GAC) de iActiva es una plataforma basada en inteligencia artificial generativa, diseñada para
          producir contenido textual de forma rápida, estructurada y estratégica. A través de un sistema modular que contempla tres dimensiones
          clave —Emisor, Target y Mensaje—, el GAC permite generar publicaciones adaptadas al tono de la marca, al perfil del público y al objetivo
          comunicacional deseado.
        </p>
        <br />
        <p>El flujo de operación está orientado a maximizar eficiencia sin perder autenticidad ni control.</p>
        <img src="/assets/white/image3.jpeg"  className="w-[70%] mt-4 mb-4 m-auto md:w-[60%]" alt="" />
        <h3 className="lg:text-3xl text-xl font-semibold mt-5 mb-5">Componentes:</h3>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Columna izquierda: puntos 1, 2, 3 */}
          <div className="flex-1">
            <ol className="list-decimal ml-6 space-y-4">
              <li>
                <strong>Selección y configuración del Emisor:</strong>
                <ul className="list-disc ml-6">
                  <li>Se define el punto de vista desde el cual se genera el contenido, alineado a la identidad de la marca y su narrativa corporativa</li>
                  <li>Empresa o producto: nombre institucional o comercial</li>
                  <li>Nombre corto o de marca: forma simplificada que aparece en los textos.</li>
                  <li>Sitio web o página de aterrizaje: para dirigir tráfico o contacto.</li>
                  <li>Descripción de la empresa: propósito, productos y diferenciadores.</li>
                  <li>Nombre del personaje vocero (opcional): portavoz real o ficticio.</li>
                  <li>Perfil del vocero: tono, nivel de conocimiento, carácter narrativo.</li>
                </ul>
              </li>
              <li>
                <strong>. Configuración del Target (audiencia objetivo)</strong>
                <p className="mt-2">El GAC permite dos niveles:</p>
                <p className="font-semibold">No ultrapersonalizado:</p>
                <ul className="list-disc ml-6">
                  <li> Segmento socioeconómico: AAA, AA, B+, C, D, etc.</li>
                  <li>Descripción general del público: tipo de consumidor, nivel digital, estilo de vida.</li>
                </ul>
                <p className="font-semibold mt-2">Ultrapersonalizado:</p>
                <ul className="list-disc ml-6">
                  <li>Empresa o interlocutor definido</li>
                  <li>Descripción detallada del perfil receptor.</li>                  
                  <li> Nivel de conocimiento del producto o servicio.</li>
                </ul>
              </li>
              <li>
                <strong>Definición del Mensaje:</strong>
                <ul className="list-disc ml-6">
                  <li>Tipo de contenido: post, blog, email, anuncio.</li>
                  <li>Intención comunicativa: informar, persuadir, inspirar.</li>
                  <li>Canal: LinkedIn, Instagram, blog, etc.</li>
                  <li>CTA: visitar sitio, agendar demo, compartir.</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Columna derecha: punto 4 + funcionalidades, como continuación del ol */}
          <div className="flex-1">
            <ol start={4} className="list-decimal ml-6 space-y-4">
              <li>
                <strong>Curaduría y publicación:</strong>
                <ul className="list-disc ml-6">
                  <li>Revisión manual previa (opcional)</li>
                  <li>Uso directo si se han definido plantillas y perfiles</li>
                  <li>Automatización por lote (en desarrollo)</li>
                </ul>
              </li>
              <li>
                <strong>Funcionalidades complementarias:</strong>
                <ul className="list-disc ml-6">
                  <li>Reutilización de prompts</li>
                  <li>Historial por perfil</li>
                  <li>Control de tono y estilo</li>
                  <li>Sugerencia de hashtags</li>
                  <li>Integración externa (en desarrollo)</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5">4. Principales beneficios</h2>

        <div className="md:flex md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className=""> 
             <ul className="list-disc ml-6 flex flex-col space-y-4">
              <li>Ahorro de tiempo y recursos</li>
              <li>Mayor constancia y coherencia comunicativa</li>
              <li>Escalabilidad sin perder el toque humano</li>
              <li>Segmentación precisa o amplia según necesidad</li>
              <li>Mejora del posicionamiento digital y larelación con tu comunidad</li>
              <li>Modularidad inteligente: control total sobre quién comunica, a quién y cómo.</li>
              <li>Alineación entre contenido, audiencia y canal con mínima intervención humana.</li>
            </ul>
          </div>
          <img src="/assets/white/image4.jpeg" alt="" className="w-[80%] m-auto md:w-[50%] lg:w-[35%]" />
        </div>
       
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">5. Casos de uso del GAC como facilitador B2F</h2>
        <img src="/assets/white/image5.jpeg" alt="" className="w-[80%] m-auto lg:w-[70%]" />
        <div className="space-y-6 mt-4 lg:mt-10">
          <div className="border p-4 rounded-lg bg-gray-100">
            <h3 className="font-semibold">📌Caso 1: Emprendedora con marca personal (Segmento B+ – Instagram & X)</h3>            
            <ul className="list-disc ml-6">
              <li>Emisor: Mariana, estratega de negocios digitales</li>
              <li>Target: Mujeres emprendedoras de 25–40 años, interesadas en automatización y gestión del tiempo.</li>
              <li>Mensaje: Publicaciones diarias con consejos, historias y microtutoriales.</li>
              <li>Resultado: +70% de constancia y crecimiento en engagement.</li>
            </ul>
          </div>
          <div className="border p-4 rounded-lg bg-gray-100">
            <h3 className="font-semibold">📌Caso 2: PyME de e-commerce en moda (Segmento C – Facebook & WhatsApp)</h3>            
            <ul className="list-disc ml-6">
              <li>Emisor: Tienda local con ventas en línea.</li>
              <li>Target: Mujeres jóvenes de segmento C.</li>
              <li>Mensaje: Promociones y lanzamientos con lenguaje directo.</li>
              <li>Resultado: Aumento en clics y reducción de carga operativa.</li>
            </ul>
          </div>
          <div className="border p-4 rounded-lg bg-gray-100">
            <h3 className="font-semibold">📌Caso 3: Consultora en salud mental (Segmento AA – LinkedIn & blog)</h3>            
            <ul className="list-disc ml-6">
              <li>Emisor: Psicóloga clínica</li>
              <li>Target: Profesionales que buscan bienestar emocional.</li>
              <li>Mensaje: Publicaciones educativas semanales.</li>
              <li> Resultado: Posicionamiento como experta y leads orgánicos.</li>
            </ul>
          </div>
          <div className="border p-4 rounded-lg bg-gray-100">
            <h3 className="font-semibold">📌Caso 4: Agencia B2B con clientes corporativos (Ultrapersonalizado – LinkedIn)</h3>            
            <ul className="list-disc ml-6">
              <li>Emisor: Agencia de comunicación estratégica.</li>
              <li>Target: Responsables de marketing en empresas AAA</li>
              <li>Mensaje: Propuestas de valor personalizadas.</li>
              <li>Resultado: Contenido adaptado sin depender de redactores externos.</li>
            </ul>
          </div>
          <div className="border p-4 rounded-lg bg-gray-100">
            <h3 className="font-semibold">📌Caso 5: Fundación educativa (Segmento B/C – Instagram & boletines)</h3>            
            <ul className="list-disc ml-6">
              <li>Emisor: ONG educativa</li>
              <li>Target: Familias urbanas de sectores B y C.</li>
              <li>Mensaje: Historias de impacto y eventos gratuitos.</li>
              <li>Resultado: Mayor visibilidad y participación comunitaria.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5">6. ¿Qué nos hace diferentes frente a otras soluciones?</h2>

        <h3>IA generativa orientada a negocios</h3>
        <p className="mb-4 mt-4">
          El Generador Automático de Contenido (GAC) de iActiva no es un generador genérico más.
        Está diseñado para resolver un problema real: mantener una comunicación constante,
        auténtica y estratégica con las audiencias, sin agotar tiempo, presupuesto ni recursos
        humanos
        </p>
        <p className="mb-4"> <br />Estos son nuestros principales diferenciadores frente a las soluciones más populares del mercado:</p>

        <h3 className="text-lg mb-3 mt-3  lg:text-xl lg:mb-6 lg-mt-6">🔷1. Enfoque 100% B2F</h3>
        <p>A diferencia de los generadores tradicionales, el GAC está enfocado en facilitar estrategias
        Business to Followers (B2F), ayudando a marcas y empresas a construir comunidad,
          cercanía y engagement con sus seguidores reales.</p>

        <h3 className="text-lg mb-3 mt-3  lg:text-xl lg:mb-6 lg-mt-6" >🔷2. Personalización modular: Emisor, Target y Mensaje</h3>
        <p> Nuestra arquitectura permite definir claramente: <br/><br/></p>

          <div className="flex flex-col gap-4 md:flex-row md:justify-between italic font-semibold">            
              <span>Quién comunica.</span>
              <span>A quién se dirige.</span>
              <span>Qué se dice, con qué tono y a través de qué canal</span>            
          </div>

          <p> <br />Con esta estructura, el GAC automatiza sin perder autenticidad, adaptando el contenido a
cada público objetivo, ya sea segmentado por nivel socioeconómico (AAA, B+, C...) o
ultrapersonalizado.</p>

      <h3 className="text-lg mb-3 mt-3  lg:text-xllg:mb-6 lg-mt-6">🔷3. Curaduría humana disponible</h3>
      <p>El GAC permite: <br /><br /></p>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between italic font-semibold">
          <span>Revisión previa por parte el usuario</span>
          <span>Uso directo en caso de perfiles bien configurados</span>
          <span>Supervisión opcional sin necesidad de expertos técnicos</span>
        </div>
        
        <h3 className="text-lg mb-3 mt-3  lg:text-xl lg:mb-6 lg-mt-6">🔷4. Accesibilidad económica</h3>
        <p>A diferencia de soluciones que cobran en dólares, por tokens o por volúmenes opacos, el GAC ofrece: <br /><br /></p>

        <div className="flex flex-col gap-4 md:flex-row md:justify-between italic font-semibold">
          <span>Precios claros y accesibles</span>
          <span>Modelos pensados para
            empresas pequeñas y
            profesionales
            independientes así como
            para departamentos
            especializados de grandes
            corporaciones y agencias de
            marketing digital.
          </span>
          <span>Escalabilidad sin presiones de upgrade</span>
        </div>

        <h3  className="text-lg mb-3 mt-3  lg:text-xl lg:mb-6 lg-mt-6">🔷5. Enfoque contextual y ético</h3>
        <div  className="flex flex-col gap-4 md:flex-row md:justify-between italic font-semibold">
          <span>Construido desde México, con sensibilidad local y enfoque inclusivo</span>
          <span>Adaptado a las formas reales de comunicar en español latino</span>
          <span>Sin dependencia de plataformas extranjeras o APIs cerradas</span>
        </div>

        <h3 className="text-lg mb-3 mt-3 lg:text-xl lg:mb-6 lg-mt-6">🔷6. Soporte estratégico, no solo técnico</h3>
        <p>Acompañamos a nuestros usuarios a definir su voz, su narrativa y su comunidad
          <br />
          Pensamos contigo: no eres un usuario más, eres un socio de comunicación
        </p>

        <div className="flex mt-5 flex-col gap-3 md:flex-row md:justify-between">
          <img src="/assets/white/image6.jpeg" alt="" className="w-[75%] m-auto md:w-[50%] lg:w-[45%]" />
          <img src="/assets/white/image7.jpeg" alt="" className="w-[75%] m-auto md:w-[50%] lg:w-[45%]"  />
        </div>

        <h3 className="text-xl font-semibold mt-4 ">Comparativa general</h3>
        <div className="overflow-auto mt-2">
          <table className="min-w-full table-auto border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Característica</th>
                <th className="border p-2">GAC de iActiva</th>
                <th className="border p-2">ChatGPT / Notion AI</th>
                <th className="border p-2">Jasper / Writesonic</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Enfoque B2F</td><td className="border p-2">✅ Totalmente integrado</td><td className="border p-2">❌ No específico</td><td className="border p-2">❌ Enfocado a marketing masivo</td></tr>
              <tr><td className="border p-2">Estructura modular (Emisor–Target–Mensaje) </td><td className="border p-2">✅ Completa</td><td className="border p-2">⚠️Parcial</td><td className="border p-2">❌ No estructurad</td></tr>
              <tr><td className="border p-2">Personalización socioeconómica y narrativa</td><td className="border p-2">✅ Incluida</td><td className="border p-2">❌ Generalista</td><td className="border p-2">⚠️ Limitada por prompt</td></tr>
              <tr><td className="border p-2">Curaduría humana habilitada</td><td className="border p-2">✅ Opcional</td><td className="border p-2">❌ No integrada</td><td className="border p-2">⚠️ Manual externa</td></tr>
              <tr><td className="border p-2">Acompañamiento estratégico</td><td className="border p-2">✅ Incluido</td><td className="border p-2">❌ Sin soporte contextual </td><td className="border p-2">⚠️ Depende del plan</td></tr>
              <tr><td className="border p-2">Lenguaje adaptado al español latino</td><td className="border p-2">✅ Nativo</td><td className="border p-2"> ⚠️Traducción automática</td><td className="border p-2">⚠️ Traducido desde inglés</td></tr>
              <tr><td className="border p-2">Accesibilidad económica</td><td className="border p-2">✅ Sí</td><td className="border p-2">⚠️Variable en dólares</td><td className="border p-2">❌ Alto costo por volume</td></tr>
            </tbody>
          </table>
        </div>
      </section>


      <section>
        <h2 className="text-2xl font-bold mb-5">📌Resultado</h2>
        <p>El GAC no busca competir con herramientas impersonales ni con asistentes genéricos.
          Compite con el caos editorial, la pérdida de tiempo y la desconexión entre marca y
          audiencia.
          Es una solución de comunicación estratégica, creada para que las empresas no solo
          generen contenido, sino que generen comunidad.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold">7. Conclusión: Conecta con tu audiencia con inteligencia</h2>
        <p>
          El GAC de iActiva no solo automatiza contenido. Facilita la conexión real con tus audiencias: seguidores, clientes y aliados. Te
          permite escalar tu estrategia sin perder tu esencia ni agotar recursos. Ideal para equipos que valoran la coherencia, la estrategia y
          el impacto.
        </p>
        <p className="mt-2 font-semibold">Agenda tu demo sin costo hoy mismo.</p>
        <p className="mt-1">📧 info@iactiva.ai</p>
        <p>🔗 <a href="https://iactiva.ai/#contacto" className="text-blue-600 underline">iactiva.ai/#contacto</a></p>
      </section>
    </div>
  );
}