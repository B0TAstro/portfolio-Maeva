// @ts-check
import { env } from "node:process";
import { defineConfig } from "astro/config";

// Temp while vitrine site is on GitHub Pages
const base = env.PUBLIC_BASE_PATH;

// https://astro.build/config
export default defineConfig({
  site: "https://b0tastro.github.io",
  base,
});
