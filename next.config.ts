import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   typescript: {
    // Ignorar errores de TypeScript en la build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
