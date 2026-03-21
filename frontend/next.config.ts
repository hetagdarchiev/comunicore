import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://comunicore.mooo.com*',
      },
    ];
  },
};

export default nextConfig;
