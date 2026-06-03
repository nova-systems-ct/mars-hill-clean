import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// ── Types ─────────────────────────────────────────────────────────────────────

export type PaperCategory = "Doctrine" | "World Religions" | "Culture" | "History" | "Philosophy";
export type BookEra = "Patristic" | "Reformation" | "Puritan" | "Modern" | "Apologetics";
export type EventType = "in-person" | "zoom" | "hybrid";

export type Paper   = { id: string; title: string; category: PaperCategory; year: string; summary: string; pdf_link?: string | null; };
export type Book    = { id: string; title: string; author: string; era: BookEra; year: string; note: string; cover_url?: string | null; link_url?: string | null; };
export type Episode = { id: string; number: string; title: string; length: string; };
export type Event   = { id: string; title: string; date_text: string; location: string; type: EventType; zoom_link?: string | null; };
export type BlogPost = { id: string; title: string; category: string; date_text: string; summary: string; content: string; image_url?: string | null; };
export type SiteSettings = Record<string, string>;

type PaperSeed    = Omit<Paper, "id">;
type BookSeed     = Omit<Book, "id">;
type EpisodeSeed  = Omit<Episode, "id">;
type EventSeed    = Omit<Event, "id">;
type BlogPostSeed = Omit<BlogPost, "id">;

// ── Seed / default data ───────────────────────────────────────────────────────

export const SEED_PAPERS: PaperSeed[] = [
  { title: "The Arian Controversy", category: "History", year: "MMXX", summary: "On the fourth-century battle over the divinity of Christ and the Nicene response.", pdf_link: "https://marshillapologetics.com/wp-content/uploads/2024/03/arian-controversy.pdf" },
  { title: "The Bible vs. the Qur'an", category: "World Religions", year: "MMXXI", summary: "A textual and theological comparison of two competing scriptural canons.", pdf_link: "https://marshillapologetics.com/wp-content/uploads/2024/03/bible_vs_quran.pdf" },
  { title: "Critical Race Theory", category: "Culture", year: "MMXXII", summary: "A Reformed evaluation of CRT's underlying anthropology and worldview.", pdf_link: "https://marshillapologetics.com/wp-content/uploads/2024/03/crt_analytical-toolfinal-1.pdf" },
  { title: "Islam — A Two-Page Summary", category: "World Religions", year: "MMXX", summary: "A concise primer on Islamic origins, theology, and key apologetic concerns.", pdf_link: "https://marshillapologetics.com/wp-content/uploads/2024/03/precisislam.pdf" },
  { title: "The Kalam Cosmological Argument", category: "Philosophy", year: "MMXXII", summary: "On the classical theistic argument from the universe's beginning.", pdf_link: "https://marshillapologetics.com/wp-content/uploads/2024/03/kalam_cosmological.pdf" },
  { title: "Matthew 25 — The Sheep & the Goats", category: "Doctrine", year: "MMXXI", summary: "Exegesis of the great judgment and the identity of 'the least of these.'", pdf_link: "https://marshillapologetics.com/wp-content/uploads/2024/03/final-exegetical-project-matthew-25-.pdf" },
  { title: "Radical Two-Kingdom Theology", category: "Doctrine", year: "MMXXII", summary: "An examination and critique of the R2K project within Reformed circles.", pdf_link: "https://marshillapologetics.com/wp-content/uploads/2024/03/radical-two-kingdom-theology-.pdf" },
  { title: "Tacitus, The Annals 15:44", category: "History", year: "MMXX", summary: "Roman testimony to Christ and the early Christian movement.", pdf_link: "https://marshillapologetics.com/wp-content/uploads/2024/03/tacitus_updated2.pdf" },
  { title: "The United Pentecostal Church", category: "Doctrine", year: "MMXXI", summary: "Modalism, oneness theology, and the historic doctrine of the Trinity.", pdf_link: "https://marshillapologetics.com/wp-content/uploads/2024/03/leonetti-john-why-the-united-pentecostal-church-is-wrong-on-modalism.pdf" },
  { title: "Why God Allows Evil", category: "Philosophy", year: "MMXXIII", summary: "A theodicy rooted in the sovereignty and goodness of God.", pdf_link: "https://marshillapologetics.com/wp-content/uploads/2024/03/leonetti-john-f19-wgae-.pdf" },
];

