import type { Metadata } from "next"

import PortfolioTemplate from "@/templates/portfolio"
import { TemplateBar } from "@/components/site/template-bar"

export const metadata: Metadata = {
  title: "Portfolio template",
  description: "A creative one-page portfolio built with Dumb UI. Switch styles to re-skin the whole page.",
  alternates: { canonical: "/templates/portfolio" },
}

export default function PortfolioTemplatePage() {
  return (
    <>
      <PortfolioTemplate />
      <TemplateBar name="portfolio" />
    </>
  )
}
