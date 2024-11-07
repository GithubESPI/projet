import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Génère un build statique dans le dossier 'out'
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

export default nextConfig;
