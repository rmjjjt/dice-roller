import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/@rmjjjt/dice-roller/",      // Needed for GitHub Pages
  build: {
    outDir: "dist",             // build output relative to demo/
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // entry HTML
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      }
    }
  }
});
