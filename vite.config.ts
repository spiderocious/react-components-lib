import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["**/*.test.*", "**/*.stories.*", "**/*.d.ts", "**/*.config.*"],
      rollupTypes: true,
      insertTypesEntry: true,
      outDir: "dist",
      tsconfigPath: "./tsconfig.app.json",
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/components/index.tsx"),
      name: "CockRoachUI",
      fileName: "cockroach-ui",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
