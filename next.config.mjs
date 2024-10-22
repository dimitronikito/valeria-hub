/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.io', 'drive.google.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'valeriahub.com'],
      bodySizeLimit: '2mb'
    }
  },
  typescript: {
    ignoreBuildErrors: false
  }
};

export default nextConfig;