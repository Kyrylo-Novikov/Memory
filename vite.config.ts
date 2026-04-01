import { defineConfig } from "vite";

export default defineConfig({
  base: "/memory/",
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
