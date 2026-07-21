import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { blogPostQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import { getDictionary, type Locale } from "../../dictionaries";

const categoryLabels: Record<string, string> = {
  rehber: "Seyahat Rehberi",
  kultur: "Kultur",
  yemek: "Yemek",
  tavsiye: "Tavsiyeler",
  duyuru: "Duyurular",
};

const localeMap: Record<string, string> = {
  tr: "tr-TR",
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as Locale);
  const dateLocale = localeMap[lang] || "tr-TR";

  const [post, settings] = await Promise.all([
    client.fetch(blogPostQuery, { slug }),
    client.fetch(siteSettingsQuery),
  ]);

  if (!post) notFound();

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-4 py-16">
          <Link
            href={`/${lang}/blog`}
            className="text-primary hover:text-gold text-sm font-medium transition-colors mb-8 inline-block"
          >
            &larr; {dict.blogDetail.backToBlog}
          </Link>

          {post.category && (
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {categoryLabels[post.category] || post.category}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-4 leading-tight">
            {post.title}
          </h1>

          {post.publishedAt && (
            <p className="text-gray-400 text-sm mb-8">
              {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}

          {post.coverImageUrl && (
            <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          {post.body && (
            <div className="prose prose-sm sm:prose-base max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-gold">
              <PortableText value={post.body} />
            </div>
          )}
        </article>
      </main>
      <Footer settings={settings} />
    </>
  );
}
