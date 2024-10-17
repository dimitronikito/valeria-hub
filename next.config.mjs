import next from 'next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.io', 'drive.google.com'], // Add any other domains you need
  },
};

export default nextConfig;
