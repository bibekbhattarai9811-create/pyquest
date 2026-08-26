import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Prisma's engine out of the bundler; load it as a normal Node module.
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
};

export default nextConfig;
