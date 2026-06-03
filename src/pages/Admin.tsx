import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  useContent,
  type PaperCategory, type BookEra, type EventType,
  type Paper, type Book, type Episode, type Event, type BlogPost,
} from "@/context/ContentContext";

const ADMIN_EMAIL    = "defender315@msn.com";
const ADMIN_PASSWORD = "MarsHill2024";
const AUTH_KEY       = "mha-admin-auth";

// ── UI primitives ──────────────────────────────────────────────────────────────

const inputCls    = "mt-2 w-full rounded-full border border-border bg-cloud px-5 py-3 text-sm text-navy placeholder:text-slate-ink/50 focus:border-gold focus:outline-none";
const areaCls     = "mt-2 w-full rounded-2xl border border-border bg-cloud px-5 py-3 text-sm text-navy placeholder:text-slate-ink/50 focus:border-gold focus:outline-none";
const btnPrimary  = "inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy disabled:pointer-events-none disabled:opacity-40";
const btnSecondary = "inline-flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-navy transition hover:bg-navy hover:text-cloud disabled:pointer-events-none disabled:opacity-40";
const btnGhost    = "text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:text-navy disabled:pointer-events-none disabled:opacity-40";
const btnDanger   = "text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:text-red-500 disabled:pointer-events-none disabled:opacity-40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-medium uppercase tracking-[0.22em] text-slate-ink">{label}</label>{children}</div>;
}
function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}
function Flash({ msg }: { msg: string }) {
  return msg ? <span className="text-xs uppercase tracking-[0.2em] text-gold">{msg}</span> : null;
}
function Tally({ n, loading }: { n: number; loading: boolean }) {
  return <span className="ml-1 text-gold">({loading ? "…" : n})</span>;
}
function LoadingList() {
  return <div className="mt-6 space-y-3">{[1,2,3].map(i=><div key={i} className="h-11 animate-pulse rounded-xl bg-sky/40"/>)}</div>;
}
function DbError({ msg }: { msg: string }) {
  return <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"><strong>Database error:</strong> {msg}</div>;
}
function SectionHead({ title, count, loading, onReset }: { title: string; count: number; loading: boolean; onReset?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-display text-2xl text-navy">{title}<Tally n={count} loading={loading} /></h2>
      {onReset && <button onClick={onReset} className={btnGhost}>Reset</button>}
    </div>
  );
}
function useFlash() {
  const [msg, setMsg] = useState("");
  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };
  return [msg, flash] as const;
}

// ── Login ──────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      onLogin();
    } else {
      setErr(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center heaven-bg px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Site identity */}
        <div className="mb-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/40 font-display text-2xl text-gold">M</span>
          <h1 className="mt-4 font-display text-3xl font-light text-navy">
            Mars Hill <span className="italic text-gold">Admin</span>
          </h1>
          <p className="mt-2 text-sm text-slate-ink">Sign in to manage your site.</p>
        </div>

        {/* Login card */}
        <form onSubmit={submit} className="rounded-3xl border border-border bg-white p-8 shadow-soft">
          <Field label="Email">
            <input
              type="email" required autoComplete="email" autoFocus
              value={email} onChange={e => { setEmail(e.target.value); setErr(false); }}
              className={inputCls} placeholder="your@email.com"
            />
          </Field>
          <div className="mt-5">
            <Field label="Password">
              <input
                type="password" required autoComplete="current-password"
                value={password} onChange={e => { setPassword(e.target.value); setErr(false); }}
                className={inputCls} placeholder="••••••••"
              />
            </Field>
          </div>
          {err && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-2 text-xs text-red-600">
              Incorrect email or password. Please try again.
            </p>
          )}
          <button type="submit" className="mt-6 w-full rounded-full bg-navy py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy">
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">← Back to site</Link>
        </div>

        {/* Nova Systems branding */}
        <div className="mt-10 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            <div className="grid h-6 w-6 place-items-center rounded-sm bg-gold">
              <span className="font-display text-xs font-bold text-navy">N</span>
            </div>
            <span className="text-xs font-medium text-slate-ink">Powered by Nova Systems</span>
          </div>
          <a href="mailto:hello@nova-systems.app" className="text-xs text-slate-ink/70 hover:text-gold transition">
            hello@nova-systems.app
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Papers manager ─────────────────────────────────────────────────────────────

const PAPER_CATS: PaperCategory[] = ["Doctrine","World Religions","Culture","History","Philosophy"];

