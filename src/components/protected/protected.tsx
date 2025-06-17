"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.replace("/login");
    } else {
      setToken(storedToken);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return  <div className="flex items-center justify-center min-h-screen">
    <p>Cargando...</p>
  </div>
  }

  if (!token) {
    // Si no hay token, ya se hizo el router.replace en useEffect, solo no renderizamos nada
    return null;
  }

  return <>{children}</>;
}
