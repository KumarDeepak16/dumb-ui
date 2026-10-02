import type { Metadata } from "next"

import LandingTemplate from "@/templates/landing"
import { TemplateBar } from "@/components/site/template-bar"

export const metadata: Metadata = {
  title: "Landing page template",
  description: "A full product landing page built with Dumb UI. Switch styles to re-skin the whole page.",
  alternates: { canonical: "/templates/landing" },
}

export default function LandingTemplatePage() {
  return (
    <>
      <LandingTemplate />
      <TemplateBar name="landing" />
    </>
  )
}
