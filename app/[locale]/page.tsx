// app/[locale]/page.tsx
import { redirect } from "next/navigation";

export default function LocalePage() {
  redirect("/ar/login");
}