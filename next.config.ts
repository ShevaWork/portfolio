import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.thum.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.apiflash.com",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
