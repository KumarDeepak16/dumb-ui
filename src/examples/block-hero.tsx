import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShaderBackground } from "@/components/ui/shader-background"

export default function BlockHero() {
  return (
    <section className="relative isolate flex min-h-[30rem] w-full items-center overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border px-6 py-16 sm:px-12">
      <ShaderBackground className="-z-10" intensity={0.9} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-background via-background/85 to-transparent" />
      <div className="grid max-w-xl gap-6">
        <Badge variant="outline" className="bg-background">Now in public beta</Badge>
        <h2 className="du-display text-4xl leading-[1.02] text-balance sm:text-5xl">
          Ship previews before the coffee cools.
        </h2>
        <p className="max-w-[44ch] text-base leading-relaxed text-muted-foreground">
          Every branch gets its own URL, checks and comments. Merge when it looks right.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg">
            Start free
            <ArrowRightIcon weight="bold" />
          </Button>
          <Button size="lg" variant="outline" className="bg-background">
            Read the docs
          </Button>
        </div>
      </div>
    </section>
  )
}
