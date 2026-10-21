import { notFound, redirect } from "next/navigation";
import { Landing } from "@/components/landing";
import { isLocale } from "@/lib/i18n";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale !== "en") redirect("/");
  return <Landing />;
}
