import type { Metadata } from "next"

import { highlight } from "@/lib/highlight"
import { readExampleSource } from "@/lib/source"
import { blockDocs } from "@/docs/blocks"
import { siteConfig } from "@/docs/site"
import { ComponentPreview } from "@/components/site/component-preview"
import { DocsPageHeader, DocsPager, DocsSection } from "@/components/site/docs-page"
import { InstallCommand } from "@/components/site/install-command"

export const metadata: Metadata = {
  title: "Blocks",
  description: "Full sections built from Dumb UI components and shader backgrounds. Copy one, ship it.",
  alternates: { canonical: "/docs/blocks" },
}

export default async function BlocksPage() {
  const blocks = await Promise.all(
    blockDocs.map(async (block) => {
      const code = await readExampleSource(block.name)
      return { ...block, code, html: await highlight(code) }
    })
  )

  return (
    <div className="mx-auto w-full max-w-[64rem]">
      <DocsPageHeader
        title="Blocks"
        description="Whole sections composed from the components, most of them over a ShaderBackground. They re-skin with the style like everything else."
      />
      {blocks.map((block) => (
        <DocsSection key={block.name} id={block.name} title={block.title} description={block.description}>
          <ComponentPreview name={block.name} code={block.code} codeHtml={block.html} minHeight="34rem" />
          <InstallCommand command={`shadcn@latest add ${siteConfig.namespace}/${block.name}`} />
        </DocsSection>
      ))}
      <DocsPager href="/docs/blocks" />
    </div>
  )
}
