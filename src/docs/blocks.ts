export type BlockDoc = {
  name: string
  title: string
  description: string
  /** Library components the block uses (registry dependencies). */
  uses: string[]
}

export const blockDocs: BlockDoc[] = [
  {
    name: "block-app-shell",
    title: "App shell",
    description: "Sidebar, search with a shortcut hint, and a deployments table with status, authors and row actions.",
    uses: ["avatar", "badge", "breadcrumb", "button", "dropdown-menu", "input", "kbd", "table", "tabs"],
  },
  {
    name: "block-pricing",
    title: "Pricing",
    description: "Per-seat pricing that recalculates as you drag. Monthly or yearly, with a rolling total.",
    uses: ["badge", "button", "number-ticker", "separator", "slider", "toggle-group"],
  },
  {
    name: "block-ai-chat",
    title: "AI assistant",
    description: "A chat thread with a code answer, quick actions, a thinking state and a composer with tools.",
    uses: ["avatar", "button", "kbd", "skeleton", "textarea", "toggle-group", "tooltip"],
  },
  {
    name: "block-settings",
    title: "Settings",
    description: "Section nav, profile, notification switches and a danger zone behind a confirm dialog.",
    uses: ["alert-dialog", "avatar", "button", "input", "label", "select", "separator", "switch"],
  },
  {
    name: "block-changelog",
    title: "Changelog",
    description: "A release timeline with versions, contributors and tags, plus an email subscribe.",
    uses: ["avatar", "badge", "button", "input"],
  },
  {
    name: "block-not-found",
    title: "Not found",
    description: "An oversized 404 over the style's shader, with search and a way back.",
    uses: ["button", "input", "kbd", "shader-background"],
  },
  {
    name: "block-hero",
    title: "Hero",
    description: "A product hero over the style's shader background, with a fade that keeps text readable.",
    uses: ["badge", "button", "shader-background"],
  },
  {
    name: "block-sign-in",
    title: "Sign in",
    description: "Social and email sign-in in a card, floating over a live background.",
    uses: ["button", "card", "checkbox", "input", "label", "separator", "shader-background"],
  },
  {
    name: "block-stats",
    title: "Stats",
    description: "Revenue with a rolling number, a breakdown and two health gauges.",
    uses: ["badge", "card", "gauge", "number-ticker", "progress"],
  },
  {
    name: "block-onboarding",
    title: "Onboarding",
    description: "A three-step workspace setup with a stepper, choice rows and a slow shader behind it.",
    uses: ["button", "input", "label", "radio-group", "shader-background", "stepper"],
  },
]
