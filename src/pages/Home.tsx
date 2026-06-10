import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Vision } from "@/components/site/Vision";
import { Footer } from "@/components/site/Footer";
import { PodcastPlayer } from "@/components/site/PodcastPlayer";
import { PageMeta } from "@/components/site/PageMeta";
import { useContent } from "@/context/ContentContext";
import founder from "@/assets/founder-real.jpg";
import tot from "@/assets/tot.jpg";

export default function Home() {
  const { papers, events, getSetting } = useContent();
  const featuredPapers = papers.slice(0, 3);
  const spotifyUrl = getSetting("spotify_url", "https://open.spotify.com/show/4xnDbJFrb1gpwHfyEabZoG");
  const spotifyShowId = spotifyUrl.includes("open.spotify.com/show/")
    ? spotifyUrl.split("open.spotify.com/show/")[1].split("?")[0]
    : "4xnDbJFrb1gpwHfyEabZoG";

  return (
    <main className="min-h-screen bg-white text-foreground">
      <PageMeta
        title="Mars Hill Apologetics — Defending Truth. Pursuing Wisdom."
        description="A Reformed apologetics ministry by John Leonetti — home of Theology on Tap, the Reformed Reference Podcast, and a seminary paper archive."
        path="/"
      />
      <Nav />
      <Hero />

      {/* ── About teaser ── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-4">
            <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-navy/8">
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

          <div className="flex flex-col justify-center lg:col-span-8">
            <p className="eyebrow">About the Founder</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-navy sm:text-5xl">
              A lifetime of contending
              <span className="italic text-gold"> for the faith.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-600">
              John Leonetti has walked with Christ since 1985. Since 1987 he has
              devoted himself to Christian apologetics — answering doorbells,
              teaching Sunday school, and founding Theology on Tap in 2017. In
              2023 he completed his M.A. in Christian Apologetics at Biola University.
            </p>
            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gold hover:text-navy"
              >
                Read the full story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Theology on Tap ── light section */}
      <section id="tot" className="bg-sky/20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">Established October 2017</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-navy sm:text-5xl">
                Theology<span className="italic text-gold"> on Tap.</span>
              </h2>
              <div className="gold-rule my-7 max-w-[5rem]" />
              <p className="text-lg leading-relaxed text-slate-700">
                A monthly gathering of men devoted to the rigorous, fraternal
                pursuit of Biblical theology — in person since October 2017.
              </p>
              <p className="mt-4 font-display text-xl italic text-gold">
                Bring your A game, or go home.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/theology-on-tap"
                  className="inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gold hover:text-navy"
                >
                  Learn more →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl shadow-lg ring-1 ring-navy/10">
                <img
                  src={tot}
                  alt="Men in theological discussion at Theology on Tap"
                  width={1600}
                  height={1100}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Our Vision</p>
                  <p className="mt-1.5 font-display text-2xl leading-snug text-white">
                    "The purpose of theology is doxology."
                  </p>
                </div>
              </div>

              {events.length > 0 && (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="eyebrow text-navy">Upcoming Discussions</p>
                  <ul className="mt-4 divide-y divide-slate-100">
                    {events.map((e) => (
                      <li key={e.id} className="flex items-start gap-5 py-4">
                        <div className="w-14 shrink-0 font-display text-xl text-gold">{e.date_text}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-navy">{e.title}</p>
                          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{e.location}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Steeped in Truth ── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow">A Women's Ministry</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-navy sm:text-5xl">
                Steeped in<span className="italic text-gold"> Truth.</span>
              </h2>
              <div className="gold-rule my-7 max-w-[5rem]" />
              <p className="text-lg leading-relaxed text-slate-700">
                A gathering of women drawn together by Scripture, sisterhood, and the
                great Christian classics — reading slowly, thinking deeply, and
                worshiping the Lord in the beauty of holiness.
              </p>
              <div className="mt-8">
                <Link
                  to="/steeped-in-truth"
                  className="inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gold hover:text-navy"
                >
                  Learn More →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-sky/10 p-8 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Now Reading</p>
                <h3 className="mt-3 font-display text-2xl font-light text-navy">Pilgrim's Progress</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">John Bunyan</p>
                <div className="mt-5 border-t border-slate-200 pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Meets</p>
                  <p className="mt-1 font-medium text-navy">Thursdays at 7:00 PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <Vision />

      {/* ── Public Publications teaser ── */}
      <section id="papers" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">Graduate-Level Writing</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-navy sm:text-5xl lg:text-6xl">
                Seminary Papers<span className="italic text-gold"> / Publications.</span>
              </h2>
              <p className="mt-4 max-w-xl text-lg text-slate-600">
                Freely given for study, prayer, and conversation.
              </p>
            </div>
            <Link
              to="/papers"
              className="shrink-0 inline-flex items-center gap-3 rounded-full border border-navy px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy transition hover:bg-navy hover:text-white"
            >
              {papers.length > 0 ? `Browse all ${papers.length} publications →` : "View all publications →"}
            </Link>
          </div>

          {featuredPapers.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPapers.map((p, idx) => (
                <a
                  key={idx}
                  href={p.pdf_link ?? "/papers"}
                  target={p.pdf_link ? "_blank" : undefined}
                  rel={p.pdf_link ? "noreferrer" : undefined}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-sky/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy">
                      {p.category}
                    </span>
                    <span className="font-display text-xs text-slate-400">{p.year}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl leading-tight text-navy">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{p.summary}</p>
                  <div className="mt-7 border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-navy transition group-hover:text-gold">
                      {p.pdf_link ? "Read paper →" : "View all papers →"}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Podcast teaser ── light section */}
      <section id="podcast" className="bg-sky/10 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <p className="eyebrow">Now Streaming</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-[1.02] text-navy sm:text-5xl">
                Reformed
                <br />
                <span className="italic text-gold">Reference</span> Podcast.
              </h2>
              <div className="gold-rule my-7 max-w-[5rem]" />
              <p className="text-lg leading-relaxed text-slate-700">
                Weekly reflections on the writings of the great Reformed
                theologians — Calvin, Luther, Warfield, and Machen.
              </p>
              <div className="mt-8">
                <Link
                  to="/podcast"
                  className="inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gold hover:text-navy"
                >
                  Full episode list →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8">
              <PodcastPlayer showId={spotifyShowId} height={232} />
            </div>
          </div>

          <div className="mt-16 border-t border-navy/10 pt-12 text-center">
            <p className="eyebrow">B.B. Warfield</p>
            <blockquote className="mx-auto mt-5 max-w-3xl font-display text-2xl font-light italic leading-snug text-navy sm:text-3xl">
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
