import type { DumbStyle } from "@/components/ui/style-scope"

export type ThemePreference = "light" | "dark" | "system"

export const STYLE_STORAGE_KEY = "dumb-style"
export const THEME_STORAGE_KEY = "dumb-theme"
export const DEFAULT_STYLE: DumbStyle = "raw"

/** Server-safe list of style ids (style-scope.tsx is a client module). */
export const STYLE_IDS: readonly DumbStyle[] = ["raw", "silk", "volume", "vector", "halo"]

/** The three core styles; the rest are extras. */
export const CORE_STYLES: readonly DumbStyle[] = ["raw", "silk", "volume"]

/**
 * At most three styles are shown side by side. An active extra style takes
 * the third slot so the current style is always in view.
 */
export function styleTrio(active: DumbStyle): DumbStyle[] {
  if (CORE_STYLES.includes(active)) return [...CORE_STYLES]
  return [CORE_STYLES[0], CORE_STYLES[1], active]
}

export const STYLE_META: Record<
  DumbStyle,
  { label: string; short: string; description: string; tier: "core" | "extra" }
> = {
  raw: {
    label: "Raw",
    short: "Raw",
    description:
      "Newsprint and ink. Expanded grotesk, mono labels, 2px rules and hard offset shadows that collapse when pressed.",
    tier: "core",
  },
  silk: {
    label: "Silk",
    short: "Silk",
    description:
      "Soft and everyday. Pill buttons, filled fields, generous radii and diffuse warm shadows. Lifts a hair on hover, squeezes on press.",
    tier: "core",
  },
  halo: {
    label: "Halo",
    short: "Halo",
    description:
      "Premium and luminous. Rim-lit surfaces, a monochrome primary and one mint accent that glows on focus, hover and on.",
    tier: "extra",
  },
  vector: {
    label: "Vector",
    short: "Vector",
    description:
      "Minimal sci-fi blueprint. Line drawing on paper or cyanotype blue, small chamfers, registration brackets and overlays that draw open.",
    tier: "extra",
  },
  volume: {
    label: "Volume",
    short: "Volume",
    description:
      "Real 3D. Every control is an extruded block: hover lifts it, press sinks it flush, overlays tilt up in perspective.",
    tier: "core",
  },
}

/**
 * Runs before first paint (inlined in <head>): applies the saved style and
 * color scheme so the page never flashes the wrong look. A `?style=` query
 * parameter wins without being persisted, which the preview iframes use.
 */
export const preferenceScript = `(function(){try{var d=document.documentElement,v=["raw","silk","volume","vector","halo"],q=new URLSearchParams(location.search).get("style"),s=v.indexOf(q)>-1?q:localStorage.getItem("${STYLE_STORAGE_KEY}");if(v.indexOf(s)<0)s="${DEFAULT_STYLE}";d.setAttribute("data-style",s);var t=new URLSearchParams(location.search).get("theme")||localStorage.getItem("${THEME_STORAGE_KEY}")||"system",k=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);d.classList.toggle("dark",k);d.style.colorScheme=k?"dark":"light"}catch(e){}})()`
