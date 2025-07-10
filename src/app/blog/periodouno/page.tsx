'use client';

import { useRouter } from "next/navigation";

export default function B2FPage() {

  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      
      <img src={'/assets/periodouno/image1.png'} alt=""   className=" m-auto w-[60%] h-[60%] rounded-sm"/>

      <h1 className="mt-5 text-2xl font-bold mb-4 text-center">🌎 El contexto ha cambiado</h1>
      <blockquote className="italic border-l-4 border-blue-500 pl-4 mb-4">
        “Las marcas que no construyen comunidad están condenadas a perseguir métricas vacías.”
        <br />— Brian Solis (2011)
      </blockquote>

      <p className="mb-4">
        Según datos recientes, el 48 % de los consumidores interactúa más con marcas en redes sociales que hace seis meses (Hootsuite & We Are Social, 2024; Statista Research Department, 2024). Esto indica que el momento de construir comunidad es ahora.
      </p>
      <p className="mb-4">
        Durante años, dividimos nuestras estrategias en B2B (Business to Business) o B2C (Business to Consumer). Esa lógica tenía sentido cuando el canal de comunicación era unidireccional: tú hablabas, tu cliente escuchaba (o no).
      </p>
      <p className="mb-4">Hoy, tus seguidores:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Te escuchan activamente</li>
        <li>Te comparten si les gusta tu tono</li>
        <li>Te castigan con silencio si suenas como robot</li>
        <li>Y lo más importante: te comparan no solo con tu competencia, sino con los creadores que sí logran conectar.</li>
      </ul>
      <p className="mb-4 font-bold">
        Por eso, el contenido ya no se trata solo de informar: se trata de construir comunidad.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">🤝 ¿Qué es B2F?</h2>
      <blockquote className="italic border-l-4 border-blue-500 pl-4 mb-4">
        “La audiencia no quiere que le hables, quiere que converses. Las marcas que entienden esto tienen seguidores, no solo clientes.”
        <br />— Ann Handley (2014)
      </blockquote>
      <p className="mb-4">
        Business to Followers (B2F) es una estrategia de comunicación centrada en construir una relación real, constante y auténtica entre una marca o profesional y su audiencia.
      </p>
      <p className="mb-4">
        Además, el usuario promedio mantiene casi siete redes sociales activas cada mes (Statista Research Department, 2024), lo que significa que una estrategia B2F debe ser multicanal, consistente y empática.
      </p>
      <p className="mb-4">
        Ya no se trata de hablarle a un “mercado meta”. Se trata de hablarle a tus seguidores como personas: con empatía, con intención y con estilo propio.
      </p>
      <p className="mb-4">En B2F:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Tu comunidad no es solo una lista de correos o seguidores</li>
        <li>Cada canal digital es una oportunidad de diálogo</li>
        <li>La relación importa más que el alcance</li>
        <li>El objetivo no es solo que te sigan. Es que regresen. Es que recomienden. Es que se sientan parte.</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-3">🧩 ¿Cómo se diferencia del marketing tradicional?</h2>
      <img src="/assets/periodouno/image2.png" alt=""  className=" m-auto w-[60%] h-[60%] rounded-sm" />
      <p className="mb-4 mt-5">
        Veamos cómo se compara el enfoque B2F frente al marketing tradicional:
      </p>
      <div className="border rounded-md p-4 mb-4 bg-gray-50">
        <div className="grid grid-cols-2 gap-4 font-semibold">
          <div>Marketing clásico</div>
          <div>B2F: Business to Followers</div>
        </div>
        <hr className="my-2" />
        <div className="grid grid-cols-2 gap-4">
          <div>Tono institucional</div>
          <div>Tono auténtico, personal</div>
          <div>Enfoque en producto</div>
          <div>Enfoque en valor para la comunidad</div>
          <div>Comunicación unidireccional</div>
          <div>Conversación abierta y sostenida</div>
          <div>Segmentación superficial</div>
          <div>Segmentación emocional y narrativa</div>
          <div>Publicación para cumplir</div>
          <div>Publicación para conectar</div>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-2">❌ ¿Qué NO es B2F?</h2>
      <blockquote className="italic border-l-4 border-blue-500 pl-4 mb-4">
        “No confundas ruido con impacto. No todo contenido viral construye marca.”
        <br />— Rand Fishkin (2018)
      </blockquote>
      <p className="mb-4">
        B2F no es lo mismo que influencer marketing. Tampoco se trata de llenar tus redes de frases motivacionales o bailes virales.
      </p>
      <p className="mb-4">B2F no es:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Hacer contenido solo porque “funciona”</li>
        <li>Perseguir likes como fin último</li>
        <li>Contratar a un community manager para que “postee todos los días”</li>
      </ul>
      <p className="mb-4">
        Es construir una conversación con identidad y propósito (Fishkin, 2018).
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">🛠 ¿Cómo se implementa?</h2>

      <div className="flex flex-col md:flex-row gap-5 items-start  mt-5">
        <div>
         <p className="mb-4">
          Implementar B2F no es improvisar contenido emocional. Es tener una estrategia sólida, estructurada y adaptable que contemple:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Quién eres tú (Emisor):</strong>  <br />  ¿Qué representa tu marca? <br /> ¿Cómo suena tu voz? <br />  ¿Qué valores la inspiran?</li>
          <li><strong>A quién te diriges (Target):</strong> <br />  ¿Conoces bien a tus seguidores?  <br />  ¿Sabes cómo piensan, sienten y qué canales prefieren?</li>
          <li><strong>Qué quieres decir (Mensaje):</strong> <br />   ¿Tienes claro tu objetivo por publicación? <br />  ¿Buscas educar, entretener, invitar, inspirar?</li>
        </ul>       
        </div>

       <img src="/assets/periodouno/image3.png" alt="" className=" m-auto w-[70%] h-[70%]   md:w-[40%] md:h-[40%] rounded-sm" />

      </div>

      <div className="flex flex-col md:flex-row gap-5 items-start mt-10" >
        <div>
           <p className="mb-4">
            Las tasas promedio de engagement en redes sociales se sitúan entre el 1.4 % y el 2.8 % (HubSpot Research, 2024). Esto demuestra que conectar con tu comunidad es perfectamente alcanzable si tu mensaje es auténtico.
          </p>
          <p className="mb-4">
            La buena noticia es que no necesitas hacerlo solo. El GAC de iActiva está diseñado precisamente para eso: automatizar tu comunicación sin perder tu esencia.
          </p>
        </div>

        <img src="/assets/periodouno/image4.png" alt="" className=" m-auto w-[70%] h-[70%] md:w-[40%] md:h-[40%] rounded-sm"/>
      </div>
      
      <h2 className="text-xl font-bold mt-8 mb-2">✨ ¿Para quién sirve el B2F?</h2>
      <blockquote className="italic border-l-4 border-blue-500 pl-4 mb-4">
        “Si tienes algo que decir y alguien que te escucha, ya tienes una audiencia. El B2F convierte eso en capital social.”
        <br />— Marie Forleo (2019)
      </blockquote>

      <div className="flex flex-col  md:flex-row gap-5 items-center mt-10">
        <img src="/assets/periodouno/image6.png" alt="" className=" m-auto w-[70%] h-[70%] md:w-[40%] md:h-[40%] rounded-sm"/>
          <div>
            <p className="mb-4">
              Actualmente, el 90 % de las PYMEs utilizan redes sociales, y el 78 % lo hacen para aumentar sus ingresos (Shopify, 2024; Hootsuite & We Are Social, 2024). Esto prueba que construir comunidad tiene un impacto directo en los resultados comerciales.
            </p>
          </div>          
      </div>
      


      <p className="mb-4">
        Los consumidores que interactúan activamente con las marcas gastan hasta un 40 % más (Shopify, 2024). No se trata solo de visibilidad: es negocio puro.
      </p>
      <p className="mb-4 text-lg lg:text-2xl lg:mt-10 lg:mb-5"><strong>B2F es útil para:</strong></p>

      <div className="flex flex-col  md:flex-row gap-5 items-start mt-5">
        <div>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Establecer un lazo emocional entre tu marca y tu audiencia</li>
            <li>Crear o fortalecer tu marca personal</li>
            <li>Emprendedoras que gestionan su marca personal</li>
            <li>PyMEs que desean posicionarse sin perder autenticidad</li>
            <li>Consultoras o coaches que generan contenido educativo</li>
            <li>Grandes empresas que quieren dejar de sonar como robots</li>
            <li>Y sí, también para ti, que estás leyendo esto.</li>
          </ul>
        </div>
        <img src="/assets/periodouno/image7.png" alt="" className=" m-auto w-[70%] h-[70%] md:w-[40%] md:h-[40%] rounded-sm"/>
      </div>
      

      <h2 className="text-xl font-bold mt-8 mb-2">🎯 ¿Qué te llevarás de este periodo?</h2>
      <div className="flex flex-col  md:flex-row gap-5 items-start mt-5">
        <div>
            <p className="mb-4">
            En este primer periodo de contenidos sobre B2F descubrirás:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>La arquitectura exacta del B2F (Emisor–Target–Mensaje)</li>
            <li>Qué errores evitar</li>
            <li>Casos reales de empresas que ya aplican B2F con éxito</li>
            <li>Cómo el GAC convierte ideas en conexiones reales</li>
            <li>Y lo más importante: cómo puedes usar tecnología para escalar tu voz sin perder el control.</li>
          </ul>
          <p className="mb-4 font-semibold italic">
            “No necesitas hacer más publicaciones. Necesitas hacer publicaciones que conecten.” — La Caballera Rosa
          </p>
          <p>
            📅 En el siguiente periodo exploraremos más sobre cómo pasar de publicaciones genéricas a verdaderas conversaciones con tu comunidad. 
          </p>
        </div>
        <img src="/assets/periodouno/image8.png" alt="" className=" m-auto w-[70%] h-[70%] md:w-[40%] md:h-[40%] rounded-sm"/>
      </div>

      <div className="mt-10 text-center">
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 " onClick={() => router.push('/gac')}>
          Haz clic aquí para conocer cómo funciona el GAC
        </button>
      </div>
      

      <h2 className="text-xl font-bold mt-8 mb-2">📚 Bibliografía</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Baer, J. (2013). Youtility. Portfolio Penguin. ISBN 9781591846666.</li>
        <li>Fishkin, R. (2018). Lost and Founder. Portfolio Penguin. ISBN 9780735213326.</li>
        <li>Forleo, M. (2019). Everything is Figureoutable. Portfolio Penguin. ISBN 9780525534990.</li>
        <li>Godin, S. (2018). This Is Marketing. Portfolio Penguin. ISBN 9780525540830.</li>
        <li>Handley, A. (2014). Everybody Writes. Wiley. ISBN 9781118905555.</li>
        <li>HubSpot Research. (2024). 2024 Social Media Engagement Benchmarks. HubSpot.</li>
        <li>Hootsuite & We Are Social. (2024). Digital 2024 Global Overview Report. Hootsuite.</li>
        <li>Pulizzi, J. (2013). Epic Content Marketing. McGraw-Hill. ISBN 9780071819893.</li>
        <li>Shopify. (2024). The Future of Commerce Report 2024. Shopify Inc.</li>
        <li>Solis, B. (2011). Engage!: The Complete Guide for Brands and Businesses. Wiley. ISBN 9780470571098.</li>
        <li>Statista Research Department. (2024). Average number of social media accounts per user worldwide. Statista.</li>
      </ul>
    </div>
  );
}
