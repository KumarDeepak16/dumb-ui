import type { Metadata } from "next"

import { siteConfig } from "@/docs/site"
import { CodeBlock } from "@/components/site/code-block"
import { DocsPageHeader, DocsPager, DocsSection, Prose } from "@/components/site/docs-page"

export const metadata: Metadata = {
  title: "Publishing",
  description: "How the Dumb UI registry is built, versioned and deployed.",
  alternates: { canonical: "/docs/publishing" },
}

export default function PublishingPage() {
  return (
    <div className="mx-auto w-full max-w-[64rem]">
      <DocsPageHeader
        title="Publishing"
        description="Dumb UI ships as a shadcn registry: static JSON served next to the docs. Deploying the site publishes the library."
      />

      <DocsSection id="build" title="Build the registry">
        <Prose>
          <p>
            <code>scripts/build-registry.ts</code> generates{" "}
            <code>registry.json</code> from the component docs, then{" "}
            <code>shadcn build</code> writes one JSON file per item to{" "}
            <code>public/r</code>. The <code>dumb-ui</code> item carries the
            style tokens and material layer as CSS that the CLI merges into the
            consumer’s stylesheet.
          </p>
        </Prose>
        <CodeBlock code={`pnpm registry\n# registry.json -> public/r/*.json`} lang="bash" />
      </DocsSection>

      <DocsSection id="deploy" title="Deploy">
        <Prose>
          <p>
            The site deploys to Netlify from <code>main</code>.{" "}
            <code>netlify.toml</code> runs the build (examples index, registry,
            Next.js) and serves <code>/r/*</code> with CORS and short caching so
            new releases reach the CLI quickly. Every docs page is statically
            generated.
          </p>
        </Prose>
        <CodeBlock code={`git push origin main   # Netlify builds and publishes ${siteConfig.url}`} lang="bash" />
      </DocsSection>

      <DocsSection id="versioning" title="Versioning">
        <Prose>
          <ul>
            <li>
              The registry is always the latest release. Version tags in git
              (<code>v0.2.0</code>) mark releases, and the changelog lists what
              changed per component.
            </li>
            <li>
              Breaking a token name or a component prop is a minor bump while
              the version is <code>0.x</code>, a major bump after <code>1.0</code>.
            </li>
            <li>
              Because users own their copies, updating is opt-in: re-run{" "}
              <code>shadcn add</code> and review the diff.
            </li>
          </ul>
        </Prose>
        <CodeBlock code={`pnpm version minor     # bumps package.json and tags\ngit push --follow-tags`} lang="bash" />
      </DocsSection>

      <DocsPager href="/docs/publishing" />
    </div>
  )
}
