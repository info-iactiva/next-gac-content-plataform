// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export function Protected({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (!storedToken) {
//       router.replace("/login");
//     } else {
//       setToken(storedToken);
//     }
//     setLoading(false);
//   }, [router]);

//   if (loading) {
//     return  <div className="flex items-center justify-center min-h-screen">
//     <p>Cargando...</p>
//   </div>
//   }

//   if (!token) {
//     // Si no hay token, ya se hizo el router.replace en useEffect, solo no renderizamos nada
//     return null;
//   }

//   return <>{children}</>;
// }


// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { UserProtected } from "@/types/user.protected";

// export function Protected({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [user, setUser] = useState<UserProtected | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     // Si no hay token, redirige
//     if (!token) {
//       router.replace("/login");
//       return;
//     }

//     // Si hay token, intentamos obtener y parsear el usuario
//     if (storedUser) {
//       try {
//         const parsedUser: UserProtected = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error("Error al parsear el usuario:", error);
//       }
//     }

//     setLoading(false);
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p>Cargando...</p>
//       </div>
//     );
//   }

//   if (user && !user.is_active) {
//     return (      
//       <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
//         <div className="bg-white shadow-md rounded-2xl p-6 max-w-md w-full text-center">
//           <h2 className="text-xl font-semibold text-red-600 mb-2">
//             Cuenta Inactiva
//           </h2>
//           <p className="text-gray-700">
//             Tu cuenta está inactiva. Por favor contacta al siguiente correo: info@activa.ai
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }


"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProtected } from "@/types/user.protected";

export function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProtected | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
      console.log(storedUser)
    if (!token) {
      router.replace("/login");
      return;
    }

    if (storedUser) {
      try {
        const parsedUser: UserProtected = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error al parsear el usuario:", error);
      }
    }

    setLoading(false);
  }, [router]);

  const handleReturnToLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  if (user && !user.is_active) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
        <div className="bg-white shadow-md rounded-2xl p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Cuenta inactiva
          </h2>
          <p className="text-gray-700 mb-4">
            Tu cuenta está inactiva. Por favor contacta al administrador para más información.
          </p>
          <button
            onClick={handleReturnToLogin}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Volver al login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
