import { useMemo, useState } from "react";
import { useContent } from "@/context/ContentContext";

const categories = ["All", "Doctrine", "World Religions", "Culture", "History", "Philosophy"] as const;

export function Papers() {
  const { papers } = useContent();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return papers.filter((p) => {
      const matchesCat = cat === "All" || p.category === cat;
      const q = query.trim().toLowerCase();
      const matchesQ = !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [papers, cat, query]);

  return (
    <section id="papers" className="relative heaven-bg py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">The Library</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] text-navy sm:text-5xl lg:text-6xl">
              Seminary<span className="italic text-gold"> Papers.</span>
            </h2>
            <p className="mt-6 text-lg text-slate-ink">
              A working archive of graduate-level theological writing — open to
              the church, freely given for study, prayer, and conversation.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the archive…"
              className="w-full rounded-full border border-border bg-white/80 px-6 py-3.5 text-sm text-navy placeholder:text-slate-ink/60 focus:border-gold focus:outline-none lg:w-80"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] transition ${cat === c ? "border-navy bg-navy text-cloud" : "border-border bg-white/60 text-slate-ink hover:border-gold hover:text-navy"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const card = (
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-luxe)]"
              >
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-sky/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-navy">{p.category}</span>
                  <span className="font-display text-xs tracking-widest text-slate-ink/60">{p.year}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl leading-tight text-navy">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-ink">{p.summary}</p>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-ink">PDF · A4</span>
                  <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-navy transition group-hover:text-gold">
                    Read paper <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </article>
            );

            return (
              <div key={p.id}>
                {p.pdf_link ? (
                  <a href={p.pdf_link} target="_blank" rel="noreferrer" className="block h-full">
                    {card}
                  </a>
                ) : (
                  card
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-slate-ink">No papers match that search.</p>
        )}
      </div>
    </section>
  );
}
