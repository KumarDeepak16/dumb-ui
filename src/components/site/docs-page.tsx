import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"
import { docsOrder } from "@/docs/site"

function DocsPageHeader({
  title,
  description,
  eyebrow,
  children,
}: {
  title: string
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <header className="grid max-w-3xl gap-3 pb-8">
      {eyebrow}
      <h1 className="site-display text-[2rem] leading-[1.05] text-balance sm:text-[2.5rem]">
        {title}
      </h1>
      {description ? (
        <p className="max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground sm:text-[1.0625rem]">
          {description}
        </p>
      ) : null}
      {children}
    </header>
  )
}

function DocsSection({
  id,
  title,
  description,
  children,
  className,
}: {
  id: string
  title: string
  description?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section aria-labelledby={id} className={cn("grid gap-4 pt-12", className)}>
      <div className="grid max-w-3xl gap-1.5">
        <h2 id={id} className="site-display scroll-mt-24 text-[1.375rem] leading-tight">
          <a href={`#${id}`} className="hover:underline hover:decoration-(--highlight) hover:underline-offset-4">
            {title}
          </a>
        </h2>
        {description ? (
          <p className="max-w-[62ch] text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid max-w-[68ch] gap-4 text-[0.9375rem] leading-[1.7] text-foreground/90",
        "[&_a]:underline [&_a]:decoration-(--highlight) [&_a]:decoration-2 [&_a]:underline-offset-4",
        "[&_code:not(pre_code)]:rounded-(--du-radius-item) [&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-[0.8125rem]",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_ul]:grid [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:grid [&_ol]:gap-2 [&_ol]:pl-5 [&_ol]:list-decimal",
        className
      )}
    >
      {children}
    </div>
  )
}

function DocsPager({ href }: { href: string }) {
  const index = docsOrder.findIndex((item) => item.href === href)
  const prev = index > 0 ? docsOrder[index - 1] : undefined
  const next = index >= 0 && index < docsOrder.length - 1 ? docsOrder[index + 1] : undefined

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 grid gap-3 border-t-(length:--du-rule) border-border pt-6 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group grid gap-1 rounded-(--du-radius-field) p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <span className="site-label flex items-center gap-1.5 text-muted-foreground group-hover:text-current">
            <ArrowLeftIcon className="size-3.5" /> Previous
          </span>
          <span className="font-medium">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group grid gap-1 rounded-(--du-radius-field) p-3 text-right transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <span className="site-label flex items-center justify-end gap-1.5 text-muted-foreground group-hover:text-current">
            Next <ArrowRightIcon className="size-3.5" />
          </span>
          <span className="font-medium">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  )
}

export { DocsPageHeader, DocsSection, Prose, DocsPager }
