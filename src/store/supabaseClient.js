import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (import.meta.env.VITE_VERCEL_ENV === "production") {
  console.log(import.meta.env.VITE_VERCEL_ENV);
  const supabaseUrl = SUPABASE_URL;
  const supabaseKey = SUPABASE_KEY;
}
export const supabaseClient = createClient(supabaseUrl, supabaseKey);
