"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { docsNav } from "@/docs/site"

/**
 * Docs navigation with a single active indicator that glides between items
 * (transform only) and keeps the active item scrolled into view.
 */
function DocsSidebarNav({ className }: { className?: string }) {
  const pathname = usePathname()
  const navRef = React.useRef<HTMLElement>(null)
  const indicatorRef = React.useRef<HTMLSpanElement>(null)
  const moved = React.useRef(false)

  React.useLayoutEffect(() => {
    const nav = navRef.current
    const indicator = indicatorRef.current
    if (!nav || !indicator) return

    const place = (animate: boolean) => {
      const active = nav.querySelector<HTMLElement>('a[aria-current="page"]')
      if (!active) {
        indicator.style.opacity = "0"
        return
      }
      indicator.style.transition = animate ? "" : "none"
      indicator.style.opacity = "1"
      indicator.style.height = `${active.offsetHeight}px`
      indicator.style.width = `${active.offsetWidth}px`
      indicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`
      if (!animate) void indicator.offsetHeight
      indicator.style.transition = ""
    }

    place(moved.current)

    const active = nav.querySelector<HTMLElement>('a[aria-current="page"]')
    const scroller = nav.closest<HTMLElement>("[data-sidebar-scroll]")
    if (active && scroller) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const y = nav.offsetTop + active.offsetTop
      const top = y - scroller.clientHeight / 2 + active.offsetHeight / 2
      const outOfView =
        y < scroller.scrollTop ||
        y + active.offsetHeight > scroller.scrollTop + scroller.clientHeight
      if (!moved.current || outOfView) {
        scroller.scrollTo({ top, behavior: moved.current && !reduce ? "smooth" : "instant" })
      }
    }
    moved.current = true

    const observer = new ResizeObserver(() => place(false))
    observer.observe(nav)
    return () => observer.disconnect()
  }, [pathname])

  return (
    <nav ref={navRef} aria-label="Documentation" className={cn("relative grid gap-6", className)}>
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="site-nav-indicator pointer-events-none absolute top-0 left-0 rounded-(--du-radius-item) bg-selection opacity-0"
      />
      {docsNav.map((section) => (
        <div key={section.title} className="grid gap-2">
          <h2 className="flex items-center gap-2 px-2.5 font-mono text-[0.6875rem] font-medium tracking-[0.12em] text-foreground uppercase">
            <span aria-hidden="true" className="size-1.5 bg-(--highlight)" />
            {section.title}
          </h2>
          <ul className="ml-[0.8125rem] grid gap-px border-l-(length:--du-rule) border-border pl-2">
            {section.items.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "site-nav-link relative flex h-8 items-center rounded-(--du-radius-item) px-2.5 text-[0.84375rem] text-muted-foreground",
                      active
                        ? "font-medium text-selection-foreground"
                        : "hover:bg-accent/70 hover:text-accent-foreground"
                    )}
                  >
                    <span className="site-nav-label">{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export { DocsSidebarNav }
