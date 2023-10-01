import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      nodePolyfills({
        // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
        include: [
          "path",
          "stream",
          "assert",
          "events",
          "zlib",
          "util",
          "buffer",
        ],
      }),
      svgr({
        // svgr options: https://react-svgr.com/docs/options/
        svgrOptions: {
          ref: true,
        },
      }),
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "~": path.resolve(__dirname, "./"),
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
