import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase env tidak ditemukan. Pastikan file .env berisi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const CURRENT_USER_ID = "e9b6f1c2-2a3b-4c5d-8e6f-1234567890ab";
