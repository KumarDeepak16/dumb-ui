import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr"

import { siteConfig } from "@/docs/site"
import { Button } from "@/components/ui/button"
import { DocsPageHeader, DocsPager, DocsSection } from "@/components/site/docs-page"
import { InstallCommand } from "@/components/site/install-command"
import { TemplateThumb } from "@/components/site/template-thumb"

export const metadata: Metadata = {
  title: "Templates",
  description: "Full pages built with Dumb UI: a product landing page and a creative portfolio.",
  alternates: { canonical: "/docs/templates" },
}

const templates = [
  {
    name: "landing",
    title: "Landing page",
    description:
      "A product site: split hero over a live shader, a gapless bento of real components, an interactive workflow, testimonial, per-seat pricing, FAQ and a shader-backed close.",
  },
  {
    name: "portfolio",
    title: "Portfolio",
    description:
      "Deepak Kumar's portfolio: a floating pill nav, a tilting portrait ringed by prop chips, a pinned work list with a live counter, cursor-following previews, a control that re-skins the page with Dumb UI itself, writing and a contact form.",
  },
]

export default function TemplatesPage() {
  return (
    <div className="mx-auto w-full max-w-[64rem]">
      <DocsPageHeader
        title="Templates"
        description="Whole pages, built only from Dumb UI components. Open one and switch the style from the bar at the bottom: the entire page re-skins."
      />
      {templates.map((template) => (
        <DocsSection key={template.name} id={template.name} title={template.title} description={template.description}>
          <TemplateThumb src={`/templates/${template.name}`} title={`${template.title} preview`} />
          <div className="flex flex-wrap items-center gap-3">
            <InstallCommand command={`shadcn@latest add ${siteConfig.namespace}/template-${template.name}`} className="min-w-0 flex-1" />
            <Button asChild variant="outline">
              <Link href={`/templates/${template.name}`}>
                Open full page
                <ArrowUpRightIcon />
              </Link>
            </Button>
          </div>
        </DocsSection>
      ))}
      <DocsPager href="/docs/templates" />
    </div>
  )
}
