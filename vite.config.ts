import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    // make sure this comes early so aliases resolve first
    tsConfigPaths(),
    tanstackStart({ customViteReactPlugin: true }),
    react(),
  ],
});
