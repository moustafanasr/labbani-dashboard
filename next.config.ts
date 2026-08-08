import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ✅ مهم جداً: نعرف Vercel إن في لغتين عشان يبني الصفحات
  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "ar",
    localeDetection: true,
  },
  allowedDevOrigins: ['192.168.1.5', 'localhost', '*.local-origin.dev'],
};

export default withNextIntl(nextConfig);