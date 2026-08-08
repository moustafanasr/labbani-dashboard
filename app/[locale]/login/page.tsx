// app/[locale]/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Eye, EyeOff, Loader2, Mail, Lock, Languages } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("login");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const isRTL = locale === "ar";

  const toggleLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    router.push(`/${newLocale}/login`);
  };

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(t("error"));
        setBusy(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isAuthenticated", "true");

      toast.success(t("success"));
      router.push(`/${locale}/dashboard/branches`);
    } catch (error) {
      toast.error(t("genericError"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-white font-body"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-[490px] px-4">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-100 hover:bg-neutral-50 transition text-sm"
          >
            <Languages className="size-4" />
            <span>{locale === "ar" ? "English" : "العربية"}</span>
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="w-[133px] h-[110px] flex items-center justify-center bg-[#173f2c] rounded-2xl">
            <span className="text-white text-5xl font-bold">L</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1C1C1C] mb-2">
            {t("title")}
          </h2>
          <p className="text-[#666666] text-base">{t("subtitle")}</p>
        </div>

        {/* Form */}
        <form onSubmit={login} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-3">
            <label
              className={`font-typography-button text-text-primary block ${isRTL ? "text-right" : "text-left"}`}
            >
              {t("email")}
            </label>
            <div className="relative">
              <input
                name="email"
                type="email"
                defaultValue="admin@labbani.sa"
                className={`w-full h-[50px] px-4 ${
                  isRTL ? "pl-12 pr-4 text-right" : "pr-12 pl-4 text-left"
                } rounded-lg border border-neutral-100 bg-white focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition`}
                placeholder={t("emailPlaceholder")}
                required
              />
              <Mail
                className={`absolute top-1/2 -translate-y-1/2 size-5 text-neutral-400 ${
                  isRTL ? "left-4" : "right-4"
                }`}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-3">
            <label
              className={`font-typography-button text-text-primary block ${isRTL ? "text-right" : "text-left"}`}
            >
              {t("password")}
            </label>
            <div className="relative">
              <input
                name="password"
                type={show ? "text" : "password"}
                defaultValue="password"
                className={`w-full h-[50px] px-4 ${
                  isRTL ? "pl-12 pr-4 text-right" : "pr-12 pl-4 text-left"
                } rounded-lg border border-neutral-100 bg-white focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition`}
                placeholder={t("passwordPlaceholder")}
                required
                minLength={6}
              />
              <button
                type="button"
                aria-label="Toggle password"
                onClick={() => setShow(!show)}
                className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-700 transition ${
                  isRTL ? "left-4" : "right-4"
                }`}
              >
                {show ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div
            className={`flex items-center ${
              isRTL ? "flex-row-reverse" : "flex-row"
            } justify-between py-5`}
          >
            <button
              type="button"
              className={`font-typography-small text-primary-900 hover:underline ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("forgot")}
            </button>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-neutral-500 accent-primary-700"
              />
              <span className="font-typography-small text-text-secondary">
                {t("remember")}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            disabled={busy}
            className="w-full h-[40px] bg-primary-700 hover:bg-primary-800 text-white font-typography-button rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {busy ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t("loading")}
              </>
            ) : (
              t("submit")
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 rounded-lg bg-surface-secondary text-center">
          <p className="font-typography-small text-text-secondary">
            <span className="font-bold text-primary-700">{t("demo")}</span>{" "}
            admin@labbani.sa / password
          </p>
        </div>
      </div>
    </main>
  );
}
