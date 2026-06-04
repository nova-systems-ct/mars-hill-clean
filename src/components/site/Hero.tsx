import hero from "@/assets/hero.jpg";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={hero}
          alt="Men gathered in reverent theological discussion"
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 35%" }}
        />
        {/* Light-blue sky gradient at top — the signature look */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--sky)_65%,transparent)_0%,transparent_65%)]" />
        {/* Gradient from nearly clear at top to dark navy at bottom for text */}
        <div className="absolute inset-0 bg-gradient-to-b from-cloud/15 via-navy/35 to-navy/88" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 pt-36 lg:px-10 lg:pb-28">
        <div className="max-w-3xl">
          <p className="eyebrow text-gold">Est. 1987 · Connecticut</p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] text-white sm:text-6xl lg:text-[5.5rem]">
            Mars Hill
            <br />
            <span className="italic text-gold">Apologetics</span>
          </h1>
          <div className="gold-rule my-7 max-w-xs" />
          <p className="max-w-xl text-pretty text-lg text-white sm:text-xl">
            Defending truth. Pursuing wisdom. Equipping men to think Biblically —
            with the rigor of the academy and the reverence of the church.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/theology-on-tap"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-navy transition hover:bg-gold hover:text-navy"
            >
              Theology on Tap
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/papers"
              className="inline-flex items-center gap-3 rounded-full border border-white/60 px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-gold hover:text-gold"
            >
              Seminary Papers
            </Link>
            <Link
              to="/podcast"
              className="text-sm font-medium uppercase tracking-[0.16em] text-white/90 underline-offset-8 transition hover:text-gold hover:underline"
            >
              Podcast →
            </Link>
          </div>
        </div>

        <div className="mt-16 hidden grid-cols-3 gap-12 border-t border-white/20 pt-7 text-white/85 md:grid">
          <div>
            <p className="eyebrow text-gold">Scripture</p>
            <p className="mt-2 font-display text-base italic">
              "Always be prepared to give an answer." — 1 Peter 3:15
            </p>
          </div>
          <div>
            <p className="eyebrow text-gold">Tradition</p>
            <p className="mt-2 text-sm">Reformed · Confessional · Five Solas</p>
          </div>
          <div>
            <p className="eyebrow text-gold">Founded</p>
            <p className="mt-2 text-sm">By John Leonetti, M.A. — Biola University</p>
          </div>
        </div>
      </div>
    </section>
  );
}
