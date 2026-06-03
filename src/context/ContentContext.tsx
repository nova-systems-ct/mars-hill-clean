import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// ── Types ────────────────────────────────────────────────────────────────────

export type PaperCategory =
  | "Doctrine"
  | "World Religions"
  | "Culture"
  | "History"
  | "Philosophy";

export type BookEra =
  | "Patristic"
  | "Reformation"
  | "Puritan"
  | "Modern"
  | "Apologetics";

export type Paper = {
  id: string;
  title: string;
  category: PaperCategory;
  year: string;
  summary: string;
  pdf_link?: string | null;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  era: BookEra;
  year: string;
  note: string;
};

export type Episode = {
  id: string;
  number: string;
  title: string;
  length: string;
};

// ── Seed data (used when tables are empty on first run) ───────────────────────

type PaperSeed = Omit<Paper, "id">;
type BookSeed = Omit<Book, "id">;
type EpisodeSeed = Omit<Episode, "id">;

export const SEED_PAPERS: PaperSeed[] = [
  { title: "The Arian Controversy", category: "History", year: "MMXX", summary: "On the fourth-century battle over the divinity of Christ and the Nicene response." },
  { title: "The Bible vs. the Qur'an", category: "World Religions", year: "MMXXI", summary: "A textual and theological comparison of two competing scriptural canons." },
  { title: "Critical Race Theory", category: "Culture", year: "MMXXII", summary: "A Reformed evaluation of CRT's underlying anthropology and worldview." },
  { title: "Islam — A Two-Page Summary", category: "World Religions", year: "MMXX", summary: "A concise primer on Islamic origins, theology, and key apologetic concerns." },
  { title: "The Kalam Cosmological Argument", category: "Philosophy", year: "MMXXII", summary: "On the classical theistic argument from the universe's beginning." },
  { title: "Matthew 25 — The Sheep & the Goats", category: "Doctrine", year: "MMXXI", summary: "Exegesis of the great judgment and the identity of 'the least of these.'" },
  { title: "Radical Two-Kingdom Theology", category: "Doctrine", year: "MMXXII", summary: "An examination and critique of the R2K project within Reformed circles." },
  { title: "Tacitus, The Annals 15:44", category: "History", year: "MMXX", summary: "Roman testimony to Christ and the early Christian movement." },
  { title: "The United Pentecostal Church", category: "Doctrine", year: "MMXXI", summary: "Modalism, oneness theology, and the historic doctrine of the Trinity." },
  { title: "Why God Allows Evil", category: "Philosophy", year: "MMXXIII", summary: "A theodicy rooted in the sovereignty and goodness of God." },
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

// Display-safe defaults shown while Supabase is loading
const DISPLAY_PAPERS: Paper[] = SEED_PAPERS.map((p, i) => ({ id: `loading-${i}`, ...p }));
const DISPLAY_BOOKS: Book[] = SEED_BOOKS.map((b, i) => ({ id: `loading-${i}`, ...b }));
const DISPLAY_EPISODES: Episode[] = SEED_EPISODES.map((e, i) => ({ id: `loading-${i}`, ...e }));

// ── Context ───────────────────────────────────────────────────────────────────

type Ctx = {
  papers: Paper[];
  books: Book[];
  episodes: Episode[];
  loading: boolean;
  dbError: string | null;
  addPaper: (p: PaperSeed) => Promise<void>;
  deletePaper: (id: string) => Promise<void>;
  resetPapers: () => Promise<void>;
  addBook: (b: BookSeed) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  resetBooks: () => Promise<void>;
  addEpisode: (e: EpisodeSeed) => Promise<void>;
  deleteEpisode: (id: string) => Promise<void>;
  resetEpisodes: () => Promise<void>;
};

const ContentContext = createContext<Ctx | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [papers, setPapers] = useState<Paper[]>(DISPLAY_PAPERS);
  const [books, setBooks] = useState<Book[]>(DISPLAY_BOOKS);
  const [episodes, setEpisodes] = useState<Episode[]>(DISPLAY_EPISODES);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    setDbError(null);
    try {
      const [pr, br, er] = await Promise.all([
        supabase.from("papers").select("*").order("created_at", { ascending: true }),
        supabase.from("library").select("*").order("created_at", { ascending: true }),
        supabase.from("episodes").select("*").order("created_at", { ascending: true }),
      ]);

      if (pr.error) throw new Error(`papers: ${pr.error.message}`);
      if (br.error) throw new Error(`library: ${br.error.message}`);
      if (er.error) throw new Error(`episodes: ${er.error.message}`);

      // Auto-seed empty tables on first run
      setPapers(pr.data.length > 0 ? pr.data : await seed("papers", SEED_PAPERS));
      setBooks(br.data.length > 0 ? br.data : await seed("library", SEED_BOOKS));
      setEpisodes(er.data.length > 0 ? er.data : await seed("episodes", SEED_EPISODES));
    } catch (err: unknown) {
      setDbError(err instanceof Error ? err.message : "Database error");
    } finally {
      setLoading(false);
    }
  }

  async function seed<T extends object>(table: string, rows: T[]): Promise<T[]> {
    const { data } = await supabase.from(table).insert(rows).select();
    return (data as T[]) ?? [];
  }

  // ── Papers ──────────────────────────────────────────────────────────────────

  const addPaper = async (p: PaperSeed) => {
    const { data, error } = await supabase.from("papers").insert([p]).select().single();
    if (!error && data) setPapers((prev) => [...prev, data as Paper]);
  };

  const deletePaper = async (id: string) => {
    const { error } = await supabase.from("papers").delete().eq("id", id);
    if (!error) setPapers((prev) => prev.filter((p) => p.id !== id));
  };

  const resetPapers = async () => {
    await supabase.from("papers").delete().not("id", "is", null);
    const fresh = await seed("papers", SEED_PAPERS);
    setPapers(fresh as Paper[]);
  };

  // ── Books ───────────────────────────────────────────────────────────────────

  const addBook = async (b: BookSeed) => {
    const { data, error } = await supabase.from("library").insert([b]).select().single();
    if (!error && data) setBooks((prev) => [...prev, data as Book]);
  };

  const deleteBook = async (id: string) => {
    const { error } = await supabase.from("library").delete().eq("id", id);
    if (!error) setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const resetBooks = async () => {
    await supabase.from("library").delete().not("id", "is", null);
    const fresh = await seed("library", SEED_BOOKS);
    setBooks(fresh as Book[]);
  };

  // ── Episodes ─────────────────────────────────────────────────────────────────

  const addEpisode = async (e: EpisodeSeed) => {
    const { data, error } = await supabase.from("episodes").insert([e]).select().single();
    if (!error && data) setEpisodes((prev) => [...prev, data as Episode]);
  };

  const deleteEpisode = async (id: string) => {
    const { error } = await supabase.from("episodes").delete().eq("id", id);
    if (!error) setEpisodes((prev) => prev.filter((e) => e.id !== id));
  };

  const resetEpisodes = async () => {
    await supabase.from("episodes").delete().not("id", "is", null);
    const fresh = await seed("episodes", SEED_EPISODES);
    setEpisodes(fresh as Episode[]);
  };

  return (
    <ContentContext.Provider
      value={{
        papers, books, episodes, loading, dbError,
        addPaper, deletePaper, resetPapers,
        addBook, deleteBook, resetBooks,
        addEpisode, deleteEpisode, resetEpisodes,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be inside ContentProvider");
  return ctx;
}
