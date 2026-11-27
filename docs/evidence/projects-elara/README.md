# Projects + Elara evidence

Screenshots and browser checks captured from `npm run dev` for issue #9, the Section
primitives and the Elara Featured project.

| File                      | Viewport | State                                    |
| :------------------------ | :------- | :--------------------------------------- |
| `before-1440.webp`        | 1440×900 | Shell + Hero, before Elara               |
| `before-768.webp`         | 768×900  | Shell + Hero, before Elara               |
| `before-390.webp`         | 390×844  | Shell + Hero, before Elara               |
| `before-375.webp`         | 375×812  | Shell + Hero, before Elara               |
| `after-1440.webp`         | 1440     | Full page with the Elara section         |
| `after-768.webp`          | 768      | Full page with the Elara section         |
| `after-390.webp`          | 390      | Full page with the Elara section         |
| `after-375.webp`          | 375      | Full page with the Elara section         |
| `wide-1600.webp`          | 1600     | Full page, full-bleed Hero atmosphere    |
| `section-1440.webp`       | 1440     | `#projects` section only                 |
| `section-768.webp`        | 768      | `#projects` section only                 |
| `section-390.webp`        | 390      | `#projects` section only                 |
| `button-focus-1440.webp`  | 1440     | GitHub organization link, keyboard focus |
| `copy-feedback-1440.webp` | 1440     | "Run it locally" copy success state      |
| `nav-focus-390.webp`      | 390×844  | After the mobile Projects nav click      |

The Hero content is unchanged. The Hero particle field is now full-bleed, the glows are no
longer clipped to the 1440px canvas, and the atmosphere fades into the Featured area; the
section's own top-corner glows are removed. There is no horizontal seam at the boundary and
no fixed-canvas edge on wide viewports. The section-only shots compare the section content
against the Figma frames at 1440, 768, and 390; the boundary is intentionally continuous
rather than reproducing the standalone Figma seam frame.

## Browser checks

- **No horizontal overflow:** `document.documentElement.scrollWidth` equals the viewport at
  2048, 1600, 1440, 768, 390, and 375. The diagram map and tier bands report `scrollWidth ===
clientWidth`; the remaining interior overflow is the intentionally clipped decorative
  glow in the service card.
- **Console:** no new browser console errors on the Elara page.
- **Nav focus:** at 390, opening MENU and choosing Projects leaves `location.hash` at
  `#projects`, closes the menu, and focuses the opener `h2#projects-title` (`tabindex="-1"`,
  `data-nav-focus-target`). `#projects` resolves to the section that starts the Featured
  area. Experience, Education, and Contact remain unresolved until #12/#13.
- **Link focus:** the GitHub organization link shows the shared `:focus-visible` outline
  (2px teal, 2px offset) in `button-focus-1440.webp`.
- **Copy:** the “Run it locally” Copy button writes the four commands (without the `$`
  prompts) to the clipboard, swaps the copy glyph for a check while switching to “Copied”
  in the same colour, and announces “Commands copied.” through a visually hidden status
  region. It resets after 3 seconds; `copy-feedback-1440.webp` shows the state.
- **Diagrams:** both diagrams are HTML/CSS/SVG with text labels and a figure caption; the
  request-journey connectors and decorative ticks are SVG assets, not raster screenshots.
- **Passing gate:** `npm run verify` passes on the working tree.
