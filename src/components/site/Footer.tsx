import { Link } from "react-router-dom";
import { useContent } from "@/context/ContentContext";

export function Footer() {
  const { getSetting } = useContent();
  const SPOTIFY  = getSetting("spotify_url",  "https://open.spotify.com/show/4xnDbJFrb1gpwHfyEabZoG");
  const YOUTUBE  = getSetting("youtube_url",  "https://www.youtube.com/channel/UCIDs8zPms4tbsYJKOu");
  const FACEBOOK = getSetting("facebook_url", "https://www.facebook.com/marshillapologetics");
  return (
    <footer className="relative border-t border-border bg-cloud">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Psalm 96:9</p>
            <p className="mt-5 font-display text-3xl font-light leading-snug text-navy sm:text-4xl">
              "Worship the Lord in the
              <span className="italic text-gold"> beauty of holiness."</span>
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-ink">
              <li><Link to="/about" className="hover:text-navy transition">About</Link></li>
              <li><Link to="/theology-on-tap" className="hover:text-navy transition">Theology on Tap</Link></li>
              <li><Link to="/papers" className="hover:text-navy transition">Seminary Papers</Link></li>
              <li><Link to="/podcast" className="hover:text-navy transition">Podcast</Link></li>
              <li><Link to="/library" className="hover:text-navy transition">Library</Link></li>
              <li><Link to="/blog" className="hover:text-navy transition">Blog</Link></li>
              <li><Link to="/steeped-in-truth" className="hover:text-navy transition">Steeped in Truth</Link></li>
              <li><Link to="/resources" className="hover:text-navy transition">Resources</Link></li>
              <li><Link to="/contact" className="hover:text-navy transition">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="eyebrow">Subscribe</p>
            <p className="mt-5 text-sm text-slate-ink">
              A quiet monthly note — new papers, episodes, and gatherings.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex overflow-hidden rounded-full border border-border bg-white"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 bg-transparent px-5 py-3 text-sm text-navy placeholder:text-slate-ink/60 focus:outline-none"
              />
              <button className="bg-navy px-6 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy">
                Join
              </button>
            </form>

            <div className="mt-8 flex gap-3">
              {[
                { n: "Facebook", url: FACEBOOK },
                { n: "YouTube",  url: YOUTUBE },
                { n: "Spotify",  url: SPOTIFY },
              ].map((s) => (
                <a key={s.n} href={s.url} target="_blank" rel="noreferrer"
                  className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:border-gold hover:text-navy">
                  {s.n}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="gold-rule mt-16" />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs uppercase tracking-[0.22em] text-slate-ink sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Mars Hill Apologetics</p>
          <a href="mailto:defender315@msn.com" className="hover:text-navy transition">defender315@msn.com</a>
          <p>Soli Deo Gloria</p>
        </div>
      </div>
    </footer>
  );
}