export const SEED_BOOKS: BookSeed[] = [
  { title: "Institutes of the Christian Religion", author: "John Calvin", era: "Reformation", year: "1559", note: "The cornerstone of Reformed systematic theology." },
  { title: "The Bondage of the Will", author: "Martin Luther", era: "Reformation", year: "1525", note: "The hinge of the Reformation — grace, will, and Scripture." },
  { title: "On the Incarnation", author: "Athanasius", era: "Patristic", year: "318", note: "The classic defense of the divinity of the Son." },
  { title: "Confessions", author: "Augustine", era: "Patristic", year: "400", note: "The soul laid bare before a sovereign God." },
  { title: "The Religious Affections", author: "Jonathan Edwards", era: "Puritan", year: "1746", note: "On the marks of true gracious affection in the soul." },
  { title: "Pilgrim's Progress", author: "John Bunyan", era: "Puritan", year: "1678", note: "An allegory of the Christian life — unrivaled." },
  { title: "The Mortification of Sin", author: "John Owen", era: "Puritan", year: "1656", note: "Be killing sin or it will be killing you." },
  { title: "Christianity and Liberalism", author: "J. Gresham Machen", era: "Modern", year: "1923", note: "A bracing defense of historic Christian faith." },
  { title: "The Inspiration and Authority of the Bible", author: "B. B. Warfield", era: "Modern", year: "1948", note: "Princeton's defense of Scripture." },
  { title: "Mere Christianity", author: "C. S. Lewis", era: "Apologetics", year: "1952", note: "Accessible Christian apologetics at its finest." },
  { title: "The Reason for God", author: "Timothy Keller", era: "Apologetics", year: "2008", note: "Apologetics for the skeptical and the seeking." },
  { title: "Reasonable Faith", author: "William Lane Craig", era: "Apologetics", year: "2008", note: "The Kalam argument and a rigorous case for theism." },
];

export const SEED_EPISODES: EpisodeSeed[] = [
  { number: "01", title: "Calvin on the Knowledge of God", length: "42 min" },
  { number: "02", title: "B.B. Warfield on Inspiration", length: "38 min" },
  { number: "03", title: "Luther's Bondage of the Will", length: "51 min" },
  { number: "04", title: "Machen — Christianity and Liberalism", length: "47 min" },
];

export const SEED_EVENTS: EventSeed[] = [
  { title: "The Sovereignty of God in Suffering", date_text: "Mar 14", location: "In Person · CT", type: "in-person" },
  { title: "Reading Calvin's Institutes, Book I", date_text: "Apr 11", location: "Hybrid · Zoom", type: "hybrid" },
  { title: "Machen on Liberalism, a Century Later", date_text: "May 09", location: "Guest Speaker", type: "hybrid" },
];

