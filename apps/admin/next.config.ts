import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@personal-app/ui', '@personal-app/api', '@personal-app/db'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;