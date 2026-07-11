import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// ── Types ─────────────────────────────────────────────────────────────────────

export type PaperCategory = "Doctrine" | "World Religions" | "Culture" | "History" | "Philosophy";
export type BookEra = "Patristic" | "Reformation" | "Puritan" | "Modern" | "Apologetics";
export type EventType = "in-person" | "hybrid";

export type Paper    = { id: string; title: string; category: PaperCategory; year: string; summary: string; pdf_link?: string | null; };
export type Book     = { id: string; title: string; author: string; era: BookEra; year: string; note: string; cover_url?: string | null; link_url?: string | null; };
export type Episode  = { id: string; number: string; title: string; length: string; };
export type Event    = { id: string; title: string; date_text: string; location: string; type: EventType; };
export type BlogPost = { id: string; title: string; category: string; date_text: string; summary: string; content: string; image_url?: string | null; site?: string; };
export type SiteSettings = Record<string, string>;

// Seed types (no id — used only for inserts)
type PaperSeed    = Omit<Paper, "id">;
type BookSeed     = Omit<Book, "id">;
type EpisodeSeed  = Omit<Episode, "id">;
type EventSeed    = Omit<Event, "id">;
type BlogPostSeed = Omit<BlogPost, "id">;

// ── Seed data — events and blog posts only ────────────────────────────────────
// Papers, books, and episodes have NO hardcoded fallback — they come from
// Supabase only. An empty Supabase result renders an empty-state message.

export const SEED_EVENTS: EventSeed[] = [
  { title: "The Bane of Pietism on American Culture", date_text: "Jun 12", location: "In Person CT", type: "in-person" },
];

export const SEED_BLOG_POSTS: BlogPostSeed[] = [
  { title: "On the Knowledge of God",                category: "Theology",       date_text: "May 28, 2026",   summary: "Calvin opens the Institutes with a hinge: we cannot know ourselves without knowing God, nor God without knowing ourselves. A meditation.",                                content: "", image_url: null, site: "marshill" },
  { title: "The Kalam Argument, Revisited",           category: "Apologetics",    date_text: "May 14, 2026",   summary: "A short defense of the second premise — that the universe began to exist — drawing on contemporary cosmology and classical metaphysics.",                            content: "", image_url: null, site: "marshill" },
  { title: "Machen Still Speaks",                     category: "Church History",  date_text: "April 30, 2026", summary: "A century after Christianity and Liberalism, Machen's diagnosis remains startlingly current. The two religions still walk our pews.",                               content: "", image_url: null, site: "marshill" },
  { title: "Reading Edwards on the Affections",       category: "Puritans",        date_text: "April 12, 2026", summary: "Jonathan Edwards on the marks of genuine religious affection — and why every believer should sit, slowly, with this Puritan classic.",                              content: "", image_url: null, site: "marshill" },
  { title: "The Trinity and the Modalist Temptation", category: "Doctrine",        date_text: "March 27, 2026", summary: "Why oneness theology continually re-emerges, and why the historic doctrine of the Trinity is not a riddle but a refuge.",                                          content: "", image_url: null, site: "marshill" },
  { title: "Why God Allows Evil",                     category: "Philosophy",      date_text: "March 06, 2026", summary: "A working theodicy rooted in the sovereignty and goodness of God — and an honest reckoning with the limits of our seeing.",                                      content: "", image_url: null, site: "marshill" },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  hero_tagline:         "Defending truth. Pursuing wisdom. Equipping believers to think Biblically — with the rigor of the academy and the reverence of the church.",
  scripture_quote:      "Always be prepared to give an answer.",
  scripture_reference:  "1 Peter 3:15",
  youtube_url:          "https://www.youtube.com/@marshillnewengland2027",
  facebook_url:         "https://www.facebook.com/share/g/14dGK4RaWGr/",
  spotify_url:          "https://open.spotify.com/show/4xnDbJFrb1gpwHfyEabZoG",
  steeped_current_book:    "Pilgrim's Progress",
  steeped_current_author:  "John Bunyan",
  steeped_past_readings:   "Mere Christianity — C. S. Lewis",
  steeped_meeting_time:    "Thursday nights at 7:00 PM EST",
  steeped_contact_email:   "tlcleon@gmail.com",
};

