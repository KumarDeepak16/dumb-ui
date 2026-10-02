"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRightIcon,
  CubeIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  PaletteIcon,
} from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"
import { STYLE_META } from "@/lib/site-settings"
import { docsNav } from "@/docs/site"
import { componentDocs } from "@/docs/components"
import { DUMB_STYLES } from "@/components/ui/style-scope"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"
import { useSiteSettings } from "@/components/site/settings-provider"

const descriptions = Object.fromEntries(
  componentDocs.map((doc) => [`/docs/components/${doc.slug}`, doc.description])
)

function SearchCommand({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { setStyle } = useSiteSettings()

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "")
      if (
        (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" && !typing)
      ) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const run = (fn: () => void) => {
    setOpen(false)
    fn()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        className={cn(
          "inline-flex h-(--du-h-sm) w-full cursor-pointer items-center gap-2 rounded-(--du-radius-field) border-(length:--du-border-field) border-input bg-(--du-field-bg) px-2.5 text-sm text-muted-foreground shadow-(--du-shadow-field) transition-colors hover:text-foreground",
          className
        )}
      >
        <MagnifyingGlassIcon className="size-4 shrink-0" />
        <span className="flex-1 truncate text-left">Search docs</span>
        <Kbd className="hidden sm:inline-flex">⌘K</Kbd>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search Dumb UI"
        description="Jump to a page or component, or switch the style"
      >
        <CommandInput placeholder="Search components and guides" />
        <CommandList>
          <CommandEmpty>Nothing found. Try “dialog” or “tokens”.</CommandEmpty>
          {docsNav.map((section) => (
            <CommandGroup key={section.title} heading={section.title}>
              {section.items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`${item.title} ${section.title} ${descriptions[item.href] ?? ""}`}
                  onSelect={() => run(() => router.push(item.href))}
                >
                  {section.title === "Getting started" ? <FileTextIcon /> : <CubeIcon />}
                  {item.title}
                  <ArrowRightIcon className="ml-auto size-3.5 opacity-0 in-data-[selected=true]:opacity-60" />
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Style">
            {DUMB_STYLES.map((value) => (
              <CommandItem
                key={value}
                value={`style ${STYLE_META[value].label}`}
                onSelect={() => run(() => setStyle(value))}
              >
                <PaletteIcon />
                Switch to {STYLE_META[value].label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export { SearchCommand }
