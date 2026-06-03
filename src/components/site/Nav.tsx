import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContent } from "@/context/ContentContext";

// Links shown inline in the bar (desktop)
const quickLinks = [
  { to: "/about", label: "About" },
  { to: "/theology-on-tap", label: "Theology on Tap" },
  { to: "/papers", label: "Papers" },
  { to: "/podcast", label: "Podcast" },
  { to: "/library", label: "Library" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

// All links in the full overlay
const allLinks = [
  { to: "/", label: "Home", num: "01" },
  { to: "/about", label: "About", num: "02" },
  { to: "/theology-on-tap", label: "Theology on Tap", num: "03" },
  { to: "/papers", label: "Seminary Papers", num: "04" },
  { to: "/podcast", label: "Podcast", num: "05" },
  { to: "/library", label: "Library", num: "06" },
  { to: "/blog", label: "Blog", num: "07" },
  { to: "/steeped-in-truth", label: "Steeped in Truth", num: "08" },
  { to: "/resources", label: "Resources", num: "09" },
  { to: "/contact", label: "Contact", num: "10" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { getSetting } = useContent();
  const SPOTIFY  = getSetting("spotify_url",  "https://open.spotify.com/show/4xnDbJFrb1gpwHfyEabZoG");
  const YOUTUBE  = getSetting("youtube_url",  "https://www.youtube.com/channel/UCIDs8zPms4tbsYJKOu");
  const FACEBOOK = getSetting("facebook_url", "https://www.facebook.com/marshillapologetics");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const barBg = scrolled || open
    ? "bg-cloud/92 backdrop-blur-xl border-b border-border shadow-sm"
    : "bg-transparent";

  return (
    <>
      {/* ── Sticky bar ─────────────────────────────────────────────────── */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${barBg}`}>
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3 lg:px-10">

          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 font-display text-base text-gold">
              M
            </span>
            <span className="hidden font-display text-sm tracking-tight text-navy sm:block">
              Mars Hill <span className="text-gold">Apologetics</span>
            </span>
          </Link>

          {/* Inline page links — visible on lg+ */}
          <nav className="hidden flex-1 items-center gap-1 lg:flex">
            {quickLinks.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                    active
                      ? "text-gold"
                      : "text-navy/70 hover:text-navy"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Inline links on md (fewer) */}
          <nav className="hidden flex-1 items-center gap-1 md:flex lg:hidden">
            {["/about", "/papers", "/podcast", "/contact"].map((path) => {
              const l = quickLinks.find((x) => x.to === path)!;
              const active = location.pathname === l.to;
              return (
                <Link key={l.to} to={l.to}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${active ? "text-gold" : "text-navy/70 hover:text-navy"}`}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {/* Ministry Login — visible on md+ */}
            <Link
              to="/admin"
              className="hidden items-center rounded-full border border-gold/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-navy md:inline-flex"
            >
              Ministry Login
            </Link>

            {/* Hamburger — always visible, opens full overlay */}
            <button
              aria-label={open ? "Close menu" : "Open full menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="group relative grid h-10 w-10 place-items-center rounded-full border border-navy/15 bg-white/70 backdrop-blur transition hover:border-gold"
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 right-0 h-px bg-navy transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 right-0 top-1.5 h-px bg-navy transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 right-0 h-px bg-navy transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen overlay menu ────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 navy-bg" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_oklab,var(--sky)_22%,transparent)_0%,transparent_60%)]" />

        <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-12 pt-24 lg:px-16">
          <div className="mx-auto grid w-full max-w-6xl flex-1 gap-12 lg:grid-cols-12">

            <div className="lg:col-span-8">
              <p className="eyebrow text-gold">Navigate</p>
              <nav className="mt-8 divide-y divide-white/10">
                {allLinks.map((l, i) => {
                  const active = location.pathname === l.to;
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`group flex items-baseline gap-6 py-4 transition ${open ? "animate-fade-up" : ""}`}
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <span className="font-display text-xs tracking-[0.3em] text-gold/70">{l.num}</span>
                      <span className={`font-display text-3xl font-light leading-tight sm:text-4xl lg:text-5xl ${active ? "italic text-gold" : "text-cloud group-hover:text-gold"} transition-colors`}>
                        {l.label}
                      </span>
                      <span className="ml-auto text-cloud/40 transition group-hover:translate-x-1 group-hover:text-gold">→</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <aside className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-12">
              <p className="eyebrow text-gold">Connect</p>
              <ul className="mt-6 space-y-3 text-sm text-cloud/80">
                <li><a className="hover:text-gold" href="mailto:defender315@msn.com">defender315@msn.com</a></li>
                <li><a className="hover:text-gold" href="tel:+12037255918">(203) 725-5918</a></li>
                <li className="text-cloud/60">Connecticut, USA</li>
              </ul>

              <p className="eyebrow mt-10 text-gold">Listen & Watch</p>
              <ul className="mt-6 space-y-3 text-sm text-cloud/80">
                <li><a className="hover:text-gold" target="_blank" rel="noreferrer" href={SPOTIFY}>Spotify →</a></li>
                <li><a className="hover:text-gold" target="_blank" rel="noreferrer" href={YOUTUBE}>YouTube →</a></li>
                <li><a className="hover:text-gold" target="_blank" rel="noreferrer" href={FACEBOOK}>Facebook →</a></li>
              </ul>

              <blockquote className="mt-12 border-l border-gold/50 pl-4 font-display text-base italic text-cloud/85">
                "Always be prepared to give an answer."
                <span className="mt-2 block text-xs not-italic uppercase tracking-[0.22em] text-gold">1 Peter 3:15</span>
              </blockquote>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
