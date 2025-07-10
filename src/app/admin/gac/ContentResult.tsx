import { Button } from "@/components/ui/button";

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

            <div className="flex justify-center items-center md:mb-3">                
                <span className="col-span-5 p-5 md:p-0 text-[10px] md:text-xs text-gray-500 text-center">
                    La inteligencia artificial se puede equivocar, es importante que un ser humano verifique el contenido generado
                </span>
            </div>


            {posts.map((post, i) => (
                <div key={`${post.network}-${i}`} className="mb-4 p-4 border rounded-md">
                    <h3 className=  "md:text-lg font-semibold text-sm">{post.title}</h3>
                    <p className="md:text-sm text-gray-500 text-xs">{post.network}</p>
                    <p className="mt-2 text-sm md:text-base">{post.content}</p>
                    {post.error && <p className="text-red-500">Error: {post.error}</p>}
                    <Button
                        variant="outline"
                        className="mt-2 text-blue-500 hover:underline text-xs md:text-base h-6 md:h-auto lg:mt-7 "
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
