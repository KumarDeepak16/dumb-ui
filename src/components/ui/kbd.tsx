import * as React from "react"

import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-(--du-radius-item) bg-muted px-1 text-[0.6875rem] font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
      data-slot="kbd"
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
      data-slot="kbd-group"
    />
  )
}

export { Kbd, KbdGroup }
