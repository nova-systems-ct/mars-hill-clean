-- Run this in Supabase → SQL Editor
--
-- Repairs the live `comments` table. Diagnostic queries against the deployed
-- Supabase project confirmed two real problems, not "table doesn't exist":
--   1. INSERT fails with PGRST204 "Could not find the 'page_title' column of
--      'comments' in the schema cache" — the live table predates (or was
--      created separately from) 002_comments.sql and is missing that column.
--   2. INSERT fails with 42501 "new row violates row-level security policy"
--      — whatever INSERT policy exists on the live table does not actually
--      permit the anon role to insert, even though RLS is enabled.
-- This migration is a full repair: it's safe to run even if 002_comments.sql
-- was never run, was run partially, or the table was created by hand with a
-- different schema — every statement is idempotent.
--
-- This app has no service-role API route for writes — every table (papers,
-- library, episodes, events, blog_posts, comments) is written directly from
-- the browser using the anon/publishable key, because the admin dashboard
-- is a client-side password gate with no separate server session to attach
-- a service-role key to. That's why these policies are permissive for
-- anon rather than requiring a service role — it matches every other table
-- in this project, not a security gap specific to comments.

CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  commenter_name TEXT NOT NULL,
  commenter_email TEXT,
  comment_text TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Defensively add every column the app actually sends, in case the live
-- table was created by an earlier/partial/hand-written version of this SQL.
ALTER TABLE comments ADD COLUMN IF NOT EXISTS page_title TEXT;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS commenter_email TEXT;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS approved BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS comments_page_slug_idx ON comments (page_slug);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Grant base table privileges to anon — PostgREST needs both a GRANT and a
-- passing RLS policy; a table created outside Supabase's normal dashboard
-- flow can end up missing this even when RLS policies look correct.
GRANT SELECT, INSERT, UPDATE, DELETE ON comments TO anon;

-- Drop every policy name this table might currently have (from 002_comments.sql,
-- a hand-written version, or anything else) before recreating clean ones, so
-- the end state is deterministic regardless of what's there now.
DROP POLICY IF EXISTS "Allow anon select" ON comments;
DROP POLICY IF EXISTS "Allow anon insert" ON comments;
DROP POLICY IF EXISTS "Allow anon update" ON comments;
DROP POLICY IF EXISTS "Allow anon delete" ON comments;
DROP POLICY IF EXISTS allow_insert ON comments;
DROP POLICY IF EXISTS allow_select_approved ON comments;

-- SELECT is open to anon (not just approved=true) because the admin's
-- Comments tab moderates using this same anon-key client — it has to be
-- able to see pending comments to approve them. Public pages only ever
-- *render* approved=true comments (enforced in the app, not the database).
CREATE POLICY "comments_anon_select" ON comments FOR SELECT TO anon USING (true);
CREATE POLICY "comments_anon_insert" ON comments FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "comments_anon_update" ON comments FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "comments_anon_delete" ON comments FOR DELETE TO anon USING (true);

-- Verify — should show page_title present and all four policies listed.
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'comments';
SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'comments';
