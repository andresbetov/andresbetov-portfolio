# Section primitives + Elara evidence

Screenshots captured from `npm run dev` during the Elara Featured project slice. The Astro
development toolbar is hidden in the final captures.

| File                                  | Viewport | State                                     |
| ------------------------------------- | -------- | ----------------------------------------- |
| `before-1440.webp`                    | 1440×900 | Hero-only baseline                        |
| `before-768.webp`                     | 768×900  | Hero-only baseline                        |
| `before-390.webp`                     | 390×844  | Hero-only baseline                        |
| `before-375.webp`                     | 375×844  | Hero-only baseline                        |
| `after-1440.webp`                     | 1440×900 | Hero + Featured projects, full page       |
| `after-768.webp`                      | 768×900  | Hero + Featured projects, full page       |
| `after-390.webp`                      | 390×844  | Hero + Featured projects, full page       |
| `after-375.webp`                      | 375×844  | Hero + Featured projects, full page       |
| `hero-after-1440.webp`                | 1440×900 | Hero crop for the before/after comparison |
| `nav-projects-390.webp`               | 390×844  | After the mobile menu Projects click      |
| `focus-project-link-390.webp`         | 390×844  | Keyboard focus on GitHub organization     |
| `request-journey-1440.webp`           | 856×610  | Request journey diagram close-up          |
| `request-journey-390.webp`            | 350×1222 | Request journey diagram close-up          |
| `tablet-request-journey-compare.webp` | 1408×824 | Figma (left) vs implementation (right)    |
| `mobile-request-journey-compare.webp` | 732×1222 | Figma (left) vs implementation (right)    |

## Checks

- `npm run verify` passes: Prettier, ESLint, Stylelint, Astro Check, and the static build.
- Section height is 1742px at 1440 (Figma frame 1742), 2618px at 768 (Figma 2616), and
  3657px at 390 (Figma 3656). The 1–2px differences are card border rounding.
- The tablet/mobile request journey follows the Figma frame geometry: node and label insets
  are 17/39px at tablet and 17/35px at mobile, the solid request rail and dashed platform rail
  are separate, both the direct gateway→unit-of-measure path and the inventory→unit-of-measure
  validation path are present, and the data/secrets connectors use the Figma arrow offsets.
  The legend line samples use the Figma SVG paths. On mobile, arrowheads stop 1px before node
  borders (and before the `unit-of-measure-service` focus ring) and 4px before data nodes;
  data/secrets lines also start 4px after the service nodes. See the two side-by-side
  comparison images.
- `body.scrollWidth` and `documentElement.scrollWidth` equal the viewport at 1440, 768, 390,
  and 375. The visible diagram wrapper is 808×420 at 1440, 630×568 at 768, and 308×906 at 390
  (293×906 at 375), with `scrollWidth === clientWidth`; no diagram is horizontally clipped.
  The frames' native diagram layouts are used at each breakpoint, so the Notes' horizontal
  scroll fallback is not needed at the verified widths.
- Console: a clean load logs only the Vite development client messages; no page errors or
  failed resources.
- The mobile menu Projects click sets `location.hash` to `#projects`, closes the menu, and
  focuses `#projects` (the opener `h2`). The existing `SiteHeader` focus handler is unchanged.
  The heading's `tabindex="-1"` and `scroll-margin-block-start` also make native desktop
  fragment navigation focus the same `h2` while keeping the opener top in view.
- Keyboard Tab reaches the new project buttons and `:focus-visible` shows the teal focus
  outline (see `focus-project-link-390.webp`).
- External project links return HTTP 200: the GitHub organization, API documentation, and
  final report.
- The Hero source files are unchanged. The top 900px of `after-1440.webp` differs from
  `before-1440.webp` only by the removed Astro dev toolbar (1875 of 1,296,000 pixels, 0.14%).
- `#experience`, `#education`, and `#contact` remain intentionally unresolved until the
  Experience/Education and Footer slices; this slice does not add placeholders for them.
