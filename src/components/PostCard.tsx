// components/PostCard.tsx
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

interface PostCardProps {
  title: string;
  network: string;
  content: string;
  onCopy: () => void;
}

export function PostCard({ title, network, content, onCopy }: PostCardProps) {
  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardHeader className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{network}</p>
      </CardHeader>
      <CardBody className="space-y-4">
        <p className="text-sm whitespace-pre-wrap text-muted-foreground">
          {content}
        </p>
        <Button onPress={onCopy} size="sm" className="w-full">
          Copiar contenido
        </Button>
      </CardBody>
    </Card>
  );
}
