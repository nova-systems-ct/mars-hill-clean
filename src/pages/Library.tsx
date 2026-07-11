import { useMemo, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageMeta } from "@/components/site/PageMeta";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useContent } from "@/context/ContentContext";

const eras = ["All", "Patristic", "Reformation", "Puritan", "Modern", "Apologetics"] as const;

function amazonUrl(title: string, author: string): string {
  return `https://www.amazon.com/s?k=${encodeURIComponent(`${title} ${author}`)}`;
}

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
    <main className="relative min-h-screen bg-white text-foreground">
      <PageMeta
        title="Library — Mars Hill Apologetics"
        description="A working bibliography drawn from the Patristics, the Reformers, the Puritans, and the modern apologists."
        path="/library"
      />
      <Nav />

      <section className="heaven-bg pt-36 pb-14 lg:pt-44">
        <Breadcrumbs items={[{ label: "Library" }]} />
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">The Library</p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            Books that shape
            <span className="italic text-gold"> the believing mind.</span>
          </h1>
          <div className="gold-rule mx-auto my-7 max-w-[8rem]" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
            A working bibliography drawn from the Patristics, the Reformers,
            the Puritans, and the modern apologists — read alongside Scripture.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {eras.map((e) => (
                <button
                  key={e}
                  onClick={() => setEra(e)}
                  className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                    era === e
                      ? "border-navy bg-navy text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-gold hover:text-navy"
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
              className="w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-gold focus:outline-none lg:w-80"
            />
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((b, idx) => {
              const href = b.link_url || amazonUrl(b.title, b.author);
              return (
                <li key={idx}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
                  >
                    {/* Cover image or placeholder */}
                    {b.cover_url ? (
                      <div className="relative h-52 w-full overflow-hidden bg-sky/10">
                        <img
                          src={b.cover_url}
                          alt={`Cover of ${b.title}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-navy/90 to-navy px-6 py-8 text-center">
                        <p className="font-display text-base font-light italic leading-snug text-white/90">
                          {b.title}
                        </p>
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-sky/60 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-navy">
                          {b.era}
                        </span>
                        <span className="font-display text-xs text-slate-400">{b.year}</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg leading-snug text-navy group-hover:text-gold transition-colors">
                        {b.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                        {b.author}
                      </p>
                      {b.note && (
                        <p className="mt-3 flex-1 text-xs leading-relaxed text-slate-500">
                          {b.note}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-1 border-t border-slate-100 pt-3">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-navy/70 transition group-hover:text-gold">
                          Find on Amazon →
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>

          {books.length === 0 && (
            <p className="mt-16 text-center text-sm text-slate-500 italic">
              Library coming soon.
            </p>
          )}

          {books.length > 0 && list.length === 0 && (
            <p className="mt-16 text-center text-sm text-slate-500">
              No volumes match that search.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
