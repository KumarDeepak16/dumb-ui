# Changelog

All notable changes to Dumb UI. The format follows
[Keep a Changelog](https://keepachangelog.com) and the project uses
[Semantic Versioning](https://semver.org).

## [0.2.0] - 2026-10-02

### Added

- **Silk**, a new core style: soft, rounded, everyday product UI.
- **Vector** (sci-fi blueprint) and **Halo** (premium luminous) as extra styles.
  The site shows three styles at a time; extras swap into the third slot.
- Originals: Number Ticker, Stepper, Gauge, Rating and Shader Background
  (WebGL2, style-aware presets).
- Blocks: Hero, Sign in, Stats and Onboarding, installable from the registry.
- `du-display` and `du-label` type utilities.

### Changed

- Core styles are now Raw, Silk and Volume. Raw is the default without a
  `data-style` attribute.
- Docs sidebar is fixed to the viewport with its own scroll.

## [0.1.0] - 2026-10-02

### Added

- 38 components on Radix primitives and shadcn/ui conventions.
- Three styles: **Raw** (newsprint brutalism), **Vector** (minimal sci-fi
  blueprint) and **Volume** (extruded 3D).
- Style tokens and a material layer with nestable `data-style` scopes,
  dark mode and reduced-motion fallbacks.
- `StyleScope` to render any subtree, overlays included, in another style.
- Extras beyond shadcn/ui: Button `loading`, Input `leading`/`trailing`,
  Textarea `showCount`, Slider `showValue`/`formatValue`, Avatar `status` and
  `AvatarGroup`, Card `interactive`, Alert `onDismiss`, Dialog and Sheet `size`,
  Separator `label`, Tooltip `shortcut`, Table sticky header, indeterminate
  Progress, Switch `size`, Badge `onRemove`.
- The `@dumb` shadcn registry and the ui.1619.in docs playground.
