import { defineConfig } from "vite";
import { importCSSSheet } from "@arcmantle/vite-plugin-import-css-sheet";

export default defineConfig({
  plugins: [importCSSSheet()],
});
