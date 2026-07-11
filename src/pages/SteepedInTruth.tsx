import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageMeta } from "@/components/site/PageMeta";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useContent } from "@/context/ContentContext";

const otherClubs = [
  { name: "Wells of Wisdom Book Club",          href: "https://wowbookclubs.com",                                       detail: "wowbookclubs.com" },
  { name: "Christians Read Fiction Book Club",  href: "https://www.facebook.com/share/g/1GQEpnyUMp/",                  detail: "On Facebook" },
  { name: "Christian Fiction Reading Challenge", href: "https://www.facebook.com/profile.php?id=61585823760299",        detail: "On Facebook" },
];

export default function SteepedInTruth() {
  const { getSetting } = useContent();

  const currentBook   = getSetting("steeped_current_book")   || "Pilgrim's Progress";
  const currentAuthor = getSetting("steeped_current_author") || "John Bunyan";
  const meetingTime   = getSetting("steeped_meeting_time")   || "Thursday nights at 7:00 PM EST";
  const contactEmail  = getSetting("steeped_contact_email")  || "tlcleon@gmail.com";
  const pastReadings  = (getSetting("steeped_past_readings") || "Mere Christianity — C. S. Lewis")
    .split("\n").map(s => s.trim()).filter(Boolean);

  return (
    <main className="min-h-screen bg-white text-foreground">
      <PageMeta
        title="Steeped in Truth — Mars Hill Apologetics"
        description="A women's book club gathering around Scripture, sisterhood, and the great Christian classics — reading slowly, thinking deeply."
        path="/steeped-in-truth"
      />
      <Nav />

      {/* Header */}
      <section className="heaven-bg pt-36 pb-14 lg:pt-44">
        <Breadcrumbs items={[{ label: "Steeped in Truth" }]} />
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">A Women's Ministry</p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            Steeped in<span className="italic text-gold"> Truth.</span>
          </h1>
          <div className="gold-rule mx-auto my-7 max-w-[8rem]" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
            A gathering of women drawn together by Scripture, sisterhood, and
            the great Christian classics — reading slowly, thinking deeply,
            and worshiping the Lord in the beauty of holiness.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">

          {/* Left: About */}
          <div className="lg:col-span-5">
            <p className="eyebrow">Biweekly Book Club</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-navy sm:text-5xl">
              Currently<span className="italic text-gold"> reading.</span>
            </h2>
            <div className="gold-rule my-7 max-w-[5rem]" />
            <p className="text-lg leading-relaxed text-slate-700">
              We meet {meetingTime}. Open to women across the country.
            </p>
            <div className="mt-8 space-y-4 text-slate-700">
              <div className="rounded-xl border border-slate-200 bg-sky/10 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Meeting Time</p>
                <p className="mt-2 font-medium text-navy">{meetingTime}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-sky/10 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Contact</p>
                <a href={`mailto:${contactEmail}`} className="mt-1 block font-medium text-navy hover:text-gold transition">
                  {contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Right: Current book + join */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
              <p className="eyebrow text-gold">Now Reading</p>
              <h3 className="mt-4 font-display text-3xl font-light text-navy sm:text-4xl">{currentBook}</h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{currentAuthor}</p>

              <div className="mt-8 border-t border-slate-100 pt-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Past Readings</p>
                <ul className="mt-4 space-y-3">
                  {pastReadings.map((r) => (
                    <li key={r} className="flex items-center gap-3 text-navy">
                      <span className="h-px w-6 shrink-0 bg-gold" />
                      <span className="text-sm">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`mailto:${contactEmail}?subject=Join%20Steeped%20in%20Truth%20Book%20Club`}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-navy"
              >
                Join the Book Club →
              </a>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                Contact · {contactEmail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other clubs */}
      <section className="bg-sky/10 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Sister Communities</p>
            <h2 className="mt-4 font-display text-4xl font-light text-navy sm:text-5xl">
              Other recommended<span className="italic text-gold"> book clubs.</span>
            </h2>
          </div>
          <ul className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3">
            {otherClubs.map((c) => (
              <li key={c.name}>
                <a href={c.href} target="_blank" rel="noreferrer"
                  className="group block h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg">
                  <p className="font-display text-xl leading-snug text-navy group-hover:text-gold transition-colors">{c.name}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">{c.detail}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-navy transition group-hover:text-gold">
                    Visit →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Link to="/" className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 hover:text-navy transition">
              ← Back to Mars Hill Apologetics
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
