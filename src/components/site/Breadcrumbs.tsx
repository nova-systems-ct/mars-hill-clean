import { Link } from "react-router-dom";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", to: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-5xl px-6 lg:px-10">
      <ol className="flex flex-wrap items-center gap-2 py-4 text-xs uppercase tracking-[0.14em] text-slate-500">
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-gold">/</span>}
            {c.to && i < all.length - 1 ? (
              <Link to={c.to} className="transition hover:text-gold">{c.label}</Link>
            ) : (
              <span className="text-navy">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
