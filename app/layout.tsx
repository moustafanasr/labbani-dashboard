import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  variable: '--font-cairo', // تأكد من تعريف المتغير هنا
});

export const metadata: Metadata = {
  title: "مطعم لبني - لوحة التحكم",
  description: "نظام إدارة المطعم والفروع",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: "no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // لا نضع <html> أو <body> هنا، فقط نعيد الأطفال مع إضافة الكلاس
    // ملاحظة: لو بتستخدم Next.js 15، ممكن تحتاج تلف الأطفال بـ Providers
    <Providers>
      {children}
    </Providers>
  );
}