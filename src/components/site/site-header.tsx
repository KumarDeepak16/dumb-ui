"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { GithubLogoIcon, ListIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/docs/site"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DocsSidebarNav } from "@/components/site/docs-sidebar"
import { Logo } from "@/components/site/logo"
import { SearchCommand } from "@/components/site/search-command"
import { StyleSwitcher } from "@/components/site/style-switcher"
import { ThemeToggle } from "@/components/site/theme-toggle"

const links = [
  { title: "Docs", href: "/docs", match: (p: string) => p.startsWith("/docs") && !p.startsWith("/docs/components") },
  { title: "Components", href: "/docs/components", match: (p: string) => p.startsWith("/docs/components") },
  { title: "Styles", href: "/docs/styles", match: (p: string) => p === "/docs/styles" },
]

function SiteHeader({
  progress = false,
  fluid = false,
}: {
  progress?: boolean
  /** Full-width bar, aligned with the fixed docs sidebar. */
  fluid?: boolean
}) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    setMenuOpen(false) // eslint-disable-line react-hooks/set-state-in-effect
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b-(length:--du-rule) border-border bg-background">
      <div className={cn("mx-auto flex h-14 w-full items-center gap-3 px-4 sm:h-16 sm:px-6", !fluid && "max-w-[96rem]")}>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-ml-2 lg:hidden" aria-label="Open navigation">
              <ListIcon weight="bold" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" size="sm" data-sidebar-scroll className="site-sidebar-scroll gap-0 overflow-y-auto">
            <SheetHeader>
              <SheetTitle asChild>
                <Link href="/" aria-label="Dumb UI home">
                  <Logo />
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="px-(--du-pad-surface) pb-8">
              <StyleSwitcher className="mb-6 w-fit sm:hidden" />
              <DocsSidebarNav />
            </div>
          </SheetContent>
        </Sheet>

        <Link
          href="/"
          aria-label="Dumb UI home"
          className="mr-2 rounded-(--du-radius-item) outline-offset-4"
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = link.match(pathname)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-(--du-radius-item) px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  active && "text-foreground underline decoration-(--highlight) decoration-2 underline-offset-[0.55em]"
                )}
              >
                {link.title}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchCommand className="hidden w-52 md:inline-flex lg:w-60" />
          <SearchCommand className="w-auto border-0 bg-transparent px-2 shadow-none md:hidden [&>span]:hidden" />
          <StyleSwitcher className="hidden sm:flex" />
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="Dumb UI on GitHub">
              <GithubLogoIcon />
            </a>
          </Button>
        </div>
      </div>
      {progress ? (
        <span
          aria-hidden="true"
          className="site-progress absolute inset-x-0 -bottom-px h-0.5 bg-(--highlight)"
        />
      ) : null}
    </header>
  )
}

export { SiteHeader }
