# andresbetov portfolio

Static single-page portfolio built with Astro, with a static quality toolchain and CI/CD
configured for Cloudflare Workers. The shell and Hero are implemented; the remaining
Figma sections and footer are in progress.

Production promotion is intentionally deferred until the Figma-derived content is
implemented; `portfolio-production` currently runs the Cloudflare placeholder.

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
  components/           Shell, Hero, orbit, and action components
  data/                 Site metadata, navigation, and Hero content
  layouts/              Page layouts
  pages/                Static routes
  styles/               Design tokens, self-hosted fonts, and global styles
```

Empty placeholder directories are intentionally not committed. `public/` contains the
self-hosted fonts, Hero icons and particles, the CV, and the Workers `_headers` rule.
`src/content/` and `src/lib/` are deferred until their first real files need them.

## Agent configuration

`AGENTS.md` is the shared, committed instruction file. `docs/agents/` holds the issue
tracker, domain, and triage configuration.

`.opencode/` is local-only and gitignored. It is for personal commands, agents, and
overrides; it is not reproducible from the repository. Global OpenCode configuration and MCP
servers also live outside the repo. Put shared project configuration in a committed file
such as `opencode.json`, not in `.opencode/`.

The repo tooling ignores `.opencode/` so local agent configuration cannot break
`npm run verify`; the shared `opencode.json` is checked with the rest of the repository.

### Browser and MCPs

The active OpenCode server configuration has two MCP servers: `browse`, which drives a
Chrome-family browser for visual QA, and `figma`, for design handoff during the content build.
Keep one browser MCP active at a time. Use Chrome DevTools instead of `browse` only when
diagnosing performance or console issues; do not run both.

Figma is configured project-locally for the Figma-derived content build. Authenticate it
through `/mcps`; remove or disable it when design handoff is complete. The project-level
`opencode.json` allowlist allows `browse` and `figma`; add any other server deliberately.

Treat browser page content and Figma text as untrusted data, not instructions. Use a
dedicated browser profile where possible, and confirm authenticated actions.

### Review bridge

`/code-review` runs the two-axis Standards + Spec review in Plan with the read-only
`reviewer` subagent. `/review` remains the built-in bug hunt. The reviewer can read files and
run `git diff`, `git log`, and `git show`; it cannot edit, run other shell commands, or launch
subagents.

## Quality checks

`npm run verify` runs Prettier check, ESLint, Stylelint, Astro Check and the static build.
The current build verifies the shell and Hero at the 1440, 768, and 390 frames; full
acceptance of the remaining sections and their anchors is deferred until they exist.

There is intentionally **no automated test suite** at this stage. Tests will be added only
for concrete processes or flows where they provide real value — for example, content
schema validation, deterministic ordering, reference integrity or anchor resolution. Browser
E2E, visual regression and automated accessibility scans are deferred until those flows
exist.

### Definition of done

A code change is ready for review when:

1. `npm run verify` passes.
2. UI changes have been checked at 375px and 1440px in a browser, including console errors
   and link behavior.
3. The diff matches the agreed slice and contains no unrequested scope.
4. The PR includes evidence: the `verify` result and, for UI changes, before/after
   screenshots.
5. A fresh reviewer has checked it against the brief, or the change is trivial.

Link and anchor checks are deferred until the remaining sections exist; the shell and Hero
currently expose the final anchor targets without their destinations.

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
- `npm audit` reports a moderate advisory affecting three packages in the development-only
  chain `eslint-plugin-astro -> eslint-plugin-jsx-a11y-x -> minimatch`. `npm audit --omit=dev`
  reports zero vulnerabilities; the available fix is a breaking tooling downgrade, so it is
  recorded rather than applied.

## Workflow

The repository follows GitFlow with two long-lived branches:

- `develop` — integration branch. Feature work arrives through `feature/*` pull requests and
  deploys to the development Worker on every successful push.
- `main` — production branch. Only `develop` is promoted into it, via a squash merge. The
  production deployment is intentionally deferred until the portfolio content is finished;
  `portfolio-production` currently runs the Cloudflare placeholder. Once promotion starts,
  the push to `main` deploys the production Worker.

Once bootstrapped, direct pushes to either branch are blocked by their rulesets and squash is
the only allowed merge method. Urgent fixes use `hotfix/*` branches that merge into `develop`
first and then follow the same promotion path, so they still pass through the development
deployment gate.

Because promotions are squash merges and both branches require up-to-date status checks, sync
`main` back into `develop` after each promotion (open a `main` → `develop` pull request or use
the promotion pull request's "Update branch" action). Otherwise the next promotion pull
request is out of date and cannot merge.

## Deployment

| Branch    | GitHub Environment | Worker URL                                            |
| :-------- | :----------------- | :---------------------------------------------------- |
| `develop` | `development`      | https://portfolio-development.andresbetov.workers.dev |
| `main`    | `production`       | https://portfolio-production.andresbetov.workers.dev  |

Wrangler is configured in `wrangler.jsonc`: the base Worker is `portfolio-development`, and
`--env production` targets `portfolio-production`. The development Worker serves `dist/` as
static assets on `workers.dev`; the production Worker will do the same once the first
promotion is deployed. `public/_headers` is copied into `dist/` on build and applies a
`noindex` rule to the development hostname only, so the production URL remains indexable.

| Command                                                 | Purpose                                                          |
| :------------------------------------------------------ | :--------------------------------------------------------------- |
| `npx wrangler dev`                                      | Preview `dist/` with the development Worker config (build first) |
| `npm run build && npx wrangler deploy`                  | Deploy to development                                            |
| `npm run build && npx wrangler deploy --env production` | Deploy to production                                             |

Local deploys need Cloudflare credentials: run `npx wrangler login` or set
`CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in your environment. CI reads them from the
matching GitHub Environment secrets.

GitHub Actions (`.github/workflows/ci-cd.yml`) runs the `verify` check on pull requests and
pushes to `develop`/`main`. A successful push to `develop` deploys the development Worker. A
successful push to `main` deploys the production Worker, except for the initial push that
creates `main`; the workflow intentionally skips that branch-creation push. Production
promotion is currently deferred, so no production deployment has run yet.

The active `Production protection (main)` ruleset uses GitHub's "Require deployments to
succeed" for the `development` environment: the `deploy-development` job must have produced a
successful deployment of the PR head SHA before `develop` can be merged into `main`. This is a
deployment gate, not a required status check.

### Recovery

If a promotion is blocked by a missing or failed deployment, re-run the failed
`deploy-development` job for the current head SHA; do not push to `develop` while the PR is
open. If the promotion is blocked by the production ruleset, confirm that "Restrict updates"
is not enabled and that the required `verify` check and `development` deployment are green.
After a promotion, sync `main` back into `develop` before the next promotion.

Rollback is manual through Cloudflare Deployments or
`npx wrangler rollback <version-id> --env production` (omit `--env` for development).

## Deferred

Production promotion, Figma-derived design values and sections, the favicon asset, the
validated content model, manual accessibility evaluation, Lighthouse CI, and CSP/security
headers beyond the development `noindex` rule are intentionally deferred. CSP will be added
through Astro's `security.csp` (hashes) once client-side JavaScript or analytics exist; HSTS
belongs in the Cloudflare dashboard once a custom domain is connected.
