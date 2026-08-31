// @ts-check
import { env } from "node:process";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const {
  PUBLIC_BASE_PATH,
  PUBLIC_SANITY_API_VERSION,
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
} = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

// Temp while vitrine site is on GitHub Pages
const base = env.PUBLIC_BASE_PATH ?? PUBLIC_BASE_PATH;

export default defineConfig({
  site: "https://b0tastro.github.io",
  base,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      apiVersion: PUBLIC_SANITY_API_VERSION,
      useCdn: false,
    }),
  ],
});
