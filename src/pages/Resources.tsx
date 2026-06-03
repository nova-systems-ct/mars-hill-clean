import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageMeta } from "@/components/site/PageMeta";

const essentials = [
  { title: "Institutes of the Christian Religion", author: "John Calvin", note: "The cornerstone of Reformed systematic theology.", url: "https://www.amazon.com/s?k=Institutes+Christian+Religion+Calvin" },
  { title: "The Bondage of the Will", author: "Martin Luther", note: "The hinge of the Reformation — grace, will, and Scripture.", url: "https://www.amazon.com/s?k=Bondage+of+the+Will+Luther" },
  { title: "Christianity and Liberalism", author: "J. Gresham Machen", note: "A bracing defense of historic Christian faith.", url: "https://www.amazon.com/s?k=Christianity+and+Liberalism+Machen" },
  { title: "The Religious Affections", author: "Jonathan Edwards", note: "On the marks of true gracious affection in the soul.", url: "https://www.amazon.com/s?k=Religious+Affections+Jonathan+Edwards" },
  { title: "Mere Christianity", author: "C. S. Lewis", note: "A masterwork of accessible Christian apologetics.", url: "https://www.amazon.com/s?k=Mere+Christianity+CS+Lewis" },
  { title: "The Reason for God", author: "Timothy Keller", note: "Modern apologetics for the skeptical and seeking.", url: "https://www.amazon.com/s?k=The+Reason+for+God+Keller" },
];

const sites = [
  { name: "Stand to Reason", url: "https://www.str.org", tag: "Apologetics" },
  { name: "Ligonier Ministries", url: "https://www.ligonier.org", tag: "Reformed Teaching" },
  { name: "The Gospel Coalition", url: "https://www.thegospelcoalition.org", tag: "Theology" },
  { name: "Desiring God", url: "https://www.desiringgod.org", tag: "Devotional" },
];

export default function ResourcesPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <PageMeta
        title="Resources — Mars Hill Apologetics"
        description="Curated volumes and trusted ministries to equip believers in theology, philosophy, apologetics, and the life of the mind."
        path="/resources"
      />
      <Nav />

      <section className="relative overflow-hidden heaven-bg pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">Resources & Library</p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            A library for those
            <span className="italic text-gold"> who would think deeply.</span>
          </h1>
          <div className="gold-rule mx-auto my-8 max-w-[8rem]" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-ink">
            Curated volumes and trusted ministries to equip believers in
            theology, philosophy, apologetics, and the life of the mind.
          </p>
        </div>
      </section>

      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Essential Reading</p>
              <h2 className="mt-4 font-display text-4xl font-light text-navy sm:text-5xl">
                The shelf we
                <span className="italic text-gold"> recommend.</span>
              </h2>
            </div>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {essentials.map((b) => (
              <li key={b.title}>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-3xl border border-border bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-luxe)]"
                >
                  <p className="eyebrow text-gold">{b.author}</p>
                  <h3 className="mt-3 flex-1 font-display text-2xl font-light leading-snug text-navy group-hover:text-gold transition-colors">
                    {b.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-ink">
                    {b.note}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-navy transition group-hover:text-gold">
                    Find on Amazon →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative bg-sky/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Trusted Ministries</p>
          <h2 className="mt-4 font-display text-4xl font-light text-navy sm:text-5xl">
            External
            <span className="italic text-gold"> companions.</span>
          </h2>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {sites.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-white px-7 py-6 transition hover:border-gold hover:bg-cloud"
                >
                  <div>
                    <p className="font-display text-xl text-navy">{s.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-ink">
                      {s.tag}
                    </p>
                  </div>
                  <span className="text-slate-ink transition group-hover:translate-x-1 group-hover:text-gold">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
