import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useContent } from "@/context/ContentContext";

export default function BlogPage() {
  const { blogPosts, loading } = useContent();
  const [featured, ...rest] = blogPosts;

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />

      <section className="heaven-bg pt-40 pb-16 lg:pt-48">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">Field Notes</p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            The<span className="italic text-gold"> Blog.</span>
          </h1>
          <div className="gold-rule mx-auto my-8 max-w-[8rem]" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-ink">
            Brief reflections on theology, philosophy, apologetics, and the
            care of the church — from the desk of John Leonetti.
          </p>
        </div>
      </section>

      {loading ? (
        <section className="py-16">
          <div className="mx-auto max-w-7xl space-y-6 px-6 lg:px-10">
            {[1, 2].map((i) => <div key={i} className="h-56 animate-pulse rounded-3xl bg-sky/30" />)}
          </div>
        </section>
      ) : featured ? (
        <>
          {/* Featured post */}
          <section className="py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <article className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
                {featured.image_url && (
                  <div className="relative h-72 w-full overflow-hidden lg:h-96">
                    <img src={featured.image_url} alt={featured.title}
                      className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    <span className="absolute bottom-4 left-6 text-xs font-medium uppercase tracking-[0.24em] text-gold">
                      {featured.category}
                    </span>
                  </div>
                )}
                <div className="grid gap-10 p-10 lg:grid-cols-12 lg:p-14">
                  <div className="lg:col-span-3">
                    <p className="eyebrow text-gold">Featured</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-ink">{featured.date_text}</p>
                  </div>
                  <div className="lg:col-span-9">
                    {!featured.image_url && (
                      <p className="text-xs uppercase tracking-[0.24em] text-gold">{featured.category}</p>
                    )}
                    <h2 className="mt-3 font-display text-4xl font-light leading-tight text-navy sm:text-5xl">{featured.title}</h2>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-ink">{featured.summary}</p>
                    {featured.content && (
                      <div className="mt-8 max-w-2xl whitespace-pre-wrap text-base leading-relaxed text-slate-ink">
                        {featured.content}
                      </div>
                    )}
                    <Link to="/contact" className="mt-8 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-navy hover:text-gold">
                      Get in touch <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* Grid */}
          {rest.length > 0 && (
            <section className="pb-24">
              <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <li key={p.id}>
                      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-luxe)]">
                        {p.image_url ? (
                          <div className="relative h-44 w-full overflow-hidden">
                            <img src={p.image_url} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                        ) : (
                          <div className="h-2 w-full bg-gradient-to-r from-gold/40 via-gold to-gold/40" />
                        )}
                        <div className="flex flex-1 flex-col p-7">
                          <p className="text-[10px] uppercase tracking-[0.24em] text-gold">{p.category}</p>
                          <h3 className="mt-3 font-display text-2xl leading-snug text-navy">{p.title}</h3>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-ink">{p.summary}</p>
                          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs uppercase tracking-[0.2em] text-slate-ink">
                            <span>{p.date_text}</span>
                            <span className="text-navy transition group-hover:text-gold">Read →</span>
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="py-24 text-center text-slate-ink">No posts yet.</section>
      )}

      <Footer />
    </main>
  );
}
