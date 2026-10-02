"use client"

import * as React from "react"
import { ArrowClockwiseIcon, ArrowUpRightIcon, LockSimpleIcon } from "@phosphor-icons/react/ssr"

import { siteConfig } from "@/docs/site"

/** A live, scrollable page at real size inside browser chrome. */
function TemplateThumb({ src, title }: { src: string; title: string }) {
  const [key, setKey] = React.useState(0)
  const host = siteConfig.url.replace(/^https?:\/\//, "")

  return (
    <div className="overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border bg-card shadow-(--du-shadow-surface)">
      <div className="flex items-center gap-3 border-b-(length:--du-rule) border-border bg-sunken px-3 py-2.5">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[oklch(0.68_0.18_25)]" />
          <span className="size-2.5 rounded-full bg-[oklch(0.82_0.15_85)]" />
          <span className="size-2.5 rounded-full bg-[oklch(0.74_0.15_150)]" />
        </span>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          aria-label="Reload preview"
          className="inline-flex size-7 shrink-0 items-center justify-center rounded-(--du-radius-item) text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowClockwiseIcon className="size-3.5" />
        </button>
        <span className="flex h-7 min-w-0 flex-1 items-center gap-1.5 rounded-(--du-radius-item) bg-background px-3 font-mono text-xs text-muted-foreground">
          <LockSimpleIcon className="size-3 shrink-0" />
          <span className="truncate">
            {host}
            <span className="text-foreground">{src}</span>
          </span>
        </span>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${title} in a new tab`}
          className="inline-flex size-7 shrink-0 items-center justify-center rounded-(--du-radius-item) text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      </div>
      <iframe
        key={key}
        src={src}
        title={title}
        loading="lazy"
        className="block h-[min(78vh,760px)] w-full border-0 bg-background"
      />
    </div>
  )
}

export { TemplateThumb }
