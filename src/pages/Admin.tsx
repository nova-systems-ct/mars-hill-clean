import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useContent,
  type PaperCategory,
  type BookEra,
  type Paper,
  type Book,
  type Episode,
} from "@/context/ContentContext";

const ADMIN_PASSWORD = "MarsHill2024";
const AUTH_KEY = "mha-admin-auth";

// ── Login ─────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      onLogin();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center heaven-bg px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold/40 font-display text-xl text-gold">
            M
          </span>
          <h1 className="mt-4 font-display text-3xl font-light text-navy">
            Mars Hill <span className="italic text-gold">Admin</span>
          </h1>
          <p className="mt-2 text-sm text-slate-ink">Enter the admin password to continue.</p>
        </div>
        <form onSubmit={submit} className="rounded-3xl border border-border bg-white p-8 shadow-soft">
          <label className="block text-xs uppercase tracking-[0.22em] text-slate-ink">Password</label>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            autoFocus
            className="mt-3 w-full rounded-full border border-border bg-cloud px-5 py-3 text-navy focus:border-gold focus:outline-none"
          />
          {error && (
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-red-500">Incorrect password.</p>
          )}
          <button type="submit" className="mt-6 w-full rounded-full bg-navy py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy">
            Sign in
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── DB error banner ────────────────────────────────────────────────────────────

function DbError({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
      <strong className="font-semibold">Database error:</strong> {message}
      <br />
      <span className="text-xs">Check that the three tables exist in Supabase and RLS policies allow anon reads/writes.</span>
    </div>
  );
}

// ── Papers manager ─────────────────────────────────────────────────────────────

const PAPER_CATEGORIES: PaperCategory[] = [
  "Doctrine", "World Religions", "Culture", "History", "Philosophy",
];

