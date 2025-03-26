import { Input, Textarea } from "@heroui/input";
import { ContentInputValues } from "@/types/content";

interface FormFieldsProps {
  values: ContentInputValues;
  isLoading: boolean;
  onChange: (key: keyof ContentInputValues, value: string) => void;
}

export function FormFields({ values, isLoading, onChange }: FormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="url" className="text-sm font-medium">
          Liga de noticia (opcional)
        </label>
        <Input
          id="url"
          type="url"
          placeholder="https://ejemplo.com/noticia"
          value={values.url}
          onChange={(e) => onChange("url", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="topic" className="text-sm font-medium">
          O escribe un tema
        </label>
        <Textarea
          id="topic"
          placeholder="Escribe aquí el tema sobre el que quieres generar contenido"
          value={values.topic}
          onChange={(e) => onChange("topic", e.target.value)}
          disabled={isLoading}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="focus" className="text-sm font-medium">
          Enfoque (voz de autoridad)
        </label>
        <Input
          id="focus"
          placeholder="Ej. experto en medicina, química, etc."
          value={values.focus}
          onChange={(e) => onChange("focus", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="buyerPersona" className="text-sm font-medium">
          Buyer Persona
        </label>
        <Textarea
          id="buyerPersona"
          placeholder="Describe el segmento social, industria, puesto, etc."
          value={values.buyerPersona}
          onChange={(e) => onChange("buyerPersona", e.target.value)}
          disabled={isLoading}
          className="min-h-[100px]"
        />
      </div>
    </>
  );
}
