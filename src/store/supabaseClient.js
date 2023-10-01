import { createClient } from "@supabase/supabase-js";
console.log(import.meta.env.MODE);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
console.log("exposed", import.meta.env.VITE_VERCEL_ENV);
if (import.meta.env.VITE_VERCEL_ENV === "production" || import.meta.env.PROD) {
  console.log("here");
  console.log("VITE_VERCEL_ENV", import.meta.env.VITE_VERCEL_ENV);
  console.log("PROD", import.meta.env.PROD);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  // } else if (import.meta.env.PROD) {
  //   const supabaseUrl = process.env.VITE_SUPABASE_URL;
  //   const supabaseKey = process.env.VITE_SUPABASE_KEY;
}
export const supabaseClient = createClient(supabaseUrl, supabaseKey);
