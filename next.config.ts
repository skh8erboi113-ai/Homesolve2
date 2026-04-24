import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  experimental: {
    allowedDevOrigins: [
      '6000-firebase-studio-1776493422877.cluster-id7eoc2eeze4orwbg4q7mtb36q.cloudworkstations.dev',
      '*.cloudworkstations.dev',
      '*.web.app',
      '*.firebaseapp.com'
    ]
  }
};

export default nextConfig;