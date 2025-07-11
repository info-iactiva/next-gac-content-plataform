import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   typescript: {
    // Ignorar errores de TypeScript en la build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora errores y warnings de ESLint en build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
