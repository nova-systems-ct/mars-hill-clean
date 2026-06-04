-- Run this in Supabase → SQL Editor
-- Fixes: (1) adds missing UPDATE/DELETE RLS policies so the admin can edit papers
--        (2) sets pdf_link for all 8 seminary papers

-- ── 1. RLS policies ──────────────────────────────────────────────────────────
-- Papers table needs all four operations open to anon for the client-side admin.
-- SELECT policy probably already exists; these are safe to re-run (IF NOT EXISTS).

ALTER TABLE papers ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='papers' AND policyname='Allow anon select'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow anon select" ON papers FOR SELECT TO anon USING (true)';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='papers' AND policyname='Allow anon insert'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow anon insert" ON papers FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='papers' AND policyname='Allow anon update'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow anon update" ON papers FOR UPDATE TO anon USING (true) WITH CHECK (true)';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='papers' AND policyname='Allow anon delete'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow anon delete" ON papers FOR DELETE TO anon USING (true)';
  END IF;
END $$;

-- ── 2. Set pdf_link for all 8 papers ────────────────────────────────────────
-- Base: https://mokyqxfgvdxajxytkcat.supabase.co/storage/v1/object/public/papers/

UPDATE papers SET pdf_link = 'https://mokyqxfgvdxajxytkcat.supabase.co/storage/v1/object/public/papers/bible_vs_quran.pdf'
  WHERE id = 43;

UPDATE papers SET pdf_link = 'https://mokyqxfgvdxajxytkcat.supabase.co/storage/v1/object/public/papers/PrecisIslam.pdf'
  WHERE id = 45;

UPDATE papers SET pdf_link = 'https://mokyqxfgvdxajxytkcat.supabase.co/storage/v1/object/public/papers/Kalam_cosmological%20(1).pdf'
  WHERE id = 46;

UPDATE papers SET pdf_link = 'https://mokyqxfgvdxajxytkcat.supabase.co/storage/v1/object/public/papers/Final%20Exegetical%20Project%20Matthew%2025%20.pdf'
  WHERE id = 47;

UPDATE papers SET pdf_link = 'https://mokyqxfgvdxajxytkcat.supabase.co/storage/v1/object/public/papers/Radical%20Two%20Kingdom%20Theology%20.pdf'
  WHERE id = 48;

UPDATE papers SET pdf_link = 'https://mokyqxfgvdxajxytkcat.supabase.co/storage/v1/object/public/papers/Tacitus_updated2.pdf'
  WHERE id = 49;

UPDATE papers SET pdf_link = 'https://mokyqxfgvdxajxytkcat.supabase.co/storage/v1/object/public/papers/Leonetti,%20John,%20Why%20the%20United%20Pentecostal%20Church%20is%20wrong%20on%20modalism.pdf'
  WHERE id = 50;

UPDATE papers SET pdf_link = 'https://mokyqxfgvdxajxytkcat.supabase.co/storage/v1/object/public/papers/Leonetti,%20John,%20F19%20WGAE%20paper%20.pdf'
  WHERE id = 51;

-- Verify:
SELECT id, title, pdf_link FROM papers ORDER BY id;
