import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "./dictionaries";
import { LocaleProvider } from "@/components/LocaleProvider";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <LocaleProvider locale={lang} dict={dict}>
      {children}
    </LocaleProvider>
  );
}
