"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-(--du-radius-control) whitespace-nowrap text-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "bg-card hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-(--du-h-md) min-w-(--du-h-md) px-2.5",
        sm: "h-(--du-h-sm) min-w-(--du-h-sm) px-2",
        lg: "h-(--du-h-lg) min-w-(--du-h-lg) px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-variant={variant}
      data-size={size}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
      data-slot="toggle"
    />
  )
}

export { Toggle, toggleVariants }
