"use client"

import * as React from "react"
import { flushSync } from "react-dom"

import type { DumbStyle } from "@/components/ui/style-scope"
import {
  DEFAULT_STYLE,
  STYLE_IDS,
  STYLE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  type ThemePreference,
} from "@/lib/site-settings"

type SiteSettings = {
  style: DumbStyle
  theme: ThemePreference
  resolvedTheme: "light" | "dark"
  setStyle: (style: DumbStyle, origin?: { x: number; y: number }) => void
  setTheme: (theme: ThemePreference) => void
}

const SiteSettingsContext = React.createContext<SiteSettings | null>(null)

function readStyle(): DumbStyle {
  if (typeof document === "undefined") return DEFAULT_STYLE
  const value = document.documentElement.getAttribute("data-style")
  return (STYLE_IDS as readonly string[]).includes(value ?? "")
    ? (value as DumbStyle)
    : DEFAULT_STYLE
}

function readTheme(): ThemePreference {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === "light" || value === "dark" ? value : "system"
  } catch {
    return "system"
  }
}

function prefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function applyTheme(theme: ThemePreference) {
  const dark = theme === "dark" || (theme === "system" && prefersDark())
  const root = document.documentElement
  root.classList.toggle("dark", dark)
  root.style.colorScheme = dark ? "dark" : "light"
  return dark ? "dark" : "light"
}

/**
 * Runs a DOM mutation inside a View Transition when supported, revealing the
 * new look as a circle growing from the control that triggered it.
 */
function withTransition(
  mutate: () => void,
  origin?: { x: number; y: number }
) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (!document.startViewTransition || reduce) {
    mutate()
    return
  }
  const root = document.documentElement
  if (origin) {
    const radius = Math.hypot(
      Math.max(origin.x, window.innerWidth - origin.x),
      Math.max(origin.y, window.innerHeight - origin.y)
    )
    root.style.setProperty("--vt-x", `${origin.x}px`)
    root.style.setProperty("--vt-y", `${origin.y}px`)
    root.style.setProperty("--vt-r", `${radius}px`)
  }
  root.dataset.vt = origin ? "reveal" : "fade"
  const transition = document.startViewTransition(() => flushSync(mutate))
  transition.finished.finally(() => {
    delete root.dataset.vt
  })
}

function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [style, setStyleState] = React.useState<DumbStyle>(DEFAULT_STYLE)
  const [theme, setThemeState] = React.useState<ThemePreference>("system")
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
    "light"
  )

  React.useEffect(() => {
    // Sync React state with what the pre-paint script already applied.
    /* eslint-disable react-hooks/set-state-in-effect */
    setStyleState(readStyle())
    const t = readTheme()
    setThemeState(t)
    setResolvedTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    )
    /* eslint-enable react-hooks/set-state-in-effect */

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onMedia = () => {
      if (readTheme() === "system") setResolvedTheme(applyTheme("system"))
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === STYLE_STORAGE_KEY && event.newValue) {
        document.documentElement.setAttribute("data-style", event.newValue)
        setStyleState(readStyle())
      }
      if (event.key === THEME_STORAGE_KEY) {
        const next = readTheme()
        setThemeState(next)
        setResolvedTheme(applyTheme(next))
      }
    }
    // Pages (like the portfolio template) may set data-style directly.
    const observer = new MutationObserver(() => setStyleState(readStyle()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-style"],
    })
    media.addEventListener("change", onMedia)
    window.addEventListener("storage", onStorage)
    return () => {
      observer.disconnect()
      media.removeEventListener("change", onMedia)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  const setStyle = React.useCallback(
    (next: DumbStyle, origin?: { x: number; y: number }) => {
      if (next === readStyle()) return
      try {
        localStorage.setItem(STYLE_STORAGE_KEY, next)
      } catch {}
      withTransition(() => {
        document.documentElement.setAttribute("data-style", next)
        setStyleState(next)
      }, origin)
    },
    []
  )

  const setTheme = React.useCallback((next: ThemePreference) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {}
    withTransition(() => {
      setThemeState(next)
      setResolvedTheme(applyTheme(next))
    })
  }, [])

  const value = React.useMemo(
    () => ({ style, theme, resolvedTheme, setStyle, setTheme }),
    [style, theme, resolvedTheme, setStyle, setTheme]
  )

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

function useSiteSettings() {
  const context = React.useContext(SiteSettingsContext)
  if (!context) {
    throw new Error("useSiteSettings must be used within SiteSettingsProvider")
  }
  return context
}

export { SiteSettingsProvider, useSiteSettings }