// ── Context type ──────────────────────────────────────────────────────────────

type Ctx = {
  papers: Paper[];    books: Book[];    episodes: Episode[];
  events: Event[];    blogPosts: BlogPost[];
  settings: SiteSettings;
  loading: boolean;   dbError: string | null;
  // papers
  addPaper:    (p: PaperSeed)                           => Promise<Paper | null>;
  updatePaper: (id: string, data: Partial<PaperSeed>)   => Promise<void>;
  deletePaper: (id: string)                             => Promise<void>;
  resetPapers: ()                                       => Promise<void>;
  // books
  addBook:     (b: BookSeed)                            => Promise<void>;
  updateBook:  (id: string, data: Partial<BookSeed>)    => Promise<void>;
  deleteBook:  (id: string)                             => Promise<void>;
  resetBooks:  ()                                       => Promise<void>;
  // episodes
  addEpisode:     (e: EpisodeSeed)                         => Promise<void>;
  updateEpisode:  (id: string, data: Partial<EpisodeSeed>) => Promise<void>;
  deleteEpisode:  (id: string)                             => Promise<void>;
  resetEpisodes:  ()                                       => Promise<void>;
  // events
  addEvent:    (e: EventSeed)                           => Promise<void>;
  updateEvent: (id: string, data: Partial<EventSeed>)   => Promise<void>;
  deleteEvent: (id: string)                             => Promise<void>;
  resetEvents: ()                                       => Promise<void>;
  // blog posts
  addBlogPost:    (p: BlogPostSeed)                         => Promise<void>;
  updateBlogPost: (id: string, data: Partial<BlogPostSeed>) => Promise<void>;
  deleteBlogPost: (id: string)                              => Promise<void>;
  // settings
  updateSetting:  (key: string, value: string)              => Promise<void>;
  updateSettings: (patch: SiteSettings)                     => Promise<void>;
  getSetting:     (key: string, fallback?: string)          => string;
  resetSettings:  ()                                        => Promise<void>;
};

