import type { Metadata } from "next"
import Link from "next/link"

import { componentDocs, componentGroups } from "@/docs/components"
import { DocsPageHeader, DocsPager } from "@/components/site/docs-page"

export const metadata: Metadata = {
  title: "Components",
  description: "Every Dumb UI component, grouped by job. Each one renders in Raw, Vector and Volume.",
  alternates: { canonical: "/docs/components" },
}

export default function ComponentsIndex() {
  return (
    <div className="mx-auto w-full max-w-[64rem]">
      <DocsPageHeader
        title="Components"
        description={`${componentDocs.length} components on Radix primitives and shadcn/ui conventions. Open one to tweak props, compare styles side by side and copy the install command.`}
      />
      <div className="grid gap-12">
        {componentGroups.map((group) => {
          const docs = componentDocs.filter((doc) => doc.group === group)
          return (
            <section key={group} aria-labelledby={`group-${group}`} className="grid gap-4 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
              <h2 id={`group-${group}`} className="site-display text-lg md:sticky md:top-24 md:self-start">
                {group}
                <span className="ml-2 font-mono text-xs font-normal text-muted-foreground">{docs.length}</span>
              </h2>
              <ul className="grid gap-x-8 sm:grid-cols-2">
                {docs.map((doc) => (
                  <li key={doc.slug} className="border-b-(length:--du-rule) border-border">
                    <Link
                      href={`/docs/components/${doc.slug}`}
                      className="group -mx-2 grid gap-1 rounded-(--du-radius-item) px-2 py-3.5 transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="font-medium">{doc.title}</span>
                      <span className="line-clamp-2 text-[0.8125rem] leading-snug text-muted-foreground group-hover:text-current/80">
                        {doc.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
      <DocsPager href="/docs/components/button" />
    </div>
  )
}
