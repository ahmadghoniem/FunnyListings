import { createClient } from "@supabase/supabase-js";
if (import.meta.env.DEV) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
} else if (import.meta.env.PROD) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_KEY;
}

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
