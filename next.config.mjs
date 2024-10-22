import { NextConfig } from 'next';

/** @type {NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.io', 'drive.google.com'],
  },
};

export default nextConfig;