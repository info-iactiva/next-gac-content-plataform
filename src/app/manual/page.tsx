
"use client";

import React from "react";

export default function GacGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">
        Guía de Uso del GAC — Generador Automático de Contenido de iActiva
      </h1>

      <p className="mb-4">
        La creación de contenido efectivo es uno de los mayores retos de las marcas en el entorno
        digital actual. El GAC (Generador Automático de Contenido) de iActiva es una herramienta
        diseñada para automatizar la generación de textos, manteniendo la coherencia con la voz de
        marca y alineada a objetivos estratégicos de comunicación y marketing.
      </p>

      <p className="mb-4">
        Este instructivo está diseñado para ayudarte a configurar de manera precisa cada parámetro
        requerido por el GAC, garantizando que los textos producidos sean estratégicamente
        efectivos, coherentes con tu marca y relevantes para tu audiencia.
      </p>

      <p className="mb-4 font-semibold">El formulario está dividido en tres bloques:</p>
      <ul className="list-disc list-inside mb-6">
        <li>Datos de tu Empresa</li>
        <li>Target</li>
        <li>Mensaje</li>
      </ul>

      {/* Sección 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Sección 1: Datos de tu empresa</h2>
        <p className="mb-4 italic">Disponible en todos los planes</p>

        <div className="space-y-4">
          <Field title="Tu Empresa o Producto" example="iActiva GenAI Solutions S.A. de C.V."  desc=" Introduce el nombre legal o comercial de la marca, producto o línea de negocio. Este dato sirve de identificador principal y ayuda a contextualizar el tono y el enfoque comunicacional."/>
          <Field title="Nombre corto de tu empresa" example="iActiva"  desc="Indica el nombre abreviado o el “alias” con el que la audiencia reconoce tu marca en redes, publicidad o cotidianidad."/>
          <Field title="Web site de tu empresa" example="https://www.iactiva.ai" desc="Incluye la URL principal de tu sitio web o landing page. Esto permite al GAC captar elementos clave como lenguaje, estilo visual y narrativa digital de la marca." />
          <Field
            title="Descripción de la empresa"
            example="Empresa mexicana que desarrolla soluciones de automatización e inteligencia artificial para incrementar la productividad organizacional."
            desc="Redacta un párrafo breve que explique el core business, sector, propuesta de valor y posicionamiento diferencial de tu empresa."
          />
          <Field title="Nombre del Personaje" example="Mariana"  desc="Si utilizas un vocero, ya sea real o ficticio, como portavoz de la marca, especifica su nombre aquí. Esto ayudará a dotar al contenido de una voz más personalizada."/>
          <Field
            title="Descripción del Personaje"
            example="Mariana es estratega digital, experta en productividad. Su tono es empático, claro y directo."
            desc="Describe el perfil, expertise, tono comunicativo y rasgos de personalidad del personaje vocero. Es clave para preservar la consistencia narrativa."
          />
        </div>
      </section>

      {/* Sección 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Sección 2: Target</h2>
        <p className="mb-4 italic">
          Campos 7 a 9 disponibles en todos los planes; campos 10 a 15 disponibles solo en planes
          Pro y Superiores.
        </p>

        <div className="space-y-4">
          <Field title="¿Ultrapersonalizado?" example="Sí"  desc="Indica si deseas generar contenido orientado a un perfil hiperdefinido, también conocido como Buyer Persona. Seleccionar “Sí” habilitará campos adicionales que profundizan la personalización del mensaje. "/>
          <Field title="Segmento de la audiencia" example="AAA"  desc=": Clasifica a tu público objetivo en función de criterios sociodemográficos o socioeconómicos (e.g., AAA, B+, C). Esto ayuda a modular el lenguaje, referencias culturales y profundidad del mensaje."/>
          <Field
            title="Descripción de la audiencia"
            example="Directivos interesados en automatización de procesos y optimización de tiempos sin sacrificar calidad institucional."
            desc=": Especifica insights clave sobre intereses, puntos de dolor, estilo de vida o comportamientos de consumo del público meta. Esto asegura mayor relevancia y resonancia del contenido"
          />
          <Field title="Empresa o Producto (objetivo)" example="Banco BASE" desc=" Si el mensaje es ultrapersonalizado, indica aquí la empresa, marca o producto objetivo. Esto permitirá insertar referencias específicas en el contenido. " />
          <Field title="Web site de la empresa" example="https://www.bancobase.com"  desc=": Incluye el enlace al sitio web de la empresa objetivo, para permitir al GAC inferir estilo y contexto de comunicación."/>
          <Field
            title="Descripción de la empresa (Target)"
            example="Banco especializado en operaciones de divisas y comercio exterior para empresas medianas y grandes."
            desc="Redacta una breve descripción sobre giro, propuesta de valor y público objetivo de la empresa objetivo."
          />
          <Field title="Nombre del Buyer Persona" example="Lic. Robles" desc=": Define cómo se identificará al buyer persona (nombre real, genérico o representativo)." />
          <Field
            title="Descripción del Buyer Persona"
            example="Director de TI que busca agilizar procesos internos de comunicación sin perder coherencia institucional."
            desc="Especifica cargo, responsabilidades, objetivos profesionales, necesidades, barreras y motivadores. Es crucial para lograr un contenido ultrapersonalizado y con enfoque consultivo."
          />
          <Field
            title="URL de LinkedIn"
            example="https://www.linkedin.com/in/roberto-robles-ti"
            desc="Especifica cargo, responsabilidades, objetivos profesionales, necesidades, barreras y motivadores. Es crucial para lograr un contenido ultrapersonalizado y con enfoque consultivo."
          />
        </div>
      </section>

      {/* Sección 3 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Sección 3: Mensaje</h2>
         <p className="mb-4 italic">
          Todos los campos disponibles en todos los planes, excepto los indicados como Pro y Superiores          
        </p>


        <div className="space-y-4">
          <Field
            title="Objetivo de la publicación"
            example="Promocionar una nueva funcionalidad del GAC."
            desc="Define la intención estratégica de la pieza: informar, educar, persuadir, fidelizar, inspirar, etc. Esto condiciona tanto la estructura como el call to action final.
"
          />
          <Field title="Tono de la publicación" example="Profesional con matices persuasivos." desc=" Selecciona el tono narrativo que mejor se alinee a tu marca o a la situación comunicativa: técnico, emocional, persuasivo, inspirador, institucional, cercano, entre otros." />
          <Field
            title="Texto inspirador o de referencia"
            example="“No necesitas hacer más publicaciones. Necesitas publicaciones que conecten.”"
            desc="Puedes incluir fragmentos textuales (slogans, citas, posts previos) para servir de muestra estilística. Esto facilita que el GAC imite un tono o cadencia específica."
          />
          <Field title="Al estilo de este autor" example="Seth Godin" desc=" Si deseas emular el estilo de un autor, periodista, copywriter o personalidad mediática, menciona su nombre. Esto influye en la retórica, ritmo y elección de palabras." />
          <Field title="Extensión" example="Media"  desc=" Establece la longitud aproximada del texto: breve (una frase), media (post o párrafo), o larga (artículo, blog, newsletter)."/>
          <Field title="Potencia de la IA" example="Alta"  desc="Determina la capacidad del motor de generación. Por default, todos los planes usan potencia baja. Los planes Pro y superiores pueden elegir potencia alta, lo cual permite un mayor nivel de personalización, profundidad y coherencia en el contenido."/>
          <Field title="Idioma" example="Español" desc="Indica el idioma en que deseas generar el contenido. El GAC soporta todos los idiomas compatibles con modelos avanzados como GPT-4o." />
        </div>
      </section>

      {/* Anexo */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Anexo 1: Tabla de restricción de longitudes por campo
        </h2>

        <p className="mb-4 font-semibold">📋 Tabla de Longitudes Permitidas en Campos del GAC</p>

        <table className="w-full table-auto border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Campo</th>
              <th className="border px-2 py-1">Longitud Máxima (caracteres)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Tu Empresa o Producto", "200"],
              ["Nombre corto de tu empresa", "200"],
              ["Web site de tu empresa", "200"],
              ["Descripción de la empresa", "2000"],
              ["Nombre del Personaje", "100"],
              ["Descripción del Personaje", "500"],
              ["¿Ultrapersonalizado?", "200"],
              ["Segmento de la audiencia", "200"],
              ["Descripción de la audiencia", "1000"],
              ["Empresa o Producto (Target)", "200"],
              ["Web site de la empresa", "200"],
              ["Descripción de la empresa (Target)", "2000"],
              ["Nombre del Buyer Persona", "100"],
              ["Descripción del Buyer Persona", "500"],
              ["URL de LinkedIn", "200"],
              ["Objetivo de la publicación", "200"],
              ["Tono de la publicación", "200"],
              ["Texto inspirador o de referencia", "2000"],
              ["Al estilo de este autor", "100"],
              ["Extensión", "200"],
              ["Potencia de la IA", "200"],
              ["Idioma", "200"],
            ].map(([field, length], index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{field}</td>
                <td className="border px-2 py-1">{length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Field({ title, example , desc}: { title: string; example: string ,desc: string}) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p>{desc}</p>
      <p className="text-sm text-gray-700 italic">Ejemplo: {example}</p>
    </div>
  );
}
