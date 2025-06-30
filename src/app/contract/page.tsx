'use client';
import { useRouter } from "next/navigation";

export default function ContractPage() {
    const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-center">
        CONTRATO MARCO DE PRESTACIÓN DE SERVICIOS DEL GENERADOR AUTOMÁTICO DE CONTENIDO (GAC)
      </h1>

      <p className="italic mb-2 text-center">Modalidad de adhesión</p>
      <p className="mb-4 text-center">
        <strong>Fecha de última actualización:</strong> 20 de septiembre de 2024
      </p>

      <p className="mb-4">
        El presente Contrato Marco regula la relación jurídica entre <strong>José Díaz Jiménez</strong>,
        titular de las marcas iActiva y Generador Automático de Contenido (GAC), con domicilio en
        Priv. de Rélox 30, Col. San Ángel, Álvaro Obregón 01070, Ciudad de México, México (en
        adelante, "el Prestador") y cualquier persona física o moral (en adelante, "el Cliente") que
        utilice los servicios del GAC a través de la aceptación expresa al momento del registro o
        mediante el uso continuo de la plataforma.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">TEXTO DE ADHESIÓN PARA SITIO WEB</h2>
      <p className="mb-4">
        Al registrarte y utilizar los servicios del Generador Automático de Contenido (GAC) de iActiva,
        reconoces haber leído y aceptado expresamente este Contrato Marco, así como nuestros
        Términos y Condiciones y nuestro Aviso de Privacidad. El uso del servicio implica tu aceptación
        plena y sin reservas del presente instrumento jurídico, el cual se considera celebrado en la
        Ciudad de México.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2">CLÁUSULAS</h2>

      <section className="space-y-4">
        <div>
          <h3 className="font-bold">PRIMERA. Objeto del Contrato</h3>
          <p>
            El Prestador se obliga a proporcionar al Cliente el acceso y uso del Generador Automático
            de Contenido (GAC), una herramienta basada en inteligencia artificial para la generación
            de publicaciones escritas, conforme al paquete y modalidad seleccionados.
          </p>
        </div>

        <div>
          <h3 className="font-bold">SEGUNDA. Aceptación y Adhesión</h3>
          <ul className="list-disc list-inside">
            <li>Se registra en la plataforma del GAC, o</li>
            <li>Hace uso del servicio, en cualquier modalidad ofrecida.</li>
          </ul>
          <p>
            Esta aceptación se considera válida, vinculante y equivalente a la firma autógrafa conforme
            al artículo 1803 y 1834 Bis del Código Civil Federal, en concordancia con la Ley de Firma
            Electrónica Avanzada.
          </p>
        </div>

        <div>
          <h3 className="font-bold">TERCERA. Paquetes y Precios</h3>
          <ul className="list-disc list-inside">
            <li><strong>Básico:</strong> Suscripción gratuita. 12 meses a $199 MXN cada uno. Renovación anual $300 MXN. 45 iteraciones/mes.</li>
            <li><strong>Pro:</strong> Suscripción anual $500 MXN más 12 mensualidades de $349 MXN. 100 iteraciones/mes.</li>
            <li><strong>Pro con Descuento:</strong> Pago anual único de $4,230.40 MXN con 20% de descuento. 100 iteraciones/mes.</li>
            <li><strong>Premium:</strong> Cotización y contrato especial ad hoc.</li>
          </ul>
          <p>
            Todos los precios están sujetos a ajuste anual conforme a la inflación publicada por el
            Banco de México.
          </p>
        </div>

        <div>
          <h3 className="font-bold">CUARTA. Naturaleza del Servicio</h3>
          <p>
            GAC proporciona contenido textual generado por inteligencia artificial. No incluye
            imágenes, video, audio ni contenido multimedia.
          </p>
        </div>

        <div>
          <h3 className="font-bold">QUINTA. Responsabilidades del Cliente</h3>
          <ul className="list-disc list-inside">
            <li>El uso del contenido generado.</li>
            <li>Su publicación o difusión.</li>
            <li>Las consecuencias legales, éticas o comerciales derivadas de su uso.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">SEXTA. Límites y Exenciones de Responsabilidad</h3>
          <ul className="list-disc list-inside">
            <li>Errores o interrupciones derivados de servicios externos (nube, conectividad, IA de terceros).</li>
            <li>Resultados no deseados o incorrectos generados por la IA.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">SÉPTIMA. Propiedad Intelectual</h3>
          <p>
            Los algoritmos, interfaces y metodologías son propiedad del Prestador. Se prohíbe su
            reproducción, redistribución, ingeniería inversa o modificación sin consentimiento por
            escrito. El Cliente conserva la propiedad del contenido generado.
          </p>
        </div>

        <div>
          <h3 className="font-bold">OCTAVA. Uso Indebido y Suspensión</h3>
          <p>
            El Prestador podrá suspender el servicio si detecta un uso contrario a la ley, a la buena fe
            o a estos términos.
          </p>
        </div>

        <div>
          <h3 className="font-bold">NOVENA. Terminación Anticipada y Sin Reembolso</h3>
          <ul className="list-disc list-inside">
            <li>Incumplimiento de pago.</li>
            <li>Uso indebido, abusivo, ilegal o contrario a las buenas prácticas.</li>
            <li>Manipulación del sistema o ingeniería inversa.</li>
            <li>Cualquier acto u omisión que represente un riesgo o uso contrario al objeto del servicio.</li>
          </ul>
          <p>La terminación no exime al Cliente de cubrir adeudos pendientes.</p>
        </div>

        <div>
          <h3 className="font-bold">DÉCIMA. Confidencialidad y Datos Personales</h3>
          <p>
            Ambas partes se obligan a mantener la confidencialidad sobre la información intercambiada.
            Los datos personales serán tratados conforme al{" "}
            <a href="https://iactiva.ai/privacy" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
              Aviso de Privacidad
            </a>.
          </p>
        </div>

        <div>
          <h3 className="font-bold">DÉCIMA PRIMERA. Jurisdicción y Ley Aplicable</h3>
          <p>
            Este contrato se regirá por las leyes de los Estados Unidos Mexicanos. Las partes se someten
            a los tribunales de la Ciudad de México. Consulta el contrato completo en{" "}
            <button
                          type="button"
                          onClick={() => router.push('/contract')}
                          className="underline text-blue-600"
                        >
                          contrato
                        </button>
          </p>
        </div>
      </section>

      <hr className="my-8" />

      <h2 className="text-xl font-bold mb-4">AVISO DE PRIVACIDAD</h2>
      <p className="mb-2"><strong>Última actualización:</strong> 20 de septiembre de 2024</p>
      <p className="mb-4">
        <strong>Responsable:</strong> José Díaz Jiménez, titular de iActiva y GAC, con domicilio en
        Priv. de Rélox 30, Col. San Ángel, Álvaro Obregón 01070, Ciudad de México.
      </p>

      <div className="space-y-4">
        <div>
          <p className="font-bold">1. Datos personales que recabamos:</p>
          <ul className="list-disc list-inside">
            <li>Identificación (nombre, apellidos, correo, teléfono, dirección, RFC, CURP).</li>
            <li>Información financiera.</li>
            <li>Datos sensibles (si son necesarios).</li>
          </ul>
        </div>

        <div>
          <p className="font-bold">2. Finalidades del tratamiento:</p>
          <ul className="list-disc list-inside">
            <li>Prestación de servicios, facturación, soporte técnico.</li>
            <li>Envío de promociones y estudios de mercado.</li>
            <li>Cumplimiento de obligaciones legales.</li>
          </ul>
        </div>

        <div>
          <p className="font-bold">3. Derechos ARCO:</p>
          <p>
            El titular podrá ejercer sus derechos de Acceso, Rectificación, Cancelación u Oposición
            mediante solicitud enviada a{" "}
            <a href="mailto:info@iactiva.ai" className="underline text-blue-600">info@iactiva.ai</a>.
          </p>
        </div>

        <div>
          <p className="font-bold">4. Transferencias de datos:</p>
          <p>Solo por obligación legal o defensa de derechos.</p>
        </div>

        <div>
          <p className="font-bold">5. Limitar uso o divulgación:</p>
          <p>
            Por correo. También pueden inscribirse al Registro Público de Usuarios que no desean
            publicidad.
          </p>
        </div>

        <div>
          <p className="font-bold">6. Seguridad:</p>
          <p>
            Se aplican medidas administrativas, físicas y tecnológicas razonables para proteger los
            datos.
          </p>
        </div>

        <div>
          <p className="font-bold">7. Cambios al aviso:</p>
          <p>
            Se publicarán en{" "}
            <a href="https://iactiva.ai/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
              https://iactiva.ai
            </a>. Se recomienda consultarlo periódicamente.
          </p>
        </div>

        <div>
          <p className="font-bold">8. Consentimiento:</p>
          <p>El uso del sitio y del servicio implica consentimiento conforme a este aviso.</p>
        </div>

        <div>
          <p className="font-bold">9. Contacto:</p>
          <p>
            <a href="mailto:info@iactiva.ai" className="underline text-blue-600">info@iactiva.ai</a> | +52 55 2 3311 069
          </p>
        </div>
      </div>
    </div>
  );
}
