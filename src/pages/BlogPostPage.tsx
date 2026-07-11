import { Link, useParams } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageMeta } from "@/components/site/PageMeta";
import { CommentSection } from "@/components/site/CommentSection";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useContent } from "@/context/ContentContext";
import { slugify } from "@/lib/utils";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts, loading } = useContent();

  const post = blogPosts.find((p) => slugify(p.title) === slug);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Nav />
        <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 lg:px-10">
          <div className="space-y-4 animate-pulse">
            <div className="h-5 w-24 rounded-full bg-sky/30" />
            <div className="h-12 w-full rounded-xl bg-sky/30" />
            <div className="h-4 w-48 rounded-full bg-sky/20" />
            <div className="h-64 w-full rounded-2xl bg-sky/20" />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <PageMeta title="Post Not Found" description="This article could not be found." />
        <Nav />
        <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center lg:px-10">
          <h1 className="font-display text-4xl text-navy">Post not found.</h1>
          <p className="mt-4 text-slate-600">This article may have been moved or deleted.</p>
          <Link to="/blog" className="mt-8 inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-navy">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <PageMeta title={post.title} description={post.summary} path={`/blog/${slug}`} />
      <Nav />

      {/* Header */}
      <section className="heaven-bg pt-36 pb-10 lg:pt-44">
        <Breadcrumbs items={[{ label: "Blog", to: "/blog" }, { label: post.title }]} />
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-navy transition">
            ← Blog
          </Link>
          <div className="mt-7">
            <p className="eyebrow text-gold">{post.category}</p>
            <h1 className="mt-3 font-display text-4xl font-light leading-[1.02] text-navy sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{post.date_text}</p>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.image_url && (
        <div className="mx-auto max-w-3xl px-6 py-6 lg:px-10">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full rounded-2xl object-cover shadow-lg"
            style={{ maxHeight: 460 }}
          />
        </div>
      )}

      {/* Article */}
      <article className="mx-auto max-w-3xl px-6 pb-20 lg:px-10">
        <p className="mt-6 text-xl font-light leading-relaxed text-slate-700">
          {post.summary}
        </p>

        <div className="gold-rule my-8 max-w-[5rem]" />

        {post.content ? (
          <div className="space-y-6 text-[17px] leading-[1.75] text-slate-700">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        ) : (
          <p className="italic text-slate-400">Full article coming soon.</p>
        )}

        <div className="mt-14 flex items-center justify-between border-t border-slate-200 pt-8">
          <Link to="/blog" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-navy transition">
            ← All posts
          </Link>
          <Link to="/contact" className="text-xs font-semibold uppercase tracking-[0.2em] text-navy hover:text-gold transition">
            Write to us →
          </Link>
        </div>
      </article>

      <CommentSection pageSlug={slug ?? ""} pageTitle={post.title} />

      <Footer />
    </main>
  );
}
