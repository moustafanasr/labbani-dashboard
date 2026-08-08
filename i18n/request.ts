// i18n/request.ts
import { getRequestConfig } from "next-intl/server";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // ✅ تأكد من وجود locale واستخدامه
  const activeLocale = locale || "ar";
  
  return {
    locale: activeLocale,
    messages: (await import(`../messages/${activeLocale}.json`)).default,
  };
});