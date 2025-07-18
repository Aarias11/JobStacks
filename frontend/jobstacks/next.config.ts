import type { NextConfig } from "next";

const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://jobstacks.alanarias.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
