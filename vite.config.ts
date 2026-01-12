import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set base to /landing/ so all assets are prefixed correctly
  base: "/landing/",
  
  // Build configuration for Phoenix integration  
  build: {
    // Output to Phoenix static assets directory under landing/
    outDir: "../../priv/static/landing",
    emptyOutDir: true,
    
    // Generate manifest for asset references
    manifest: true,
    
    // Rollup options
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
    
    // Source maps for debugging
    sourcemap: mode === "development",
  },
  
  // Dev server configuration (if needed for standalone development)
  server: {
    host: "::",
    port: 3001,
    strictPort: true,
  },
  
  // Plugins
  plugins: [
    react()
  ].filter(Boolean),
  
  // Path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@ash_rpc": path.resolve(__dirname, "../../assets/js/ash_rpc.ts"),
    },
  },
}));
