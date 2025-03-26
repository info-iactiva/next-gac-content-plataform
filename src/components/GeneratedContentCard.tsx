import { Card, CardHeader, CardBody } from "@heroui/card";

interface GeneratedContentCardProps {
  content: string;
  onCopy?: () => void;
}

export function GeneratedContentCard({ content, onCopy }: GeneratedContentCardProps) {
  return (
    <Card className="w-full max-w-4xl p-6 shadow-lg mt-8">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Contenido Generado</h2>
        <button
          onClick={onCopy}
          className="text-sm text-blue-600 hover:underline"
        >
          Copiar
        </button>
      </CardHeader>
      <CardBody>
        <p className="whitespace-pre-wrap text-sm text-muted-foreground">
          {content}
        </p>
      </CardBody>
    </Card>
  );
}
