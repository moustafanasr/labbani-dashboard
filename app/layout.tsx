// app/layout.tsx
import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Labbani | Login",
  description: "Labbani restaurant branch management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body 
        className={`${cairo.variable} ${inter.variable} font-body antialiased`}
        suppressHydrationWarning // ✅ أضف هذا السطر
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}