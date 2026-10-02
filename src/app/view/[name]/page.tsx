import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { exampleNames } from "@/examples/__index"
import { ViewExample } from "@/components/site/view-example"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export function generateStaticParams() {
  return exampleNames.map((name) => ({ name }))
}

/** Bare example page: the responsive preview iframe and "open in new tab". */
export default async function ViewPage({ params }: PageProps<"/view/[name]">) {
  const { name } = await params
  if (!(exampleNames as readonly string[]).includes(name)) notFound()

  return (
    <main className="site-canvas flex min-h-dvh items-center justify-center p-4 sm:p-8">
      <ViewExample name={name} />
    </main>
  )
}
