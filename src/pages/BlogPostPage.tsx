import { Link, useParams } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageMeta } from "@/components/site/PageMeta";
import { useContent } from "@/context/ContentContext";
import { slugify } from "@/lib/utils";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts, loading } = useContent();

  const post = blogPosts.find((p) => slugify(p.title) === slug);

  if (loading) {
    return (
      <main className="relative min-h-screen bg-background text-foreground">
        <Nav />
        <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 lg:px-10">
          <div className="space-y-4">
            <div className="h-8 w-32 animate-pulse rounded-full bg-sky/30" />
            <div className="h-12 w-full animate-pulse rounded-2xl bg-sky/30" />
            <div className="h-64 w-full animate-pulse rounded-2xl bg-sky/30" />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="relative min-h-screen bg-background text-foreground">
        <PageMeta title="Post Not Found" description="This article could not be found." />
        <Nav />
        <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center lg:px-10">
          <h1 className="font-display text-4xl text-navy">Post not found.</h1>
          <p className="mt-4 text-slate-ink">This article may have been moved or deleted.</p>
          <Link to="/blog" className="mt-8 inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <PageMeta
        title={post.title}
        description={post.summary}
        path={`/blog/${slug}`}
      />
      <Nav />

      {/* Hero */}
      <section className="heaven-bg pt-40 pb-12 lg:pt-48">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">
            ← Blog
          </Link>
          <div className="mt-8">
            <p className="eyebrow text-gold">{post.category}</p>
            <h1 className="mt-4 font-display text-4xl font-light leading-[1.02] text-navy sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm uppercase tracking-[0.22em] text-slate-ink">{post.date_text}</p>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.image_url && (
        <div className="mx-auto max-w-3xl px-6 py-8 lg:px-10">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full rounded-3xl object-cover shadow-[var(--shadow-luxe)]"
            style={{ maxHeight: 480 }}
          />
        </div>
      )}

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-6 pb-24 lg:px-10">
        {/* Summary / lede */}
        <p className="mt-8 text-xl leading-relaxed text-slate-ink font-light">
          {post.summary}
        </p>

        {/* Gold divider */}
        <div className="gold-rule my-10 max-w-[6rem]" />

        {/* Full content */}
        {post.content ? (
          <div className="prose-article space-y-6 text-base leading-relaxed text-slate-ink">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        ) : (
          <p className="text-slate-ink/60 italic">Full article coming soon.</p>
        )}

        {/* Footer nav */}
        <div className="mt-16 flex items-center justify-between border-t border-border pt-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">
            ← All posts
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-navy hover:text-gold">
            Write to us →
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
