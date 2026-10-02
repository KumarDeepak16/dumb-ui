import type { Metadata } from "next"
import Link from "next/link"

import { CORE_STYLES, STYLE_IDS, STYLE_META } from "@/lib/site-settings"
import { CodeBlock } from "@/components/site/code-block"
import {
  DocsPageHeader,
  DocsPager,
  DocsSection,
  Prose,
} from "@/components/site/docs-page"
import { TokenCompare } from "@/components/site/token-compare"

export const metadata: Metadata = {
  title: "Styles",
  description:
    "Raw, Silk and Volume: three complete visual languages on one component API.",
  alternates: { canonical: "/docs/styles" },
}

const notes: Record<string, string[]> = {
  halo: [
    "Geist with tight tracking. Monochrome primary, one mint accent.",
    "Rim-lit hairline surfaces and soft, tinted depth.",
    "Hover and focus gather a glowing halo instead of moving the control.",
    "Overlays materialize out of a blur. Switches and sliders glow when on.",
    "Translucent menus with backdrop blur; solid under reduced transparency.",
  ],
  silk: [
    "Figtree throughout, sentence case, bold display weight.",
    "Pill buttons and tabs, filled fields with no visible border until focus.",
    "Diffuse warm shadows. Hover lifts a hair, press squeezes to 96%.",
    "Rose is the single accent: switches, sliders, progress, focus.",
    "Overlays pop in with a hair of overshoot. Built for everyday product UI.",
  ],
  raw: [
    "Archivo at 125% width for display, Martian Mono capitals for controls and labels.",
    "Zero radius. 2px ink rules on every control and surface.",
    "Hard offset shadows. Hover lifts the block off its shadow; press slams it flat.",
    "Overlays wipe in like a slip of paper. Spinners tick in eight steps.",
    "Vermillion is the only spot color: focus rings and the primary action's shadow.",
  ],
  vector: [
    "Chakra Petch display, Geist Mono capitals for controls, labels and table heads.",
    "Flat line drawing: no shadows, no glow. Surfaces are outlined and carry registration brackets that extend on hover.",
    "Small chamfers via corner-shape: bevel, square where the browser lacks support.",
    "Dashed focus rings, ruler-tick sliders and meters, hatched skeletons, a stepping spinner.",
    "Light is a white print (blueprint ink on paper). Dark is a cyanotype (white lines on blueprint blue).",
  ],
  volume: [
    "Bricolage Grotesque display over Onest body. Ultramarine primary.",
    "Every control is an extruded block with a solid 4px side in a darker shade.",
    "Hover lifts 2px and grows the side; press sinks the block flush with the page.",
    "Tabs are separate keys; the active key stays pressed. Fields are raised plates.",
    "Dialogs and menus tilt up out of the page in perspective.",
  ],
}

export default function StylesPage() {
  return (
    <div className="mx-auto w-full max-w-[64rem]">
      <DocsPageHeader
        title="Styles"
        description="Three core visual languages and one extra. Not color themes: each one owns its type, geometry, borders, shadows, motion, focus and press physics."
      />

      <TokenCompare />

      {STYLE_IDS.map((style) => (
        <DocsSection
          key={style}
          id={style}
          title={
            CORE_STYLES.includes(style)
              ? STYLE_META[style].label
              : `${STYLE_META[style].label} (extra)`
          }
          description={STYLE_META[style].description}
        >
          <Prose>
            <ul>
              {notes[style].map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </Prose>
        </DocsSection>
      ))}

      <DocsSection id="switching" title="Switching and scoping">
        <Prose>
          <p>
            The style is an attribute. Change it at runtime and every component
            re-renders in the new material with no React work. Nest it to mix
            styles on one page; overlays opened inside a{" "}
            <Link href="/docs/components/style-scope">StyleScope</Link> portal
            into the scope so they keep its look.
          </p>
        </Prose>
        <CodeBlock
          code={`document.documentElement.dataset.style = "volume"\n\n<StyleScope name="raw">\n  <Dialog>...</Dialog>\n</StyleScope>`}
        />
      </DocsSection>

      <DocsSection id="a11y" title="Accessibility in every style">
        <Prose>
          <ul>
            <li>
              Each style defines its own visible focus treatment; none rely on
              color alone.
            </li>
            <li>
              Under <code>prefers-reduced-motion</code> every style collapses
              overlay motion to a short fade and stops looping animations.
            </li>
            <li>
              Text and control colors are checked for WCAG AA in light and dark
              for all three.
            </li>
          </ul>
        </Prose>
      </DocsSection>

      <DocsPager href="/docs/styles" />
    </div>
  )
}
