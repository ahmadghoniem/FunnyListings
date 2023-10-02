import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (import.meta.env.VITE_VERCEL_ENV === "production" || import.meta.env.PROD) {
  console.log("VITE_VERCEL_ENV", import.meta.env.VITE_VERCEL_ENV);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

  console.log(
    "VITE_MAMA_MIA using import.meta.en ",
    import.meta.env.VITE_MAMA_MIA,
  );
  console.log("VITE_MAMA_MIA using JSON.stringify(env.VITE_MAMA_MIA) ", BEKO);
  console.log(
    "VITE_MAMA_MIA JSON.stringify(process.env.VITE_MAMA_MIA), ",
    SEKO,
  );
  console.log("using process.env.VITE_VERCEL_ENV,", __APP_ENV__);
}
export const supabaseClient = createClient(supabaseUrl, supabaseKey);
