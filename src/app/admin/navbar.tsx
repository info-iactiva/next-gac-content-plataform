"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // Aquí podrías limpiar tokens, cookies o localStorage si quieres
    localStorage.removeItem("token");  
    localStorage.removeItem("user");  
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Image
          className="w-1/3 sm:w-1/4 md:w-[120px]"
          src="/logos/logo.webp"
          alt="Logo"
          width={200}
          height={200}
        />

        {/* Menu desktop */}
        <ul className="hidden md:flex space-x-6 text-sm md:text-base font-medium items-center">
          <li>
            <Link href="/admin/gac" className="hover:text-blue-600 transition">
              GAC
            </Link>
          </li>
          <li>
            <Link href="/admin/reporte" className="hover:text-blue-600 transition">
              Reporte de datos
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>

        {/* Botón hamburguesa móvil */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* Icono hamburguesa simple */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              // Icono "X" para cerrar
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Icono hamburguesa
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col px-4 py-2 space-y-2 text-sm font-medium">
            <li>
              <Link
                href="/admin/gac"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-blue-600 transition"
              >
                GAC
              </Link>
            </li>
            <li>
              <Link
                href="/admin/reporte"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-blue-600 transition"
              >
                Reporte de datos
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-left"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
