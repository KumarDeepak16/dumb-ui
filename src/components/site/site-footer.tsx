import Link from "next/link"

import { siteConfig } from "@/docs/site"

function SiteFooter() {
  return (
    <footer className="border-t-(length:--du-rule) border-border">
      <div className="mx-auto flex w-full max-w-[72rem] flex-col gap-2 px-4 py-6 text-[0.8125rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Built by{" "}
          <a className="font-medium text-foreground underline underline-offset-4" href={siteConfig.author.url} target="_blank" rel="noreferrer">
            1619.in
          </a>
          . MIT licensed. Built on{" "}
          <a className="underline underline-offset-4 hover:text-foreground" href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
            shadcn/ui
          </a>{" "}
          conventions and{" "}
          <a className="underline underline-offset-4 hover:text-foreground" href="https://www.radix-ui.com" target="_blank" rel="noreferrer">
            Radix
          </a>
          .
        </p>
        <nav aria-label="Footer" className="flex gap-4">
          <Link className="hover:text-foreground" href="/docs/changelog">
            Changelog
          </Link>
          <a className="hover:text-foreground" href={siteConfig.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="hover:text-foreground" href="/r/registry.json">
            Registry
          </a>
        </nav>
      </div>
    </footer>
  )
}

export { SiteFooter }
