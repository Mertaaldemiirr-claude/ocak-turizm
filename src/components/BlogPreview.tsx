"use client";

import Image from "next/image";
import type { BlogPost } from "@/sanity/lib/types";
import { useTranslation, useLocalePath } from "./LocaleProvider";

interface Props {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: Props) {
  const { dict, locale } = useTranslation();
  const t = dict.blogPreview;
  const lp = useLocalePath();

  if (!posts || posts.length === 0) return null;

  const displayPosts = posts.slice(0, 3);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-2">
            {t.title}
          </h2>
          <p className="text-gray-500 text-sm">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayPosts.map((post) => (
            <a
              key={post._id}
              href={lp(`/blog/${post.slug.current}`)}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <div className="relative h-48 bg-gray-100">
                {post.coverImageUrl ? (
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}
                {post.category && (
                  <span className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                )}
              </div>

              <div className="p-5">
                <p className="text-gray-400 text-xs mb-2">
                  {new Date(post.publishedAt).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="font-heading font-semibold text-primary text-sm mb-2 group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-3">
                    {post.excerpt}
                  </p>
                )}
                <span className="text-gold text-xs font-semibold group-hover:underline">
                  {t.readMore} &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={lp("/blog")}
            className="inline-block border border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            {t.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
}
