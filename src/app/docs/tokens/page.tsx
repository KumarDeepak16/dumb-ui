import type { Metadata } from "next"

import { CodeBlock } from "@/components/site/code-block"
import { DocsPageHeader, DocsPager, DocsSection, Prose } from "@/components/site/docs-page"

export const metadata: Metadata = {
  title: "Tokens",
  description: "The token contract every Dumb UI style implements, and how to write your own style.",
  alternates: { canonical: "/docs/tokens" },
}

const groups: { title: string; tokens: [string, string][] }[] = [
  {
    title: "Color (shadcn names)",
    tokens: [
      ["--background / --foreground", "Page canvas and body text."],
      ["--card, --popover (+ -foreground)", "Surfaces and overlays."],
      ["--primary, --secondary, --muted, --accent", "Action and neutral fills."],
      ["--selection (+ -foreground)", "Highlighted menu, command and nav items."],
      ["--destructive, --success, --warning", "Semantic states, each with a foreground."],
      ["--highlight", "The style's spot color (focus, primary shadow, progress)."],
      ["--border, --input, --ring, --sunken, --overlay", "Lines, fields, focus, wells and scrims."],
    ],
  },
  {
    title: "Type",
    tokens: [
      ["--du-font-sans / -display / -mono / -control / -label", "Families per role."],
      ["--du-display-weight, -tracking, -stretch, -case", "Headings, card and dialog titles."],
      ["--du-control-weight, -tracking, -case, --du-text-control", "Buttons, tabs, toggles."],
      ["--du-label-weight, -tracking, -case, --du-text-label", "Form labels and badges."],
    ],
  },
  {
    title: "Geometry",
    tokens: [
      ["--du-radius-control / -field / -surface / -overlay / -item", "Corner radius per role."],
      ["--du-radius-badge / -check / -avatar / -tooltip", "Small parts."],
      ["--du-h-sm / -md / -lg", "Control heights."],
      ["--du-pad-control, --du-pad-surface, --du-gap-surface", "Spacing."],
      ["--du-border-control / -field / -surface / -overlay / -check, --du-rule", "Border weights."],
    ],
  },
  {
    title: "Light and physics",
    tokens: [
      ["--du-shadow-control (-hover, -active)", "Resting, hovered and pressed controls."],
      ["--du-shadow-primary (-hover), --du-shadow-destructive (-hover)", "Filled actions."],
      ["--du-shadow-field (-focus, -invalid)", "Inputs, selects and textareas."],
      ["--du-shadow-surface (-hover, -active), --du-shadow-overlay", "Cards and floating layers."],
      ["--du-hover-x / -y, --du-active-x / -y, --du-active-scale", "How far a control moves."],
      ["--du-sheen, --du-sheen-primary", "Background-image highlight on raised controls."],
    ],
  },
  {
    title: "Motion and focus",
    tokens: [
      ["--du-ease, --du-ease-out, --du-ease-in", "Curves."],
      ["--du-dur-1 / -2 / -3", "Feedback, transitions, overlays."],
      ["--du-overlay-in / -out, --du-dialog-in / -out", "Keyframe names for floating layers."],
      ["--du-focus-width / -offset / -color", "Keyboard focus ring."],
    ],
  },
]

const custom = `/* globals.css, after the Dumb UI layer */
[data-style="mono"] {
  /* start from any style's block and change what you need */
  --primary: oklch(0.2 0 0);
  --du-font-display: "Söhne", system-ui, sans-serif;
  --du-radius-control: 999px;
  --du-shadow-control: none;
  --du-hover-y: -1px;
  --du-overlay-in: du-scale-in;
  /* ...the rest of the contract */
}

[data-style="mono"]:is(.dark, .dark *) {
  --primary: oklch(0.97 0 0);
}`

export default function TokensPage() {
  return (
    <div className="mx-auto w-full max-w-[64rem]">
      <DocsPageHeader
        title="Tokens"
        description="Every style implements the same contract of CSS custom properties. Components read only these, so a new style is a new block of tokens."
      />

      {groups.map((group) => (
        <DocsSection key={group.title} id={group.title.toLowerCase().replace(/\W+/g, "-")} title={group.title}>
          <dl className="grid overflow-hidden rounded-(--du-radius-field) border-(length:--du-border-surface) border-border bg-card">
            {group.tokens.map(([name, description]) => (
              <div
                key={name}
                className="grid gap-1 px-4 py-3 not-last:border-b-(length:--du-rule) not-last:border-border sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-6"
              >
                <dt className="font-mono text-[0.8125rem] break-words">{name}</dt>
                <dd className="text-sm text-muted-foreground">{description}</dd>
              </div>
            ))}
          </dl>
        </DocsSection>
      ))}

      <DocsSection id="custom" title="Write your own style">
        <Prose>
          <p>
            Copy one of the three blocks from the installed CSS, give it a new
            <code> data-style</code> name and change the values. A test in the
            repo checks that every style defines the full contract, so a missing
            token fails CI instead of failing silently.
          </p>
        </Prose>
        <CodeBlock code={custom} lang="css" title="globals.css" />
      </DocsSection>

      <DocsPager href="/docs/tokens" />
    </div>
  )
}
