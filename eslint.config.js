import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [".astro/**", "dist/**", ".wrangler/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Astro-adapted JSX a11y rules; the underlying peer is eslint-plugin-jsx-a11y-x.
  ...astro.configs["flat/recommended"],
  ...astro.configs["flat/jsx-a11y-recommended"],
];
