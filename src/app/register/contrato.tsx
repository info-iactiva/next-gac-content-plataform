import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useRouter } from "next/navigation";

export const ContractModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
          <DialogTitle className="text-xl font-bold mb-4">
            CONTRATO MARCO DE PRESTACIÓN DE SERVICIOS DEL GENERADOR AUTOMÁTICO DE CONTENIDO (GAC)
          </DialogTitle>

          <div className="text-sm text-gray-700 space-y-4">
            <p className="italic">Modalidad de adhesión</p>
            <p><strong>Fecha de última actualización:</strong> 20 de septiembre de 2024</p>
            <p>
              El presente Contrato Marco regula la relación jurídica entre <strong>José Díaz Jiménez</strong>, titular de las marcas iActiva y Generador Automático de Contenido (GAC), con domicilio en Priv. de Rélox 30, Col. San Ángel, Álvaro Obregón 01070, Ciudad de México, México (en adelante, "el Prestador") y cualquier persona física o moral (en adelante, "el Cliente") que utilice los servicios del GAC a través de la aceptación expresa al momento del registro o mediante el uso continuo de la plataforma.
            </p>
            <h3 className="font-bold">TEXTO DE ADHESIÓN PARA SITIO WEB</h3>
            <p>
              Al registrarte y utilizar los servicios del Generador Automático de Contenido (GAC) de iActiva, reconoces haber leído y aceptado expresamente este Contrato Marco, así como nuestros Términos y Condiciones y nuestro Aviso de Privacidad. El uso del servicio implica tu aceptación plena y sin reservas del presente instrumento jurídico, el cual se considera celebrado en la Ciudad de México.
            </p>

            <h3 className="font-bold">CLÁUSULAS</h3>
            <div className="space-y-2">
              <p><strong>PRIMERA. Objeto del Contrato</strong></p>
              <p>El Prestador se obliga a proporcionar al Cliente el acceso y uso del Generador Automático de Contenido (GAC), una herramienta basada en inteligencia artificial para la generación de publicaciones escritas, conforme al paquete y modalidad seleccionados.</p>

              <p><strong>SEGUNDA. Aceptación y Adhesión</strong></p>
              <ul className="list-disc list-inside">
                <li>Se registra en la plataforma del GAC, o</li>
                <li>Hace uso del servicio, en cualquier modalidad ofrecida.</li>
              </ul>
              <p>Esta aceptación se considera válida, vinculante y equivalente a la firma autógrafa conforme al artículo 1803 y 1834 Bis del Código Civil Federal, en concordancia con la Ley de Firma Electrónica Avanzada.</p>

              <p><strong>TERCERA. Paquetes y Precios</strong></p>
              <ul className="list-disc list-inside">
                <li><strong>Básico:</strong> Suscripción gratuita. Incluye 12 meses a $199 MXN cada uno. Renovación anual $300 MXN. 45 iteraciones al mes.</li>
                <li><strong>Pro:</strong> Suscripción anual de $500 MXN más 12 mensualidades de $349 MXN. 100 iteraciones al mes.</li>
                <li><strong>Pro con Descuento:</strong> Pago anual único de $4,230.40 MXN con 20% de descuento. 100 iteraciones al mes.</li>
                <li><strong>Premium:</strong> Cotización y contrato especial ad hoc.</li>
              </ul>
              <p>Todos los precios están sujetos a ajuste anual conforme a la inflación publicada por el Banco de México.</p>

              <p><strong>CUARTA. Naturaleza del Servicio</strong></p>
              <p>GAC proporciona contenido textual generado por inteligencia artificial. No incluye imágenes, video, audio ni contenido multimedia.</p>

              <p><strong>QUINTA. Responsabilidades del Cliente</strong></p>
              <ul className="list-disc list-inside">
                <li>El uso del contenido generado.</li>
                <li>Su publicación o difusión.</li>
                <li>Las consecuencias legales, éticas o comerciales derivadas de su uso.</li>
              </ul>

              <p><strong>SEXTA. Límites y Exenciones de Responsabilidad</strong></p>
              <ul className="list-disc list-inside">
                <li>Errores o interrupciones derivados de servicios externos (nube, conectividad, IA de terceros).</li>
                <li>Resultados no deseados o incorrectos generados por la IA.</li>
              </ul>

              <p><strong>SÉPTIMA. Propiedad Intelectual</strong></p>
              <p>Los algoritmos, interfaces y metodologías son propiedad del Prestador. Se prohíbe su reproducción, redistribución, ingeniería inversa o modificación sin consentimiento por escrito. El Cliente conserva la propiedad del contenido generado.</p>

              <p><strong>OCTAVA. Uso Indebido y Suspensión</strong></p>
              <p>El Prestador podrá suspender el servicio si detecta un uso contrario a la ley, a la buena fe o a estos términos.</p>

              <p><strong>NOVENA. Terminación Anticipada y Sin Reembolso</strong></p>
              <ul className="list-disc list-inside">
                <li>Incumplimiento de pago.</li>
                <li>Uso indebido, abusivo, ilegal o contrario a las buenas prácticas.</li>
                <li>Manipulación del sistema o ingeniería inversa.</li>
                <li>Cualquier acto u omisión que represente un riesgo o uso contrario al objeto del servicio.</li>
              </ul>
              <p>La terminación no exime al Cliente de cubrir adeudos pendientes.</p>

              <p><strong>DÉCIMA. Confidencialidad y Datos Personales</strong></p>
              <p>Ambas partes se obligan a mantener la confidencialidad sobre la información intercambiada. Los datos personales serán tratados conforme al <a href="https://iactiva.ai/privacy" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Aviso de Privacidad</a>.</p>

              <p><strong>DÉCIMA PRIMERA. Jurisdicción y Ley Aplicable</strong></p>
              <p>Este contrato se regirá por las leyes de los Estados Unidos Mexicanos. Las partes se someten a los tribunales de la Ciudad de México. Consulta el contrato completo en   <button
                          type="button"
                          onClick={() => router.push('/contract')}
                          className="underline text-blue-600"
                        >
                          contrato
                        </button>
                        </p>                        
            </div>

            <hr className="my-4" />

            <h3 className="font-bold">AVISO DE PRIVACIDAD</h3>
            <p><strong>Última actualización:</strong> 20 de septiembre de 2024</p>
            <p><strong>Responsable:</strong> José Díaz Jiménez, titular de iActiva y GAC, con domicilio en Priv. de Rélox 30, Col. San Ángel, Álvaro Obregón 01070, Ciudad de México.</p>
            <p><strong>1. Datos personales que recabamos:</strong></p>
            <ul className="list-disc list-inside">
              <li>Identificación (nombre, apellidos, correo, teléfono, dirección, RFC, CURP).</li>
              <li>Información financiera.</li>
              <li>Datos sensibles (si son necesarios).</li>
            </ul>
            <p><strong>2. Finalidades del tratamiento:</strong></p>
            <ul className="list-disc list-inside">
              <li>Prestación de servicios, facturación, soporte técnico.</li>
              <li>Envío de promociones y estudios de mercado.</li>
              <li>Cumplimiento de obligaciones legales.</li>
            </ul>
            <p><strong>3. Derechos ARCO:</strong> Solicitar a <a href="mailto:info@iactiva.ai" className="underline text-blue-600">info@iactiva.ai</a>.</p>
            <p><strong>4. Transferencias:</strong> Solo por obligación legal o defensa de derechos.</p>
            <p><strong>5. Limitar uso o divulgación:</strong> Por correo. También pueden inscribirse al Registro Público de Usuarios.</p>
            <p><strong>6. Seguridad:</strong> Medidas administrativas, físicas y tecnológicas razonables.</p>
            <p><strong>7. Cambios al aviso:</strong> Publicados en <a href="https://iactiva.ai/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">https://iactiva.ai/</a>.</p>
            <p><strong>8. Consentimiento:</strong> El uso del sitio implica consentimiento conforme a este aviso.</p>
            <p><strong>9. Contacto:</strong> <a href="mailto:info@iactiva.ai" className="underline text-blue-600">info@iactiva.ai</a> | +52 55 2 3311 069</p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