export const SEED_BLOG_POSTS: BlogPostSeed[] = [
  { title: "On the Knowledge of God", category: "Theology", date_text: "May 28, 2026", summary: "Calvin opens the Institutes with a hinge: we cannot know ourselves without knowing God, nor God without knowing ourselves. A meditation.", content: "", image_url: null },
  { title: "The Kalam Argument, Revisited", category: "Apologetics", date_text: "May 14, 2026", summary: "A short defense of the second premise — that the universe began to exist — drawing on contemporary cosmology and classical metaphysics.", content: "", image_url: null },
  { title: "Machen Still Speaks", category: "Church History", date_text: "April 30, 2026", summary: "A century after Christianity and Liberalism, Machen's diagnosis remains startlingly current. The two religions still walk our pews.", content: "", image_url: null },
  { title: "Reading Edwards on the Affections", category: "Puritans", date_text: "April 12, 2026", summary: "Jonathan Edwards on the marks of genuine religious affection — and why every believer should sit, slowly, with this Puritan classic.", content: "", image_url: null },
  { title: "The Trinity and the Modalist Temptation", category: "Doctrine", date_text: "March 27, 2026", summary: "Why oneness theology continually re-emerges, and why the historic doctrine of the Trinity is not a riddle but a refuge.", content: "", image_url: null },
  { title: "Why God Allows Evil", category: "Philosophy", date_text: "March 06, 2026", summary: "A working theodicy rooted in the sovereignty and goodness of God — and an honest reckoning with the limits of our seeing.", content: "", image_url: null },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  hero_tagline: "Defending truth. Pursuing wisdom. Equipping men to think Biblically — with the rigor of the academy and the reverence of the church.",
  scripture_quote: "Always be prepared to give an answer.",
  scripture_reference: "1 Peter 3:15",
  youtube_url: "https://www.youtube.com/channel/UCIDs8zPms4tbsYJKOu",
  facebook_url: "https://www.facebook.com/marshillapologetics",
  spotify_url: "https://open.spotify.com/show/4xnDbJFrb1gpwHfyEabZoG",
  steeped_current_book: "Pilgrim's Progress",
  steeped_current_author: "John Bunyan",
  steeped_past_readings: "Mere Christianity — C. S. Lewis",
  steeped_meeting_time: "Thursday nights at 7:00 PM EST",
  steeped_contact_email: "tlcleon@gmail.com",
};

// Display-safe placeholders while Supabase loads
const mkPapers    = (): Paper[]    => SEED_PAPERS.map((p, i)  => ({ id: `l${i}`, ...p }));
const mkBooks     = (): Book[]     => SEED_BOOKS.map((b, i)   => ({ id: `l${i}`, ...b }));
const mkEpisodes  = (): Episode[]  => SEED_EPISODES.map((e, i) => ({ id: `l${i}`, ...e }));
const mkEvents    = (): Event[]    => SEED_EVENTS.map((e, i)  => ({ id: `l${i}`, ...e }));
const mkPosts     = (): BlogPost[] => SEED_BLOG_POSTS.map((p, i) => ({ id: `l${i}`, ...p }));

// ── Context type ──────────────────────────────────────────────────────────────

