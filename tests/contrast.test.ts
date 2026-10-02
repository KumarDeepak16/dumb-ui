import { readFileSync } from "node:fs"
import path from "node:path"
import { converter, wcagContrast } from "culori"
import postcss, { type Rule } from "postcss"
import { describe, expect, it } from "vitest"

const css = readFileSync(path.join(__dirname, "..", "src", "styles", "dumb-ui.css"), "utf8")
const root = postcss.parse(css)
const toRgb = converter("rgb")

function tokens(match: (selector: string) => boolean) {
  const out: Record<string, string> = {}
  root.walkRules((rule: Rule) => {
    if (rule.parent?.type === "atrule") return
    if (!match(rule.selector)) return
    rule.walkDecls((decl) => {
      if (decl.prop.startsWith("--")) out[decl.prop] = decl.value
    })
  })
  return out
}

function palette(style: string, dark: boolean) {
  const light = tokens((s) => s.split(",").some((p) => p.trim() === `[data-style="${style}"]`))
  if (!dark) return light
  return { ...light, ...tokens((s) => s.includes(`[data-style="${style}"]:is(.dark, .dark *)`)) }
}

function resolve(p: Record<string, string>, token: string): string | undefined {
  let value = p[token]
  for (let i = 0; value && i < 5; i++) {
    const ref = value.match(/^var\((--[\w-]+)\)$/)
    if (!ref) break
    value = p[ref[1]]
  }
  return value
}

// Text pairs that must meet WCAG AA for normal text (4.5:1).
const pairs: [string, string][] = [
  ["--foreground", "--background"],
  ["--card-foreground", "--card"],
  ["--popover-foreground", "--popover"],
  ["--primary-foreground", "--primary"],
  ["--secondary-foreground", "--secondary"],
  ["--muted-foreground", "--background"],
  ["--muted-foreground", "--card"],
  ["--accent-foreground", "--accent"],
  ["--selection-foreground", "--selection"],
  ["--destructive-foreground", "--destructive"],
  ["--success-foreground", "--success"],
  ["--warning-foreground", "--warning"],
]

const cases = ["raw", "silk", "volume", "vector", "halo"].flatMap((style) =>
  [false, true].map((dark) => ({ style, dark, label: `${style} ${dark ? "dark" : "light"}` }))
)

describe("WCAG AA text contrast", () => {
  it.each(cases)("$label", ({ style, dark }) => {
    const p = palette(style, dark)
    const failures: string[] = []
    for (const [fg, bg] of pairs) {
      const a = resolve(p, fg)
      const b = resolve(p, bg)
      if (!a || !b) {
        failures.push(`${fg} on ${bg}: unresolved`)
        continue
      }
      const ratio = wcagContrast(toRgb(a)!, toRgb(b)!)
      if (ratio < 4.5) failures.push(`${fg} on ${bg}: ${ratio.toFixed(2)}`)
    }
    expect(failures).toEqual([])
  })
})
