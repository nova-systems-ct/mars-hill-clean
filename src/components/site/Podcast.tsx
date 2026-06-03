import podcast from "@/assets/podcast.jpg";
import { PodcastPlayer } from "./PodcastPlayer";
import { useContent } from "@/context/ContentContext";

const SPOTIFY = "https://open.spotify.com/show/4xnDbJFrb1gpwHfyEabZoG";
const YOUTUBE = "https://www.youtube.com/channel/UCIDs8zPms4tbsYJKOu";

export function Podcast() {
  const { episodes } = useContent();

  return (
    <section id="podcast" className="relative overflow-hidden navy-bg py-32 text-cloud lg:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,color-mix(in_oklab,var(--sky)_30%,transparent)_0%,transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Now Streaming</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.02] sm:text-5xl lg:text-6xl">
              Reformed
              <br />
              <span className="italic text-gold">Reference</span> Podcast.
            </h2>
            <div className="gold-rule my-8 max-w-[6rem]" />
            <p className="text-pretty text-lg leading-relaxed text-cloud/80">
              A weekly study where the wisdom of the great Reformed theologians
              echoes through the ages — from Calvin and Luther to Warfield and
              Machen — drawing their profound insights into the conversations
              and convictions of today.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={SPOTIFY} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-cloud px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition hover:bg-gold">
                Spotify
              </a>
              <a href={YOUTUBE} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-cloud/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:border-gold hover:text-gold">
                YouTube
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-6">
              <PodcastPlayer />
            </div>
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
              <img src={podcast} alt="Reformed Reference Podcast studio"
                width={1600} height={1100} loading="lazy"
                className="aspect-[16/10] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="eyebrow text-sky">Featured · Episode 12</p>
                <h3 className="mt-3 font-display text-3xl leading-tight">
                  Edwards on the Religious Affections
                </h3>
              </div>
            </div>

            <ul className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur">
              {episodes.map((e) => (
                <li key={e.id}
                  className="group flex items-center gap-6 px-6 py-5 transition hover:bg-white/[0.04]">
                  <span className="font-display text-xl text-gold">{e.number}</span>
                  <p className="flex-1 text-cloud">{e.title}</p>
                  <span className="text-xs uppercase tracking-[0.2em] text-cloud/55">{e.length}</span>
                  <span className="text-cloud/50 transition group-hover:translate-x-1 group-hover:text-gold">→</span>
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
  );
}
