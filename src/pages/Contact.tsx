import { useRef, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageMeta } from "@/components/site/PageMeta";
import { useContent } from "@/context/ContentContext";

type Status = "idle" | "sending" | "sent" | "error";

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.22em] text-slate-ink">{label}</label>
      <input
        {...props}
        className="mt-3 w-full rounded-full border border-border bg-cloud px-5 py-3 text-navy placeholder:text-slate-ink/50 focus:border-gold focus:outline-none"
      />
    </div>
  );
}

export default function ContactPage() {
  const { getSetting } = useContent();
  const YOUTUBE  = getSetting("youtube_url",  "https://www.youtube.com/channel/UCIDs8zPms4tbsYJKOu");
  const SPOTIFY  = getSetting("spotify_url",  "https://open.spotify.com/show/4xnDbJFrb1gpwHfyEabZoG");
  const FACEBOOK = getSetting("facebook_url", "https://www.facebook.com/marshillapologetics");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name:    fd.get("name")    as string,
      email:   fd.get("email")   as string,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("sent");
        formRef.current?.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as { error?: string }).error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <PageMeta
        title="Contact — Mars Hill Apologetics"
        description="Reach out to John Leonetti with questions, speaking inquiries, or to join Theology on Tap."
        path="/contact"
      />
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
              <h2 className="mt-4 font-display text-2xl font-light text-navy">John Leonetti</h2>
              <p className="mt-1 text-sm uppercase tracking-[0.22em] text-slate-ink">Founder</p>

              <dl className="mt-10 space-y-6 text-sm">
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-2">
                    <a href="mailto:defender315@msn.com" className="text-navy hover:text-gold transition">
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
                <a href={YOUTUBE} target="_blank" rel="noreferrer"
                  className="rounded-full border border-border bg-white px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:border-gold hover:text-navy">
                  YouTube
                </a>
                <a href={SPOTIFY} target="_blank" rel="noreferrer"
                  className="rounded-full border border-border bg-white px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:border-gold hover:text-navy">
                  Spotify
                </a>
                <a href={FACEBOOK} target="_blank" rel="noreferrer"
                  className="rounded-full border border-border bg-white px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:border-gold hover:text-navy">
                  Facebook
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7">
            {status === "sent" ? (
              <div className="rounded-3xl border border-gold/30 bg-gold/5 p-10 shadow-soft">
                <p className="eyebrow text-gold">Sent</p>
                <h2 className="mt-3 font-display text-3xl font-light text-navy">Thank you for writing.</h2>
                <p className="mt-4 text-slate-ink">
                  Your message has been received. John will reply personally — and a
                  confirmation has been sent to your email.
                </p>
                <blockquote className="mt-8 border-l-2 border-gold pl-4 font-display text-lg italic text-slate-ink">
                  "Always be prepared to give an answer." — 1 Peter 3:15
                </blockquote>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="rounded-3xl border border-border bg-white p-10 shadow-soft"
              >
                <p className="eyebrow">Send a Note</p>
                <h2 className="mt-3 font-display text-3xl font-light text-navy sm:text-4xl">
                  How can we serve you?
                </h2>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  <Field label="Name" name="name" required maxLength={100} placeholder="Your name" />
                  <Field label="Email" name="email" type="email" required maxLength={255} placeholder="you@example.com" />
                </div>
                <div className="mt-6">
                  <Field label="Subject" name="subject" maxLength={150} placeholder="How can we help?" />
                </div>
                <div className="mt-6">
                  <label className="block text-xs uppercase tracking-[0.22em] text-slate-ink">Message</label>
                  <textarea
                    required
                    name="message"
                    maxLength={2000}
                    rows={6}
                    className="mt-3 w-full rounded-2xl border border-border bg-cloud px-5 py-4 text-navy placeholder:text-slate-ink/50 focus:border-gold focus:outline-none"
                    placeholder="Share your question, story, or request…"
                  />
                </div>

                {status === "error" && (
                  <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-xs text-red-600">{errorMsg}</p>
                )}

                <div className="mt-10 flex items-center justify-between gap-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-ink">Soli Deo Gloria</p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-3 rounded-full bg-navy px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
