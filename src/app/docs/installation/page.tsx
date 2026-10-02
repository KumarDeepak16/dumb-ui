import type { Metadata } from "next"

import { siteConfig } from "@/docs/site"
import { CodeBlock } from "@/components/site/code-block"
import { DocsPageHeader, DocsPager, DocsSection, Prose } from "@/components/site/docs-page"
import { InstallCommand } from "@/components/site/install-command"

export const metadata: Metadata = {
  title: "Installation",
  description: "Add Dumb UI to a shadcn/ui project with the shadcn CLI.",
  alternates: { canonical: "/docs/installation" },
}

const componentsJson = `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "tailwind": { "css": "app/globals.css", "cssVariables": true },
  "aliases": { "components": "@/components", "ui": "@/components/ui", "lib": "@/lib", "utils": "@/lib/utils" },
  "registries": {
    "${siteConfig.namespace}": "${siteConfig.registry}/{name}.json"
  }
}`

const layout = `// app/layout.tsx
import { Archivo, Bricolage_Grotesque, Geist, Geist_Mono, Martian_Mono, Onest } from "next/font/google"

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" })
const martian = Martian_Mono({ subsets: ["latin"], variable: "--font-martian" })
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const onest = Onest({ subsets: ["latin"], variable: "--font-onest" })
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-style="vector"
      className={[archivo, martian, geist, geistMono, onest, bricolage].map((f) => f.variable).join(" ")}
    >
      <body>{children}</body>
    </html>
  )
}`

export default function InstallationPage() {
  return (
    <div className="mx-auto w-full max-w-[64rem]">
      <DocsPageHeader
        title="Installation"
        description="Dumb UI installs through the shadcn CLI. You own the code that lands in your project."
      />

      <DocsSection id="requirements" title="Requirements">
        <Prose>
          <ul>
            <li>React 19 and Tailwind CSS v4.</li>
            <li>
              A shadcn/ui project. Starting fresh? Run{" "}
              <code>npx shadcn@latest init</code> first.
            </li>
          </ul>
        </Prose>
      </DocsSection>

      <DocsSection id="registry" title="1. Add the registry">
        <Prose>
          <p>
            Register the <code>{siteConfig.namespace}</code> namespace in{" "}
            <code>components.json</code>:
          </p>
        </Prose>
        <CodeBlock code={componentsJson} lang="json" title="components.json" />
      </DocsSection>

      <DocsSection id="add" title="2. Add components">
        <Prose>
          <p>
            Each component depends on <code>{siteConfig.namespace}/dumb-ui</code>,
            which merges the three style token sets and the material layer into
            your global CSS the first time.
          </p>
        </Prose>
        <InstallCommand command={`shadcn@latest add ${siteConfig.namespace}/button ${siteConfig.namespace}/dialog`} />
        <Prose>
          <p>Or install every component at once:</p>
        </Prose>
        <InstallCommand command={`shadcn@latest add ${siteConfig.namespace}/all`} />
      </DocsSection>

      <DocsSection id="style" title="3. Pick a style">
        <Prose>
          <p>
            Set <code>data-style</code> on <code>&lt;html&gt;</code> (or any
            element) to <code>raw</code>, <code>vector</code> or{" "}
            <code>volume</code>. Dark mode uses the shadcn convention: a{" "}
            <code>dark</code> class on an ancestor. Without an attribute, Raw is
            the default.
          </p>
          <p>
            Each style names its fonts through CSS variables with system
            fallbacks. Load the ones you use, for example with{" "}
            <code>next/font</code>:
          </p>
        </Prose>
        <CodeBlock code={layout} title="app/layout.tsx" />
      </DocsSection>

      <DocsSection id="url" title="Without a namespace">
        <Prose>
          <p>Every item is also addressable by URL:</p>
        </Prose>
        <InstallCommand command={`shadcn@latest add ${siteConfig.registry}/button.json`} />
      </DocsSection>

      <DocsPager href="/docs/installation" />
    </div>
  )
}
