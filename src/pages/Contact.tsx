import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.22em] text-slate-ink">
        {label}
      </label>
      <input
        {...props}
        className="mt-3 w-full rounded-full border border-border bg-cloud px-5 py-3 text-navy placeholder:text-slate-ink/50 focus:border-gold focus:outline-none"
      />
    </div>
  );
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />

      <section className="relative overflow-hidden heaven-bg pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="eyebrow">Connect</p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            Write to
            <span className="italic text-gold"> us.</span>
          </h1>
          <div className="gold-rule mx-auto my-8 max-w-[8rem]" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-ink">
            For questions, speaking inquiries, or to join Theology on Tap —
            send a note and we'll respond personally.
          </p>
        </div>
      </section>

      <section className="relative py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:px-10">
          <aside className="lg:col-span-5">
            <div className="glass-card rounded-3xl p-10">
              <p className="eyebrow">Direct</p>
              <h2 className="mt-4 font-display text-2xl font-light text-navy">
                John Leonetti
              </h2>
              <p className="mt-1 text-sm uppercase tracking-[0.22em] text-slate-ink">
                Founder
              </p>

              <dl className="mt-10 space-y-6 text-sm">
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-2">
                    <a
                      href="mailto:defender315@msn.com"
                      className="text-navy hover:text-gold"
                    >
                      defender315@msn.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Phone</dt>
                  <dd className="mt-2 text-navy">(203) 725-5918</dd>
                </div>
                <div>
                  <dt className="eyebrow">Location</dt>
                  <dd className="mt-2 text-navy">Connecticut</dd>
                </div>
              </dl>

              <div className="gold-rule my-10" />

              <p className="eyebrow">Follow</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/channel/UCIDs8zPms4tbsYJKOu"
                  target="_blank" rel="noreferrer"
                  className="rounded-full border border-border bg-white px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:border-gold hover:text-navy"
                >
                  YouTube
                </a>
                <a
                  href="https://open.spotify.com/show/4xnDbJFrb1gpwHfyEabZoG"
                  target="_blank" rel="noreferrer"
                  className="rounded-full border border-border bg-white px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:border-gold hover:text-navy"
                >
                  Spotify
                </a>
                <a
                  href="https://www.facebook.com/marshillapologetics"
                  target="_blank" rel="noreferrer"
                  className="rounded-full border border-border bg-white px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:border-gold hover:text-navy"
                >
                  Facebook
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-3xl border border-border bg-white p-10 shadow-soft"
            >
              <p className="eyebrow">Send a Note</p>
              <h2 className="mt-3 font-display text-3xl font-light text-navy sm:text-4xl">
                How can we serve you?
              </h2>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <Field label="Name" name="name" required maxLength={100} />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                />
              </div>
              <div className="mt-6">
                <Field label="Subject" name="subject" maxLength={150} />
              </div>
              <div className="mt-6">
                <label className="block text-xs uppercase tracking-[0.22em] text-slate-ink">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  maxLength={2000}
                  rows={6}
                  className="mt-3 w-full rounded-2xl border border-border bg-cloud px-5 py-4 text-navy placeholder:text-slate-ink/50 focus:border-gold focus:outline-none"
                  placeholder="Share your question, story, or request…"
                />
              </div>

              <div className="mt-10 flex items-center justify-between gap-6">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-ink">
                  {sent ? "Thank you — we'll be in touch." : "Soli Deo Gloria"}
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 rounded-full bg-navy px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy"
                >
                  {sent ? "Sent" : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
