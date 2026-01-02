import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (f) => (f === "es" ? "index.mjs" : "index.cjs")
    },
    rollupOptions: {
      external: ["react", "react-dom", "gsap", "@gsap/react"]
    }
  }
});
