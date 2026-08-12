import type { Metadata } from "next";
import { Cairo } from "next/font/google";

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  variable: '--font-cairo',
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

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params; 

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${cairo.variable} bg-[#FAFAFA] antialiased`}>
        {children}
      </body>
    </html>
  );
}