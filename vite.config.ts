import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "node_modules", replacement: "/node_modules" },
    ],
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: "assets/[name].[hash].js",
  //       chunkFileNames: "assets/[name].[hash].js",
  //       assetFileNames: "assets/[name].[hash].[ext]",
  //     },
  //   },
  // },
});
