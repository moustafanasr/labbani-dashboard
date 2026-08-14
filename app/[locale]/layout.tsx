import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from "@/components/providers";
import { Toaster } from 'sonner'; // ✅ استيراد Toaster

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
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${cairo.variable} bg-[#FAFAFA] antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {children}
            <Toaster position="top-center" richColors /> {/* ✅ إضافة Toaster */}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}