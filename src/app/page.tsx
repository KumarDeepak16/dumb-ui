import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import { siteConfig } from "@/docs/site"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/site/copy-button"
import { Prism } from "@/components/site/prism"
import { SiteHeader } from "@/components/site/site-header"

const command = `npx shadcn@latest add ${siteConfig.namespace}/button`

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[96rem] flex-col gap-8 px-4 py-8 sm:px-6 lg:gap-10 lg:py-10">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <h1 className="site-display text-[2.5rem] leading-[0.98] text-balance sm:text-[3.5rem] lg:text-[4.25rem]">
            Same components. Three materials.
          </h1>
          <div className="grid gap-5 lg:pb-1.5">
            <p className="max-w-[46ch] text-base leading-relaxed text-pretty text-muted-foreground sm:text-[1.0625rem]">
              Dumb UI is shadcn-compatible React. Raw, Vector and Volume are three
              complete visual languages on one API. Drag the seams.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/docs/components">
                  Browse components
                  <ArrowRightIcon weight="bold" />
                </Link>
              </Button>
              <div className="site-code flex h-(--du-h-lg) items-center gap-1 rounded-(--du-radius-control) border-(length:--du-border-control) border-(--code-border) bg-(--code-bg) pr-1 pl-3.5 font-mono text-xs text-(--code-fg)">
                <span className="truncate">{command}</span>
                <CopyButton value={command} label="Copy install command" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-h-0 flex-1">
          <Prism />
        </div>
      </main>
    </>
  )
}
