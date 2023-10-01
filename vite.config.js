import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
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
      alias:
        mode === "development"
          ? {
              "@": path.resolve(__dirname, "./src"),
              "~": path.resolve(__dirname, "./"),
              util: "util/",
              zlib: "browserify-zlib",
            }
          : {
              util: "util/",
              zlib: "browserify-zlib",
            },
    },
    define: {
      // "process.env.VITE_SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL),
      // VITE_MAMA_MIA: JSON.stringify(process.env.VITE_MAMA_MIA),
      // VITE_SUPABASE_URL: JSON.stringify(process.env.VITE_SUPABASE_URL),
      // VITE_SUPABASE_KEY: JSON.stringify(process.env.VITE_SUPABASE_KEY),
      // __APP_ENV__: process.env.VITE_VERCEL_ENV,
      "process.env": {},
    },
  };
});

// "~": import("path").then((path) => path.resolve(__dirname, "./")),
