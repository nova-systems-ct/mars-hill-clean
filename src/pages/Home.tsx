import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Vision } from "@/components/site/Vision";
import { Footer } from "@/components/site/Footer";
import { PodcastPlayer } from "@/components/site/PodcastPlayer";
import { PageMeta } from "@/components/site/PageMeta";
import { useContent } from "@/context/ContentContext";
import founder from "@/assets/founder-new.jpg";
import tot from "@/assets/tot.jpg";

export default function Home() {
  const { papers, events, getSetting } = useContent();
  const featuredPapers = papers.slice(0, 3);
  const spotifyUrl = getSetting("spotify_url", "https://open.spotify.com/show/4xnDbJFrb1gpwHfyEabZoG");
  const spotifyShowId = spotifyUrl.includes("open.spotify.com/show/")
    ? spotifyUrl.split("open.spotify.com/show/")[1].split("?")[0]
    : "4xnDbJFrb1gpwHfyEabZoG";

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <PageMeta
        title="Mars Hill Apologetics — Defending Truth. Pursuing Wisdom."
        description="A Reformed apologetics ministry by John Leonetti — home of Theology on Tap, the Reformed Reference Podcast, and a seminary paper archive."
        path="/"
      />
      <Nav />
      <Hero />

      {/* ── About teaser ── */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-4">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-sky/50 blur-2xl" />
              <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-luxe)] ring-1 ring-navy/10">
                <img
                  src={founder}
                  alt="John Leonetti, founder of Mars Hill Apologetics"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-8">
            <p className="eyebrow">About the Founder</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] text-navy sm:text-5xl">
              A lifetime of contending
              <span className="italic text-gold"> for the faith.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-ink">
              John Leonetti has walked with Christ since 1985. Since 1987 he has
              devoted himself to Christian apologetics — answering doorbells,
              teaching Sunday school, and founding Theology on Tap in 2017. In
              2023 he completed his M.A. in Christian Apologetics at Biola
              University.
            </p>
            <div className="mt-10">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 rounded-full bg-navy px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy"
              >
                Read the full story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Theology on Tap teaser ── */}
      <section id="tot" className="relative overflow-hidden navy-bg py-24 text-cloud lg:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--sky)_25%,transparent)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">Established October 2017</p>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-5xl">
                Theology<span className="italic text-gold"> on Tap.</span>
              </h2>
              <div className="gold-rule my-8 max-w-[6rem]" />
              <p className="text-lg leading-relaxed text-cloud/80">
                A monthly gathering of men devoted to the rigorous, fraternal
                pursuit of Biblical theology — in person and via Zoom since
                October 2017.
              </p>
              <p className="mt-5 font-display text-xl italic text-gold">
                Bring your A game, or go home.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/theology-on-tap"
                  className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition hover:brightness-110"
                >
                  Learn more →
                </Link>
                <a
                  href="mailto:defender315@msn.com?subject=Join%20Theology%20on%20Tap%20via%20Zoom"
                  className="inline-flex items-center gap-3 rounded-full border border-cloud/30 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:border-gold hover:text-gold"
                >
                  Join via Zoom
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
                <img
                  src={tot}
                  alt="Men in theological discussion at Theology on Tap"
                  width={1600}
                  height={1100}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="eyebrow text-sky">Our Vision</p>
                  <p className="mt-2 font-display text-2xl leading-snug text-cloud">
                    "The purpose of theology is doxology."
                  </p>
                </div>
              </div>

              <div className="mt-6 glass-card-dark rounded-3xl p-6">
                <p className="eyebrow text-gold">Upcoming Discussions</p>
                <ul className="mt-4 divide-y divide-white/10">
                  {events.map((e) => (
                    <li key={e.id} className="flex items-center gap-5 py-4">
                      <div className="w-14 shrink-0 font-display text-xl text-gold">{e.date_text}</div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-cloud">{e.title}</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-cloud/55">{e.location}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision ── (homepage-only, no dedicated page) */}
      <Vision />

      {/* ── Seminary Papers teaser ── */}
      <section id="papers" className="relative heaven-bg py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">The Library</p>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] text-navy sm:text-5xl lg:text-6xl">
                Seminary<span className="italic text-gold"> Papers.</span>
              </h2>
              <p className="mt-4 max-w-xl text-lg text-slate-ink">
                Graduate-level theological writing — open to the church, freely
                given for study, prayer, and conversation.
              </p>
            </div>
            <Link
              to="/papers"
              className="shrink-0 inline-flex items-center gap-3 rounded-full border border-navy px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition hover:bg-navy hover:text-cloud"
            >
              Browse all {papers.length} papers →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPapers.map((p, idx) => (
              <a
                key={idx}
                href={p.pdf_link ?? "/papers"}
                target={p.pdf_link ? "_blank" : undefined}
                rel={p.pdf_link ? "noreferrer" : undefined}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-luxe)]"
              >
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-sky/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-navy">
                    {p.category}
                  </span>
                  <span className="font-display text-xs tracking-widest text-slate-ink/60">
                    {p.year}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl leading-tight text-navy">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-ink">{p.summary}</p>
                <div className="mt-8 border-t border-border pt-5">
                  <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-navy transition group-hover:text-gold">
                    Read paper <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Podcast teaser ── */}
      <section id="podcast" className="relative overflow-hidden navy-bg py-24 text-cloud lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,color-mix(in_oklab,var(--sky)_30%,transparent)_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <p className="eyebrow">Now Streaming</p>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.02] sm:text-5xl">
                Reformed
                <br />
                <span className="italic text-gold">Reference</span> Podcast.
              </h2>
              <div className="gold-rule my-8 max-w-[6rem]" />
              <p className="text-lg leading-relaxed text-cloud/80">
                Weekly reflections on the writings of the great Reformed
                theologians — Calvin, Luther, Warfield, and Machen.
              </p>
              <div className="mt-10">
                <Link
                  to="/podcast"
                  className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition hover:brightness-110"
                >
                  Full episode list →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8">
              <PodcastPlayer showId={spotifyShowId} height={232} />
            </div>
          </div>

          <div className="mt-20 border-t border-white/10 pt-16 text-center">
            <p className="eyebrow text-gold">B.B. Warfield</p>
            <blockquote className="mx-auto mt-6 max-w-3xl font-display text-2xl font-light italic leading-snug sm:text-3xl">
              "It is the distinction of Christianity that it has come into the
              world clothed with the mission to reason its way to its dominion."
            </blockquote>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
