"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Track size, thumb size and travel come from the style's --du-switch-*
 * tokens; `size="sm"` scales them down by a quarter.
 */
function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-size={size}
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
      data-slot="switch"
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
