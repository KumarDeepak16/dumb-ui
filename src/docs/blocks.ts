export type BlockDoc = {
  name: string
  title: string
  description: string
  /** Library components the block uses (registry dependencies). */
  uses: string[]
}

export const blockDocs: BlockDoc[] = [
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
