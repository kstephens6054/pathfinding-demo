import { configDefaults, defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    environment: "jsdom",
    name: "jsdom",
    globals: true,
    exclude: [...configDefaults.exclude],
    include: ["src/**/*.test.js"],
    setupFiles: ["src/vitest.setup.jsdom.js"],
  },
});
