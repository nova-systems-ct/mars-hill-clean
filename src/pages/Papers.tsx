import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Papers } from "@/components/site/Papers";
import { PageMeta } from "@/components/site/PageMeta";
import { CommentSection } from "@/components/site/CommentSection";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export default function PapersPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <PageMeta
        title="Seminary Papers/Publications — Mars Hill Apologetics"
        description="A working archive of graduate-level theological writing and published articles by John Leonetti — open to the church, freely given for study, prayer, and conversation."
        path="/papers"
      />
      <Nav />
      {/* Heaven-bg header */}
      <section className="heaven-bg pt-36 pb-14 lg:pt-44">
        <Breadcrumbs items={[{ label: "Seminary Papers / Publications" }]} />
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">Open Access</p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            Seminary Papers<span className="italic text-gold"> / Publications.</span>
          </h1>
          <div className="gold-rule mx-auto my-7 max-w-[8rem]" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
            Graduate-level theological writing and peer-reviewed publications — open to the church, freely given for study, prayer, and conversation.
          </p>
        </div>
      </section>
      {/* Published Articles */}
      <section className="bg-sky/10 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Peer-Reviewed</p>
          <h2 className="mt-3 font-display text-3xl font-light text-navy sm:text-4xl">
            Published<span className="italic text-gold"> Articles.</span>
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://doi.org/10.55221/2572-7478.2469"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy">
                  Peer-Reviewed
                </span>
                <span className="font-display text-xs text-slate-400">2024</span>
              </div>
              <h3 className="mt-5 font-display text-xl leading-tight text-navy">Published Journal Article</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                A peer-reviewed article published in an academic theological journal. Follow the link to read the full publication.
              </p>
              <div className="mt-7 border-t border-slate-100 pt-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition group-hover:bg-gold group-hover:text-navy">
                  Read Article →
                </span>
                <p className="mt-2 break-all text-[10px] text-slate-400">doi.org/10.55221/2572-7478.2469</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      <Papers />
      <CommentSection pageSlug="papers" pageTitle="Seminary Papers / Publications" />
      <Footer />
    </main>
  );
}
