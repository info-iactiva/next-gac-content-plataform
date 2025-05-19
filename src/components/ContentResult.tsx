import { Button } from "./ui/button";

type ContentResultProps = {
    posts: {
        title: string;
        network: string;
        content: string;
        error?: boolean;
    }[];
    onBack: () => void;
};

export default function ContentResult({ posts, onBack }: ContentResultProps) {
    return (
        <div className="w-full max-w-6xl">
            {posts.map((post, i) => (
                <div key={`${post.network}-${i}`} className="mb-4 p-4 border rounded-md">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-500">{post.network}</p>
                    <p className="mt-2">{post.content}</p>
                    {post.error && <p className="text-red-500">Error: {post.error}</p>}
                    <Button
                        variant="outline"
                        className="mt-2 text-blue-500 hover:underline"
                        onClick={() => navigator.clipboard.writeText(post.title + "\n" + post.content)}
                    >
                        Copiar contenido
                    </Button>
                </div>
            ))}
            <div className="flex justify-end">
                <Button
                    onClick={onBack}
                >
                    Volver
                </Button>
            </div>
        </div>
    );
}
