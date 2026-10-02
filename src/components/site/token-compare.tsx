"use client"

import * as React from "react"

import { STYLE_META, styleTrio } from "@/lib/site-settings"
import { useSiteSettings } from "@/components/site/settings-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StyleScope, type DumbStyle } from "@/components/ui/style-scope"

const rows: { label: string; token: string; format?: (v: string) => string }[] = [
  { label: "Display face", token: "--du-font-display", format: firstFamily },
  { label: "Control face", token: "--du-font-control", format: firstFamily },
  { label: "Control case", token: "--du-control-case" },
  { label: "Control height", token: "--du-h-md", format: rem },
  { label: "Control radius", token: "--du-radius-control" },
  { label: "Surface radius", token: "--du-radius-surface", format: rem },
  { label: "Border weight", token: "--du-border-control" },
  { label: "Hover shift", token: "--du-hover-y" },
  { label: "Press travel", token: "--du-active-y" },
  { label: "Press scale", token: "--du-active-scale" },
  { label: "Overlay motion", token: "--du-overlay-in" },
  { label: "Fast duration", token: "--du-dur-1" },
]

function firstFamily(value: string) {
  return value
    .split(",")[0]
    .replace(/var\(--font-[\w-]+,\s*/, "")
    .replace(/["')]/g, "")
    .trim()
}

function rem(value: string) {
  const n = parseFloat(value)
  return value.endsWith("rem") ? `${Math.round(n * 16)}px` : value
}

/** Reads the live token values from each style scope, so the table cannot drift from the CSS. */
function TokenCompare() {
  const refs = React.useRef<Partial<Record<DumbStyle, HTMLDivElement | null>>>({})
  const [values, setValues] = React.useState<Record<string, Record<string, string>>>({})
  const { style: siteStyle } = useSiteSettings()
  const trio = styleTrio(siteStyle)

  React.useEffect(() => {
    const next: Record<string, Record<string, string>> = {}
    for (const style of trio) {
      const el = refs.current[style]
      if (!el) continue
      const cs = getComputedStyle(el)
      next[style] = Object.fromEntries(
        rows.map((row) => {
          const raw = cs.getPropertyValue(row.token).trim()
          return [row.token, row.format ? row.format(raw) : raw]
        })
      )
    }
    setValues(next) // eslint-disable-line react-hooks/set-state-in-effect
  }, [trio.join()]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="overflow-x-auto rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-card shadow-(--du-shadow-surface)">
      <table className="w-full min-w-[44rem] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-44 p-4 text-left align-bottom">
              <span className="site-label text-muted-foreground">Token</span>
            </th>
            {trio.map((style) => (
              <th key={style} className="p-0 align-top">
                <StyleScope
                  name={style}
                  ref={(node) => {
                    refs.current[style] = node
                  }}
                  className="site-canvas flex h-full flex-col items-start gap-3 border-l-(length:--du-rule) border-border p-4 text-left font-normal"
                >
                  <span className="site-display text-lg">{STYLE_META[style].label}</span>
                  <Button size="sm">Continue</Button>
                  <Input aria-label={`${STYLE_META[style].label} sample input`} placeholder="Field" className="h-(--du-h-sm)" />
                </StyleScope>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.token} className="border-t-(length:--du-rule) border-border">
              <th scope="row" className="p-3 pl-4 text-left align-top font-normal">
                <span className="block font-medium">{row.label}</span>
                <code className="font-mono text-[0.6875rem] text-muted-foreground">{row.token}</code>
              </th>
              {trio.map((style) => (
                <td key={style} className="border-l-(length:--du-rule) border-border p-3 align-top font-mono text-xs">
                  {values[style]?.[row.token] || "…"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { TokenCompare }
