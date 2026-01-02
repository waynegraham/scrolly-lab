# Scrolly Monorepo

Monorepo for the Scrolly React animation utilities and demos. It includes:

- `packages/scrolly`: core GSAP + React helpers (e.g. `PinnedStage`, `useScrollTimeline`)
- `packages/scrolly-three`: Three.js helpers built on the core package
- `apps/docs`: Next.js examples site
- `apps/storybook`: Storybook for component exploration

## Requirements

- Node.js 20+
- pnpm 10.x (see `packageManager` in `package.json`)

## Getting started

```bash
pnpm -w install
```

## Common scripts

Run everything via Turbo:

```bash
pnpm -w dev
pnpm -w build
pnpm -w lint
```

Target a specific app:

```bash
pnpm --filter docs dev
pnpm --filter storybook dev
```

## Packages

### @waynegraham/scrolly

Core package built with Vite. Outputs live in `packages/scrolly/dist`.

```bash
pnpm --filter @waynegraham/scrolly build
```

### @waynegraham/scrolly-three

Three.js helpers that depend on `@waynegraham/scrolly`.

```bash
pnpm --filter @waynegraham/scrolly-three build
```

## Notes

- This repo uses workspace dependencies (`workspace:*`) and is not published to npm yet.
- Storybook is pinned to `@storybook/react` 10.1.11.

