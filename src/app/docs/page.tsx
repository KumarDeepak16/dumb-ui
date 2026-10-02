import type { Metadata } from "next"
import Link from "next/link"

import { CORE_STYLES, STYLE_META } from "@/lib/site-settings"
import { componentDocs } from "@/docs/components"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { StyleScope } from "@/components/ui/style-scope"
import { CodeBlock } from "@/components/site/code-block"
import { DocsPageHeader, DocsPager, DocsSection, Prose } from "@/components/site/docs-page"

export const metadata: Metadata = {
  title: "Introduction",
  description: "Dumb UI is a shadcn-compatible React library with three complete visual languages on one API.",
  alternates: { canonical: "/docs" },
}

export default function IntroductionPage() {
  return (
    <div className="mx-auto w-full max-w-[64rem]">
      <DocsPageHeader
        title="Introduction"
        description="Dumb UI is an open-source React component library on shadcn/ui conventions. One API, three core visual languages (Raw, Silk and Volume) plus extra styles (Vector, Halo)."
      />

      <div className="grid gap-3 md:grid-cols-3">
        {CORE_STYLES.map((name) => (
          <StyleScope
            key={name}
            name={name}
            className="site-canvas flex flex-col gap-5 rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border p-5 shadow-(--du-shadow-surface)"
          >
            <div className="grid gap-1.5">
              <span className="site-display text-xl">{STYLE_META[name].label}</span>
              <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                {STYLE_META[name].description}
              </p>
            </div>
            <div className="mt-auto flex items-center justify-between gap-3">
              <Switch defaultChecked aria-label={`${STYLE_META[name].label} switch`} />
              <Button size="sm">Continue</Button>
            </div>
          </StyleScope>
        ))}
      </div>

      <DocsSection id="why" title="Why three styles">
        <Prose>
          <p>
            Most kits change color and call it a theme. Dumb UI changes the
            material: type, geometry, border weight, shadow model, motion
            curves, focus treatment and how a control physically responds to a
            press. A Raw button shifts against a hard shadow, a Silk button
            squeezes softly, a Volume button sinks into the page.
          </p>
          <p>
            The markup never changes. This renders correctly in all three:
          </p>
        </Prose>
        <CodeBlock code={`<Button>Continue</Button>`} />
      </DocsSection>

      <DocsSection id="how" title="How it works">
        <Prose>
          <ul>
            <li>
              <strong>A style is a token set.</strong> About 150 CSS custom
              properties per style, defined under <code>[data-style]</code>.
              Components never branch on style.
            </li>
            <li>
              <strong>Components stay shadcn-shaped.</strong> Same file layout,
              same props, Radix underneath, <code>data-slot</code> on every part.
              Colors keep shadcn names, so your other shadcn components follow
              the active palette.
            </li>
            <li>
              <strong>A material layer</strong> in <code>@layer components</code>
              turns tokens into borders, shadows, type and motion. Anything you
              pass through <code>className</code> still wins.
            </li>
            <li>
              <strong>Scopes nest.</strong> Wrap any subtree in{" "}
              <Link href="/docs/components/style-scope">StyleScope</Link> to
              render it in another style, overlays included.
            </li>
          </ul>
        </Prose>
      </DocsSection>

      <DocsSection id="extras" title="Beyond shadcn">
        <Prose>
          <p>
            Every component keeps the shadcn/ui API. Where a common need kept
            coming up, Dumb UI adds a prop instead of a recipe: Button{" "}
            <code>loading</code>, Input <code>leading</code> and{" "}
            <code>trailing</code>, Textarea <code>showCount</code>, Slider{" "}
            <code>showValue</code>, Avatar <code>status</code> and{" "}
            <code>AvatarGroup</code>, Card <code>interactive</code>, Alert{" "}
            <code>onDismiss</code>, Dialog and Sheet <code>size</code>,
            Separator <code>label</code>, Tooltip <code>shortcut</code>, Table
            sticky headers and indeterminate Progress. They are marked
            “extra” in each API table.
          </p>
          <p>
            {componentDocs.length} components ship today.{" "}
            <Link href="/docs/installation">Install</Link> or{" "}
            <Link href="/docs/components">browse them</Link>.
          </p>
        </Prose>
      </DocsSection>

      <DocsPager href="/docs" />
    </div>
  )
}
