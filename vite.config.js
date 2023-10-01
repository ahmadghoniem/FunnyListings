import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        ref: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "~": path.resolve(__dirname, "./"),
      util: "util/",
      zlib: "browserify-zlib",
    },
  },
  define: {
    // "process.env.VITE_SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL),
    VITE_MAMA_MIA: JSON.stringify(process.env.VITE_MAMA_MIA),
    VITE_SUPABASE_URL: JSON.stringify(process.env.VITE_SUPABASE_URL),
    VITE_SUPABASE_KEY: JSON.stringify(process.env.VITE_SUPABASE_KEY),
    "process.env": {},
    // __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
});
