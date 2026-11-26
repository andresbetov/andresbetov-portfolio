/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-html/astro"],
  ignoreFiles: ["dist/**", ".astro/**", "node_modules/**"],
  rules: {
    // Astro scoped styles use :global() to reach document-level state.
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] },
    ],
  },
};
