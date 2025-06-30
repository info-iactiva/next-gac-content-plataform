'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Navbar({children}: {children: React.ReactNode}) {
  const router = useRouter();


  return (
    <>
     <header className="bg-white text-gray-900 py-6 px-4 w-full shadow-md">
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
                
                {/* Logo */}
                <div className="flex justify-center lg:justify-start">
                  <Image
                    src="/logos/logo.webp"
                    alt="Logo izquierda"
                    width={80}
                    height={80}
                    className="h-10 md:h-12 w-auto object-contain"
                    priority
                  />
                </div>
    
                {/* Texto */}
                <div className="text-center lg:text-left max-w-2xl px-2">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    Conquista las redes sociales con el GAC de iActiva
                  </h1>
                  <p className="text-sm sm:text-base mt-1">
                    Genera contenido potente y profesional con ayuda de nuestra IA
                  </p>
                </div>
    
                {/* Botones */}
                <div className="flex justify-center lg:justify-end gap-2 sm:gap-3">
                  <button
                    onClick={() =>router.push('/login')}
                    className="bg-black text-white px-3 py-1 text-xs sm:text-sm sm:px-4 sm:py-2 rounded hover:bg-gray-800 transition"
                  >
                    Iniciar sesión
                  </button>                
                
                  <button
                    onClick={() =>router.push('/')}
                    className="bg-black text-white px-3 py-1 text-xs sm:text-sm sm:px-4 sm:py-2 rounded hover:bg-gray-800 transition"
                  >
                    Home
                  </button>
                </div>

              </div>
    </header>
    {children}
    </>
    
  );
}
