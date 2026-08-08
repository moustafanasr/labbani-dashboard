// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ✅ أضف هذا بشكل صحيح
  allowedDevOrigins: ['192.168.1.5', 'localhost', '*.local-origin.dev'],
};

export default withNextIntl(nextConfig);