type Ctx = {
  papers: Paper[];    books: Book[];    episodes: Episode[];
  events: Event[];    blogPosts: BlogPost[];
  settings: SiteSettings;
  loading: boolean;   dbError: string | null;
  // papers
  addPaper: (p: PaperSeed) => Promise<void>;
  updatePaper: (id: string, data: Partial<PaperSeed>) => Promise<void>;
  deletePaper: (id: string) => Promise<void>;
  resetPapers: () => Promise<void>;
  // books
  addBook: (b: BookSeed) => Promise<void>;
  updateBook: (id: string, data: Partial<BookSeed>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  resetBooks: () => Promise<void>;
  // episodes
  addEpisode: (e: EpisodeSeed) => Promise<void>;
  updateEpisode: (id: string, data: Partial<EpisodeSeed>) => Promise<void>;
  deleteEpisode: (id: string) => Promise<void>;
  resetEpisodes: () => Promise<void>;
  // events
  addEvent: (e: EventSeed) => Promise<void>;
  updateEvent: (id: string, data: Partial<EventSeed>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  resetEvents: () => Promise<void>;
  // blog posts
  addBlogPost: (p: BlogPostSeed) => Promise<void>;
  updateBlogPost: (id: string, data: Partial<BlogPostSeed>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  // settings
  updateSetting: (key: string, value: string) => Promise<void>;
  updateSettings: (patch: SiteSettings) => Promise<void>;
  getSetting: (key: string, fallback?: string) => string;
  resetSettings: () => Promise<void>;
};

const ContentContext = createContext<Ctx | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [papers,    setPapers]    = useState<Paper[]>(mkPapers());
  const [books,     setBooks]     = useState<Book[]>(mkBooks());
  const [episodes,  setEpisodes]  = useState<Episode[]>(mkEpisodes());
  const [events,    setEvents]    = useState<Event[]>(mkEvents());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mkPosts());
  const [settings,  setSettings]  = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading,   setLoading]   = useState(true);
  const [dbError,   setDbError]   = useState<string | null>(null);

  useEffect(() => { loadAll(); }, []);

  async function seedTable<T extends object>(table: string, rows: T[]): Promise<T[]> {
    const { data } = await supabase.from(table).insert(rows).select();
    return (data as T[]) ?? [];
  }

  async function loadAll() {
    setLoading(true); setDbError(null);
    try {
      const [pr, br, er, evr, blr, stgr] = await Promise.all([
        supabase.from("papers").select("*").order("created_at"),
        supabase.from("library").select("*").order("created_at"),
        supabase.from("episodes").select("*").order("created_at"),
        supabase.from("events").select("*").order("created_at"),
        supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
        supabase.from("site_settings").select("key,value"),
      ]);

      if (pr.error)  throw new Error(`papers: ${pr.error.message}`);
      if (br.error)  throw new Error(`library: ${br.error.message}`);
      if (er.error)  throw new Error(`episodes: ${er.error.message}`);
      if (evr.error) throw new Error(`events: ${evr.error.message}`);
      if (blr.error) throw new Error(`blog_posts: ${blr.error.message}`);
      if (stgr.error) throw new Error(`site_settings: ${stgr.error.message}`);

      setPapers(pr.data.length   ? pr.data  : await seedTable("papers",    SEED_PAPERS));
      setBooks(br.data.length    ? br.data  : await seedTable("library",   SEED_BOOKS));
      setEpisodes(er.data.length ? er.data  : await seedTable("episodes",  SEED_EPISODES));
      setEvents(evr.data.length  ? evr.data : await seedTable("events",    SEED_EVENTS));
      setBlogPosts(blr.data.length ? blr.data : await seedTable("blog_posts", SEED_BLOG_POSTS));

      if (stgr.data.length === 0) {
        const rows = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({ key, value }));
        await supabase.from("site_settings").insert(rows);
        setSettings({ ...DEFAULT_SETTINGS });
      } else {
        const map = { ...DEFAULT_SETTINGS };
        for (const row of stgr.data) map[row.key] = row.value;
        setSettings(map);
      }
    } catch (err: unknown) {
      setDbError(err instanceof Error ? err.message : "Database error");
    } finally {
      setLoading(false);
    }
  }

  // ── Papers ────────────────────────────────────────────────────────────────

  const addPaper = async (p: PaperSeed) => {
    const { data, error } = await supabase.from("papers").insert([p]).select().single();
    if (!error && data) setPapers(prev => [...prev, data as Paper]);
  };
  const updatePaper = async (id: string, data: Partial<PaperSeed>) => {
    const { error } = await supabase.from("papers").update(data).eq("id", id);
    if (!error) setPapers(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };
  const deletePaper = async (id: string) => {
    const { error } = await supabase.from("papers").delete().eq("id", id);
    if (!error) setPapers(prev => prev.filter(p => p.id !== id));
  };
  const resetPapers = async () => {
    await supabase.from("papers").delete().not("id", "is", null);
    setPapers(await seedTable("papers", SEED_PAPERS) as Paper[]);
  };

  // ── Books ─────────────────────────────────────────────────────────────────

  const addBook = async (b: BookSeed) => {
    const { data, error } = await supabase.from("library").insert([b]).select().single();
    if (!error && data) setBooks(prev => [...prev, data as Book]);
  };
  const updateBook = async (id: string, data: Partial<BookSeed>) => {
    const { error } = await supabase.from("library").update(data).eq("id", id);
    if (!error) setBooks(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
  };
  const deleteBook = async (id: string) => {
    const { error } = await supabase.from("library").delete().eq("id", id);
    if (!error) setBooks(prev => prev.filter(b => b.id !== id));
  };
  const resetBooks = async () => {
    await supabase.from("library").delete().not("id", "is", null);
    setBooks(await seedTable("library", SEED_BOOKS) as Book[]);
  };

  // ── Episodes ──────────────────────────────────────────────────────────────

  const addEpisode = async (e: EpisodeSeed) => {
    const { data, error } = await supabase.from("episodes").insert([e]).select().single();
    if (!error && data) setEpisodes(prev => [...prev, data as Episode]);
  };
  const updateEpisode = async (id: string, data: Partial<EpisodeSeed>) => {
    const { error } = await supabase.from("episodes").update(data).eq("id", id);
    if (!error) setEpisodes(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  };
  const deleteEpisode = async (id: string) => {
    const { error } = await supabase.from("episodes").delete().eq("id", id);
    if (!error) setEpisodes(prev => prev.filter(e => e.id !== id));
  };
  const resetEpisodes = async () => {
    await supabase.from("episodes").delete().not("id", "is", null);
    setEpisodes(await seedTable("episodes", SEED_EPISODES) as Episode[]);
  };

  // ── Events ────────────────────────────────────────────────────────────────

  const addEvent = async (e: EventSeed) => {
    const { data, error } = await supabase.from("events").insert([e]).select().single();
    if (!error && data) setEvents(prev => [...prev, data as Event]);
  };
  const updateEvent = async (id: string, data: Partial<EventSeed>) => {
    const { error } = await supabase.from("events").update(data).eq("id", id);
    if (!error) setEvents(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  };
  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) setEvents(prev => prev.filter(e => e.id !== id));
  };
  const resetEvents = async () => {
    await supabase.from("events").delete().not("id", "is", null);
    setEvents(await seedTable("events", SEED_EVENTS) as Event[]);
  };

  // ── Blog posts ────────────────────────────────────────────────────────────

  const addBlogPost = async (p: BlogPostSeed) => {
    const { data, error } = await supabase.from("blog_posts").insert([p]).select().single();
    if (!error && data) setBlogPosts(prev => [data as BlogPost, ...prev]);
  };
  const updateBlogPost = async (id: string, data: Partial<BlogPostSeed>) => {
    const { error } = await supabase.from("blog_posts").update(data).eq("id", id);
    if (!error) setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };
  const deleteBlogPost = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (!error) setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  // ── Settings ──────────────────────────────────────────────────────────────

  const updateSetting = async (key: string, value: string) => {
    const { error } = await supabase.from("site_settings")
      .upsert({ key, value }, { onConflict: "key" });
    if (!error) setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateSettings = async (patch: SiteSettings) => {
    const rows = Object.entries(patch).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("site_settings")
      .upsert(rows, { onConflict: "key" });
    if (!error) setSettings(prev => ({ ...prev, ...patch }));
  };

  const getSetting = useCallback(
    (key: string, fallback = "") => settings[key] ?? fallback,
    [settings]
  );

  const resetSettings = async () => {
    await supabase.from("site_settings").delete().not("id", "is", null);
    const rows = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({ key, value }));
    await supabase.from("site_settings").insert(rows);
    setSettings({ ...DEFAULT_SETTINGS });
  };

  return (
    <ContentContext.Provider value={{
      papers, books, episodes, events, blogPosts, settings, loading, dbError,
      addPaper, updatePaper, deletePaper, resetPapers,
      addBook, updateBook, deleteBook, resetBooks,
      addEpisode, updateEpisode, deleteEpisode, resetEpisodes,
      addEvent, updateEvent, deleteEvent, resetEvents,
      addBlogPost, updateBlogPost, deleteBlogPost,
      updateSetting, updateSettings, getSetting, resetSettings,
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be inside ContentProvider");
  return ctx;
}
