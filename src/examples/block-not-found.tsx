import { ArrowLeftIcon, MagnifyingGlassIcon } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { ShaderBackground } from "@/components/ui/shader-background"

export default function BlockNotFound() {
  return (
    <section className="relative isolate grid min-h-[34rem] w-full place-items-center overflow-hidden rounded-(--du-radius-surface) border-(length:--du-border-surface) border-border px-6 py-16">
      <ShaderBackground className="-z-10" intensity={0.7} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial from-background/90 via-background/60 to-transparent" />
      <div className="grid w-full max-w-md justify-items-center gap-6 text-center">
        <span className="du-display text-[7rem] leading-[0.85] tracking-tighter sm:text-[9rem]">404</span>
        <div className="grid gap-2">
          <h2 className="du-display text-2xl">This page shipped without us</h2>
          <p className="text-muted-foreground">
            The link is old or the page moved. Search for it, or head back.
          </p>
        </div>
        <Input
          aria-label="Search the docs"
          placeholder="Search the docs"
          leading={<MagnifyingGlassIcon />}
          trailing={<Kbd>/</Kbd>}
          className="bg-background"
        />
        <div className="flex flex-wrap justify-center gap-2">
          <Button variant="outline" className="bg-background">
            <ArrowLeftIcon />
            Go back
          </Button>
          <Button>Open the docs</Button>
        </div>
      </div>
    </section>
  )
}
