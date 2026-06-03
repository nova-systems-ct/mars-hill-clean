import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PodcastPlayer } from "@/components/site/PodcastPlayer";
import { PageMeta } from "@/components/site/PageMeta";
import { useContent } from "@/context/ContentContext";

export default function PodcastPage() {
  const { episodes, getSetting } = useContent();
  const SPOTIFY  = getSetting("spotify_url",  "https://open.spotify.com/show/4xnDbJFrb1gpwHfyEabZoG");
  const YOUTUBE  = getSetting("youtube_url",  "https://www.youtube.com/channel/UCIDs8zPms4tbsYJKOu");
  const FACEBOOK = getSetting("facebook_url", "https://www.facebook.com/marshillapologetics");

  const showId = SPOTIFY.includes("open.spotify.com/show/")
    ? SPOTIFY.split("open.spotify.com/show/")[1].split("?")[0]
    : "4xnDbJFrb1gpwHfyEabZoG";

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <PageMeta
        title="Podcast — Reformed Reference — Mars Hill Apologetics"
        description="A weekly study where the wisdom of the great Reformed theologians echoes through the ages — Calvin, Luther, Warfield, and Machen."
        path="/podcast"
      />
      <Nav />

      {/* Hero + Spotify embed */}
      <section className="relative overflow-hidden navy-bg pt-40 pb-24 text-cloud lg:pt-48 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,color-mix(in_oklab,var(--sky)_28%,transparent)_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <p className="eyebrow text-gold">Now Streaming</p>
              <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] sm:text-6xl lg:text-7xl">
                Reformed
                <br />
                <span className="italic text-gold">Reference</span>
                <br />
                Podcast.
              </h1>
              <div className="gold-rule my-8 max-w-[6rem]" />
              <p className="text-pretty text-lg leading-relaxed text-cloud/80">
                A weekly study where the wisdom of the great Reformed theologians
                echoes through the ages — from Calvin and Luther to Warfield and
                Machen — drawing their profound insights into the conversations
                and convictions of today.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={SPOTIFY} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cloud px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition hover:bg-gold">
                  Spotify
                </a>
                <a href={YOUTUBE} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cloud/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:border-gold hover:text-gold">
                  YouTube
                </a>
                <a href={FACEBOOK} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cloud/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:border-gold hover:text-gold">
                  Facebook
                </a>
              </div>
            </div>

            <div className="lg:col-span-8">
              <PodcastPlayer showId={showId} height={460} />
            </div>
          </div>
        </div>
      </section>

      {/* Episode list */}
      <section className="relative navy-bg pb-32 text-cloud lg:pb-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_80%,color-mix(in_oklab,var(--sky)_12%,transparent)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
          <p className="eyebrow text-gold">Episodes</p>
          <ul className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur">
            {episodes.map((e) => (
              <li key={e.id}
                className="group flex items-center gap-6 px-6 py-5 transition hover:bg-white/[0.04]">
                <span className="w-8 shrink-0 font-display text-xl text-gold">{e.number}</span>
                <p className="flex-1 text-cloud">{e.title}</p>
                <span className="text-xs uppercase tracking-[0.2em] text-cloud/55">{e.length}</span>
                <a href={SPOTIFY} target="_blank" rel="noreferrer"
                  className="text-cloud/40 transition group-hover:translate-x-1 group-hover:text-gold">
                  →
                </a>
              </li>
            ))}
          </ul>

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
