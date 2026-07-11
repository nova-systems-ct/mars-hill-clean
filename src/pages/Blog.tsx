import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageMeta } from "@/components/site/PageMeta";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useContent } from "@/context/ContentContext";
import { slugify } from "@/lib/utils";

function PostCard({ post }: { post: ReturnType<typeof useContent>["blogPosts"][number] }) {
  const slug = slugify(post.title);
  return (
    <Link to={`/blog/${slug}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold/40">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sky/20">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-navy/90 to-navy p-8 text-center">
              <span className="eyebrow text-gold">{post.category}</span>
              <p className="mt-3 font-display text-xl font-light italic text-white leading-snug">{post.title}</p>
            </div>
          )}
          {/* Category badge */}
          {post.image_url && (
            <span className="absolute bottom-3 left-3 rounded-full bg-navy/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
              {post.category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{post.date_text}</p>
          <h3 className="mt-2 font-display text-xl font-normal leading-snug text-navy group-hover:text-gold transition-colors">
            {post.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
            {post.summary}
          </p>
          <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-navy transition group-hover:text-gold">
              Read →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const { blogPosts, loading } = useContent();

  return (
    <main className="min-h-screen bg-white text-foreground">
      <PageMeta
        title="Blog — Mars Hill Apologetics"
        description="Brief reflections on theology, philosophy, apologetics, and the care of the church — from the desk of John Leonetti."
        path="/blog"
      />
      <Nav />

      {/* Header */}
      <section className="heaven-bg pt-36 pb-12 lg:pt-44">
        <Breadcrumbs items={[{ label: "Blog" }]} />
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">Field Notes</p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            The<span className="italic text-gold"> Blog.</span>
          </h1>
          <div className="gold-rule mx-auto my-7 max-w-[8rem]" />
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-600">
            Reflections on theology, apologetics, and the life of the church — from the desk of John Leonetti.
          </p>
        </div>
      </section>

      {/* Feed */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-sky/30" />
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <p className="py-24 text-center text-slate-500">No posts yet — check back soon.</p>
          ) : (
            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