const ContentContext = createContext<Ctx | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function ContentProvider({ children }: { children: React.ReactNode }) {
  // Papers, books, and episodes start empty — populated from Supabase only
  const [papers,    setPapers]    = useState<Paper[]>([]);
  const [books,     setBooks]     = useState<Book[]>([]);
  const [episodes,  setEpisodes]  = useState<Episode[]>([]);
  // Events and blog posts seed on first visit if Supabase is empty
  const [events,    setEvents]    = useState<Event[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [settings,  setSettings]  = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading,   setLoading]   = useState(true);
  const [dbError,   setDbError]   = useState<string | null>(null);

  useEffect(() => { loadAll(); }, []);

  /** Seed helper — only used for events and blog posts. */
  async function seedTable<T extends object>(table: string, rows: T[]): Promise<T[]> {
    try {
      const { data, error } = await supabase.from(table).insert(rows).select();
      if (!error && data?.length) return data as T[];
    } catch { /* ignore */ }
    return rows.map((r, i) => ({ ...r, id: `local_${i}` })) as unknown as T[];
  }

  async function loadAll() {
    setLoading(true);
    setDbError(null);

    try {
      const [pr, br, er, evr, blr, stgr] = await Promise.all([
        supabase.from("papers").select("*").order("created_at"),
        supabase.from("library").select("*").order("created_at"),
        supabase.from("episodes").select("*").order("created_at"),
        supabase.from("events").select("*").order("created_at"),
        supabase.from("blog_posts").select("*").eq("site", "marshill").order("created_at", { ascending: false }),
        supabase.from("site_settings").select("key,value"),
      ]);

      const errors: string[] = [];
      if (pr.error)   errors.push(`papers: ${pr.error.message}`);
      if (br.error)   errors.push(`library: ${br.error.message}`);
      if (er.error)   errors.push(`episodes: ${er.error.message}`);
      if (evr.error)  errors.push(`events: ${evr.error.message}`);
      if (blr.error)  errors.push(`blog_posts: ${blr.error.message}`);
      if (stgr.error) errors.push(`site_settings: ${stgr.error.message}`);
      if (errors.length) setDbError(errors.join(" | "));

      // Papers — Supabase only; empty Supabase result → empty array (no seed)
      if (!pr.error) setPapers((pr.data ?? []) as Paper[]);

      // Books / Library — Supabase only
      if (!br.error) setBooks((br.data ?? []) as Book[]);

      // Episodes — Supabase only
      if (!er.error) setEpisodes((er.data ?? []) as Episode[]);

      // Events — seed on first visit if table is empty
      if (!evr.error) {
        setEvents(evr.data?.length
          ? (evr.data as Event[])
          : (await seedTable("events", SEED_EVENTS)) as unknown as Event[]);
      }

      // Blog posts — seed on first visit if table is empty
      if (!blr.error) {
        setBlogPosts(blr.data?.length
          ? (blr.data as BlogPost[])
          : (await seedTable("blog_posts", SEED_BLOG_POSTS)) as unknown as BlogPost[]);
      }

      // Settings
      if (!stgr.error) {
        if (!stgr.data?.length) {
          const rows = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({ key, value }));
          await supabase.from("site_settings").insert(rows);
          setSettings({ ...DEFAULT_SETTINGS });
        } else {
          const map = { ...DEFAULT_SETTINGS };
          for (const row of stgr.data) map[row.key] = row.value;
          setSettings(map);
        }
      }
    } catch (err: unknown) {
      setDbError(err instanceof Error ? err.message : "Unexpected error loading data");
    } finally {
      setLoading(false);
    }
  }

  // ── Papers ────────────────────────────────────────────────────────────────

  const addPaper = async (p: PaperSeed): Promise<Paper | null> => {
    const { data, error } = await supabase.from("papers").insert([p]).select().single();
    if (!error && data) {
      setPapers(prev => [...prev, data as Paper]);
      return data as Paper;
    }
    return null;
  };
  const updatePaper = async (id: string, data: Partial<PaperSeed>) => {
    const { error } = await supabase.from("papers").update(data).eq("id", id);
    if (!error) setPapers(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };
  const deletePaper = async (id: string) => {
    const { error } = await supabase.from("papers").delete().eq("id", id);
    if (!error) setPapers(prev => prev.filter(p => p.id !== id));
  };
  // Deletes all papers — no re-seed (seed data was removed)
  const resetPapers = async () => {
    await supabase.from("papers").delete().not("id", "is", null);
    setPapers([]);
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
  // Deletes all books — no re-seed
  const resetBooks = async () => {
    await supabase.from("library").delete().not("id", "is", null);
    setBooks([]);
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
  // Deletes all episodes — no re-seed
  const resetEpisodes = async () => {
    await supabase.from("episodes").delete().not("id", "is", null);
    setEpisodes([]);
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
    setEvents(await seedTable("events", SEED_EVENTS) as unknown as Event[]);
  };

  // ── Blog posts ────────────────────────────────────────────────────────────

  const addBlogPost = async (p: BlogPostSeed) => {
    const { data, error } = await supabase.from("blog_posts").insert([{ ...p, site: "marshill" }]).select().single();
    if (!error && data) setBlogPosts(prev => [data as BlogPost, ...prev]);
  };
  const updateBlogPost = async (id: string, data: Partial<BlogPostSeed>) => {
    const { error } = await supabase.from("blog_posts").update(data).eq("id", id).eq("site", "marshill");
    if (!error) setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };
  const deleteBlogPost = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id).eq("site", "marshill");
    if (!error) setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  // ── Settings ──────────────────────────────────────────────────────────────

  const updateSetting = async (key: string, value: string) => {
    const { error } = await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
    if (!error) setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateSettings = async (patch: SiteSettings) => {
    const rows = Object.entries(patch).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
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
