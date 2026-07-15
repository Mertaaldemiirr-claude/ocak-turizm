import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { blogPostsQuery, siteSettingsQuery } from "@/sanity/lib/queries";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  coverImageUrl: string | null;
  excerpt: string | null;
  category: string | null;
  publishedAt: string | null;
}

const categoryLabels: Record<string, string> = {
  rehber: "Seyahat Rehberi",
  kultur: "Kultur",
  yemek: "Yemek",
  tavsiye: "Tavsiyeler",
  duyuru: "Duyurular",
};

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    client.fetch<BlogPost[]>(blogPostsQuery),
    client.fetch(siteSettingsQuery),
  ]);

  return (
    <>
      <Navbar settings={settings} />
      <main className="mt-[104px] min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-3">
              Blog
            </h1>
            <p className="text-gray-500 text-sm">
              Seyahat rehberleri, kultur yazilari ve tavsiyeler
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm">Henuz blog yazisi yok.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-100"
                >
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                    {post.category && (
                      <div className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {categoryLabels[post.category] || post.category}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="font-heading font-semibold text-primary text-base mb-2 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                    )}
                    {post.publishedAt && (
                      <p className="text-gray-400 text-xs">
                        {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
