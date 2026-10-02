"use client"

import Link from "next/link"
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr"

import { siteConfig } from "@/docs/site"
import { CopyButton } from "@/components/site/copy-button"
import { StyleSwitcher } from "@/components/site/style-switcher"

/** Floating control bar on template pages: style switch, install, back to docs. */
function TemplateBar({ name }: { name: string }) {
  const command = `npx shadcn@latest add ${siteConfig.namespace}/template-${name}`
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4" data-template-bar>
      <div className="flex max-w-full items-center gap-2 overflow-x-auto rounded-(--du-radius-overlay) border-(length:--du-border-overlay) border-border bg-popover/95 p-1.5 text-popover-foreground shadow-(--du-shadow-overlay) backdrop-blur-md">
        <Link
          href="/docs/templates"
          aria-label="Back to templates"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-(--du-radius-item) text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeftIcon className="size-4" />
        </Link>
        <StyleSwitcher />
        <span className="site-code hidden h-8 items-center gap-1 rounded-(--du-radius-item) bg-(--code-bg) pr-0.5 pl-2.5 font-mono text-xs text-(--code-fg) md:inline-flex">
          {command}
          <CopyButton value={command} label="Copy install command" className="size-7" />
        </span>
      </div>
    </div>
  )
}

export { TemplateBar }
