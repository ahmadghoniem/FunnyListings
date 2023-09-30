import { createClient } from "@supabase/supabase-js";
// if (import.meta.env.DEV) {
//   console.log("here");
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
// } else if (import.meta.env.PROD) {
//   const supabaseUrl = process.env.VITE_SUPABASE_URL;
//   const supabaseKey = process.env.VITE_SUPABASE_KEY;
// }

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
