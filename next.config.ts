import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Load these as normal Node modules instead of bundling them.
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-neon",
    "@neondatabase/serverless",
    "bcryptjs",
    "ws",
  ],
};

export default nextConfig;
