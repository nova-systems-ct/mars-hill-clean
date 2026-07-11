import { useRef, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageMeta } from "@/components/site/PageMeta";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useContent } from "@/context/ContentContext";

type Status = "idle" | "sending" | "sent" | "error";

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">{label}</label>
      <input
        {...props}
        className="mt-2 w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-navy placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
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
    <main className="min-h-screen bg-white text-foreground">
      <PageMeta
        title="Contact — Mars Hill Apologetics"
        description="Reach out to John Leonetti with questions, speaking inquiries, or to join Theology on Tap."
        path="/contact"
      />
      <Nav />

      <section className="heaven-bg pt-36 pb-14 lg:pt-44">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="eyebrow">Connect</p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            Write to<span className="italic text-gold"> us.</span>
          </h1>
          <div className="gold-rule mx-auto my-7 max-w-[8rem]" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
            For questions, speaking inquiries, or to join Theology on Tap —
            send a note and we'll respond personally.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:px-10">
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="eyebrow">Direct Contact</p>
              <h2 className="mt-3 font-display text-2xl font-light text-navy">John Leonetti</h2>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">Founder</p>

              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Email</dt>
                  <dd className="mt-1">
                    <a href="mailto:defender315@msn.com" className="font-medium text-navy hover:text-gold transition">
                      defender315@msn.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Phone</dt>
                  <dd className="mt-1 text-navy">(203) 725-5918</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Location</dt>
                  <dd className="mt-1 text-navy">Connecticut</dd>
                </div>
              </dl>

              <div className="my-8 h-px bg-slate-100" />

              <p className="eyebrow">Follow</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={YOUTUBE} target="_blank" rel="noreferrer"
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:border-gold hover:text-navy">
                  YouTube
                </a>
                <a href={SPOTIFY} target="_blank" rel="noreferrer"
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:border-gold hover:text-navy">
                  Spotify
                </a>
                <a href={FACEBOOK} target="_blank" rel="noreferrer"
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:border-gold hover:text-navy">
                  Facebook
                </a>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-8">
            {status === "sent" ? (
              <div className="rounded-2xl border border-gold/30 bg-amber-50 p-10 shadow-sm">
                <p className="eyebrow text-gold">Message Received</p>
                <h2 className="mt-3 font-display text-3xl font-light text-navy">Thank you for writing.</h2>
                <p className="mt-4 text-slate-700">
                  Your message has been received. John will reply personally — a
                  confirmation has been sent to your email address.
                </p>
                <blockquote className="mt-8 border-l-2 border-gold pl-4 font-display text-lg italic text-slate-700">
                  "Always be prepared to give an answer." — 1 Peter 3:15
                </blockquote>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-navy hover:text-gold transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10"
              >
                <p className="eyebrow">Send a Note</p>
                <h2 className="mt-3 font-display text-3xl font-light text-navy">
                  How can we serve you?
                </h2>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" required maxLength={100} placeholder="Your name" />
                  <Field label="Email" name="email" type="email" required maxLength={255} placeholder="you@example.com" />
                </div>
                <div className="mt-5">
                  <Field label="Subject" name="subject" maxLength={150} placeholder="How can we help?" />
                </div>
                <div className="mt-5">
                  <label className="block text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Message</label>
                  <textarea
                    required
                    name="message"
                    maxLength={2000}
                    rows={6}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-navy placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                    placeholder="Share your question, story, or request…"
                  />
                </div>

                {status === "error" && (
                  <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-xs text-red-600">{errorMsg}</p>
                )}

                <div className="mt-8 flex items-center justify-between gap-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Soli Deo Gloria</p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-3 rounded-full bg-navy px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-navy disabled:opacity-50 disabled:pointer-events-none"
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
