import { useMemo, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageMeta } from "@/components/site/PageMeta";
import { useContent } from "@/context/ContentContext";

const eras = ["All", "Patristic", "Reformation", "Puritan", "Modern", "Apologetics"] as const;

export default function LibraryPage() {
  const { books } = useContent();
  const [q, setQ] = useState("");
  const [era, setEra] = useState<(typeof eras)[number]>("All");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return books.filter(
      (b) =>
        (era === "All" || b.era === era) &&
        (!needle ||
          b.title.toLowerCase().includes(needle) ||
          b.author.toLowerCase().includes(needle)),
    );
  }, [books, q, era]);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <PageMeta
        title="Library — Mars Hill Apologetics"
        description="A working bibliography drawn from the Patristics, the Reformers, the Puritans, and the modern apologists."
        path="/library"
      />
      <Nav />

      <section className="heaven-bg pt-40 pb-16 lg:pt-48">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">The Library</p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            Books that shape
            <span className="italic text-gold"> the believing mind.</span>
          </h1>
          <div className="gold-rule mx-auto my-8 max-w-[8rem]" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-ink">
            A working bibliography drawn from the Patristics, the Reformers,
            the Puritans, and the modern apologists — read alongside Scripture.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {eras.map((e) => (
                <button
                  key={e}
                  onClick={() => setEra(e)}
                  className={`rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] transition ${
                    era === e
                      ? "border-navy bg-navy text-cloud"
                      : "border-border bg-white/60 text-slate-ink hover:border-gold hover:text-navy"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title or author…"
              className="w-full rounded-full border border-border bg-white/80 px-6 py-3.5 text-sm text-navy placeholder:text-slate-ink/60 focus:border-gold focus:outline-none lg:w-80"
            />
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((b, idx) => {
              const inner = (
                <div className="group flex h-full flex-col rounded-3xl border border-border bg-white shadow-soft transition hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-luxe)] overflow-hidden">
                  {b.cover_url && (
                    <div className="relative h-52 w-full overflow-hidden bg-sky/20">
                      <img
                        src={b.cover_url}
                        alt={`Cover of ${b.title}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-sky/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-navy">
                        {b.era}
                      </span>
                      <span className="font-display text-xs tracking-widest text-slate-ink/60">
                        {b.year}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl leading-snug text-navy">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold">
                      {b.author}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-ink">
                      {b.note}
                    </p>
                    {b.link_url && (
                      <div className="mt-6 border-t border-border pt-4">
                        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-navy transition group-hover:text-gold">
                          View Book →
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );

              return (
                <li key={idx}>
                  {b.link_url ? (
                    <a href={b.link_url} target="_blank" rel="noreferrer" className="block h-full">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>

          {list.length === 0 && (
            <p className="mt-16 text-center text-sm text-slate-ink">
              No volumes match that search.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
