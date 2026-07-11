-- Run this in Supabase → SQL Editor
-- Adds a comments table for blog posts and the seminary papers page, with the
-- same anon-role RLS pattern already used by papers/library/episodes/events
-- (this app's admin has no separate service-role session — it's a single
-- client-side password gate using the same publishable key as the public
-- site, so RLS can't distinguish "admin" from "visitor" at the database
-- layer; moderation is enforced in the app by only ever *displaying*
-- approved=true comments on public pages).

CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  page_title TEXT,
  commenter_name TEXT NOT NULL,
  commenter_email TEXT,
  comment_text TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS comments_page_slug_idx ON comments (page_slug);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='comments' AND policyname='Allow anon select'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow anon select" ON comments FOR SELECT TO anon USING (true)';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='comments' AND policyname='Allow anon insert'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow anon insert" ON comments FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='comments' AND policyname='Allow anon update'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow anon update" ON comments FOR UPDATE TO anon USING (true) WITH CHECK (true)';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='comments' AND policyname='Allow anon delete'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow anon delete" ON comments FOR DELETE TO anon USING (true)';
  END IF;
END $$;
