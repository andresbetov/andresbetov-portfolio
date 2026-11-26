# Shell + Hero evidence

Screenshots captured from `npm run dev` during the first Figma implementation slice.

| File                      | Viewport | State                   |
| ------------------------- | -------- | ----------------------- |
| `before-placeholder.webp` | 1440×900 | Placeholder baseline    |
| `hero-1440.webp`          | 1440×900 | Shell + Hero            |
| `hero-768.webp`           | 768×813  | Shell + Hero            |
| `hero-390.webp`           | 390×805  | Shell + Hero            |
| `hero-375.webp`           | 375×805  | Shell + Hero            |
| `menu-390.webp`           | 390×844  | Mobile menu open        |
| `menu-390-focus.webp`     | 390×844  | Mobile menu, CV focused |

The browser checks cover no horizontal overflow, console errors, the mobile-menu
keyboard trap, Escape/focus return, and reduced motion. `npm run verify` is the
authoritative code gate.
