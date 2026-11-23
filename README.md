# andresbetov portfolio

Static single-page portfolio built with Astro, with a static quality toolchain and CI/CD
configured for Cloudflare Workers. The visual implementation and content are deliberately
out of scope at this stage.

## Requirements

- Node.js within `^22.23.4 || ^24.16.0 || >=26.3.0` (the intersection of Astro's floor and
  the selected linting tools)
- npm `>=9.6.5`

The tested development environment is Node 26.13.1 (pinned in `.nvmrc`) and npm 11.20.0.

## Quick start

```sh
git clone git@github.com:andresbetov/andresbetov-portfolio.git
cd andresbetov-portfolio
npm ci
npm run dev
```

## Commands

| Command                 | Purpose                                            |
| :---------------------- | :------------------------------------------------- |
| `npm ci`                | Install dependencies from the lockfile             |
| `npm run dev`           | Start the development server                       |
| `npm run build`         | Build the static site into `dist/`                 |
| `npm run preview`       | Serve the built site locally                       |
| `npm run format`        | Format the repository with Prettier                |
| `npm run format:check`  | Verify formatting                                  |
| `npm run lint`          | Lint TypeScript, Astro and markup                  |
| `npm run lint:fix`      | Fix auto-fixable ESLint issues                     |
| `npm run stylelint`     | Lint CSS and embedded Astro styles                 |
| `npm run stylelint:fix` | Fix auto-fixable Stylelint issues                  |
| `npm run check`         | Type-check `.ts` and `.astro` files with Astro     |
| `npm run verify`        | Run formatting, lint, styles, type check and build |

## Structure

```text
src/
  data/                 Placeholder site metadata; future validated configuration
  layouts/              Page layouts
  pages/                Static routes
  styles/               Global baseline CSS
```

Empty placeholder directories are intentionally not committed. `public/` now contains the
Workers `_headers` rule. `src/components/`, `src/content/` and `src/lib/` are created when
the first real file needs them.

## Quality checks

`npm run verify` runs Prettier check, ESLint, Stylelint, Astro Check and the static build.
The current build verifies the placeholder route only; full acceptance of the content
sections and their anchors is deferred until the content model exists.

There is intentionally **no automated test suite** at this stage. Tests will be added only
for concrete processes or flows where they provide real value — for example, content
schema validation, deterministic ordering, reference integrity or anchor resolution. Browser
E2E, visual regression and automated accessibility scans are deferred until those flows
exist.

## Package compatibility notes

- TypeScript is pinned to `6.0.3`. The current `@astrojs/check` and `typescript-eslint`
  releases do not support TypeScript 7.
- `eslint-plugin-jsx-a11y@6.10.2` does not accept ESLint 10. The project uses
  `eslint-plugin-jsx-a11y-x@0.2.0`, the ESLint 10-compatible fork explicitly supported by
  `eslint-plugin-astro@3.2.1`, through Astro's `flat/jsx-a11y-recommended` configuration.
- Prettier `3.9.10` is the pinned release in the `3.9.x` line.
- `stylelint-config-standard@41.1.0` is a maintenance update over `41.0.0`; it adds
  TypeScript types and leaves the lint rules unchanged.
- `@eslint/js` is a support-only development dependency for the ESLint configuration; it
  adds no runtime code to the static artifact.
- `npm audit` reports a moderate advisory in the development-only chain
  `eslint-plugin-astro -> eslint-plugin-jsx-a11y-x -> minimatch`. `npm audit --omit=dev`
  reports zero vulnerabilities; the available fix is a breaking tooling downgrade, so it is
  recorded rather than applied.

## Workflow

The repository follows GitFlow with two long-lived branches:

- `develop` — integration branch. Feature work arrives through `feature/*` pull requests and
  deploys to the development Worker on every successful push.
- `main` — production branch. Only `develop` is promoted into it, via a squash merge; the
  resulting push deploys to production.

Once bootstrapped, direct pushes to either branch are blocked by their rulesets and squash is
the only allowed merge method. Urgent fixes use `hotfix/*` branches that merge into `develop` first and then
follow the same promotion path, so they still pass through the development deployment gate.

## Deployment

| Branch    | GitHub Environment | Worker URL                                            |
| :-------- | :----------------- | :---------------------------------------------------- |
| `develop` | `development`      | https://portfolio-development.andresbetov.workers.dev |
| `main`    | `production`       | https://portfolio-production.andresbetov.workers.dev  |

Wrangler is configured in `wrangler.jsonc`: the base Worker is `portfolio-development`, and
`--env production` targets `portfolio-production`. Both serve `dist/` as static assets on
`workers.dev`. `public/_headers` is copied into `dist/` on build and applies a `noindex`
rule to the development hostname only, so the production URL remains indexable.

| Command                                                 | Purpose                                                          |
| :------------------------------------------------------ | :--------------------------------------------------------------- |
| `npx wrangler dev`                                      | Preview `dist/` with the development Worker config (build first) |
| `npm run build && npx wrangler deploy`                  | Deploy to development                                            |
| `npm run build && npx wrangler deploy --env production` | Deploy to production                                             |

Local deploys need Cloudflare credentials: run `npx wrangler login` or set
`CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in your environment. CI reads them from the
matching GitHub Environment secrets.

GitHub Actions (`.github/workflows/ci-cd.yml`) runs the `verify` check on pull
requests and pushes to `develop`/`main`. On a successful push it then deploys to the matching
Cloudflare Worker. The active `Production protection (main)` ruleset uses GitHub's
"Require deployments to succeed" for the `development` environment: the `deploy-development`
job must have produced a successful deployment of the PR head SHA before `develop` can be
merged into `main`. This is a deployment gate, not a required status check.

### Recovery

If a promotion is blocked by a missing or failed deployment, re-run the failed
`deploy-development` job for the current head SHA; do not push to `develop` while the PR is
open. Rollback is manual through Cloudflare Deployments or
`npx wrangler rollback <version-id> --env production` (omit `--env` for development).

## Deferred

Figma-derived design values and sections, the favicon asset, the validated content model,
manual accessibility evaluation, Lighthouse CI, and CSP/security headers beyond the
development `noindex` rule are intentionally deferred. CSP will be added
through Astro's `security.csp` (hashes) once client-side JavaScript or analytics exist;
HSTS belongs in the Cloudflare dashboard once a custom domain is connected.
