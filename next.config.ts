import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongoose"],
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
