import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Important: Set base for GitHub Pages
  // Replace 'your-repo-name' with your actual repository name
  base: mode === 'production' ? '/fast-fix-studio/' : '/',
  
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for GitHub Pages
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
}));
