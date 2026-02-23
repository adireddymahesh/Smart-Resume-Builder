import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: '/Smart-Resume-Builder',
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ["pdf-parse"], // Keeping this for now just in case, though unused
};

export default nextConfig;
