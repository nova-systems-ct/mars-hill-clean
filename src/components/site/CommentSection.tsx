import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Comment = {
  id: string;
  page_slug: string;
  page_title: string | null;
  commenter_name: string;
  commenter_email: string | null;
  comment_text: string;
  approved: boolean;
  created_at: string;
};

type Status = "idle" | "sending" | "sent" | "error";

export function CommentSection({ pageSlug, pageTitle }: { pageSlug: string; pageTitle: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("comments")
        .select("*")
        .eq("page_slug", pageSlug)
        .order("created_at", { ascending: false });
      if (!cancelled) {
        setComments((data ?? []) as Comment[]);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [pageSlug]);

  const approved = comments.filter((c) => c.approved);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    const { data, error } = await supabase
      .from("comments")
      .insert([{
        page_slug: pageSlug,
        page_title: pageTitle,
        commenter_name: name.trim(),
        commenter_email: email.trim() || null,
        comment_text: text.trim(),
        approved: false,
      }])
      .select()
      .single();

    if (error || !data) {
      setErrorMsg("Something went wrong saving your comment. Please try again.");
      setStatus("error");
      return;
    }

    // Best-effort — the comment is already saved even if the email notification fails.
    fetch("/api/comment-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page_slug: pageSlug, page_title: pageTitle, commenter_name: name.trim(), comment_text: text.trim() }),
    }).catch(() => {});

    setComments((prev) => [data as Comment, ...prev]);
    setName(""); setEmail(""); setText("");
    setStatus("sent");
  };

  return (
    <section className="border-t border-slate-200 bg-sky/5 py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <p className="eyebrow">Discussion</p>
        <h2 className="mt-3 font-display text-3xl font-light text-navy">
          Comments <span className="italic text-gold">({loading ? "…" : approved.length})</span>
        </h2>

        {/* Approved comments */}
        {!loading && approved.length > 0 && (
          <ul className="mt-8 space-y-6">
            {approved.map((c) => (
              <li key={c.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-navy">{c.commenter_name}</span>
                  <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    {new Date(c.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{c.comment_text}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Comment form */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {status === "sent" ? (
            <div>
              <p className="font-display text-xl text-navy">Thank you for your comment.</p>
              <p className="mt-2 text-sm text-slate-600">It will appear after approval.</p>
              <button onClick={() => setStatus("idle")} className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-navy hover:text-gold transition">
                Leave another comment
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <p className="eyebrow">Leave a Comment</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Name *</label>
                  <input
                    required maxLength={100} value={name} onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-navy placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Email (optional, never shown publicly)</label>
                  <input
                    type="email" maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-navy placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Comment *</label>
                <textarea
                  required maxLength={3000} rows={5} value={text} onChange={(e) => setText(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-navy placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                  placeholder="Share your thoughts…"
                />
              </div>
              {status === "error" && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-xs text-red-600">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-gold px-8 py-4 text-base font-bold uppercase tracking-[0.16em] text-navy transition hover:bg-navy hover:text-gold disabled:opacity-50 disabled:pointer-events-none sm:w-auto"
              >
                {status === "sending" ? "Submitting…" : "Submit Comment"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
