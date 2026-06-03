import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageMeta } from "@/components/site/PageMeta";
import { useContent } from "@/context/ContentContext";

const otherClubs = [
  { name: "Wells of Wisdom Book Club", href: "https://wowbookclubs.com", detail: "wowbookclubs.com" },
  { name: "Christians Read Fiction Book Club", href: "https://facebook.com", detail: "On Facebook" },
  { name: "Christian Fiction Reading Challenge", href: "https://facebook.com", detail: "On Facebook" },
];

export default function SteepedInTruth() {
  const { getSetting } = useContent();

  const currentBook    = getSetting("steeped_current_book", "Pilgrim's Progress");
  const currentAuthor  = getSetting("steeped_current_author", "John Bunyan");
  const meetingTime    = getSetting("steeped_meeting_time", "Thursday nights at 7:00 PM EST");
  const contactEmail   = getSetting("steeped_contact_email", "tlcleon@gmail.com");
  const pastReadings   = getSetting("steeped_past_readings", "Mere Christianity — C. S. Lewis")
    .split("\n").map(s => s.trim()).filter(Boolean);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <PageMeta
        title="Steeped in Truth — Mars Hill Apologetics"
        description="A women's book club gathering around Scripture, sisterhood, and the great Christian classics — reading slowly, thinking deeply."
        path="/steeped-in-truth"
      />
      <Nav />

      <section className="relative overflow-hidden heaven-bg pt-40 pb-24 lg:pt-48 lg:pb-32">
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">A Women's Ministry</p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            Steeped in<span className="italic text-gold"> Truth.</span>
          </h1>
          <div className="gold-rule mx-auto my-8 max-w-[8rem]" />
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-slate-ink">
            A gathering of women drawn together by Scripture, sisterhood, and
            the great Christian classics — reading slowly, thinking deeply,
            and worshiping the Lord in the beauty of holiness.
          </p>
        </div>
      </section>

      <section className="relative py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
          <div className="lg:col-span-5">
            <p className="eyebrow">Biweekly Book Club</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] text-navy sm:text-5xl">
              Currently<span className="italic text-gold"> reading.</span>
            </h2>
            <div className="gold-rule my-8 max-w-[6rem]" />
            <p className="text-lg leading-relaxed text-slate-ink">
              {meetingTime}. Open to women across the country — join us in person or by Zoom.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-10">
              <p className="eyebrow text-gold">Now Reading</p>
              <h3 className="mt-4 font-display text-3xl font-light text-navy sm:text-4xl">{currentBook}</h3>
              <p className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-ink">{currentAuthor}</p>

              {pastReadings.length > 0 && (
                <div className="mt-10">
                  <p className="eyebrow">Past Readings</p>
                  <ul className="mt-4 space-y-3">
                    {pastReadings.map((r) => (
                      <li key={r} className="flex items-center gap-3 text-base text-navy">
                        <span className="h-px w-6 bg-gold" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a href={`mailto:${contactEmail}`}
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy">
                Join the Book Club
              </a>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-ink">Contact · {contactEmail}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-sky/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Sister Communities</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight text-navy sm:text-5xl">
              Other recommended<span className="italic text-gold"> book clubs.</span>
            </h2>
          </div>
          <ul className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-3">
            {otherClubs.map((c) => (
              <li key={c.name}>
                <a href={c.href} target="_blank" rel="noreferrer"
                  className="group block h-full rounded-2xl border border-border bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-luxe)]">
                  <p className="font-display text-xl leading-snug text-navy">{c.name}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-ink">{c.detail}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-navy transition group-hover:text-gold">Visit <span aria-hidden>→</span></span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-16 text-center">
            <Link to="/" className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">← Back to Mars Hill Apologetics</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
