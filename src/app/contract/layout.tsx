'use client';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="lg:min-w-[1000px] lg:max-w-4xl relative md:min-w-[650px] md:max-w-2xl min-w-[350px]">
        <div className="relative flex flex-col items-center p-0">
          <img className="w-[30%]" src="/logos/gacLogo.jpg" alt="" />
          <img
            className="absolute top-2 left-5 w-[15%]"
            src="/logos/logo.webp"
            alt=""
          />        

        <button
            type="button"
            onClick={() => router.push('/')}
            className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
            Regresar
        </button>

          {children}
        </div>
      </div>
    </div>
  );
}