function PapersManager() {
  const { papers, addPaper, deletePaper, resetPapers, loading, dbError } = useContent();
  const [form, setForm] = useState({ title: "", category: "Doctrine" as PaperCategory, year: "", summary: "", pdf_link: "" });
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState("");

  const showFlash = (msg: string) => { setFlash(msg); setTimeout(() => setFlash(""), 3000); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.summary) return;
    setBusy(true);
    await addPaper({
      title: form.title,
      category: form.category,
      year: form.year || new Date().getFullYear().toString(),
      summary: form.summary,
      pdf_link: form.pdf_link || null,
    });
    setForm({ title: "", category: "Doctrine", year: "", summary: "", pdf_link: "" });
    showFlash("Paper added ✓");
    setBusy(false);
  };

  const handleDelete = async (p: Paper) => {
    if (!confirm(`Delete "${p.title}"?`)) return;
    setBusy(true);
    await deletePaper(p.id);
    showFlash("Deleted ✓");
    setBusy(false);
  };

  const handleReset = async () => {
    if (!confirm("Reset to the original 10 papers? This cannot be undone.")) return;
    setBusy(true);
    await resetPapers();
    showFlash("Reset to defaults ✓");
    setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError message={dbError} />}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-navy">Add a Paper</h2>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <Field label="Title *">
              <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} placeholder="The Arian Controversy" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category *">
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as PaperCategory }))} className={inputCls}>
                  {PAPER_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Year (e.g. MMXXIV)">
                <input value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} className={inputCls} placeholder="MMXXIV" />
              </Field>
            </div>
            <Field label="Summary *">
              <textarea required value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} rows={3} className={`${inputCls} rounded-2xl`} placeholder="A brief description…" />
            </Field>
            <Field label="PDF Link (optional)">
              <input type="url" value={form.pdf_link} onChange={(e) => setForm((f) => ({ ...f, pdf_link: e.target.value }))} className={inputCls} placeholder="https://drive.google.com/…" />
            </Field>
            <Row>
              <button type="submit" disabled={busy || loading} className={btnPrimary}>{busy ? "Saving…" : "Add Paper"}</button>
              {flash && <Flash>{flash}</Flash>}
            </Row>
          </form>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-navy">
              Papers <Tally n={papers.length} loading={loading} />
            </h2>
            <button onClick={handleReset} disabled={busy || loading} className={btnGhost}>Reset to defaults</button>
          </div>
          {loading ? <LoadingList /> : (
            <ul className="mt-4 divide-y divide-border">
              {papers.map((p) => (
                <li key={p.id} className="flex items-start gap-4 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-navy">{p.title}</p>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-gold">{p.category} · {p.year}</p>
                    {p.pdf_link && (
                      <a href={p.pdf_link} target="_blank" rel="noreferrer" className="mt-0.5 block truncate text-xs text-slate-ink hover:text-navy">{p.pdf_link}</a>
                    )}
                  </div>
                  <button onClick={() => handleDelete(p)} disabled={busy} className="shrink-0 text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:text-red-500">Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Library manager ────────────────────────────────────────────────────────────

const BOOK_ERAS: BookEra[] = ["Patristic", "Reformation", "Puritan", "Modern", "Apologetics"];

function LibraryManager() {
  const { books, addBook, deleteBook, resetBooks, loading, dbError } = useContent();
  const [form, setForm] = useState({ title: "", author: "", era: "Modern" as BookEra, year: "", note: "" });
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState("");

  const showFlash = (msg: string) => { setFlash(msg); setTimeout(() => setFlash(""), 3000); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author) return;
    setBusy(true);
    await addBook({ title: form.title, author: form.author, era: form.era, year: form.year, note: form.note });
    setForm({ title: "", author: "", era: "Modern", year: "", note: "" });
    showFlash("Book added ✓");
    setBusy(false);
  };

  const handleDelete = async (b: Book) => {
    if (!confirm(`Delete "${b.title}"?`)) return;
    setBusy(true);
    await deleteBook(b.id);
    showFlash("Deleted ✓");
    setBusy(false);
  };

  const handleReset = async () => {
    if (!confirm("Reset to the original 12 books? This cannot be undone.")) return;
    setBusy(true);
    await resetBooks();
    showFlash("Reset to defaults ✓");
    setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError message={dbError} />}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-navy">Add a Book</h2>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <Field label="Title *">
              <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} placeholder="Institutes of the Christian Religion" />
            </Field>
            <Field label="Author *">
              <input required value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} className={inputCls} placeholder="John Calvin" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Era *">
                <select value={form.era} onChange={(e) => setForm((f) => ({ ...f, era: e.target.value as BookEra }))} className={inputCls}>
                  {BOOK_ERAS.map((e) => <option key={e}>{e}</option>)}
                </select>
              </Field>
              <Field label="Year">
                <input value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} className={inputCls} placeholder="1559" />
              </Field>
            </div>
            <Field label="Note">
              <textarea value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} rows={2} className={`${inputCls} rounded-2xl`} placeholder="One sentence description…" />
            </Field>
            <Row>
              <button type="submit" disabled={busy || loading} className={btnPrimary}>{busy ? "Saving…" : "Add Book"}</button>
              {flash && <Flash>{flash}</Flash>}
            </Row>
          </form>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-navy">
              Library <Tally n={books.length} loading={loading} />
            </h2>
            <button onClick={handleReset} disabled={busy || loading} className={btnGhost}>Reset to defaults</button>
          </div>
          {loading ? <LoadingList /> : (
            <ul className="mt-4 divide-y divide-border">
              {books.map((b) => (
                <li key={b.id} className="flex items-start gap-4 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-navy">{b.title}</p>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-gold">{b.author} · {b.era} · {b.year}</p>
                  </div>
                  <button onClick={() => handleDelete(b)} disabled={busy} className="shrink-0 text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:text-red-500">Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Podcast manager ────────────────────────────────────────────────────────────

function PodcastManager() {
  const { episodes, addEpisode, deleteEpisode, resetEpisodes, loading, dbError } = useContent();
  const [form, setForm] = useState({ number: "", title: "", length: "" });
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState("");

  const showFlash = (msg: string) => { setFlash(msg); setTimeout(() => setFlash(""), 3000); };
  const nextNum = String(episodes.length + 1).padStart(2, "0");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    setBusy(true);
    await addEpisode({ number: form.number || nextNum, title: form.title, length: form.length || "— min" });
    setForm({ number: "", title: "", length: "" });
    showFlash("Episode added ✓");
    setBusy(false);
  };

  const handleDelete = async (ep: Episode) => {
    if (!confirm(`Delete "${ep.title}"?`)) return;
    setBusy(true);
    await deleteEpisode(ep.id);
    showFlash("Deleted ✓");
    setBusy(false);
  };

  const handleReset = async () => {
    if (!confirm("Reset to the original 4 episodes? This cannot be undone.")) return;
    setBusy(true);
    await resetEpisodes();
    showFlash("Reset to defaults ✓");
    setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError message={dbError} />}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-navy">Add an Episode</h2>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={`Episode # (next: ${nextNum})`}>
                <input value={form.number} onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))} className={inputCls} placeholder={nextNum} />
              </Field>
              <Field label="Length">
                <input value={form.length} onChange={(e) => setForm((f) => ({ ...f, length: e.target.value }))} className={inputCls} placeholder="42 min" />
              </Field>
            </div>
            <Field label="Title *">
              <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} placeholder="Calvin on the Knowledge of God" />
            </Field>
            <Row>
              <button type="submit" disabled={busy || loading} className={btnPrimary}>{busy ? "Saving…" : "Add Episode"}</button>
              {flash && <Flash>{flash}</Flash>}
            </Row>
          </form>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-navy">
              Episodes <Tally n={episodes.length} loading={loading} />
            </h2>
            <button onClick={handleReset} disabled={busy || loading} className={btnGhost}>Reset to defaults</button>
          </div>
          {loading ? <LoadingList /> : (
            <ul className="mt-4 divide-y divide-border">
              {episodes.map((ep) => (
                <li key={ep.id} className="flex items-center gap-4 py-4">
                  <span className="font-display text-xl text-gold">{ep.number}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-navy">{ep.title}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-ink">{ep.length}</p>
                  </div>
                  <button onClick={() => handleDelete(ep)} disabled={busy} className="shrink-0 text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:text-red-500">Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Shared UI helpers ──────────────────────────────────────────────────────────

const inputCls = "mt-2 w-full rounded-full border border-border bg-cloud px-5 py-3 text-sm text-navy placeholder:text-slate-ink/50 focus:border-gold focus:outline-none";
const btnPrimary = "inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy disabled:opacity-40 disabled:pointer-events-none";
const btnGhost = "text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:text-navy disabled:opacity-40 disabled:pointer-events-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.22em] text-slate-ink">{label}</label>
      {children}
    </div>
  );
}
function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-4">{children}</div>;
}
function Flash({ children }: { children: React.ReactNode }) {
  return <span className="text-xs uppercase tracking-[0.2em] text-gold">{children}</span>;
}
function Tally({ n, loading }: { n: number; loading: boolean }) {
  return <span className="text-gold">({loading ? "…" : n})</span>;
}
function LoadingList() {
  return (
    <div className="mt-6 space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-12 animate-pulse rounded-xl bg-sky/40" />
      ))}
    </div>
  );
}

// ── Admin shell ────────────────────────────────────────────────────────────────

type Tab = "papers" | "library" | "podcast";
const TABS: { id: Tab; label: string }[] = [
  { id: "papers", label: "Seminary Papers" },
  { id: "library", label: "Library" },
  { id: "podcast", label: "Podcast" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === "true");
  const [activeTab, setActiveTab] = useState<Tab>("papers");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const logout = () => { localStorage.removeItem(AUTH_KEY); setAuthed(false); };

  return (
    <div className="min-h-screen bg-cloud">
      <header className="sticky top-0 z-40 border-b border-border bg-cloud/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 font-display text-base text-gold">M</span>
            <span className="font-display text-sm tracking-tight text-navy">Mars Hill <span className="text-gold">Admin</span></span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">← View site</Link>
            <button onClick={logout} className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">Sign out</button>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 lg:px-10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`shrink-0 border-b-2 px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] transition ${activeTab === t.id ? "border-gold text-navy" : "border-transparent text-slate-ink hover:text-navy"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-soft lg:p-12">
          {activeTab === "papers" && <PapersManager />}
          {activeTab === "library" && <LibraryManager />}
          {activeTab === "podcast" && <PodcastManager />}
        </div>
        <p className="mt-8 text-center text-xs uppercase tracking-[0.22em] text-slate-ink">
          Connected to Supabase · Changes are live for all visitors · Soli Deo Gloria
        </p>
      </main>
    </div>
  );
}
