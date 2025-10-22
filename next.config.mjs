/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.kreezalid.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;
