# Portfolio Construction Engine evidence

Screenshots and browser checks captured from `npm run dev` for issue #10, the Portfolio
Construction Engine Featured project.

| File                         | Viewport | State                                             |
| :--------------------------- | :------- | :------------------------------------------------ |
| `before-1440.webp`           | 1440     | Full page before the PCE section                  |
| `before-768.webp`            | 768      | Full page before the PCE section                  |
| `before-390.webp`            | 390      | Full page before the PCE section                  |
| `before-375.webp`            | 375      | Full page before the PCE section                  |
| `after-1440.webp`            | 1440     | Full page with Elara and the PCE section          |
| `after-768.webp`             | 768      | Full page with Elara and the PCE section          |
| `after-390.webp`             | 390      | Full page with Elara and the PCE section          |
| `after-375.webp`             | 375      | Full page with Elara and the PCE section          |
| `section-1440.webp`          | 1440     | PCE section only                                  |
| `section-768.webp`           | 768      | PCE section only                                  |
| `section-390.webp`           | 390      | PCE section only                                  |
| `section-375.webp`           | 375      | PCE section only, overflow stress width           |
| `elara-before-1440.webp`     | 1440     | Elara section before the PCE change               |
| `elara-after-1440.webp`      | 1440     | Elara section after the PCE change                |
| `focus-github-1440.webp`     | 1440     | GitHub repository link, keyboard focus            |
| `focus-codespaces-1440.webp` | 1440     | Try in Codespaces link, keyboard focus            |
| `nav-focus-390.webp`         | 390×844  | Projects nav target focused after the menu closes |

The before shots come from `origin/develop` before the PCE work. The after shots include the
PCE section after Elara. Section shots are crops of the PCE article from the full-page
captures.

## Browser checks

- **No horizontal overflow:** `document.documentElement.scrollWidth` equals the viewport at
  1440, 768, 390, and 375. Every evidence panel reports `scrollWidth === clientWidth` and
  `scrollHeight === clientHeight`, including the correlation matrix, allocation bars, and the
  walk-forward chart.
- **Frame heights:** the PCE article measures 1440×1244, 768×1670, and 390×2614, against the
  Figma frames at 1440×1244, 768×1670, and 390×2617.8. The 375px stress width measures 375×2635
  without overflow.
- **No clipped content:** the Bento Evidence cards and walk-forward panels fit their cards at
  all four widths. The correlation tree stretches to the matrix row height instead of adding
  intrinsic height, and the chart labels and note sit inside the panel at 375. The allocation
  panel keeps the 390px frame height on mobile; at 375 the last allocation row sits 2px above
  the content-box edge with the 11px panel padding still below it.
- **Console:** no browser console errors after the final reload. Earlier transient Vite
  hot-reload errors from editing are not present in the final capture.
- **Focus:** both new external links show the shared 2px teal `:focus-visible` outline with a
  2px offset. Both use `target="_blank"` and `rel="noopener noreferrer"`; both URLs return 200.
- **Nav focus:** at 390, opening MENU and choosing Projects closes the menu, sets
  `location.hash` to `#projects`, and focuses `h2#projects-title`. There is still exactly one
  `#projects` anchor; the PCE article has no id of its own.
- **Earlier sections:** the Elara section markup was not edited. The shared `FeatureRow` gained
  a compact fact variant used only by the PCE; its default output is unchanged. The before/after
  1440 crops are visually identical; the SSIM between the two WebP captures is 0.9905, with the
  difference attributable to the WebP re-encode.
- **Diagrams:** the correlation matrix, hierarchy, allocation bars, and Sharpe chart are
  accessible HTML/CSS/SVG. The panels expose hidden summaries stored in the section data; the
  visible chart labels and values remain selectable text.
- **Passing gate:** `npm run verify` passes on the working tree.
