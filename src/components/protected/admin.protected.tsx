"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProtected } from "@/types/user.protected";

export function AdminProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProtected | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

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

  if (!user || !user.is_active || user.rol !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
        <div className="bg-white shadow-md rounded-2xl p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Acceso denegado
          </h2>
          <p className="text-gray-700 mb-4">
            No tienes permisos para ver esta página. Solo los administradores pueden acceder.
          </p>
          <button
            onClick={handleReturnToLogin}
            className="bg-red-600 text-white w-full sm:w-auto px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Volver al login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
