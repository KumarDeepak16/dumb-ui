import type { Metadata } from "next"

import { componentDocs } from "@/docs/components"
import { Badge } from "@/components/ui/badge"
import { DocsPageHeader, DocsPager, Prose } from "@/components/site/docs-page"

export const metadata: Metadata = {
  title: "Changelog",
  description: "Releases of Dumb UI.",
  alternates: { canonical: "/docs/changelog" },
}

export default function ChangelogPage() {
  return (
    <div className="mx-auto w-full max-w-[64rem]">
      <DocsPageHeader title="Changelog" description="What changed, release by release." />
      <article className="grid gap-4 border-t-(length:--du-rule) border-border py-8 md:grid-cols-[10rem_minmax(0,1fr)]">
        <div className="grid content-start gap-2">
          <Badge>0.2.0</Badge>
          <time dateTime="2026-10-02" className="font-mono text-xs text-muted-foreground">
            2 Oct 2026
          </time>
        </div>
        <Prose>
          <p>
            <strong>Silk, Originals and Blocks.</strong> Silk joins Raw and
            Volume as a core style; Vector and Halo ship as extras.
          </p>
          <ul>
            <li>Originals: Number Ticker, Stepper, Gauge, Rating and a WebGL2 Shader Background.</li>
            <li>Blocks: Hero, Sign in, Stats and Onboarding.</li>
            <li>Three styles visible at a time on the site; extras swap into the third slot.</li>
          </ul>
        </Prose>
      </article>
      <article className="grid gap-4 border-t-(length:--du-rule) border-border pt-8 md:grid-cols-[10rem_minmax(0,1fr)]">
        <div className="grid content-start gap-2">
          <Badge>0.1.0</Badge>
          <time dateTime="2026-10-02" className="font-mono text-xs text-muted-foreground">
            2 Oct 2026
          </time>
        </div>
        <Prose>
          <p>
            <strong>First release.</strong> {componentDocs.length} components
            on Radix and shadcn/ui conventions, three core styles (Raw, Silk,
            Volume) plus Vector as an extra, the <code>@dumb</code> registry and this playground.
          </p>
          <ul>
            <li>Style tokens and material layer with nestable scopes and reduced-motion fallbacks.</li>
            <li>Extras: Button loading, Input adornments, Textarea counter, Slider values, Avatar status and groups, interactive Card, dismissible Alert, Dialog and Sheet sizes, labelled Separator, Tooltip shortcuts, sticky Table headers, indeterminate Progress.</li>
            <li>StyleScope for rendering any subtree, overlays included, in another style.</li>
          </ul>
        </Prose>
      </article>
      <DocsPager href="/docs/changelog" />
    </div>
  )
}
