/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.kreezalid.com'],
  },
  typescript: {
    ignoreBuildErrors: true, // ⬅ povolí build i s typovými chybami
  },
  eslint: {
    ignoreDuringBuilds: true, // ⬅ povolí build i s eslint chybami
  },
};

export default nextConfig;
