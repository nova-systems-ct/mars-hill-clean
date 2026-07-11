import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PodcastPlayer } from "@/components/site/PodcastPlayer";
import { PageMeta } from "@/components/site/PageMeta";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
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
    <main className="min-h-screen bg-white text-foreground">
      <PageMeta
        title="Podcast — Reformed Reference — Mars Hill Apologetics"
        description="A weekly study where the wisdom of the great Reformed theologians echoes through the ages — Calvin, Luther, Warfield, and Machen."
        path="/podcast"
      />
      <Nav />

      {/* Hero */}
      <section className="heaven-bg pt-36 pb-14 lg:pt-44">
        <Breadcrumbs items={[{ label: "Podcast" }]} />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <p className="eyebrow text-gold">Now Streaming</p>
              <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
                Reformed
                <br />
                <span className="italic text-gold">Reference</span>
                <br />
                Podcast.
              </h1>
              <div className="gold-rule my-7 max-w-[5rem]" />
              <p className="text-lg leading-relaxed text-slate-700">
                A weekly study where the wisdom of the great Reformed theologians
                echoes through the ages — from Calvin and Luther to Warfield and
                Machen.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={SPOTIFY} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gold hover:text-navy">
                  Spotify
                </a>
                <a href={YOUTUBE} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy transition hover:bg-navy hover:text-white">
                  YouTube
                </a>
                <a href={FACEBOOK} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy transition hover:bg-navy hover:text-white">
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
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <p className="eyebrow">Episodes</p>
          {episodes.length === 0 ? (
            <p className="mt-6 text-sm italic text-slate-500">Episodes coming soon.</p>
          ) : (
            <ul className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
              {episodes.map((e) => (
                <li key={e.id}
                  className="group flex items-center gap-6 px-6 py-5 transition hover:bg-sky/10">
                  <span className="w-8 shrink-0 font-display text-xl text-gold">{e.number}</span>
                  <p className="flex-1 font-medium text-navy">{e.title}</p>
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{e.length}</span>
                  <a href={SPOTIFY} target="_blank" rel="noreferrer"
                    className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-gold">
                    →
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-16 border-t border-slate-200 pt-12 text-center">
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
