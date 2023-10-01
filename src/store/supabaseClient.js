import { createClient } from "@supabase/supabase-js";
console.log(import.meta.env.MODE);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
if (import.meta.env.VITE_VERCEL_ENV === "production" || import.meta.env.PROD) {
  console.log("VITE_VERCEL_ENV", import.meta.env.VITE_VERCEL_ENV);
  console.log("PROD", import.meta.env.PROD);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  console.log(supabaseUrl, supabaseKey);

  const a7a = VITE_MAMA_MIA;
  const urrl = VITE_SUPABASE_URL;
  const keyy = VITE_SUPABASE_KEY;
  console.log(a7a, urrl, keyy);
  // } else if (import.meta.env.PROD) {
  //   const supabaseUrl = process.env.VITE_SUPABASE_URL;
  //   const supabaseKey = process.env.VITE_SUPABASE_KEY;
}
export const supabaseClient = createClient(supabaseUrl, supabaseKey);
