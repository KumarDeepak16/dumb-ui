import type { Metadata } from "next"

import { CodeBlock } from "@/components/site/code-block"
import { DocsPageHeader, DocsPager, DocsSection, Prose } from "@/components/site/docs-page"

export const metadata: Metadata = {
  title: "Create a component",
  description: "How to add a component to Dumb UI so it works in all three styles.",
  alternates: { canonical: "/docs/create-a-component" },
}

const component = `// src/components/ui/stat.tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Stat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        // structure + semantic color + geometry tokens
        "grid gap-1 rounded-(--du-radius-surface) bg-card p-(--du-pad-surface)",
        className
      )}
      {...props}
      data-slot="stat" // after the spread: the slot always belongs to the component
    />
  )
}

export { Stat }`

const material = `/* src/styles/dumb-ui.css, inside @layer components */
[data-slot="stat"] {
  border: var(--du-border-surface) solid var(--border);
  box-shadow: var(--du-shadow-surface);
}`

const docs = `// src/docs/components.ts
{
  slug: "stat",
  title: "Stat",
  description: "A single number with a label.",
  group: "Display",
  dependencies: [],
  registryDependencies: [],
  examples: [{ name: "stat-demo", title: "Stat" }],
  usage: { imports: \`import { Stat } from "@/components/ui/stat"\`, code: \`<Stat>…</Stat>\` },
}`

export default function CreateComponentPage() {
  return (
    <div className="mx-auto w-full max-w-[64rem]">
      <DocsPageHeader
        title="Create a component"
        description="Write the component once. If it only reads tokens, it already works in Raw, Vector and Volume."
      />

      <DocsSection id="rules" title="The rules">
        <Prose>
          <ol>
            <li>
              <strong>Structure in TSX, material in CSS.</strong> Layout,
              semantic colors and geometry tokens (
              <code>rounded-(--du-radius-control)</code>,{" "}
              <code>h-(--du-h-md)</code>) go in className. Borders, shadows,
              type, transforms and keyframes go in the material layer.
            </li>
            <li>
              <strong>Put <code>data-slot</code> after the props spread.</strong>{" "}
              Triggers with <code>asChild</code> pass their own slot down; the
              component must keep its own or it loses its material.
            </li>
            <li>
              <strong>Never branch on style.</strong> If a style needs a
              different geometry, add a token and give every style a value.
            </li>
            <li>
              <strong>No <code>outline-none</code> on focusable parts.</strong>{" "}
              Focus rings come from the base layer and each style tunes them.
            </li>
          </ol>
        </Prose>
      </DocsSection>

      <DocsSection id="component" title="1. Write the component">
        <CodeBlock code={component} title="src/components/ui/stat.tsx" />
      </DocsSection>

      <DocsSection id="material" title="2. Give it material">
        <CodeBlock code={material} lang="css" title="src/styles/dumb-ui.css" />
      </DocsSection>

      <DocsSection id="docs" title="3. Document and preview it">
        <Prose>
          <p>
            Add an example file in <code>src/examples</code> (default export),
            then an entry in <code>src/docs/components.ts</code>. The page,
            preview, compare mode, search entry and registry item are generated
            from that entry. Optional: a props playground in{" "}
            <code>src/docs/playgrounds.tsx</code>.
          </p>
        </Prose>
        <CodeBlock code={docs} title="src/docs/components.ts" />
      </DocsSection>

      <DocsSection id="verify" title="4. Verify">
        <CodeBlock code={`pnpm test        # contract, contrast and component tests\npnpm registry    # rebuild public/r\npnpm build       # type check + static build`} lang="bash" />
      </DocsSection>

      <DocsPager href="/docs/create-a-component" />
    </div>
  )
}
