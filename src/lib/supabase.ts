import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const isSupabaseConfigured = !!url && !!key;

if (!isSupabaseConfigured) {
  console.error("[supabase] VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY are not set — nothing that reads or writes data will work.");
}

export const supabase = createClient(url, key);
