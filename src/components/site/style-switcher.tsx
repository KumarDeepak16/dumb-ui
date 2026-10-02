"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { STYLE_META } from "@/lib/site-settings"
import { DUMB_STYLES, type DumbStyle } from "@/components/ui/style-scope"
import { useSiteSettings } from "@/components/site/settings-provider"

/**
 * Global style control: a quiet segmented control that keeps one shape in
 * every style. Only each option's typeface previews its style. Arrow keys
 * move between options (radio semantics).
 */
function StyleSwitcher({ className }: { className?: string }) {
  const { style, setStyle } = useSiteSettings()
  const refs = React.useRef<Record<string, HTMLButtonElement | null>>({})

  const select = (next: DumbStyle) => {
    const rect = refs.current[next]?.getBoundingClientRect()
    setStyle(
      next,
      rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined
    )
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = DUMB_STYLES.indexOf(style)
    let next = index
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % DUMB_STYLES.length
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + DUMB_STYLES.length) % DUMB_STYLES.length
    else return
    event.preventDefault()
    const value = DUMB_STYLES[next]
    refs.current[value]?.focus()
    select(value)
  }

  return (
    <div
      role="radiogroup"
      aria-label="Visual style"
      onKeyDown={onKeyDown}
      className={cn(
        "site-switcher inline-flex h-(--du-h-sm) items-center gap-0.5 rounded-(--du-radius-control) bg-muted p-0.5",
        className
      )}
    >
      {DUMB_STYLES.map((value) => {
        const active = value === style
        return (
          <button
            key={value}
            ref={(node) => {
              refs.current[value] = node
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            title={STYLE_META[value].description}
            onClick={() => select(value)}
            data-option={value}
            className={cn(
              "site-style-option inline-flex h-full cursor-pointer items-center rounded-[max(0px,calc(var(--du-radius-control)-2px))] px-2.5 text-[0.8125rem] whitespace-nowrap text-muted-foreground transition-[color,background-color,box-shadow] duration-200",
              active
                ? "bg-background text-foreground shadow-[0_0_0_1px_var(--border),0_1px_2px_oklch(0_0_0/0.08)]"
                : "hover:text-foreground"
            )}
          >
            {STYLE_META[value].short}
          </button>
        )
      })}
    </div>
  )
}

export { StyleSwitcher }
