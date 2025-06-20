import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-white shadow-md">
      {/* Logo izquierda */}
      <div className="flex items-center">
        <Image
          src="/logos/logo.webp"
          alt="Logo"
          width={120}
          height={120}
          className="w-auto h-10 md:h-12 object-contain"
        />
      </div>

      {/* Logo derecha */}
      <div className="flex items-center">
        <Image
          src="/logos/gacLogo.jpg"
          alt="GAC Logo"
          width={120}
          height={120}
          className="w-auto h-10 md:h-12 object-contain"
        />
      </div>
    </nav>
  );
}
