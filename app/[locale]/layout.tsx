// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  const validLocales = ["ar", "en"];
  if (!validLocales.includes(locale)) {
    redirect("/ar");
  }

  // ✅ استخدم getMessages للحصول على الرسائل
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}