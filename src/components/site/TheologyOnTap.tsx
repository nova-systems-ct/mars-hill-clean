import tot from "@/assets/tot.jpg";
import { useContent } from "@/context/ContentContext";

export function TheologyOnTap() {
  const { events } = useContent();

  return (
    <section id="tot" className="relative overflow-hidden navy-bg py-32 text-cloud lg:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--sky)_25%,transparent)_0%,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Established October 2017</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl">
              Theology<span className="italic text-gold"> on Tap.</span>
            </h2>
            <div className="gold-rule my-8 max-w-[6rem]" />
            <p className="text-pretty text-lg leading-relaxed text-cloud/80">
              Founded in October of 2017 to mark the 500th anniversary of the
              Reformation, Theology on Tap is a monthly gathering of men devoted
              to the rigorous, fraternal pursuit of Biblical theology.
            </p>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-cloud/80">
              We have welcomed guests from across the country via Zoom. We probe
              every corner of life for Scriptural truth — because ideas have
              consequences, and bad ideas have victims. No stone is left
              unturned. If you have the truth, you have nothing to fear.
            </p>
            <p className="mt-5 font-display text-xl italic text-gold">Bring your A game, or go home.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="mailto:defender315@msn.com?subject=Join%20Theology%20on%20Tap%20in%20person"
                className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition hover:brightness-110">
                Join in Person
              </a>
              <a href="mailto:defender315@msn.com?subject=Join%20Theology%20on%20Tap%20via%20Zoom"
                className="inline-flex items-center gap-3 rounded-full border border-cloud/30 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:border-gold hover:text-gold">
                Join via Zoom
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
              <img src={tot} alt="Men in theological discussion at Theology on Tap"
                width={1600} height={1100} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="eyebrow text-sky">Our Vision</p>
                <p className="mt-2 font-display text-2xl leading-snug text-cloud">"The purpose of theology is doxology."</p>
              </div>
            </div>

            <div className="mt-8 glass-card-dark rounded-3xl p-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-gold">Upcoming Discussions</p>
                <span className="text-xs uppercase tracking-[0.2em] text-cloud/60">Monthly</span>
              </div>
              <ul className="mt-6 divide-y divide-white/10">
                {events.map((e) => (
                  <li key={e.id} className="py-5">
                    <div className="flex items-start gap-6">
                      <div className="w-16 shrink-0 font-display text-2xl text-gold">{e.date_text}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-cloud">{e.title}</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-cloud/55">{e.location}</p>
                        {e.zoom_link && (
                          <a
                            href={e.zoom_link}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-flex items-center gap-2 rounded-full bg-sky/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-sky transition hover:bg-sky/30"
                          >
                            Join Zoom →
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
