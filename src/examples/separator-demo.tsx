import { Separator } from "@/components/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="grid gap-1">
        <h4 className="du-display text-base">Dumb UI</h4>
        <p className="text-sm text-muted-foreground">
          One component system, three visual languages.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>GitHub</span>
      </div>
    </div>
  )
}
