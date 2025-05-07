import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {},
  env: {
    PSI_API_KEY: process.env.PSI_API_KEY,
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default nextConfig;
