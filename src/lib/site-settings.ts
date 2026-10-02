import type { DumbStyle } from "@/components/ui/style-scope"

export type ThemePreference = "light" | "dark" | "system"

export const STYLE_STORAGE_KEY = "dumb-style"
export const THEME_STORAGE_KEY = "dumb-theme"
export const DEFAULT_STYLE: DumbStyle = "raw"

/** Server-safe list of style ids (style-scope.tsx is a client module). */
export const STYLE_IDS: readonly DumbStyle[] = ["raw", "vector", "volume"]

export const STYLE_META: Record<
  DumbStyle,
  { label: string; short: string; description: string }
> = {
  raw: {
    label: "Raw",
    short: "Raw",
    description:
      "Newsprint and ink. Expanded grotesk, mono labels, 2px rules and hard offset shadows that collapse when pressed.",
  },
  // Archived style, kept for reference (see dumb-ui.css):
  // halo: {
  //   label: "Halo",
  //   short: "Halo",
  //   description:
  //     "Premium and luminous. Rim-lit surfaces, a monochrome primary and one mint accent that glows on focus, hover and on.",
  // },
  vector: {
    label: "Vector",
    short: "Vector",
    description:
      "Minimal sci-fi blueprint. Line drawing on paper or cyanotype blue, small chamfers, registration brackets and overlays that draw open.",
  },
  volume: {
    label: "Volume",
    short: "Volume",
    description:
      "Real 3D. Every control is an extruded block: hover lifts it, press sinks it flush, overlays tilt up in perspective.",
  },
}

/**
 * Runs before first paint (inlined in <head>): applies the saved style and
 * color scheme so the page never flashes the wrong look. A `?style=` query
 * parameter wins without being persisted, which the preview iframes use.
 */
export const preferenceScript = `(function(){try{var d=document.documentElement,v=["raw","vector","volume"],q=new URLSearchParams(location.search).get("style"),s=v.indexOf(q)>-1?q:localStorage.getItem("${STYLE_STORAGE_KEY}");if(v.indexOf(s)<0)s="${DEFAULT_STYLE}";d.setAttribute("data-style",s);var t=new URLSearchParams(location.search).get("theme")||localStorage.getItem("${THEME_STORAGE_KEY}")||"system",k=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);d.classList.toggle("dark",k);d.style.colorScheme=k?"dark":"light"}catch(e){}})()`
