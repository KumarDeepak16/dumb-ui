"use client"

import * as React from "react"
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"
import { STYLE_IDS, STYLE_META, styleTrio } from "@/lib/site-settings"
import { type DumbStyle } from "@/components/ui/style-scope"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSiteSettings } from "@/components/site/settings-provider"

/**
 * Global style control. Three styles are shown at a time (the core trio, or
 * two core styles plus the active extra); the rest live in a menu. Each option
 * is set in its own style's typeface. Arrow keys move within the trio.
 */
function StyleSwitcher({ className }: { className?: string }) {
  const { style, setStyle } = useSiteSettings()
  const refs = React.useRef<Record<string, HTMLButtonElement | null>>({})
  const trio = styleTrio(style)
  const others = STYLE_IDS.filter((id) => !trio.includes(id))

  const select = (next: DumbStyle, from?: HTMLElement | null) => {
    const rect = (from ?? refs.current[next])?.getBoundingClientRect()
    setStyle(
      next,
      rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : undefined
    )
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = trio.indexOf(style)
    let next = index
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % trio.length
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + trio.length) % trio.length
    else return
    event.preventDefault()
    refs.current[trio[next]]?.focus()
    select(trio[next])
  }

  return (
    <div
      className={cn(
        "site-switcher inline-flex h-(--du-h-sm) items-center gap-0.5 rounded-(--du-radius-control) bg-muted p-0.5",
        className
      )}
    >
      <div
        role="radiogroup"
        aria-label="Visual style"
        onKeyDown={onKeyDown}
        className="flex h-full items-center gap-0.5"
      >
        {trio.map((value) => {
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
                  ? "bg-foreground text-background shadow-[0_1px_2px_oklch(0_0_0/0.12)]"
                  : "hover:text-foreground"
              )}
            >
              {STYLE_META[value].short}
            </button>
          )
        })}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="More styles"
          className="inline-flex h-full cursor-pointer items-center rounded-[max(0px,calc(var(--du-radius-control)-2px))] px-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <CaretDownIcon weight="bold" className="size-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel>More styles</DropdownMenuLabel>
          {others.map((value) => (
            <DropdownMenuItem
              key={value}
              onSelect={(event) => select(value, event.currentTarget as HTMLElement)}
              className="items-start"
            >
              <span className="grid gap-0.5">
                <span data-option={value} className="site-style-option text-sm">
                  {STYLE_META[value].label}
                  {STYLE_META[value].tier === "extra" ? (
                    <span className="ml-1.5 font-sans text-[0.6875rem] font-normal tracking-normal normal-case opacity-60">
                      extra
                    </span>
                  ) : null}
                </span>
                <span className="line-clamp-2 text-xs leading-snug opacity-70">
                  {STYLE_META[value].description}
                </span>
              </span>
              {value === style ? <CheckIcon className="ml-auto size-3.5" /> : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { StyleSwitcher }
