import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr"

import { highlight } from "@/lib/highlight"
import { readComponentSource, readExampleSource } from "@/lib/source"
import { componentDocs, getComponentDoc } from "@/docs/components"
import { siteConfig } from "@/docs/site"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Kbd } from "@/components/ui/kbd"
import { CodeBlock } from "@/components/site/code-block"
import { ComponentPreview } from "@/components/site/component-preview"
import { DocsPageHeader, DocsPager, DocsSection, Prose } from "@/components/site/docs-page"
import { InstallCommand } from "@/components/site/install-command"

export function generateStaticParams() {
  return componentDocs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/docs/components/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const doc = getComponentDoc(slug)
  if (!doc) return {}
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/docs/components/${doc.slug}` },
    openGraph: {
      title: `${doc.title} | Dumb UI`,
      description: doc.description,
      url: `/docs/components/${doc.slug}`,
    },
  }
}

export default async function ComponentPage({
  params,
}: PageProps<"/docs/components/[slug]">) {
  const { slug } = await params
  const doc = getComponentDoc(slug)
  if (!doc) notFound()

  const examples = await Promise.all(
    doc.examples.map(async (example) => {
      const code = await readExampleSource(example.name)
      return { ...example, code, html: await highlight(code) }
    })
  )
  const [hero, ...rest] = examples
  const source = await readComponentSource(doc.slug)
  const hasExtras = doc.props?.some((group) => group.rows.some((row) => row.extra))
  const deps = doc.dependencies.join(" ")

  return (
    <article className="mx-auto w-full max-w-[64rem]">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/docs">Docs</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/docs/components">Components</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{doc.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DocsPageHeader title={doc.title} description={doc.description}>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Badge variant="outline">{doc.group}</Badge>
          {doc.primitive ? (
            <Badge variant="secondary" asChild>
              <a href={doc.primitive.href} target="_blank" rel="noreferrer">
                {doc.primitive.name}
                <ArrowUpRightIcon />
              </a>
            </Badge>
          ) : null}
          {hasExtras ? <Badge variant="default">Dumb extras</Badge> : null}
        </div>
      </DocsPageHeader>

      <ComponentPreview
        name={hero.name}
        code={hero.code}
        codeHtml={hero.html}
        playground={doc.slug}
      />

      <DocsSection id="installation" title="Installation">
        <Tabs defaultValue="cli" className="gap-4">
          <TabsList aria-label="Installation method">
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <TabsContent value="cli" className="grid gap-3">
            <InstallCommand command={`shadcn@latest add ${siteConfig.namespace}/${doc.slug}`} />
            <p className="text-[0.8125rem] text-muted-foreground">
              Needs the {siteConfig.namespace} registry in components.json and the
              style tokens. See <Link className="underline underline-offset-4" href="/docs/installation">Installation</Link>.
            </p>
          </TabsContent>
          <TabsContent value="manual" className="grid gap-4">
            {deps ? (
              <>
                <p className="text-sm text-muted-foreground">Install the dependencies:</p>
                <InstallCommand kind="add" command={deps} />
              </>
            ) : null}
            {doc.registryDependencies.length ? (
              <p className="text-sm text-muted-foreground">
                Add the components this one uses:{" "}
                {doc.registryDependencies.map((dep, i) => (
                  <span key={dep}>
                    {i > 0 ? ", " : ""}
                    <Link className="font-mono underline underline-offset-4" href={`/docs/components/${dep}`}>
                      {dep}
                    </Link>
                  </span>
                ))}
                .
              </p>
            ) : null}
            <p className="text-sm text-muted-foreground">
              Copy into <code className="font-mono">components/ui/{doc.slug}.tsx</code>:
            </p>
            <CodeBlock code={source} title={`components/ui/${doc.slug}.tsx`} maxHeight="28rem" />
          </TabsContent>
        </Tabs>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <div className="grid gap-3">
          <CodeBlock code={doc.usage.imports} />
          <CodeBlock code={doc.usage.code} />
        </div>
      </DocsSection>

      {rest.length ? (
        <DocsSection id="examples" title="Examples">
          <div className="grid gap-12">
            {rest.map((example) => (
              <div key={example.name} className="grid gap-3">
                <div className="grid gap-1">
                  <h3 id={example.name} className="site-display scroll-mt-24 text-[1.0625rem]">
                    {example.title}
                  </h3>
                  {example.description ? (
                    <Prose className="text-sm text-muted-foreground">
                      <p dangerouslySetInnerHTML={{ __html: inlineCode(example.description) }} />
                    </Prose>
                  ) : null}
                </div>
                <ComponentPreview name={example.name} code={example.code} codeHtml={example.html} minHeight="16rem" />
              </div>
            ))}
          </div>
        </DocsSection>
      ) : null}

      {doc.props?.length ? (
        <DocsSection
          id="api"
          title="API reference"
          description={
            hasExtras
              ? "Props marked “extra” are Dumb UI additions. Everything else matches shadcn/ui."
              : "Matches shadcn/ui. Native props are forwarded."
          }
        >
          <div className="grid gap-8">
            {doc.props.map((group) => (
              <div key={group.component} className="grid gap-2">
                <h3 className="font-mono text-sm font-semibold">{group.component}</h3>
                <div className="overflow-hidden rounded-(--du-radius-field) border-(length:--du-border-surface) border-border bg-card">
                  <Table className="min-w-[36rem]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-40">Prop</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="w-28">Default</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.rows.map((row) => (
                        <TableRow key={row.prop} className="align-top">
                          <TableCell className="align-top">
                            <span className="flex flex-wrap items-center gap-1.5 font-mono text-[0.8125rem]">
                              {row.prop}
                              {row.extra ? <Badge variant="success">extra</Badge> : null}
                            </span>
                          </TableCell>
                          <TableCell className="whitespace-normal">
                            <code className="font-mono text-xs break-words text-muted-foreground">{row.type}</code>
                            <p className="mt-1.5 text-[0.8125rem]">{row.description}</p>
                          </TableCell>
                          <TableCell className="align-top font-mono text-xs text-muted-foreground">
                            {row.default ?? "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </DocsSection>
      ) : null}

      {doc.keyboard?.length ? (
        <DocsSection id="keyboard" title="Keyboard">
          <dl className="grid max-w-2xl gap-0 rounded-(--du-radius-field) border-(length:--du-border-surface) border-border bg-card">
            {doc.keyboard.map((item) => (
              <div
                key={item.keys}
                className="grid grid-cols-[10rem_1fr] gap-4 px-4 py-3 text-sm not-last:border-b-(length:--du-rule) not-last:border-border"
              >
                <dt className="flex flex-wrap gap-1">
                  {item.keys.split(" / ").map((key) => (
                    <Kbd key={key}>{key}</Kbd>
                  ))}
                </dt>
                <dd className="text-muted-foreground">{item.action}</dd>
              </div>
            ))}
          </dl>
        </DocsSection>
      ) : null}

      <DocsPager href={`/docs/components/${doc.slug}`} />
    </article>
  )
}

function inlineCode(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
}
