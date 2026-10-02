<div align="center">

<img src="src/app/icon.svg" width="72" height="72" alt="Dumb UI elephant" />

# Dumb UI

**One component system. Three visual languages.**

shadcn-compatible React components that render as **Raw**, **Vector** or
**Volume** with the same API.

[Website](https://ui.1619.in) · [Docs](https://ui.1619.in/docs) · [Components](https://ui.1619.in/docs/components) · [Changelog](./CHANGELOG.md)

</div>

---

## What it is

Dumb UI is an open-source React component library built on shadcn/ui
conventions and Radix primitives. Most kits change color and call it a theme.
Dumb UI changes the material: typography, geometry, border weight, shadow model,
motion, focus treatment and how a control physically responds to a press.

```tsx
<Button>Continue</Button>
```

| Style | Character |
| --- | --- |
| **Raw** | Newsprint and ink. Expanded grotesk, mono labels, 2px rules, hard offset shadows that collapse when pressed. |
| **Vector** | Minimal sci-fi blueprint. Line drawing on paper or cyanotype blue, small chamfers, registration brackets, dashed focus, overlays that draw open. |
| **Volume** | Real 3D. Every control is an extruded block: hover lifts it, press sinks it flush, overlays tilt up in perspective. |

Same markup, same props. A style is a set of CSS custom properties.

## Install

Dumb UI installs through the shadcn CLI, so you own the code.

**1. Add the registry** to `components.json`:

```json
{
  "registries": {
    "@dumb": "https://ui.1619.in/r/{name}.json"
  }
}
```

**2. Add components.** The first one also merges the style tokens into your
global CSS.

```bash
npx shadcn@latest add @dumb/button @dumb/dialog
# or everything
npx shadcn@latest add @dumb/all
```

**3. Pick a style** on `<html>` (or any element):

```html
<html data-style="raw">     <!-- or "vector", "volume" -->
```

Dark mode follows the shadcn convention: a `dark` class on an ancestor.
Each style names its fonts through CSS variables with system fallbacks; see the
[installation guide](https://ui.1619.in/docs/installation) for a `next/font`
setup.

## Use

```tsx
import { Button } from "@/components/ui/button"
import { StyleScope } from "@/components/ui/style-scope"

export function Example() {
  return (
    <>
      <Button loading>Publish</Button>

      {/* render a subtree, overlays included, in another style */}
      <StyleScope name="volume">
        <Button>Continue</Button>
      </StyleScope>
    </>
  )
}
```

## Components

Accordion, Alert, Alert Dialog, Avatar, Badge, Breadcrumb, Button, Calendar,
Card, Checkbox, Command, Dialog, Drawer, Dropdown Menu, Form, Input, Kbd, Label,
Navigation Menu, Pagination, Popover, Progress, Radio Group, Select, Separator,
Sheet, Skeleton, Slider, Spinner, Style Scope, Switch, Table, Tabs, Textarea,
Toast (Sonner), Toggle, Toggle Group, Tooltip.

Everything keeps the shadcn/ui API. Additive extras include Button `loading`,
Input `leading`/`trailing`, Textarea `showCount`, Slider `showValue`, Avatar
`status` and `AvatarGroup`, Card `interactive`, Alert `onDismiss`, Dialog and
Sheet `size`, Separator `label`, Tooltip `shortcut`, sticky Table headers and
indeterminate Progress.

## How it works

- **Tokens**: about 150 custom properties per style under `[data-style]`.
  Colors keep shadcn names, so your existing shadcn components follow the
  active palette.
- **Material layer**: rules in `@layer components`, keyed on `data-slot`, turn
  tokens into borders, shadows, type and motion. Anything passed through
  `className` still wins.
- **Scopes nest**: tokens resolve at the nearest `[data-style]`, so styles can
  be mixed on one page.
- **Accessibility**: Radix primitives, keyboard support, visible focus in every
  style, reduced-motion fallbacks, and WCAG AA text contrast checked in CI for
  all styles in light and dark.

## Develop

```bash
pnpm install
pnpm dev          # docs site at http://localhost:3000
pnpm test         # tokens, contrast, components
pnpm build        # examples index + registry + Next.js build
```

Stack: Next.js 16, React 19, Tailwind CSS v4, Radix, shiki, Vitest, Playwright.
See [CONTRIBUTING.md](./CONTRIBUTING.md) for the component rules and how to add
one.

## Deploy

The site and the registry deploy together on Netlify (`netlify.toml`). The
build generates `public/r/*.json`, which is what `npx shadcn add @dumb/...`
reads.

## License

Code: [MIT](./LICENSE) © Deepak Kumar.
The Dumb UI name and elephant mark are not covered by the MIT license; see
[TRADEMARKS.md](./TRADEMARKS.md).

Built by [1619.in](https://1619.in) · [@KumarDeepak16](https://github.com/KumarDeepak16)
