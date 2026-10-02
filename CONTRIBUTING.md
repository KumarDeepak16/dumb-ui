# Contributing to Dumb UI

Thanks for helping. This guide covers setup, the rules every component follows,
and how to send a change.

## Setup

```bash
git clone https://github.com/KumarDeepak16/dumb-ui.git
cd dumb-ui
pnpm install
pnpm dev            # http://localhost:3000
```

Requirements: Node 20.9+ (22 recommended) and pnpm 10.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Generates the examples index and starts Next.js |
| `pnpm build` | Generates examples + registry, then builds the site |
| `pnpm test` | Token contract, WCAG contrast and component tests (Vitest) |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript |
| `pnpm format` | Prettier with Tailwind class sorting |
| `pnpm registry` | Rebuilds `registry.json` and `public/r/*.json` |
| `pnpm avatars` | Regenerates the demo avatar set in `public/avatars` |

## How the code is organised

```
src/components/ui/     library components (what users install)
src/styles/dumb-ui.css style tokens + material layer (installed with every component)
src/examples/          one file per live example, default export
src/docs/              component metadata, nav, playgrounds
src/components/site/   website-only components
src/app/               Next.js routes for ui.1619.in
scripts/               generators (examples index, registry, avatars)
tests/                 Vitest suites
```

## Component rules

1. **Structure in TSX, material in CSS.** Layout, semantic colors and geometry
   tokens (`rounded-(--du-radius-control)`, `h-(--du-h-md)`) go in className.
   Borders, shadows, type, transforms and keyframes go in the material layer of
   `dumb-ui.css`, keyed on `data-slot`.
2. **`data-slot` goes after `{...props}`**, so a parent `asChild` trigger cannot
   overwrite it.
3. **Never branch on style.** If a style needs different geometry, add a token
   and give every style a value. `tests/tokens.test.ts` fails if a style misses
   a token.
4. **No `outline-none` on focusable parts.** Focus rings come from the base
   layer and each style tunes them.
5. **Keep the shadcn API.** New props are additive and documented as extras.
6. **Accessibility is part of done:** keyboard support, labels, focus, reduced
   motion, and AA contrast in light and dark for every style.

## Adding a component

1. `src/components/ui/<name>.tsx`
2. Material rules in `src/styles/dumb-ui.css` if it needs any
3. Examples in `src/examples/<name>-demo.tsx` (and more if useful)
4. An entry in `src/docs/components.ts`
5. Optional playground in `src/docs/playgrounds.tsx`
6. Tests in `tests/`

The docs page, search entry and registry item are generated from step 4.

## Pull requests

- One focused change per PR. Describe what changed and how you checked it.
- Run `pnpm lint && pnpm typecheck && pnpm test` before pushing.
- Include before/after screenshots in all three styles for visual changes.
- By contributing you agree your code is released under the MIT License.