function PapersManager() {
  const { papers, addPaper, deletePaper, resetPapers, loading, dbError } = useContent();
  const [form, setForm] = useState({ title:"", category:"Doctrine" as PaperCategory, year:"", summary:"", pdf_link:"" });
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!form.title||!form.summary) return;
    setBusy(true);
    await addPaper({ title:form.title, category:form.category, year:form.year||new Date().getFullYear().toString(), summary:form.summary, pdf_link:form.pdf_link||null });
    setForm({ title:"", category:"Doctrine", year:"", summary:"", pdf_link:"" });
    setFlash("Added ✓"); setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError msg={dbError} />}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-navy">Add a Paper</h2>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <Field label="Title *"><input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="The Arian Controversy" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category *"><select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value as PaperCategory}))} className={inputCls}>{PAPER_CATS.map(c=><option key={c}>{c}</option>)}</select></Field>
              <Field label="Year (e.g. MMXXIV)"><input value={form.year} onChange={e=>setForm(f=>({...f,year:e.target.value}))} className={inputCls} placeholder="MMXXIV" /></Field>
            </div>
            <Field label="Summary *"><textarea required value={form.summary} onChange={e=>setForm(f=>({...f,summary:e.target.value}))} rows={3} className={areaCls} placeholder="Brief description…" /></Field>
            <Field label="PDF Link"><input type="url" value={form.pdf_link} onChange={e=>setForm(f=>({...f,pdf_link:e.target.value}))} className={inputCls} placeholder="https://…" /></Field>
            <Row><button type="submit" disabled={busy||loading} className={btnPrimary}>{busy?"Saving…":"Add Paper"}</button><Flash msg={flash} /></Row>
          </form>
        </div>
        <div>
          <SectionHead title="Papers" count={papers.length} loading={loading} onReset={async()=>{if(confirm("Reset to original 10?")){ setBusy(true); await resetPapers(); setFlash("Reset ✓"); setBusy(false); }}} />
          {loading ? <LoadingList /> : (
            <ul className="mt-4 divide-y divide-border">
              {papers.map((p: Paper)=>(
                <li key={p.id} className="flex items-start gap-4 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-navy">{p.title}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-gold">{p.category} · {p.year}</p>
                    {p.pdf_link && <a href={p.pdf_link} target="_blank" rel="noreferrer" className="block truncate text-xs text-slate-ink hover:text-navy">{p.pdf_link}</a>}
                  </div>
                  <button onClick={async()=>{if(confirm(`Delete "${p.title}"?`)){ setBusy(true); await deletePaper(p.id); setFlash("Deleted ✓"); setBusy(false); }}} disabled={busy} className={btnDanger}>Delete</button>
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

const BOOK_ERAS: BookEra[] = ["Patristic","Reformation","Puritan","Modern","Apologetics"];

function LibraryManager() {
  const { books, addBook, deleteBook, resetBooks, loading, dbError } = useContent();
  const [form, setForm] = useState({ title:"", author:"", era:"Modern" as BookEra, year:"", note:"" });
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!form.title||!form.author) return;
    setBusy(true); await addBook(form);
    setForm({ title:"", author:"", era:"Modern", year:"", note:"" });
    setFlash("Added ✓"); setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError msg={dbError} />}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-navy">Add a Book</h2>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <Field label="Title *"><input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="Institutes of the Christian Religion" /></Field>
            <Field label="Author *"><input required value={form.author} onChange={e=>setForm(f=>({...f,author:e.target.value}))} className={inputCls} placeholder="John Calvin" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Era *"><select value={form.era} onChange={e=>setForm(f=>({...f,era:e.target.value as BookEra}))} className={inputCls}>{BOOK_ERAS.map(e=><option key={e}>{e}</option>)}</select></Field>
              <Field label="Year"><input value={form.year} onChange={e=>setForm(f=>({...f,year:e.target.value}))} className={inputCls} placeholder="1559" /></Field>
            </div>
            <Field label="Note"><textarea value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} rows={2} className={areaCls} placeholder="One sentence description…" /></Field>
            <Row><button type="submit" disabled={busy||loading} className={btnPrimary}>{busy?"Saving…":"Add Book"}</button><Flash msg={flash} /></Row>
          </form>
        </div>
        <div>
          <SectionHead title="Library" count={books.length} loading={loading} onReset={async()=>{if(confirm("Reset to original 12?")){ setBusy(true); await resetBooks(); setFlash("Reset ✓"); setBusy(false); }}} />
          {loading ? <LoadingList /> : (
            <ul className="mt-4 divide-y divide-border">
              {books.map((b: Book)=>(
                <li key={b.id} className="flex items-start gap-4 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-navy">{b.title}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-gold">{b.author} · {b.era} · {b.year}</p>
                  </div>
                  <button onClick={async()=>{if(confirm(`Delete "${b.title}"?`)){ setBusy(true); await deleteBook(b.id); setFlash("Deleted ✓"); setBusy(false); }}} disabled={busy} className={btnDanger}>Delete</button>
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
  const [form, setForm] = useState({ number:"", title:"", length:"" });
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();
  const nextNum = String(episodes.length+1).padStart(2,"0");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!form.title) return;
    setBusy(true); await addEpisode({ number:form.number||nextNum, title:form.title, length:form.length||"— min" });
    setForm({ number:"", title:"", length:"" }); setFlash("Added ✓"); setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError msg={dbError} />}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-navy">Add an Episode</h2>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={`Episode # (next: ${nextNum})`}><input value={form.number} onChange={e=>setForm(f=>({...f,number:e.target.value}))} className={inputCls} placeholder={nextNum} /></Field>
              <Field label="Length"><input value={form.length} onChange={e=>setForm(f=>({...f,length:e.target.value}))} className={inputCls} placeholder="42 min" /></Field>
            </div>
            <Field label="Title *"><input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="Calvin on the Knowledge of God" /></Field>
            <Row><button type="submit" disabled={busy||loading} className={btnPrimary}>{busy?"Saving…":"Add Episode"}</button><Flash msg={flash} /></Row>
          </form>
        </div>
        <div>
          <SectionHead title="Episodes" count={episodes.length} loading={loading} onReset={async()=>{if(confirm("Reset to original 4?")){ setBusy(true); await resetEpisodes(); setFlash("Reset ✓"); setBusy(false); }}} />
          {loading ? <LoadingList /> : (
            <ul className="mt-4 divide-y divide-border">
              {episodes.map((ep: Episode)=>(
                <li key={ep.id} className="flex items-center gap-4 py-4">
                  <span className="font-display text-xl text-gold">{ep.number}</span>
                  <div className="min-w-0 flex-1"><p className="truncate font-medium text-navy">{ep.title}</p><p className="text-xs uppercase tracking-[0.18em] text-slate-ink">{ep.length}</p></div>
                  <button onClick={async()=>{if(confirm(`Delete "${ep.title}"?`)){ setBusy(true); await deleteEpisode(ep.id); setFlash("Deleted ✓"); setBusy(false); }}} disabled={busy} className={btnDanger}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Events manager ─────────────────────────────────────────────────────────────

const EVENT_TYPES: EventType[] = ["in-person","zoom","hybrid"];

function EventsManager() {
  const { events, addEvent, updateEvent, deleteEvent, resetEvents, loading, dbError } = useContent();
  const blank = { title:"", date_text:"", location:"", type:"in-person" as EventType };
  const [form, setForm] = useState(blank);
  const [editId, setEditId] = useState<string|null>(null);
  const [editForm, setEditForm] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!form.title) return;
    setBusy(true); await addEvent(form);
    setForm(blank); setFlash("Added ✓"); setBusy(false);
  };
  const startEdit = (ev: Event) => { setEditId(ev.id); setEditForm({ title:ev.title, date_text:ev.date_text, location:ev.location, type:ev.type }); };
  const saveEdit = async () => {
    if (!editId) return; setBusy(true);
    await updateEvent(editId, editForm); setEditId(null); setFlash("Saved ✓"); setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError msg={dbError} />}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-navy">Add an Event</h2>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <Field label="Title *"><input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="Reading Calvin's Institutes, Book I" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date (e.g. Apr 11)"><input value={form.date_text} onChange={e=>setForm(f=>({...f,date_text:e.target.value}))} className={inputCls} placeholder="Apr 11" /></Field>
              <Field label="Type"><select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value as EventType}))} className={inputCls}>{EVENT_TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select></Field>
            </div>
            <Field label="Location / Notes"><input value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} className={inputCls} placeholder="In Person · CT" /></Field>
            <Row><button type="submit" disabled={busy||loading} className={btnPrimary}>{busy?"Saving…":"Add Event"}</button><Flash msg={flash} /></Row>
          </form>
        </div>
        <div>
          <SectionHead title="Events" count={events.length} loading={loading} onReset={async()=>{if(confirm("Reset to original 3?")){ setBusy(true); await resetEvents(); setFlash("Reset ✓"); setBusy(false); }}} />
          {loading ? <LoadingList /> : (
            <ul className="mt-4 divide-y divide-border">
              {events.map((ev: Event)=>(
                <li key={ev.id} className="py-4">
                  {editId===ev.id ? (
                    <div className="space-y-3 rounded-2xl border border-gold/30 bg-sky/20 p-4">
                      <input value={editForm.title} onChange={e=>setEditForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="Title" />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input value={editForm.date_text} onChange={e=>setEditForm(f=>({...f,date_text:e.target.value}))} className={inputCls} placeholder="Apr 11" />
                        <select value={editForm.type} onChange={e=>setEditForm(f=>({...f,type:e.target.value as EventType}))} className={inputCls}>{EVENT_TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select>
                      </div>
                      <input value={editForm.location} onChange={e=>setEditForm(f=>({...f,location:e.target.value}))} className={inputCls} placeholder="Location" />
                      <Row><button onClick={saveEdit} disabled={busy} className={btnPrimary}>Save</button><button onClick={()=>setEditId(null)} className={btnGhost}>Cancel</button></Row>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-navy">{ev.title}</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-gold">{ev.date_text} · {ev.type} · {ev.location}</p>
                      </div>
                      <div className="flex shrink-0 gap-3">
                        <button onClick={()=>startEdit(ev)} className={btnSecondary}>Edit</button>
                        <button onClick={async()=>{if(confirm(`Delete "${ev.title}"?`)){ setBusy(true); await deleteEvent(ev.id); setFlash("Deleted ✓"); setBusy(false); }}} disabled={busy} className={btnDanger}>Delete</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Blog manager ───────────────────────────────────────────────────────────────

async function uploadBlogImage(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("blog-images").upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) { console.error("Image upload:", error.message); return null; }
  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return data.publicUrl;
}

function BlogManager() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, loading, dbError } = useContent();
  const blank = { title:"", category:"", date_text:"", summary:"", content:"", image_url:"" };
  const [form, setForm] = useState(blank);
  const [imageFile, setImageFile] = useState<File|null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editId, setEditId] = useState<string|null>(null);
  const [editForm, setEditForm] = useState(blank);
  const [editImageFile, setEditImageFile] = useState<File|null>(null);
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0]; if (!file) return;
    const preview = URL.createObjectURL(file);
    if (isEdit) { setEditImageFile(file); setEditForm(f=>({...f,image_url:preview})); }
    else { setImageFile(file); setImagePreview(preview); }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!form.title||!form.summary) return;
    setBusy(true);
    let image_url: string|null = null;
    if (imageFile) { image_url = await uploadBlogImage(imageFile); }
    await addBlogPost({
      title:form.title, category:form.category,
      date_text:form.date_text||new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),
      summary:form.summary, content:form.content, image_url,
    });
    setForm(blank); setImageFile(null); setImagePreview("");
    setFlash("Post added ✓"); setBusy(false);
  };

  const startEdit = (p: BlogPost) => { setEditId(p.id); setEditForm({ title:p.title, category:p.category, date_text:p.date_text, summary:p.summary, content:p.content, image_url:p.image_url||"" }); };
  const saveEdit = async () => {
    if (!editId) return; setBusy(true);
    let image_url = editForm.image_url||null;
    if (editImageFile) { image_url = await uploadBlogImage(editImageFile) || image_url; }
    await updateBlogPost(editId, { title:editForm.title, category:editForm.category, date_text:editForm.date_text, summary:editForm.summary, content:editForm.content, image_url });
    setEditId(null); setEditImageFile(null); setFlash("Saved ✓"); setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError msg={dbError} />}
      <div>
        <h2 className="font-display text-2xl text-navy">Add a Post</h2>
        <form onSubmit={submit} className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <Field label="Title *"><input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="Machen Still Speaks" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category"><input value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} className={inputCls} placeholder="Church History" /></Field>
              <Field label="Date"><input value={form.date_text} onChange={e=>setForm(f=>({...f,date_text:e.target.value}))} className={inputCls} placeholder="April 30, 2026" /></Field>
            </div>
            <Field label="Summary *"><textarea required value={form.summary} onChange={e=>setForm(f=>({...f,summary:e.target.value}))} rows={3} className={areaCls} placeholder="Opening paragraph or teaser…" /></Field>
            <Field label="Cover Image">
              <input type="file" accept="image/*" onChange={e=>handleImageChange(e)} className="mt-2 w-full cursor-pointer rounded-2xl border border-border bg-cloud px-4 py-2.5 text-sm text-slate-ink file:mr-4 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-1 file:text-xs file:font-semibold file:uppercase file:tracking-[0.2em] file:text-cloud hover:file:bg-gold hover:file:text-navy" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3 h-32 w-full rounded-xl object-cover" />}
              <p className="mt-1 text-xs text-slate-ink/70">Stored in Supabase Storage · blog-images bucket</p>
            </Field>
          </div>
          <div className="space-y-5">
            <Field label="Full Content"><textarea value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} rows={12} className={areaCls} placeholder="Full article body…" /></Field>
            <Row><button type="submit" disabled={busy||loading} className={btnPrimary}>{busy?"Saving…":"Add Post"}</button><Flash msg={flash} /></Row>
          </div>
        </form>
      </div>

      <div>
        <SectionHead title="Posts" count={blogPosts.length} loading={loading} />
        {loading ? <LoadingList /> : (
          <ul className="mt-4 divide-y divide-border">
            {blogPosts.map((p: BlogPost)=>(
              <li key={p.id} className="py-5">
                {editId===p.id ? (
                  <div className="space-y-4 rounded-2xl border border-gold/30 bg-sky/20 p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input value={editForm.title} onChange={e=>setEditForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="Title" />
                      <input value={editForm.category} onChange={e=>setEditForm(f=>({...f,category:e.target.value}))} className={inputCls} placeholder="Category" />
                    </div>
                    <input value={editForm.date_text} onChange={e=>setEditForm(f=>({...f,date_text:e.target.value}))} className={inputCls} placeholder="Date" />
                    <textarea value={editForm.summary} onChange={e=>setEditForm(f=>({...f,summary:e.target.value}))} rows={2} className={areaCls} placeholder="Summary" />
                    <textarea value={editForm.content} onChange={e=>setEditForm(f=>({...f,content:e.target.value}))} rows={5} className={areaCls} placeholder="Full content" />
                    <div>
                      {editForm.image_url && <img src={editForm.image_url} alt="" className="mb-2 h-24 w-full rounded-xl object-cover" />}
                      <input type="file" accept="image/*" onChange={e=>handleImageChange(e,true)} className="w-full cursor-pointer text-sm text-slate-ink file:mr-3 file:rounded-full file:border-0 file:bg-navy file:px-3 file:py-1 file:text-xs file:font-semibold file:text-cloud hover:file:bg-gold hover:file:text-navy" />
                    </div>
                    <Row><button onClick={saveEdit} disabled={busy} className={btnPrimary}>Save</button><button onClick={()=>setEditId(null)} className={btnGhost}>Cancel</button></Row>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    {p.image_url && <img src={p.image_url} alt="" className="h-16 w-24 shrink-0 rounded-xl object-cover" />}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-navy">{p.title}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-gold">{p.category} · {p.date_text}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-ink">{p.summary}</p>
                    </div>
                    <div className="flex shrink-0 gap-3">
                      <button onClick={()=>startEdit(p)} className={btnSecondary}>Edit</button>
                      <button onClick={async()=>{if(confirm(`Delete "${p.title}"?`)){ setBusy(true); await deleteBlogPost(p.id); setFlash("Deleted ✓"); setBusy(false); }}} disabled={busy} className={btnDanger}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Steeped in Truth manager ────────────────────────────────────────────────────

function SteepedManager() {
  const { settings, updateSettings, loading, dbError } = useContent();
  const [form, setForm] = useState<Record<string,string>>({});
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();
  const val = (k: string) => (k in form ? form[k] : settings[k]) ?? "";
  const set = (k: string, v: string) => setForm(f=>({...f,[k]:v}));
  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!Object.keys(form).length) return;
    setBusy(true); await updateSettings(form);
    setForm({}); setFlash("Saved ✓"); setBusy(false);
  };
  return (
    <div>
      {dbError && <DbError msg={dbError} />}
      <h2 className="font-display text-2xl text-navy">Steeped in Truth Settings</h2>
      <form onSubmit={save} className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <Field label="Current Book"><input value={val("steeped_current_book")} onChange={e=>set("steeped_current_book",e.target.value)} className={inputCls} placeholder="Pilgrim's Progress" /></Field>
          <Field label="Current Author"><input value={val("steeped_current_author")} onChange={e=>set("steeped_current_author",e.target.value)} className={inputCls} placeholder="John Bunyan" /></Field>
          <Field label="Meeting Time"><input value={val("steeped_meeting_time")} onChange={e=>set("steeped_meeting_time",e.target.value)} className={inputCls} placeholder="Thursday nights at 7:00 PM EST" /></Field>
          <Field label="Contact Email"><input type="email" value={val("steeped_contact_email")} onChange={e=>set("steeped_contact_email",e.target.value)} className={inputCls} placeholder="tlcleon@gmail.com" /></Field>
        </div>
        <div className="space-y-5">
          <Field label="Past Readings (one per line)">
            <textarea value={val("steeped_past_readings")} onChange={e=>set("steeped_past_readings",e.target.value)} rows={6} className={areaCls} placeholder={"Mere Christianity — C. S. Lewis"} />
          </Field>
          <p className="text-xs text-slate-ink">Each line becomes one past reading entry on the site.</p>
        </div>
        <div className="lg:col-span-2"><Row><button type="submit" disabled={busy||loading||!Object.keys(form).length} className={btnPrimary}>{busy?"Saving…":"Save Changes"}</button><Flash msg={flash} /></Row></div>
      </form>
    </div>
  );
}

// ── Homepage manager ────────────────────────────────────────────────────────────

function HomepageManager() {
  const { settings, updateSettings, loading, dbError } = useContent();
  const [form, setForm] = useState<Record<string,string>>({});
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();
  const val = (k: string) => (k in form ? form[k] : settings[k]) ?? "";
  const set = (k: string, v: string) => setForm(f=>({...f,[k]:v}));
  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!Object.keys(form).length) return;
    setBusy(true); await updateSettings(form);
    setForm({}); setFlash("Saved ✓"); setBusy(false);
  };
  return (
    <div>
      {dbError && <DbError msg={dbError} />}
      <h2 className="font-display text-2xl text-navy">Homepage Content</h2>
      <p className="mt-2 text-sm text-slate-ink">Changes appear on the live site immediately after saving.</p>
      <form onSubmit={save} className="mt-6 max-w-2xl space-y-6">
        <Field label="Hero Tagline"><textarea value={val("hero_tagline")} onChange={e=>set("hero_tagline",e.target.value)} rows={3} className={areaCls} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Scripture Quote"><input value={val("scripture_quote")} onChange={e=>set("scripture_quote",e.target.value)} className={inputCls} /></Field>
          <Field label="Scripture Reference"><input value={val("scripture_reference")} onChange={e=>set("scripture_reference",e.target.value)} className={inputCls} /></Field>
        </div>
        <Row><button type="submit" disabled={busy||loading||!Object.keys(form).length} className={btnPrimary}>{busy?"Saving…":"Save Changes"}</button><Flash msg={flash} /></Row>
      </form>
    </div>
  );
}

// ── Social Links manager ────────────────────────────────────────────────────────

function SocialLinksManager() {
  const { settings, updateSettings, loading, dbError } = useContent();
  const [form, setForm] = useState<Record<string,string>>({});
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();
  const val = (k: string) => (k in form ? form[k] : settings[k]) ?? "";
  const set = (k: string, v: string) => setForm(f=>({...f,[k]:v}));
  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!Object.keys(form).length) return;
    setBusy(true); await updateSettings(form);
    setForm({}); setFlash("Saved — links updated sitewide ✓"); setBusy(false);
  };
  return (
    <div>
      {dbError && <DbError msg={dbError} />}
      <h2 className="font-display text-2xl text-navy">Social Links</h2>
      <p className="mt-2 text-sm text-slate-ink">Saving here updates the links in the nav, footer, podcast page, and contact page simultaneously.</p>
      <form onSubmit={save} className="mt-6 max-w-xl space-y-5">
        <Field label="YouTube URL"><input type="url" value={val("youtube_url")} onChange={e=>set("youtube_url",e.target.value)} className={inputCls} /></Field>
        <Field label="Facebook URL"><input type="url" value={val("facebook_url")} onChange={e=>set("facebook_url",e.target.value)} className={inputCls} /></Field>
        <Field label="Spotify Show URL"><input type="url" value={val("spotify_url")} onChange={e=>set("spotify_url",e.target.value)} className={inputCls} /></Field>
        <Row><button type="submit" disabled={busy||loading||!Object.keys(form).length} className={btnPrimary}>{busy?"Saving…":"Save Links"}</button><Flash msg={flash} /></Row>
      </form>
      <div className="mt-10 rounded-2xl border border-border bg-sky/20 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-ink">Current live links</p>
        <ul className="mt-4 space-y-2 text-sm">
          <li><span className="text-gold">YouTube:</span> <a href={settings.youtube_url} target="_blank" rel="noreferrer" className="break-all text-navy hover:text-gold">{settings.youtube_url}</a></li>
          <li><span className="text-gold">Facebook:</span> <a href={settings.facebook_url} target="_blank" rel="noreferrer" className="break-all text-navy hover:text-gold">{settings.facebook_url}</a></li>
          <li><span className="text-gold">Spotify:</span> <a href={settings.spotify_url} target="_blank" rel="noreferrer" className="break-all text-navy hover:text-gold">{settings.spotify_url}</a></li>
        </ul>
      </div>
    </div>
  );
}

// ── Support tab ─────────────────────────────────────────────────────────────────

function SupportTab() {
  const [form, setForm] = useState({ name:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`Name: ${form.name}\n\n${form.message}`);
    const subj = encodeURIComponent(form.subject || "Admin Support Request");
    window.open(`mailto:hello@nova-systems.app?subject=${subj}&body=${body}`, "_blank");
    setSent(true);
    setForm({ name:"", subject:"", message:"" });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <h2 className="font-display text-2xl text-navy">Contact Nova Systems</h2>
        <p className="mt-3 text-sm text-slate-ink">Send a message and we'll get back to you promptly.</p>

        <div className="mt-8 space-y-5 rounded-2xl border border-border bg-sky/20 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-ink">Support Email</p>
            <a href="mailto:hello@nova-systems.app" className="mt-1 block text-base font-medium text-navy hover:text-gold transition">hello@nova-systems.app</a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-ink">Hours</p>
            <p className="mt-1 text-sm text-slate-ink">Monday – Friday, 9 AM – 5 PM EST</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-ink">Response Time</p>
            <p className="mt-1 text-sm text-slate-ink">Within 1 business day</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-2xl text-navy">Send a Message</h2>
        {sent ? (
          <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/10 p-6">
            <p className="font-medium text-navy">Message prepared ✓</p>
            <p className="mt-1 text-sm text-slate-ink">Your email client opened with the message pre-filled. Send it to reach Nova Systems.</p>
            <button onClick={()=>setSent(false)} className="mt-4 text-xs uppercase tracking-[0.18em] text-navy hover:text-gold">Send another</button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-5">
            <Field label="Your Name"><input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} className={inputCls} placeholder="John Leonetti" /></Field>
            <Field label="Subject"><input value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} className={inputCls} placeholder="Question about the site" /></Field>
            <Field label="Message *"><textarea required value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} rows={5} className={areaCls} placeholder="Describe what you need help with…" /></Field>
            <button type="submit" className={btnPrimary}>Open Email Client</button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Domain Settings tab ─────────────────────────────────────────────────────────

function DomainTab() {
  const currentHost = typeof window !== "undefined" ? window.location.hostname : "your-site.vercel.app";
  const isCustom = !currentHost.includes("vercel.app") && !currentHost.includes("localhost");

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h2 className="font-display text-2xl text-navy">Domain Settings</h2>
        <p className="mt-2 text-sm text-slate-ink">Connect your custom domain to make the site live at <strong>marshillapologetics.com</strong>.</p>
      </div>

      {/* Current URL */}
      <div className="rounded-2xl border border-border bg-sky/20 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-ink">Current Live URL</p>
        <p className="mt-2 break-all font-mono text-base font-medium text-navy">https://{currentHost}</p>
        {isCustom ? (
          <span className="mt-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-navy">Custom domain active</span>
        ) : (
          <span className="mt-2 inline-block rounded-full bg-sky px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-navy">Vercel default URL</span>
        )}
      </div>

      {/* Step-by-step */}
      <div>
        <p className="eyebrow mb-6">How to connect marshillapologetics.com</p>
        <ol className="space-y-6">
          {[
            {
              n: "1",
              title: "Add the domain in Vercel",
              body: "Go to your Vercel project → Settings → Domains. Click \"Add\" and type marshillapologetics.com. Vercel will show you DNS records to configure.",
              action: { label: "Open Vercel Dashboard", href: "https://vercel.com/dashboard" },
            },
            {
              n: "2",
              title: "Log in to your domain registrar",
              body: "Go to wherever you bought marshillapologetics.com (GoDaddy, Namecheap, Google Domains, etc.) and find the DNS settings.",
            },
            {
              n: "3",
              title: "Add an A record",
              body: "Create an A record pointing @ (root domain) to Vercel's IP address: 76.76.21.21",
            },
            {
              n: "4",
              title: "Add a CNAME record for www",
              body: "Create a CNAME record: Name = www, Value = cname.vercel-dns.com",
            },
            {
              n: "5",
              title: "Wait for DNS propagation",
              body: "DNS changes can take 10 minutes to 48 hours to propagate worldwide. Once done, Vercel automatically provisions an SSL certificate.",
            },
          ].map((step) => (
            <li key={step.n} className="flex gap-4">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/40 font-display text-base text-gold">{step.n}</div>
              <div className="flex-1 pt-0.5">
                <p className="font-semibold text-navy">{step.title}</p>
                <p className="mt-1 text-sm text-slate-ink">{step.body}</p>
                {step.action && (
                  <a href={step.action.href} target="_blank" rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-navy px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-navy transition hover:bg-navy hover:text-cloud">
                    {step.action.label} →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-border bg-sky/20 p-5 text-sm text-slate-ink">
        Need help? Email <a href="mailto:hello@nova-systems.app" className="font-medium text-navy hover:text-gold">hello@nova-systems.app</a> and Nova Systems will walk you through it.
      </div>
    </div>
  );
}

// ── Admin icons ────────────────────────────────────────────────────────────────

const ICON_PATHS: Record<string, string> = {
  blog:     "M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  papers:   "M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z",
  library:  "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  podcast:  "M19 11a7 7 0 0 1-7 7m0 0a7 7 0 0 1-7-7m7 7v4m0 0H8m4 0h4M12 4a3 3 0 0 1 3 3v4a3 3 0 0 1-6 0V7a3 3 0 0 1 3-3z",
  events:   "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z",
  steeped:  "M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3",
  homepage: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  social:   "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 1 1 0-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 1 0 5.367-2.684 3 3 0 0 0-5.367 2.684zm0 9.316a3 3 0 1 0 5.368 2.684 3 3 0 0 0-5.368-2.684z",
  domain:   "M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9",
  support:  "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
};

function AdminIcon({ name }: { name: string }) {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS[name] ?? ""} />
    </svg>
  );
}

// ── Admin shell ────────────────────────────────────────────────────────────────

type Tab = "blog"|"papers"|"library"|"podcast"|"events"|"steeped"|"homepage"|"social"|"support"|"domain";
type TabDef = { id: Tab; label: string; icon: string };

const CONTENT_TABS: TabDef[] = [
  { id:"blog",     label:"Blog",             icon:"blog" },
  { id:"papers",   label:"Seminary Papers",  icon:"papers" },
  { id:"library",  label:"Library",          icon:"library" },
  { id:"podcast",  label:"Podcast",          icon:"podcast" },
  { id:"events",   label:"Theology on Tap",  icon:"events" },
  { id:"steeped",  label:"Steeped in Truth", icon:"steeped" },
];
const SETTINGS_TABS: TabDef[] = [
  { id:"homepage", label:"Homepage",         icon:"homepage" },
  { id:"social",   label:"Social Links",     icon:"social" },
  { id:"domain",   label:"Domain",           icon:"domain" },
  { id:"support",  label:"Support",          icon:"support" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === "true");
  const [activeTab, setActiveTab] = useState<Tab>("papers");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  const logout = () => { localStorage.removeItem(AUTH_KEY); setAuthed(false); };

  return (
    <div className="min-h-screen bg-cloud">
      {/* Sticky header — Nova Systems bar + tab bar */}
      <header className="sticky top-0 z-40">
        {/* Nova Systems top bar */}
        <div className="bg-navy px-6 py-2.5">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid h-7 w-7 place-items-center rounded-sm bg-gold">
                <span className="font-display text-sm font-bold leading-none text-navy">N</span>
              </div>
              <span className="text-sm font-medium text-cloud">Nova Systems</span>
            </div>
            <button
              onClick={() => setActiveTab("support")}
              className="text-xs uppercase tracking-[0.18em] text-cloud/70 transition hover:text-gold"
            >
              Contact Support
            </button>
          </div>
        </div>

        {/* Admin header */}
        <div className="border-b border-border bg-cloud/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-10">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 font-display text-base text-gold">M</span>
              <span className="font-display text-sm tracking-tight text-navy">Mars Hill <span className="text-gold">Admin</span></span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">← View site</Link>
              <button onClick={logout} className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">Sign out</button>
            </div>
          </div>

          {/* Tab bar — Content + Settings groups */}
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {/* Row 1: Content tabs */}
            <div className="flex items-center overflow-x-auto border-b border-border/30">
              <span className="shrink-0 pr-3 text-[9px] font-bold uppercase tracking-[0.32em] text-slate-ink/40">Content</span>
              {CONTENT_TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-3 text-xs font-medium uppercase tracking-[0.13em] transition ${activeTab===t.id ? "border-gold text-navy" : "border-transparent text-slate-ink hover:text-navy"}`}>
                  <AdminIcon name={t.icon} />{t.label}
                </button>
              ))}
            </div>
            {/* Row 2: Settings tabs */}
            <div className="flex items-center overflow-x-auto">
              <span className="shrink-0 pr-3 text-[9px] font-bold uppercase tracking-[0.32em] text-slate-ink/40">Settings</span>
              {SETTINGS_TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-3 text-xs font-medium uppercase tracking-[0.13em] transition ${activeTab===t.id ? "border-gold text-navy" : "border-transparent text-slate-ink hover:text-navy"}`}>
                  <AdminIcon name={t.icon} />{t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-soft lg:p-12">
          {activeTab==="papers"   && <PapersManager />}
          {activeTab==="library"  && <LibraryManager />}
          {activeTab==="podcast"  && <PodcastManager />}
          {activeTab==="events"   && <EventsManager />}
          {activeTab==="blog"     && <BlogManager />}
          {activeTab==="steeped"  && <SteepedManager />}
          {activeTab==="homepage" && <HomepageManager />}
          {activeTab==="social"   && <SocialLinksManager />}
          {activeTab==="support"  && <SupportTab />}
          {activeTab==="domain"   && <DomainTab />}
        </div>

        {/* Nova Systems footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-ink">
          <div className="grid h-5 w-5 place-items-center rounded-sm bg-gold">
            <span className="font-display text-[10px] font-bold text-navy">N</span>
          </div>
          <span>Nova Systems · <a href="mailto:hello@nova-systems.app" className="hover:text-gold transition">hello@nova-systems.app</a></span>
        </div>
      </main>
    </div>
  );
}
