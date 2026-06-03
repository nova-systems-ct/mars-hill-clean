import podcast from "@/assets/podcast.jpg";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PodcastPlayer } from "@/components/site/PodcastPlayer";
import { useContent } from "@/context/ContentContext";

export default function PodcastPage() {
  const { episodes } = useContent();

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero + player */}
      <section className="relative overflow-hidden navy-bg pt-40 pb-20 text-cloud lg:pt-48 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,color-mix(in_oklab,var(--sky)_30%,transparent)_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="eyebrow text-gold">Now Streaming</p>
              <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] sm:text-6xl lg:text-7xl">
                Reformed
                <br />
                <span className="italic text-gold">Reference</span> Podcast.
              </h1>
              <div className="gold-rule my-8 max-w-[6rem]" />
              <p className="text-pretty text-lg leading-relaxed text-cloud/80">
                A weekly study where the wisdom of the great Reformed theologians
                echoes through the ages — from Calvin and Luther to Warfield and
                Machen — drawing their profound insights into the conversations
                and convictions of today.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="https://open.spotify.com/show/0kBKnzeIuiHfPHF2lZBL5R"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-cloud px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition hover:bg-gold"
                >
                  Spotify
                </a>
                <a
                  href="https://www.youtube.com/@marshillnewengland2027"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-cloud/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:border-gold hover:text-gold"
                >
                  YouTube
                </a>
              </div>
            </div>
            <div className="lg:col-span-7">
              <PodcastPlayer height={420} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured episode + episode list + quote */}
      <section className="relative navy-bg pb-32 text-cloud lg:pb-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_80%,color-mix(in_oklab,var(--sky)_15%,transparent)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
                <img
                  src={podcast}
                  alt="Reformed Reference Podcast studio"
                  width={1600}
                  height={1100}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="eyebrow text-sky">Featured · Episode 12</p>
                  <h3 className="mt-3 font-display text-3xl leading-tight">
                    Edwards on the Religious Affections
                  </h3>
                  <div className="mt-6 flex items-center gap-5">
                    <button
                      aria-label="Play"
                      className="grid h-14 w-14 place-items-center rounded-full bg-gold text-navy transition hover:scale-105"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <div className="flex-1">
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
                        <div className="h-full w-1/3 rounded-full bg-gold" />
                      </div>
                      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-cloud/60">
                        <span>14:22</span>
                        <span>46:08</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur">
                {episodes.map((e) => (
                  <li
                    key={e.id}
                    className="group flex items-center gap-6 px-6 py-5 transition hover:bg-white/[0.04]"
                  >
                    <span className="font-display text-xl text-gold">{e.number}</span>
                    <p className="flex-1 text-cloud">{e.title}</p>
                    <span className="text-xs uppercase tracking-[0.2em] text-cloud/55">
                      {e.length}
                    </span>
                    <span className="text-cloud/50 transition group-hover:translate-x-1 group-hover:text-gold">
                      →
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-24 border-t border-white/10 pt-16 text-center">
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
