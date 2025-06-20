import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export const TermsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
          <DialogTitle className="text-xl font-bold mb-4">
            Términos y Condiciones
          </DialogTitle>

          <div className="text-sm text-gray-700 space-y-3">
            <p><strong>Fecha de última actualización:</strong> 20 de septiembre de 2024</p>
            <p>Los presentes Términos y Condiciones regulan el uso de los servicios prestados por José Díaz Jiménez ("el Prestador") a través del Generador Automático de Contenido (GAC) y sus marcas asociadas, incluyendo iActiva.</p>
            <p>El usuario que active una cuenta, realice una publicación o use cualquier funcionalidad del servicio, acepta quedar legalmente vinculado por el contrato marco disponible en esta misma página.</p>
            <ol className="list-decimal list-inside">
              <li><strong>Naturaleza del Servicio:</strong> El GAC genera texto basado en parámetros definidos por el usuario, mediante tecnologías de inteligencia artificial. No incluye la generación de imágenes, videos u otro tipo de contenido multimedia.</li>
              <li><strong>Paquetes Disponibles:</strong> El uso del GAC se encuentra sujeto a los paquetes seleccionados, cuyas condiciones comerciales (precio, funcionalidades, límites, IA usada) están disponibles públicamente y forman parte del contrato marco.</li>
              <li><strong>Responsabilidades del Cliente:</strong> El Cliente es el único responsable por el uso que dé al contenido generado, incluyendo su difusión, interpretación o consecuencias derivadas de su uso.</li>
              <li><strong>Límites del Servicio:</strong> El Prestador no se hace responsable por errores, interrupciones o alucinaciones derivadas del modelo de IA, ni por problemas derivados de servicios de terceros (nube, plataformas, etc.).</li>
              <li><strong>Propiedad Intelectual:</strong> Los desarrollos y tecnologías empleadas por el GAC son propiedad del Prestador. Se prohíbe su uso no autorizado, ingeniería inversa, copia o sublicenciamiento. El contenido generado es propiedad del Cliente.</li>
              <li><strong>Jurisdicción:</strong> Para todos los efectos legales, las partes se someten a las leyes de los Estados Unidos Mexicanos y a los tribunales competentes de la Ciudad de México.</li>
            </ol>
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
