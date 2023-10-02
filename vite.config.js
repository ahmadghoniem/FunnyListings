import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills({
      // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
      include: ["path", "stream", "assert", "events", "zlib", "util", "buffer"],
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
    SUPABASE_URL: JSON.stringify(process.env.SUPABASE_URL),
    SUPABASE_KEY: JSON.stringify(process.env.SUPABASE_KEY),
  },
});

// "~": import("path").then((path) => path.resolve(__dirname, "./")),
// const a7a = process.env.MAMA_MIA;
