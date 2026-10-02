import { readFileSync } from "node:fs"
import path from "node:path"
import postcss, { type Rule } from "postcss"
import { describe, expect, it } from "vitest"

const css = readFileSync(path.join(__dirname, "..", "src", "styles", "dumb-ui.css"), "utf8")
const root = postcss.parse(css)

const STYLES = ["raw", "vector", "volume"] as const

function declaredIn(match: (selector: string) => boolean) {
  const props = new Set<string>()
  root.walkRules((rule: Rule) => {
    if (rule.parent?.type === "atrule") return // skip media/layers
    if (!match(rule.selector)) return
    rule.walkDecls((decl) => {
      if (decl.prop.startsWith("--")) props.add(decl.prop)
    })
  })
  return props
}

const lightBlock = (style: string) =>
  declaredIn((s) => s.split(",").some((part) => part.trim() === `[data-style="${style}"]`))

const darkBlock = (style: string) =>
  declaredIn((s) => s.includes(`[data-style="${style}"]:is(.dark, .dark *)`))

/** Tokens the material layer and components read. Every style must define them. */
const used = new Set<string>()
for (const match of css.matchAll(/var\((--(?:du-[\w-]+|[a-z-]+))/g)) used.add(match[1])
const external = new Set([
  "--font-archivo", "--font-martian", "--font-onest", "--font-geist", "--font-geist-mono",
  "--font-bricolage", "--font-chakra", "--radix-accordion-content-height", "--radix-popover-content-transform-origin",
  "--radix-dropdown-menu-content-transform-origin", "--radix-select-content-transform-origin",
  "--radix-hover-card-content-transform-origin", "--radix-tooltip-content-transform-origin",
  "--_w", "--_h", "--_size", "--_wipe", "--_rise-x", "--_rise-y", "--_slide",
  // style-private helpers, read only inside the block that defines them
  "--du-hl", "--du-edge", "--du-edge-primary", "--du-edge-destructive", "--du-ambient", "--du-ambient-strong", "--du-glow", "--du-line",
])
const contract = [...used].filter((token) => !external.has(token))

describe("style token contract", () => {
  it.each(STYLES)("%s defines every token the material layer reads", (style) => {
    const defined = lightBlock(style)
    const missing = contract.filter((token) => !defined.has(token))
    expect(missing).toEqual([])
  })

  it("all three light blocks define the same token set", () => {
    const sets = STYLES.map((style) => [...lightBlock(style)].filter((t) => contract.includes(t)).sort())
    expect(sets[1]).toEqual(sets[0])
    expect(sets[2]).toEqual(sets[0])
  })

  it.each(STYLES)("%s has a dark block that overrides the core colors", (style) => {
    const dark = darkBlock(style)
    for (const token of ["--background", "--foreground", "--primary", "--primary-foreground", "--border", "--ring"]) {
      expect(dark.has(token), `${style} dark is missing ${token}`).toBe(true)
    }
  })

  it("reduced motion collapses overlay motion for every style", () => {
    let found = false
    root.walkAtRules("media", (at) => {
      if (!at.params.includes("prefers-reduced-motion: reduce")) return
      at.walkDecls("--du-overlay-in", (decl) => {
        found = decl.value === "du-fade-in"
      })
    })
    expect(found).toBe(true)
  })
})
