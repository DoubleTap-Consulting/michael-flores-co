# michael-flores-co

Monorepo for two deployable projects:

- `apps/personal-site`: personal brand + portfolio site.
- `apps/agentic-workflow`: experimental Vercel Sandboxes + workflows project.

## Stack

- `pnpm` workspaces
- `turbo` task orchestration
- Next.js (App Router) + TypeScript per app

## Quick start

```bash
pnpm install
pnpm dev
```

Run a single app:

```bash
pnpm dev:site
pnpm dev:workflow
```

Build everything:

```bash
pnpm build
```

## Deploying both apps from one repo on Vercel

Create **two Vercel projects** pointing to this same Git repo:

1. `personal-site`
   - Root Directory: `apps/personal-site`
   - Framework Preset: Next.js
2. `agentic-workflow`
   - Root Directory: `apps/agentic-workflow`
   - Framework Preset: Next.js

Vercel monorepo support will scope each deployment to the app's root directory while sharing one codebase.

Each app is intentionally self-contained (its own `package.json`, `tsconfig.json`, and Next config) so deployments do not depend on files above the configured Vercel Root Directory.

## Suggested environment variables

Set environment variables per Vercel project so secrets are isolated between the portfolio app and the experimental workflow app.
