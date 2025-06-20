import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export const PrivacyModal = ({
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
        <DialogPanel className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
          <DialogTitle className="text-xl font-bold mb-4">Aviso de Privacidad Simplificado</DialogTitle>

          <div className="text-sm text-gray-700 space-y-3">
            <p><strong>Responsable:</strong> José Díaz Jiménez, titular de las marcas iActiva y Generador Automático de Contenido (GAC), con domicilio en <span className="italic">__________</span>, CDMX.</p>
            <p><strong>Finalidades:</strong> Usaremos tu información para:</p>
            <ul className="list-disc list-inside">
              <li>Prestar los servicios solicitados.</li>
              <li>Contactarte para seguimiento y soporte.</li>
              <li>Emitir facturación y cobranza.</li>
            </ul>
            <p>
              Puedes ejercer tus derechos ARCO (acceso, rectificación, cancelación u oposición) mediante solicitud al correo:{" "}
              <a href="mailto:info@iactiva.ai" className="underline text-blue-600">info@iactiva.ai</a>.
            </p>
            <p>
              No compartimos tus datos sin tu consentimiento, salvo lo permitido por la ley. Consulta el aviso de privacidad completo{" "}
              <a href="https://iactiva.ai/privacy" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                aquí
              </a>.
            </p>
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
